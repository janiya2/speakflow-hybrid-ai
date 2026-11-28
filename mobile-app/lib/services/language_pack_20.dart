import 'dart:math';

/// Unified 20-Language Native Pack for SpeakFlow AI Mobile App
/// Provides:
/// 1. 8+ distinct non-repeating conversational (reply, question) turns per language
/// 2. 4 varied gentle silence nudges per language (never repeats same nudge)
/// 3. Dynamic opening generators across all 20 languages (never starts every call with the same question)
/// 4. Comprehensive offline grammar & politeness detection across major languages

class DialoguePair {
  final String reply;
  final String question;
  const DialoguePair({required this.reply, required this.question});
}

class OfflineGrammarMatch {
  final bool hasCorrection;
  final String original;
  final String correction;
  final String explanation;
  final String targetPhrase;

  const OfflineGrammarMatch({
    required this.hasCorrection,
    this.original = '',
    this.correction = '',
    this.explanation = '',
    this.targetPhrase = '',
  });
}

class NativeLanguageBundle {
  final String code;
  final List<DialoguePair> dialogueTurns;
  final List<String> nudges;
  final List<String> openingPrefixes;
  final String praise;
  final String praiseQuestion;
  final String grace;
  final String graceQuestion;
  final String wrapUp;
  final String errorFallback;
  final String sampleUtterance;
  final String Function(String phrase) retryTemplate;
  final String Function(String phrase) drillPromptTemplate;
  final String Function(String phrase) correctionPromptTemplate;

  const NativeLanguageBundle({
    required this.code,
    required this.dialogueTurns,
    required this.nudges,
    required this.openingPrefixes,
    required this.praise,
    required this.praiseQuestion,
    required this.grace,
    required this.graceQuestion,
    required this.wrapUp,
    required this.errorFallback,
    required this.sampleUtterance,
    required this.retryTemplate,
    required this.drillPromptTemplate,
    required this.correctionPromptTemplate,
  });

  List<String> get offlineReplies => dialogueTurns.map((t) => '${t.reply} ${t.question}').toList();
  String get defaultFollowUpQuestion => dialogueTurns.first.question;
}

class LanguagePack20 {
  static final Random _rand = Random();

  static final Map<String, NativeLanguageBundle> _bundles = {
    'ja': NativeLanguageBundle(
      code: 'ja',
      dialogueTurns: [
        DialoguePair(reply: 'なるほど、よく伝わりました！', question: '次に具体的に何をしたいですか？'),
        DialoguePair(reply: 'とても自然な日本語ですね！', question: '普段も同じような経験がありますか？'),
        DialoguePair(reply: '素敵な考え方ですね！', question: '一番印象に残っていることは何ですか？'),
        DialoguePair(reply: '分かりました、その通りですね！', question: 'もう少し詳しく教えていただけますか？'),
        DialoguePair(reply: '素晴らしい表現です！', question: '別の選択肢があるとしたら、どれを選びますか？'),
        DialoguePair(reply: 'おっしゃる通りです！', question: 'それについて友達はどう思いますか？'),
        DialoguePair(reply: 'すごく興味深いお話ですね！', question: '今後どのように活かしていきたいですか？'),
        DialoguePair(reply: 'なるほど、そういう見方もありますね！', question: '一番好きなポイントはどこですか？'),
      ],
      nudges: [
        '聞いていますよ！ゆっくり考えて、思いついたことから話してみてくださいね。',
        '大丈夫ですよ、間違えても全然平気です！短い一言からでも大丈夫ですよ。',
        'もし難しければ、まずは「はい」か「いいえ」から答えてみてくださいね！',
        'お時間のある時に、今一番気になっていることを教えていただけますか？',
      ],
      openingPrefixes: [
        'こんにちは！今日も楽しく日本語を練習しましょう。',
        'やあ！お話しできて嬉しいです。準備はいいですか？',
        'お疲れ様です！リラックスして自然な会話から始めましょう。',
        'ようこそ！今日はこのテーマでしっかり会話力を伸ばしましょう。',
      ],
      praise: '素晴らしい！完璧な発音です！ 🎉',
      praiseQuestion: '他にはいかがですか？',
      grace: 'よく頑張りました！大丈夫です、続けていきましょう！',
      graceQuestion: 'もっと教えてください！',
      wrapUp: '今日の通話練習時間は終了しました！素晴らしい練習ができましたね。結果を見てみましょう！',
      errorFallback: 'よく分かりました！他にはいかがですか？',
      sampleUtterance: 'コーヒーを一杯お願いします。',
      retryTemplate: (p) => '惜しいです！よく聞いてもう一度言ってみてください:「$p」',
      drillPromptTemplate: (p) => 'リピートしてください:「$p」',
      correctionPromptTemplate: (p) => '惜しいですね！日本語では「$p」と言います。リピートしてみてください！',
    ),
    'ko': NativeLanguageBundle(
      code: 'ko',
      dialogueTurns: [
        DialoguePair(reply: '잘 이해했어요! 정말 자연스럽게 말씀하셨네요.', question: '그 다음에는 무엇을 하고 싶으신가요?'),
        DialoguePair(reply: '좋은 의견이에요!', question: '예전에도 비슷한 경험이 있으신가요?'),
        DialoguePair(reply: '와, 정말 흥미로운 이야기네요!', question: '가장 기억에 남는 순간은 언제였나요?'),
        DialoguePair(reply: '그렇군요, 충분히 공감돼요.', question: '조금만 더 자세히 설명해 주실 수 있나요?'),
        DialoguePair(reply: '표현력이 정말 좋으시네요!', question: '만약 다시 선택할 수 있다면 어떤 걸 고르실 건가요?'),
        DialoguePair(reply: '맞아요, 저도 그렇게 생각해요!', question: '주변 친구들은 보통 어떻게 말하나요?'),
        DialoguePair(reply: '아주 명확하게 잘 말씀하셨어요.', question: '그 중에서 가장 좋아하는 부분은 무엇인가요?'),
        DialoguePair(reply: '네, 알겠습니다!', question: '앞으로의 계획은 어떻게 되시나요?'),
      ],
      nudges: [
        '듣고 있어요! 틀려도 괜찮으니 편하게 말씀해 주세요.',
        '천천히 생각하셔도 돼요! 짧은 문장부터 시작해 볼까요?',
        '어려우시다면 간단히 느낌부터 말씀해 주셔도 좋아요!',
        '지금 머릿속에 가장 먼저 떠오르는 단어가 무엇인가요?',
      ],
      openingPrefixes: [
        '안녕하세요! 오늘도 재미있게 한국어 연습해 봐요.',
        '반가워요! 오늘 대화가 정말 기대되네요.',
        '편안하게 숨 한 번 쉬고, 자연스럽게 시작해 볼까요?',
        '환영합니다! 오늘 주제에 대해 함께 이야기해 봐요.',
      ],
      praise: '아주 좋아요! 완벽한 발음이에요! 🎉',
      praiseQuestion: '더 이야기하고 싶은 것이 있으신가요?',
      grace: '좋은 시도였어요! 괜찮아요, 계속해서 이야기해 봐요!',
      graceQuestion: '더 자세히 말씀해 주세요!',
      wrapUp: '오늘 연습 통화 시간이 모두 끝났어요! 정말 잘하셨습니다. 결과를 확인해 볼까요?',
      errorFallback: '잘 이해했어요! 더 이야기하고 싶은 것이 있으신가요?',
      sampleUtterance: '따뜻한 아메리카노 한 잔 주세요.',
      retryTemplate: (p) => "아쉬워요! 잘 듣고 한 번 더 말해보세요: '$p'",
      drillPromptTemplate: (p) => "따라 해보세요: '$p'",
      correctionPromptTemplate: (p) => "좋은 시도였어요! 한국어로는 '$p'(이)라고 해요. 다시 따라 해보시겠어요?",
    ),
    'zh': NativeLanguageBundle(
      code: 'zh',
      dialogueTurns: [
        DialoguePair(reply: '我完全明白了，表达得很自然！', question: '接下来您打算怎么做呢？'),
        DialoguePair(reply: '这个想法很有意思！', question: '您以前有过类似的经历吗？'),
        DialoguePair(reply: '说得非常地道！', question: '这其中您最喜欢哪个部分？'),
        DialoguePair(reply: '很有道理，我同意您的看法。', question: '能再多分享一些细节吗？'),
        DialoguePair(reply: '您的进步真快！', question: '如果是和朋友一起，您会怎么安排？'),
        DialoguePair(reply: '好的，没问题！', question: '除此之外，您还有其他偏好吗？'),
        DialoguePair(reply: '听起来非常棒！', question: '这件事对您有什么特别的启发吗？'),
        DialoguePair(reply: '我理解您的意思了。', question: '您未来对此有什么计划？'),
      ],
      nudges: [
        '我在听呢！不用紧张，想到什么就说什么。',
        '慢慢来，哪怕只说一个词或短句也完全可以！',
        '您可以先告诉我您最简单的第一反应吗？',
        '别担心语法对错，勇敢说出来就是进步！',
      ],
      openingPrefixes: [
        '你好！很高兴今天能陪你一起练习中文。',
        '嗨！准备好开始今天轻松有趣的对话了吗？',
        '欢迎回来！我们放松心情，自然地聊一聊吧。',
        '今天的话题非常实用，让我们直接开始吧！',
      ],
      praise: '太棒了！发音非常标准！ 🎉',
      praiseQuestion: '您还想分享什么吗？',
      grace: '很好的尝试！别担心，我们继续练习吧！',
      graceQuestion: '请多告诉我一些！',
      wrapUp: '今天的通话练习时间结束了！您表现得太出色了。让我们看看您的成绩吧！',
      errorFallback: '我明白了！您还想说点什么吗？',
      sampleUtterance: '你好，请给我来一杯拿铁咖啡。',
      retryTemplate: (p) => "很接近了！仔细听并再试一次：'$p'",
      drillPromptTemplate: (p) => "请跟读：'$p'",
      correctionPromptTemplate: (p) => "很棒的尝试！中文里我们说：'$p'。你能跟我重复一遍吗？",
    ),
    'ar': NativeLanguageBundle(
      code: 'ar',
      dialogueTurns: [
        DialoguePair(reply: 'ممتاز، فهمت قصدك تماماً!', question: 'كيف تود أن نتابع الحديث بعد ذلك؟'),
        DialoguePair(reply: 'تعبير رائع وطبيعي جداً!', question: 'هل مررت بتجربة مشابهة من قبل؟'),
        DialoguePair(reply: 'أحسنت، فكرة جميلة حقاً!', question: 'ما أكثر شيء أعجبك في هذا الأمر؟'),
        DialoguePair(reply: 'هذا واضح جداً ومقنع.', question: 'هل يمكنك إخباري بمزيد من التفاصيل؟'),
        DialoguePair(reply: 'نطقك يتحسن بسرعة!', question: 'ماذا كنت ستفعل لو تغير الموقف؟'),
        DialoguePair(reply: 'بالتأكيد، أتفق معك تماماً!', question: 'ما خطتك للخطوة القادمة؟'),
        DialoguePair(reply: 'جميل جداً!', question: 'من الشخص الذي تحب مشاركة هذا معه؟'),
        DialoguePair(reply: 'رائع، استمر بهذا الأسلوب!', question: 'هل هناك خيار آخر تفضله عادةً؟'),
      ],
      nudges: [
        'أنا أستمع إليك! خذ وقتك ولا تقلق من الأخطاء.',
        'لا بأس، يمكنك البدء بجملة قصيرة جداً!',
        'فكر بهدوء، ما أول شيء يخطر ببالك الآن؟',
        'أنا هنا لمساعدتك، جرب أن تجيب بكلمات بسيطة.',
      ],
      openingPrefixes: [
        'مرحباً بك! يسعدني جداً التدرب معك اليوم.',
        'أهلاً! لنبدأ محادثة طبيعية وممتعة باللغة العربية.',
        'أهلاً وسهلاً! خذ نفساً عميقاً ولنبدأ هذا التمرين الرائع.',
        'مرحباً! هذا الموضوع شيق جداً، هل أنت مستعد؟',
      ],
      praise: 'رائع! نطقك ممتاز جداً! 🎉',
      praiseQuestion: 'ما الذي ترغب في التحدث عنه أيضاً؟',
      grace: 'محاولة رائعة! لا تقلق، سنتعلمها معاً. دعنا نواصل حديثنا!',
      graceQuestion: 'أخبرني بالمزيد!',
      wrapUp: 'انتهى وقت تدريبنا لهذا اليوم! لقد قمت بعمل رائع حقاً. لنستعرض نتائجك الآن!',
      errorFallback: 'فهمت عليك! ما الذي ترغب في قوله أيضاً؟',
      sampleUtterance: 'أود طلب فنجان قهوة من فضلك.',
      retryTemplate: (p) => "قريب جداً! استمع جيداً وحاول مرة أخرى: '$p'",
      drillPromptTemplate: (p) => "من فضلك كرر: '$p'",
      correctionPromptTemplate: (p) => "محاولة جيدة! باللغة العربية نقول: '$p'. هل يمكنك تكرار ذلك معي؟",
    ),
    'es': NativeLanguageBundle(
      code: 'es',
      dialogueTurns: [
        DialoguePair(reply: '¡Muy bien! Te he entendido perfectamente.', question: '¿Qué te gustaría hacer a continuación?'),
        DialoguePair(reply: '¡Suena muy natural y fluido!', question: '¿Has tenido alguna experiencia parecida antes?'),
        DialoguePair(reply: '¡Excelente punto de vista!', question: '¿Qué es lo que más te gusta de esa idea?'),
        DialoguePair(reply: '¡Claro que sí, tienes toda la razón!', question: '¿Podrías contarme un poco más de detalle?'),
        DialoguePair(reply: '¡Qué buena respuesta!', question: '¿Y cómo reaccionarías si la situación cambiara?'),
        DialoguePair(reply: 'Entendido perfectamente.', question: '¿Cuál sería tu opción favorita en este caso?'),
        DialoguePair(reply: '¡Me encanta cómo lo expresaste!', question: '¿Con qué frecuencia sueles practicar o hacer esto?'),
        DialoguePair(reply: '¡Buen trabajo!', question: '¿Qué más te gustaría añadir sobre este tema?'),
      ],
      nudges: [
        '¡Te estoy escuchando! Tómate tu tiempo y responde cuando quieras.',
        'No te preocupes por cometer errores, ¡intenta con una frase corta!',
        '¿Qué es lo primero que se te viene a la mente ahora mismo?',
        'Tómalo con calma, estoy aquí para ayudarte. ¿Qué opinas?',
      ],
      openingPrefixes: [
        '¡Hola! Qué alegría practicar español contigo hoy.',
        '¡Buenas! Vamos a tener una conversación muy natural y divertida.',
        '¡Bienvenido! Relájate y charlemos como si estuviéramos ahí mismo.',
        '¡Qué gusto escucharte! Empecemos con este escenario práctico.',
      ],
      praise: '¡Genial! ¡Pronunciación perfecta! 🎉',
      praiseQuestion: '¿Qué más te gustaría compartir?',
      grace: '¡Buen intento! No te preocupes, lo dominarás la próxima vez. ¡Sigamos!',
      graceQuestion: '¡Cuéntame más!',
      wrapUp: '¡Nuestro tiempo de práctica ha concluido! Hiciste un trabajo increíble hoy. ¡Veamos tus resultados!',
      errorFallback: '¡Entendido! ¿Qué más te gustaría decir?',
      sampleUtterance: 'Quisiera un café con leche, por favor.',
      retryTemplate: (p) => "¡Muy cerca! Escucha atentamente: '$p'. ¡Inténtalo una vez más!",
      drillPromptTemplate: (p) => "Por favor repite: '$p'",
      correctionPromptTemplate: (p) => "¡Buen intento! En español decimos: '$p'. ¿Puedes repetirlo conmigo?",
    ),
    'fr': NativeLanguageBundle(
      code: 'fr',
      dialogueTurns: [
        DialoguePair(reply: "Très bien, j'ai parfaitement compris !", question: 'Que souhaitez-vous faire ou commander ensuite ?'),
        DialoguePair(reply: "C'est très clair et naturel !", question: "Avez-vous l'habitude de vivre ce genre de situation ?"),
        DialoguePair(reply: "Excellent choix, j'adore votre façon de le dire !", question: "Qu'est-ce qui vous plaît le plus dans cette option ?"),
        DialoguePair(reply: "Parfait, c'est noté avec plaisir !", question: 'Souhaitez-vous ajouter un petit détail ou une préférence ?'),
        DialoguePair(reply: 'Votre accent devient de plus en plus fluide !', question: 'Et comment réagiriez-vous si cela changeait ?'),
        DialoguePair(reply: "C'est une excellente idée !", question: 'Pouvez-vous m’expliquer pourquoi vous préférez cela ?'),
        DialoguePair(reply: "Tout à fait d'accord avec vous !", question: "Quel est votre prochain objectif aujourd'hui ?"),
        DialoguePair(reply: "C'est un plaisir de vous écouter !", question: 'Y a-t-il autre chose que vous aimeriez partager ?'),
      ],
      nudges: [
        'Je vous écoute ! Prenez votre temps et dites-moi ce que vous en pensez.',
        "N'ayez aucune crainte de faire des erreurs, essayez même une phrase courte !",
        "Quelle est la première réponse qui vous vient à l'esprit ?",
        'Tout va bien, prenez votre temps. Voulez-vous que je reformule plus simplement ?',
      ],
      openingPrefixes: [
        'Bonjour ! Je suis ravi de pratiquer le français avec vous aujourd’hui.',
        'Salut ! Plongeons tout de suite dans cette conversation réaliste.',
        'Bienvenue ! Détendez-vous et parlons naturellement comme à Paris.',
        'Enchanté de vous retrouver ! Commençons sans attendre.',
      ],
      praise: 'Magnifique ! Prononciation parfaite ! 🎉',
      praiseQuestion: "Que souhaitez-vous partager d'autre ?",
      grace: 'Bel effort ! Ne vous inquiétez pas, vous maîtriserez cela la prochaine fois. Continuons !',
      graceQuestion: "Dites-m'en plus !",
      wrapUp: 'Notre temps de pratique est terminé ! Vous avez fait du très bon travail aujourd’hui. Voyons vos résultats !',
      errorFallback: "J'ai bien compris ! Que souhaitez-vous dire d'autre ?",
      sampleUtterance: "Je voudrais un café crème, s'il vous plaît.",
      retryTemplate: (p) => "Vous y êtes presque ! Écoutez bien : '$p'. Essayez encore une fois !",
      drillPromptTemplate: (p) => "Veuillez répéter : '$p'",
      correctionPromptTemplate: (p) => "Bon essai ! En français, on dit : '$p'. Peux-tu répéter avec moi ?",
    ),
    'de': NativeLanguageBundle(
      code: 'de',
      dialogueTurns: [
        DialoguePair(reply: 'Sehr gut, das habe ich genau verstanden!', question: 'Was möchten Sie als Nächstes tun?'),
        DialoguePair(reply: 'Das klingt wirklich natürlich und flüssig!', question: 'Haben Sie das schon einmal erlebt?'),
        DialoguePair(reply: 'Eine großartige Ansicht!', question: 'Was gefällt Ihnen daran besonders gut?'),
        DialoguePair(reply: 'Verstanden, das macht absolut Sinn.', question: 'Könnten Sie mir noch ein Beispiel dazu nennen?'),
        DialoguePair(reply: 'Ihre Aussprache klingt sehr sicher!', question: 'Welche Alternative würden Sie sonst wählen?'),
        DialoguePair(reply: 'Das ist ein spannender Punkt!', question: 'Wie gehen Sie normalerweise in solchen Situationen vor?'),
        DialoguePair(reply: 'Wunderbar formuliert!', question: 'Haben Sie noch weitere Wünsche oder Fragen dazu?'),
        DialoguePair(reply: 'Ja, da stimme ich völlig zu!', question: 'Wie geht Ihre Geschichte weiter?'),
      ],
      nudges: [
        'Ich höre Ihnen zu! Lassen Sie sich ruhig Zeit.',
        'Keine Angst vor Fehlern — fangen Sie einfach mit einem kurzen Satz an!',
        'Was fällt Ihnen als Erstes zu dieser Situation ein?',
        'Alles gut, nehmen Sie sich einen Moment. Soll ich die Frage anders stellen?',
      ],
      openingPrefixes: [
        'Hallo! Schön, heute mit Ihnen Deutsch zu üben.',
        'Guten Tag! Lassen Sie uns direkt in ein natürliches Gespräch starten.',
        'Willkommen! Machen wir eine lockere, praxisnahe Übung zusammen.',
        'Freut mich sehr! Sind Sie bereit für unser heutiges Szenario?',
      ],
      praise: 'Wunderbar! Perfekte Aussprache! 🎉',
      praiseQuestion: 'Was möchten Sie noch teilen?',
      grace: 'Guter Versuch! Keine Sorge, beim nächsten Mal klappt es. Machen wir weiter!',
      graceQuestion: 'Erzählen Sie mir mehr!',
      wrapUp: 'Unsere Übungszeit ist um! Sie haben heute großartige Arbeit geleistet. Sehen wir uns Ihre Ergebnisse an!',
      errorFallback: 'Verstanden! Was möchten Sie sonst noch sagen?',
      sampleUtterance: 'Ich hätte gerne einen Kaffee, bitte.',
      retryTemplate: (p) => "Ganz nah dran! Hören Sie genau hin: '$p'. Versuchen Sie es noch einmal!",
      drillPromptTemplate: (p) => "Bitte wiederholen Sie: '$p'",
      correctionPromptTemplate: (p) => "Guter Versuch! Auf Deutsch sagen wir: '$p'. Kannst du das nachsprechen?",
    ),
    'it': NativeLanguageBundle(
      code: 'it',
      dialogueTurns: [
        DialoguePair(reply: 'Benissimo, ho capito perfettamente!', question: 'Cosa ti piacerebbe fare adesso?'),
        DialoguePair(reply: 'Suona molto naturale ed elegante!', question: 'Hai già avuto un’esperienza simile?'),
        DialoguePair(reply: 'Ottimo punto di vista!', question: 'Qual è la cosa che preferisci di più?'),
        DialoguePair(reply: 'Chiarissimo, ha molto senso!', question: 'Potresti raccontarmi qualche dettaglio in più?'),
        DialoguePair(reply: 'Stai parlando con molta sicurezza!', question: "E se dovessi scegliere un'alternativa?"),
        DialoguePair(reply: "Perfetto, sono proprio d'accordo!", question: 'Come ti organizzi di solito in questi casi?'),
        DialoguePair(reply: 'Bellissima risposta!', question: "C'è qualcos'altro che vorresti aggiungere?"),
        DialoguePair(reply: 'Fantastico!', question: 'Qual è il prossimo passo secondo te?'),
      ],
      nudges: [
        'Ti sto ascoltando! Prenditi il tuo tempo e rispondi con calma.',
        'Non temere di sbagliare, inizia pure con una frase breve!',
        'Qual è la prima cosa che ti viene in mente?',
        'Tutto bene, siamo qui per fare pratica. Vuoi che ripeta la domanda?',
      ],
      openingPrefixes: [
        'Ciao! Che bello esercitarci in italiano oggi.',
        'Buongiorno! Iniziamo subito una conversazione naturale e piacevole.',
        'Benvenuto! Rilassati e chiacchieriamo come in un vero incontro.',
        'Piacere mio! Cominciamo questo nuovo scenario insieme.',
      ],
      praise: 'Fantastico! Pronuncia perfetta! 🎉',
      praiseQuestion: "Cos'altro vorresti condividere?",
      grace: 'Ottimo tentativo! Non preoccuparti, ci riuscirai la prossima volta. Continuiamo!',
      graceQuestion: 'Raccontami di più!',
      wrapUp: 'Il nostro tempo di pratica è terminato! Hai fatto un ottimo lavoro oggi. Vediamo i tuoi risultati!',
      errorFallback: "Ho capito! Cos'altro vorresti dire?",
      sampleUtterance: 'Vorrei un caffè macchiato, per favore.',
      retryTemplate: (p) => "Ci sei quasi! Ascolta bene: '$p'. Prova ancora una volta!",
      drillPromptTemplate: (p) => "Per favore ripeti: '$p'",
      correctionPromptTemplate: (p) => "Ottimo tentativo! In italiano diciamo: '$p'. Puoi ripeterlo con me?",
    ),
    'pt': NativeLanguageBundle(
      code: 'pt',
      dialogueTurns: [
        DialoguePair(reply: 'Muito bem, entendi perfeitamente!', question: 'O que você gostaria de fazer em seguida?'),
        DialoguePair(reply: 'Soa muito natural e espontâneo!', question: 'Você já passou por uma situação parecida?'),
        DialoguePair(reply: 'Excelente ideia!', question: 'O que você mais gosta nessa escolha?'),
        DialoguePair(reply: 'Faz todo sentido!', question: 'Você poderia me dar mais um detalhe sobre isso?'),
        DialoguePair(reply: 'Sua pronúncia está ótima!', question: 'Qual seria a sua segunda opção?'),
        DialoguePair(reply: 'Concordo plenamente!', question: 'Como você costuma lidar com isso no dia a dia?'),
        DialoguePair(reply: 'Muito bom!', question: 'Gostaria de acrescentar mais alguma coisa?'),
        DialoguePair(reply: 'Perfeito!', question: 'Para onde vamos a partir daqui?'),
      ],
      nudges: [
        'Estou ouvindo! Fique à vontade para responder quando estiver pronto.',
        'Sem pressa e sem medo de errar — tente uma frase bem curtinha!',
        'Qual é a primeira resposta que vem à sua mente?',
        "Tudo bem, estou aqui para ajudar. Quer tentar responder com 'sim' ou 'não' primeiro?",
      ],
      openingPrefixes: [
        'Olá! Que ótimo praticar português com você hoje.',
        'Oi! Vamos ter uma conversa bem natural e leve agora.',
        'Seja bem-vindo! Relaxe e vamos conversar como amigos.',
        'Que bom falar com você! Vamos começar este cenário prático.',
      ],
      praise: 'Incrível! Pronúncia perfeita! 🎉',
      praiseQuestion: 'O que mais você gostaria de compartilhar?',
      grace: 'Bom esforço! Não se preocupe, você vai dominar na próxima. Vamos continuar!',
      graceQuestion: 'Conte-me mais!',
      wrapUp: 'Nosso tempo de prática terminou! Você fez um trabalho incrível hoje. Vamos ver seus resultados!',
      errorFallback: 'Entendi! O que mais você gostaria de dizer?',
      sampleUtterance: 'Eu gostaria de um café com leite, por favor.',
      retryTemplate: (p) => "Quase lá! Ouça com atenção: '$p'. Tente mais uma vez!",
      drillPromptTemplate: (p) => "Por favor, repita: '$p'",
      correctionPromptTemplate: (p) => "Boa tentativa! Em português dizemos: '$p'. Pode repetir comigo?",
    ),
    'ru': NativeLanguageBundle(
      code: 'ru',
      dialogueTurns: [
        DialoguePair(reply: 'Отлично, я вас прекрасно понял!', question: 'Что бы вы хотели сделать дальше?'),
        DialoguePair(reply: 'Звучит очень естественно!', question: 'У вас уже был похожий опыт раньше?'),
        DialoguePair(reply: 'Замечательная мысль!', question: 'Что вам нравится в этом больше всего?'),
        DialoguePair(reply: 'Да, это звучит очень логично.', question: 'Не могли бы вы рассказать немного подробнее?'),
        DialoguePair(reply: 'Вы говорите всё увереннее!', question: 'Какой другой вариант вы бы рассмотрели?'),
        DialoguePair(reply: 'Совершенно с вами согласен!', question: 'Как вы обычно поступаете в такой ситуации?'),
        DialoguePair(reply: 'Хорошо сформулировано!', question: 'Что бы вы хотели добавить к этому?'),
        DialoguePair(reply: 'Понятно!', question: 'Какой будет наш следующий шаг?'),
      ],
      nudges: [
        'Я вас слушаю! Не спешите и поделитесь своими мыслями.',
        'Не бойтесь ошибиться — попробуйте сказать хотя бы короткую фразу!',
        'Что первым приходит вам в голову по этому поводу?',
        'Всё в порядке, я здесь. Хотите, я задам вопрос немного проще?',
      ],
      openingPrefixes: [
        'Привет! Рад попрактиковаться с вами в русском языке сегодня.',
        'Здравствуйте! Давайте начнём живой и естественный разговор.',
        'Добро пожаловать! Расслабьтесь и представьте себя в этой ситуации.',
        'Отлично, начинаем! Готовы к сегодняшнему диалогу?',
      ],
      praise: 'Замечательно! Идеальное произношение! 🎉',
      praiseQuestion: 'Что бы вы ещё хотели добавить?',
      grace: 'Хорошая попытка! Не переживайте, в следующий раз всё получится. Продолжаем!',
      graceQuestion: 'Расскажите подробнее!',
      wrapUp: 'Наше время практики подошло к концу! Вы сегодня отлично поработали. Давайте посмотрим ваши результаты!',
      errorFallback: 'Я вас понял! Что бы вы ещё хотели сказать?',
      sampleUtterance: 'Я хотел бы заказать чашку кофе, пожалуйста.',
      retryTemplate: (p) => "Очень близко! Послушайте внимательно: '$p'. Попробуйте ещё раз!",
      drillPromptTemplate: (p) => "Пожалуйста, повторите: '$p'",
      correctionPromptTemplate: (p) => "Хорошая попытка! По-русски мы говорим: '$p'. Повторите за мной, пожалуйста?",
    ),
    'hi': NativeLanguageBundle(
      code: 'hi',
      dialogueTurns: [
        DialoguePair(reply: 'बहुत बढ़िया, मैं आपकी बात पूरी तरह समझ गया!', question: 'आगे आप क्या करना चाहेंगे?'),
        DialoguePair(reply: 'यह बहुत स्वाभाविक और स्पष्ट लगा!', question: 'क्या आपको पहले भी ऐसा अनुभव हुआ है?'),
        DialoguePair(reply: 'बहुत अच्छा विचार है!', question: 'इसमें आपको सबसे ज़्यादा क्या पसंद आया?'),
        DialoguePair(reply: 'बिल्कुल सही कहा आपने!', question: 'क्या आप इसके बारे में थोड़ा और विस्तार से बता सकते हैं?'),
        DialoguePair(reply: 'आपका आत्मविश्वास शानदार है!', question: 'अगर आपके पास दूसरा विकल्प होता, तो आप क्या चुनते?'),
        DialoguePair(reply: 'समझ गया, बहुत अच्छी बात है!', question: 'आम तौर पर आप ऐसी स्थिति में क्या करते हैं?'),
        DialoguePair(reply: 'वाह, बहुत बढ़िया जवाब!', question: 'क्या आप इसमें कुछ और जोड़ना चाहेंगे?'),
        DialoguePair(reply: 'अच्छा लगा सुनकर!', question: 'अब आपका अगला कदम क्या होगा?'),
      ],
      nudges: [
        'मैं सुन रहा हूँ! आराम से अपने विचार साझा करें।',
        'गलती होने की चिंता न करें — छोटे से वाक्य से शुरू करें!',
        'अभी आपके मन में पहला विचार क्या आ रहा है?',
        'कोई बात नहीं, समय लीजिए। क्या मैं प्रश्न को आसान शब्दों में पूछूँ?',
      ],
      openingPrefixes: [
        'नमस्ते! आज आपके साथ हिंदी का अभ्यास करके बहुत खुशी हो रही है।',
        'आइए, आज एक बिल्कुल स्वाभाविक बातचीत शुरू करते हैं।',
        'स्वागत है! आराम से बोलें और इस स्थिति की कल्पना करें।',
        'चलिए आज के विषय पर मज़ेदार चर्चा शुरू करते हैं!',
      ],
      praise: 'शानदार! बिल्कुल सही उच्चारण! 🎉',
      praiseQuestion: 'आप और क्या साझा करना चाहेंगे?',
      grace: 'अच्छा प्रयास! चिंता न करें, अगली बार आप इसे और बेहतर बोलेंगे। चलिए आगे बढ़ते हैं!',
      graceQuestion: 'मुझे थोड़ा और बताएं!',
      wrapUp: 'आज का अभ्यास समय समाप्त हो गया है! आपने बहुत अच्छा काम किया। आइए आपके परिणाम देखें!',
      errorFallback: 'मैं समझ गया! आप और क्या कहना चाहेंगे?',
      sampleUtterance: 'कृपया मुझे एक कप कॉफ़ी दीजिए।',
      retryTemplate: (p) => "बहुत करीब! ध्यान से सुनें और फिर से कोशिश करें: '$p'",
      drillPromptTemplate: (p) => "कृपया दोहराएं: '$p'",
      correctionPromptTemplate: (p) => "अच्छा प्रयास! हिंदी में हम कहते हैं: '$p'। क्या आप मेरे साथ दोहरा सकते हैं?",
    ),
    'ta': NativeLanguageBundle(
      code: 'ta',
      dialogueTurns: [
        DialoguePair(reply: 'மிக நன்று, நீங்கள் சொன்னது தெளிவாகப் புரிந்தது!', question: 'அடுத்து நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?'),
        DialoguePair(reply: 'மிகவும் இயல்பாகப் பேசினீர்கள்!', question: 'இதற்கு முன் இதே போன்ற அனுபவம் உங்களுக்கு இருந்ததா?'),
        DialoguePair(reply: 'சிறப்பான கருத்து!', question: 'இதில் உங்களுக்கு மிகவும் பிடித்த விஷயம் எது?'),
        DialoguePair(reply: 'சரியாகச் சொன்னீர்கள்!', question: 'இதைப்பற்றி இன்னும் கொஞ்சம் விவரமாகச் சொல்ல முடியுமா?'),
        DialoguePair(reply: 'உங்கள் தமிழ் உச்சரிப்பு அருமையாக உள்ளது!', question: 'வேறொரு வாய்ப்பு இருந்தால் நீங்கள் எதைத் தேர்ந்தெடுப்பீர்கள்?'),
        DialoguePair(reply: 'புரிந்தது, நல்ல முடிவு!', question: 'சாதாரணமாக இப்படிப்பட்ட நேரத்தில் நீங்கள் என்ன செய்வீர்கள்?'),
        DialoguePair(reply: 'மிகவும் சுவாரசியமாக இருக்கிறது!', question: 'இதைப் பற்றி வேறு ஏதாவது சொல்ல விரும்புகிறீர்களா?'),
        DialoguePair(reply: 'நல்லது!', question: 'உங்கள் அடுத்த திட்டம் என்ன?'),
      ],
      nudges: [
        'நான் கேட்டுக்கொண்டிருக்கிறேன்! தயங்காமல் உங்கள் கருத்தைச் சொல்லுங்கள்.',
        'தவறுகளைப் பற்றி கவலைப்படாதீர்கள் — ஒரு சின்ன வாக்கியத்தில் தொடங்குங்கள்!',
        'இப்போது உங்கள் மனதில் முதலில் தோன்றும் பதில் என்ன?',
        'பரவாயில்லை, மெதுவாகச் சிந்தித்துப் பேசுங்கள். நான் வேறு விதமாகக் கேட்கட்டுமா?',
      ],
      openingPrefixes: [
        'வணக்கம்! இன்று உங்களுடன் தமிழில் உரையாடுவதில் மிகவும் மகிழ்ச்சி.',
        'வாருங்கள், இன்று இயல்பான ஒரு உரையாடலைத் தொடங்குவோம்.',
        'நல்வரவு! நிதானமாகவும் நம்பிக்கையுடனும் பேசத் தொடங்குங்கள்.',
        'சரி, இன்றைய சூழலுக்கு ஏற்ப நமது பயிற்சியை ஆரம்பிக்கலாமா?',
      ],
      praise: 'அருமை! மிகச் சரியான உச்சரிப்பு! 🎉',
      praiseQuestion: 'வேறென்ன சொல்ல விரும்புகிறீர்கள்?',
      grace: 'நல்ல முயற்சி! கவலைப்படாதீர்கள், தொடர்ந்து பேசுவோம்!',
      graceQuestion: 'இன்னும் கொஞ்சம் சொல்லுங்கள்!',
      wrapUp: 'இன்றைய பயிற்சி நேரம் முடிவடைந்தது! நீங்கள் மிகச் சிறப்பாகப் பேசினீர்கள். உங்கள் முடிவுகளைப் பார்ப்போம்!',
      errorFallback: 'புரிந்தது! வேறென்ன சொல்ல விரும்புகிறீர்கள்?',
      sampleUtterance: 'தயவுசெய்து எனக்கு ஒரு காபி கொடுங்கள்.',
      retryTemplate: (p) => "மிகவும் நெருங்கிவிட்டீர்கள்! கவனமாகக் கேட்டு மீண்டும் சொல்லுங்கள்: '$p'",
      drillPromptTemplate: (p) => "திரும்பச் சொல்லுங்கள்: '$p'",
      correctionPromptTemplate: (p) => "நல்ல முயற்சி! தமிழில் நாம் '$p' என்று சொல்வோம். அதைத் திரும்பச் சொல்ல முடியுமா?",
    ),
    'si': NativeLanguageBundle(
      code: 'si',
      dialogueTurns: [
        DialoguePair(reply: 'හොඳයි, මට පැහැදිලිව තේරුණා!', question: 'ඊළඟට ඔබ කරන්න කැමති මොකක්ද?'),
        DialoguePair(reply: 'ඔබේ අදහස හරිම ස්වභාවිකයි!', question: 'මීට කලින් මේ වගේ අත්දැකීමක් තිබිලා තියෙනවද?'),
        DialoguePair(reply: 'නියම අදහසක්!', question: 'ඒකෙන් ඔබ වැඩියෙන්ම කැමති මොන කොටසටද?'),
        DialoguePair(reply: 'හරිම පැහැදිලියි!', question: 'මේ ගැන තව ටිකක් විස්තර කරන්න පුළුවන්ද?'),
        DialoguePair(reply: 'ඔබ හරිම විශ්වාසයෙන් කතා කරනවා!', question: 'වෙනත් විකල්පයක් තිබුණා නම් ඔබ මොකක්ද තෝරගන්නේ?'),
        DialoguePair(reply: 'ඇත්තටම මමත් ඒකට එකඟයි!', question: 'සාමාන්‍යයෙන් ඔබ මේ වගේ වෙලාවට මොකද කරන්නේ?'),
        DialoguePair(reply: 'හරිම රසවත් කතාවක්!', question: 'ඒ ගැන තව මොනවද එකතු කරන්න තියෙන්නේ?'),
        DialoguePair(reply: 'ස්තූතියි, මට තේරුණා!', question: 'ඔබේ ඊළඟ සැලැස්ම මොකක්ද?'),
      ],
      nudges: [
        'මම අහගෙන ඉන්නේ! සන්සුන්ව ඔබේ අදහස කියන්න.',
        'වැරදීම් ගැන බය වෙන්න එපා — පොඩි වාක්‍යයකින් පටන් ගමු!',
        'දැන්ම ඔබේ හිතට එන පළමු අදහස මොකක්ද?',
        'කලබල නැතුව කල්පනා කරලා කියන්න. මම ප්‍රශ්නය තව සරල කරන්නද?',
      ],
      openingPrefixes: [
        'ආයුබෝවන්! අද ඔබ එක්ක සිංහලෙන් පුහුණු වෙන්න ලැබීම සතුටක්.',
        'හෙලෝ! අපි ස්වභාවිකවම මේ සංවාදය පටන් ගමු.',
        'සාදරයෙන් පිළිගන්නවා! සැහැල්ලුවෙන් කතා කරන්න පටන් ගන්න.',
        'හරි, අද මාතෘකාව ගැන අපි උද්යෝගයෙන් කතා කරමු!',
      ],
      praise: 'ඉතා විශිෂ්ටයි! නිවැරදි උච්චාරණය! 🎉',
      praiseQuestion: 'ඔබට තව මොනවද කියන්න තියෙන්නේ?',
      grace: 'හොඳ උත්සාහයක්! බයවෙන්න එපා, අපි දිගටම කරමු!',
      graceQuestion: 'තව ටිකක් විස්තර කරන්න!',
      wrapUp: 'අද අපේ පුහුණු කාලය අවසන්! ඔබ අද හරිම හොඳින් කතා කළා. දැන් ඔබේ ප්‍රතිඵල බලමු!',
      errorFallback: 'මට තේරුණා! ඔබට තව මොනවද කියන්න තියෙන්නේ?',
      sampleUtterance: 'කරුණාකර මට කෝපි එකක් දෙන්න.',
      retryTemplate: (p) => "ඉතා ආසන්නයි! හොඳින් අහලා ආයෙත් කියලා බලන්න: '$p'",
      drillPromptTemplate: (p) => "කරුණාකර ආයෙත් කියන්න: '$p'",
      correctionPromptTemplate: (p) => "හොඳ උත්සාහයක්! සිංහලෙන් අපි කියන්නේ: '$p'. මාත් එක්ක ආයෙත් කියන්න පුළුවන්ද?",
    ),
    'nl': NativeLanguageBundle(
      code: 'nl',
      dialogueTurns: [
        DialoguePair(reply: 'Heel goed, dat klinkt duidelijk!', question: 'Wat zou je hierna willen doen?'),
        DialoguePair(reply: 'Dat klinkt heel natuurlijk!', question: 'Heb je zoiets al eens eerder meegemaakt?'),
        DialoguePair(reply: 'Wat een goed punt!', question: 'Wat spreekt je daar het meeste in aan?'),
        DialoguePair(reply: 'Begrepen, dat klinkt heel logisch!', question: 'Kun je daar iets meer over vertellen?'),
        DialoguePair(reply: 'Je uitspraak klinkt echt sterk!', question: 'Welk alternatief zou je kiezen als dat kon?'),
        DialoguePair(reply: 'Helemaal mee eens!', question: 'Hoe pak je dit normaal gesproken aan?'),
        DialoguePair(reply: 'Leuk om te horen!', question: 'Wil je daar nog iets aan toevoegen?'),
        DialoguePair(reply: 'Duidelijk!', question: 'Wat is de volgende stap volgens jou?'),
      ],
      nudges: [
        'Ik luister! Neem gerust de tijd om je gedachten te delen.',
        'Wees niet bang om fouten te maken — begin gewoon met een korte zin!',
        'Wat is het eerste dat in je opkomt?',
        'Geen probleem, neem even de tijd. Zal ik de vraag iets anders stellen?',
      ],
      openingPrefixes: [
        'Hallo! Leuk om vandaag samen Nederlands te oefenen.',
        'Hoi! Laten we meteen beginnen met een natuurlijk gesprek.',
        'Welkom! Ontspan je en laten we dit samen doornemen.',
        'Wat fijn dat je er bent! Klaar voor dit scenario?',
      ],
      praise: 'Geweldig! Perfecte uitspraak! 🎉',
      praiseQuestion: 'Wat zou je nog meer willen delen?',
      grace: 'Goede poging! Geen zorgen, volgende keer lukt het zeker. Laten we doorgaan!',
      graceQuestion: 'Vertel me meer!',
      wrapUp: 'Onze oefentijd zit erop! Je hebt het vandaag geweldig gedaan. Laten we je resultaten bekijken!',
      errorFallback: 'Ik heb je begrepen! Wat zou je nog meer willen zeggen?',
      sampleUtterance: 'Ik wil graag een kopje koffie, alstublieft.',
      retryTemplate: (p) => "Bijna goed! Luister aandachtig en probeer het nog eens: '$p'",
      drillPromptTemplate: (p) => "Herhaal alsjeblieft: '$p'",
      correctionPromptTemplate: (p) => "Goede poging! In het Nederlands zeggen we: '$p'. Kun je dat herhalen?",
    ),
    'tr': NativeLanguageBundle(
      code: 'tr',
      dialogueTurns: [
        DialoguePair(reply: 'Çok iyi, sizi gayet net anladım!', question: 'Bundan sonra ne yapmak istersiniz?'),
        DialoguePair(reply: 'Çok doğal ve akıcı konuşuyorsunuz!', question: 'Daha önce buna benzer bir deneyiminiz oldu mu?'),
        DialoguePair(reply: 'Harika bir bakış açısı!', question: 'Bu konuda en çok hoşunuza giden şey nedir?'),
        DialoguePair(reply: 'Kesinlikle çok mantıklı!', question: 'Bana biraz daha detay verebilir misiniz?'),
        DialoguePair(reply: 'Telaffuzunuz giderek güçleniyor!', question: 'Başka bir seçeneğiniz olsaydı hangisini tercih ederdiniz?'),
        DialoguePair(reply: 'Tamamen katılıyorum!', question: 'Genellikle böyle bir durumda nasıl davranırsınız?'),
        DialoguePair(reply: 'Çok güzel ifade ettiniz!', question: 'Eklemek istediğiniz başka bir şey var mı?'),
        DialoguePair(reply: 'Anlaşıldı!', question: 'Sizce sıradaki adım ne olmalı?'),
      ],
      nudges: [
        'Sizi dinliyorum! Hazır olduğunuzda fikrinizi paylaşabilirsiniz.',
        'Hata yapmaktan çekinmeyin — kısa bir cümleyle başlayabilirsiniz!',
        'Şu an aklınıza gelen ilk şey nedir?',
        'Acele etmeyin, buradayım. Soruyu biraz daha basitleştireyim mi?',
      ],
      openingPrefixes: [
        'Merhaba! Bugün sizinle Türkçe pratik yapmak harika.',
        'Selam! Hadi hemen gerçekçi ve doğal bir sohbete başlayalım.',
        'Hoş geldiniz! Rahatlayın ve sanki oradaymışsınız gibi konuşun.',
        'Harika, başlıyoruz! Bugünkü senaryoya hazır mısınız?',
      ],
      praise: 'Harika! Mükemmel telaffuz! 🎉',
      praiseQuestion: 'Başka ne paylaşmak istersiniz?',
      grace: 'Güzel deneme! Merak etmeyin, bir dahaki sefere başaracaksınız. Devam edelim!',
      graceQuestion: 'Bana biraz daha anlatın!',
      wrapUp: 'Bugünkü pratik süremiz doldu! Harika bir iş çıkardınız. Sonuçlarınıza bakalım!',
      errorFallback: 'Anladım! Başka ne söylemek istersiniz?',
      sampleUtterance: 'Bir fincan kahve alabilir miyim, lütfen?',
      retryTemplate: (p) => "Çok yaklaştınız! Dikkatlice dinleyin ve tekrar deneyin: '$p'",
      drillPromptTemplate: (p) => "Lütfen tekrar edin: '$p'",
      correctionPromptTemplate: (p) => "Güzel deneme! Türkçede şöyle deriz: '$p'. Benimle tekrar edebilir misin?",
    ),
    'vi': NativeLanguageBundle(
      code: 'vi',
      dialogueTurns: [
        DialoguePair(reply: 'Rất tốt, tôi đã hiểu ý bạn!', question: 'Bạn muốn làm gì tiếp theo?'),
        DialoguePair(reply: 'Rất tự nhiên và trôi chảy!', question: 'Trước đây bạn đã từng gặp tình huống này chưa?'),
        DialoguePair(reply: 'Ý kiến hay lắm!', question: 'Bạn thích điểm nào nhất trong lựa chọn đó?'),
        DialoguePair(reply: 'Hoàn toàn hợp lý!', question: 'Bạn có thể chia sẻ thêm một chút chi tiết không?'),
        DialoguePair(reply: 'Phát âm của bạn rất rõ ràng!', question: 'Nếu có lựa chọn khác, bạn sẽ chọn gì?'),
        DialoguePair(reply: 'Tôi hoàn toàn đồng ý!', question: 'Thông thường bạn sẽ xử lý việc này thế nào?'),
        DialoguePair(reply: 'Tuyệt vời!', question: 'Bạn có muốn nói thêm điều gì nữa không?'),
        DialoguePair(reply: 'Rõ rồi nhé!', question: 'Bước tiếp theo của bạn là gì?'),
      ],
      nudges: [
        'Tôi đang lắng nghe đây! Bạn hãy cứ thoải mái chia sẻ nhé.',
        'Đừng ngại mắc lỗi — cứ bắt đầu bằng một câu thật ngắn gọn thôi!',
        'Điều đầu tiên bạn nghĩ đến lúc này là gì?',
        'Không sao đâu, cứ từ từ nhé. Bạn muốn tôi hỏi lại đơn giản hơn không?',
      ],
      openingPrefixes: [
        'Xin chào! Hôm nay rất vui được luyện tiếng Việt cùng bạn.',
        'Chào bạn! Hãy cùng bắt đầu một cuộc trò chuyện thật tự nhiên nhé.',
        'Chào mừng bạn! Hãy thư giãn và trò chuyện thoải mái nào.',
        'Tuyệt lắm, chúng ta bắt đầu tình huống thực tế hôm nay nhé!',
      ],
      praise: 'Tuyệt vời! Phát âm hoàn hảo! 🎉',
      praiseQuestion: 'Bạn còn muốn chia sẻ thêm điều gì không?',
      grace: 'Cố gắng rất tốt! Đừng lo lắng, lần sau bạn sẽ làm tốt hơn. Hãy tiếp tục nhé!',
      graceQuestion: 'Hãy kể cho tôi nghe thêm đi!',
      wrapUp: 'Thời gian luyện tập hôm nay đã kết thúc! Bạn đã làm rất tốt. Hãy xem kết quả của bạn nhé!',
      errorFallback: 'Tôi đã hiểu! Bạn còn muốn nói thêm điều gì không?',
      sampleUtterance: 'Cho tôi gọi một ly cà phê sữa đá nhé.',
      retryTemplate: (p) => "Gần đúng rồi! Hãy nghe kỹ và thử lại lần nữa nhé: '$p'",
      drillPromptTemplate: (p) => "Vui lòng nhắc lại: '$p'",
      correctionPromptTemplate: (p) => "Cố gắng rất tốt! Trong tiếng Việt chúng ta nói: '$p'. Bạn có thể nhắc lại cùng tôi không?",
    ),
    'id': NativeLanguageBundle(
      code: 'id',
      dialogueTurns: [
        DialoguePair(reply: 'Bagus sekali, saya paham dengan jelas!', question: 'Apa yang ingin Anda lakukan selanjutnya?'),
        DialoguePair(reply: 'Terdengar sangat natural!', question: 'Apakah Anda pernah mengalami hal serupa sebelumnya?'),
        DialoguePair(reply: 'Ide yang sangat bagus!', question: 'Bagian mana yang paling Anda sukai dari itu?'),
        DialoguePair(reply: 'Masuk akal sekali!', question: 'Bisakah Anda ceritakan sedikit lebih banyak?'),
        DialoguePair(reply: 'Pelafalan Anda terdengar mantap!', question: 'Kalau ada pilihan lain, mana yang akan Anda pilih?'),
        DialoguePair(reply: 'Saya sangat setuju!', question: 'Bagaimana biasanya Anda menghadapi situasi seperti ini?'),
        DialoguePair(reply: 'Keren sekali!', question: 'Ada hal lain yang ingin Anda tambahkan?'),
        DialoguePair(reply: 'Dipahami dengan baik!', question: 'Apa rencana Anda setelah ini?'),
      ],
      nudges: [
        'Saya mendengarkan! Silakan santai dan sampaikan pendapat Anda.',
        'Jangan takut salah — coba mulai dengan kalimat pendek saja!',
        'Apa hal pertama yang terpikir oleh Anda sekarang?',
        'Tidak apa-apa, pelan-pelan saja. Mau saya ulangi dengan lebih sederhana?',
      ],
      openingPrefixes: [
        'Halo! Senang sekali bisa berlatih bahasa Indonesia bersama Anda hari ini.',
        'Hai! Mari kita mulai percakapan yang santai dan natural.',
        'Selamat datang! Tarik napas dan mari mengobrol seperti biasa.',
        'Bagus, mari kita mulai skenario seru hari ini!',
      ],
      praise: 'Luar biasa! Pelafalan yang sempurna! 🎉',
      praiseQuestion: 'Apa lagi yang ingin Anda bagikan?',
      grace: 'Usaha yang bagus! Jangan khawatir, Anda akan menguasainya lain kali. Mari lanjutkan!',
      graceQuestion: 'Ceritakan lebih banyak lagi!',
      wrapUp: 'Waktu latihan kita hari ini sudah selesai! Anda melakukan pekerjaan yang luar biasa. Mari lihat hasilnya!',
      errorFallback: 'Saya mengerti! Apa lagi yang ingin Anda katakan?',
      sampleUtterance: 'Saya ingin memesan secangkir kopi, tolong.',
      retryTemplate: (p) => "Hampir tepat! Dengarkan baik-baik dan coba lagi: '$p'",
      drillPromptTemplate: (p) => "Silakan ulangi: '$p'",
      correctionPromptTemplate: (p) => "Usaha yang bagus! Dalam bahasa Indonesia kita bilang: '$p'. Bisa ulangi bersama saya?",
    ),
    'th': NativeLanguageBundle(
      code: 'th',
      dialogueTurns: [
        DialoguePair(reply: 'ดีมากเลยครับ เข้าใจชัดเจนเลย!', question: 'ต่อไปอยากจะทำอะไรต่อดีครับ?'),
        DialoguePair(reply: 'เป็นธรรมชาติมากครับ!', question: 'คุณเคยเจอสถานการณ์แบบนี้มาก่อนไหมครับ?'),
        DialoguePair(reply: 'เป็นความคิดที่ดีมากครับ!', question: 'คุณชอบส่วนไหนของเรื่องนี้มากที่สุดครับ?'),
        DialoguePair(reply: 'ฟังดูสมเหตุสมผลมากเลยครับ!', question: 'เล่าเพิ่มเติมให้ฟังอีกนิดได้ไหมครับ?'),
        DialoguePair(reply: 'ออกเสียงได้ชัดเจนมากครับ!', question: 'ถ้าเลือกอย่างอื่นได้ คุณจะเลือกอะไรครับ?'),
        DialoguePair(reply: 'เห็นด้วยเลยครับ!', question: 'ปกติแล้วคุณจัดการเรื่องแบบนี้ยังไงครับ?'),
        DialoguePair(reply: 'ยอดเยี่ยมมากครับ!', question: 'มีอะไรอยากพูดเพิ่มเติมอีกไหมครับ?'),
        DialoguePair(reply: 'เข้าใจแล้วครับ!', question: 'คุณคิดอย่างไรเกี่ยวกับเรื่องนี้ครับ?'),
      ],
      nudges: [
        'ผมกำลังฟังอยู่นะครับ! สบายๆ แล้วแชร์ความคิดเห็นได้เลยครับ',
        'ไม่ต้องกลัวผิดนะครับ ลองเริ่มจากประโยคสั้นๆ ดูก่อนก็ได้!',
        'สิ่งแรกที่คุณนึกถึงตอนนี้คืออะไรครับ?',
        'ไม่เป็นไรครับ ค่อยๆ คิดนะ อยากให้ผมถามให้ง่ายขึ้นไหมครับ?',
      ],
      openingPrefixes: [
        'สวัสดีครับ! ยินดีมากที่ได้ฝึกภาษาไทยด้วยกันวันนี้',
        'สวัสดีครับ! เรามาเริ่มคุยกันแบบเป็นธรรมชาติเลยนะครับ',
        'ยินดีต้อนรับครับ! ผ่อนคลายแล้วลองคุยเหมือนอยู่ในสถานการณ์จริงเลยนะ',
        'พร้อมแล้วนะครับ มาเริ่มบทสนทนาวันนี้กันเลย!',
      ],
      praise: 'ยอดเยี่ยมมาก! ออกเสียงได้สมบูรณ์แบบเลยครับ! 🎉',
      praiseQuestion: 'มีอะไรอยากเล่าเพิ่มเติมอีกไหมครับ?',
      grace: 'พยายามได้ดีมากครับ! ไม่ต้องกังวล คราวหน้าจะเก่งขึ้นแน่นอน มาคุยกันต่อครับ!',
      graceQuestion: 'เล่าให้ฟังอีกหน่อยสิครับ!',
      wrapUp: 'หมดเวลาฝึกพูดสำหรับวันนี้แล้วครับ! วันนี้คุณทำได้ดีมาก มาดูผลคะแนนกันเลย!',
      errorFallback: 'เข้าใจแล้วครับ! มีอะไรอยากพูดเพิ่มเติมอีกไหมครับ?',
      sampleUtterance: 'ขอสั่งกาแฟเย็นหนึ่งแก้วครับ',
      retryTemplate: (p) => "ใกล้เคียงมากแล้วครับ! ตั้งใจฟังแล้วลองพูดอีกครั้งนะครับ: '$p'",
      drillPromptTemplate: (p) => "กรุณาพูดตาม: '$p'",
      correctionPromptTemplate: (p) => "พยายามได้ดีมาก! ในภาษาไทยเราพูดว่า: '$p'. ลองพูดตามอีกครั้งได้ไหม?",
    ),
    'sv': NativeLanguageBundle(
      code: 'sv',
      dialogueTurns: [
        DialoguePair(reply: 'Jättebra, jag förstod precis vad du menade!', question: 'Vad vill du göra härnäst?'),
        DialoguePair(reply: 'Väldigt naturligt uttryckt!', question: 'Har du varit med om något liknande tidigare?'),
        DialoguePair(reply: 'Vilken bra tanke!', question: 'Vad tycker du bäst om med det?'),
        DialoguePair(reply: 'Det låter helt rimligt!', question: 'Kan du berätta lite mer om det?'),
        DialoguePair(reply: 'Ditt uttal låter riktigt bra!', question: 'Vad skulle du välja som alternativ?'),
        DialoguePair(reply: 'Jag håller helt med dig!', question: 'Hur brukar du göra i en sådan situation?'),
        DialoguePair(reply: 'Härligt att höra!', question: 'Finns det något mer du vill lägga till?'),
        DialoguePair(reply: 'Uppfattat!', question: 'Vad tycker du är nästa steg?'),
      ],
      nudges: [
        'Jag lyssnar! Ta god tid på dig och berätta vad du tycker.',
        'Var inte rädd för att göra fel — börja bara med en kort mening!',
        'Vad är det första du kommer att tänka på just nu?',
        'Ingen fara, ta en sekund. Vill du att jag ställer frågan lite enklare?',
      ],
      openingPrefixes: [
        'Hej! Vad kul att öva svenska tillsammans idag.',
        'Hejsan! Låt oss börja ett naturligt och avslappnat samtal.',
        'Välkommen! Slappna av och låtsas att vi pratar på riktigt.',
        'Toppen, nu kör vi igång med dagens scenario!',
      ],
      praise: 'Fantastiskt! Perfekt uttal! 🎉',
      praiseQuestion: 'Vad mer skulle du vilja dela med dig av?',
      grace: 'Bra försök! Oroa dig inte, du kommer att klara det nästa gång. Vi fortsätter!',
      graceQuestion: 'Berätta mer!',
      wrapUp: 'Vår övningstid är slut för idag! Du gjorde ett fantastiskt jobb. Låt oss se dina resultat!',
      errorFallback: 'Jag förstår! Vad mer skulle du vilja säga?',
      sampleUtterance: 'Jag skulle vilja beställa en kopp kaffe, tack.',
      retryTemplate: (p) => "Mycket nära! Lyssna noga och försök en gång till: '$p'",
      drillPromptTemplate: (p) => "Vänligen upprepa: '$p'",
      correctionPromptTemplate: (p) => "Bra försök! På svenska säger vi: '$p'. Kan du upprepa det med mig?",
    ),
    'en': NativeLanguageBundle(
      code: 'en',
      dialogueTurns: [
        DialoguePair(reply: 'That makes total sense!', question: 'How do you usually handle that in real life?'),
        DialoguePair(reply: 'I love the way you phrased that!', question: 'What first got you interested in this?'),
        DialoguePair(reply: 'You explained that so clearly!', question: 'If you had another option, which one would you pick?'),
        DialoguePair(reply: 'Great point — I completely agree with you!', question: 'Could you give me a quick real-life example?'),
        DialoguePair(reply: 'That sounds really interesting!', question: 'What has been the biggest challenge with it so far?'),
        DialoguePair(reply: 'Awesome, your tone sounded super confident!', question: 'What do you enjoy most about this experience?'),
        DialoguePair(reply: 'Good thinking!', question: 'How would a friend or colleague usually respond to that?'),
        DialoguePair(reply: 'Nice! That flows very naturally.', question: 'What would your next step be from here?'),
      ],
      nudges: [
        "I'm listening! Take your time and share whatever comes to mind first.",
        "No pressure at all — even a short answer is great practice! Give it a quick try.",
        "Take a breath, you're doing great! Would you like to start with 'Well, I think...'?",
        "Still with me? Let's keep it simple: do you like this option or prefer something else?",
      ],
      openingPrefixes: [
        'Hey there! So great to practice speaking with you today.',
        "Welcome back! Let's jump right into a natural conversation.",
        'Hi! Relax and imagine we are right there in person.',
        "Awesome to hear from you! Let's kick off this scenario together.",
      ],
      praise: 'Awesome! Perfect pronunciation! 🎉',
      praiseQuestion: 'What else would you like to share?',
      grace: "Good effort! Don't worry, you'll master it next time. Let's keep going!",
      graceQuestion: 'Tell me more!',
      wrapUp: 'Our practice time for this call has concluded! You did an amazing job today. Let’s see your results!',
      errorFallback: 'I understood! What else would you like to say?',
      sampleUtterance: 'I would like to order a coffee, please.',
      retryTemplate: (p) => "Very close! Listen carefully: '$p'. Try once more!",
      drillPromptTemplate: (p) => "Please repeat: '$p'",
      correctionPromptTemplate: (p) => "Good effort! In English, we say: '$p'. Can you repeat that for me?",
    ),
  };

  static NativeLanguageBundle resolve(String language) {
    final l = language.toLowerCase().trim();
    if (l.contains('jap') || l == 'ja' || l.startsWith('ja-')) return _bundles['ja']!;
    if (l.contains('kor') || l == 'ko' || l.startsWith('ko-')) return _bundles['ko']!;
    if (l.contains('chin') || l.contains('mandarin') || l == 'zh' || l.startsWith('zh-')) return _bundles['zh']!;
    if (l.contains('arab') || l == 'ar' || l.startsWith('ar-')) return _bundles['ar']!;
    if (l.contains('span') || l.contains('espa') || l == 'es' || l.startsWith('es-')) return _bundles['es']!;
    if (l.contains('french') || l.contains('fran') || l == 'fr' || l.startsWith('fr-')) return _bundles['fr']!;
    if (l.contains('germ') || l.contains('deutsch') || l == 'de' || l.startsWith('de-')) return _bundles['de']!;
    if (l.contains('ital') || l == 'it' || l.startsWith('it-')) return _bundles['it']!;
    if (l.contains('portug') || l == 'pt' || l.startsWith('pt-')) return _bundles['pt']!;
    if (l.contains('russ') || l == 'ru' || l.startsWith('ru-')) return _bundles['ru']!;
    if (l.contains('hind') || l == 'hi' || l.startsWith('hi-')) return _bundles['hi']!;
    if (l.contains('tamil') || l == 'ta' || l.startsWith('ta-')) return _bundles['ta']!;
    if (l.contains('sinha') || l == 'si' || l.startsWith('si-')) return _bundles['si']!;
    if (l.contains('dutch') || l.contains('nederland') || l == 'nl' || l.startsWith('nl-')) return _bundles['nl']!;
    if (l.contains('turk') || l == 'tr' || l.startsWith('tr-')) return _bundles['tr']!;
    if (l.contains('viet') || l == 'vi' || l.startsWith('vi-')) return _bundles['vi']!;
    if (l.contains('indones') || l == 'id' || l.startsWith('id-')) return _bundles['id']!;
    if (l.contains('thai') || l == 'th' || l.startsWith('th-')) return _bundles['th']!;
    if (l.contains('swed') || l.contains('svensk') || l == 'sv' || l == 'se' || l.startsWith('sv-')) return _bundles['sv']!;
    return _bundles['en']!;
  }

  /// Generates a fresh, varied opening prompt every time a call starts, never stuck on the exact same question!
  static String buildVariedOpeningQuestion({
    required String language,
    required String defaultPrompt,
    required List<String> alternateQuestions,
    String lastUsedOpening = '',
  }) {
    final bundle = resolve(language);
    final List<String> pool = [];
    final cleanDefault = defaultPrompt.replaceAll(RegExp(r'\([^)]*\)'), '').replaceAll(RegExp(r'\[[^\]]*\]'), '').trim();
    if (cleanDefault.isNotEmpty) pool.add(cleanDefault);

    for (final q in alternateQuestions) {
      final cleanQ = q.replaceAll(RegExp(r'\([^)]*\)'), '').replaceAll(RegExp(r'\[[^\]]*\]'), '').trim();
      if (cleanQ.isNotEmpty) {
        final prefix = bundle.openingPrefixes[_rand.nextInt(bundle.openingPrefixes.length)];
        pool.add('$prefix $cleanQ');
      }
    }

    for (var i = 0; i < min(4, bundle.dialogueTurns.length); i++) {
      final turn = bundle.dialogueTurns[i];
      final prefix = bundle.openingPrefixes[_rand.nextInt(bundle.openingPrefixes.length)];
      pool.add('$prefix ${turn.question}');
    }

    final fresh = pool.where((p) => p != lastUsedOpening).toList();
    final target = fresh.isNotEmpty ? fresh : pool;
    return target[_rand.nextInt(target.length)];
  }

  /// Comprehensive Offline Grammar & Politeness Detector across Languages
  static OfflineGrammarMatch detectGrammarMistake(String spokenText, String targetLanguage) {
    final bundle = resolve(targetLanguage);
    final lower = spokenText.toLowerCase().trim();

    if (bundle.code == 'en') {
      final rules = <Map<String, dynamic>>[
        {'rx': RegExp(r'\bi am agree\b'), 'o': 'I am agree', 'c': 'I agree', 'e': "'Agree' is a verb, so never use 'am' before it."},
        {'rx': RegExp(r"\b(he|she|it)\s+don'?t\b"), 'o': "he/she don't", 'c': "he/she doesn't", 'e': "Use 'doesn't' with singular third-person subjects (he, she, it)."},
        {'rx': RegExp(r'\b(he|she|it)\s+have\b'), 'o': 'he/she have', 'c': 'he/she has', 'e': "Use 'has' instead of 'have' with he, she, or it."},
        {'rx': RegExp(r"\bdidn'?t\s+(went|came|saw|ate|did|bought|got)\b"), 'o': "didn't + past verb", 'c': "didn't go", 'e': "After 'didn't', always use the base verb form (e.g., 'didn't go')."},
        {'rx': RegExp(r'\bmore\s+(better|faster|easier|cheaper|bigger)\b'), 'o': 'more better', 'c': 'much better', 'e': "Avoid double comparatives; say 'much better' instead of 'more better'."},
        {'rx': RegExp(r'\byesterday\s+i\s+go\b|\bi\s+go\b.*\byesterday\b'), 'o': 'go yesterday', 'c': 'went yesterday', 'e': "Use the past tense verb 'went' when talking about yesterday."},
        {'rx': RegExp(r'\bi\s+am\s+(live|work|like|want|know)\b'), 'o': 'I am + base verb', 'c': 'I live / I work', 'e': "For habits and states, use simple present 'I live' rather than 'I am live'."},
        {'rx': RegExp(r'\bwant\s+(order|eat|go|buy|ask|speak)\b'), 'o': 'want + verb', 'c': 'want to order', 'e': "Always place 'to' between 'want' and another verb."},
        {'rx': RegExp(r'\bdiscuss\s+about\b'), 'o': 'discuss about', 'c': 'discuss', 'e': "'Discuss' already includes 'about', so say 'discuss the topic'."},
        {'rx': RegExp(r'\bsince\s+\d+\s+(years|months|days|hours)\b'), 'o': 'since X years', 'c': 'for X years', 'e': "Use 'for' for durations of time, and 'since' for a starting point."},
        {'rx': RegExp(r'\bmarried\s+with\b'), 'o': 'married with', 'c': 'married to', 'e': "In English, we say 'married to someone', not 'married with'."},
        {'rx': RegExp(r'\blisten\s+music\b'), 'o': 'listen music', 'c': 'listen to music', 'e': "The verb 'listen' requires the preposition 'to' before an object."},
        {'rx': RegExp(r'\bdepend\s+of\b'), 'o': 'depend of', 'c': 'depend on', 'e': "In English, the verb 'depend' is always followed by 'on'."},
        {'rx': RegExp(r'\bexplain\s+me\b'), 'o': 'explain me', 'c': 'explain to me', 'e': "Say 'explain to me', not 'explain me'."},
        {'rx': RegExp(r'\b(informations|advices|furnitures)\b'), 'o': 'informations / advices', 'c': 'information / advice', 'e': 'These are uncountable nouns in English and do not take a plural s.'},
        {'rx': RegExp(r'\bmuch\s+peoples?\b|\bmany\s+persons\b'), 'o': 'much people / many persons', 'c': 'many people', 'e': "'People' is plural and pairs with 'many', not 'much'."},
        {'rx': RegExp(r'\bme\s+want\b'), 'o': 'me want', 'c': 'I would like', 'e': "Use subject pronoun 'I' (not 'me') as the subject."},
      ];
      for (final r in rules) {
        if ((r['rx'] as RegExp).hasMatch(lower)) {
          return OfflineGrammarMatch(
            hasCorrection: true,
            original: r['o'] as String,
            correction: r['c'] as String,
            explanation: r['e'] as String,
            targetPhrase: r['c'] as String,
          );
        }
      }
    } else if (bundle.code == 'fr') {
      final rules = <Map<String, dynamic>>[
        {'rx': RegExp(r'\bje\s+veux\s+(un|une|du|de|le|la)\b'), 'o': 'je veux ...', 'c': 'je voudrais ...', 'e': "En français poli, on dit 'Je voudrais...' plutôt que 'Je veux...'."},
        {'rx': RegExp(r'\bje\s+suis\s+\d+\s+ans?\b'), 'o': 'je suis ... ans', 'c': "j'ai ... ans", 'e': "En français, on utilise le verbe 'avoir' pour l'âge (j'ai 20 ans)."},
        {'rx': RegExp(r'\bje\s+suis\s+(faim|soif|chaud|froid)\b'), 'o': 'je suis faim/soif', 'c': "j'ai faim / j'ai soif", 'e': "On utilise 'avoir' : j'ai faim, j'ai soif."},
        {'rx': RegExp(r'\bbeaucoup\s+des\b'), 'o': 'beaucoup des', 'c': 'beaucoup de', 'e': "Après 'beaucoup', on utilise toujours 'de' sans article."},
      ];
      for (final r in rules) {
        if ((r['rx'] as RegExp).hasMatch(lower)) {
          return OfflineGrammarMatch(
            hasCorrection: true,
            original: r['o'] as String,
            correction: r['c'] as String,
            explanation: r['e'] as String,
            targetPhrase: r['c'] as String,
          );
        }
      }
    } else if (bundle.code == 'es') {
      final rules = <Map<String, dynamic>>[
        {'rx': RegExp(r'\b(yo\s+)?soy\s+\d+\s+años?\b'), 'o': 'soy ... años', 'c': 'tengo ... años', 'e': "En español se usa 'tener' para la edad (tengo 20 años)."},
        {'rx': RegExp(r'\b(yo\s+)?gusto\b|\bme\s+gusto\b'), 'o': 'me gusto', 'c': 'me gusta', 'e': "Con el verbo gustar se dice 'me gusta'."},
        {'rx': RegExp(r'\bla\s+problema\b|\bla\s+día\b'), 'o': 'la problema / la día', 'c': 'el problema / el día', 'e': "'Problema' y 'día' son sustantivos masculinos."},
      ];
      for (final r in rules) {
        if ((r['rx'] as RegExp).hasMatch(lower)) {
          return OfflineGrammarMatch(
            hasCorrection: true,
            original: r['o'] as String,
            correction: r['c'] as String,
            explanation: r['e'] as String,
            targetPhrase: r['c'] as String,
          );
        }
      }
    } else if (bundle.code == 'de') {
      if (RegExp(r'\bich\s+habe\s+\d+\s+jahre\b').hasMatch(lower)) {
        return const OfflineGrammarMatch(
          hasCorrection: true,
          original: 'ich habe ... Jahre',
          correction: 'ich bin ... Jahre alt',
          explanation: "Auf Deutsch benutzt man 'sein' für das Alter.",
          targetPhrase: 'ich bin 20 Jahre alt',
        );
      }
      if (RegExp(r'\bich\s+will\s+(bestellen|ein)\b').hasMatch(lower)) {
        return const OfflineGrammarMatch(
          hasCorrection: true,
          original: 'ich will ...',
          correction: 'ich hätte gerne ...',
          explanation: "Höflicher sagt man 'Ich hätte gerne...'.",
          targetPhrase: 'Ich hätte gerne einen Kaffee',
        );
      }
    } else if (bundle.code == 'it') {
      if (RegExp(r'\bsono\s+\d+\s+anni\b').hasMatch(lower)) {
        return const OfflineGrammarMatch(
          hasCorrection: true,
          original: 'sono ... anni',
          correction: 'ho ... anni',
          explanation: "In italiano si usa 'avere' per l'età.",
          targetPhrase: 'ho venti anni',
        );
      }
    } else if (bundle.code == 'ja') {
      if ((lower.contains('食べますでした') || lower.contains('行きますでした')) || (lower.contains('tabeta') && !lower.contains('mashita'))) {
        return const OfflineGrammarMatch(
          hasCorrection: true,
          original: '食べた / 〜ますでした',
          correction: '食べました',
          explanation: '丁寧な過去形は「〜ました」を使います。',
          targetPhrase: '食べました',
        );
      }
    } else if (bundle.code == 'ko') {
      if ((lower.contains('bogo') || lower.contains('보고 싶어')) && !lower.contains('요')) {
        return const OfflineGrammarMatch(
          hasCorrection: true,
          original: '보고 싶어',
          correction: '보고 싶어요',
          explanation: "존댓말 '-요'를 붙이는 것이 자연스럽습니다.",
          targetPhrase: '보고 싶어요',
        );
      }
    }

    return const OfflineGrammarMatch(hasCorrection: false);
  }
}
