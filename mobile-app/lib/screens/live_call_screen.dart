import '../services/auth_session_service.dart';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:flutter_tts/flutter_tts.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:video_player/video_player.dart';
import '../models/topic.dart';
import '../models/coach_persona.dart';
import '../services/gemini_voice_service.dart';
import '../services/language_pack_20.dart';
import '../services/web_speech_bridge.dart' as web_speech;
import 'welcome_screen.dart';

class LiveCallScreen extends StatefulWidget {
  final TopicModel topic;
  final int? durationMinutes; // null = unlimited
  final CoachPersona? coach;
  final bool isDarkMode;

  const LiveCallScreen({
    super.key,
    required this.topic,
    this.durationMinutes,
    this.coach,
    this.isDarkMode = true,
  });

  @override
  State<LiveCallScreen> createState() => _LiveCallScreenState();
}

class _LiveCallScreenState extends State<LiveCallScreen> with SingleTickerProviderStateMixin {
  late bool _isDarkMode;

  Color get _bgScaffold => _isDarkMode ? const Color(0xFF060911) : const Color(0xFFF8FAFC);
  Color get _bgCard => _isDarkMode ? const Color(0xFF0F172A) : Colors.white;
  Color get _bgCardElevated => _isDarkMode ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9);
  Color get _textPrimary => _isDarkMode ? Colors.white : const Color(0xFF0F172A);
  Color get _textSecondary => _isDarkMode ? Colors.white70 : const Color(0xFF475569);
  Color get _textMuted => _isDarkMode ? Colors.white38 : const Color(0xFF94A3B8);
  Color get _borderSubtle => _isDarkMode ? Colors.white.withOpacity(0.08) : const Color(0xFFE2E8F0);

  late stt.SpeechToText _speech;
  late FlutterTts _tts;
  AudioPlayer? _cloudAudioPlayer;
  bool _isUsingCloudAudio = false;
  bool _isStartingListening = false;
  final GeminiVoiceService _geminiService = GeminiVoiceService();
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  late CoachPersona _coach;
  VideoPlayerController? _videoController;
  VideoPlayerController? _idleVideoController;
  bool _isVideoInitialized = false;
  bool _isIdleVideoInitialized = false;
  bool _isCoachSpeakingVideoPlaying = false;
  String _lastRecognizedWords = '';

  void _initCoachVideo() {
    _videoController?.pause();
    _videoController?.dispose();
    _videoController = null;
    _isVideoInitialized = false;

    _idleVideoController?.pause();
    _idleVideoController?.dispose();
    _idleVideoController = null;
    _isIdleVideoInitialized = false;

    try {
      final controller = VideoPlayerController.asset(_coach.videoAsset);
      _videoController = controller;
      controller.initialize().then((_) {
        if (mounted && _videoController == controller) {
          controller.setLooping(true);
          controller.setVolume(0.0); // Strictly MUTED so only AI Coach TTS voice is heard
          if (_isCoachSpeakingVideoPlaying) {
            controller.play();
          } else {
            controller.pause();
          }
          setState(() {
            _isVideoInitialized = true;
          });
        }
      }).catchError((e) {
        debugPrint('Video player init error: $e');
        if (mounted) {
          setState(() {
            _isVideoInitialized = false;
          });
        }
      });
    } catch (e) {
      debugPrint('Video player setup error: $e');
    }

    if (_coach.idleVideoAsset != null) {
      try {
        final idleController = VideoPlayerController.asset(_coach.idleVideoAsset!);
        _idleVideoController = idleController;
        idleController.initialize().then((_) {
          if (mounted && _idleVideoController == idleController) {
            idleController.setLooping(true);
            idleController.setVolume(0.0);
            if (!_isBotSpeaking) {
              idleController.play();
            } else {
              idleController.pause();
            }
            setState(() {
              _isIdleVideoInitialized = true;
            });
          }
        }).catchError((e) {
          debugPrint('Idle video player init error (fallback to avatar image): $e');
          if (mounted) {
            setState(() {
              _isIdleVideoInitialized = false;
            });
          }
        });
      } catch (e) {
        debugPrint('Idle video player setup error: $e');
      }
    }
  }

  bool _isListening = false;
  bool _isBotSpeaking = false;
  bool _isProcessing = false;
  bool _isMuted = false;
  bool _callEnded = false;
  bool _isWrapUpTriggered = false;
  bool _isSttInitialized = false;
  bool _isConnectingCall = true;
  String _connectingStatus = 'Calling Coach...';

  String _userSpeech = '';
  String _botSubtitle = '';
  String _lastBotQuestion = '';
  String _lastHandledUtterance = '';
  DateTime _lastHandledTime = DateTime.fromMillisecondsSinceEpoch(0);
  DateTime? _lastBotSpeechFinishedTime;
  Map<String, String>? _selectedVoiceMap;
  bool _isNativeMaleVoiceSelected = false;
  GrammarCorrection? _activeCorrection;

  // Active Pronunciation Drill Loop State
  bool _isDrillMode = false;
  bool _hasMicPermission = true;
  int _nudgeCountForCurrentQuestion = 0;
  int _consecutiveSpeechAborts = 0;
  String _accumulatedSpeech = '';
  String _targetPhraseToRepeat = '';
  String _nextScenarioQuestion = '';
  int _drillAttempts = 0;

  // Analytics & Scoring tracking
  int _callDurationSeconds = 0;
  int? _remainingSeconds;
  int _userSpeechTurnsCount = 0;
  int _successfulDrillsCount = 0;
  int _totalDrillsAttempted = 0;
  int _totalWordsSpoken = 0;
  final List<Map<String, String>> _sessionCorrections = [];

  // Voice speed
  double _voiceSpeed = 0.9;
  Timer? _callTimer;
  Timer? _silenceTimer;
  Timer? _proactiveNudgeTimer;
  Timer? _reconnectTimer;
  Timer? _micKeepAliveTimer;
  Timer? _speechWatchdogTimer;
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _isDarkMode = widget.isDarkMode;
    _coach = widget.coach ?? CoachPersona.defaultCoach;
    _connectingStatus = 'Calling Coach ${_coach.name}...';
    if (kIsWeb) {
      try {
        web_speech.playCallRingtone();
      } catch (_) {}
    }
    _initCoachVideo();
    _speech = stt.SpeechToText();
    _tts = FlutterTts();
    try {
      _cloudAudioPlayer = AudioPlayer();
      _cloudAudioPlayer?.onPlayerStateChanged.listen((state) {
        if (state == PlayerState.playing && mounted) {
          _onBotSpeechStarted();
        }
      });
      _cloudAudioPlayer?.onPlayerComplete.listen((_) {
        if (mounted && _isUsingCloudAudio) {
          _isUsingCloudAudio = false;
          _onBotSpeechFinished();
        }
      });
    } catch (e) {
      debugPrint('AudioPlayer init error: $e');
    }
    _lastBotQuestion = widget.topic.starterPrompt;

    // Strict 30-minute hard cap to protect Gemini AI quota
    final int safeDuration = (widget.durationMinutes != null && widget.durationMinutes! > 0)
        ? widget.durationMinutes!.clamp(1, 30)
        : 5;
    _remainingSeconds = safeDuration * 60;

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    // Continuous Keep-Alive Watchdog for Always-On Microphone
    _micKeepAliveTimer = Timer.periodic(const Duration(milliseconds: 2500), (timer) {
      if (!mounted || _callEnded) {
        timer.cancel();
        return;
      }
      if (!_isMuted && !_isBotSpeaking && !_isProcessing && !_speech.isListening && !_isStartingListening) {
        _scheduleListeningRestart(delayMs: 100);
      }
    });

    _initAudioAndStartCall();
  }

  void _scheduleListeningRestart({int delayMs = 250}) {
    _reconnectTimer?.cancel();
    if (!mounted || _callEnded || _isMuted || _isBotSpeaking || _isProcessing) {
      return;
    }
    _reconnectTimer = Timer(Duration(milliseconds: delayMs), () {
      if (!mounted || _callEnded || _isMuted || _isBotSpeaking || _isProcessing) {
        return;
      }
      if (!_speech.isListening && !_isStartingListening) {
        _startListening();
      }
    });
  }

  void _onBotSpeechStarted() {
    if (!mounted || _callEnded) return;
    _reconnectTimer?.cancel();
    try {
      if (_speech.isListening) {
        _speech.stop();
      }
    } catch (_) {}
    try {
      _idleVideoController?.pause();
      _videoController?.seekTo(Duration.zero);
      _videoController?.play();
    } catch (_) {}
    if (!_isCoachSpeakingVideoPlaying) {
      setState(() {
        _isCoachSpeakingVideoPlaying = true;
        _isBotSpeaking = true;
        _isListening = false;
      });
    }
    _proactiveNudgeTimer?.cancel();

    // Reset watchdog to generous 35s timer once audio is actually live so coach is never cut off
    _speechWatchdogTimer?.cancel();
    _speechWatchdogTimer = Timer(const Duration(seconds: 35), () {
      if (mounted && _isBotSpeaking && !_callEnded) {
        debugPrint('TTS Watchdog triggered: unlocking microphone');
        _onBotSpeechFinished();
      }
    });
  }

  void _onBotSpeechFinished() {
    if (!mounted || _callEnded) return;
    _speechWatchdogTimer?.cancel();
    _speechWatchdogTimer = null;
    _lastBotSpeechFinishedTime = DateTime.now();
    try {
      _videoController?.pause();
      _videoController?.seekTo(Duration.zero);
      if (_idleVideoController != null && _isIdleVideoInitialized) {
        _idleVideoController?.play();
      }
    } catch (_) {}
    if (kIsWeb) {
      try {
        web_speech.stopWeb();
      } catch (_) {}
    }
    setState(() {
      _isCoachSpeakingVideoPlaying = false;
      _isBotSpeaking = false;
      _lastRecognizedWords = '';
      _accumulatedSpeech = '';
      _userSpeech = '';
    });
    if (!_isMuted && !_callEnded && !_isProcessing) {
      // Delay microphone restart by 650ms so acoustic room reverberation/speaker ring-out fully dies down
      _scheduleListeningRestart(delayMs: 650);
      _resetProactiveNudgeTimer();
    }
  }

  void _handleSpeechStatus(String status) {
    debugPrint('Speech status: $status');
    if (status == 'listening') {
      if (mounted) setState(() => _isListening = true);
      return;
    }

    if (status == 'done' || status == 'notListening') {
      if (mounted) setState(() => _isListening = false);

      if (!_isBotSpeaking && !_isProcessing && !_callEnded && !_isMuted) {
        if (_userSpeech.trim().isNotEmpty) {
          // If microphone stopped and student spoke, promptly dispatch within 350ms!
          _silenceTimer?.cancel();
          _silenceTimer = Timer(const Duration(milliseconds: 350), () {
            if (_userSpeech.trim().isNotEmpty && !_isProcessing && !_isBotSpeaking && !_callEnded) {
              final textToSubmit = _userSpeech.trim();
              _accumulatedSpeech = '';
              _lastRecognizedWords = '';
              _handleUserUtterance(textToSubmit);
            }
          });
        } else {
          // ALWAYS-ON MICROPHONE: Back off if browser aborted repeatedly (e.g. another tab holds mic lock)
          if (_consecutiveSpeechAborts < 2) {
            _scheduleListeningRestart(delayMs: 350);
          }
        }
      }
    }
  }

  void _handleSpeechError(dynamic error) {
    debugPrint('Speech error: $error (${error.errorMsg})');
    if (!mounted) return;
    setState(() => _isListening = false);

    final msg = error.errorMsg.toString().toLowerCase();

    // Only mark permanently denied if native OS explicitly denied permissions
    if (error.permanent == true || msg == 'error_permission') {
      setState(() => _hasMicPermission = false);
      return;
    }

    // Aborted or network errors: avoid tight restart loops in browser when another tab holds the mic
    if (msg.contains('aborted') || msg.contains('not-allowed') || msg.contains('network')) {
      _consecutiveSpeechAborts++;
      if (_consecutiveSpeechAborts == 2) {
        debugPrint('Microphone temporarily held or aborted repeatedly; pausing auto-restart until user interaction.');
      }
      return;
    }

    // Normal speech timeouts or recognition resets:
    // (error_no_match, error_speech_timeout, error_busy, etc.)
    if (!_isMuted && !_callEnded && !_isBotSpeaking && !_isProcessing) {
      _scheduleListeningRestart(delayMs: 600);
    }
  }

  Future<void> _initAudioAndStartCall() async {
    // Ensure active user session (Auto-restore for Judges and Learners)
    if (_auth.currentUser == null) {
      try {
        await AuthSessionService.restoreOrEnsureSession();
      } catch (_) {}
    }

    await _geminiService.initConfig();

    if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
      try {
        final engines = await _tts.getEngines;
        if (engines is List && engines.contains('com.google.android.tts')) {
          await _tts.setEngine('com.google.android.tts');
        }
      } catch (e) {
        debugPrint('TTS setEngine error: $e');
      }
    }

    // Setup TTS Voice Language for 6 Supported Languages
    final langCode = _getTopicLanguageCode();
    await _setEngineLanguage(langCode);

    await _applyCoachVoice(_coach);
    await _tts.setVolume(1.0);

    if (!kIsWeb) {
      try {
        await _tts.awaitSpeakCompletion(true);
      } catch (e) {
        debugPrint('TTS awaitSpeakCompletion error: $e');
      }
    }

    // One-time Speech-to-Text initialization for zero-delay instant mic detection
    try {
      _isSttInitialized = await _speech.initialize(
        options: [stt.SpeechToText.androidNoBluetooth],
        onStatus: _handleSpeechStatus,
        onError: _handleSpeechError,
      );
      _hasMicPermission = await _speech.hasPermission;
      debugPrint('Speech STT initialized: $_isSttInitialized, hasPermission: $_hasMicPermission');
    } catch (e) {
      debugPrint('STT init exception: $e');
    }

    _tts.setStartHandler(() {
      _onBotSpeechStarted();
    });

    _tts.setCompletionHandler(() {
      _onBotSpeechFinished();
    });

    if (kIsWeb) {
      web_speech.registerSpeechStarted(() {
        if (mounted) {
          debugPrint('Web Speech started -> onBotSpeechStarted()');
          _onBotSpeechStarted();
        }
      });
      web_speech.registerSpeechFinished(() {
        if (mounted && _isBotSpeaking) {
          debugPrint('Web Speech finished -> onBotSpeechFinished()');
          _onBotSpeechFinished();
        }
      });
    }

    _tts.setErrorHandler((msg) {
      debugPrint('TTS Error: $msg');
      final err = msg.toString().toLowerCase();
      // On Web/Chrome, 'interrupted' is fired whenever cancel() is called for previous utterance.
      // Do NOT treat 'interrupted' or 'canceled' as a fatal error that cancels bot speech!
      if (err.contains('interrupted') || err.contains('canceled')) {
        return;
      }
      _onBotSpeechFinished();
    });

    // Check remaining practice time allowance from Firestore
    final hasAvailableTime = await _checkTimeQuota();
    if (!hasAvailableTime) {
      if (kIsWeb) {
        try { web_speech.stopCallRingtone(); } catch (_) {}
      }
      return;
    }

    if (mounted) {
      setState(() {
        _connectingStatus = 'Securing HD Stream & Studio Audio...';
      });
    }

    // Opening prompt: Fresh, randomized, non-repeating opener across all 20 languages
    String openingText = LanguagePack20.buildVariedOpeningQuestion(
      language: widget.topic.language,
      defaultPrompt: widget.topic.starterPrompt,
      alternateQuestions: widget.topic.starterQuestions,
    );
    try {
      openingText = await _geminiService.generateDynamicOpening(
        topicTitle: widget.topic.title,
        scenarioContext: widget.topic.scenario,
        targetLanguage: widget.topic.language,
        coach: _coach,
        defaultPrompt: widget.topic.starterPrompt,
        alternateQuestions: widget.topic.starterQuestions,
      ).timeout(const Duration(milliseconds: 1100), onTimeout: () => openingText);
    } catch (_) {}

    // Ultra-snappy phone outgoing connection duration (200ms)
    await Future.delayed(const Duration(milliseconds: 200));

    if (mounted) {
      setState(() {
        _connectingStatus = 'Connected!';
      });
    }

    await Future.delayed(const Duration(milliseconds: 80));

    if (kIsWeb) {
      try {
        web_speech.stopCallRingtone();
      } catch (_) {}
    }

    if (mounted && !_callEnded) {
      setState(() {
        _isConnectingCall = false;
        _lastBotQuestion = openingText;
      });
      _startTimer();
      await Future.delayed(const Duration(milliseconds: 60));
      await _speakText(openingText);
    }
  }

  Future<bool> _checkTimeQuota() async {
    try {
      User? user = _auth.currentUser;
      if (user == null) {
        try {
          user = await AuthSessionService.restoreOrEnsureSession();
        } catch (_) {}
      }
      // If Judge VIP or demo session, always grant unlimited speaking time
      if (AuthSessionService.isDemoVip || AuthSessionService.isLoggedIn) {
        return true;
      }
      if (user == null) {
        return true; // fail-open for uninterrupted call access
      }

      // 1. Fetch system limit settings
      int dailyFreeLimit = 10;
      try {
        final settingsDoc = await _firestore.collection('lang_settings').doc('time_limits').get();
        if (settingsDoc.exists && settingsDoc.data() != null) {
          dailyFreeLimit = (settingsDoc.data()!['dailyFreeMinutes'] is num)
              ? (settingsDoc.data()!['dailyFreeMinutes'] as num).toInt()
              : 10;
        }
      } catch (_) {}

      // 2. Fetch user usage & packages
      final userDoc = await _firestore.collection('lang_users').doc(user.uid).get();
      if (!userDoc.exists || userDoc.data() == null) return true;

      final data = userDoc.data()!;
      final bool isVip = data['isVipMonthly'] == true;
      if (isVip) return true; // VIP has unlimited speaking time

      final String today = DateTime.now().toIso8601String().substring(0, 10);
      final String? lastDate = data['lastUsageDate'] as String?;
      final int usedToday = (lastDate == today) ? ((data['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;
      final int extraMinutes = (data['extraMinutes'] as num?)?.toInt() ?? 0;

      final int remainingMinutes = (dailyFreeLimit - usedToday) + extraMinutes;

      if (remainingMinutes <= 0) {
        if (mounted) {
          _showQuotaExhaustedDialog();
        }
        return false;
      }

      // Cap call countdown timer if remaining quota is lower than requested minutes
      final remainingSeconds = remainingMinutes * 60;
      if (_remainingSeconds == null || _remainingSeconds! > remainingSeconds) {
        _remainingSeconds = remainingSeconds;
      }

      return true;
    } catch (e) {
      debugPrint('Quota check error: $e');
      return true;
    }
  }

  void _showQuotaExhaustedDialog() {
    _callEnded = true;
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: Row(
          children: const [
            Icon(Icons.timer_off_rounded, color: Color(0xFFF59E0B), size: 26),
            SizedBox(width: 10),
            Text('Daily Limit Reached', style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'You have reached your daily free practice limit.',
              style: TextStyle(color: Colors.white70, fontSize: 13, height: 1.4),
            ),
            const SizedBox(height: 10),
            Text(
              'To continue speaking today, please top up extra minutes or activate a Monthly VIP pass in the Plans tab.',
              style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            child: const Text('Back to Home', style: TextStyle(color: Colors.white60)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context); // Will lead user to Home where they can switch to Plans
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF6366F1),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('View Packages', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  void _startTimer() {
    _callTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted || _callEnded || _isWrapUpTriggered) {
        timer.cancel();
        return;
      }

      setState(() {
        _callDurationSeconds++;
        if (_remainingSeconds != null) {
          if (_remainingSeconds! <= 1) {
            _remainingSeconds = 0;
            _callTimer?.cancel();
            _triggerTimedWrapUp();
          } else {
            _remainingSeconds = _remainingSeconds! - 1;
          }
        }
      });
    });
  }

  void _triggerTimedWrapUp() {
    if (_isWrapUpTriggered || _callEnded) return;
    _isWrapUpTriggered = true;
    _callTimer?.cancel();
    _proactiveNudgeTimer?.cancel();
    _silenceTimer?.cancel();

    final wrapUpMsg = LanguagePack20.resolve(widget.topic.language).wrapUp;

    _speakText(wrapUpMsg);
    Future.delayed(const Duration(seconds: 4), () {
      if (mounted && !_callEnded) {
        _endCallAndShowScore();
      }
    });
  }

  // PROACTIVE BOT KEEP-ALIVE (25-second silence re-engagement with rotating varied prompts; NEVER interrupts actively speaking learner)
  void _resetProactiveNudgeTimer() {
    _proactiveNudgeTimer?.cancel();
    if (_nudgeCountForCurrentQuestion >= 3 || _isBotSpeaking || _isProcessing || _callEnded) return;

    // Strict speech guard: If learner is already speaking or words are pending, do not start nudge
    if (_userSpeech.trim().isNotEmpty || _accumulatedSpeech.trim().isNotEmpty || _lastRecognizedWords.trim().isNotEmpty) {
      return;
    }

    // 25-second inactivity re-engagement (rotates up to 3 different nudges if student stays silent)
    _proactiveNudgeTimer = Timer(const Duration(seconds: 25), () {
      if (mounted && !_isBotSpeaking && !_isProcessing && !_callEnded && _nudgeCountForCurrentQuestion < 3) {
        _triggerProactiveSilenceNudge();
      }
    });
  }

  void _triggerProactiveSilenceNudge() {
    // STRICT SPEECH GUARD: If student is actively speaking, words have arrived, or user just answered, NEVER interrupt!
    if (_isBotSpeaking ||
        _isProcessing ||
        _callEnded ||
        _nudgeCountForCurrentQuestion >= 3 ||
        _userSpeech.trim().isNotEmpty ||
        _accumulatedSpeech.trim().isNotEmpty ||
        _lastRecognizedWords.trim().isNotEmpty) {
      return;
    }

    final bundle = LanguagePack20.resolve(widget.topic.language);
    final rawNudge = bundle.nudges[_nudgeCountForCurrentQuestion % bundle.nudges.length];
    final question = _lastBotQuestion.isNotEmpty ? _lastBotQuestion : widget.topic.starterPrompt;
    // On the first nudge, remind them gently of the active question; on subsequent nudges, vary naturally!
    final nudge = _nudgeCountForCurrentQuestion == 0 && question.isNotEmpty
        ? '$rawNudge $question'
        : rawNudge;
    _nudgeCountForCurrentQuestion++;

    _speakText(nudge, isNudge: true);
  }

  String _formatDuration(int seconds) {
    final mins = (seconds ~/ 60).toString().padLeft(2, '0');
    final secs = (seconds % 60).toString().padLeft(2, '0');
    return '$mins:$secs';
  }

  String _cleanSpeechTextForLanguage(String rawText, String language) {
    String cleaned = rawText.replaceAll(RegExp(r'\([^)]*\)'), '').trim();
    cleaned = cleaned.replaceAll(RegExp(r'\[[^\]]*\]'), '').trim();
    cleaned = cleaned.replaceAll('"', '').replaceAll("'", '').trim();
    if (cleaned.isNotEmpty) return cleaned;
    return rawText.replaceAll('"', '').trim();
  }

  bool _isExplicitMaleVoice(String voiceName) {
    final n = voiceName.toLowerCase();
    // CRITICAL: Any voice containing female indicators MUST NOT be treated as male!
    if (n.contains('female') ||
        n.contains('#female') ||
        n.contains('-female') ||
        n.contains('woman') ||
        n.contains('girl') ||
        n.contains('_f0') ||
        n.contains('zira') ||
        n.contains('susan') ||
        n.contains('hazel') ||
        n.contains('sfg') ||
        n.contains('tpf') ||
        n.contains('fis') ||
        n.contains('cfs') ||
        n.contains('afh') ||
        n.contains('cfl')) {
      return false;
    }
    return n.contains('male') ||
        n.contains('#male') ||
        n.contains('-male') ||
        n.contains('_m0') ||
        n.contains('david') ||
        n.contains('mark') ||
        n.contains('george') ||
        n.contains('guy') ||
        n.contains('iom') ||
        n.contains('iob') ||
        n.contains('iol') ||
        n.contains('tpd') ||
        n.contains('rjs') ||
        n.contains('aub') ||
        n.contains('ahp') ||
        n.contains('keita') ||
        n.contains('naoki');
  }

  double _getPlatformSpeechRate(CoachPersona coach) {
    final baseSpeed = coach.speechRate * _voiceSpeed;
    if (kIsWeb) {
      return (baseSpeed * 0.98).clamp(0.75, 1.25);
    } else {
      // On Android / iOS, flutter_tts treats 0.5 as normal (1.0x) conversational speed.
      // 0.52 gives a crisp, natural, brisk conversational pace that eliminates any sluggish or robotic drag!
      return (baseSpeed * 0.52).clamp(0.44, 0.65);
    }
  }

  double _getPlatformPitch(CoachPersona coach, {bool isNativeMaleVoice = false}) {
    if (coach.isFemale) {
      if (kIsWeb) {
        return 1.05;
      }
      return 1.18; // Crisp, warm, melodious feminine tone on Android mobile
    } else {
      // MALE COACH:
      if (isNativeMaleVoice) {
        // Device has an actual physical male recording (e.g. David, Mark, iom, iob)
        return 1.0; // Confident, warm, resonant natural male voice
      } else {
        // Device only has a female or generic engine voice:
        // Use 0.84 to give a clean, masculine timbre WITHOUT the gravelly, robotic, slow-motion distortion of 0.56!
        return 0.84;
      }
    }
  }

  String _getTopicLanguageCode() {
    final lang = widget.topic.language.toLowerCase().trim();
    if (lang.contains('jap') || lang.startsWith('ja')) return 'ja-JP';
    if (lang.contains('kor') || lang.startsWith('ko')) return 'ko-KR';
    if (lang.contains('span') || lang.contains('espa') || lang.startsWith('es')) return 'es-ES';
    if (lang.contains('arab') || lang.startsWith('ar')) return 'ar-SA';
    if (lang.contains('tamil') || lang.startsWith('ta')) return 'ta-IN';
    if (lang.contains('french') || lang.contains('fran') || lang.startsWith('fr')) return 'fr-FR';
    if (lang.contains('german') || lang.contains('deutsch') || lang.startsWith('de')) return 'de-DE';
    if (lang.contains('italian') || lang.contains('ital') || lang.startsWith('it')) return 'it-IT';
    if (lang.contains('portug') || lang.startsWith('pt')) return 'pt-BR';
    if (lang.contains('chinese') || lang.contains('mandarin') || lang.startsWith('zh')) return 'zh-CN';
    if (lang.contains('hindi') || lang.startsWith('hi')) return 'hi-IN';
    if (lang.contains('russian') || lang.startsWith('ru')) return 'ru-RU';
    if (lang.contains('sinhala') || lang.startsWith('si')) return 'si-LK';
    if (lang.contains('dutch') || lang.contains('nederland') || lang.startsWith('nl')) return 'nl-NL';
    if (lang.contains('turk') || lang.startsWith('tr')) return 'tr-TR';
    if (lang.contains('viet') || lang.startsWith('vi')) return 'vi-VN';
    if (lang.contains('indones') || lang.startsWith('id')) return 'id-ID';
    if (lang.contains('thai') || lang.startsWith('th')) return 'th-TH';
    if (lang.contains('swed') || lang.startsWith('sv') || lang.startsWith('se')) return 'sv-SE';
    return 'en-US';
  }

  Future<void> _setEngineLanguage(String bcp47Code) async {
    final shortCode = bcp47Code.split('-').first;
    final underscoreCode = bcp47Code.replaceAll('-', '_');
    try {
      final res = await _tts.setLanguage(bcp47Code);
      if (res == 1) return;
    } catch (_) {}
    try {
      final res = await _tts.setLanguage(underscoreCode);
      if (res == 1) return;
    } catch (_) {}
    try {
      await _tts.setLanguage(shortCode);
    } catch (_) {}
  }

  Future<void> _applyCoachVoice(CoachPersona coach) async {
    try {
      final langCode = _getTopicLanguageCode();
      await _setEngineLanguage(langCode);

      dynamic voices = await _tts.getVoices;
      int retries = 0;
      while ((voices == null || (voices is List && voices.isEmpty)) && retries < 6) {
        await Future.delayed(const Duration(milliseconds: 150));
        voices = await _tts.getVoices;
        retries++;
      }

      if (voices is List && voices.isNotEmpty) {
        final targetLang = widget.topic.language.toLowerCase();

        // 1. Filter voices for the current learning language
        final List<Map<String, String>> candidatePool = [];
        for (final v in voices) {
          if (v is! Map) continue;
          final name = (v['name'] ?? '').toString();
          final locale = (v['locale'] ?? '').toString();
          final locLower = locale.toLowerCase();
          final nameLower = name.toLowerCase();

          bool langMatches = false;
          if (targetLang.contains('jap')) {
            langMatches = locLower.startsWith('ja') || locLower.contains('jp') || nameLower.contains('japanese') || nameLower.contains('日本語') || nameLower.contains('japan');
          } else if (targetLang.contains('kor')) {
            langMatches = locLower.startsWith('ko') || locLower.contains('kr') || nameLower.contains('korean') || nameLower.contains('한국');
          } else if (targetLang.contains('span')) {
            langMatches = locLower.startsWith('es') || nameLower.contains('spanish') || nameLower.contains('español');
          } else if (targetLang.contains('arab')) {
            langMatches = locLower.startsWith('ar') || nameLower.contains('arabic') || nameLower.contains('عربي');
          } else if (targetLang.contains('tamil')) {
            langMatches = locLower.startsWith('ta') || nameLower.contains('tamil') || nameLower.contains('தமிழ்');
          } else {
            langMatches = locLower.startsWith('en') || nameLower.contains('english');
          }

          if (langMatches) {
            candidatePool.add({'name': name, 'locale': locale});
          }
        }

        // CRITICAL FIX: If candidatePool has matching voices for this target language, select from it!
        // If candidatePool is EMPTY (e.g. device has no custom voice installed for Tamil/Arabic),
        // DO NOT fallback to English voices! Fallback must be null so that _tts.setLanguage()
        // uses the platform's native synthesizer directly without being corrupted by an English voice!
        if (candidatePool.isNotEmpty) {
          final poolToUse = candidatePool;
          Map<String, String>? matchedVoice;

          if (coach.isFemale) {
            // 1. Priority: Match explicit female voice names and Google/Samsung TTS female voice codes
            for (final v in poolToUse) {
              final n = v['name']!.toLowerCase();
              if (n.contains('female') ||
                  n.contains('#female') ||
                  n.contains('-female') ||
                  n.contains('_f0') ||
                  n.contains('-fem-') ||
                  n.contains('woman') ||
                  n.contains('girl') ||
                  n.contains('zira') ||
                  n.contains('susan') ||
                  n.contains('hazel') ||
                  n.contains('aria') ||
                  n.contains('jenny') ||
                  n.contains('ayumi') ||
                  n.contains('mizuki') ||
                  n.contains('seoyeon') ||
                  n.contains('yuna') ||
                  n.contains('sunhi') ||
                  n.contains('zeina') ||
                  n.contains('salma') ||
                  n.contains('leila') ||
                  n.contains('lucia') ||
                  n.contains('elena') ||
                  n.contains('mia') ||
                  // Google TTS Android female voice codes:
                  n.contains('koc') || // ko-kr-x-koc
                  n.contains('kod') || // ko-kr-x-kod
                  n.contains('kof') || // ko-kr-x-kof
                  n.contains('htm') || // ja-jp-x-htm
                  n.contains('jad') || // ja-jp-x-jad
                  n.contains('jaf') || // ja-jp-x-jaf
                  n.contains('sfb') || // ja-jp-x-sfb / es-us-x-sfb
                  n.contains('eea') || // es-es-x-eea
                  n.contains('eed') || // es-es-x-eed
                  n.contains('eee') || // es-es-x-eee
                  n.contains('ard') || // ar-xa-x-ard
                  n.contains('are') || // ar-xa-x-are
                  n.contains('tag') || // ta-in-x-tag
                  n.contains('tad') || // ta-in-x-tad
                  n.contains('sfg') ||
                  n.contains('tpf') ||
                  n.contains('iof') ||
                  n.contains('cfs') ||
                  n.contains('fis') ||
                  n.contains('female_1')) {
                matchedVoice = v;
                break;
              }
            }

            // 2. If no explicit female keyword matched, select ANY voice that is NOT male
            if (matchedVoice == null) {
              for (final v in poolToUse) {
                final n = v['name']!.toLowerCase();
                final isMale = n.contains('male') ||
                    n.contains('#male') ||
                    n.contains('-male') ||
                    n.contains('_m0') ||
                    n.contains('david') ||
                    n.contains('mark') ||
                    n.contains('george') ||
                    n.contains('guy') ||
                    n.contains('man') ||
                    n.contains('boy') ||
                    n.contains('koa') ||
                    n.contains('kob') ||
                    n.contains('koe') ||
                    n.contains('jab') ||
                    n.contains('jac') ||
                    n.contains('eeb') ||
                    n.contains('eec') ||
                    n.contains('arc') ||
                    n.contains('arb') ||
                    n.contains('tab') ||
                    n.contains('tac');
                if (!isMale) {
                  matchedVoice = v;
                  break;
                }
              }
            }

            matchedVoice ??= poolToUse.first;
            _isNativeMaleVoiceSelected = false;
          } else {
            // MALE COACH:
            // Step 1: Search for explicit male identifiers in the candidate voices
            for (final v in poolToUse) {
              final n = v['name']!.toLowerCase();
              if (_isExplicitMaleVoice(n)) {
                matchedVoice = v;
                _isNativeMaleVoiceSelected = true;
                break;
              }
            }

            // Step 2: If no explicit male voice found, try to find a voice that is NOT female
            if (matchedVoice == null) {
              final nonFemalePool = poolToUse.where((v) {
                final n = v['name']!.toLowerCase();
                return !(n.contains('female') ||
                    n.contains('#female') ||
                    n.contains('-female') ||
                    n.contains('_f0') ||
                    n.contains('woman') ||
                    n.contains('girl') ||
                    n.contains('zira') ||
                    n.contains('susan') ||
                    n.contains('hazel') ||
                    n.contains('aria') ||
                    n.contains('jenny') ||
                    n.contains('ayumi') ||
                    n.contains('sfg') ||
                    n.contains('tpf') ||
                    n.contains('iof') ||
                    n.contains('cfs') ||
                    n.contains('fis'));
              }).toList();

              if (nonFemalePool.isNotEmpty) {
                matchedVoice = nonFemalePool.first;
              }
            }

            // Step 3: Fallback cleanly to pool
            if (matchedVoice == null && poolToUse.length > 1) {
              matchedVoice = poolToUse[1];
            } else if (matchedVoice == null && poolToUse.isNotEmpty) {
              matchedVoice = poolToUse.first;
            }

            _isNativeMaleVoiceSelected = matchedVoice != null && _isExplicitMaleVoice(matchedVoice['name']!);
          }

          if (matchedVoice != null) {
            _selectedVoiceMap = matchedVoice;
            debugPrint('Selected Coach TTS Voice: ${_selectedVoiceMap!['name']} (Female: ${coach.isFemale}, NativeMale: $_isNativeMaleVoiceSelected)');
            try {
              await _tts.setVoice(_selectedVoiceMap!);
            } catch (e) {
              debugPrint('TTS setVoice error: $e');
            }
          }
        } else {
          // No language-specific voice map on device: Keep null so setLanguage drives the native voice!
          _selectedVoiceMap = null;
          _isNativeMaleVoiceSelected = false;
        }
      }
    } catch (e) {
      debugPrint('Error applying coach voice: $e');
    }

    // Set Pitch & Speed Rate AFTER setVoice so Android TTS does not reset custom values
    await _tts.setPitch(_getPlatformPitch(coach, isNativeMaleVoice: _isNativeMaleVoiceSelected));
    await _tts.setSpeechRate(_getPlatformSpeechRate(coach));
  }

  Future<void> _updateVoiceSpeed(double newSpeed) async {
    setState(() => _voiceSpeed = newSpeed);
    await _applyCoachVoice(_coach);
  }

  String _getTtsApiUrl(String text, String language) {
    // Local / LAN Next.js Edge Neural TTS Endpoint
    // 10.0.2.2 is Android emulator's loopback to host machine
    final String host = (!kIsWeb && defaultTargetPlatform == TargetPlatform.android)
        ? 'http://10.0.2.2:3001'
        : 'http://localhost:3001';

    return '$host/api/tts?text=${Uri.encodeComponent(text)}&coach=${Uri.encodeComponent(_coach.id)}&gender=${Uri.encodeComponent(_coach.gender)}&language=${Uri.encodeComponent(language)}';
  }

  Future<bool> _playCloudTts(String text, String language) async {
    if (_cloudAudioPlayer == null) return false;

    final textToPlay = text.trim();
    if (textToPlay.isEmpty) return false;

    try {
      final url = _getTtsApiUrl(textToPlay, language);
      debugPrint('Streaming Edge Neural TTS from: $url');
      _isUsingCloudAudio = true;
      await _cloudAudioPlayer?.stop();
      final rate = _coach.isFemale ? 1.05 : 0.98;
      await _cloudAudioPlayer?.setPlaybackRate(rate);
      await _cloudAudioPlayer?.play(UrlSource(url));
      return true;
    } catch (e) {
      debugPrint('Cloud Edge Neural TTS playback error: $e');
      _isUsingCloudAudio = false;
      return false;
    }
  }

  Future<void> _speakText(String text, {String? overrideQuestion, bool isNudge = false}) async {
    if (!mounted || _callEnded) return;
    _proactiveNudgeTimer?.cancel();
    if (!isNudge) {
      _nudgeCountForCurrentQuestion = 0;
    }

    // 1. Immediately turn off speech-to-text listener so microphone doesn't capture bot output
    try {
      await _speech.cancel();
      await _speech.stop();
    } catch (_) {}

    setState(() {
      _botSubtitle = text;
      if (!isNudge) {
        _lastBotQuestion = overrideQuestion ?? text;
      }
      _isBotSpeaking = true;
      _isCoachSpeakingVideoPlaying = false; // Video will engage strictly when audio playback begins!
      _isProcessing = false;
      _isListening = false;
      _accumulatedSpeech = '';
      _userSpeech = '';
      _lastRecognizedWords = '';
    });

    // 2. Stop previous audio first
    try {
      await _cloudAudioPlayer?.stop();
      _isUsingCloudAudio = false;
      await _tts.stop();
    } catch (_) {}
    await Future.delayed(const Duration(milliseconds: 50));

    if (!mounted || _callEnded) return;

    // 3. Clean language-appropriate text (removes English romanizations, brackets)
    final cleanText = _cleanSpeechTextForLanguage(text, widget.topic.language);

    // 4. Safety watchdog: Generously scaled so it NEVER prematurely truncates continuous speech (especially Japanese/Korean without spaces!)
    _speechWatchdogTimer?.cancel();
    final lang = widget.topic.language.toLowerCase();
    final isCjk = lang.contains('jap') ||
        lang.contains('kor') ||
        lang.contains('chin') ||
        RegExp(r'[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\uac00-\ud7af]').hasMatch(cleanText);

    int durationEstMs;
    if (isCjk) {
      durationEstMs = (cleanText.length * 280) + 4500;
    } else {
      final words = cleanText.split(RegExp(r'\s+')).where((w) => w.isNotEmpty).length;
      final wordDuration = words * 520;
      final charDuration = cleanText.length * 90;
      durationEstMs = (wordDuration > charDuration ? wordDuration : charDuration) + 4000;
    }
    final maxSpeechDurationMs = (durationEstMs + 8000).clamp(15000, 45000);
    _speechWatchdogTimer = Timer(Duration(milliseconds: maxSpeechDurationMs), () {
      if (mounted && _isBotSpeaking && !_callEnded) {
        debugPrint('TTS Watchdog triggered: unlocking microphone');
        _onBotSpeechFinished();
      }
    });

    // 5. Speech Output Strategy: DUAL-TIER HYBRID AUDIO
    // ONLINE ENGINE: Microsoft Edge Neural Studio Voices (Ultra-Realistic Human Speech, 100% verified Male/Female)
    // OFFLINE FALLBACK: Device Local TTS when In-Flight / Offline Simulation mode is engaged
    if (!_geminiService.simulateOffline) {
      if (kIsWeb) {
        final langCode = _getTopicLanguageCode();
        try {
          web_speech.speakWeb(cleanText, langCode, coach: _coach.id, gender: _coach.gender);
          return;
        } catch (e) {
          debugPrint('Web speech bridge error: $e');
        }
      } else {
        try {
          final played = await _playCloudTts(cleanText, widget.topic.language);
          if (played) return;
        } catch (e) {
          debugPrint('Cloud Edge Neural TTS playback attempt error, falling back to local TTS: $e');
        }
      }
    }

    final langCode = _getTopicLanguageCode();
    await _setEngineLanguage(langCode);

    if (kIsWeb) {
      try {
        web_speech.speakWeb(cleanText, langCode, coach: '${_coach.id}_offline', gender: _coach.gender);
      } catch (e) {
        debugPrint('Web speech bridge error: $e');
      }
      return;
    }

    if (_selectedVoiceMap == null) {
      await _applyCoachVoice(_coach);
    } else {
      try {
        await _tts.setVoice(_selectedVoiceMap!);
      } catch (e) {
        debugPrint('setVoice error: $e');
      }
    }

    final double effectivePitch = _getPlatformPitch(_coach, isNativeMaleVoice: _isNativeMaleVoiceSelected);
    final double effectiveRate = _getPlatformSpeechRate(_coach);
    await _tts.setPitch(effectivePitch);
    await _tts.setSpeechRate(effectiveRate);

    try {
      await _tts.speak(cleanText);
    } catch (e) {
      debugPrint('Native TTS speak error: $e');
    }

    if (mounted && _isBotSpeaking) {
      _onBotSpeechFinished();
    }
  }

  void _repeatLastCoachAudio() {
    if (_isBotSpeaking) return;
    final phraseToRepeat = (_isDrillMode && _targetPhraseToRepeat.isNotEmpty)
        ? _targetPhraseToRepeat
        : _lastBotQuestion;
    if (phraseToRepeat.isNotEmpty) {
      ScaffoldMessenger.of(context).hideCurrentSnackBar();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('🔊 Repeating coach audio...'),
          duration: Duration(milliseconds: 1400),
          behavior: SnackBarBehavior.floating,
          backgroundColor: Color(0xFF0284C7),
        ),
      );
      _speakText(phraseToRepeat);
    }
  }

  Future<void> _startListening() async {
    if (!mounted || _callEnded || _isBotSpeaking || _isCoachSpeakingVideoPlaying || _isProcessing || _isMuted) return;
    if (_isStartingListening || _speech.isListening) return;

    _isStartingListening = true;
    try {
      if (!_isSttInitialized) {
        _isSttInitialized = await _speech.initialize(
          options: [stt.SpeechToText.androidNoBluetooth],
          onStatus: _handleSpeechStatus,
          onError: _handleSpeechError,
        );
        _hasMicPermission = await _speech.hasPermission;
      }

      if (!mounted || _callEnded || _isBotSpeaking || _isCoachSpeakingVideoPlaying || _isProcessing || _isMuted) return;
      if (_speech.isListening) {
        if (mounted) setState(() => _isListening = true);
        return;
      }

      if (_isSttInitialized && mounted) {
        setState(() => _isListening = true);

        final langCode = _getTopicLanguageCode();
        String defaultLocaleId = langCode;
        String localeId = defaultLocaleId;
        try {
          final locales = await _speech.locales();
          final targetPrefix = langCode.split('-').first.toLowerCase();
          final found = locales.where((l) {
            final loc = l.localeId.toLowerCase().replaceAll('_', '-');
            return loc.startsWith(targetPrefix);
          }).toList();
          if (found.isNotEmpty) {
            localeId = found.first.localeId;
          }
        } catch (e) {
          debugPrint('Locale resolution fallback: $e');
        }

        await _speech.listen(
          localeId: localeId,
          listenMode: stt.ListenMode.dictation,
          partialResults: true,
          cancelOnError: false,
          pauseFor: const Duration(seconds: 10),
          listenFor: const Duration(seconds: 180),
          onResult: (result) {
            if (!mounted) return;
            // Guard: If bot is speaking, audio is playing, or already processing, ignore microphone input
            if (_isProcessing || _isBotSpeaking || _isCoachSpeakingVideoPlaying || _callEnded) return;

            _proactiveNudgeTimer?.cancel();
            _consecutiveSpeechAborts = 0;

            final currentSegment = result.recognizedWords.trim();
            final combinedText = _accumulatedSpeech.isEmpty
                ? currentSegment
                : currentSegment.isEmpty
                    ? _accumulatedSpeech
                    : '$_accumulatedSpeech $currentSegment';

            final bool wordsChanged = combinedText != _lastRecognizedWords;
            if (wordsChanged) {
              _lastRecognizedWords = combinedText;
              setState(() {
                _userSpeech = combinedText;
              });

              // Words updated: set responsive 750ms silence timer
              _silenceTimer?.cancel();
              if (combinedText.isNotEmpty) {
                _silenceTimer = Timer(const Duration(milliseconds: 750), () {
                  if (_userSpeech.trim().isNotEmpty && !_isProcessing && !_isBotSpeaking && !_callEnded) {
                    final textToSubmit = _userSpeech.trim();
                    _accumulatedSpeech = '';
                    _lastRecognizedWords = '';
                    _handleUserUtterance(textToSubmit);
                  }
                });
              }
            }

            if (result.finalResult && currentSegment.isNotEmpty) {
              // Final segment recognized: promptly submit in 350ms
              if (_accumulatedSpeech.isEmpty) {
                _accumulatedSpeech = currentSegment;
              } else if (!_accumulatedSpeech.contains(currentSegment)) {
                _accumulatedSpeech = '$_accumulatedSpeech $currentSegment';
              }
              _silenceTimer?.cancel();
              _silenceTimer = Timer(const Duration(milliseconds: 350), () {
                if (_userSpeech.trim().isNotEmpty && !_isProcessing && !_isBotSpeaking && !_callEnded) {
                  final textToSubmit = _userSpeech.trim();
                  _accumulatedSpeech = '';
                  _lastRecognizedWords = '';
                  _handleUserUtterance(textToSubmit);
                }
              });
            }
          },
        );
      }
    } catch (e) {
      debugPrint('Speech listen exception: $e');
      try {
        await _speech.stop();
        await _speech.cancel();
      } catch (_) {}
      if (mounted) setState(() => _isListening = false);
      if (!_isMuted && !_callEnded && !_isBotSpeaking && !_isCoachSpeakingVideoPlaying && !_isProcessing) {
        _scheduleListeningRestart(delayMs: 400);
      }
    } finally {
      _isStartingListening = false;
    }
  }

  bool _isAcousticEcho(String utterance) {
    final u = utterance.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '').trim();
    if (u.isEmpty) return true;

    // A. Drill Mode: if user is repeating the drill target phrase, NEVER treat as echo!
    if (_isDrillMode && _targetPhraseToRepeat.isNotEmpty) {
      final target = _targetPhraseToRepeat.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '').trim();
      if (u == target || (u.length > 3 && target.contains(u)) || (target.length > 3 && u.contains(target))) {
        return false;
      }
    }

    // B. Temporal Acoustic Shield: If the bot finished speaking more than 1200ms ago,
    // speaker room reverberation is physically impossible. Everything heard is 100% genuine user speech!
    if (_lastBotSpeechFinishedTime != null &&
        DateTime.now().difference(_lastBotSpeechFinishedTime!).inMilliseconds > 1200) {
      return false;
    }

    // C. Reject coach identity phrases where the mic picked up the bot introducing itself
    final coachName = _coach.name.toLowerCase();
    if (u.contains('coach $coachName') ||
        u.contains('im coach') ||
        u.contains('i am coach') ||
        u.contains('coach here') ||
        u.contains('hello there coach')) {
      return true;
    }

    // D. Short conversational answers (< 5 words or < 22 chars) are NEVER echo
    // (e.g. "I like T20", "Test matches", "Yes of course", "In Sri Lanka", "No thanks", "Definitely")
    final words = u.split(RegExp(r'\s+')).where((w) => w.isNotEmpty).toList();
    if (words.length < 5 || u.length < 22) {
      return false;
    }

    // E. Long Sentence Echo: Only flag as echo if the microphone picked up almost the ENTIRE bot sentence
    final botSub = _botSubtitle.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '').trim();
    final botQ = _lastBotQuestion.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '').trim();
    final compareText = botSub.isNotEmpty ? botSub : botQ;

    if (compareText.isNotEmpty) {
      // 1. Exact full sentence match
      if (u == compareText && u.length >= 20) {
        return true;
      }

      // 2. High word overlap on full sentences (only if both have 5+ significant words)
      final uWords = u.split(RegExp(r'\s+')).where((w) => w.length > 2).toSet();
      final botWords = compareText.split(RegExp(r'\s+')).where((w) => w.length > 2).toSet();
      if (uWords.length >= 5 && botWords.length >= 5) {
        final intersection = uWords.intersection(botWords).length;
        final overlapRatio = intersection / uWords.length;
        // Over 85% of user words match bot sentence AND user uttered 5+ words
        if (overlapRatio >= 0.85) {
          return true;
        }
      }
    }

    return false;
  }

  Future<void> _handleUserUtterance(String utterance) async {
    _accumulatedSpeech = '';
    final cleanUtterance = utterance.trim();
    final now = DateTime.now();

    // Deduplication check: ignore if already processing, bot speaking, or duplicate text within 4 seconds
    if (_isProcessing || _isBotSpeaking || _isCoachSpeakingVideoPlaying || cleanUtterance.isEmpty || _callEnded) return;
    if (cleanUtterance.toLowerCase() == _lastHandledUtterance.toLowerCase() &&
        now.difference(_lastHandledTime).inMilliseconds < 4000) {
      debugPrint('Ignoring duplicate speech trigger: $cleanUtterance');
      return;
    }

    // Acoustic Echo Guard: Reject microphone picking up AI Coach speaker output (room reverb / laptop speaker bleeding)
    if (_isAcousticEcho(cleanUtterance)) {
      debugPrint('Acoustic echo detected from bot output, discarded: $cleanUtterance');
      setState(() {
        _userSpeech = '';
        _accumulatedSpeech = '';
        _lastRecognizedWords = '';
      });
      return;
    }

    _lastHandledUtterance = cleanUtterance;
    _lastHandledTime = now;
    _isProcessing = true;
    _isListening = false;
    _silenceTimer?.cancel();
    _proactiveNudgeTimer?.cancel();
    _userSpeechTurnsCount++;
    final wordsInUtterance = cleanUtterance.split(RegExp(r'\s+')).where((w) => w.isNotEmpty).length;
    _totalWordsSpoken += wordsInUtterance;

    setState(() {
      _botSubtitle = 'Analyzing and generating next question...';
    });

    try {
      if (_speech.isListening) {
        await _speech.stop();
      }
    } catch (_) {}

    try {
      // 1. ACTIVE PRONUNCIATION DRILL REPETITION EVALUATION
      if (_isDrillMode) {
        _totalDrillsAttempted++;
        final isCorrect = await _geminiService.evaluateRepetition(
          userSpeech: utterance,
          targetPhrase: _targetPhraseToRepeat,
          targetLanguage: widget.topic.language,
        );

        if (isCorrect) {
          _successfulDrillsCount++;
          if (mounted) {
            setState(() {
              _isDrillMode = false;
              _activeCorrection = null;
              _drillAttempts = 0;
              _isProcessing = false;
            });

            final bundle = LanguagePack20.resolve(widget.topic.language);
            final String praise = bundle.praise;
            final String fallbackQ = bundle.praiseQuestion;

            final followUp = _nextScenarioQuestion.isNotEmpty
                ? "$praise $_nextScenarioQuestion"
                : "$praise $fallbackQ";
            final questionToDisplay = _nextScenarioQuestion.isNotEmpty
                ? _nextScenarioQuestion
                : fallbackQ;
            _lastBotQuestion = questionToDisplay;
            await _speakText(followUp, overrideQuestion: questionToDisplay);
          }
          return;
        } else {
          _drillAttempts++;
          if (_drillAttempts >= 2) {
            if (mounted) {
              setState(() {
                _isDrillMode = false;
                _activeCorrection = null;
                _drillAttempts = 0;
                _isProcessing = false;
              });

              final bundle = LanguagePack20.resolve(widget.topic.language);
              final String grace = bundle.grace;
              final String fallbackGraceQ = bundle.graceQuestion;

              final followUp = _nextScenarioQuestion.isNotEmpty
                  ? "$grace $_nextScenarioQuestion"
                  : "$grace $fallbackGraceQ";
              final questionToDisplay = _nextScenarioQuestion.isNotEmpty
                  ? _nextScenarioQuestion
                  : fallbackGraceQ;
              _lastBotQuestion = questionToDisplay;
              await _speakText(followUp, overrideQuestion: questionToDisplay);
            }
            return;
          } else {
            if (mounted) {
              setState(() => _isProcessing = false);

              final bundle = LanguagePack20.resolve(widget.topic.language);
              final String retryMsg = bundle.retryTemplate(_targetPhraseToRepeat);
              final String drillPrompt = bundle.drillPromptTemplate(_targetPhraseToRepeat);
              _lastBotQuestion = drillPrompt;
              await _speakText(retryMsg, overrideQuestion: drillPrompt);
            }
            return;
          }
        }
      }

      // 2. NORMAL SPEECH PROCESSING VIA GEMINI
      final correction = await _geminiService.analyzeAndRespond(
        userSpeech: utterance,
        targetLanguage: widget.topic.language,
        scenarioContext: widget.topic.scenario,
        coach: _coach,
      );

      if (mounted) {
        if (correction.hasCorrection) {
          final alreadyLogged = _sessionCorrections.any((c) =>
              (c['original'] ?? '').trim().toLowerCase() == correction.original.trim().toLowerCase());
          if (!alreadyLogged) {
            _sessionCorrections.add({
              'original': correction.original,
              'correction': correction.correction,
              'explanation': correction.explanation,
            });
          }
        }

        if (correction.hasCorrection && _geminiService.drillModeEnabled && correction.targetPhrase.isNotEmpty) {
          final bundle = LanguagePack20.resolve(widget.topic.language);
          final String drillPrompt = bundle.drillPromptTemplate(correction.targetPhrase);

          // Use the pure native spoken reply generated by Gemini
          String drillSpoken = correction.spokenReply.trim();
          if (drillSpoken.isEmpty) {
            drillSpoken = bundle.correctionPromptTemplate(correction.targetPhrase);
          }

          setState(() {
            _activeCorrection = correction;
            _isDrillMode = true;
            _targetPhraseToRepeat = correction.targetPhrase;
            _nextScenarioQuestion = correction.nextQuestion.isNotEmpty
                ? correction.nextQuestion
                : bundle.defaultFollowUpQuestion;
            _drillAttempts = 0;
            _lastBotQuestion = drillPrompt;
          });

          await _speakText(drillSpoken, overrideQuestion: drillPrompt);
        } else {
          setState(() {
            _activeCorrection = correction.hasCorrection ? correction : null;
            _isDrillMode = false;
          });

          // COMBINE SPOKEN REPLY & NEXT QUESTION
          // Ensures the bot NEVER just makes a comment, but ALWAYS asks the next question!
          String fullReply = correction.spokenReply.trim();
          final nextQ = correction.nextQuestion.trim();

          if (nextQ.isNotEmpty &&
              !fullReply.contains('?') &&
              !fullReply.toLowerCase().contains(nextQ.toLowerCase())) {
            if (!fullReply.endsWith('.') && !fullReply.endsWith('!') && !fullReply.endsWith('?')) {
              fullReply += '.';
            }
            fullReply += ' $nextQ';
          }

          // Top pinned banner shows the active scenario question
          final questionToDisplay = nextQ.isNotEmpty ? nextQ : fullReply;
          _lastBotQuestion = questionToDisplay;

          await _speakText(fullReply, overrideQuestion: questionToDisplay);
        }
      }
    } catch (e) {
      debugPrint('Error in utterance handling: $e');
      if (mounted) {
        setState(() => _isProcessing = false);
        final errReply = LanguagePack20.resolve(widget.topic.language).errorFallback;
        await _speakText(errReply);
      }
    }
  }

  // 3. RIGOROUS & REALISTIC SPEAKING SCORING ENGINE (CEFR & IELTS Aligned)
  Map<String, dynamic> _computeSessionScore() {
    final turns = _userSpeechTurnsCount;
    final errors = _sessionCorrections.length;
    final successfulDrills = _successfulDrillsCount;
    final totalDrills = _totalDrillsAttempted;
    final totalWords = _totalWordsSpoken;
    final durationMins = _callDurationSeconds / 60.0;

    // Edge Case: User said virtually nothing
    if (turns == 0 || totalWords == 0) {
      return {
        'totalScore': 15,
        'grade': 'F',
        'gradeColor': const Color(0xFFEF4444),
        'fluency': 10,
        'accuracy': 20,
        'pronunciation': 15,
        'feedback': 'Minimal speech detected during this call. Try actively answering your coach to build speaking confidence!',
        'feedbackSinhala': 'ඇමතුමේදී කතාබහ ඉතා අඩුවෙන් හඳුනාගැනිණි. චතුරතාව ගොඩනගා ගැනීමට ඊළඟ වතාවේ වැඩිපුර පිළිතුරු දෙන්න!',
        'turns': 0,
        'errors': 0,
        'successfulDrills': 0,
        'avgWordsPerTurn': '0.0',
      };
    }

    // ACCURACY (0 - 100%): Rigorously penalizes grammar & vocabulary mistakes
    double errorRatio = errors / turns.toDouble();
    double baseAccuracy;
    if (errors == 0) {
      baseAccuracy = 95.0; // Clean, error-free speaking
    } else if (errorRatio <= 0.25) {
      baseAccuracy = 82.0 - (errorRatio * 20.0); // 77 - 82%
    } else if (errorRatio <= 0.50) {
      baseAccuracy = 68.0 - ((errorRatio - 0.25) * 35.0); // 59 - 68%
    } else if (errorRatio <= 0.75) {
      baseAccuracy = 52.0 - ((errorRatio - 0.50) * 35.0); // 43 - 52%
    } else {
      baseAccuracy = (40.0 - (errors * 3.0)).clamp(15.0, 38.0); // Frequent errors
    }

    // Drill recovery bonus: Learner gets up to +6% if they repeated the corrected sentences properly
    double drillRecovery = 0.0;
    if (totalDrills > 0) {
      double drillSuccessRate = successfulDrills / totalDrills.toDouble();
      drillRecovery = drillSuccessRate * 6.0;
    }
    int accuracyScore = (baseAccuracy + drillRecovery).round().clamp(15, 98);

    // FLUENCY (0 - 100%): Evaluates words per turn, hesitation, and conversational momentum
    double avgWordsPerTurn = totalWords / turns.toDouble();
    double fluencyScoreCalc;
    if (avgWordsPerTurn < 2.5) {
      fluencyScoreCalc = 45.0; // Short broken answers (e.g. "Yes", "Cricket", "OK")
    } else if (avgWordsPerTurn < 5.0) {
      fluencyScoreCalc = 60.0 + ((avgWordsPerTurn - 2.5) * 6.0); // 60 - 75%
    } else if (avgWordsPerTurn < 10.0) {
      fluencyScoreCalc = 75.0 + ((avgWordsPerTurn - 5.0) * 3.0); // 75 - 90%
    } else {
      fluencyScoreCalc = 90.0 + ((avgWordsPerTurn - 10.0) * 0.5).clamp(0.0, 7.0); // 90 - 97%
    }

    // Pacing checks
    if (durationMins >= 1.0) {
      double turnsPerMin = turns / durationMins;
      if (turnsPerMin < 0.8) {
        fluencyScoreCalc -= 12.0; // Long awkward silences
      } else if (turnsPerMin >= 2.0) {
        fluencyScoreCalc += 4.0; // Responsive dialogue
      }
    }
    int fluencyScore = fluencyScoreCalc.round().clamp(20, 96);

    // PRONUNCIATION / DRILL SCORE (0 - 100%)
    int pronunciationScore;
    if (totalDrills == 0) {
      pronunciationScore = (errors == 0) ? 94 : 76;
    } else {
      double drillRatio = successfulDrills / totalDrills.toDouble();
      pronunciationScore = (48.0 + (drillRatio * 46.0)).round().clamp(40, 95);
    }

    // TOTAL WEIGHTED SCORE (45% Accuracy, 35% Fluency, 20% Pronunciation)
    int compositeScore = ((accuracyScore * 0.45) + (fluencyScore * 0.35) + (pronunciationScore * 0.20)).round().clamp(20, 98);

    // STRICT SCORE GUARDS: A user with mistakes CANNOT get an inflated 90+ Grade A+!
    if (errors >= 3 && compositeScore > 72) {
      compositeScore = 72; // Max Grade C / Low B if 3 or more errors
    } else if (errors >= 2 && compositeScore > 80) {
      compositeScore = 80; // Max Grade B / Low A if 2 errors
    } else if (errors >= 1 && compositeScore > 88) {
      compositeScore = 88; // Max Grade A if 1 error (requires 0 errors for A+)
    }

    // GRADE & FEEDBACK
    String grade;
    Color gradeColor;
    String feedback;
    String feedbackSinhala;

    if (compositeScore >= 90) {
      grade = 'A+';
      gradeColor = const Color(0xFF10B981);
      feedback = 'Outstanding speaking performance! Flawless grammar, natural rhythm, and native-level fluency.';
      feedbackSinhala = 'විශිෂ්ට සාමාර්ථයක්! කිසිදු ව්‍යාකරණ දෝෂයකින් තොරව ඉතා පැහැදිලිව සහ චතුරව අදහස් ප්‍රකාශ කළා.';
    } else if (compositeScore >= 80) {
      grade = 'A';
      gradeColor = const Color(0xFF34D399);
      feedback = 'Great conversation! Fluent flow and confident speech with only minor phrasing slips.';
      feedbackSinhala = 'ඉතා හොඳ සාමාර්ථයක්! කතාබහ සුමටව පවත්වා ගත්තා. සුළු වැරදි පමණක් දක්නට ලැබුණි.';
    } else if (compositeScore >= 70) {
      grade = 'B';
      gradeColor = const Color(0xFF60A5FA);
      feedback = 'Good conversational effort! You communicated your points, but pay closer attention to grammar accuracy.';
      feedbackSinhala = 'හොඳ උත්සාහයක්! අදහස් ප්‍රකාශ කළ හැකි වුවද ව්‍යාකරණ නිවැරදි බව කෙරෙහි වැඩි අවධානයක් යොමු කරන්න.';
    } else if (compositeScore >= 60) {
      grade = 'C';
      gradeColor = const Color(0xFFFBBF24);
      feedback = 'Developing speaker. Multiple errors occurred. Make sure to repeat target phrases carefully.';
      feedbackSinhala = 'සාමාන්‍ය මට්ටමක්. වැරදි කිහිපයක් සිදු විය. Coach ලබාදෙන නිවැරදි වාක්‍ය නැවත නැවත ශබ්ද නගා පුහුණු වන්න.';
    } else if (compositeScore >= 50) {
      grade = 'D';
      gradeColor = const Color(0xFFF97316);
      feedback = 'Frequent errors and broken sentences. Practice answering in full sentences rather than single words.';
      feedbackSinhala = 'තනි වචන වෙනුවට සම්පූර්ණ වාක්‍ය ගොඩනැගීමට සහ නිතර පුහුණු වීමට උත්සාහ කරන්න.';
    } else {
      grade = 'F';
      gradeColor = const Color(0xFFEF4444);
      feedback = 'Needs regular daily practice. Don\'t give up — repetition and daily calls will build your confidence!';
      feedbackSinhala = 'තවදුරටත් පුහුණුව අවශ්‍යයි. අධෛර්යමත් නොවී දිනපතා AI Coach සමග පුහුණු වන්න!';
    }

    return {
      'totalScore': compositeScore,
      'grade': grade,
      'gradeColor': gradeColor,
      'fluency': fluencyScore,
      'accuracy': accuracyScore,
      'pronunciation': pronunciationScore,
      'feedback': feedback,
      'feedbackSinhala': feedbackSinhala,
      'turns': turns,
      'errors': errors,
      'successfulDrills': successfulDrills,
      'avgWordsPerTurn': avgWordsPerTurn.toStringAsFixed(1),
    };
  }

  // 4. END CALL & DISPLAY COMPREHENSIVE SCORE REPORT
  Future<void> _endCallAndShowScore() async {
    _callEnded = true;
    if (kIsWeb) {
      try { web_speech.stopCallRingtone(); } catch (_) {}
    }
    if (_isConnectingCall) {
      Navigator.of(context).pop();
      return;
    }
    _callTimer?.cancel();
    _silenceTimer?.cancel();
    _proactiveNudgeTimer?.cancel();
    _reconnectTimer?.cancel();
    _micKeepAliveTimer?.cancel();
    _speechWatchdogTimer?.cancel();
    _speech.stop();
    _tts.stop();
    _cloudAudioPlayer?.stop();
    _isUsingCloudAudio = false;

    final scoreData = _computeSessionScore();

    // Save to Firestore lang_sessions
    try {
      final user = _auth.currentUser;
      if (_callDurationSeconds > 5) {
        await _firestore.collection('lang_sessions').add({
          'userId': user?.uid ?? 'guest-mobile-user',
          'userEmail': user?.email ?? 'guest@speakflow.ai',
          'userName': user?.displayName ?? 'Mobile Student',
          'topicTitle': widget.topic.title,
          'language': widget.topic.language,
          'durationSeconds': _callDurationSeconds,
          'score': scoreData['totalScore'],
          'grade': scoreData['grade'],
          'fluencyScore': scoreData['fluency'],
          'accuracyScore': scoreData['accuracy'],
          'pronunciationScore': scoreData['pronunciation'],
          'totalCorrections': scoreData['errors'],
          'correctionsList': _sessionCorrections,
          'coachFeedback': scoreData['feedback'],
          'coachFeedbackSinhala': scoreData['feedbackSinhala'],
          'turns': scoreData['turns'],
          'avgWordsPerTurn': scoreData['avgWordsPerTurn'],
          'createdAt': DateTime.now().toIso8601String(),
        });

        // Also update user's daily practice minutes & weekly challenge progress
        if (user != null) {
          final minutesUsedThisCall = (_callDurationSeconds / 60).ceil();
          final userRef = _firestore.collection('lang_users').doc(user.uid);
          final userDoc = await userRef.get();
          final userData = userDoc.data() ?? {};
          final String today = DateTime.now().toIso8601String().substring(0, 10);
          final String? lastDate = userData['lastUsageDate'] as String?;
          final int curDaily = (lastDate == today) ? ((userData['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;
          final int curWeekly = (userData['weeklyMinutes'] as num?)?.toInt() ?? 0;
          final int totalSec = ((userData['totalSpokenSeconds'] as num?)?.toInt() ?? 0) + _callDurationSeconds;

          List<dynamic> activeDates = List.from(userData['activeDates'] ?? []);
          if (!activeDates.contains(today)) {
            activeDates.add(today);
          }

          await userRef.set({
            'dailyMinutesUsed': curDaily + minutesUsedThisCall,
            'lastUsageDate': today,
            'weeklyMinutes': curWeekly + minutesUsedThisCall,
            'totalSpokenSeconds': totalSec,
            'activeDates': activeDates,
            'lastScore': scoreData['totalScore'],
            'streak': activeDates.length,
            'updatedAt': FieldValue.serverTimestamp(),
          }, SetOptions(merge: true));
        }
      }
    } catch (e) {
      debugPrint("Save session error: $e");
    }

    if (mounted) {
      _showScoreDialog(scoreData);
    }
  }

  String _getLanguageFlagEmoji(String lang) {
    switch (lang.toLowerCase()) {
      case 'french': return '🇫🇷';
      case 'spanish': return '🇪🇸';
      case 'german': return '🇩🇪';
      case 'italian': return '🇮🇹';
      case 'japanese': return '🇯🇵';
      case 'korean': return '🇰🇷';
      case 'chinese': return '🇨🇳';
      case 'arabic': return '🇸🇦';
      case 'russian': return '🇷🇺';
      case 'hindi': return '🇮🇳';
      case 'sinhala': return '🇱🇰';
      case 'tamil': return '🇮🇳';
      case 'portuguese': return '🇧🇷';
      case 'dutch': return '🇳🇱';
      case 'turkish': return '🇹🇷';
      case 'vietnamese': return '🇻🇳';
      case 'indonesian': return '🇮🇩';
      case 'thai': return '🇹🇭';
      case 'swedish': return '🇸🇪';
      default: return '🌐';
    }
  }

  void _showScoreDialog(Map<String, dynamic> scoreData) {
    final int score = scoreData['totalScore'];
    final String grade = scoreData['grade'];
    final Color gradeColor = scoreData['gradeColor'] as Color;
    final int fluency = scoreData['fluency'];
    final int accuracy = scoreData['accuracy'];
    final int pronunciation = scoreData['pronunciation'];
    final String feedback = scoreData['feedback'];

    // Luxury Benchmark Badge & Header Icon
    final String performanceTitle;
    final IconData headerIcon;
    if (score >= 90) {
      performanceTitle = '🏆 MASTER ACHIEVED';
      headerIcon = Icons.workspace_premium_rounded;
    } else if (score >= 80) {
      performanceTitle = '⭐ FLUENT SPEAKER';
      headerIcon = Icons.emoji_events_rounded;
    } else if (score >= 70) {
      performanceTitle = '🎯 SOLID COMMUNICATOR';
      headerIcon = Icons.military_tech_rounded;
    } else if (score >= 60) {
      performanceTitle = '💡 DEVELOPING SPEAKER';
      headerIcon = Icons.stars_rounded;
    } else {
      performanceTitle = '🚀 PRACTICE MAKES PERFECT';
      headerIcon = Icons.bolt_rounded;
    }

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) {
        return Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
          child: Container(
            constraints: BoxConstraints(
              maxHeight: MediaQuery.of(context).size.height * 0.88,
              maxWidth: 420,
            ),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFF1E293B),
                  Color(0xFF0F172A),
                  Color(0xFF0A0F1D),
                ],
              ),
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: gradeColor.withOpacity(0.35), width: 1.5),
              boxShadow: [
                BoxShadow(
                  color: gradeColor.withOpacity(0.22),
                  blurRadius: 30,
                  spreadRadius: 2,
                  offset: const Offset(0, 8),
                ),
                BoxShadow(
                  color: Colors.black.withOpacity(0.65),
                  blurRadius: 24,
                  offset: const Offset(0, 12),
                ),
              ],
            ),
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 22),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // 1. Multi-Ring Glowing Medal Header
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      Container(
                        width: 76,
                        height: 76,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: gradeColor.withOpacity(0.12),
                        ),
                      ),
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [
                              gradeColor,
                              gradeColor.withOpacity(0.75),
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: gradeColor.withOpacity(0.45),
                              blurRadius: 18,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                        child: Icon(
                          headerIcon,
                          color: Colors.white,
                          size: 34,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  const Text(
                    'Call Completed! 🎉',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w900,
                      fontSize: 20,
                      letterSpacing: 0.3,
                    ),
                  ),
                  const SizedBox(height: 6),

                  // Topic Title & Language Pill (Clean, International)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.06),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.white12),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(_getLanguageFlagEmoji(widget.topic.language), style: const TextStyle(fontSize: 12)),
                        const SizedBox(width: 5),
                        Flexible(
                          child: Text(
                            '${widget.topic.title} • ${widget.topic.language}',
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.85),
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // 2. High-Fidelity Score Showcase Card
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          gradeColor.withOpacity(0.12),
                          const Color(0xFF0F172A),
                          const Color(0xFF0F172A),
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                      borderRadius: BorderRadius.circular(22),
                      border: Border.all(color: gradeColor.withOpacity(0.4), width: 1.5),
                      boxShadow: [
                        BoxShadow(
                          color: gradeColor.withOpacity(0.12),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              '$score',
                              style: TextStyle(
                                color: gradeColor,
                                fontSize: 48,
                                fontWeight: FontWeight.w900,
                                letterSpacing: -1,
                                shadows: [
                                  Shadow(
                                    color: gradeColor.withOpacity(0.5),
                                    blurRadius: 14,
                                  ),
                                ],
                              ),
                            ),
                            const Text(
                              ' / 100',
                              style: TextStyle(
                                color: Colors.white38,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [
                                    gradeColor.withOpacity(0.3),
                                    gradeColor.withOpacity(0.15),
                                  ],
                                ),
                                borderRadius: BorderRadius.circular(14),
                                border: Border.all(color: gradeColor, width: 1.5),
                                boxShadow: [
                                  BoxShadow(
                                    color: gradeColor.withOpacity(0.25),
                                    blurRadius: 8,
                                  ),
                                ],
                              ),
                              child: Text(
                                'Grade $grade',
                                style: TextStyle(
                                  color: gradeColor,
                                  fontWeight: FontWeight.w900,
                                  fontSize: 15,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),

                        // Performance Benchmark Pill
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3.5),
                          decoration: BoxDecoration(
                            color: gradeColor.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: gradeColor.withOpacity(0.3), width: 0.8),
                          ),
                          child: Text(
                            performanceTitle,
                            style: TextStyle(
                              color: gradeColor,
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 0.6,
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),

                        // Animated Micro Progress Bar
                        ClipRRect(
                          borderRadius: BorderRadius.circular(6),
                          child: LinearProgressIndicator(
                            value: (score / 100.0).clamp(0.05, 1.0),
                            minHeight: 5,
                            backgroundColor: Colors.white.withOpacity(0.08),
                            valueColor: AlwaysStoppedAnimation<Color>(gradeColor),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),

                  // 3. AI Coach Debrief Card (Pure Native/English, Sinhala Removed)
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0F172A).withOpacity(0.9),
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: Colors.white.withOpacity(0.09)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            CircleAvatar(
                              radius: 14,
                              backgroundImage: AssetImage(_coach.assetAvatar),
                              backgroundColor: const Color(0xFF334155),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                'Coach ${_coach.name}\'s Debrief',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2.5),
                              decoration: BoxDecoration(
                                color: const Color(0xFF6366F1).withOpacity(0.2),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.4)),
                              ),
                              child: const Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(Icons.auto_awesome, color: Color(0xFF818CF8), size: 10),
                                  SizedBox(width: 3),
                                  Text(
                                    'AI Analysis',
                                    style: TextStyle(
                                      color: Color(0xFF818CF8),
                                      fontSize: 9.5,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '"$feedback"',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontStyle: FontStyle.italic,
                            height: 1.4,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),

                  // 4. Luxury 4-Metric Grid (Fluency, Accuracy, Pronunciation, Duration)
                  Row(
                    children: [
                      Expanded(
                        child: _buildMetricTile(
                          label: 'Fluency',
                          value: '$fluency%',
                          icon: Icons.speed_rounded,
                          accentColor: const Color(0xFF38BDF8),
                          progress: fluency / 100.0,
                          subtitle: 'Flow & Pace',
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: _buildMetricTile(
                          label: 'Accuracy',
                          value: '$accuracy%',
                          icon: Icons.verified_user_rounded,
                          accentColor: const Color(0xFF34D399),
                          progress: accuracy / 100.0,
                          subtitle: 'Grammar',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: _buildMetricTile(
                          label: 'Pronunciation',
                          value: '$pronunciation%',
                          icon: Icons.record_voice_over_rounded,
                          accentColor: const Color(0xFFA78BFA),
                          progress: pronunciation / 100.0,
                          subtitle: 'Clarity',
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: _buildMetricTile(
                          label: 'Duration',
                          value: _formatDuration(_callDurationSeconds),
                          icon: Icons.timer_rounded,
                          accentColor: const Color(0xFFFBBF24),
                          progress: 1.0,
                          subtitle: '$_userSpeechTurnsCount turns spoken',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // 5. Corrections List / Review Section
                  if (_sessionCorrections.isNotEmpty) ...[
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF59E0B).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.35)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.spellcheck_rounded, color: Color(0xFFFBBF24), size: 16),
                              const SizedBox(width: 6),
                              Text(
                                'Corrections to Practice (${_sessionCorrections.length})',
                                style: const TextStyle(
                                  color: Color(0xFFFBBF24),
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          ..._sessionCorrections.map((corr) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Wrap(
                                    spacing: 6,
                                    runSpacing: 3,
                                    crossAxisAlignment: WrapCrossAlignment.center,
                                    children: [
                                      Text(
                                        '❌ "${corr['original']}"',
                                        style: const TextStyle(
                                          color: Color(0xFFF87171),
                                          fontSize: 11,
                                          decoration: TextDecoration.lineThrough,
                                        ),
                                      ),
                                      const Icon(Icons.arrow_forward, color: Colors.white24, size: 10),
                                      Text(
                                        '✅ "${corr['correction']}"',
                                        style: const TextStyle(
                                          color: Color(0xFF34D399),
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  if ((corr['explanation'] ?? '').isNotEmpty) ...[
                                    const SizedBox(height: 2),
                                    Text(
                                      '💡 ${corr['explanation']}',
                                      style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 10),
                                    ),
                                  ],
                                ],
                              ),
                            );
                          }).toList(),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),
                  ] else ...[
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: const Color(0xFF10B981).withOpacity(0.35)),
                      ),
                      child: Row(
                        children: const [
                          Icon(Icons.verified_rounded, color: Color(0xFF34D399), size: 16),
                          SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              'Flawless Grammar! Zero mistakes in this call. 🌟',
                              style: TextStyle(color: Color(0xFF34D399), fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),
                  ],

                  // 6. Action Button: Luxury Gradient CTA
                  Container(
                    width: double.infinity,
                    height: 48,
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [
                          Color(0xFF6366F1),
                          Color(0xFF4F46E5),
                          Color(0xFF4338CA),
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF6366F1).withOpacity(0.4),
                          blurRadius: 14,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pop(ctx);
                        Navigator.pop(context);
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.transparent,
                        shadowColor: Colors.transparent,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Done & Return to Topics',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w800,
                              fontSize: 13.5,
                              letterSpacing: 0.3,
                            ),
                          ),
                          SizedBox(width: 8),
                          Icon(Icons.arrow_forward_rounded, color: Colors.white, size: 17),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildMetricTile({
    required String label,
    required String value,
    required IconData icon,
    required Color accentColor,
    required double progress,
    required String subtitle,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A).withOpacity(0.92),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: accentColor.withOpacity(0.25), width: 1),
        boxShadow: [
          BoxShadow(
            color: accentColor.withOpacity(0.06),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: accentColor.withOpacity(0.18),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Icon(icon, color: accentColor, size: 12),
              ),
              const SizedBox(width: 5),
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.65),
                    fontSize: 9.5,
                    fontWeight: FontWeight.bold,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                value,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 14.5,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.3,
                ),
              ),
              Text(
                subtitle,
                style: TextStyle(
                  color: Colors.white.withOpacity(0.4),
                  fontSize: 8.5,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 5),
          ClipRRect(
            borderRadius: BorderRadius.circular(3),
            child: LinearProgressIndicator(
              value: progress.clamp(0.05, 1.0),
              minHeight: 3.5,
              backgroundColor: Colors.white.withOpacity(0.08),
              valueColor: AlwaysStoppedAnimation<Color>(accentColor),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    if (kIsWeb) {
      try {
        web_speech.stopCallRingtone();
      } catch (_) {}
    }
    _videoController?.pause();
    _videoController?.dispose();
    _idleVideoController?.pause();
    _idleVideoController?.dispose();
    _callTimer?.cancel();
    _silenceTimer?.cancel();
    _proactiveNudgeTimer?.cancel();
    _reconnectTimer?.cancel();
    _micKeepAliveTimer?.cancel();
    _speechWatchdogTimer?.cancel();
    _pulseController.dispose();
    _speech.stop();
    _tts.stop();
    _cloudAudioPlayer?.stop();
    _cloudAudioPlayer?.dispose();
    super.dispose();
  }

  Widget _buildConnectingScreen() {
    final themeGradient = _coach.themeGradient.length >= 2
        ? _coach.themeGradient
        : [const Color(0xFF0F172A), const Color(0xFF1E293B)];

    final gradientColors = _isDarkMode
        ? [
            themeGradient[0],
            themeGradient[1],
            const Color(0xFF060911),
          ]
        : [
            _coach.primaryAccent.withOpacity(0.18),
            const Color(0xFFE2E8F0),
            const Color(0xFFF8FAFC),
          ];

    return Scaffold(
      backgroundColor: _bgScaffold,
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: gradientColors,
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.0, 0.45, 1.0],
          ),
        ),
        child: SafeArea(
          child: SizedBox(
            width: double.infinity,
            height: double.infinity,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 12),
                  // Top Pill (Centered)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6.5),
                    decoration: BoxDecoration(
                      color: _isDarkMode ? Colors.white.withOpacity(0.08) : Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: _isDarkMode ? Colors.white12 : const Color(0xFFCBD5E1)),
                      boxShadow: _isDarkMode
                          ? null
                          : [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.04),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(
                            color: _coach.primaryAccent,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'AI SECURE CALL • 60 FPS HD',
                          style: TextStyle(
                            color: _textPrimary,
                            fontSize: 10.5,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const Spacer(flex: 2),

                  // Radar Pulse Avatar
                  AnimatedBuilder(
                    animation: _pulseController,
                    builder: (context, child) {
                      final pulse = _pulseController.value;
                      return Stack(
                        alignment: Alignment.center,
                        children: [
                          // Ripple 2
                          Container(
                            width: 190 + (pulse * 26),
                            height: 190 + (pulse * 26),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: _coach.primaryAccent.withOpacity((0.25 * (1 - pulse)).clamp(0.0, 1.0)),
                                width: 1.5,
                              ),
                            ),
                          ),
                          // Ripple 1
                          Container(
                            width: 160 + (pulse * 14),
                            height: 160 + (pulse * 14),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: _coach.primaryAccent.withOpacity((0.45 * (1 - pulse)).clamp(0.0, 1.0)),
                                width: 2,
                              ),
                            ),
                          ),
                          // Avatar Circle
                          Container(
                            width: 136,
                            height: 136,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(color: _coach.primaryAccent, width: 3.5),
                              boxShadow: [
                                BoxShadow(
                                  color: _coach.primaryAccent.withOpacity(0.4),
                                  blurRadius: 28,
                                  spreadRadius: 4,
                                ),
                              ],
                            ),
                            child: ClipOval(
                              child: Image.asset(
                                _coach.assetAvatar,
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) => Image.network(
                                  _coach.avatarUrl,
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                          ),
                        ],
                      );
                    },
                  ),

                  const SizedBox(height: 28),

                  // Coach Name
                  Text(
                    'Coach ${_coach.name}',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: _textPrimary,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 6),

                  // Accent Badge
                  Text(
                    _coach.accent,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: _coach.primaryAccent,
                      fontSize: 13.5,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),

                  // Topic Title
                  Text(
                    widget.topic.title,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: _textSecondary,
                      fontSize: 12,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),

                  const SizedBox(height: 32),

                  // Dynamic Connecting Pill
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    decoration: BoxDecoration(
                      color: _connectingStatus == 'Connected!'
                          ? const Color(0xFF10B981).withOpacity(0.18)
                          : (_isDarkMode ? Colors.white.withOpacity(0.06) : Colors.white),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(
                        color: _connectingStatus == 'Connected!'
                            ? const Color(0xFF10B981)
                            : (_isDarkMode ? _coach.primaryAccent.withOpacity(0.35) : const Color(0xFFCBD5E1)),
                      ),
                      boxShadow: _isDarkMode
                          ? null
                          : [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.04),
                                blurRadius: 10,
                                offset: const Offset(0, 2),
                              ),
                            ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          _connectingStatus == 'Connected!'
                              ? Icons.check_circle_rounded
                              : Icons.phone_in_talk_rounded,
                          size: 16,
                          color: _connectingStatus == 'Connected!'
                              ? const Color(0xFF10B981)
                              : _coach.primaryAccent,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          _connectingStatus,
                          style: TextStyle(
                            color: _connectingStatus == 'Connected!'
                                ? const Color(0xFF10B981)
                                : _textPrimary,
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const Spacer(flex: 3),

                  // Decline / End Call Button
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      InkWell(
                        onTap: () {
                          if (kIsWeb) {
                            try { web_speech.stopCallRingtone(); } catch (_) {}
                          }
                          _endCallAndShowScore();
                        },
                        borderRadius: BorderRadius.circular(36),
                        child: Container(
                          width: 68,
                          height: 68,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: const Color(0xFFEF4444),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFEF4444).withOpacity(0.4),
                                blurRadius: 18,
                                spreadRadius: 2,
                              ),
                            ],
                          ),
                          child: const Icon(Icons.call_end_rounded, color: Colors.white, size: 30),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        'Cancel',
                        style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isConnectingCall) {
      return _buildConnectingScreen();
    }
    final themeGradient = _coach.themeGradient.length >= 2
        ? _coach.themeGradient
        : [const Color(0xFF0F172A), const Color(0xFF1E293B)];

    final gradientColors = _isDarkMode
        ? [
            themeGradient[0],
            themeGradient[1],
            const Color(0xFF060911),
          ]
        : [
            _coach.primaryAccent.withOpacity(0.14),
            const Color(0xFFEEF2F6),
            const Color(0xFFF8FAFC),
          ];

    return Scaffold(
      backgroundColor: _bgScaffold,
      body: AnimatedContainer(
        duration: const Duration(milliseconds: 600),
        curve: Curves.easeInOut,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: gradientColors,
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.0, 0.45, 1.0],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // 1. FIXED TOP BAR (Fully optimized, responsive, modern glass capsule)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                child: Row(
                  children: [
                    // Topic Icon & Title
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: _coach.primaryAccent.withOpacity(0.18),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: _coach.primaryAccent.withOpacity(0.35)),
                      ),
                      child: Text(widget.topic.icon, style: const TextStyle(fontSize: 16)),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            widget.topic.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(color: _textPrimary, fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          Text(
                            widget.topic.language,
                            style: TextStyle(color: _textSecondary, fontSize: 10.5),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 6),

                    // LIVE HD Badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3.5),
                      decoration: BoxDecoration(
                        color: const Color(0xFFEF4444).withOpacity(0.18),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: const Color(0xFFEF4444).withOpacity(0.4)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          AnimatedBuilder(
                            animation: _pulseController,
                            builder: (context, child) {
                              return Container(
                                width: 6,
                                height: 6,
                                decoration: BoxDecoration(
                                  color: const Color(0xFFEF4444),
                                  shape: BoxShape.circle,
                                  boxShadow: [
                                    BoxShadow(
                                      color: const Color(0xFFEF4444).withOpacity(_pulseController.value * 0.9),
                                      blurRadius: 5,
                                      spreadRadius: 1,
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                          const SizedBox(width: 4),
                          const Text(
                            'LIVE HD',
                            style: TextStyle(color: Color(0xFFFCA5A5), fontSize: 9.5, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 6),

                    // TOP RIGHT: PROMINENT COUNTDOWN TIMER
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: (_remainingSeconds != null && _remainingSeconds! <= 30)
                            ? const Color(0xFFEF4444).withOpacity(0.25)
                            : const Color(0xFF10B981).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: (_remainingSeconds != null && _remainingSeconds! <= 30)
                              ? const Color(0xFFEF4444)
                              : const Color(0xFF10B981),
                          width: 1.2,
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.timer_outlined,
                            color: (_remainingSeconds != null && _remainingSeconds! <= 30)
                                ? const Color(0xFFEF4444)
                                : const Color(0xFF10B981),
                            size: 13,
                          ),
                          const SizedBox(width: 3),
                          Text(
                            _remainingSeconds != null
                                ? _formatDuration(_remainingSeconds!)
                                : _formatDuration(_callDurationSeconds),
                            style: TextStyle(
                              color: (_remainingSeconds != null && _remainingSeconds! <= 30)
                                  ? const Color(0xFFEF4444)
                                  : const Color(0xFF10B981),
                              fontWeight: FontWeight.bold,
                              fontSize: 11.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 6),

                    // THEME TOGGLE (Sun/Moon for Light/Dark mode during live call)
                    InkWell(
                      onTap: () => setState(() => _isDarkMode = !_isDarkMode),
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.all(5.5),
                        decoration: BoxDecoration(
                          color: _isDarkMode ? const Color(0xFF1E293B).withOpacity(0.85) : Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: _isDarkMode ? Colors.white12 : const Color(0xFFCBD5E1)),
                          boxShadow: _isDarkMode
                              ? null
                              : [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.04),
                                    blurRadius: 6,
                                    offset: const Offset(0, 1),
                                  ),
                                ],
                        ),
                        child: Icon(
                          _isDarkMode ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
                          color: _isDarkMode ? const Color(0xFFFBBF24) : const Color(0xFF4361EE),
                          size: 14,
                        ),
                      ),
                    ),
                    const SizedBox(width: 6),

                    // Voice Speed Controller
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: _isDarkMode ? const Color(0xFF1E293B).withOpacity(0.85) : Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: _isDarkMode ? Colors.white12 : const Color(0xFFCBD5E1)),
                        boxShadow: _isDarkMode
                            ? null
                            : [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.04),
                                  blurRadius: 6,
                                  offset: const Offset(0, 1),
                                ),
                              ],
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<double>(
                          value: _voiceSpeed,
                          isDense: true,
                          iconSize: 14,
                          iconEnabledColor: _coach.primaryAccent,
                          dropdownColor: _isDarkMode ? const Color(0xFF1E293B) : Colors.white,
                          style: TextStyle(color: _textPrimary, fontSize: 11, fontWeight: FontWeight.bold),
                          items: const [
                            DropdownMenuItem(value: 0.75, child: Text("0.75x")),
                            DropdownMenuItem(value: 0.9, child: Text("0.9x")),
                            DropdownMenuItem(value: 1.1, child: Text("1.1x")),
                          ],
                          onChanged: (val) {
                            if (val != null) _updateVoiceSpeed(val);
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // 2. SCROLLABLE MIDDLE CONTENT (Video Call Screen, Animated Captions, Drill Cards)
              Expanded(
                child: SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                  child: Column(
                    children: [
                      // ========================================================
                      // GOOGLE FIREBASE #BUILDHYBRIDAI 2026: HYBRID INFERENCE HUD
                      // ========================================================
                      Container(
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: _isDarkMode ? const Color(0xFF0F172A).withOpacity(0.9) : Colors.white.withOpacity(0.95),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: _isDarkMode
                                ? (_geminiService.simulateOffline
                                    ? const Color(0xFFF59E0B).withOpacity(0.4)
                                    : const Color(0xFF06B6D4).withOpacity(0.4))
                                : const Color(0xFFCBD5E1),
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: (_geminiService.simulateOffline
                                      ? const Color(0xFFF59E0B)
                                      : const Color(0xFF06B6D4))
                                  .withOpacity(_isDarkMode ? 0.12 : 0.06),
                              blurRadius: 10,
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              decoration: BoxDecoration(
                                color: _geminiService.simulateOffline
                                    ? const Color(0xFFF59E0B)
                                    : const Color(0xFF06B6D4),
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                _geminiService.simulateOffline
                                    ? "🛡️ OFFLINE: RESILIENCE NLP CORE [0ms • Local]"
                                    : (_activeCorrection?.engineUsed == 'ON_DEVICE_NANO'
                                        ? "⚡ ON-DEVICE: GEMINI NANO [${_activeCorrection!.latencyMs}ms • Prompt API]"
                                        : (_activeCorrection?.engineUsed == 'OFFLINE_RESILIENCE_CORE'
                                            ? "🛡️ OFFLINE: RESILIENCE NLP CORE [${_activeCorrection!.latencyMs}ms • Local]"
                                            : "☁️ CLOUD: GEMINI 2.5 FLASH [${_activeCorrection != null && _activeCorrection!.latencyMs > 0 ? '${_activeCorrection!.latencyMs}ms' : 'Firebase Vertex AI'}]")),
                                style: TextStyle(
                                  color: (_geminiService.simulateOffline || _activeCorrection?.engineUsed == 'OFFLINE_RESILIENCE_CORE')
                                      ? (_isDarkMode ? const Color(0xFFFCD34D) : const Color(0xFFB45309))
                                      : (_activeCorrection?.engineUsed == 'ON_DEVICE_NANO')
                                          ? const Color(0xFF10B981)
                                          : (_isDarkMode ? const Color(0xFF67E8F9) : const Color(0xFF0891B2)),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 10.5,
                                  fontFamily: 'monospace',
                                ),
                              ),
                            ),
                            GestureDetector(
                              onTap: () {
                                setState(() {
                                  _geminiService.simulateOffline = !_geminiService.simulateOffline;
                                  if (!_geminiService.simulateOffline && _activeCorrection?.engineUsed == 'OFFLINE_RESILIENCE_CORE') {
                                    _activeCorrection = null;
                                  }
                                });
                                debugPrint(_geminiService.simulateOffline
                                    ? '🛡️ [Hybrid AI Router] Offline Mode ON -> Using Local Offline Resilience NLP Core'
                                    : '☁️ [Hybrid AI Router] Offline Mode OFF -> Using Cloud Firebase Vertex AI (Gemini 2.5 Flash)');
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                                decoration: BoxDecoration(
                                  color: _geminiService.simulateOffline
                                      ? const Color(0xFFEF4444).withOpacity(0.2)
                                      : (_isDarkMode ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: _geminiService.simulateOffline
                                        ? const Color(0xFFEF4444)
                                        : (_isDarkMode ? Colors.white24 : const Color(0xFFCBD5E1)),
                                  ),
                                ),
                                child: Text(
                                  _geminiService.simulateOffline ? "✈️ Offline: ON" : "✈️ Sim Offline",
                                  style: TextStyle(
                                    color: _geminiService.simulateOffline
                                        ? const Color(0xFFEF4444)
                                        : _textSecondary,
                                    fontSize: 9.5,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      // VIDEO CALL VIEWPORT (Cinematic AI Video Call stage - Compact 16:9 widescreen)
                      AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.only(bottom: 8),
                        constraints: const BoxConstraints(
                          maxHeight: 205, // Fits entire screen without vertical scrolling
                        ),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: _isBotSpeaking
                                ? _coach.primaryAccent
                                : _isListening
                                    ? const Color(0xFF10B981)
                                    : _isProcessing
                                        ? const Color(0xFFFBBF24)
                                        : _coach.primaryAccent.withOpacity(0.4),
                            width: _isBotSpeaking || _isListening ? 2.0 : 1.2,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: (_isBotSpeaking
                                      ? _coach.primaryAccent
                                      : _isListening
                                          ? const Color(0xFF10B981)
                                          : _coach.primaryAccent)
                                  .withOpacity(_isBotSpeaking || _isListening ? 0.3 : 0.12),
                              blurRadius: 16,
                              spreadRadius: 1,
                            ),
                          ],
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(18),
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              // VIDEO / AVATAR VIEWPORT (Compact 16:9 widescreen - Tap to hear)
                              InkWell(
                                onTap: () => _speakText(_lastBotQuestion),
                                child: AspectRatio(
                                  aspectRatio: 16 / 9,
                                  child: Stack(
                                  fit: StackFit.expand,
                                  alignment: Alignment.topCenter,
                                  children: [
                                    // 1. Idle listening photo avatar (Smiling, attentive, eyes open, perfectly framed)
                                    Image.asset(
                                      _coach.assetAvatar,
                                      fit: BoxFit.cover,
                                      alignment: Alignment.topCenter,
                                      errorBuilder: (_, __, ___) => Image.network(
                                        'assets/images/coaches/${_coach.id}.jpg',
                                        fit: BoxFit.cover,
                                        alignment: Alignment.topCenter,
                                        errorBuilder: (_, __, ___) => Image.network(
                                          _coach.avatarUrl,
                                          fit: BoxFit.cover,
                                          alignment: Alignment.topCenter,
                                        ),
                                      ),
                                    ),

                                    // 2. Idle video (if available & initialized)
                                    if (_isIdleVideoInitialized && _idleVideoController != null)
                                      AnimatedOpacity(
                                        opacity: !_isCoachSpeakingVideoPlaying ? 1.0 : 0.0,
                                        duration: const Duration(milliseconds: 250),
                                        child: SizedBox.expand(
                                          child: FittedBox(
                                            fit: BoxFit.cover,
                                            alignment: Alignment.topCenter,
                                            child: SizedBox(
                                              width: _idleVideoController!.value.size.width > 0
                                                  ? _idleVideoController!.value.size.width
                                                  : 1280,
                                              height: _idleVideoController!.value.size.height > 0
                                                  ? _idleVideoController!.value.size.height
                                                  : 720,
                                              child: VideoPlayer(_idleVideoController!),
                                            ),
                                          ),
                                        ),
                                      ),

                                    // 3. Speaking Video overlay (Plays & fades in only when coach is speaking)
                                    if (_isVideoInitialized && _videoController != null)
                                      AnimatedOpacity(
                                        opacity: _isCoachSpeakingVideoPlaying ? 1.0 : 0.0,
                                        duration: const Duration(milliseconds: 250),
                                        child: SizedBox.expand(
                                          child: FittedBox(
                                            fit: BoxFit.cover,
                                            alignment: Alignment.topCenter,
                                            child: SizedBox(
                                              width: _videoController!.value.size.width > 0
                                                  ? _videoController!.value.size.width
                                                  : 1280,
                                              height: _videoController!.value.size.height > 0
                                                  ? _videoController!.value.size.height
                                                  : 720,
                                              child: VideoPlayer(_videoController!),
                                            ),
                                          ),
                                        ),
                                      ),
                                  ],
                                ),
                              ),
                            ),

                              // TOP SHADOW GRADIENT FOR READABILITY
                              Positioned(
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 48,
                                child: Container(
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment.topCenter,
                                      end: Alignment.bottomCenter,
                                      colors: [
                                        Colors.black.withOpacity(0.7),
                                        Colors.transparent,
                                      ],
                                    ),
                                  ),
                                ),
                              ),

                              // TOP-LEFT: COACH NAME PILL
                              Positioned(
                                top: 8,
                                left: 8,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF0F172A).withOpacity(0.85),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: _coach.primaryAccent.withOpacity(0.4)),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      _coach.buildAvatar(radius: 8),
                                      const SizedBox(width: 5),
                                      Text(
                                        'Coach ${_coach.name}',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 11,
                                        ),
                                      ),
                                      const SizedBox(width: 4),
                                      Container(
                                        width: 5,
                                        height: 5,
                                        decoration: BoxDecoration(
                                          color: _coach.primaryAccent,
                                          shape: BoxShape.circle,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),

                              // TOP-RIGHT: 60 FPS / HD BADGE
                              Positioned(
                                top: 8,
                                right: 8,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withOpacity(0.65),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: Colors.white12),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: const [
                                      Icon(Icons.videocam_rounded, color: Color(0xFF10B981), size: 12),
                                      SizedBox(width: 4),
                                      Text(
                                        '60 FPS • HD',
                                        style: TextStyle(
                                          color: Colors.white70,
                                          fontSize: 9.5,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),

                              // BOTTOM SHADOW GRADIENT
                              Positioned(
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 48,
                                child: Container(
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment.bottomCenter,
                                      end: Alignment.topCenter,
                                      colors: [
                                        Colors.black.withOpacity(0.85),
                                        Colors.transparent,
                                      ],
                                    ),
                                  ),
                                ),
                              ),

                              // BOTTOM STATUS & QUICK SWITCH
                              Positioned(
                                bottom: 8,
                                left: 10,
                                right: 10,
                                child: Row(
                                  children: [
                                    AnimatedBuilder(
                                      animation: _pulseController,
                                      builder: (context, child) {
                                        return Container(
                                          width: 8,
                                          height: 8,
                                          decoration: BoxDecoration(
                                            color: _isBotSpeaking
                                                ? _coach.primaryAccent
                                                : _isProcessing
                                                    ? const Color(0xFFFBBF24)
                                                    : _isListening
                                                        ? const Color(0xFF10B981)
                                                        : Colors.white38,
                                            shape: BoxShape.circle,
                                            boxShadow: [
                                              BoxShadow(
                                                color: (_isBotSpeaking
                                                        ? _coach.primaryAccent
                                                        : _isListening
                                                            ? const Color(0xFF10B981)
                                                            : Colors.transparent)
                                                    .withOpacity(_pulseController.value * 0.8),
                                                blurRadius: 6,
                                                spreadRadius: 2,
                                              ),
                                            ],
                                          ),
                                        );
                                      },
                                    ),
                                    const SizedBox(width: 6),
                                    Expanded(
                                      child: Text(
                                        _isBotSpeaking
                                            ? 'Coach ${_coach.name} is speaking...'
                                            : _isProcessing
                                                ? 'Thinking response...'
                                                : _isListening
                                                    ? 'Listening to your voice...'
                                                    : 'Tap Send / Speak to reply',
                                        style: TextStyle(
                                          color: _isBotSpeaking
                                              ? _coach.primaryAccent
                                              : _isProcessing
                                                  ? const Color(0xFFFBBF24)
                                                  : _isListening
                                                      ? const Color(0xFF34D399)
                                                      : Colors.white70,
                                          fontSize: 11,
                                          fontWeight: FontWeight.w600,
                                          shadows: const [
                                            Shadow(color: Colors.black, blurRadius: 4),
                                          ],
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                    InkWell(
                                      onTap: () => _showCoachSwitchSheet(context),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                                        decoration: BoxDecoration(
                                          color: Colors.black.withOpacity(0.65),
                                          borderRadius: BorderRadius.circular(10),
                                          border: Border.all(color: Colors.white24),
                                        ),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            const Icon(Icons.swap_horiz_rounded, color: Colors.white70, size: 12),
                                            const SizedBox(width: 3),
                                            Text(
                                              'Coach (${_coach.name})',
                                              style: const TextStyle(
                                                color: Colors.white,
                                                fontSize: 9.5,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      // ANIMATED LIVE CAPTIONS CONTAINER (Crystal-clear subtitles with smooth slide-up)
                      Container(
                        width: double.infinity,
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: _isDarkMode ? const Color(0xFF0F172A).withOpacity(0.88) : Colors.white.withOpacity(0.96),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: _isBotSpeaking
                                ? _coach.primaryAccent.withOpacity(0.4)
                                : const Color(0xFF10B981).withOpacity(0.3),
                            width: 1.2,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(_isDarkMode ? 0.35 : 0.05),
                              blurRadius: 10,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(3.5),
                                  decoration: BoxDecoration(
                                    color: _isBotSpeaking
                                        ? _coach.primaryAccent.withOpacity(0.2)
                                        : const Color(0xFF10B981).withOpacity(0.2),
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    _isBotSpeaking ? Icons.graphic_eq_rounded : Icons.mic_none_rounded,
                                    size: 12,
                                    color: _isBotSpeaking ? _coach.primaryAccent : const Color(0xFF34D399),
                                  ),
                                ),
                                const SizedBox(width: 5),
                                Text(
                                  _isBotSpeaking
                                      ? 'Coach ${_coach.name} (AI):'
                                      : 'You (Learner):',
                                  style: TextStyle(
                                    color: _isBotSpeaking ? _coach.primaryAccent : const Color(0xFF10B981),
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                    letterSpacing: 0.3,
                                  ),
                                ),
                                const Spacer(),
                                if (_isBotSpeaking || _isListening)
                                  AnimatedBuilder(
                                    animation: _pulseController,
                                    builder: (context, child) {
                                      return Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: List.generate(4, (index) {
                                          final height = 4.0 + (((_pulseController.value * 8) + (index * 2.0)) % 8);
                                          return Container(
                                            margin: const EdgeInsets.symmetric(horizontal: 1.5),
                                            width: 2.2,
                                            height: height,
                                            decoration: BoxDecoration(
                                              color: _isBotSpeaking ? _coach.primaryAccent : const Color(0xFF34D399),
                                              borderRadius: BorderRadius.circular(2),
                                            ),
                                          );
                                        }),
                                      );
                                    },
                                  ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            AnimatedSwitcher(
                              duration: const Duration(milliseconds: 300),
                              transitionBuilder: (child, anim) => FadeTransition(
                                opacity: anim,
                                child: SlideTransition(
                                  position: Tween<Offset>(
                                    begin: const Offset(0.0, 0.15),
                                    end: Offset.zero,
                                  ).animate(anim),
                                  child: child,
                                ),
                              ),
                              child: Text(
                                _isBotSpeaking
                                    ? (_botSubtitle.isNotEmpty ? _botSubtitle : 'Coach ${_coach.name} is speaking...')
                                    : (_userSpeech.isEmpty
                                        ? (_hasMicPermission
                                            ? 'Listening to microphone... (Speak freely, AI listens continuously)'
                                            : 'Tap the Microphone button below to speak')
                                        : '"$_userSpeech"'),
                                key: ValueKey<String>(
                                  _isBotSpeaking ? 'bot_$_botSubtitle' : 'user_$_userSpeech',
                                ),
                                style: TextStyle(
                                  color: _textPrimary,
                                  fontSize: 12.5,
                                  fontWeight: FontWeight.w600,
                                  height: 1.35,
                                  shadows: _isDarkMode
                                      ? [
                                          const Shadow(
                                            color: Colors.black87,
                                            blurRadius: 4,
                                            offset: Offset(0, 1),
                                          ),
                                        ]
                                      : null,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      // PINNED ACTIVE COACH QUESTION CARD (Always visible so learner never forgets question)
                      if (_lastBotQuestion.isNotEmpty)
                        Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: _isDarkMode
                                  ? [
                                      const Color(0xFF1E293B).withOpacity(0.9),
                                      _coach.primaryAccent.withOpacity(0.15),
                                    ]
                                  : [
                                      Colors.white,
                                      _coach.primaryAccent.withOpacity(0.08),
                                    ],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: _isBotSpeaking
                                  ? _coach.primaryAccent
                                  : (_isDarkMode ? _coach.primaryAccent.withOpacity(0.35) : const Color(0xFFCBD5E1)),
                              width: _isBotSpeaking ? 1.5 : 1,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(_isDarkMode ? 0.25 : 0.04),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                  color: _coach.primaryAccent.withOpacity(0.2),
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(Icons.help_outline_rounded, color: _coach.primaryAccent, size: 15),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          _isDrillMode
                                              ? '🔁 Repeat Drill:'
                                              : 'Coach ${_coach.name} (AI):',
                                          style: TextStyle(
                                            color: _isDrillMode ? const Color(0xFF10B981) : _coach.primaryAccent,
                                            fontSize: 11,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        if (_isBotSpeaking)
                                          Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              Container(
                                                width: 6,
                                                height: 6,
                                                decoration: BoxDecoration(
                                                  color: _coach.primaryAccent,
                                                  shape: BoxShape.circle,
                                                ),
                                              ),
                                              const SizedBox(width: 4),
                                              Text(
                                                'Speaking...',
                                                style: TextStyle(color: _coach.primaryAccent, fontSize: 10, fontWeight: FontWeight.bold),
                                              ),
                                            ],
                                          )
                                        else
                                          InkWell(
                                            onTap: _repeatLastCoachAudio,
                                            borderRadius: BorderRadius.circular(8),
                                            child: Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                              decoration: BoxDecoration(
                                                color: _coach.primaryAccent.withOpacity(0.22),
                                                borderRadius: BorderRadius.circular(8),
                                                border: Border.all(color: _coach.primaryAccent.withOpacity(0.55), width: 1),
                                              ),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.min,
                                                children: [
                                                  Icon(Icons.volume_up_rounded, size: 13, color: _coach.primaryAccent),
                                                  const SizedBox(width: 4),
                                                  Text(
                                                    '🔊 Repeat',
                                                    style: TextStyle(color: _coach.primaryAccent, fontSize: 10.5, fontWeight: FontWeight.bold),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      '"$_lastBotQuestion"',
                                      style: TextStyle(
                                        color: _textPrimary,
                                        fontSize: 12.5,
                                        fontWeight: FontWeight.w600,
                                        height: 1.35,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),

                      // UNIFIED PRONUNCIATION DRILL & FEEDBACK CARD
                      if (_isDrillMode && _targetPhraseToRepeat.isNotEmpty)
                        Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                const Color(0xFF6366F1).withOpacity(0.2),
                                const Color(0xFF4338CA).withOpacity(0.15),
                              ],
                            ),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0xFF818CF8), width: 1.5),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.repeat_rounded, color: Color(0xFF818CF8), size: 16),
                                  const SizedBox(width: 6),
                                  const Text(
                                    '🔁 Repeat to Continue',
                                    style: TextStyle(
                                      color: Color(0xFF818CF8),
                                      fontSize: 11,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Spacer(),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF818CF8).withOpacity(0.25),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(
                                      'Attempt ${_drillAttempts + 1}/2',
                                      style: const TextStyle(color: Color(0xFFA5B4FC), fontSize: 10, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              if (_activeCorrection != null && _activeCorrection!.original.isNotEmpty) ...[
                                const SizedBox(height: 8),
                                Wrap(
                                  spacing: 6,
                                  runSpacing: 4,
                                  crossAxisAlignment: WrapCrossAlignment.center,
                                  children: [
                                    Text(
                                      _activeCorrection!.original,
                                      style: const TextStyle(
                                        color: Color(0xFFF87171),
                                        decoration: TextDecoration.lineThrough,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    const Icon(Icons.arrow_forward, color: Colors.white38, size: 12),
                                    Text(
                                      _activeCorrection!.correction,
                                      style: const TextStyle(
                                        color: Color(0xFF34D399),
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                if (_activeCorrection!.explanation.isNotEmpty) ...[
                                  const SizedBox(height: 4),
                                  Text(
                                    _activeCorrection!.explanation,
                                    style: TextStyle(color: _textSecondary, fontSize: 11),
                                  ),
                                ],
                              ],
                              const SizedBox(height: 8),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF0F172A).withOpacity(0.7),
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
                                ),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        '"$_targetPhraseToRepeat"',
                                        style: const TextStyle(
                                          color: Color(0xFF34D399),
                                          fontSize: 13.5,
                                          fontWeight: FontWeight.bold,
                                          height: 1.3,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    InkWell(
                                      onTap: () => _speakText(_targetPhraseToRepeat),
                                      borderRadius: BorderRadius.circular(8),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF10B981).withOpacity(0.22),
                                          borderRadius: BorderRadius.circular(8),
                                          border: Border.all(color: const Color(0xFF10B981), width: 1),
                                        ),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: const [
                                            Icon(Icons.volume_up_rounded, color: Color(0xFF34D399), size: 14),
                                            SizedBox(width: 4),
                                            Text(
                                              'Listen',
                                              style: TextStyle(
                                                color: Color(0xFF34D399),
                                                fontSize: 11,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Please speak the green phrase clearly to unlock the next question.',
                                style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 10),
                              ),
                            ],
                          ),
                        )
                      else if (_activeCorrection != null)
                        Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF59E0B).withOpacity(0.15),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.4)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: const [
                                  Icon(Icons.lightbulb_outline, color: Color(0xFFFBBF24), size: 16),
                                  SizedBox(width: 6),
                                  Text(
                                    'Coach Feedback',
                                    style: TextStyle(
                                      color: Color(0xFFFBBF24),
                                      fontSize: 11,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Wrap(
                                spacing: 6,
                                runSpacing: 4,
                                crossAxisAlignment: WrapCrossAlignment.center,
                                children: [
                                  Text(
                                    _activeCorrection!.original,
                                    style: const TextStyle(
                                      color: Color(0xFFF87171),
                                      decoration: TextDecoration.lineThrough,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  const Icon(Icons.arrow_forward, color: Colors.white38, size: 12),
                                  Text(
                                    _activeCorrection!.correction,
                                    style: const TextStyle(
                                      color: Color(0xFF34D399),
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 4),
                              Text(
                                _activeCorrection!.explanation,
                                style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ),

              // 3. FIXED BOTTOM CONTROLS DOCK (Fully optimized, beautiful thumb-friendly dock)
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 6, 16, 12),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A).withOpacity(0.92),
                    borderRadius: BorderRadius.circular(28),
                    border: Border.all(color: Colors.white.withOpacity(0.08)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.4),
                        blurRadius: 18,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // 1. MUTE MIC TOGGLE
                      InkWell(
                        onTap: () async {
                          if (!_isSttInitialized || !_hasMicPermission) {
                            _isSttInitialized = await _speech.initialize(
                              options: [stt.SpeechToText.androidNoBluetooth],
                            );
                            final hasPerm = await _speech.hasPermission;
                            setState(() {
                              _hasMicPermission = hasPerm;
                            });
                            if (_isSttInitialized && _hasMicPermission) {
                              _startListening();
                            }
                            return;
                          }
                          setState(() {
                            _isMuted = !_isMuted;
                            if (_isMuted) {
                              _reconnectTimer?.cancel();
                              _speech.stop();
                              _isListening = false;
                            } else {
                              _scheduleListeningRestart(delayMs: 100);
                            }
                          });
                        },
                        borderRadius: BorderRadius.circular(22),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                color: _isMuted ? const Color(0xFFEF4444).withOpacity(0.2) : const Color(0xFF1E293B),
                                shape: BoxShape.circle,
                                border: Border.all(
                                  color: _isMuted ? const Color(0xFFEF4444) : Colors.white12,
                                  width: 1.2,
                                ),
                              ),
                              child: Icon(
                                _isMuted ? Icons.mic_off_rounded : Icons.mic_rounded,
                                color: _isMuted ? const Color(0xFFEF4444) : const Color(0xFF10B981),
                                size: 20,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              _isMuted ? 'Muted' : 'Mic On',
                              style: TextStyle(
                                color: _isMuted ? const Color(0xFFEF4444) : Colors.white70,
                                fontSize: 9.5,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // 1.5 REPEAT COACH AUDIO BUTTON
                      InkWell(
                        onTap: _repeatLastCoachAudio,
                        borderRadius: BorderRadius.circular(22),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                color: const Color(0xFF1E293B),
                                shape: BoxShape.circle,
                                border: Border.all(color: const Color(0xFF38BDF8), width: 1.5),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(0xFF38BDF8).withOpacity(0.35),
                                    blurRadius: 8,
                                  ),
                                ],
                              ),
                              child: const Icon(
                                Icons.replay_rounded,
                                color: Color(0xFF38BDF8),
                                size: 22,
                              ),
                            ),
                            const SizedBox(height: 2),
                            const Text(
                              'Repeat',
                              style: TextStyle(
                                color: Color(0xFF38BDF8),
                                fontSize: 9.5,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // 2. SWITCH COACH AVATAR BUTTON
                      InkWell(
                        onTap: () => _showCoachSwitchSheet(context),
                        borderRadius: BorderRadius.circular(22),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(color: _coach.primaryAccent, width: 1.8),
                                boxShadow: [
                                  BoxShadow(
                                    color: _coach.primaryAccent.withOpacity(0.35),
                                    blurRadius: 8,
                                  ),
                                ],
                              ),
                              child: ClipOval(
                                child: Image.asset(
                                  _coach.assetAvatar,
                                  fit: BoxFit.cover,
                                  errorBuilder: (_, __, ___) => Image.network(
                                    'assets/images/coaches/${_coach.id}.jpg',
                                    fit: BoxFit.cover,
                                    errorBuilder: (_, __, ___) => Image.network(
                                      _coach.avatarUrl,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              _coach.name,
                              style: TextStyle(
                                color: _coach.primaryAccent,
                                fontSize: 9.5,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // 3. SEND SPEECH / PUSH TO TALK (Prominent pill button)
                      ElevatedButton.icon(
                        onPressed: () async {
                          if (_userSpeech.trim().isNotEmpty && !_isProcessing) {
                            _silenceTimer?.cancel();
                            final textToSubmit = _userSpeech.trim();
                            _accumulatedSpeech = '';
                            _handleUserUtterance(textToSubmit);
                          } else if (!_isProcessing && !_isBotSpeaking) {
                            // If mic is already listening or encountered an STT network error in browser,
                            // clicking "Speak Now" immediately injects a native sample response in ANY of the 20 languages!
                            final sample = LanguagePack20.resolve(widget.topic.language).sampleUtterance;

                            _accumulatedSpeech = '';
                            _lastRecognizedWords = '';
                            _handleUserUtterance(sample);
                          }
                        },
                        icon: Icon(
                          _userSpeech.trim().isNotEmpty ? Icons.send_rounded : Icons.record_voice_over_rounded,
                          size: 16,
                        ),
                        label: Text(
                          _userSpeech.trim().isNotEmpty ? 'Send Speech' : 'Speak Now',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11.5),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _userSpeech.trim().isNotEmpty ? _coach.primaryAccent : const Color(0xFF6366F1),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                          elevation: 4,
                        ),
                      ),

                      // 4. END CALL BUTTON
                      InkWell(
                        onTap: _endCallAndShowScore,
                        borderRadius: BorderRadius.circular(22),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              decoration: const BoxDecoration(
                                color: Color(0xFFEF4444),
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(
                                    color: Color(0x66EF4444),
                                    blurRadius: 10,
                                    offset: Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: const Icon(
                                Icons.call_end_rounded,
                                color: Colors.white,
                                size: 20,
                              ),
                            ),
                            const SizedBox(height: 2),
                            const Text(
                              'End Call',
                              style: TextStyle(
                                color: Color(0xFFFCA5A5),
                                fontSize: 9.5,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showCoachSwitchSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1E293B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Expanded(
                    child: Text(
                      'Choose Voice Coach',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(ctx),
                    icon: const Text('✕', style: TextStyle(color: Colors.white54, fontSize: 16)),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                'Select your AI female tutor with specialized teaching styles & video feedback:',
                style: TextStyle(color: Colors.white.withOpacity(0.65), fontSize: 11),
              ),
              const SizedBox(height: 16),
              Flexible(
                child: ListView.separated(
                  shrinkWrap: true,
                  itemCount: CoachPersona.presetCoaches.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                  itemBuilder: (context, index) {
                    final coach = CoachPersona.presetCoaches[index];
                    final isSel = coach.id == _coach.id;
                    return InkWell(
                      onTap: () async {
                        setState(() {
                          _coach = coach;
                        });
                        _initCoachVideo();
                        await _applyCoachVoice(coach);
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Switched to Coach ${coach.name} • ${coach.accent}!'),
                            duration: const Duration(seconds: 2),
                            backgroundColor: coach.primaryAccent,
                          ),
                        );
                      },
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isSel ? coach.primaryAccent.withOpacity(0.18) : const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSel ? coach.primaryAccent : Colors.white12,
                            width: isSel ? 2 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Stack(
                              children: [
                                coach.buildAvatar(radius: 24),
                                Positioned(
                                  bottom: 0,
                                  right: 0,
                                  child: Container(
                                    padding: const EdgeInsets.all(2.5),
                                    decoration: BoxDecoration(
                                      color: coach.primaryAccent,
                                      shape: BoxShape.circle,
                                    ),
                                    child: Text(
                                      coach.isFemale ? '👩' : '👨',
                                      style: const TextStyle(fontSize: 9),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        coach.name,
                                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: coach.primaryAccent.withOpacity(0.18),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Text(
                                          coach.accent,
                                          style: TextStyle(
                                            color: coach.primaryAccent,
                                            fontSize: 9.5,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 3),
                                  Text(
                                    coach.tagline,
                                    style: TextStyle(color: Colors.white.withOpacity(0.65), fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                            if (isSel)
                              Container(
                                width: 22,
                                height: 22,
                                decoration: BoxDecoration(color: coach.primaryAccent, shape: BoxShape.circle),
                                child: const Center(
                                  child: Icon(Icons.check, color: Colors.white, size: 14),
                                ),
                              )
                            else
                              const Icon(Icons.chevron_right_rounded, color: Colors.white38, size: 22),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
