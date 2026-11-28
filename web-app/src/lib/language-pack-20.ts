/**
 * Unified 20-Language Native Pack for SpeakFlow AI Web App
 * Provides:
 * 1. Rich multi-turn dialogue pools (8+ distinct reply+question pairs per language -> ZERO repetition!)
 * 2. Varied silence nudges (4 rotating gentle prompts per language)
 * 3. Dynamic non-repeating opening starters per language
 * 4. Comprehensive offline grammar & politeness error detection across major languages
 */

export interface DialoguePair {
  reply: string;
  question: string;
}

export interface GrammarRuleMatch {
  hasCorrection: boolean;
  original: string;
  correction: string;
  explanation: string;
  targetPhrase: string;
}

export interface NativeLanguageBundle {
  code: string;
  dialogueTurns: DialoguePair[];
  nudges: string[];
  openingPrefixes: string[];
  praise: string;
  praiseQuestion: string;
  grace: string;
  graceQuestion: string;
  retryTemplate: (phrase: string) => string;
  correctionPromptTemplate: (phrase: string) => string;
  wrapUp: string;
  errorFallback: string;
}

const BUNDLES: Record<string, NativeLanguageBundle> = {
  ja: {
    code: "ja",
    dialogueTurns: [
      { reply: "なるほど、よく伝わりました！", question: "次に具体的に何をしたいですか？" },
      { reply: "とても自然な日本語ですね！", question: "普段も同じような経験がありますか？" },
      { reply: "素敵な考え方ですね！", question: "一番印象に残っていることは何ですか？" },
      { reply: "分かりました、その通りですね！", question: "もう少し詳しく教えていただけますか？" },
      { reply: "素晴らしい表現です！", question: "もし別の選択肢があるとしたら、どれを選びますか？" },
      { reply: "おっしゃる通りです！", question: "それについて友達や家族はどう思いますか？" },
      { reply: "すごく興味深いお話ですね！", question: "今後どのように活かしていきたいですか？" },
      { reply: "なるほど、そういう見方もありますね！", question: "一番好きなポイントはどこですか？" },
    ],
    nudges: [
      "聞いていますよ！ゆっくり考えて、思いついたことから話してみてくださいね。",
      "大丈夫ですよ、間違えても全然平気です！短い一言からでも大丈夫ですよ。",
      "もし難しければ、まずは「はい」か「いいえ」から答えてみてくださいね！",
      "お時間のある時に、今一番気になっていることを教えていただけますか？",
    ],
    openingPrefixes: [
      "こんにちは！今日も楽しく日本語を練習しましょう。",
      "やあ！お話しできて嬉しいです。準備はいいですか？",
      "お疲れ様です！リラックスして自然な会話から始めましょう。",
      "ようこそ！今日はこのテーマでしっかり会話力を伸ばしましょう。",
    ],
    praise: "素晴らしい！完璧な発音です！ 🎉",
    praiseQuestion: "他にはいかがですか？",
    grace: "よく頑張りました！大丈夫です、続けていきましょう！",
    graceQuestion: "もっと教えてください！",
    retryTemplate: (p) => `惜しいです！よく聞いてもう一度言ってみてください:「${p}」`,
    correctionPromptTemplate: (p) => `惜しいですね！日本語では「${p}」と言います。リピートしてみてください！`,
    wrapUp: "今日の通話練習時間は終了しました！素晴らしい練習ができましたね。結果を見てみましょう！",
    errorFallback: "よく分かりました！他にはいかがですか？",
  },
  ko: {
    code: "ko",
    dialogueTurns: [
      { reply: "잘 이해했어요! 정말 자연스럽게 말씀하셨네요.", question: "그 다음에는 무엇을 하고 싶으신가요?" },
      { reply: "좋은 의견이에요!", question: "예전에도 비슷한 경험이 있으신가요?" },
      { reply: "와, 정말 흥미로운 이야기네요!", question: "가장 기억에 남는 순간은 언제였나요?" },
      { reply: "그렇군요, 충분히 공감돼요.", question: "조금만 더 자세히 설명해 주실 수 있나요?" },
      { reply: "표현력이 정말 좋으시네요!", question: "만약 다시 선택할 수 있다면 어떤 걸 고르실 건가요?" },
      { reply: "맞아요, 저도 그렇게 생각해요!", question: "주변 친구들은 보통 어떻게 말하나요?" },
      { reply: "아주 명확하게 잘 말씀하셨어요.", question: "그 중에서 가장 좋아하는 부분은 무엇인가요?" },
      { reply: "네, 알겠습니다!", question: "앞으로의 계획은 어떻게 되시나요?" },
    ],
    nudges: [
      "듣고 있어요! 틀려도 괜찮으니 편하게 말씀해 주세요.",
      "천천히 생각하셔도 돼요! 짧은 문장부터 시작해 볼까요?",
      "어려우시다면 간단히 느낌부터 말씀해 주셔도 좋아요!",
      "지금 머릿속에 가장 먼저 떠오르는 단어가 무엇인가요?",
    ],
    openingPrefixes: [
      "안녕하세요! 오늘도 재미있게 한국어 연습해 봐요.",
      "반가워요! 오늘 대화가 정말 기대되네요.",
      "편안하게 숨 한 번 쉬고, 자연스럽게 시작해 볼까요?",
      "환영합니다! 오늘 주제에 대해 함께 이야기해 봐요.",
    ],
    praise: "아주 좋아요! 완벽한 발음이에요! 🎉",
    praiseQuestion: "더 이야기하고 싶은 것이 있으신가요?",
    grace: "좋은 시도였어요! 괜찮아요, 계속해서 이야기해 봐요!",
    graceQuestion: "더 자세히 말씀해 주세요!",
    retryTemplate: (p) => `아쉬워요! 잘 듣고 한 번 더 말해보세요: '${p}'`,
    correctionPromptTemplate: (p) => `좋은 시도였어요! 한국어로는 '${p}'(이)라고 해요. 다시 따라 해보시겠어요?`,
    wrapUp: "오늘 연습 통화 시간이 모두 끝났어요! 정말 잘하셨습니다. 결과를 확인해 볼까요?",
    errorFallback: "잘 이해했어요! 더 이야기하고 싶은 것이 있으신가요?",
  },
  zh: {
    code: "zh",
    dialogueTurns: [
      { reply: "我完全明白了，表达得很自然！", question: "接下来您打算怎么做呢？" },
      { reply: "这个想法很有意思！", question: "您以前有过类似的经历吗？" },
      { reply: "说得非常地道！", question: "这其中您最喜欢哪个部分？" },
      { reply: "很有道理，我同意您的看法。", question: "能再多分享一些细节吗？" },
      { reply: "您的进步真快！", question: "如果是和朋友一起，您会怎么安排？" },
      { reply: "好的，没问题！", question: "除此之外，您还有其他偏好吗？" },
      { reply: "听起来非常棒！", question: "这件事对您有什么特别的启发吗？" },
      { reply: "我理解您的意思了。", question: "您未来对此有什么计划？" },
    ],
    nudges: [
      "我在听呢！不用紧张，想到什么就说什么。",
      "慢慢来，哪怕只说一个词或短句也完全可以！",
      "您可以先告诉我您最简单的第一反应吗？",
      "别担心语法对错，勇敢说出来就是进步！",
    ],
    openingPrefixes: [
      "你好！很高兴今天能陪你一起练习中文。",
      "嗨！准备好开始今天轻松有趣的对话了吗？",
      "欢迎回来！我们放松心情，自然地聊一聊吧。",
      "今天的话题非常实用，让我们直接开始吧！",
    ],
    praise: "太棒了！发音非常标准！ 🎉",
    praiseQuestion: "您还想分享什么吗？",
    grace: "很好的尝试！别担心，我们继续练习吧！",
    graceQuestion: "请多告诉我一些！",
    retryTemplate: (p) => `很接近了！仔细听并再试一次：'${p}'`,
    correctionPromptTemplate: (p) => `很棒的尝试！中文里我们说：'${p}'。你能跟我重复一遍吗？`,
    wrapUp: "今天的通话练习时间结束了！您表现得太出色了。让我们看看您的成绩吧！",
    errorFallback: "我明白了！您还想说点什么吗？",
  },
  ar: {
    code: "ar",
    dialogueTurns: [
      { reply: "ممتاز، فهمت قصدك تماماً!", question: "كيف تود أن نتابع الحديث بعد ذلك؟" },
      { reply: "تعبير رائع وطبيعي جداً!", question: "هل مررت بتجربة مشابهة من قبل؟" },
      { reply: "أحسنت، فكرة جميلة حقاً!", question: "ما أكثر شيء أعجبك في هذا الأمر؟" },
      { reply: "هذا واضح جداً ومقنع.", question: "هل يمكنك إخباري بمزيد من التفاصيل؟" },
      { reply: "نطقك يتحسن بسرعة!", question: "ماذا كنت ستفعل لو تغير الموقف؟" },
      { reply: "بالتأكيد، أتفق معك تماماً!", question: "ما خطتك للخطوة القادمة؟" },
      { reply: "جميل جداً!", question: "من الشخص الذي تحب مشاركة هذا معه؟" },
      { reply: "رائع، استمر بهذا الأسلوب!", question: "هل هناك خيار آخر تفضله عادةً؟" },
    ],
    nudges: [
      "أنا أستمع إليك! خذ وقتك ولا تقلق من الأخطاء.",
      "لا بأس، يمكنك البدء بجملة قصيرة جداً!",
      "فكر بهدوء، ما أول شيء يخطر ببالك الآن؟",
      "أنا هنا لمساعدتك، جرب أن تجيب بكلمات بسيطة.",
    ],
    openingPrefixes: [
      "مرحباً بك! يسعدني جداً التدرب معك اليوم.",
      "أهلاً! لنبدأ محادثة طبيعية وممتعة باللغة العربية.",
      "أهلاً وسهلاً! خذ نفساً عميقاً ولنبدأ هذا التمرين الرائع.",
      "مرحباً! هذا الموضوع شيق جداً، هل أنت مستعد؟",
    ],
    praise: "رائع! نطقك ممتاز جداً! 🎉",
    praiseQuestion: "ما الذي ترغب في التحدث عنه أيضاً؟",
    grace: "محاولة رائعة! لا تقلق، سنتعلمها معاً. دعنا نواصل حديثنا!",
    graceQuestion: "أخبرني بالمزيد!",
    retryTemplate: (p) => `قريب جداً! استمع جيداً وحاول مرة أخرى: '${p}'`,
    correctionPromptTemplate: (p) => `محاولة جيدة! باللغة العربية نقول: '${p}'. هل يمكنك تكرار ذلك معي؟`,
    wrapUp: "انتهى وقت تدريبنا لهذا اليوم! لقد قمت بعمل رائع حقاً. لنستعرض نتائجك الآن!",
    errorFallback: "فهمت عليك! ما الذي ترغب في قوله أيضاً؟",
  },
  es: {
    code: "es",
    dialogueTurns: [
      { reply: "¡Muy bien! Te he entendido perfectamente.", question: "¿Qué te gustaría hacer a continuación?" },
      { reply: "¡Suena muy natural y fluido!", question: "¿Has tenido alguna experiencia parecida antes?" },
      { reply: "¡Excelente punto de vista!", question: "¿Qué es lo que más te gusta de esa idea?" },
      { reply: "¡Claro que sí, tienes toda la razón!", question: "¿Podrías contarme un poco más de detalle?" },
      { reply: "¡Qué buena respuesta!", question: "¿Y cómo reaccionarías si la situación cambiara?" },
      { reply: "Entendido perfectamente.", question: "¿Cuál sería tu opción favorita en este caso?" },
      { reply: "¡Me encanta cómo lo expresaste!", question: "¿Con qué frecuencia sueles practicar o hacer esto?" },
      { reply: "¡Buen trabajo!", question: "¿Qué más te gustaría añadir sobre este tema?" },
    ],
    nudges: [
      "¡Te estoy escuchando! Tómate tu tiempo y responde cuando quieras.",
      "No te preocupes por cometer errores, ¡intenta con una frase corta!",
      "¿Qué es lo primero que se te viene a la mente ahora mismo?",
      "Tómalo con calma, estoy aquí para ayudarte. ¿Qué opinas?",
    ],
    openingPrefixes: [
      "¡Hola! Qué alegría practicar español contigo hoy.",
      "¡Buenas! Vamos a tener una conversación muy natural y divertida.",
      "¡Bienvenido! Relájate y charlemos como si estuviéramos ahí mismo.",
      "¡Qué gusto escucharte! Empecemos con este escenario práctico.",
    ],
    praise: "¡Excelente! ¡Pronunciación perfecta! 🎉",
    praiseQuestion: "¿Qué más te gustaría compartir?",
    grace: "¡Buen intento! No te preocupes, lo dominarás la próxima vez. ¡Sigamos!",
    graceQuestion: "¡Cuéntame más!",
    retryTemplate: (p) => `¡Muy cerca! Escucha atentamente: '${p}'. ¡Inténtalo una vez más!`,
    correctionPromptTemplate: (p) => `¡Buen intento! En español decimos: '${p}'. ¿Puedes repetirlo conmigo?`,
    wrapUp: "¡Nuestro tiempo de práctica ha concluido! Hiciste un trabajo increíble hoy. ¡Veamos tus resultados!",
    errorFallback: "¡Entendido! ¿Qué más te gustaría decir?",
  },
  fr: {
    code: "fr",
    dialogueTurns: [
      { reply: "Très bien, j'ai parfaitement compris !", question: "Que souhaitez-vous faire ou commander ensuite ?" },
      { reply: "C'est très clair et naturel !", question: "Avez-vous l'habitude de vivre ce genre de situation ?" },
      { reply: "Excellent choix, j'adore votre façon de le dire !", question: "Qu'est-ce qui vous plaît le plus dans cette option ?" },
      { reply: "Parfait, c'est noté avec plaisir !", question: "Souhaitez-vous ajouter un petit détail ou une préférence ?" },
      { reply: "Votre accent devient de plus en plus fluide !", question: "Et comment réagiriez-vous si cela changeait ?" },
      { reply: "C'est une excellente idée !", question: "Pouvez-vous m'expliquer pourquoi vous préférez cela ?" },
      { reply: "Tout à fait d'accord avec vous !", question: "Quel est votre prochain objectif aujourd'hui ?" },
      { reply: "C'est un plaisir de vous écouter !", question: "Y a-t-il autre chose que vous aimeriez partager ?" },
    ],
    nudges: [
      "Je vous écoute ! Prenez votre temps et dites-moi ce que vous en pensez.",
      "N'ayez aucune crainte de faire des erreurs, essayez même une phrase courte !",
      "Quelle est la première réponse qui vous vient à l'esprit ?",
      "Tout va bien, prenez votre temps. Voulez-vous que je reformule plus simplement ?",
    ],
    openingPrefixes: [
      "Bonjour ! Je suis ravi de pratiquer le français avec vous aujourd'hui.",
      "Salut ! Plongeons tout de suite dans cette conversation réaliste.",
      "Bienvenue ! Détendez-vous et parlons naturellement comme à Paris.",
      "Enchanté de vous retrouver ! Commençons sans attendre.",
    ],
    praise: "Magnifique ! Prononciation parfaite ! 🎉",
    praiseQuestion: "Que souhaitez-vous partager d'autre ?",
    grace: "Bel effort ! Ne vous inquiétez pas, vous maîtriserez cela la prochaine fois. Continuons !",
    graceQuestion: "Dites-m'en plus !",
    retryTemplate: (p) => `Vous y êtes presque ! Écoutez bien : '${p}'. Essayez encore une fois !`,
    correctionPromptTemplate: (p) => `Bon essai ! En français, on dit : '${p}'. Peux-tu répéter avec moi ?`,
    wrapUp: "Notre temps de pratique est terminé ! Vous avez fait du très bon travail aujourd'hui. Voyons vos résultats !",
    errorFallback: "J'ai bien compris ! Que souhaitez-vous dire d'autre ?",
  },
  de: {
    code: "de",
    dialogueTurns: [
      { reply: "Sehr gut, das habe ich genau verstanden!", question: "Was möchten Sie als Nächstes tun?" },
      { reply: "Das klingt wirklich natürlich und flüssig!", question: "Haben Sie das schon einmal erlebt?" },
      { reply: "Eine großartige Ansicht!", question: "Was gefällt Ihnen daran besonders gut?" },
      { reply: "Verstanden, das macht absolut Sinn.", question: "Könnten Sie mir noch ein Beispiel dazu nennen?" },
      { reply: "Ihre Aussprache klingt sehr sicher!", question: "Welche Alternative würden Sie sonst wählen?" },
      { reply: "Das ist ein spannender Punkt!", question: "Wie gehen Sie normalerweise in solchen Situationen vor?" },
      { reply: "Wunderbar formuliert!", question: "Haben Sie noch weitere Wünsche oder Fragen dazu?" },
      { reply: "Ja, da stimme ich völlig zu!", question: "Wie geht Ihre Geschichte weiter?" },
    ],
    nudges: [
      "Ich höre Ihnen zu! Lassen Sie sich ruhig Zeit.",
      "Keine Angst vor Fehlern — fangen Sie einfach mit einem kurzen Satz an!",
      "Was fällt Ihnen als Erstes zu dieser Situation ein?",
      "Alles gut, nehmen Sie sich einen Moment. Soll ich die Frage anders stellen?",
    ],
    openingPrefixes: [
      "Hallo! Schön, heute mit Ihnen Deutsch zu üben.",
      "Guten Tag! Lassen Sie uns direkt in ein natürliches Gespräch starten.",
      "Willkommen! Machen wir eine lockere, praxisnahe Übung zusammen.",
      "Freut mich sehr! Sind Sie bereit für unser heutiges Szenario?",
    ],
    praise: "Wunderbar! Perfekte Aussprache! 🎉",
    praiseQuestion: "Was möchten Sie noch teilen?",
    grace: "Guter Versuch! Keine Sorge, beim nächsten Mal klappt es. Machen wir weiter!",
    graceQuestion: "Erzählen Sie mir mehr!",
    retryTemplate: (p) => `Ganz nah dran! Hören Sie genau hin: '${p}'. Versuchen Sie es noch einmal!`,
    correctionPromptTemplate: (p) => `Guter Versuch! Auf Deutsch sagen wir: '${p}'. Kannst du das nachsprechen?`,
    wrapUp: "Unsere Übungszeit ist um! Sie haben heute großartige Arbeit geleistet. Sehen wir uns Ihre Ergebnisse an!",
    errorFallback: "Verstanden! Was möchten Sie sonst noch sagen?",
  },
  it: {
    code: "it",
    dialogueTurns: [
      { reply: "Benissimo, ho capito perfettamente!", question: "Cosa ti piacerebbe fare adesso?" },
      { reply: "Suona molto naturale ed elegante!", question: "Hai già avuto un'esperienza simile?" },
      { reply: "Ottimo punto di vista!", question: "Qual è la cosa che preferisci di più?" },
      { reply: "Chiarissimo, ha molto senso!", question: "Potresti raccontarmi qualche dettaglio in più?" },
      { reply: "Stai parlando con molta sicurezza!", question: "E se dovessi scegliere un'alternativa?" },
      { reply: "Perfetto, sono proprio d'accordo!", question: "Come ti organizzi di solito in questi casi?" },
      { reply: "Bellissima risposta!", question: "C'è qualcos'altro che vorresti aggiungere?" },
      { reply: "Fantastico!", question: "Qual è il prossimo passo secondo te?" },
    ],
    nudges: [
      "Ti sto ascoltando! Prenditi il tuo tempo e rispondi con calma.",
      "Non temere di sbagliare, inizia pure con una frase breve!",
      "Qual è la prima cosa che ti viene in mente?",
      "Tutto bene, siamo qui per fare pratica. Vuoi che ripeta la domanda?",
    ],
    openingPrefixes: [
      "Ciao! Che bello esercitarci in italiano oggi.",
      "Buongiorno! Iniziamo subito una conversazione naturale e piacevole.",
      "Benvenuto! Rilassati e chiacchieriamo come in un vero incontro.",
      "Piacere mio! Cominciamo questo nuovo scenario insieme.",
    ],
    praise: "Fantastico! Pronuncia perfetta! 🎉",
    praiseQuestion: "Cos'altro vorresti condividere?",
    grace: "Ottimo tentativo! Non preoccuparti, ci riuscirai la prossima volta. Continuiamo!",
    graceQuestion: "Raccontami di più!",
    retryTemplate: (p) => `Ci sei quasi! Ascolta bene: '${p}'. Prova ancora una volta!`,
    correctionPromptTemplate: (p) => `Ottimo tentativo! In italiano diciamo: '${p}'. Puoi ripeterlo con me?`,
    wrapUp: "Il nostro tempo di pratica è terminato! Hai fatto un ottimo lavoro oggi. Vediamo i tuoi risultati!",
    errorFallback: "Ho capito! Cos'altro vorresti dire?",
  },
  pt: {
    code: "pt",
    dialogueTurns: [
      { reply: "Muito bem, entendi perfeitamente!", question: "O que você gostaria de fazer em seguida?" },
      { reply: "Soa muito natural e espontâneo!", question: "Você já passou por uma situação parecida?" },
      { reply: "Excelente ideia!", question: "O que você mais gosta nessa escolha?" },
      { reply: "Faz todo sentido!", question: "Você poderia me dar mais um detalhe sobre isso?" },
      { reply: "Sua pronúncia está ótima!", question: "Qual seria a sua segunda opção?" },
      { reply: "Concordo plenamente!", question: "Como você costuma lidar com isso no dia a dia?" },
      { reply: "Muito bom!", question: "Gostaria de acrescentar mais alguma coisa?" },
      { reply: "Perfeito!", question: "Para onde vamos a partir daqui?" },
    ],
    nudges: [
      "Estou ouvindo! Fique à vontade para responder quando estiver pronto.",
      "Sem pressa e sem medo de errar — tente uma frase bem curtinha!",
      "Qual é a primeira resposta que vem à sua mente?",
      "Tudo bem, estou aqui para ajudar. Quer tentar responder com 'sim' ou 'não' primeiro?",
    ],
    openingPrefixes: [
      "Olá! Que ótimo praticar português com você hoje.",
      "Oi! Vamos ter uma conversa bem natural e leve agora.",
      "Seja bem-vindo! Relaxe e vamos conversar como amigos.",
      "Que bom falar com você! Vamos começar este cenário prático.",
    ],
    praise: "Incrível! Pronúncia perfeita! 🎉",
    praiseQuestion: "O que mais você gostaria de compartilhar?",
    grace: "Bom esforço! Não se preocupe, você vai dominar na próxima. Vamos continuar!",
    graceQuestion: "Conte-me mais!",
    retryTemplate: (p) => `Quase lá! Ouça com atenção: '${p}'. Tente mais uma vez!`,
    correctionPromptTemplate: (p) => `Boa tentativa! Em português dizemos: '${p}'. Pode repetir comigo?`,
    wrapUp: "Nosso tempo de prática terminou! Você fez um trabalho incrível hoje. Vamos ver seus resultados!",
    errorFallback: "Entendi! O que mais você gostaria de dizer?",
  },
  ru: {
    code: "ru",
    dialogueTurns: [
      { reply: "Отлично, я вас прекрасно понял!", question: "Что бы вы хотели сделать дальше?" },
      { reply: "Звучит очень естественно!", question: "У вас уже был похожий опыт раньше?" },
      { reply: "Замечательная мысль!", question: "Что вам нравится в этом больше всего?" },
      { reply: "Да, это звучит очень логично.", question: "Не могли бы вы рассказать немного подробнее?" },
      { reply: "Вы говорите всё увереннее!", question: "Какой другой вариант вы бы рассмотрели?" },
      { reply: "Совершенно с вами согласен!", question: "Как вы обычно поступаете в такой ситуации?" },
      { reply: "Хорошо сформулировано!", question: "Что бы вы хотели добавить к этому?" },
      { reply: "Понятно!", question: "Какой будет наш следующий шаг?" },
    ],
    nudges: [
      "Я вас слушаю! Не спешите и поделитесь своими мыслями.",
      "Не бойтесь ошибиться — попробуйте сказать хотя бы короткую фразу!",
      "Что первым приходит вам в голову по этому поводу?",
      "Всё в порядке, я здесь. Хотите, я задам вопрос немного проще?",
    ],
    openingPrefixes: [
      "Привет! Рад попрактиковаться с вами в русском языке сегодня.",
      "Здравствуйте! Давайте начнём живой и естественный разговор.",
      "Добро пожаловать! Расслабьтесь и представьте себя в этой ситуации.",
      "Отлично, начинаем! Готовы к сегодняшнему диалогу?",
    ],
    praise: "Замечательно! Идеальное произношение! 🎉",
    praiseQuestion: "Что бы вы ещё хотели добавить?",
    grace: "Хорошая попытка! Не переживайте, в следующий раз всё получится. Продолжаем!",
    graceQuestion: "Расскажите подробнее!",
    retryTemplate: (p) => `Очень близко! Послушайте внимательно: '${p}'. Попробуйте ещё раз!`,
    correctionPromptTemplate: (p) => `Хорошая попытка! По-русски мы говорим: '${p}'. Повторите за мной, пожалуйста?`,
    wrapUp: "Наше время практики подошло к концу! Вы сегодня отлично поработали. Давайте посмотрим ваши результаты!",
    errorFallback: "Я вас понял! Что бы вы ещё хотели сказать?",
  },
  hi: {
    code: "hi",
    dialogueTurns: [
      { reply: "बहुत बढ़िया, मैं आपकी बात पूरी तरह समझ गया!", question: "आगे आप क्या करना चाहेंगे?" },
      { reply: "यह बहुत स्वाभाविक और स्पष्ट लगा!", question: "क्या आपको पहले भी ऐसा अनुभव हुआ है?" },
      { reply: "बहुत अच्छा विचार है!", question: "इसमें आपको सबसे ज़्यादा क्या पसंद आया?" },
      { reply: "बिल्कुल सही कहा आपने!", question: "क्या आप इसके बारे में थोड़ा और विस्तार से बता सकते हैं?" },
      { reply: "आपका आत्मविश्वास शानदार है!", question: "अगर आपके पास दूसरा विकल्प होता, तो आप क्या चुनते?" },
      { reply: "समझ गया, बहुत अच्छी बात है!", question: "आम तौर पर आप ऐसी स्थिति में क्या करते हैं?" },
      { reply: "वाह, बहुत बढ़िया जवाब!", question: "क्या आप इसमें कुछ और जोड़ना चाहेंगे?" },
      { reply: "अच्छा लगा सुनकर!", question: "अब आपका अगला कदम क्या होगा?" },
    ],
    nudges: [
      "मैं सुन रहा हूँ! आराम से अपने विचार साझा करें।",
      "गलती होने की चिंता न करें — छोटे से वाक्य से शुरू करें!",
      "अभी आपके मन में पहला विचार क्या आ रहा है?",
      "कोई बात नहीं, समय लीजिए। क्या मैं प्रश्न को आसान शब्दों में पूछूँ?",
    ],
    openingPrefixes: [
      "नमस्ते! आज आपके साथ हिंदी का अभ्यास करके बहुत खुशी हो रही है।",
      "आइए, आज एक बिल्कुल स्वाभाविक बातचीत शुरू करते हैं।",
      "स्वागत है! आराम से बोलें और इस स्थिति की कल्पना करें।",
      "चलिए आज के विषय पर मज़ेदार चर्चा शुरू करते हैं!",
    ],
    praise: "शानदार! बिल्कुल सही उच्चारण! 🎉",
    praiseQuestion: "आप और क्या साझा करना चाहेंगे?",
    grace: "अच्छा प्रयास! चिंता न करें, अगली बार आप इसे और बेहतर बोलेंगे। चलिए आगे बढ़ते हैं!",
    graceQuestion: "मुझे थोड़ा और बताएं!",
    retryTemplate: (p) => `बहुत करीब! ध्यान से सुनें और फिर से कोशिश करें: '${p}'`,
    correctionPromptTemplate: (p) => `अच्छा प्रयास! हिंदी में हम कहते हैं: '${p}'। क्या आप मेरे साथ दोहरा सकते हैं?`,
    wrapUp: "आज का अभ्यास समय समाप्त हो गया है! आपने बहुत अच्छा काम किया। आइए आपके परिणाम देखें!",
    errorFallback: "मैं समझ गया! आप और क्या कहना चाहेंगे?",
  },
  ta: {
    code: "ta",
    dialogueTurns: [
      { reply: "மிக நன்று, நீங்கள் சொன்னது தெளிவாகப் புரிந்தது!", question: "அடுத்து நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?" },
      { reply: "மிகவும் இயல்பாகப் பேசினீர்கள்!", question: "இதற்கு முன் இதே போன்ற அனுபவம் உங்களுக்கு இருந்ததா?" },
      { reply: "சிறப்பான கருத்து!", question: "இதில் உங்களுக்கு மிகவும் பிடித்த விஷயம் எது?" },
      { reply: "சரியாகச் சொன்னீர்கள்!", question: "இதைப்பற்றி இன்னும் கொஞ்சம் விவரமாகச் சொல்ல முடியுமா?" },
      { reply: "உங்கள் தமிழ் உச்சரிப்பு அருமையாக உள்ளது!", question: "வேறொரு வாய்ப்பு இருந்தால் நீங்கள் எதைத் தேர்ந்தெடுப்பீர்கள்?" },
      { reply: "புரிந்தது, நல்ல முடிவு!", question: "சாதாரணமாக இப்படிப்பட்ட நேரத்தில் நீங்கள் என்ன செய்வீர்கள்?" },
      { reply: "மிகவும் சுவாரசியமாக இருக்கிறது!", question: "இதைப் பற்றி வேறு ஏதாவது சொல்ல விரும்புகிறீர்களா?" },
      { reply: "நல்லது!", question: "உங்கள் அடுத்த திட்டம் என்ன?" },
    ],
    nudges: [
      "நான் கேட்டுக்கொண்டிருக்கிறேன்! தயங்காமல் உங்கள் கருத்தைச் சொல்லுங்கள்.",
      "தவறுகளைப் பற்றி கவலைப்படாதீர்கள் — ஒரு சின்ன வாக்கியத்தில் தொடங்குங்கள்!",
      "இப்போது உங்கள் மனதில் முதலில் தோன்றும் பதில் என்ன?",
      "பரவாயில்லை, மெதுவாகச் சிந்தித்துப் பேசுங்கள். நான் வேறு விதமாகக் கேட்கட்டுமா?",
    ],
    openingPrefixes: [
      "வணக்கம்! இன்று உங்களுடன் தமிழில் உரையாடுவதில் மிகவும் மகிழ்ச்சி.",
      "வாருங்கள், இன்று இயல்பான ஒரு உரையாடலைத் தொடங்குவோம்.",
      "நல்வரவு! நிதானமாகவும் நம்பிக்கையுடனும் பேசத் தொடங்குங்கள்.",
      "சரி, இன்றைய சூழலுக்கு ஏற்ப நமது பயிற்சியை ஆரம்பிக்கலாமா?",
    ],
    praise: "அருமை! மிகச் சரியான உச்சரிப்பு! 🎉",
    praiseQuestion: "வேறென்ன சொல்ல விரும்புகிறீர்கள்?",
    grace: "நல்ல முயற்சி! கவலைப்படாதீர்கள், தொடர்ந்து பேசுவோம்!",
    graceQuestion: "இன்னும் கொஞ்சம் சொல்லுங்கள்!",
    retryTemplate: (p) => `மிகவும் நெருங்கிவிட்டீர்கள்! கவனமாகக் கேட்டு மீண்டும் சொல்லுங்கள்: '${p}'`,
    correctionPromptTemplate: (p) => `நல்ல முயற்சி! தமிழில் நாம் '${p}' என்று சொல்வோம். அதைத் திரும்பச் சொல்ல முடியுமா?`,
    wrapUp: "இன்றைய பயிற்சி நேரம் முடிவடைந்தது! நீங்கள் மிகச் சிறப்பாகப் பேசினீர்கள். உங்கள் முடிவுகளைப் பார்ப்போம்!",
    errorFallback: "புரிந்தது! வேறென்ன சொல்ல விரும்புகிறீர்கள்?",
  },
  si: {
    code: "si",
    dialogueTurns: [
      { reply: "හොඳයි, මට පැහැදිලිව තේරුණා!", question: "ඊළඟට ඔබ කරන්න කැමති මොකක්ද?" },
      { reply: "ඔබේ අදහස හරිම ස්වභාවිකයි!", question: "මීට කලින් මේ වගේ අත්දැකීමක් තිබිලා තියෙනවද?" },
      { reply: "නියම අදහසක්!", question: "ඒකෙන් ඔබ වැඩියෙන්ම කැමති මොන කොටසටද?" },
      { reply: "හරිම පැහැදිලියි!", question: "මේ ගැන තව ටිකක් විස්තර කරන්න පුළුවන්ද?" },
      { reply: "ඔබ හරිම විශ්වාසයෙන් කතා කරනවා!", question: "වෙනත් විකල්පයක් තිබුණා නම් ඔබ මොකක්ද තෝරගන්නේ?" },
      { reply: "ඇත්තටම මමත් ඒකට එකඟයි!", question: "සාමාන්‍යයෙන් ඔබ මේ වගේ වෙලාවට මොකද කරන්නේ?" },
      { reply: "හරිම රසවත් කතාවක්!", question: "ඒ ගැන තව මොනවද එකතු කරන්න තියෙන්නේ?" },
      { reply: "ස්තූතියි, මට තේරුණා!", question: "ඔබේ ඊළඟ සැලැස්ම මොකක්ද?" },
    ],
    nudges: [
      "මම අහගෙන ඉන්නේ! සන්සුන්ව ඔබේ අදහස කියන්න.",
      "වැරදීම් ගැන බය වෙන්න එපා — පොඩි වාක්‍යයකින් පටන් ගමු!",
      "දැන්ම ඔබේ හිතට එන පළමු අදහස මොකක්ද?",
      "කලබල නැතුව කල්පනා කරලා කියන්න. මම ප්‍රශ්නය තව සරල කරන්නද?",
    ],
    openingPrefixes: [
      "ආයුබෝවන්! අද ඔබ එක්ක සිංහලෙන් පුහුණු වෙන්න ලැබීම සතුටක්.",
      "හෙලෝ! අපි ස්වභාවිකවම මේ සංවාදය පටන් ගමු.",
      "සාදරයෙන් පිළිගන්නවා! සැහැල්ලුවෙන් කතා කරන්න පටන් ගන්න.",
      "හරි, අද මාතෘකාව ගැන අපි උද්යෝගයෙන් කතා කරමු!",
    ],
    praise: "ඉතා විශිෂ්ටයි! නිවැරදි උච්චාරණය! 🎉",
    praiseQuestion: "ඔබට තව මොනවද කියන්න තියෙන්නේ?",
    grace: "හොඳ උත්සාහයක්! බයවෙන්න එපා, අපි දිගටම කරමු!",
    graceQuestion: "තව ටිකක් විස්තර කරන්න!",
    retryTemplate: (p) => `ඉතා ආසන්නයි! හොඳින් අහලා ආයෙත් කියලා බලන්න: '${p}'`,
    correctionPromptTemplate: (p) => `හොඳ උත්සාහයක්! සිංහලෙන් අපි කියන්නේ: '${p}'. මාත් එක්ක ආයෙත් කියන්න පුළුවන්ද?`,
    wrapUp: "අද අපේ පුහුණු කාලය අවසන්! ඔබ අද හරිම හොඳින් කතා කළා. දැන් ඔබේ ප්‍රතිඵල බලමු!",
    errorFallback: "මට තේරුණා! ඔබට තව මොනවද කියන්න තියෙන්නේ?",
  },
  nl: {
    code: "nl",
    dialogueTurns: [
      { reply: "Heel goed, dat klinkt duidelijk!", question: "Wat zou je hierna willen doen?" },
      { reply: "Dat klinkt heel natuurlijk!", question: "Heb je zoiets al eens eerder meegemaakt?" },
      { reply: "Wat een goed punt!", question: "Wat spreekt je daar het meeste in aan?" },
      { reply: "Begrepen, dat klinkt heel logisch!", question: "Kun je daar iets meer over vertellen?" },
      { reply: "Je uitspraak klinkt echt sterk!", question: "Welk alternatief zou je kiezen als dat kon?" },
      { reply: "Helemaal mee eens!", question: "Hoe pak je dit normaal gesproken aan?" },
      { reply: "Leuk om te horen!", question: "Wil je daar nog iets aan toevoegen?" },
      { reply: "Duidelijk!", question: "Wat is de volgende stap volgens jou?" },
    ],
    nudges: [
      "Ik luister! Neem gerust de tijd om je gedachten te delen.",
      "Wees niet bang om fouten te maken — begin gewoon met een korte zin!",
      "Wat is het eerste dat in je opkomt?",
      "Geen probleem, neem even de tijd. Zal ik de vraag iets anders stellen?",
    ],
    openingPrefixes: [
      "Hallo! Leuk om vandaag samen Nederlands te oefenen.",
      "Hoi! Laten we meteen beginnen met een natuurlijk gesprek.",
      "Welkom! Ontspan je en laten we dit samen doornemen.",
      "Wat fijn dat je er bent! Klaar voor dit scenario?",
    ],
    praise: "Geweldig! Perfecte uitspraak! 🎉",
    praiseQuestion: "Wat zou je nog meer willen delen?",
    grace: "Goede poging! Geen zorgen, volgende keer lukt het zeker. Laten we doorgaan!",
    graceQuestion: "Vertel me meer!",
    retryTemplate: (p) => `Bijna goed! Luister aandachtig en probeer het nog eens: '${p}'`,
    correctionPromptTemplate: (p) => `Goede poging! In het Nederlands zeggen we: '${p}'. Kun je dat herhalen?`,
    wrapUp: "Onze oefentijd zit erop! Je hebt het vandaag geweldig gedaan. Laten we je resultaten bekijken!",
    errorFallback: "Ik heb je begrepen! Wat zou je nog meer willen zeggen?",
  },
  tr: {
    code: "tr",
    dialogueTurns: [
      { reply: "Çok iyi, sizi gayet net anladım!", question: "Bundan sonra ne yapmak istersiniz?" },
      { reply: "Çok doğal ve akıcı konuşuyorsunuz!", question: "Daha önce buna benzer bir deneyiminiz oldu mu?" },
      { reply: "Harika bir bakış açısı!", question: "Bu konuda en çok hoşunuza giden şey nedir?" },
      { reply: "Kesinlikle çok mantıklı!", question: "Bana biraz daha detay verebilir misiniz?" },
      { reply: "Telaffuzunuz giderek güçleniyor!", question: "Başka bir seçeneğiniz olsaydı hangisini tercih ederdiniz?" },
      { reply: "Tamamen katılıyorum!", question: "Genellikle böyle bir durumda nasıl davranırsınız?" },
      { reply: "Çok güzel ifade ettiniz!", question: "Eklemek istediğiniz başka bir şey var mı?" },
      { reply: "Anlaşıldı!", question: "Sizce sıradaki adım ne olmalı?" },
    ],
    nudges: [
      "Sizi dinliyorum! Hazır olduğunuzda fikrinizi paylaşabilirsiniz.",
      "Hata yapmaktan çekinmeyin — kısa bir cümleyle başlayabilirsiniz!",
      "Şu an aklınıza gelen ilk şey nedir?",
      "Acele etmeyin, buradayım. Soruyu biraz daha basitleştireyim mi?",
    ],
    openingPrefixes: [
      "Merhaba! Bugün sizinle Türkçe pratik yapmak harika.",
      "Selam! Hadi hemen gerçekçi ve doğal bir sohbete başlayalım.",
      "Hoş geldiniz! Rahatlayın ve sanki oradaymışsınız gibi konuşun.",
      "Harika, başlıyoruz! Bugünkü senaryoya hazır mısınız?",
    ],
    praise: "Harika! Mükemmel telaffuz! 🎉",
    praiseQuestion: "Başka ne paylaşmak istersiniz?",
    grace: "Güzel deneme! Merak etmeyin, bir dahaki sefere başaracaksınız. Devam edelim!",
    graceQuestion: "Bana biraz daha anlatın!",
    retryTemplate: (p) => `Çok yaklaştınız! Dikkatlice dinleyin ve tekrar deneyin: '${p}'`,
    correctionPromptTemplate: (p) => `Güzel deneme! Türkçede şöyle deriz: '${p}'. Benimle tekrar edebilir misin?`,
    wrapUp: "Bugünkü pratik süremiz doldu! Harika bir iş çıkardınız. Sonuçlarınıza bakalım!",
    errorFallback: "Anladım! Başka ne söylemek istersiniz?",
  },
  vi: {
    code: "vi",
    dialogueTurns: [
      { reply: "Rất tốt, tôi đã hiểu ý bạn!", question: "Bạn muốn làm gì tiếp theo?" },
      { reply: "Rất tự nhiên và trôi chảy!", question: "Trước đây bạn đã từng gặp tình huống này chưa?" },
      { reply: "Ý kiến hay lắm!", question: "Bạn thích điểm nào nhất trong lựa chọn đó?" },
      { reply: "Hoàn toàn hợp lý!", question: "Bạn có thể chia sẻ thêm một chút chi tiết không?" },
      { reply: "Phát âm của bạn rất rõ ràng!", question: "Nếu có lựa chọn khác, bạn sẽ chọn gì?" },
      { reply: "Tôi hoàn toàn đồng ý!", question: "Thông thường bạn sẽ xử lý việc này thế nào?" },
      { reply: "Tuyệt vời!", question: "Bạn có muốn nói thêm điều gì nữa không?" },
      { reply: "Rõ rồi nhé!", question: "Bước tiếp theo của bạn là gì?" },
    ],
    nudges: [
      "Tôi đang lắng nghe đây! Bạn hãy cứ thoải mái chia sẻ nhé.",
      "Đừng ngại mắc lỗi — cứ bắt đầu bằng một câu thật ngắn gọn thôi!",
      "Điều đầu tiên bạn nghĩ đến lúc này là gì?",
      "Không sao đâu, cứ từ từ nhé. Bạn muốn tôi hỏi lại đơn giản hơn không?",
    ],
    openingPrefixes: [
      "Xin chào! Hôm nay rất vui được luyện tiếng Việt cùng bạn.",
      "Chào bạn! Hãy cùng bắt đầu một cuộc trò chuyện thật tự nhiên nhé.",
      "Chào mừng bạn! Hãy thư giãn và trò chuyện thoải mái nào.",
      "Tuyệt lắm, chúng ta bắt đầu tình huống thực tế hôm nay nhé!",
    ],
    praise: "Tuyệt vời! Phát âm hoàn hảo! 🎉",
    praiseQuestion: "Bạn còn muốn chia sẻ thêm điều gì không?",
    grace: "Cố gắng rất tốt! Đừng lo lắng, lần sau bạn sẽ làm tốt hơn. Hãy tiếp tục nhé!",
    graceQuestion: "Hãy kể cho tôi nghe thêm đi!",
    retryTemplate: (p) => `Gần đúng rồi! Hãy nghe kỹ và thử lại lần nữa nhé: '${p}'`,
    correctionPromptTemplate: (p) => `Cố gắng rất tốt! Trong tiếng Việt chúng ta nói: '${p}'. Bạn có thể nhắc lại cùng tôi không?`,
    wrapUp: "Thời gian luyện tập hôm nay đã kết thúc! Bạn đã làm rất tốt. Hãy xem kết quả của bạn nhé!",
    errorFallback: "Tôi đã hiểu! Bạn còn muốn nói thêm điều gì không?",
  },
  id: {
    code: "id",
    dialogueTurns: [
      { reply: "Bagus sekali, saya paham dengan jelas!", question: "Apa yang ingin Anda lakukan selanjutnya?" },
      { reply: "Terdengar sangat natural!", question: "Apakah Anda pernah mengalami hal serupa sebelumnya?" },
      { reply: "Ide yang sangat bagus!", question: "Bagian mana yang paling Anda sukai dari itu?" },
      { reply: "Masuk akal sekali!", question: "Bisakah Anda ceritakan sedikit lebih banyak?" },
      { reply: "Pelafalan Anda terdengar mantap!", question: "Kalau ada pilihan lain, mana yang akan Anda pilih?" },
      { reply: "Saya sangat setuju!", question: "Bagaimana biasanya Anda menghadapi situasi seperti ini?" },
      { reply: "Keren sekali!", question: "Ada hal lain yang ingin Anda tambahkan?" },
      { reply: "Dipahami dengan baik!", question: "Apa rencana Anda setelah ini?" },
    ],
    nudges: [
      "Saya mendengarkan! Silakan santai dan sampaikan pendapat Anda.",
      "Jangan takut salah — coba mulai dengan kalimat pendek saja!",
      "Apa hal pertama yang terpikir oleh Anda sekarang?",
      "Tidak apa-apa, pelan-pelan saja. Mau saya ulangi dengan lebih sederhana?",
    ],
    openingPrefixes: [
      "Halo! Senang sekali bisa berlatih bahasa Indonesia bersama Anda hari ini.",
      "Hai! Mari kita mulai percakapan yang santai dan natural.",
      "Selamat datang! Tarik napas dan mari mengobrol seperti biasa.",
      "Bagus, mari kita mulai skenario seru hari ini!",
    ],
    praise: "Luar biasa! Pelafalan yang sempurna! 🎉",
    praiseQuestion: "Apa lagi yang ingin Anda bagikan?",
    grace: "Usaha yang bagus! Jangan khawatir, Anda akan menguasainya lain kali. Mari lanjutkan!",
    graceQuestion: "Ceritakan lebih banyak lagi!",
    retryTemplate: (p) => `Hampir tepat! Dengarkan baik-baik dan coba lagi: '${p}'`,
    correctionPromptTemplate: (p) => `Usaha yang bagus! Dalam bahasa Indonesia kita bilang: '${p}'. Bisa ulangi bersama saya?`,
    wrapUp: "Waktu latihan kita hari ini sudah selesai! Anda melakukan pekerjaan yang luar biasa. Mari lihat hasilnya!",
    errorFallback: "Saya mengerti! Apa lagi yang ingin Anda katakan?",
  },
  th: {
    code: "th",
    dialogueTurns: [
      { reply: "ดีมากเลยครับ เข้าใจชัดเจนเลย!", question: "ต่อไปอยากจะทำอะไรต่อดีครับ?" },
      { reply: "เป็นธรรมชาติมากครับ!", question: "คุณเคยเจอสถานการณ์แบบนี้มาก่อนไหมครับ?" },
      { reply: "เป็นความคิดที่ดีมากครับ!", question: "คุณชอบส่วนไหนของเรื่องนี้มากที่สุดครับ?" },
      { reply: "ฟังดูสมเหตุสมผลมากเลยครับ!", question: "เล่าเพิ่มเติมให้ฟังอีกนิดได้ไหมครับ?" },
      { reply: "ออกเสียงได้ชัดเจนมากครับ!", question: "ถ้าเลือกอย่างอื่นได้ คุณจะเลือกอะไรครับ?" },
      { reply: "เห็นด้วยเลยครับ!", question: "ปกติแล้วคุณจัดการเรื่องแบบนี้ยังไงครับ?" },
      { reply: "ยอดเยี่ยมมากครับ!", question: "มีอะไรอยากพูดเพิ่มเติมอีกไหมครับ?" },
      { reply: "เข้าใจแล้วครับ!", question: "คุณคิดอย่างไรเกี่ยวกับเรื่องนี้ครับ?" },
    ],
    nudges: [
      "ผมกำลังฟังอยู่นะครับ! สบายๆ แล้วแชร์ความคิดเห็นได้เลยครับ",
      "ไม่ต้องกลัวผิดนะครับ ลองเริ่มจากประโยคสั้นๆ ดูก่อนก็ได้!",
      "สิ่งแรกที่คุณนึกถึงตอนนี้คืออะไรครับ?",
      "ไม่เป็นไรครับ ค่อยๆ คิดนะ อยากให้ผมถามให้ง่ายขึ้นไหมครับ?",
    ],
    openingPrefixes: [
      "สวัสดีครับ! ยินดีมากที่ได้ฝึกภาษาไทยด้วยกันวันนี้",
      "สวัสดีครับ! เรามาเริ่มคุยกันแบบเป็นธรรมชาติเลยนะครับ",
      "ยินดีต้อนรับครับ! ผ่อนคลายแล้วลองคุยเหมือนอยู่ในสถานการณ์จริงเลยนะ",
      "พร้อมแล้วนะครับ มาเริ่มบทสนทนาวันนี้กันเลย!",
    ],
    praise: "ยอดเยี่ยมมาก! ออกเสียงได้สมบูรณ์แบบเลยครับ! 🎉",
    praiseQuestion: "มีอะไรอยากเล่าเพิ่มเติมอีกไหมครับ?",
    grace: "พยายามได้ดีมากครับ! ไม่ต้องกังวล คราวหน้าจะเก่งขึ้นแน่นอน มาคุยกันต่อครับ!",
    graceQuestion: "เล่าให้ฟังอีกหน่อยสิครับ!",
    retryTemplate: (p) => `ใกล้เคียงมากแล้วครับ! ตั้งใจฟังแล้วลองพูดอีกครั้งนะครับ: '${p}'`,
    correctionPromptTemplate: (p) => `พยายามได้ดีมาก! ในภาษาไทยเราพูดว่า: '${p}'. ลองพูดตามอีกครั้งได้ไหม?`,
    wrapUp: "หมดเวลาฝึกพูดสำหรับวันนี้แล้วครับ! วันนี้คุณทำได้ดีมาก มาดูผลคะแนนกันเลย!",
    errorFallback: "เข้าใจแล้วครับ! มีอะไรอยากพูดเพิ่มเติมอีกไหมครับ?",
  },
  sv: {
    code: "sv",
    dialogueTurns: [
      { reply: "Jättebra, jag förstod precis vad du menade!", question: "Vad vill du göra härnäst?" },
      { reply: "Väldigt naturligt uttryckt!", question: "Har du varit med om något liknande tidigare?" },
      { reply: "Vilken bra tanke!", question: "Vad tycker du bäst om med det?" },
      { reply: "Det låter helt rimligt!", question: "Kan du berätta lite mer om det?" },
      { reply: "Ditt uttal låter riktigt bra!", question: "Vad skulle du välja som alternativ?" },
      { reply: "Jag håller helt med dig!", question: "Hur brukar du göra i en sådan situation?" },
      { reply: "Härligt att höra!", question: "Finns det något mer du vill lägga till?" },
      { reply: "Uppfattat!", question: "Vad tycker du är nästa steg?" },
    ],
    nudges: [
      "Jag lyssnar! Ta god tid på dig och berätta vad du tycker.",
      "Var inte rädd för att göra fel — börja bara med en kort mening!",
      "Vad är det första du kommer att tänka på just nu?",
      "Ingen fara, ta en sekund. Vill du att jag ställer frågan lite enklare?",
    ],
    openingPrefixes: [
      "Hej! Vad kul att öva svenska tillsammans idag.",
      "Hejsan! Låt oss börja ett naturligt och avslappnat samtal.",
      "Välkommen! Slappna av och låtsas att vi pratar på riktigt.",
      "Toppen, nu kör vi igång med dagens scenario!",
    ],
    praise: "Fantastiskt! Perfekt uttal! 🎉",
    praiseQuestion: "Vad mer skulle du vilja dela med dig av?",
    grace: "Bra försök! Oroa dig inte, du kommer att klara det nästa gång. Vi fortsätter!",
    graceQuestion: "Berätta mer!",
    retryTemplate: (p) => `Mycket nära! Lyssna noga och försök en gång till: '${p}'`,
    correctionPromptTemplate: (p) => `Bra försök! På svenska säger vi: '${p}'. Kan du upprepa det med mig?`,
    wrapUp: "Vår övningstid är slut för idag! Du gjorde ett fantastiskt jobb. Låt oss se dina resultat!",
    errorFallback: "Jag förstår! Vad mer skulle du vilja säga?",
  },
  en: {
    code: "en",
    dialogueTurns: [
      { reply: "That makes total sense!", question: "How do you usually handle that in real life?" },
      { reply: "I love the way you phrased that!", question: "What first got you interested in this?" },
      { reply: "You explained that so clearly!", question: "If you had another option, which one would you pick?" },
      { reply: "Great point — I completely agree with you!", question: "Could you give me a quick real-life example?" },
      { reply: "That sounds really interesting!", question: "What has been the biggest challenge with it so far?" },
      { reply: "Awesome, your tone sounded super confident!", question: "What do you enjoy most about this experience?" },
      { reply: "Good thinking!", question: "How would a friend or colleague usually respond to that?" },
      { reply: "Nice! That flows very naturally.", question: "What would your next step be from here?" },
    ],
    nudges: [
      "I'm listening! Take your time and share whatever comes to mind first.",
      "No pressure at all — even a short answer is great practice! Give it a quick try.",
      "Take a breath, you're doing great! Would you like to start with 'Well, I think...'?",
      "Still with me? Let's keep it simple: do you like this option or prefer something else?",
    ],
    openingPrefixes: [
      "Hey there! So great to practice speaking with you today.",
      "Welcome back! Let's jump right into a natural conversation.",
      "Hi! Relax and imagine we are right there in person.",
      "Awesome to hear from you! Let's kick off this scenario together.",
    ],
    praise: "Awesome! Perfect pronunciation! 🎉",
    praiseQuestion: "What else would you like to share?",
    grace: "Good effort! Don't worry, you'll master it next time. Let's keep going!",
    graceQuestion: "Tell me more!",
    retryTemplate: (p) => `Very close! Listen carefully: '${p}'. Try once more!`,
    correctionPromptTemplate: (p) => `Good effort! In English, we say: '${p}'. Can you repeat that for me?`,
    wrapUp: "Our practice time for this call has concluded! You did an amazing job today. Let's see your results!",
    errorFallback: "I understood! What else would you like to say?",
  },
};

export function resolveLanguageBundle(language: string): NativeLanguageBundle {
  const l = (language || "en").toLowerCase().trim();
  if (l.includes("jap") || l === "ja" || l.startsWith("ja-") || l.startsWith("ja_")) return BUNDLES.ja;
  if (l.includes("kor") || l === "ko" || l.startsWith("ko-") || l.startsWith("ko_")) return BUNDLES.ko;
  if (l.includes("chin") || l.includes("mandarin") || l === "zh" || l.startsWith("zh-") || l.startsWith("zh_")) return BUNDLES.zh;
  if (l.includes("arab") || l === "ar" || l.startsWith("ar-") || l.startsWith("ar_")) return BUNDLES.ar;
  if (l.includes("span") || l.includes("espa") || l === "es" || l.startsWith("es-") || l.startsWith("es_")) return BUNDLES.es;
  if (l.includes("french") || l.includes("fran") || l === "fr" || l.startsWith("fr-")) return BUNDLES.fr;
  if (l.includes("germ") || l.includes("deutsch") || l === "de" || l.startsWith("de-") || l.startsWith("de_")) return BUNDLES.de;
  if (l.includes("ital") || l === "it" || l.startsWith("it-") || l.startsWith("it_")) return BUNDLES.it;
  if (l.includes("portug") || l === "pt" || l.startsWith("pt-") || l.startsWith("pt_")) return BUNDLES.pt;
  if (l.includes("russ") || l === "ru" || l.startsWith("ru-") || l.startsWith("ru_")) return BUNDLES.ru;
  if (l.includes("hind") || l === "hi" || l.startsWith("hi-") || l.startsWith("hi_")) return BUNDLES.hi;
  if (l.includes("tamil") || l === "ta" || l.startsWith("ta-") || l.startsWith("ta_")) return BUNDLES.ta;
  if (l.includes("sinha") || l === "si" || l.startsWith("si-") || l.startsWith("si_")) return BUNDLES.si;
  if (l.includes("dutch") || l.includes("nederland") || l === "nl" || l.startsWith("nl-") || l.startsWith("nl_")) return BUNDLES.nl;
  if (l.includes("turk") || l === "tr" || l.startsWith("tr-") || l.startsWith("tr_")) return BUNDLES.tr;
  if (l.includes("viet") || l === "vi" || l.startsWith("vi-") || l.startsWith("vi_")) return BUNDLES.vi;
  if (l.includes("indones") || l === "id" || l.startsWith("id-") || l.startsWith("id_")) return BUNDLES.id;
  if (l.includes("thai") || l === "th" || l.startsWith("th-") || l.startsWith("th_")) return BUNDLES.th;
  if (l.includes("swed") || l.includes("svensk") || l === "sv" || l === "se" || l.startsWith("sv-")) return BUNDLES.sv;
  return BUNDLES.en;
}

/**
 * Picks a randomized opening prompt from starterPrompt + starterQuestions + localized greeting variation
 * so starting from the same category/topic NEVER repeats the exact same opening question!
 */
export function buildVariedOpeningQuestion(
  language: string,
  starterPrompt: string,
  starterQuestions: string[] = [],
  lastUsedOpening = ""
): string {
  const bundle = resolveLanguageBundle(language);
  const candidates: string[] = [];
  const cleanStarter = (starterPrompt || "").trim();
  if (cleanStarter) candidates.push(cleanStarter);

  for (const q of starterQuestions) {
    const clean = (q || "").trim();
    if (clean && !candidates.includes(clean)) {
      const prefix = bundle.openingPrefixes[Math.floor(Math.random() * bundle.openingPrefixes.length)];
      candidates.push(`${prefix} ${clean}`);
    }
  }

  // Also add fresh dialogue turn questions combined with greeting prefixes so even single-prompt topics vary every call!
  for (let i = 0; i < Math.min(3, bundle.dialogueTurns.length); i++) {
    const turn = bundle.dialogueTurns[i];
    const prefix = bundle.openingPrefixes[(i + Math.floor(Math.random() * bundle.openingPrefixes.length)) % bundle.openingPrefixes.length];
    candidates.push(`${prefix} ${turn.question}`);
  }

  const fresh = candidates.filter((c) => c !== lastUsedOpening);
  const pool = fresh.length > 0 ? fresh : candidates;
  return pool[Math.floor(Math.random() * pool.length)] || cleanStarter || bundle.dialogueTurns[0].question;
}

/**
 * Comprehensive On-Device Grammar & Politeness Detector across Languages
 * Catches real everyday student errors even in 100% Offline Mode!
 */
export function detectOfflineGrammarMistake(spokenText: string, language: string): GrammarRuleMatch {
  const bundle = resolveLanguageBundle(language);
  const lower = spokenText.toLowerCase().trim();

  if (bundle.code === "en") {
    const enRules: Array<{ test: RegExp; original: string; correction: string; explanation: string }> = [
      { test: /\bi am agree\b/, original: "I am agree", correction: "I agree", explanation: "'Agree' is a verb, so never use 'am' before it." },
      { test: /\b(he|she|it)\s+don'?t\b/, original: "he/she don't", correction: "he/she doesn't", explanation: "Use 'doesn't' with singular third-person subjects (he, she, it)." },
      { test: /\b(he|she|it)\s+have\b/, original: "he/she have", correction: "he/she has", explanation: "Use 'has' instead of 'have' with he, she, or it." },
      { test: /\bdidn'?t\s+(went|came|saw|ate|did|bought|got)\b/, original: "didn't + past verb", correction: "didn't go / come / see", explanation: "After 'didn't', always use the base verb form (e.g., 'didn't go')." },
      { test: /\bmore\s+(better|faster|easier|cheaper|bigger)\b/, original: "more better", correction: "much better", explanation: "Avoid double comparatives; say 'much better' instead of 'more better'." },
      { test: /\byesterday\s+i\s+go\b|\bi\s+go\b.*\byesterday\b/, original: "go ... yesterday", correction: "went yesterday", explanation: "Use the past tense verb 'went' when talking about yesterday." },
      { test: /\bi\s+am\s+(live|work|like|want|know)\b/, original: "I am + base verb", correction: "I live / work / like", explanation: "For habits and states, use simple present 'I live' rather than 'I am live'." },
      { test: /\bwant\s+(order|eat|go|buy|ask|speak)\b/, original: "want + verb", correction: "want to order / go", explanation: "Always place 'to' between 'want' and another verb." },
      { test: /\bdiscuss\s+about\b/, original: "discuss about", correction: "discuss", explanation: "'Discuss' already includes 'about', so say 'discuss the topic'." },
      { test: /\bsince\s+\d+\s+(years|months|days|hours)\b/, original: "since X years", correction: "for X years", explanation: "Use 'for' for durations of time, and 'since' for a specific starting point." },
      { test: /\bmarried\s+with\b/, original: "married with", correction: "married to", explanation: "In English, we say 'married to someone', not 'married with'." },
      { test: /\blisten\s+music\b/, original: "listen music", correction: "listen to music", explanation: "The verb 'listen' requires the preposition 'to' before an object." },
      { test: /\bdepend\s+of\b/, original: "depend of", correction: "depend on", explanation: "Always use 'depend on', never 'depend of'." },
      { test: /\bexplain\s+me\b/, original: "explain me", correction: "explain to me", explanation: "Say 'explain to me' instead of 'explain me'." },
      { test: /\binformations\b|\badvices\b|\bfurnitures\b/, original: "informations / advices", correction: "information / advice", explanation: "These are uncountable nouns in English and do not take a plural 's'." },
      { test: /\bmuch\s+peoples?\b|\bmany\s+persons\b/, original: "much people / many persons", correction: "many people", explanation: "'People' is plural and pairs with 'many', not 'much'." },
      { test: /\bme\s+want\b/, original: "me want", correction: "I would like", explanation: "Use subject pronoun 'I' (not 'me') as the subject of a sentence." },
    ];
    for (const r of enRules) {
      if (r.test.test(lower)) {
        return { hasCorrection: true, original: r.original, correction: r.correction, explanation: r.explanation, targetPhrase: r.correction };
      }
    }
  } else if (bundle.code === "fr") {
    const frRules: Array<{ test: RegExp; original: string; correction: string; explanation: string }> = [
      { test: /\bje\s+veux\s+(un|une|du|de|le|la)\b/, original: "je veux ...", correction: "je voudrais ...", explanation: "En français poli, on dit 'Je voudrais...' plutôt que 'Je veux...' pour commander." },
      { test: /\bje\s+suis\s+\d+\s+ans?\b/, original: "je suis ... ans", correction: "j'ai ... ans", explanation: "En français, on utilise le verbe 'avoir' pour l'âge (j'ai 20 ans)." },
      { test: /\bje\s+suis\s+(faim|soif|chaud|froid)\b/, original: "je suis faim/soif", correction: "j'ai faim / j'ai soif", explanation: "On utilise 'avoir' : j'ai faim, j'ai soif, j'ai chaud." },
      { test: /\bbeaucoup\s+des\b/, original: "beaucoup des", correction: "beaucoup de", explanation: "Après 'beaucoup', on utilise toujours 'de' sans article (beaucoup de)." },
      { test: /\bje\s+visité\b|\bj'ai\s+aller\b/, original: "passé composé", correction: "j'ai visité / je suis allé", explanation: "Attention à l'auxiliaire du passé composé : j'ai visité, je suis allé." },
    ];
    for (const r of frRules) {
      if (r.test.test(lower)) {
        return { hasCorrection: true, original: r.original, correction: r.correction, explanation: r.explanation, targetPhrase: r.correction };
      }
    }
  } else if (bundle.code === "es") {
    const esRules: Array<{ test: RegExp; original: string; correction: string; explanation: string }> = [
      { test: /\b(yo\s+)?soy\s+\d+\s+años?\b/, original: "soy ... años", correction: "tengo ... años", explanation: "En español se usa el verbo 'tener' para la edad (tengo 20 años)." },
      { test: /\b(yo\s+)?gusto\b|\bme\s+gusto\b/, original: "me gusto", correction: "me gusta", explanation: "Con el verbo gustar se dice 'me gusta' para cosas en singular." },
      { test: /\bla\s+problema\b|\bla\s+día\b/, original: "la problema / la día", correction: "el problema / el día", explanation: "'Problema' y 'día' son sustantivos masculinos (el problema, el día)." },
      { test: /\bbuenos\s+noches\b/, original: "buenos noches", correction: "buenas noches", explanation: "'Noche' es femenino, así que se dice 'buenas noches'." },
    ];
    for (const r of esRules) {
      if (r.test.test(lower)) {
        return { hasCorrection: true, original: r.original, correction: r.correction, explanation: r.explanation, targetPhrase: r.correction };
      }
    }
  } else if (bundle.code === "de") {
    if (/\bich\s+habe\s+\d+\s+jahre\b/.test(lower)) {
      return { hasCorrection: true, original: "ich habe ... Jahre", correction: "ich bin ... Jahre alt", explanation: "Auf Deutsch benutzt man 'sein' für das Alter: Ich bin 20 Jahre alt.", targetPhrase: "ich bin 20 Jahre alt" };
    }
    if (/\bich\s+will\s+bestellen\b|\bich\s+will\s+ein\b/.test(lower)) {
      return { hasCorrection: true, original: "ich will ...", correction: "ich hätte gerne ...", explanation: "Höflicher sagt man im Café/Restaurant: 'Ich hätte gerne...'", targetPhrase: "Ich hätte gerne einen Kaffee" };
    }
  } else if (bundle.code === "it") {
    if (/\bsono\s+\d+\s+anni\b/.test(lower)) {
      return { hasCorrection: true, original: "sono ... anni", correction: "ho ... anni", explanation: "In italiano si usa il verbo 'avere' per l'età (ho 20 anni).", targetPhrase: "ho venti anni" };
    }
    if (/\bvoglio\s+un\b/.test(lower)) {
      return { hasCorrection: true, original: "voglio un", correction: "vorrei un", explanation: "Per ordinare con gentilezza è meglio dire 'Vorrei...'.", targetPhrase: "Vorrei un caffè, per favore" };
    }
  } else if (bundle.code === "ja") {
    if ((lower.includes("tabeta") || lower.includes("食べた")) && !lower.includes("mashita") && !lower.includes("ました")) {
      return { hasCorrection: true, original: "食べた", correction: "食べました", explanation: "丁寧な会話では「食べた」より「食べました」が自然です。", targetPhrase: "食べました" };
    }
    if (lower.includes("ますでした")) {
      return { hasCorrection: true, original: "〜ますでした", correction: "〜ました", explanation: "丁寧な過去形は「〜ますでした」ではなく「〜ました」を使います。", targetPhrase: "行きました" };
    }
  } else if (bundle.code === "ko") {
    if ((lower.includes("bogo") || lower.includes("보고 싶어")) && !lower.includes("요")) {
      return { hasCorrection: true, original: "보고 싶어", correction: "보고 싶어요", explanation: "존댓말 표현으로 '-요'를 붙여서 '보고 싶어요'가 더 자연스럽습니다.", targetPhrase: "보고 싶어요" };
    }
  }

  return { hasCorrection: false, original: "", correction: "", explanation: "", targetPhrase: "" };
}
