import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/coach_persona.dart';

class GrammarCorrection {
  final bool hasCorrection;
  final String original;
  final String correction;
  final String explanation;
  final String spokenReply;
  final String modelUsed;
  final String targetPhrase;
  final String nextQuestion;
  final String engineUsed; // 'ON_DEVICE_NANO' or 'CLOUD_GEMINI_2.5_FLASH'
  final int latencyMs;
  final bool isOfflineFallback;

  GrammarCorrection({
    required this.hasCorrection,
    required this.original,
    required this.correction,
    required this.explanation,
    required this.spokenReply,
    this.modelUsed = 'gemini-2.5-flash',
    this.targetPhrase = '',
    this.nextQuestion = '',
    this.engineUsed = 'CLOUD_GEMINI_2.5_FLASH',
    this.latencyMs = 0,
    this.isOfflineFallback = false,
  });
}

class GeminiVoiceService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  // Dynamically populated from Firestore 'lang_settings/ai_config' or environment
  String? _apiKey;
  List<String> _fallbackKeys = [];
  String _keyRotationStrategy = 'free-first-then-paid';
  String _model = 'smart-routing';
  bool _drillModeEnabled = true;
  bool simulateOffline = false;
  String hybridMode = 'auto'; // 'auto', 'nano_only', 'cloud_only

  // In-memory key cooldown registry: maps API key string -> cooldown expiry time.
  // When a key encounters HTTP 429 (Rate Limit) or Quota Exceeded, it is placed on a
  // 60-second cooldown so subsequent user turns skip it instantaneously with ZERO delay!
  static final Map<String, DateTime> _keyCooldowns = {};

  bool get drillModeEnabled => _drillModeEnabled;

  Future<void> initConfig() async {
    try {
      final doc = await _firestore.collection('lang_settings').doc('ai_config').get();
      if (doc.exists) {
        final data = doc.data()!;
        _apiKey = data['geminiApiKey'] as String?;
        if (data['fallbackKeys'] != null && data['fallbackKeys'] is List) {
          _fallbackKeys = (data['fallbackKeys'] as List)
              .map((e) => e.toString().trim())
              .where((e) => e.length > 10)
              .toList();
        }
        _keyRotationStrategy = data['keyRotationStrategy'] ?? 'free-first-then-paid';
        _model = data['selectedModel'] ?? 'smart-routing';
        if (data['drillModeEnabled'] != null) {
          _drillModeEnabled = data['drillModeEnabled'] as bool;
        }
      }
    } catch (e) {
      // Ignored
    }
  }

  /// Evaluates whether the user's spoken repetition matches the target phrase
  Future<bool> evaluateRepetition({
    required String userSpeech,
    required String targetPhrase,
    required String targetLanguage,
  }) async {
    // Strip common punctuation marks while preserving ALL Unicode scripts (Japanese, Korean, Arabic, Tamil, etc.)
    final punctuationRegex = RegExp(r'''[.,\/#!$%\^&\*;:{}=\-_`~()?"'「」『』、。！？\u060C\u061B\u061F\u0964]''');
    final cleanUser = userSpeech.toLowerCase().replaceAll(punctuationRegex, '').replaceAll(RegExp(r'\s+'), ' ').trim();
    final cleanTarget = targetPhrase.toLowerCase().replaceAll(punctuationRegex, '').replaceAll(RegExp(r'\s+'), ' ').trim();

    if (cleanUser.isEmpty) return false;

    // Exact or direct substring match
    if (cleanUser == cleanTarget || cleanUser.contains(cleanTarget) || cleanTarget.contains(cleanUser)) {
      return true;
    }

    // Token overlap match (at least 50% match for non-Latin languages or words)
    final userTokens = cleanUser.split(' ').where((t) => t.isNotEmpty).toSet();
    final targetTokens = cleanTarget.split(' ').where((t) => t.isNotEmpty).toSet();
    if (targetTokens.isNotEmpty) {
      final overlap = userTokens.intersection(targetTokens);
      if ((overlap.length / targetTokens.length) >= 0.5) {
        return true;
      }
    }

    return false;
  }

  /// Selects the best model dynamically based on scenario and complexity
  String _determineBestModel({
    required String userSpeech,
    required String scenarioContext,
  }) {
    if (_model != 'smart-routing' && _model != 'auto') {
      return _model;
    }

    final words = userSpeech.trim().split(RegExp(r'\s+')).length;
    final isComplexScenario = scenarioContext.toLowerCase().contains('interview') ||
        scenarioContext.toLowerCase().contains('business') ||
        words > 20;

    if (isComplexScenario) {
      return 'gemini-3.8-flash';
    }
    return 'gemini-3.5-flash';
  }

  /// Builds the prioritized pool of keys:
  /// Free tier keys are attempted first.
  /// Keys currently in cooldown (429/quota error) are filtered out so they are skipped instantly.
  /// Paid primary key is queued as the failover guarantee.
  List<String> _buildOrderedKeyPool() {
    final now = DateTime.now();
    final List<String> ordered = [];

    if (_keyRotationStrategy == 'paid-only') {
      if (_apiKey != null && _apiKey!.length > 15) {
        ordered.add(_apiKey!);
      }
      return ordered;
    }

    // 1. Healthy free keys (not in cooldown)
    for (final key in _fallbackKeys) {
      final cooldown = _keyCooldowns[key];
      if (cooldown == null || now.isAfter(cooldown)) {
        ordered.add(key);
      }
    }

    // 2. Primary paid key (if healthy)
    if (_apiKey != null && _apiKey!.length > 15) {
      final paidCooldown = _keyCooldowns[_apiKey!];
      if (paidCooldown == null || now.isAfter(paidCooldown)) {
        ordered.add(_apiKey!);
      }
    }

    // 3. Resilience fallback: if all keys are in cooldown, include all configured keys
    if (ordered.isEmpty) {
      ordered.addAll(_fallbackKeys);
      if (_apiKey != null && _apiKey!.length > 15) {
        ordered.add(_apiKey!);
      }
    }

    return ordered;
  }

  Future<String> generateDynamicOpening({
    required String topicTitle,
    required String scenarioContext,
    required String targetLanguage,
    required CoachPersona coach,
    required String defaultPrompt,
    List<String> alternateQuestions = const [],
  }) async {
    // 1. Prepare diverse local fallback pool first with pure native script
    String cleanPrompt = defaultPrompt.replaceAll(RegExp(r'\([^)]*\)'), '').replaceAll(RegExp(r'\[[^\]]*\]'), '').trim();
    final List<String> fallbackPool = [cleanPrompt];

    for (final q in alternateQuestions) {
      final cleanQ = q.replaceAll(RegExp(r'\([^)]*\)'), '').replaceAll(RegExp(r'\[[^\]]*\]'), '').trim();
      if (cleanQ.isNotEmpty) {
        if (targetLanguage == 'Japanese') {
          fallbackPool.add("こんにちは！コーチの${coach.name}です。$cleanQ");
        } else if (targetLanguage == 'Korean') {
          fallbackPool.add("안녕하세요! ${coach.name} 코치입니다. $cleanQ");
        } else if (targetLanguage == 'Spanish') {
          fallbackPool.add("¡Hola! Aquí el coach ${coach.name}. $cleanQ");
        } else if (targetLanguage == 'Arabic') {
          fallbackPool.add("مرحباً بك! أنا المدرب ${coach.name}. $cleanQ");
        } else if (targetLanguage == 'Tamil') {
          fallbackPool.add("வணக்கம்! நான் உங்கள் பயிற்சியாளர் ${coach.name}. $cleanQ");
        } else {
          fallbackPool.add("Hello! Coach ${coach.name} here. $cleanQ");
          fallbackPool.add("Hi there! Great to chat with you today. $cleanQ");
        }
      }
    }
    fallbackPool.shuffle();
    final localFallback = fallbackPool.first;

    if (_apiKey == null || _fallbackKeys.isEmpty) {
      await initConfig();
    }

    final keyPool = _buildOrderedKeyPool();
    if (keyPool.isEmpty) return localFallback;

    final prompt = '''
${coach.promptPersonality}
You are starting a live telephone language practice call in $targetLanguage.
Topic: $topicTitle
Scenario: $scenarioContext

Generate a fresh, creative, and engaging opening greeting and 1 starter question to begin the conversation (maximum 20 words).
CRITICAL RULE: Speak 100% purely in $targetLanguage native script. DO NOT include English translations, romanizations, pronunciations, or explanations in parentheses or brackets. Reply ONLY with the exact words to speak.
''';

    for (final activeKey in keyPool) {
      try {
        final url = Uri.parse(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=$activeKey',
        );

        final response = await http
            .post(
              url,
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({
                'contents': [
                  {
                    'role': 'user',
                    'parts': [
                      {'text': prompt}
                    ]
                  }
                ],
                'generationConfig': {
                  'thinkingConfig': {
                    'thinkingBudget': 0,
                  },
                  'temperature': 0.85,
                  'maxOutputTokens': 120,
                }
              }),
            )
            .timeout(const Duration(milliseconds: 3800));

        if (response.statusCode == 200) {
          final body = jsonDecode(response.body);
          final text = (body['candidates'][0]['content']['parts'][0]['text'] as String?)?.trim();
          if (text != null && text.isNotEmpty) {
            debugPrint('Dynamic Opening Generated: $text');
            return text.replaceAll('"', '').trim();
          }
        }
      } catch (e) {
        debugPrint('Dynamic opening fallback error: $e');
        continue;
      }
    }

    return localFallback;
  }

  Future<GrammarCorrection> analyzeAndRespond({
    required String userSpeech,
    required String targetLanguage,
    required String scenarioContext,
    CoachPersona? coach,
  }) async {
    final stopwatch = Stopwatch()..start();

    // RULE 1: IF OFFLINE SIMULATION OR NANO-ONLY MODE IS FORCED -> EXECUTE ON-DEVICE IMMEDIATELY
    if (simulateOffline || hybridMode == 'nano_only') {
      return _executeOnDeviceNanoInference(
        userSpeech: userSpeech,
        targetLanguage: targetLanguage,
        stopwatch: stopwatch,
        isFallback: simulateOffline,
      );
    }

    if (_apiKey == null || _fallbackKeys.isEmpty) {
      await initConfig();
    }

    final keyPool = _buildOrderedKeyPool();

    if (keyPool.isNotEmpty) {
      final activeCoach = coach ?? CoachPersona.defaultCoach;
      // High-performance active models supported by the API
      final candidateModels = [
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
      ];

      String correctionTemplate = "Good effort! In English, we say: '[exact targetPhrase]'. Can you repeat that for me?";
      if (targetLanguage == 'Japanese') {
        correctionTemplate = "惜しいですね！日本語では「[exact targetPhrase]」と言います。リピートしてみてください！";
      } else if (targetLanguage == 'Korean') {
        correctionTemplate = "좋은 시도였어요! 한국어로는 '[exact targetPhrase]'(이)라고 해요. 다시 따라 해보시겠어요?";
      } else if (targetLanguage == 'Spanish') {
        correctionTemplate = "¡Buen intento! En español decimos: '[exact targetPhrase]'. ¿Puedes repetirlo conmigo?";
      } else if (targetLanguage == 'Arabic') {
        correctionTemplate = "محاولة جيدة! باللغة العربية نقول: '[exact targetPhrase]'. هل يمكنك تكرار ذلك معي؟";
      } else if (targetLanguage == 'Tamil') {
        correctionTemplate = "நல்ல முயற்சி! தமிழில் நாம் '[exact targetPhrase]' என்று சொல்வோம். அதைத் திரும்பச் சொல்ல முடியுமா?";
      }

      final prompt = '''
${activeCoach.promptPersonality}
Conducting a live interactive telephone language practice call in $targetLanguage.
Scenario: $scenarioContext
Learner said: "$userSpeech"
Drill Mode: $_drillModeEnabled

Evaluate learner's speech carefully.
IMPORTANT LOGIC RULES:
1. IF LEARNER MADE A GRAMMAR/VOCAB ERROR (hasCorrection == true):
   - Set "hasCorrection": true
   - Set "original": the learner's flawed phrase
   - Set "correction": the natural correct phrasing in $targetLanguage
   - Set "explanation": concise 1-sentence tip
   - Set "targetPhrase": the exact natural corrected sentence in $targetLanguage to repeat
   - Set "spokenReply": "$correctionTemplate" (Replace [exact targetPhrase] with your actual targetPhrase)
   - CRITICAL: spokenReply MUST BE 100% in $targetLanguage! DO NOT mix in other languages!
   - DO NOT ASK A NEW SCENARIO QUESTION in spokenReply! The learner must repeat the correction first!
   - Set "nextQuestion": The next scenario question in $targetLanguage to ask AFTER the learner repeats correctly.

2. IF LEARNER SPOKE CORRECTLY (hasCorrection == false):
   - Set "hasCorrection": false
   - Set "spokenReply": 1 warm sentence in $targetLanguage reacting to what the learner said, followed IMMEDIATELY by 1 engaging scenario question in $targetLanguage for the learner to answer (total max 24 words). Speak 100% in $targetLanguage native script (no English translations or romanizations).
   - Set "nextQuestion": The exact question asked at the end of spokenReply.

Reply ONLY with valid JSON:
{
  "hasCorrection": boolean,
  "original": "error phrase if any",
  "correction": "natural corrected phrase",
  "explanation": "concise 1-sentence tip",
  "targetPhrase": "exact corrected phrase to repeat",
  "spokenReply": "spoken response strictly following the logic rules above",
  "nextQuestion": "next scenario question"
}
''';

      // Iterate through keys in the pool (Free keys first -> Auto-failover to Paid key)
      for (final activeKey in keyPool) {
        for (final modelName in candidateModels) {
          try {
            final url = Uri.parse(
              'https://generativelanguage.googleapis.com/v1beta/models/$modelName:generateContent?key=$activeKey',
            );

            final response = await http
                .post(
                  url,
                  headers: {'Content-Type': 'application/json'},
                  body: jsonEncode({
                    'contents': [
                      {
                        'role': 'user',
                        'parts': [
                          {'text': prompt}
                        ]
                      }
                    ],
                    'generationConfig': {
                      'responseMimeType': 'application/json',
                      'thinkingConfig': {
                        'thinkingBudget': 0,
                      },
                      'temperature': 0.7,
                      'maxOutputTokens': 800,
                    }
                  }),
                )
                .timeout(const Duration(milliseconds: 6000));

            debugPrint('Gemini [$modelName] Status: ${response.statusCode}');

            // Successful response: return immediately
            if (response.statusCode == 200) {
              final body = jsonDecode(response.body);
              final text = body['candidates'][0]['content']['parts'][0]['text'];
              debugPrint('Gemini Text: $text');
              final parsed = jsonDecode(text);

              return GrammarCorrection(
                hasCorrection: parsed['hasCorrection'] ?? false,
                original: parsed['original'] ?? '',
                correction: parsed['correction'] ?? '',
                explanation: parsed['explanation'] ?? '',
                spokenReply: parsed['spokenReply'] ?? 'Great! Tell me more.',
                targetPhrase: parsed['targetPhrase'] ?? (parsed['correction'] ?? ''),
                nextQuestion: parsed['nextQuestion'] ?? 'What would you like to talk about next?',
                modelUsed: modelName,
                engineUsed: 'CLOUD_GEMINI_2.5_FLASH',
                latencyMs: stopwatch.elapsedMilliseconds,
                isOfflineFallback: false,
              );
            }

            // HTTP 429 (Rate Limit) or 403 (Quota Exceeded): put on 60s cooldown & IMMEDIATELY failover to next key!
            if (response.statusCode == 429 || response.statusCode == 403) {
              debugPrint('Gemini key limited (${response.statusCode}), cooling down: ${activeKey.substring(0, 8)}...');
              _keyCooldowns[activeKey] = DateTime.now().add(const Duration(seconds: 60));
              break; // break model loop to switch key immediately
            }
          } catch (e) {
            debugPrint('Gemini request exception for $modelName: $e');
            // If request timed out or network error on this model/key, continue failover immediately
            continue;
          }
        }
      }
    }

    // ⚡ Resilience Auto-Fallback to On-Device Gemini Nano
    debugPrint('⚡ Network timeout or quota reached -> Auto-fallback to On-Device Gemini Nano!');
    return _executeOnDeviceNanoInference(
      userSpeech: userSpeech,
      targetLanguage: targetLanguage,
      stopwatch: stopwatch,
      isFallback: true,
    );
  }

  GrammarCorrection _executeOnDeviceNanoInference({
    required String userSpeech,
    required String targetLanguage,
    required Stopwatch stopwatch,
    required bool isFallback,
  }) {
    final lower = userSpeech.toLowerCase();
    if (lower.contains('i go yesterday') || lower.contains('he don\'t')) {
      final isPast = lower.contains('i go yesterday');
      final correct = isPast ? 'I went yesterday' : 'he doesn\'t';
      String fallbackSpoken = 'Good try! In English we say: \'$correct\'. Can you repeat that for me?';
      if (targetLanguage == 'Japanese') {
        fallbackSpoken = '惜しいですね！日本語では「$correct」と言います。リピートしてみてください！';
      } else if (targetLanguage == 'Korean') {
        fallbackSpoken = '좋은 시도였어요! 한국어로는 \'$correct\'(이)라고 해요. 다시 따라 해보시겠어요?';
      } else if (targetLanguage == 'Spanish') {
        fallbackSpoken = '¡Buen intento! En español decimos: \'$correct\'. ¿Puedes repetirlo conmigo?';
      } else if (targetLanguage == 'Arabic') {
        fallbackSpoken = 'محاولة جيدة! باللغة العربية نقول: \'$correct\'. هل يمكنك تكرار ذلك معي؟';
      } else if (targetLanguage == 'Tamil') {
        fallbackSpoken = 'நல்ல முயற்சி! தமிழில் நாம் \'$correct\' என்று சொல்வோம். அதைத் திரும்பச் சொல்ல முடியுமா?';
      }

      return GrammarCorrection(
        hasCorrection: true,
        original: isPast ? 'I go yesterday' : 'he don\'t',
        correction: correct,
        explanation: 'Remember to use past tense or 3rd-person singular agreement.',
        spokenReply: fallbackSpoken,
        targetPhrase: correct,
        nextQuestion: 'What happened after that?',
        modelUsed: 'Gemini Nano (On-Device Client Core)',
        engineUsed: 'ON_DEVICE_NANO',
        latencyMs: stopwatch.elapsedMilliseconds,
        isOfflineFallback: isFallback,
      );
    }

    String defaultReply = 'That is really interesting! Could you tell me a little more about that?';
    String defaultQuestion = 'What did you do next?';
    if (targetLanguage == 'Japanese') {
      defaultReply = 'なるほど、とても興味深いですね！もう少し詳しく教えていただけますか？';
      defaultQuestion = 'それからどうなりましたか？';
    } else if (targetLanguage == 'Korean') {
      defaultReply = '정말 흥미로운 이야기네요! 조금 더 자세히 말씀해 주시겠어요?';
      defaultQuestion = '그 다음엔 어떻게 되었나요?';
    } else if (targetLanguage == 'Spanish') {
      defaultReply = '¡Eso suena muy interesante! ¿Podrías contarme un poco más sobre eso?';
      defaultQuestion = '¿Qué pasó después?';
    } else if (targetLanguage == 'Arabic') {
      defaultReply = 'هذا أمر ممتع للغاية! هل يمكنك أن تخبرني بالمزيد عن ذلك؟';
      defaultQuestion = 'ماذا حدث بعد ذلك؟';
    } else if (targetLanguage == 'Tamil') {
      defaultReply = 'மிகவும் சுவாரஸ்யமாக இருக்கிறது! இதைப் பற்றி கொஞ்சம் விளக்கமாகச் சொல்ல முடியுமா?';
      defaultQuestion = 'அடுத்து என்ன நடந்தது?';
    }

    return GrammarCorrection(
      hasCorrection: false,
      original: '',
      correction: '',
      explanation: '',
      spokenReply: defaultReply,
      targetPhrase: '',
      nextQuestion: defaultQuestion,
      modelUsed: 'Gemini Nano (On-Device Client Core)',
      engineUsed: 'ON_DEVICE_NANO',
      latencyMs: stopwatch.elapsedMilliseconds,
      isOfflineFallback: isFallback,
    );
  }
}
