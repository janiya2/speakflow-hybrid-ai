/**
 * Unified 20-Language Native Pack for SpeakFlow AI Web App
 * Zero English leakage across all 20 supported languages in offline / drill / nudge / fallback flows.
 */

export interface NativeLanguageBundle {
  code: string;
  offlineReplies: string[];
  defaultFollowUpQuestion: string;
  nudge: string;
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
    offlineReplies: [
      "なるほど！よく伝わりました。次は具体的にどうしますか？",
      "分かりました！自然な日本語ですね。もう少し詳しく教えていただけますか？",
      "ありがとうございます。では、次のご希望は何ですか？",
    ],
    defaultFollowUpQuestion: "それについてどう思いますか？",
    nudge: "聞いていますよ！どう思いますか？",
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
    offlineReplies: [
      "잘 이해했어요! 이어서 조금만 더 자세히 말씀해 주시겠어요?",
      "자연스럽게 잘 말씀하셨어요. 다음으로는 무엇을 원하시나요?",
      "네, 알겠습니다! 그 다음 상황은 어떻게 진행할까요?",
    ],
    defaultFollowUpQuestion: "그 점에 대해 어떻게 생각하세요?",
    nudge: "듣고 있어요! 어떻게 생각하세요?",
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
    offlineReplies: [
      "我完全明白了！接下来您打算怎么做呢？",
      "说得非常地道自然！可以再多分享一些细节吗？",
      "好的，明白！关于这个情况，您还有什么想法？",
    ],
    defaultFollowUpQuestion: "您对此有什么看法？",
    nudge: "我在听呢！请随时分享您的想法。",
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
    offlineReplies: [
      "ممتاز، فهمت قصدك تماماً! كيف تود أن نتابع الحديث؟",
      "تعبير رائع وطبيعي جداً! هل يمكنك إخباري بالمزيد عن ذلك؟",
      "حسناً، هذا واضح جداً. ماذا تفضل أن تفعل بعد ذلك؟",
    ],
    defaultFollowUpQuestion: "ما رأيك في ذلك؟",
    nudge: "أنا أستمع إليك! خذ وقتك وشاركني أفكارك.",
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
    offlineReplies: [
      "¡Muy bien! Te he entendido perfectamente. ¿Qué te gustaría hacer a continuación?",
      "¡Excelente! Suena muy natural. ¿Podrías contarme un poco más sobre eso?",
      "Entendido perfectamente. ¿Cómo te gustaría continuar esta situación?",
    ],
    defaultFollowUpQuestion: "¿Qué opinas sobre eso?",
    nudge: "¡Te estoy escuchando! ¿Qué opinas?",
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
    offlineReplies: [
      "Très bien, j'ai parfaitement compris ! Pourriez-vous m'en dire un peu plus à ce sujet ?",
      "C'est très clair et naturel ! Que souhaitez-vous faire ensuite ?",
      "Parfait, c'est noté avec plaisir ! Comment se passe votre expérience jusqu'ici ?",
    ],
    defaultFollowUpQuestion: "Qu'en pensez-vous ?",
    nudge: "Je vous écoute ! Prenez votre temps et partagez votre avis.",
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
    offlineReplies: [
      "Sehr gut, das habe ich genau verstanden! Könnten Sie mir noch etwas mehr dazu erzählen?",
      "Das klingt sehr natürlich! Was möchten Sie als Nächstes tun?",
      "Verstanden! Wie sollen wir im Gespräch weitermachen?",
    ],
    defaultFollowUpQuestion: "Was denken Sie darüber?",
    nudge: "Ich höre Ihnen zu! Lassen Sie sich ruhig Zeit.",
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
    offlineReplies: [
      "Benissimo, ho capito perfettamente! Potresti raccontarmi qualcosa in più a riguardo?",
      "Molto naturale e chiaro! Cosa ti piacerebbe fare adesso?",
      "Perfetto, continuamo pure la nostra conversazione!",
    ],
    defaultFollowUpQuestion: "Cosa ne pensi?",
    nudge: "Ti sto ascoltando! Prenditi il tuo tempo e dimmi pure.",
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
    offlineReplies: [
      "Muito bem, entendi perfeitamente! Você poderia me contar um pouco mais sobre isso?",
      "Soa muito natural! O que você gostaria de fazer em seguida?",
      "Entendido! Vamos continuar a nossa conversa.",
    ],
    defaultFollowUpQuestion: "O que você acha disso?",
    nudge: "Estou ouvindo! Fique à vontade para responder quando estiver pronto.",
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
    offlineReplies: [
      "Отлично, я вас прекрасно понял! Не могли бы вы рассказать об этом немного подробнее?",
      "Звучит очень естественно! Что бы вы хотели сделать дальше?",
      "Понятно! Давайте продолжим наш разговор.",
    ],
    defaultFollowUpQuestion: "Что вы об этом думаете?",
    nudge: "Я вас слушаю! Не спешите и поделитесь своими мыслями.",
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
    offlineReplies: [
      "बहुत बढ़िया, मैं आपकी बात पूरी तरह समझ गया! क्या आप इस बारे में थोड़ा और बता सकते हैं?",
      "यह बहुत स्वाभाविक लगा! आगे आप क्या करना चाहेंगे?",
      "समझ गया! चलिए अपनी बातचीत जारी रखते हैं।",
    ],
    defaultFollowUpQuestion: "इस बारे में आपका क्या विचार है?",
    nudge: "मैं सुन रहा हूँ! आराम से अपने विचार साझा करें।",
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
    offlineReplies: [
      "மிக நன்று, நீங்கள் சொன்னது தெளிவாகப் புரிந்தது! இதைப்பற்றி இன்னும் கொஞ்சம் சொல்ல முடியுமா?",
      "மிகவும் இயல்பாகப் பேசினீர்கள்! அடுத்து நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
      "புரிந்தது! நாம் தொடர்ந்து உரையாடுவோம்.",
    ],
    defaultFollowUpQuestion: "இதைப் பற்றி நீங்கள் என்ன நினைக்கிறீர்கள்?",
    nudge: "நான் கேட்டுக்கொண்டிருக்கிறேன்! தயங்காமல் உங்கள் கருத்தைச் சொல்லுங்கள்.",
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
    offlineReplies: [
      "හොඳයි, මට පැහැදිලිව තේරුණා! මේ ගැන තව ටිකක් විස්තර කරන්න පුළුවන්ද?",
      "ස්තූතියි! ඔබේ අදහස හරිම ස්වභාවිකයි. ඊළඟට මොකක්ද ඔබ කරන්න කැමති?",
      "හරිම පැහැදිලියි! අපි සංවාදය ඉදිරියට කරගෙන යමු.",
    ],
    defaultFollowUpQuestion: "ඒ ගැන ඔබ මොකද හිතන්නේ?",
    nudge: "මම අහගෙන ඉන්නේ! සන්සුන්ව ඔබේ අදහස කියන්න.",
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
    offlineReplies: [
      "Heel goed, dat klinkt duidelijk! Vertel me daar gerust iets meer over.",
      "Begrepen! Wat zou je hierna willen doen?",
      "Duidelijk en natuurlijk! Laten we verdergaan met het gesprek.",
    ],
    defaultFollowUpQuestion: "Wat vind je daarvan?",
    nudge: "Ik luister! Neem gerust de tijd om je gedachten te delen.",
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
    offlineReplies: [
      "Çok iyi, sizi gayet net anladım! Bu konuda biraz daha detay verebilir misiniz?",
      "Harika ve çok doğal! Bundan sonra ne yapmak istersiniz?",
      "Anlaşıldı! Sohbetimize devam edelim.",
    ],
    defaultFollowUpQuestion: "Bu konuda ne düşünüyorsunuz?",
    nudge: "Sizi dinliyorum! Hazır olduğunuzda fikrinizi paylaşabilirsiniz.",
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
    offlineReplies: [
      "Rất tốt, tôi đã hiểu ý bạn! Bạn có thể chia sẻ thêm một chút về điều đó không?",
      "Rất tự nhiên và rõ ràng! Bạn muốn làm gì tiếp theo?",
      "Tuyệt vời! Hãy cùng tiếp tục cuộc trò chuyện nhé.",
    ],
    defaultFollowUpQuestion: "Bạn nghĩ sao về điều đó?",
    nudge: "Tôi đang lắng nghe đây! Bạn hãy cứ thoải mái chia sẻ nhé.",
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
    offlineReplies: [
      "Bagus sekali, saya paham dengan jelas! Bisakah Anda ceritakan sedikit lebih banyak?",
      "Sangat natural! Apa yang ingin Anda lakukan selanjutnya?",
      "Dipahami dengan baik! Ayo kita lanjutkan percakapannya.",
    ],
    defaultFollowUpQuestion: "Bagaimana pendapat Anda tentang hal itu?",
    nudge: "Saya mendengarkan! Silakan santai dan sampaikan pendapat Anda.",
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
    offlineReplies: [
      "ดีมากเลยครับ เข้าใจชัดเจนเลย! เล่าเพิ่มเติมให้ฟังอีกนิดได้ไหมครับ?",
      "เป็นธรรมชาติมากครับ! ต่อไปอยากจะทำอะไรต่อดีครับ?",
      "เข้าใจแล้วครับ! เรามาคุยกันต่อเลยครับ",
    ],
    defaultFollowUpQuestion: "คุณคิดอย่างไรเกี่ยวกับเรื่องนี้ครับ?",
    nudge: "ผมกำลังฟังอยู่นะครับ! สบายๆ แล้วแชร์ความคิดเห็นได้เลยครับ",
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
    offlineReplies: [
      "Jättebra, jag förstod precis vad du menade! Berätta gärna lite mer om det.",
      "Väldigt naturligt! Vad vill du göra härnäst?",
      "Uppfattat! Låt oss fortsätta samtalet.",
    ],
    defaultFollowUpQuestion: "Vad tycker du om det?",
    nudge: "Jag lyssnar! Ta god tid på dig och berätta vad du tycker.",
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
    offlineReplies: [
      "That is really insightful! Could you tell me a little more about how you got started with that?",
      "I completely understand! What else would you like to share about that?",
      "Great point! How do you usually approach that situation?",
    ],
    defaultFollowUpQuestion: "What else do you think about that?",
    nudge: "I'm listening! Take your time and share your thoughts whenever you're ready.",
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
  if (l.includes("french") || l.includes("fran") || l === "fr" || l.startsWith("fr-") || l.startsWith("fr_")) return BUNDLES.fr;
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
