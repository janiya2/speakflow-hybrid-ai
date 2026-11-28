import 'dart:math';

enum CategoryDomain {
  sports,
  food,
  travel,
  career,
  shopping,
  health,
  tech,
  culture,
}

class CategoryQuestions20 {
  static final Random _rand = Random();

  static const Map<CategoryDomain, List<String>> _domainKeywords = {
    CategoryDomain.sports: [
      'sport', 'cricket', 'football', 'soccer', 'futbol', 'fútbol', 'fitness', 'gym', 'tennis',
      'olympic', 'baseball', 'basketball', 'martial', 'swimming', 'badminton', 'cycling',
      'ciclismo', 'motorsport', 'boxing', 'golf', 'volleyball', 'surfing', 'table tennis',
      'hiking', 'yoga', 'running', 'rugby', 'padel', 'pádel', 'athlete', 'match', 't20',
      'world cup', 'e스포츠', '야구', '헬스', 'サッカー', '相撲', 'கிரிக்கெட்', 'கபடி', 'كرة القدم', 'فروسية',
    ],
    CategoryDomain.food: [
      'food', 'dining', 'restaurant', 'bistro', 'cafe', 'café', 'fika', 'coffee', 'barista',
      'bakery', 'ramen', 'sushi', 'izakaya', 'tacos', 'tapas', 'churros', 'bbq', 'street food',
      'dessert', 'breakfast', 'cooking', 'pasta', 'pizza', 'gelato', 'tea', 'menu', 'order',
      'k-food', '분식', '치맥', '김치', '鉄板焼き', '甘味', 'مطاعم', 'مقبلات', 'مندي', 'حلويات',
      'உணவு', 'சாப்பாடு', 'செட்டிநாடு', 'ஜிகர்தண்டா',
    ],
    CategoryDomain.travel: [
      'travel', 'airport', 'flight', 'baggage', 'train', 'shinkansen', 'ktx', 'tren ave',
      'transit', 'transport', 'hotel', 'lodging', 'chalet', 'cruise', 'sightseeing', 'directions',
      'road trip', 'car rental', 'scooter', 'rideshare', 'ferry', 'river', 'ski', 'playas',
      'turismo', 'metro', 'tube', 'subway', 'bus', 'taxi', 'check-in', 'customs', 'passport',
      '地下鉄', '温泉', '지하철', '제주도', '한옥숙박', 'سفر', 'سفاري', 'رحلة', 'معالم',
      'பயணம்', 'படகு', 'கடற்கரை', 'கோவில்',
    ],
    CategoryDomain.career: [
      'career', 'business', 'interview', 'job', 'salary', 'negotiation', 'startup', 'pitch',
      'meeting', 'standup', 'finance', 'banking', 'etiquette', 'work', 'office', 'resume',
      'manager', 'client', 'entrevista', '면접', 'நேர்காணல்', 'أعمال',
    ],
    CategoryDomain.shopping: [
      'shop', 'market', 'bazaar', 'supermarket', 'mercado', 'textiles', 'souvenir', 'store',
      'mall', 'price', 'bargain', 'gift', 'clothing', 'ഷോപ്പിങ്', 'ஷாப்பிங்', 'تسوق',
    ],
    CategoryDomain.health: [
      'health', 'doctor', 'clinic', 'pharmacy', 'medicine', 'wellness', 'emergency', 'hospital',
      'dentist', 'appointment', 'symptom', 'salon', 'therapy',
    ],
    CategoryDomain.tech: [
      'tech', 'ai', 'robot', 'robotics', 'software', 'gaming', 'game', 'space', 'coding',
      'developer', 'app', 'digital', 'cyber', 'tecnología', 'hardware',
    ],
    CategoryDomain.culture: [
      'culture', 'movie', 'music', 'karaoke', 'anime', 'entertainment', 'tradition', 'heritage',
      'arts', 'festival', 'hobby', 'hobbies', 'social', 'weekend', 'daily', 'freeform',
      'k-culture', 'greeting', 'friend', 'introduce',
    ],
  };

  static bool _matchesDomain(String text, List<String> keywords) {
    final asciiShortRx = RegExp(r'^[a-z0-9-]+$');
    return keywords.any((kw) {
      if (kw.length <= 4 && asciiShortRx.hasMatch(kw)) {
        return RegExp(r'\b' + RegExp.escape(kw) + r'\b', caseSensitive: false).hasMatch(text);
      }
      return text.contains(kw);
    });
  }

  static CategoryDomain resolveDomain({
    String category = '',
    String subCategory = '',
    String title = '',
    String scenario = '',
    String userSpeech = '',
  }) {
    const ordered = [
      CategoryDomain.sports,
      CategoryDomain.food,
      CategoryDomain.travel,
      CategoryDomain.career,
      CategoryDomain.shopping,
      CategoryDomain.health,
      CategoryDomain.tech,
      CategoryDomain.culture,
    ];
    final explicitCat = '$category $subCategory'.toLowerCase();
    for (final domain in ordered) {
      if (_matchesDomain(explicitCat, _domainKeywords[domain] ?? const [])) {
        return domain;
      }
    }
    final combined = '$title $scenario $userSpeech'.toLowerCase();
    for (final domain in ordered) {
      if (_matchesDomain(combined, _domainKeywords[domain] ?? const [])) {
        return domain;
      }
    }
    return CategoryDomain.culture;
  }

  static const Map<String, Map<CategoryDomain, List<String>>> _bank = {
    'en': {
      CategoryDomain.sports: [
        'Which player or team inspires you the most when a game gets really intense?',
        'Do you prefer playing sports yourself or watching live tournaments with friends?',
        'What makes a winning strategy in your favorite sport when the match is close?',
        'How do you usually celebrate a big victory or bounce back from a tough loss?',
      ],
      CategoryDomain.food: [
        'Would you like a signature dish recommendation, or do you prefer classic comfort flavors?',
        'Do you have any dietary preferences or favorite spices you always look for?',
        'What is a memorable meal or street food dish you could happily eat every week?',
        'Do you usually enjoy cooking new recipes at home or discovering cozy local restaurants?',
      ],
      CategoryDomain.travel: [
        'When arriving in a new city, do you prefer taking local transit or exploring on foot?',
        'Would you rather book a quiet scenic hotel or stay right in the busy city center?',
        'What is the very first landmark or neighborhood you want to visit on your next trip?',
        'How do you usually plan your itinerary, or do you prefer spontaneous adventures?',
      ],
      CategoryDomain.career: [
        'What kind of team environment helps you do your strongest and most creative work?',
        'Can you share a tricky problem you solved recently and what approach worked best?',
        'How do you balance speed and quality when a deadline is tight?',
        'What skills are you most excited to strengthen in your career over the next year?',
      ],
      CategoryDomain.shopping: [
        'Do you look for handmade local craftsmanship or practical everyday items when shopping?',
        'How do you politely ask for a better price or check if another size is available?',
        'What makes a shopping market or boutique stand out as your favorite place to browse?',
        'Do you prefer comparing options carefully before buying or deciding right away?',
      ],
      CategoryDomain.health: [
        'How long have these symptoms been bothering you, and have you tried anything for relief?',
        'What daily habits help you maintain good energy and restful sleep during a busy week?',
        'Would you prefer a natural routine adjustment first or specific medical advice?',
        'What questions do you always make sure to ask at a clinic or pharmacy?',
      ],
      CategoryDomain.tech: [
        'Which recent AI or technology breakthrough excites you most in everyday life?',
        'How do you think smart voice assistants will change how people learn new skills?',
        'What matters more to you in an app: ultra-fast response speed or rich customization?',
        'If you could build any smart gadget or software tool tomorrow, what would it solve?',
      ],
      CategoryDomain.culture: [
        'What kind of movie, music, or local tradition best captures your favorite culture?',
        'Have you attended a live festival or cultural event that left a lasting impression?',
        'How do you usually spend a relaxed weekend when meeting close friends?',
        'What custom or greeting surprised you most when learning about another country?',
      ],
    },
    'fr': {
      CategoryDomain.sports: [
        "Quel joueur ou quelle équipe vous inspire le plus lors d'un grand match ?",
        'Préférez-vous pratiquer un sport vous-même ou regarder les compétitions en direct ?',
        'Quelle est selon vous la meilleure stratégie pour gagner une rencontre difficile ?',
        "Comment célébrez-vous d'habitude une belle victoire sportive avec vos amis ?",
      ],
      CategoryDomain.food: [
        "Préférez-vous goûter un plat du chef ou choisir un grand classique de la carte ?",
        'Avez-vous des allergies ou des saveurs particulières que vous adorez ?',
        "Quel plat traditionnel ou dessert aimeriez-vous commander aujourd'hui ?",
        'Aimez-vous cuisiner à la maison ou découvrir de nouveaux petits bistrots ?',
      ],
      CategoryDomain.travel: [
        'À votre arrivée dans une nouvelle ville, préférez-vous prendre le métro ou marcher ?',
        'Préférez-vous un hôtel calme ou un logement au cœur du centre animé ?',
        'Quel monument ou quartier aimeriez-vous explorer en premier lors de ce voyage ?',
        "Organisez-vous tout à l'avance ou aimez-vous improviser vos visites ?",
      ],
      CategoryDomain.career: [
        'Quel projet professionnel récent vous rend le plus fier aujourd’hui ?',
        'Comment gérez-vous votre temps lorsque plusieurs dossiers sont urgents ?',
        'Quelles qualités recherchez-vous avant tout chez vos collègues ?',
        'Quel objectif de carrière souhaitez-vous atteindre cette année ?',
      ],
      CategoryDomain.shopping: [
        'Cherchez-vous plutôt des souvenirs artisanaux ou des articles pratiques ?',
        'Comment demanderiez-vous poliment une autre taille ou une remise au vendeur ?',
        'Préférez-vous les marchés locaux en plein air ou les grandes boutiques ?',
        "Prenez-vous le temps de comparer les prix avant d'acheter ?",
      ],
      CategoryDomain.health: [
        'Depuis combien de temps ressentez-vous ces symptômes exactement ?',
        'Quelles habitudes vous aident à garder la forme durant une semaine chargée ?',
        'Avez-vous déjà pris un traitement ou demandé conseil à la pharmacie ?',
        "Préférez-vous un rendez-vous le matin ou en fin d'après-midi ?",
      ],
      CategoryDomain.tech: [
        'Quelle innovation technologique vous impressionne le plus en ce moment ?',
        "Comment l'intelligence artificielle aide-t-elle votre quotidien selon vous ?",
        'Préférez-vous une application ultra-rapide ou très personnalisable ?',
        'Quelle nouvelle fonctionnalité aimeriez-vous créer si vous étiez développeur ?',
      ],
      CategoryDomain.culture: [
        'Quel film, musique ou festival représente le mieux cette culture pour vous ?',
        'Avez-vous récemment découvert une tradition locale qui vous a marqué ?',
        'Comment passez-vous généralement un dimanche tranquille entre amis ?',
        "Qu'est-ce qui vous attire le plus dans la culture francophone ?",
      ],
    },
    'es': {
      CategoryDomain.sports: [
        '¿Qué jugador o equipo te emociona más cuando el partido está reñido?',
        '¿Prefieres practicar algún deporte o ver los torneos en vivo con amigos?',
        '¿Cuál crees que es la clave para mantener la calma en los minutos finales?',
        '¿Cómo sueles celebrar una gran victoria de tu equipo favorito?',
      ],
      CategoryDomain.food: [
        '¿Te apetece probar una especialidad de la casa o prefieres algo clásico del menú?',
        '¿Cuál es tu plato favorito o qué ingredientes nunca pueden faltar en tu mesa?',
        '¿Prefieres tapear de pie en un bar animado o sentarte tranquilo a cenar?',
        '¿Te gusta cocinar recetas nuevas en casa o descubrir restaurantes locales?',
      ],
      CategoryDomain.travel: [
        'Al llegar a una ciudad nueva, ¿prefieres usar el metro o caminar por las calles?',
        '¿Te gustaría alojarte cerca de la playa o en pleno centro histórico?',
        '¿Cuál es el primer lugar turístico que quieres visitar en tu próximo viaje?',
        '¿Sueles planificar cada hora del viaje o prefieres improvisar sobre la marcha?',
      ],
      CategoryDomain.career: [
        '¿Qué proyecto o logro en tu trabajo te hace sentir más orgulloso?',
        '¿Cómo manejas la presión cuando tienes varias entregas en la misma semana?',
        '¿Qué habilidades te gustaría seguir desarrollando en tu carrera profesional?',
        '¿Qué tipo de ambiente laboral te ayuda a dar tu mejor versión?',
      ],
      CategoryDomain.shopping: [
        '¿Buscas recuerdos artesanales o algo práctico para usar todos los días?',
        '¿Cómo pedirías amablemente otra talla o preguntarías por el precio en un mercado?',
        '¿Te gusta regatear un poco en el mercado o prefieres tiendas con precio fijo?',
        '¿Qué es lo que más te llama la atención al visitar un mercado local?',
      ],
      CategoryDomain.health: [
        '¿Desde cuándo sientes estas molestias y has descansado suficiente?',
        '¿Qué rutina saludable te ayuda a tener más energía cada mañana?',
        '¿Prefieres pedir cita en la clínica ahora o consultar primero en la farmacia?',
        '¿Has notado si algún alimento o actividad te hace sentir mejor?',
      ],
      CategoryDomain.tech: [
        '¿Qué avance en inteligencia artificial te parece más útil en la vida diaria?',
        '¿Cómo crees que cambiará la tecnología nuestra forma de aprender idiomas?',
        '¿Qué valoras más en una aplicación: la rapidez o el diseño sencillo?',
        '¿Qué herramienta digital te gustaría inventar para ahorrar tiempo cada día?',
      ],
      CategoryDomain.culture: [
        '¿Qué película, canción o tradición local disfrutas más recomendar?',
        '¿Has asistido alguna vez a un festival cultural que te haya sorprendido mucho?',
        '¿Qué te gusta hacer un fin de semana tranquilo para desconectar?',
        '¿Qué costumbre de otro país te gustaría vivir en persona?',
      ],
    },
    'de': {
      CategoryDomain.sports: [
        'Welcher Sportler oder welches Team inspiriert Sie bei großen Spielen am meisten?',
        'Treiben Sie selbst regelmäßig Sport oder schauen Sie lieber spannende Turniere?',
        'Was macht Ihrer Meinung nach eine wirklich starke Taktik im Wettkampf aus?',
        'Wie feiern Sie einen wichtigen Sieg am liebsten mit Freunden?',
      ],
      CategoryDomain.food: [
        'Möchten Sie heute eine regionale Spezialität probieren oder etwas Klassisches bestellen?',
        'Haben Sie besondere Vorlieben oder Gerichte, auf die Sie sich besonders freuen?',
        'Trinken Sie dazu lieber ein kühles Getränk oder einen frischen Kaffee?',
        'Kochen Sie zu Hause gerne neue Rezepte oder gehen Sie lieber aus?',
      ],
      CategoryDomain.travel: [
        'Nehmen Sie in einer neuen Stadt lieber die U-Bahn oder erkunden Sie alles zu Fuß?',
        'Bevorzugen Sie ein ruhiges Hotel oder eine Unterkunft mitten im Zentrum?',
        'Welche Sehenswürdigkeit möchten Sie auf Ihrer nächsten Reise zuerst besuchen?',
        'Planen Sie Ihre Reiseroute genau oder lassen Sie sich gerne treiben?',
      ],
      CategoryDomain.career: [
        'Auf welches berufliche Projekt sind Sie bis jetzt besonders stolz?',
        'Wie organisieren Sie Ihre Aufgaben, wenn mehrere Termine gleichzeitig anstehen?',
        'Welche Fähigkeiten möchten Sie in den nächsten Monaten beruflich ausbauen?',
        'Was schätzen Sie an einer guten Zusammenarbeit im Team am meisten?',
      ],
      CategoryDomain.shopping: [
        'Suchen Sie heute ein handgemachtes Souvenir oder etwas Praktisches für den Alltag?',
        'Wie würden Sie höflich nach einer anderen Größe oder dem genauen Preis fragen?',
        'Gehen Sie lieber auf lokale Wochenmärkte oder in moderne Einkaufszentren?',
        'Vergleichen Sie vor dem Kauf gerne mehrere Angebote?',
      ],
      CategoryDomain.health: [
        'Seit wann haben Sie diese Beschwerden und konnten Sie sich schon ausruhen?',
        'Welche Gewohnheiten helfen Ihnen, im Alltag fit und ausgeglichen zu bleiben?',
        'Möchten Sie einen Termin am Vormittag oder lieber am Nachmittag vereinbaren?',
        'Haben Sie schon in der Apotheke nach einer Empfehlung gefragt?',
      ],
      CategoryDomain.tech: [
        'Welche neue Technologie oder KI-Anwendung begeistert Sie aktuell am meisten?',
        'Wie wird künstliche Intelligenz das Lernen von Sprachen künftig verändern?',
        'Was ist Ihnen bei einer App wichtiger: sofortige Reaktion oder viele Funktionen?',
        'Welches digitale Werkzeug würde Ihren Alltag sofort erleichtern?',
      ],
      CategoryDomain.culture: [
        'Welcher Film, welche Musik oder welche Tradition fasziniert Sie besonders?',
        'Haben Sie schon einmal ein lokales Fest besucht, das unvergesslich war?',
        'Wie verbringen Sie am liebsten ein entspanntes Wochenende?',
        'Welche kulturelle Gewohnheit finden Sie besonders interessant?',
      ],
    },
    'ja': {
      CategoryDomain.sports: [
        '試合が接戦になったとき、一番応援したくなる選手やチームは誰ですか？',
        'スポーツは自分で体を動かすのと、試合を観戦するのとどちらが好きですか？',
        '強いチームや選手に共通する一番大事なポイントは何だと思いますか？',
        '大きな勝利のあと、どうやって喜びを分かち合いますか？',
      ],
      CategoryDomain.food: [
        '本日のおすすめメニューにしますか、それとも定番の一品になさいますか？',
        '苦手な食材やアレルギー、あるいはお好みの味付けはありますか？',
        '何度でも食べたくなる大好きな料理やスイーツは何ですか？',
        'お家で料理を作るのと、新しいお店を開拓するのとどちらが多いですか？',
      ],
      CategoryDomain.travel: [
        '新しい街に着いたら、電車や地下鉄で移動しますか、それとも歩いて散策しますか？',
        '静かな温泉旅館と、駅に近い便利なホテルではどちらがお好みですか？',
        '次の旅行で一番最初に行ってみたい観光スポットはどこですか？',
        '旅行のスケジュールは細かく決める派ですか、それとも気ままに回る派ですか？',
      ],
      CategoryDomain.career: [
        'これまでのお仕事やプロジェクトの中で、一番達成感があったことは何ですか？',
        '締め切りが重なったとき、どのように優先順位をつけて進めていますか？',
        'これからさらに伸ばしていきたいスキルや専門分野は何ですか？',
        '一緒に働くチームで一番大切だと思うことは何ですか？',
      ],
      CategoryDomain.shopping: [
        'お土産やプレゼントを選ぶとき、伝統工芸品と実用的なもののどちらを選びますか？',
        '店員さんにサイズ違いや在庫を丁寧に尋ねるとき、どう声をかけますか？',
        '賑やかな商店街や市場と、デパートのどちらで買い物するのが楽しいですか？',
        'お気に入りの一品を見つけるまでじっくり見て回るほうですか？',
      ],
      CategoryDomain.health: [
        'その症状はいつ頃から気になり始めましたか？お熱などはありますか？',
        '忙しい毎日の中で、体調管理のために心がけている習慣は何ですか？',
        'まずは薬局で相談しますか、それとも早めにクリニックを受診しますか？',
        '睡眠やリラックスのために工夫していることはありますか？',
      ],
      CategoryDomain.tech: [
        '最近のAIや最新テクノロジーの中で、一番すごいと感じたものは何ですか？',
        '音声AIの発達によって、これからの語学学習はどう変わると思いますか？',
        'アプリを使うとき、反応の速さと多機能さのどちらを重視しますか？',
        'もし自分で新しいAIサービスを作れるとしたら、どんなものを作りたいですか？',
      ],
      CategoryDomain.culture: [
        '日本のアニメ、映画、音楽の中で一番お気に入りの作品は何ですか？',
        'いつか実際に参加してみたいお祭りや伝統行事はありますか？',
        '休日の午後はどんなことをしてリラックスするのが好きですか？',
        '他の国の文化を知って一番驚いたことや素敵だと思ったことは何ですか？',
      ],
    },
    'ko': {
      CategoryDomain.sports: [
        '경기가 치열할 때 가장 응원하게 되는 선수나 팀이 있나요?',
        '직접 운동하는 것과 친구들과 경기를 관람하는 것 중 어느 쪽을 더 좋아하시나요?',
        '좋은 성적을 내는 팀에게 가장 중요한 전략이나 팀워크는 무엇이라고 생각하시나요?',
        '응원하는 팀이 크게 이겼을 때 보통 어떻게 축하하시나요?',
      ],
      CategoryDomain.food: [
        '오늘의 셰프 추천 메뉴를 드시겠어요, 아니면 평소 즐겨 드시는 메뉴가 있으신가요?',
        '매운 음식이나 선호하는 재료, 혹은 피해야 할 식재료가 있으신가요?',
        '매주 먹어도 질리지 않는 가장 좋아하는 음식은 무엇인가요?',
        '집에서 직접 요리하는 편인가요, 아니면 맛집을 찾아다니는 걸 좋아하시나요?',
      ],
      CategoryDomain.travel: [
        '새로운 도시에 도착하면 지하철을 타는 편인가요, 걸어 다니며 구경하는 편인가요?',
        '조용한 전통 한옥 숙소와 시내 중심가 호텔 중 어디를 더 선호하시나요?',
        '다음 여행에서 가장 먼저 가보고 싶은 명소나 거리는 어디인가요?',
        '여행 계획을 꼼꼼하게 세우는 편인가요, 즉흥적으로 움직이는 편인가요?',
      ],
      CategoryDomain.career: [
        '지금까지 해본 일이나 프로젝트 중 가장 보람 있었던 경험은 무엇인가요?',
        '마감이 빠듯할 때 일의 우선순위는 보통 어떻게 정하시나요?',
        '앞으로 커리어에서 꼭 키워보고 싶은 핵심 역량이 있나요?',
        '함께 일할 때 어떤 분위기의 팀에서 가장 능률이 오르나요?',
      ],
      CategoryDomain.shopping: [
        '선물이나 기념품을 고를 때 전통 소품과 실용적인 물건 중 무엇을 더 좋아하시나요?',
        '가게에서 다른 사이즈나 색상이 있는지 정중하게 물어보시겠어요?',
        '활기찬 전통 시장과 백화점 중 어디에서 쇼핑하는 게 더 즐겁나요?',
        '물건을 사기 전에 여러 곳을 꼼꼼히 비교해 보는 편인가요?',
      ],
      CategoryDomain.health: [
        '언제부터 그 증상이 시작되었고, 충분히 휴식은 취하셨나요?',
        '바쁜 주간에도 건강과 체력을 유지하기 위해 지키는 습관이 있나요?',
        '먼저 약국에 들러 상의해 보시겠어요, 아니면 바로 병원 예약을 잡을까요?',
        '컨디션이 안 좋을 때 주로 어떻게 회복하시나요?',
      ],
      CategoryDomain.tech: [
        '최근에 본 AI나 새로운 기술 중에서 가장 놀라웠던 것은 무엇인가요?',
        '인공지능 음성 코치가 외국어 학습 방식을 어떻게 바꿀 수 있을까요?',
        '앱을 쓸 때 빠른 응답 속도와 다양한 기능 중 무엇이 더 중요하신가요?',
        '직접 스마트 앱을 하나 만든다면 어떤 불편함을 해결하고 싶으신가요?',
      ],
      CategoryDomain.culture: [
        '가장 좋아하는 영화나 음악, 또는 꼭 추천하고 싶은 문화가 있나요?',
        '직접 가보고 싶은 축제나 전통 공연이 있으신가요?',
        '주말에 친구들을 만나면 주로 어떤 재미있는 활동을 하시나요?',
        '다른 나라의 문화 중 가장 인상 깊었던 점은 무엇이었나요?',
      ],
    },
    'zh': {
      CategoryDomain.sports: [
        '比赛进入关键时刻时，哪位运动员或哪支球队最让你激动？',
        '你更喜欢自己上场运动，还是和朋友一起看现场比赛？',
        '在激烈的对抗中，你觉得取胜最关键的因素是什么？',
        '你最喜欢的团队获胜时，你通常会怎么庆祝？',
      ],
      CategoryDomain.food: [
        '你想尝尝今天的主厨招牌菜，还是更喜欢菜单上的经典口味？',
        '你平时喜欢吃清淡一点的菜，还是偏爱香辣风味？',
        '有没有哪道家常菜或街头小吃让你百吃不厌？',
        '你平时喜欢自己在家下厨，还是更喜欢出去探店？',
      ],
      CategoryDomain.travel: [
        '到达一个新城市后，你通常选择坐地铁还是步行慢慢逛？',
        '你更倾向于住在安静的风景酒店，还是热闹的市中心？',
        '下次旅行你最想先去打卡哪个地标或街区？',
        '你习惯提前做好详细攻略，还是喜欢随性自由行？',
      ],
      CategoryDomain.career: [
        '在过去的工作中，哪一个项目让你最有成就感？',
        '当任务很多、时间又很紧时，你通常怎样安排优先级？',
        '今年你在职业发展上最想重点提升哪项技能？',
        '什么样的团队合作方式能让你发挥出最佳水平？',
      ],
      CategoryDomain.shopping: [
        '逛街时，你更偏爱手工艺纪念品还是实用的日常好物？',
        '如果想试穿其他尺码或者询问折扣，你会怎么礼貌开口？',
        '热闹的本地集市和大型购物中心，你更喜欢逛哪一种？',
        '买东西之前你会仔细对比不同款式吗？',
      ],
      CategoryDomain.health: [
        '这种不舒服的感觉持续几天了？平时有注意多休息吗？',
        '忙碌的时候，你通常靠什么习惯来保持活力和好睡眠？',
        '你打算先去药店买点药，还是预约医生仔细检查一下？',
        '每天散步或规律作息对你帮助大吗？',
      ],
      CategoryDomain.tech: [
        '最近的人工智能或科技新闻里，哪一项突破最让你兴奋？',
        '你觉得端侧AI和语音助手会怎样改变我们学习外语的方式？',
        '使用一款软件时，你更看重极快的响应速度还是丰富的界面功能？',
        '如果明天能亲手开发一个小工具，你最想解决什么问题？',
      ],
      CategoryDomain.culture: [
        '哪部电影、音乐或传统节日最能代表你心中的文化魅力？',
        '你参加过哪次印象特别深刻的文化活动或演出吗？',
        '周末休息时，你和朋友通常喜欢怎么消磨时光？',
        '了解不同国家的风俗时，哪件事最让你感到好奇？',
      ],
    },
    'ar': {
      CategoryDomain.sports: [
        'ما هو اللاعب أو الفريق الذي يلهمك أكثر عندما تكون المباراة حماسية؟',
        'هل تفضل ممارسة الرياضة بنفسك أم متابعة البطولات المباشرة مع الأصدقاء؟',
        'ما السر وراء نجاح أي فريق رياضي في اللحظات الحاسمة؟',
        'كيف تحتفل عادةً عند فوز فريقك المفضل؟',
      ],
      CategoryDomain.food: [
        'هل تود تجربة الطبق الرئيسي المميز اليوم أم تفضل الوجبات التقليدية؟',
        'ما هي النكهات أو التوابل التي تفضلها دائماً في طعامك؟',
        'هل تحب تجربة المطاعم الجديدة أم تفضل الطهي المنزلي الدافئ؟',
        'ماذا تفضل أن تطلب مع القهوة العربية أو الشاي الآن؟',
      ],
      CategoryDomain.travel: [
        'عندما تصل إلى مدينة جديدة، هل تفضل ركوب القطار أم المشي لاستكشاف المعالم؟',
        'هل تفضل الإقامة في فندق هادئ أم في قلب المدينة النابض بالحياة؟',
        'ما هو أول معلم سياحي تحلم بزيارته في رحلتك القادمة؟',
        'هل تحب التخطيط المسبق لكل خطوة أم تفضل المغامرة العفوية؟',
      ],
      CategoryDomain.career: [
        'ما هو الإنجاز أو المشروع المهني الذي تفخر به أكثر حتى الآن؟',
        'كيف ترتب أولوياتك عندما تتراكم المهام في وقت واحد؟',
        'ما المهارة الجديدة التي تطمح لتطويرها في عملك هذا العام؟',
        'ما البيئة المثالية التي تساعدك على الإبداع في العمل؟',
      ],
      CategoryDomain.shopping: [
        'هل تبحث اليوم عن هدايا تراثية يدوية أم مستلزمات يومية عملية؟',
        'كيف تسأل البائع بأسلوب لطيف عن مقاس آخر أو خصم إضافي؟',
        'هل تستمتع أكثر بالتسوق في الأسواق التقليدية أم في المراكز التجارية الحديثة؟',
        'هل تفضل مقارنة الأسعار جيداً قبل اتخاذ قرار الشراء؟',
      ],
      CategoryDomain.health: [
        'منذ متى تشعر بهذه الأعراض وهل حصلت على قسط كافٍ من الراحة؟',
        'ما العادات الصحية اليومية التي تساعدك على تجديد نشاطك؟',
        'هل تفضل حجز موعد في العيادة صباحاً أم استشارة الصيدلي أولاً؟',
        'كيف تحافظ على توازنك بين العمل والراحة خلال الأسبوع؟',
      ],
      CategoryDomain.tech: [
        'ما التقنية أو أداة الذكاء الاصطناعي التي أبهرتك مؤخراً؟',
        'كيف تعتقد أن الذكاء الاصطناعي سيجعل تعلم اللغات أسرع وأسهل؟',
        'ما الأهم بالنسبة لك في التطبيقات: سرعة الاستجابة أم التصميم البسيط؟',
        'لو استطعت ابتكار تطبيق ذكي غداً، ما المشكلة التي سيحلها؟',
      ],
      CategoryDomain.culture: [
        'ما الفيلم أو المهرجان الثقافي الذي تترك تفاصيله أثراً جميلاً في نفسك؟',
        'كيف تقضي عطلة نهاية الأسبوع عادةً مع العائلة أو الأصدقاء؟',
        'ما العادة التراثية التي تحب مشاركتها مع الضيوف والزوار؟',
        'ما أكثر شيء يثير اهتمامك عند التعرف على ثقافات العالم؟',
      ],
    },
    'it': {
      CategoryDomain.sports: [
        'Quale atleta o squadra ti emoziona di più quando la partita è decisiva?',
        "Preferisci praticare sport all'aria aperta o seguire le grandi sfide dal vivo?",
        'Qual è secondo te il segreto di una squadra davvero vincente?',
        'Come festeggi di solito una bella vittoria con i tuoi amici?',
      ],
      CategoryDomain.food: [
        'Vuoi provare il piatto del giorno dello chef o preferisci un classico della tradizione?',
        'Hai qualche ingrediente preferito o un gusto che non può mai mancare a tavola?',
        'Prendi un caffè espresso adesso o preferisci qualcosa di dolce per cominciare?',
        'Ti piace cucinare nuove ricette a casa o scoprire trattorie autentiche?',
      ],
      CategoryDomain.travel: [
        'Quando arrivi in una nuova città, preferisci prendere il treno o passeggiare a piedi?',
        'Preferisci un hotel tranquillo o stare proprio nel cuore del centro storico?',
        'Qual è il primo monumento o quartiere che vorresti visitare nel tuo prossimo viaggio?',
        "Organizzi tutto nei dettagli o ami seguire l'ispirazione del momento?",
      ],
      CategoryDomain.career: [
        'Qual è il progetto lavorativo di cui vai più fiero fino ad oggi?',
        'Come gestisci le priorità quando hai molte scadenze nella stessa settimana?',
        "Quale competenza vorresti perfezionare quest'anno nel tuo percorso professionale?",
        'Che tipo di collaborazione in team ti dà più energia?',
      ],
      CategoryDomain.shopping: [
        'Cerchi un oggetto artigianale locale o qualcosa di pratico per tutti i giorni?',
        "Come chiederesti gentilmente un'altra taglia o un consiglio al commesso?",
        'Preferisci curiosare nei mercati rionali o fare shopping nelle vie del centro?',
        'Confronti sempre con calma prima di acquistare qualcosa?',
      ],
      CategoryDomain.health: [
        'Da quanto tempo avverti questo fastidio e sei riuscito a riposare bene?',
        'Quali piccole abitudini quotidiane ti aiutano a sentirti sempre in forma?',
        'Preferisci fissare una visita in clinica o passare prima in farmacia?',
        'Cosa ti aiuta di più a recuperare energia dopo una giornata intensa?',
      ],
      CategoryDomain.tech: [
        "Quale novità nel campo dell'intelligenza artificiale ti incuriosisce di più oggi?",
        'Come cambieranno secondo te gli assistenti vocali il modo di imparare le lingue?',
        "Che cosa conta di più in un'app per te: velocità immediata o design intuitivo?",
        'Se potessi inventare uno strumento digitale domani, cosa risolverebbe?',
      ],
      CategoryDomain.culture: [
        'Quale film, musica o tradizione locale ti piace di più consigliare agli amici?',
        'Hai partecipato a un evento culturale o festa popolare indimenticabile?',
        'Come ami trascorrere un weekend rilassante in compagnia?',
        'Quale aspetto culturale di un altro paese ti ha affascinato maggiormente?',
      ],
    },
    'pt': {
      CategoryDomain.sports: [
        'Qual jogador ou equipe mais te inspira nos momentos decisivos do jogo?',
        'Você prefere praticar esportes ou assistir aos campeonatos ao vivo com amigos?',
        'O que faz a diferença em uma estratégia vencedora quando o placar está apertado?',
        'Como você costuma comemorar uma grande vitória do seu time?',
      ],
      CategoryDomain.food: [
        'Gostaria de experimentar um prato especial da casa ou prefere algo clássico do menu?',
        'Quais temperos ou sabores não podem faltar na sua refeição favorita?',
        'Você prefere um cafezinho agora ou algo doce para acompanhar?',
        'Gosta mais de cozinhar em casa ou explorar restaurantes locais diferentes?',
      ],
      CategoryDomain.travel: [
        'Ao chegar a uma cidade nova, você prefere pegar o metrô ou caminhar para conhecer tudo?',
        'Prefere se hospedar em um hotel tranquilo ou bem no centro movimentado?',
        'Qual é o primeiro ponto turístico que você quer visitar na próxima viagem?',
        'Você costuma planejar cada passeio antes ou prefere improvisar na hora?',
      ],
      CategoryDomain.career: [
        'Qual projeto ou conquista profissional recente traz mais orgulho para você?',
        'Como você organiza seu tempo quando surgem vários prazos ao mesmo tempo?',
        'Qual habilidade você quer desenvolver com mais foco este ano?',
        'Que tipo de ambiente de equipe ajuda você a render ainda mais?',
      ],
      CategoryDomain.shopping: [
        'Você procura peças artesanais locais ou algo prático para o dia a dia?',
        'Como pediria educadamente outro tamanho ou perguntaria o preço ao vendedor?',
        'Prefere passear por mercados tradicionais ou lojas modernas?',
        'Você costuma comparar várias opções antes de decidir a compra?',
      ],
      CategoryDomain.health: [
        'Há quanto tempo você está sentindo esses sintomas e tem dormido bem?',
        'Quais hábitos diários ajudam você a manter disposição e bem-estar?',
        'Prefere agendar uma consulta médica ou conversar primeiro na farmácia?',
        'O que você faz para relaxar e recuperar as energias no fim do dia?',
      ],
      CategoryDomain.tech: [
        'Qual avanço recente em inteligência artificial chamou mais a sua atenção?',
        'Como você acha que tutores de voz com IA ajudam quem estuda idiomas?',
        'O que pesa mais em um aplicativo para você: resposta rápida ou visual simples?',
        'Se pudesse criar qualquer solução tecnológica amanhã, qual problema resolveria?',
      ],
      CategoryDomain.culture: [
        'Que filme, música ou festival cultural você mais gosta de recomendar?',
        'Já participou de alguma festa tradicional que ficou marcada na memória?',
        'O que você mais gosta de fazer em um fim de semana tranquilo?',
        'Qual costume de outro país você achou mais interessante descobrir?',
      ],
    },
    'ru': {
      CategoryDomain.sports: [
        'Какой спортсмен или команда вдохновляют вас больше всего в напряжённом матче?',
        'Вы предпочитаете сами заниматься спортом или смотреть прямые трансляции с друзьями?',
        'Что, по-вашему, является главным секретом победной стратегии?',
        'Как вы обычно празднуете яркую победу любимой команды?',
      ],
      CategoryDomain.food: [
        'Хотите попробовать фирменное блюдо шефа или выберете что-то классическое?',
        'Какие вкусы или специи нравятся вам больше всего?',
        'Вы любите готовить новые рецепты дома или открывать уютные кафе?',
        'Что бы вы заказали к горячему чаю или кофе прямо сейчас?',
      ],
      CategoryDomain.travel: [
        'Приехав в новый город, вы выберете метро или прогулку пешком?',
        'Что вам ближе: тихий отель или жильё в самом центре событий?',
        'Какую достопримечательность вы мечтаете увидеть в следующей поездке в первую очередь?',
        'Вы планируете маршрут заранее или любите спонтанные открытия?',
      ],
      CategoryDomain.career: [
        'Каким рабочим проектом или достижением вы гордитесь больше всего?',
        'Как вы расставляете приоритеты, когда срочных задач слишком много?',
        'Какие профессиональные навыки вы хотите усилить в этом году?',
        'Какая атмосфера в команде помогает вам работать максимально эффективно?',
      ],
      CategoryDomain.shopping: [
        'Вы ищете памятные сувениры ручной работы или практичные вещи на каждый день?',
        'Как бы вы вежливо попросили другой размер или уточнили цену у продавца?',
        'Где вам интереснее делать покупки: на местном рынке или в торговом центре?',
        'Вы сравниваете варианты перед покупкой или решаетесь сразу?',
      ],
      CategoryDomain.health: [
        'Как давно вас беспокоят эти симптомы и удаётся ли нормально высыпаться?',
        'Какие полезные привычки помогают вам сохранять бодрость всю неделю?',
        'Запишемся на приём к врачу утром или сначала посоветуемся с фармацевтом?',
        'Что лучше всего помогает вам восстановить силы после нагрузки?',
      ],
      CategoryDomain.tech: [
        'Какая новинка в мире искусственного интеллекта впечатлила вас сильнее всего?',
        'Как, по-вашему, голосовые технологии меняют изучение иностранных языков?',
        'Что для вас важнее в приложении: мгновенный отклик или гибкие настройки?',
        'Какой умный сервис вы бы создали, если бы могли решить любую задачу?',
      ],
      CategoryDomain.culture: [
        'Какой фильм, музыка или традиция лучше всего передают дух любимой культуры?',
        'На каком культурном празднике вы побывали с особым удовольствием?',
        'Как вы любите проводить спокойные выходные в кругу друзей?',
        'Какой необычный обычай другой страны запомнился вам больше всего?',
      ],
    },
    'hi': {
      CategoryDomain.sports: [
        'जब मैच आखिरी ओवर तक रोमांचक हो, तो कौन-सा खिलाड़ी या टीम आपको सबसे ज्यादा प्रेरित करती है?',
        'आपको खुद खेलना ज्यादा पसंद है या दोस्तों के साथ लाइव मैच देखना?',
        'किसी भी बड़े मुकाबले को जीतने के लिए सबसे जरूरी रणनीति क्या होती है?',
        'जब आपकी पसंदीदा टीम जीतती है, तो आप जश्न कैसे मनाते हैं?',
      ],
      CategoryDomain.food: [
        'क्या आप आज हमारी खास डिश चखना चाहेंगे या मेन्यू से कुछ क्लासिक पसंद करेंगे?',
        'खाने में आपको तीखा और मसालेदार स्वाद पसंद है या हल्का स्वाद?',
        'ऐसा कौन-सा स्ट्रीट फूड या पकवान है जिसे आप हर हफ्ते खा सकते हैं?',
        'आपको घर पर खाना बनाना अच्छा लगता है या नए रेस्तरां आज़माना?',
      ],
      CategoryDomain.travel: [
        'किसी नए शहर में पहुंचने पर आप मेट्रो या ट्रेन से घूमना पसंद करते हैं या पैदल?',
        'क्या आप शांत जगह पर रुकना चाहेंगे या शहर के मुख्य बाज़ार के पास?',
        'अपनी अगली यात्रा में आप सबसे पहले कौन-सी जगह देखना चाहेंगे?',
        'क्या आप पहले से पूरी योजना बनाते हैं या सफर के हिसाब से तय करते हैं?',
      ],
      CategoryDomain.career: [
        'अपने काम में किस प्रोजेक्ट या उपलब्धि पर आपको सबसे अधिक गर्व महसूस होता है?',
        'जब समय कम हो और काम ज्यादा हो, तो आप प्राथमिकता कैसे तय करते हैं?',
        'इस साल आप अपने करियर में कौन-सा नया कौशल सबसे पहले सीखना चाहते हैं?',
        'एक अच्छी टीम के साथ काम करने की सबसे खास बात क्या लगती है?',
      ],
      CategoryDomain.shopping: [
        'खरीदारी करते समय आप स्थानीय हस्तशिल्प पसंद करते हैं या रोज़मर्रा की चीज़ें?',
        'दुकानदार से विनम्रता से दूसरा साइज या सही दाम पूछने के लिए आप क्या कहेंगे?',
        'आपको स्थानीय बाज़ार की रौनक पसंद है या बड़े शॉपिंग मॉल?',
        'खरीदने से पहले क्या आप कई विकल्पों की तुलना करते हैं?',
      ],
      CategoryDomain.health: [
        'आपको यह परेशानी कितने दिनों से महसूस हो रही है और क्या आप आराम कर पा रहे हैं?',
        'व्यस्त दिनचर्या में खुद को स्वस्थ और ऊर्जावान रखने के लिए आप क्या करते हैं?',
        'क्या आप पहले डॉक्टर से मिलना चाहेंगे या फार्मेसी से सलाह लेंगे?',
        'अच्छी नींद और ताज़गी के लिए कौन-सी आदत सबसे ज्यादा काम आती है?',
      ],
      CategoryDomain.tech: [
        'हाल ही में एआई या तकनीक में कौन-सा नया बदलाव आपको सबसे शानदार लगा?',
        'आपको क्या लगता है, वॉइस एआई से नई भाषाएं सीखना कितना आसान हो जाएगा?',
        'किसी ऐप में आपके लिए क्या ज्यादा जरूरी है — तेज़ रफ्तार या आसान डिज़ाइन?',
        'अगर आप कल एक नया ऐप बना सकें, तो उससे कौन-सी समस्या हल करेंगे?',
      ],
      CategoryDomain.culture: [
        'कौन-सी फिल्म, संगीत या त्योहार आपको हमारी संस्कृति की सबसे अच्छी याद दिलाता है?',
        'क्या आपने कभी किसी ऐसे सांस्कृतिक मेले में हिस्सा लिया है जो यादगार रहा हो?',
        'सप्ताहांत में दोस्तों के साथ समय बिताने का आपका पसंदीदा तरीका क्या है?',
        'दूसरी संस्कृतियों के बारे में जानकर कौन-सी बात आपको सबसे रोचक लगी?',
      ],
    },
    'ta': {
      CategoryDomain.sports: [
        'போட்டி விறுவிறுப்பாக இருக்கும்போது எந்த வீரர் அல்லது அணி உங்களுக்கு அதிக உத்வேகம் தரும்?',
        'நீங்களே விளையாடுவதை விரும்புவீர்களா அல்லது நண்பர்களுடன் நேரடிப் போட்டியை பார்ப்பதை விரும்புவீர்களா?',
        'ஒரு பெரிய வெற்றியைப் பெற சிறந்த ஆட்ட உத்தி எது என்று நினைக்கிறீர்கள்?',
        'உங்கள் விருப்பமான அணி வெல்லும்போது அதை எப்படி கொண்டாடுவீர்கள்?',
      ],
      CategoryDomain.food: [
        'இன்றைய சிறப்பு உணவை முயற்சி செய்ய விரும்புகிறீர்களா அல்லது வழக்கமான உணவு போதுமா?',
        'உணவில் காரமான சுவை பிடிக்குமா அல்லது மிதமான சுவை பிடிக்குமா?',
        'நீங்கள் அடிக்கடி விரும்பி சாப்பிடும் பிடித்த உணவு எது?',
        'வீட்டில் சமைப்பது பிடிக்குமா அல்லது புதிய உணவகங்களுக்குச் செல்வது பிடிக்குமா?',
      ],
      CategoryDomain.travel: [
        'புதிய நகரத்திற்குச் செல்லும்போது ரயில் மற்றும் மெட்ரோவில் செல்வீர்களா அல்லது நடந்து பார்ப்பீர்களா?',
        'அமைதியான விடுதியில் தங்க விரும்புவீர்களா அல்லது நகர மையத்தில் தங்குவீர்களா?',
        'உங்கள் அடுத்த பயணத்தில் முதலில் பார்க்க விரும்பும் இடம் எது?',
        'பயணத் திட்டத்தை முன்பே தயார் செய்வீர்களா அல்லது அங்கே போய் முடிவு செய்வீர்களா?',
      ],
      CategoryDomain.career: [
        'உங்கள் பணியில் நீங்கள் மிகவும் பெருமைப்படும் திட்டம் அல்லது சாதனை எது?',
        'நேரம் குறைவாக இருக்கும்போது முக்கியப் பணிகளை எப்படி வரிசைப்படுத்துவீர்கள்?',
        'இந்த ஆண்டு உங்கள் தொழிலில் எந்தத் திறனை மேம்படுத்த விரும்புகிறீர்கள்?',
        'ஒரு குழுவில் இணைந்து பணியாற்றுவதில் உங்களுக்குப் பிடித்த விஷயம் எது?',
      ],
      CategoryDomain.shopping: [
        'கடைகளில் கைவினைப் பொருட்களைத் தேடுவீர்களா அல்லது அன்றாடப் பயன்பாட்டுப் பொருட்களா?',
        'விற்பனையாளரிடம் மரியாதையாக வேறு அளவு அல்லது விலையை எப்படிக் கேட்பீர்கள்?',
        'கலகலப்பான உள்ளூர் சந்தையா அல்லது பெரிய வணிக வளாகமா, எது பிடிக்கும்?',
        'வாங்குவதற்கு முன் பல கடைகளில் விலை ஒப்பிட்டுப் பார்ப்பீர்களா?',
      ],
      CategoryDomain.health: [
        'இந்த அறிகுறி எத்தனை நாட்களாக இருக்கிறது, நன்றாக ஓய்வு எடுத்தீர்களா?',
        'நாள்தோறும் சுறுசுறுப்பாகவும் ஆரோக்கியமாகவும் இருக்க என்ன பழக்கம் உதவுகிறது?',
        'முதலில் மருத்துவரிடம் நேரம் பார்க்கலாமா அல்லது மருந்தகத்தில் ஆலோசனை கேட்கலாமா?',
        'மனம் அமைதியாக இருக்க நீங்கள் தினமும் என்ன செய்வீர்கள்?',
      ],
      CategoryDomain.tech: [
        'சமீபத்தில் வெளியான ஏ.ஐ மற்றும் தொழில்நுட்பத்தில் உங்களைக் கவர்ந்த விஷயம் எது?',
        'குரல் வழி ஏ.ஐ புதிய மொழிகளைக் கற்றுக்கொள்ள எப்படி உதவும் என்று நினைக்கிறீர்கள்?',
        'ஒரு செயலியில் வேகமான பதிலா அல்லது எளிய வடிவமைப்பா, எது முக்கியம்?',
        'நீங்கள் ஒரு புதிய செயலி உருவாக்கினால் எந்தப் பிரச்சனைக்கு தீர்வு காண்பீர்கள்?',
      ],
      CategoryDomain.culture: [
        'எந்தத் திரைப்படம், இசை அல்லது திருவிழா உங்களுக்கு மிகவும் பிடித்தமானது?',
        'நீங்கள் கலந்துகொண்ட மறக்க முடியாத கலாச்சார நிகழ்ச்சி எது?',
        'வார இறுதியில் நண்பர்களுடன் சேர்ந்து என்ன செய்ய விரும்புவீர்கள்?',
        'வேறு நாட்டுப் பழக்கவழக்கங்களில் உங்களை ஆச்சரியப்படுத்தியது எது?',
      ],
    },
    'si': {
      CategoryDomain.sports: [
        'තරගයක් අවසන් මොහොතේ තියුණු වෙද්දී ඔබට වැඩියෙන්ම ශක්තියක් දෙන ක්‍රීඩකයා හෝ කණ්ඩායම කවුද?',
        'ඔබ කැමතිම ක්‍රීඩාව ක්‍රීඩා කරන්නද නැත්නම් යාලුවෝ එක්ක තරගය බලන්නද?',
        'දැඩි තරගයකදී ජයග්‍රහණය ලබාගන්න වැදගත්ම උපාය මාර්ගය මොකක් කියලද හිතන්නේ?',
        'ඔබේ කණ්ඩායම ජයගත්තම සතුට සමරන්නේ කොහොමද?',
      ],
      CategoryDomain.food: [
        'අද අපේ විශේෂ කෑම වර්ගයක් රස බලන්න කැමතිද නැත්නම් සාමාන්‍ය මෙනුවෙන් තෝරනවද?',
        'ඔබ කෑමට වැඩියෙන්ම කැමති සැර රසටද නැත්නම් මෘදු රසටද?',
        'හැමදාම කෑවත් එපා වෙන්නේ නැති ඔබේ ප්‍රියතම කෑම මොකක්ද?',
        'ගෙදරදී අලුත් කෑම හදන්නද කැමති නැත්නම් එළියේ අලුත් තැන්වලින් කන්නද?',
      ],
      CategoryDomain.travel: [
        'අලුත් නගරයකට ගියාම දුම්රියෙන් හෝ බස් එකෙන් යන්නද කැමති නැත්නම් ඇවිදින්නද?',
        'නිස්කලංක තැනක නවාතැන් ගන්නද කැමති නැත්නම් නගරය මැද හෝටලයකද?',
        'ඔබේ ඊළඟ ගමනේදී මුලින්ම බලන්න ආස තැන මොකක්ද?',
        'ගමන යන්න කලින් හැමදේම සැලසුම් කරනවද නැත්නම් එවෙලේම තීරණය කරනවද?',
      ],
      CategoryDomain.career: [
        'ඔබේ රැකියාවේදී හෝ ව්‍යාපෘති වලදී ඔබට වැඩියෙන්ම ආඩම්බර හිතෙන අත්දැකීම මොකක්ද?',
        'වැඩ ගොඩක් එකට ආවම කාලය කළමනාකරණය කරගන්නේ කොහොමද?',
        'මේ අවුරුද්දේ ඔබේ වෘත්තීය ජීවිතයේ වැඩිදියුණු කරගන්න කැමතිම හැකියාව මොකක්ද?',
        'කණ්ඩායමක් එක්ක වැඩ කරද්දී හොඳම ප්‍රතිඵල ගන්නේ කොහොමද?',
      ],
      CategoryDomain.shopping: [
        'සාප්පු යද්දී අතින් හදපු දේශීය භාණ්ඩ හොයනවද නැත්නම් එදිනෙදා අවශ්‍ය දේවල්ද?',
        'වෙළෙන්දාගෙන් ආචාරශීලීව වෙනත් ප්‍රමාණයක් හෝ මිල අඩු කරන්න අහන්නේ කොහොමද?',
        'ජනාකීර්ණ පොළකින් බඩු ගන්නද කැමති නැත්නම් සුපිරි වෙළඳසැලකින්ද?',
        'දෙයක් ගන්න කලින් මිල ගණන් කිහිපයක් සසඳලා බලනවද?',
      ],
      CategoryDomain.health: [
        'මේ අපහසුතාවය කොච්චර දවසක ඉඳන් තියෙනවද, හොඳට විවේක ගත්තද?',
        'කාර්යබහුල සතියකත් නිරෝගීව සහ ප්‍රබෝධමත්ව ඉන්න ඔබ කරන පුරුදු මොනවද?',
        'මුලින්ම ෆාමසියෙන් අහන්නද කැමති නැත්නම් වෛද්‍යවරයෙක් හමුවෙන්නද?',
        'හොඳ නින්දක් සහ සැහැල්ලුවක් ලබාගන්න උදව් වෙන දේවල් මොනවද?',
      ],
      CategoryDomain.tech: [
        'මෑතකදී ආපු AI හෝ තාක්ෂණික දියුණුවෙන් ඔබව වැඩියෙන්ම පුදුම කළේ මොකක්ද?',
        'AI හඬ තාක්ෂණය නිසා අලුත් භාෂා ඉගෙන ගන්න එක කොහොම වෙනස් වෙයි කියලද හිතන්නේ?',
        'ඇප් එකක් පාවිච්චි කරද්දී වේගවත් බවද නැත්නම් ලස්සන පෙනුමද වැදගත්?',
        'ඔබට හෙට අලුත් මෘදුකාංගයක් හදන්න ලැබුණොත් මොන ප්‍රශ්නයද විසඳන්නේ?',
      ],
      CategoryDomain.culture: [
        'ඔබ කැමතිම චිත්‍රපටයක්, සංගීතයක් හෝ සංස්කෘතික උත්සවයක් ගැන කියන්න පුළුවන්ද?',
        'ඔබ සහභාගී වුණු අමතක නොවන සංස්කෘතික අත්දැකීම මොකක්ද?',
        'සති අන්තයේ යාලුවෝ එක්ක නිදහසේ කාලය ගත කරන්න කැමති කොහොමද?',
        'වෙනත් රටක සිරිත් විරිත් දැනගද්දී ඔබව පුදුම කළ දේ මොකක්ද?',
      ],
    },
    'nl': {
      CategoryDomain.sports: [
        'Welke sporter of welk team inspireert jou het meest tijdens een spannende wedstrijd?',
        'Sport je liever zelf of kijk je graag samen met vrienden naar live toernooien?',
        'Wat is volgens jou het geheim van een winnende strategie?',
        'Hoe vier je meestal een mooie overwinning?',
      ],
      CategoryDomain.food: [
        'Wil je graag een specialiteit van het huis proberen of iets klassieks bestellen?',
        'Heb je favoriete ingrediënten of smaken waar je altijd blij van wordt?',
        'Kook je thuis graag nieuwe recepten of ga je liever uit eten?',
        'Wat zou je nu het liefst bij een kop koffie of thee nemen?',
      ],
      CategoryDomain.travel: [
        'Neem je in een nieuwe stad liever de metro of wandel je graag rond?',
        'Verblijf je liever in een rustig hotel of midden in het bruisende centrum?',
        'Welke bezienswaardigheid wil je tijdens je volgende reis als eerste zien?',
        'Plan je alles vooraf of laat je je graag verrassen onderweg?',
      ],
      CategoryDomain.career: [
        'Op welk werkproject ben je tot nu toe het meest trots?',
        'Hoe houd je overzicht wanneer meerdere deadlines tegelijk komen?',
        'Welke vaardigheid wil je dit jaar verder ontwikkelen in je werk?',
        'Wat vind je het belangrijkst in een goede samenwerking?',
      ],
      CategoryDomain.shopping: [
        'Zoek je vandaag naar lokale ambachtelijke cadeaus of praktische spullen?',
        'Hoe vraag je beleefd aan de verkoper om een andere maat of de prijs?',
        'Ga je liever naar een gezellige markt of een modern winkelcentrum?',
        'Vergelijk je eerst rustig de opties voordat je iets koopt?',
      ],
      CategoryDomain.health: [
        'Hoe lang heb je al last van deze klachten en heb je genoeg gerust?',
        'Welke dagelijkse gewoontes helpen jou om energiek en fit te blijven?',
        'Wil je liever eerst advies bij de apotheek of meteen een afspraak maken?',
        'Wat helpt je het beste om te ontspannen na een drukke dag?',
      ],
      CategoryDomain.tech: [
        'Welke nieuwe AI-ontwikkeling vind je op dit moment het indrukwekkendst?',
        'Hoe denk je dat spraakassistenten het leren van talen makkelijker maken?',
        'Wat vind je belangrijker in een app: snelle reactie of veel functies?',
        'Welke slimme tool zou je morgen zelf willen bouwen?',
      ],
      CategoryDomain.culture: [
        'Welke film, muziek of traditie geeft volgens jou het beste beeld van deze cultuur?',
        'Heb je ooit een festival of cultureel evenement bezocht dat je nooit vergeet?',
        'Hoe breng je het liefst een ontspannen weekend met vrienden door?',
        'Welke gewoonte uit een ander land vond je bijzonder om te ontdekken?',
      ],
    },
    'tr': {
      CategoryDomain.sports: [
        'Maç heyecanı yükseldiğinde sizi en çok hangi sporcu veya takım motive ediyor?',
        'Sporu bizzat yapmayı mı yoksa arkadaşlarla canlı maç izlemeyi mi daha çok seversiniz?',
        'Sizce zorlu bir mücadeleyi kazanmanın en önemli sırrı nedir?',
        'Favori takımınız kazandığında genellikle nasıl kutlarsınız?',
      ],
      CategoryDomain.food: [
        'Bugün şefin özel tabağını mı denemek istersiniz yoksa klasik lezzetlerden mi seçelim?',
        'Yemeklerde özellikle sevdiğiniz baharatlar veya tatlar var mı?',
        'Evde yeni tarifler denemeyi mi yoksa yeni mekanlar keşfetmeyi mi seversiniz?',
        'Şimdi taze demlenmiş bir çay veya kahvenin yanına ne iyi gider?',
      ],
      CategoryDomain.travel: [
        'Yeni bir şehre gittiğinizde tramvay ve metroyla mı gezersiniz yoksa yürüyerek mi?',
        'Sakin bir sahil oteli mi yoksa tam şehir merkezindeki hareketli bir yer mi tercihiniz?',
        'Bir sonraki seyahatinizde ilk görmek istediğiniz yer neresi?',
        'Gezi planını önceden detaylı mı yaparsınız yoksa akışına mı bırakırsınız?',
      ],
      CategoryDomain.career: [
        'Bugüne kadar çalıştığınız projeler içinde en çok hangisiyle gurur duyuyorsunuz?',
        'Birden fazla iş sıkıştığında önceliklerinizi nasıl belirlersiniz?',
        'Bu yıl kariyerinizde en çok hangi yeteneğinizi geliştirmek istiyorsunuz?',
        'Bir ekipte verimli çalışmanın sizin için en önemli kuralı nedir?',
      ],
      CategoryDomain.shopping: [
        'Alışverişte el yapımı yerel ürünler mi yoksa günlük kullanışlı eşyalar mı arıyorsunuz?',
        'Satıcıdan başka bir beden veya fiyat bilgisi rica ederken nasıl sorarsınız?',
        'Tarihi çarşıları gezmek mi yoksa modern mağazalar mı daha keyifli geliyor?',
        'Satın almadan önce fiyatları karşılaştırmayı sever misiniz?',
      ],
      CategoryDomain.health: [
        'Bu şikayetiniz ne zamandır devam ediyor ve yeterince dinlenebildiniz mi?',
        'Yoğun bir haftada enerjinizi ve sağlığınızı korumak için neler yapıyorsunuz?',
        'Önce eczacıya mı danışmak istersiniz yoksa doktordan randevu alalım mı?',
        'Günün yorgunluğunu atmak için size en iyi gelen şey nedir?',
      ],
      CategoryDomain.tech: [
        'Son dönemde çıkan yapay zeka yeniliklerinden en çok hangisi ilginizi çekiyor?',
        'Sizce sesli yapay zeka koçları dil öğrenmeyi nasıl değiştirecek?',
        'Bir uygulamada sizin için hız mı yoksa sade tasarım mı daha önemli?',
        'Yarın kendi akıllı uygulamanızı yapabilseniz hangi sorunu çözerdiniz?',
      ],
      CategoryDomain.culture: [
        'Hangi film, müzik veya gelenek bir kültürü anlamak için en güzel örnektir?',
        'Unutamadığınız bir festival veya kültürel etkinlik oldu mu?',
        'Hafta sonu sevdiklerinizle vakit geçirirken en çok ne yapmaktan keyif alırsınız?',
        'Başka bir ülkenin kültüründe sizi en çok şaşırtan gelenek hangisiydi?',
      ],
    },
    'vi': {
      CategoryDomain.sports: [
        'Khi trận đấu đang gay cấn, cầu thủ hay đội bóng nào truyền cảm hứng cho bạn nhất?',
        'Bạn thích tự mình chơi thể thao hay cùng bạn bè xem trực tiếp giải đấu?',
        'Theo bạn đâu là chiến thuật quan trọng nhất để lội ngược dòng?',
        'Bạn thường ăn mừng chiến thắng lớn cùng bạn bè như thế nào?',
      ],
      CategoryDomain.food: [
        'Hôm nay bạn muốn thử món đặc sản của quán hay chọn món quen thuộc?',
        'Bạn thích vị đậm đà cay nồng hay hương vị thanh nhẹ hơn?',
        'Món ăn đường phố nào mà bạn có thể ăn hoài không chán?',
        'Bạn hay tự nấu ăn ở nhà hay thích đi khám phá các quán mới?',
      ],
      CategoryDomain.travel: [
        'Khi đến một thành phố mới, bạn thích đi tàu điện hay đi bộ ngắm phố?',
        'Bạn muốn ở khách sạn yên tĩnh hay ngay khu trung tâm nhộn nhịp?',
        'Địa danh nào bạn muốn ghé thăm đầu tiên trong chuyến đi tới?',
        'Bạn thường lên lịch trình chi tiết trước hay thích khám phá ngẫu hứng?',
      ],
      CategoryDomain.career: [
        'Dự án hoặc thành tựu công việc nào khiến bạn tự hào nhất gần đây?',
        'Khi có nhiều việc gấp cùng lúc, bạn sắp xếp thứ tự ưu tiên thế nào?',
        'Kỹ năng nào bạn đang muốn trau dồi thêm trong sự nghiệp năm nay?',
        'Môi trường làm việc nhóm như thế nào giúp bạn sáng tạo nhất?',
      ],
      CategoryDomain.shopping: [
        'Khi đi mua sắm, bạn thích đồ thủ công địa phương hay đồ dùng tiện lợi?',
        'Bạn sẽ hỏi người bán cỡ khác hoặc xin giảm giá lịch sự như thế nào?',
        'Bạn thích dạo chợ truyền thống hay vào trung tâm thương mại hơn?',
        'Trước khi mua món đồ mới, bạn có hay so sánh nhiều chỗ không?',
      ],
      CategoryDomain.health: [
        'Tình trạng này kéo dài bao lâu rồi và bạn có ngủ đủ giấc không?',
        'Thói quen hằng ngày nào giúp bạn giữ sức khỏe tốt suốt tuần bận rộn?',
        'Bạn muốn đặt lịch khám bác sĩ ngay hay hỏi tư vấn ở nhà thuốc trước?',
        'Bạn thường làm gì để thư giãn sau một ngày làm việc căng thẳng?',
      ],
      CategoryDomain.tech: [
        'Bước tiến AI hay công nghệ nào gần đây khiến bạn ấn tượng nhất?',
        'Bạn nghĩ trợ lý giọng nói thông minh sẽ giúp việc học ngoại ngữ thay đổi ra sao?',
        'Khi dùng một ứng dụng, bạn coi trọng tốc độ phản hồi hay giao diện đẹp hơn?',
        'Nếu tự tạo một công cụ AI vào ngày mai, bạn muốn giải quyết vấn đề gì?',
      ],
      CategoryDomain.culture: [
        'Bộ phim, bài hát hay lễ hội nào bạn muốn giới thiệu nhất về văn hóa quê hương?',
        'Bạn từng tham gia sự kiện văn hóa nào đáng nhớ chưa?',
        'Cuối tuần rảnh rỗi bạn thường cùng bạn bè làm gì để thư giãn?',
        'Phong tục nào ở nước ngoài khiến bạn thấy thú vị nhất?',
      ],
    },
    'id': {
      CategoryDomain.sports: [
        'Pemain atau tim mana yang paling membuat Anda bersemangat saat pertandingan sengit?',
        'Anda lebih suka berolahraga langsung atau menonton pertandingan bersama teman?',
        'Menurut Anda apa kunci strategi terbaik untuk memenangkan pertandingan besar?',
        'Bagaimana biasanya Anda merayakan kemenangan tim favorit Anda?',
      ],
      CategoryDomain.food: [
        'Apakah Anda ingin mencoba menu spesial chef hari ini atau hidangan klasik?',
        'Apakah Anda lebih suka cita rasa pedas berbumbu atau yang gurih ringan?',
        'Makanan khas apa yang bisa Anda nikmati setiap minggu tanpa bosan?',
        'Anda lebih sering memasak di rumah atau mencoba kafe dan restoran baru?',
      ],
      CategoryDomain.travel: [
        'Saat tiba di kota baru, Anda lebih suka naik transportasi umum atau berjalan kaki?',
        'Lebih nyaman menginap di hotel yang tenang atau di tengah pusat kota yang ramai?',
        'Tempat wisata mana yang paling ingin Anda kunjungi pertama kali nanti?',
        'Apakah Anda suka menyusun jadwal perjalanan rapi atau spontan saja?',
      ],
      CategoryDomain.career: [
        'Proyek atau pencapaian kerja mana yang paling membuat Anda bangga?',
        'Bagaimana cara Anda mengatur prioritas saat beberapa deadline datang bersamaan?',
        'Keterampilan baru apa yang paling ingin Anda tingkatkan tahun ini?',
        'Suasana tim seperti apa yang membuat Anda bekerja paling maksimal?',
      ],
      CategoryDomain.shopping: [
        'Saat berbelanja, Anda mencari kerajinan lokal atau barang kebutuhan sehari-hari?',
        'Bagaimana cara sopan menanyakan ukuran lain atau menawar harga di pasar?',
        'Lebih seru belanja di pasar tradisional atau pusat perbelanjaan modern?',
        'Apakah Anda terbiasa membandingkan beberapa toko sebelum membeli?',
      ],
      CategoryDomain.health: [
        'Sudah berapa lama keluhan ini terasa dan apakah tidur Anda cukup nyenyak?',
        'Kebiasaan sehat apa yang membantu Anda tetap bugar sepanjang minggu?',
        'Ingin langsung buat janji dokter atau konsultasi ke apotek terlebih dahulu?',
        'Apa cara favorit Anda untuk memulihkan tenaga setelah hari yang padat?',
      ],
      CategoryDomain.tech: [
        'Terobosan AI atau teknologi terbaru apa yang paling menarik bagi Anda?',
        'Menurut Anda bagaimana asisten suara pintar mengubah cara belajar bahasa?',
        'Mana yang lebih penting di aplikasi: kecepatan respons atau tampilan simpel?',
        'Jika besok bisa membuat alat digital sendiri, masalah apa yang ingin diselesaikan?',
      ],
      CategoryDomain.culture: [
        'Film, musik, atau tradisi apa yang paling menggambarkan budaya favorit Anda?',
        'Pernahkah Anda menghadiri festival budaya yang sangat berkesan?',
        'Kegiatan apa yang paling seru dilakukan di akhir pekan bersama sahabat?',
        'Kebiasaan unik dari negara lain apa yang paling membuat Anda kagum?',
      ],
    },
    'th': {
      CategoryDomain.sports: [
        'เวลาการแข่งขันสูสี นักกีฬาหรือทีมไหนที่ทำให้คุณตื่นเต้นมากที่สุดครับ?',
        'คุณชอบเล่นกีฬาด้วยตัวเอง หรือชอบเชียร์การแข่งขันสดกับเพื่อนมากกว่าครับ?',
        'คุณคิดว่ากลยุทธ์สำคัญที่สุดที่จะช่วยให้ทีมชนะคืออะไรครับ?',
        'เวลาทีมโปรดชนะ คุณมักจะฉลองกันยังไงครับ?',
      ],
      CategoryDomain.food: [
        'วันนี้สนใจลองเมนูแนะนำของร้าน หรือชอบสั่งเมนูคลาสสิกดีครับ?',
        'คุณชอบอาหารรสจัดจ้าน หรือชอบรสชาติกลมกล่อมมากกว่าครับ?',
        'อาหารจานโปรดที่คุณกินได้บ่อยๆ ไม่มีเบื่อคือเมนูไหนครับ?',
        'ปกติคุณชอบทำอาหารกินเองที่บ้าน หรือชอบออกไปลองร้านใหม่ๆ ครับ?',
      ],
      CategoryDomain.travel: [
        'พอไปถึงเมืองใหม่ คุณชอบนั่งรถไฟฟ้าหรือเดินชมบรรยากาศรอบเมืองมากกว่าครับ?',
        'ชอบพักโรงแรมบรรยากาศเงียบสงบ หรือใจกลางเมืองที่เดินทางสะดวกครับ?',
        'สถานที่ท่องเที่ยวแรกที่คุณอยากไปในทริปหน้าคือที่ไหนครับ?',
        'ปกติคุณวางแผนเที่ยวล่วงหน้าละเอียด หรือชอบเที่ยวแบบตามใจตัวเองครับ?',
      ],
      CategoryDomain.career: [
        'ผลงานหรือโปรเจกต์ไหนในการทำงานที่คุณภูมิใจมากที่สุดครับ?',
        'เวลาต้องทำงานหลายอย่างพร้อมกัน คุณจัดลำดับความสำคัญยังไงครับ?',
        'ปีนี้คุณอยากพัฒนาทักษะด้านไหนในสายงานเพิ่มเติมเป็นพิเศษครับ?',
        'บรรยากาศการทำงานแบบไหนที่ช่วยให้คุณคิดไอเดียดีๆ ออกครับ?',
      ],
      CategoryDomain.shopping: [
        'เวลาเดินซื้อของ คุณชอบของฝากทำมือหรือของใช้ในชีวิตประจำวันมากกว่าครับ?',
        'ถ้าจะขอลองไซส์อื่นหรือถามราคาอย่างสุภาพ คุณจะพูดกับคนขายว่ายังไงครับ?',
        'คุณชอบเดินตลาดท้องถิ่นหรือห้างสรรพสินค้ามากกว่ากันครับ?',
        'ก่อนตัดสินใจซื้อ คุณมักจะเปรียบเทียบหลายๆ ร้านก่อนไหมครับ?',
      ],
      CategoryDomain.health: [
        'อาการแบบนี้เป็นมากี่วันแล้วครับ และช่วงนี้ได้พักผ่อนเพียงพอไหมครับ?',
        'กิจวัตรประจำวันแบบไหนที่ช่วยให้คุณสุขภาพดีและสดชื่นตลอดสัปดาห์ครับ?',
        'อยากนัดพบคุณหมอเลย หรือแวะปรึกษาเภสัชกรที่ร้านยาก่อนดีครับ?',
        'เวลาเหนื่อยล้า คุณมีวิธีผ่อนคลายยังไงให้หายไวที่สุดครับ?',
      ],
      CategoryDomain.tech: [
        'เทคโนโลยีหรือ AI ใหม่ๆ ช่วงนี้ เรื่องไหนที่คุณรู้สึกตื่นเต้นมากที่สุดครับ?',
        'คุณคิดว่าผู้ช่วยเสียง AI จะช่วยให้การฝึกพูดภาษาใหม่ๆ สนุกขึ้นยังไงบ้างครับ?',
        'เวลาใช้แอปพลิเคชัน คุณให้ความสำคัญกับความเร็วหรือดีไซน์ที่ใช้ง่ายมากกว่าครับ?',
        'ถ้าสร้างแอปอัจฉริยะได้เองพรุ่งนี้ คุณอยากแก้ปัญหาเรื่องอะไรครับ?',
      ],
      CategoryDomain.culture: [
        'หนัง เพลง หรือเทศกาลไหนที่คุณอยากแนะนำให้เพื่อนต่างชาติรู้จักมากที่สุดครับ?',
        'คุณเคยไปงานเทศกาลวัฒนธรรมไหนที่ประทับใจไม่ลืมเลยไหมครับ?',
        'วันหยุดสุดสัปดาห์ คุณมักจะใช้เวลาพักผ่อนกับเพื่อนยังไงครับ?',
        'วัฒนธรรมของประเทศไหนที่คุณรู้สึกทึ่งและอยากไปสัมผัสด้วยตัวเองครับ?',
      ],
    },
    'sv': {
      CategoryDomain.sports: [
        'Vilken spelare eller vilket lag inspirerar dig mest när matchen är riktigt jämn?',
        'Föredrar du att träna själv eller att titta på stora turneringar med vänner?',
        'Vad tycker du är nyckeln till en riktigt stark lagstrategi?',
        'Hur brukar du fira när ditt favoritlag tar hem en stor seger?',
      ],
      CategoryDomain.food: [
        'Vill du prova dagens specialitet från köket eller något klassiskt från menyn?',
        'Vilka smaker eller rätter tröttnar du aldrig på att beställa?',
        'Tar du hellre en kaffe och kanelbulle till fikat eller något matigare?',
        'Tycker du bäst om att laga mat hemma eller att upptäcka nya restauranger?',
      ],
      CategoryDomain.travel: [
        'När du kommer till en ny stad, tar du helst tunnelbanan eller promenerar du runt?',
        'Föredrar du ett lugnt hotell eller att bo mitt i centrum?',
        'Vilken sevärdhet vill du allra helst besöka på din nästa resa?',
        'Planerar du resan i detalj i förväg eller gillar du spontana utflykter?',
      ],
      CategoryDomain.career: [
        'Vilket projekt eller resultat i jobbet känner du dig extra stolt över?',
        'Hur prioriterar du när det är flera viktiga deadlines samma vecka?',
        'Vilken kompetens vill du utveckla mest under det kommande året?',
        'Vilken typ av samarbete i teamet ger dig mest energi?',
      ],
      CategoryDomain.shopping: [
        'Letar du helst efter lokalt hantverk eller praktiska saker till vardagen?',
        'Hur frågar du artigt personalen om en annan storlek eller om priset?',
        'Tycker du bäst om mysiga marknader utomhus eller moderna gallerior?',
        'Jämför du gärna flera alternativ innan du bestämmer dig för ett köp?',
      ],
      CategoryDomain.health: [
        'Hur länge har du känt av de här symtomen och har du fått vila ordentligt?',
        'Vilka dagliga vanor hjälper dig att hålla energin uppe under veckan?',
        'Vill du boka en tid på vårdcentralen eller fråga på apoteket först?',
        'Vad gör du helst för att varva ner efter en intensiv dag?',
      ],
      CategoryDomain.tech: [
        'Vilken ny AI-funktion eller tekniknyhet imponerar mest på dig just nu?',
        'Hur tror du att smarta röstcoacher förändrar sättet vi lär oss språk?',
        'Vad är viktigast i en app för dig: snabb respons eller enkel design?',
        'Om du fick skapa ett eget digitalt verktyg i morgon, vad skulle det lösa?',
      ],
      CategoryDomain.culture: [
        'Vilken film, musik eller tradition tycker du bäst fångar din favoritkultur?',
        'Har du varit på någon festival eller kulturhändelse du aldrig glömmer?',
        'Hur tillbringar du helst en avkopplande helg med goda vänner?',
        'Vilken sed från ett annat land tyckte du var särskilt intressant att lära känna?',
      ],
    },
  };

  static String pickQuestion({
    required String langCode,
    String category = '',
    String subCategory = '',
    String title = '',
    String scenario = '',
    String userSpeech = '',
    List<String> starterQuestions = const [],
    List<String> recentBotTexts = const [],
  }) {
    final code = _bank.containsKey(langCode) ? langCode : 'en';
    final domain = resolveDomain(
      category: category,
      subCategory: subCategory,
      title: title,
      scenario: scenario,
      userSpeech: userSpeech,
    );

    final recentLower = recentBotTexts.map((t) => t.toLowerCase()).toList();
    final starters = starterQuestions
        .map((q) => q.replaceAll(RegExp(r'\([^)]*\)'), '').replaceAll(RegExp(r'\[[^\]]*\]'), '').trim())
        .where((q) => q.length > 4)
        .toList();

    final domainPool = _bank[code]![domain] ?? _bank[code]![CategoryDomain.culture]!;
    final combined = <String>{...starters, ...domainPool}.toList();

    final fresh = combined.where((candidate) {
      final len = candidate.length < 24 ? candidate.length : 24;
      final snippet = candidate.toLowerCase().substring(0, len);
      return !recentLower.any((prev) => prev.contains(snippet));
    }).toList();

    final pool = fresh.isNotEmpty ? fresh : combined;
    return pool[_rand.nextInt(pool.length)];
  }
}
