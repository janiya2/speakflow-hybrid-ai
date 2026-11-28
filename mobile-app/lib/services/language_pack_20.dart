/// Unified 20-Language Native Pack for SpeakFlow AI Mobile App
/// Guarantees zero English leakage across all 20 supported languages in
/// offline resilience mode, pronunciation drills, wrap-up prompts, and test utterances.

class NativeLanguageBundle {
  final String code;
  final List<String> offlineReplies;
  final String defaultFollowUpQuestion;
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
    required this.offlineReplies,
    required this.defaultFollowUpQuestion,
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
}

class LanguagePack20 {
  static final Map<String, NativeLanguageBundle> _bundles = {
    'ja': NativeLanguageBundle(
      code: 'ja',
      offlineReplies: [
        'なるほど、とても興味深いですね！もう少し詳しく教えていただけますか？',
        'よく伝わりました！自然な日本語ですね。次は具体的にどうしますか？',
      ],
      defaultFollowUpQuestion: 'それについてどう思いますか？',
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
      offlineReplies: [
        '정말 흥미로운 이야기네요! 조금 더 자세히 말씀해 주시겠어요?',
        '자연스럽게 잘 말씀하셨어요! 다음으로는 무엇을 원하시나요?',
      ],
      defaultFollowUpQuestion: '그 점에 대해 어떻게 생각하세요?',
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
      offlineReplies: [
        '我完全明白了！您可以再多介绍一下具体细节吗？',
        '说得非常地道自然！接下来您打算怎么做呢？',
      ],
      defaultFollowUpQuestion: '您对此有什么看法？',
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
      offlineReplies: [
        'ممتاز، فهمت قصدك تماماً! هل يمكنك إخباري بالمزيد عن ذلك؟',
        'تعبير رائع وطبيعي جداً! ماذا تفضل أن تفعل بعد ذلك؟',
      ],
      defaultFollowUpQuestion: 'ما رأيك في ذلك؟',
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
      offlineReplies: [
        '¡Qué interesante! ¿Podrías contarme un poco más sobre eso?',
        '¡Excelente! Suena muy natural. ¿Qué te gustaría hacer a continuación?',
      ],
      defaultFollowUpQuestion: '¿Qué opinas sobre eso?',
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
      offlineReplies: [
        "C'est un plaisir de vous écouter ! Pourriez-vous m'en dire un peu plus à ce sujet ?",
        'Très bien, c’est noté avec plaisir ! Que souhaitez-vous faire ensuite ?',
      ],
      defaultFollowUpQuestion: "Qu'en pensez-vous ?",
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
      offlineReplies: [
        'Das klingt wirklich spannend! Könnten Sie mir ein bisschen mehr darüber erzählen?',
        'Sehr gut, das habe ich genau verstanden! Was möchten Sie als Nächstes tun?',
      ],
      defaultFollowUpQuestion: 'Was denken Sie darüber?',
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
      offlineReplies: [
        'Benissimo, ho capito perfettamente! Potresti raccontarmi qualcosa in più a riguardo?',
        'Molto naturale e chiaro! Cosa ti piacerebbe fare adesso?',
      ],
      defaultFollowUpQuestion: 'Cosa ne pensi?',
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
      offlineReplies: [
        'Muito bem, entendi perfeitamente! Você poderia me contar um pouco mais sobre isso?',
        'Soa muito natural! O que você gostaria de fazer em seguida?',
      ],
      defaultFollowUpQuestion: 'O que você acha disso?',
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
      offlineReplies: [
        'Отлично, я вас прекрасно понял! Не могли бы вы рассказать об этом немного подробнее?',
        'Звучит очень естественно! Что бы вы хотели сделать дальше?',
      ],
      defaultFollowUpQuestion: 'Что вы об этом думаете?',
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
      offlineReplies: [
        'बहुत बढ़िया, मैं आपकी बात पूरी तरह समझ गया! क्या आप इस बारे में थोड़ा और बता सकते हैं?',
        'यह बहुत स्वाभाविक लगा! आगे आप क्या करना चाहेंगे?',
      ],
      defaultFollowUpQuestion: 'इस बारे में आपका क्या विचार है?',
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
      offlineReplies: [
        'மிக நன்று, நீங்கள் சொன்னது தெளிவாகப் புரிந்தது! இதைப்பற்றி இன்னும் கொஞ்சம் சொல்ல முடியுமா?',
        'மிகவும் இயல்பாகப் பேசினீர்கள்! அடுத்து நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
      ],
      defaultFollowUpQuestion: 'இதைப் பற்றி நீங்கள் என்ன நினைக்கிறீர்கள்?',
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
      offlineReplies: [
        'හොඳයි, මට පැහැදිලිව තේරුණා! මේ ගැන තව ටිකක් විස්තර කරන්න පුළුවන්ද?',
        'ස්තූතියි! ඔබේ අදහස හරිම ස්වභාවිකයි. ඊළඟට මොකක්ද ඔබ කරන්න කැමති?',
      ],
      defaultFollowUpQuestion: 'ඒ ගැන ඔබ මොකද හිතන්නේ?',
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
      offlineReplies: [
        'Heel goed, dat klinkt duidelijk! Vertel me daar gerust iets meer over.',
        'Begrepen! Wat zou je hierna willen doen?',
      ],
      defaultFollowUpQuestion: 'Wat vind je daarvan?',
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
      offlineReplies: [
        'Çok iyi, sizi gayet net anladım! Bu konuda biraz daha detay verebilir misiniz?',
        'Harika ve çok doğal! Bundan sonra ne yapmak istersiniz?',
      ],
      defaultFollowUpQuestion: 'Bu konuda ne düşünüyorsunuz?',
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
      offlineReplies: [
        'Rất tốt, tôi đã hiểu ý bạn! Bạn có thể chia sẻ thêm một chút về điều đó không?',
        'Rất tự nhiên và rõ ràng! Bạn muốn làm gì tiếp theo?',
      ],
      defaultFollowUpQuestion: 'Bạn nghĩ sao về điều đó?',
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
      offlineReplies: [
        'Bagus sekali, saya paham dengan jelas! Bisakah Anda ceritakan sedikit lebih banyak?',
        'Sangat natural! Apa yang ingin Anda lakukan selanjutnya?',
      ],
      defaultFollowUpQuestion: 'Bagaimana pendapat Anda tentang hal itu?',
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
      offlineReplies: [
        'ดีมากเลยครับ เข้าใจชัดเจนเลย! เล่าเพิ่มเติมให้ฟังอีกนิดได้ไหมครับ?',
        'เป็นธรรมชาติมากครับ! ต่อไปอยากจะทำอะไรต่อดีครับ?',
      ],
      defaultFollowUpQuestion: 'คุณคิดอย่างไรเกี่ยวกับเรื่องนี้ครับ?',
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
      offlineReplies: [
        'Jättebra, jag förstod precis vad du menade! Berätta gärna lite mer om det.',
        'Väldigt naturligt! Vad vill du göra härnäst?',
      ],
      defaultFollowUpQuestion: 'Vad tycker du om det?',
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
      offlineReplies: [
        'That is really insightful! Could you tell me a little more about how you got started with that?',
        'I completely understand! What else would you like to share about that?',
      ],
      defaultFollowUpQuestion: 'What else do you think about that?',
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
}
