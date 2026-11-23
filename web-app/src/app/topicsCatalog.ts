// SpeakFlow Master Practice Scenarios Catalog (Synced for Web & Mobile)
// Contains 500+ authentic conversational topics across all 20 global languages.

export interface CatalogTopicModel {
  id: string;
  title: string;
  language: string;
  level: string;
  category: string;
  subCategory?: string;
  icon: string;
  scenario: string;
  starterPrompt: string;
  starterQuestions?: string[];
}

export type CatalogTopic = CatalogTopicModel;

export const MASTER_TOPICS_CATALOG: CatalogTopicModel[] = [
  {
    "id": "sp_1",
    "title": "Talking About Cricket: T20 World Cup",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "You are chatting with a passionate cricket fan about recent international matches and legendary players.",
    "starterPrompt": "Hey mate! Did you catch the thrilling cricket match yesterday? Who's your all-time favorite cricket player?",
    "starterQuestions": [
      "What do you think makes a great captain in cricket?"
    ]
  },
  {
    "id": "sp_2",
    "title": "Playing Football & Premier League",
    "language": "English",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "You are talking with a teammate before a friendly weekend football match.",
    "starterPrompt": "Hey! Ready for the football game? Which position do you usually like playing on the field?",
    "starterQuestions": [
      "Which football club do you support?"
    ]
  },
  {
    "id": "sp_3",
    "title": "Gym Workout Routine & Fitness Goals",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Fitness",
    "icon": "🏋️",
    "scenario": "You are discussing workout plans, protein intake, and staying fit with a personal trainer at the gym.",
    "starterPrompt": "Welcome to the fitness center! Tell me, what specific fitness goals are you hoping to achieve this year?",
    "starterQuestions": [
      "Do you prefer weight training or cardio?"
    ]
  },
  {
    "id": "sp_4",
    "title": "Tennis Match & Grand Slam Stars",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Tennis",
    "icon": "🎾",
    "scenario": "You are having a casual discussion with a tennis coach at a club.",
    "starterPrompt": "Hi there! It is a lovely sunny day for tennis. Have you ever played singles or doubles before?",
    "starterQuestions": [
      "Who is your favorite Grand Slam tennis star?"
    ]
  },
  {
    "id": "sp_5",
    "title": "Olympic Games & Track and Field",
    "language": "English",
    "level": "Advanced",
    "category": "Sports",
    "subCategory": "Olympics",
    "icon": "🥇",
    "scenario": "You are having a deep discussion about world records and Olympic athletes with a sports journalist.",
    "starterPrompt": "Hello! Watching Olympic athletes push human limits is truly inspiring. Which Olympic event excites you the most?",
    "starterQuestions": [
      "Do you think training or genetics matters more?"
    ]
  },
  {
    "id": "sp_6",
    "title": "Japanese Baseball: Tokyo Giants Game",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Baseball",
    "icon": "⚾",
    "scenario": "You are talking with a Japanese baseball enthusiast at Tokyo Dome.",
    "starterPrompt": "野球はお好きですか？日本のプロ野球でどのチームを応援していますか？",
    "starterQuestions": [
      "ドームの雰囲気はどうですか？ (How is the stadium atmosphere?)"
    ]
  },
  {
    "id": "sp_7",
    "title": "Korean Taekwondo & Martial Arts",
    "language": "Korean",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Martial Arts",
    "icon": "🥋",
    "scenario": "You are talking with a friendly Korean martial arts instructor.",
    "starterPrompt": "안녕하세요! 태권도나 다른 운동을 해보신 적이 있으신가요?",
    "starterQuestions": [
      "어떤 운동을 가장 좋아하세요? (Which exercise do you like most?)"
    ]
  },
  {
    "id": "sp_8",
    "title": "Basketball & NBA Playoff Thrills",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Basketball",
    "icon": "🏀",
    "scenario": "You are chatting with a basketball coach about three-point shooting, favorite NBA franchises, and clutch moments.",
    "starterPrompt": "Hey there! Did you catch that buzzer-beater shot in last night's basketball game? Who's your favorite NBA player?",
    "starterQuestions": [
      "Do you enjoy playing basketball or watching?"
    ]
  },
  {
    "id": "sp_9",
    "title": "Swimming & Aquatic Endurance Training",
    "language": "English",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Swimming",
    "icon": "🏊",
    "scenario": "You are discussing freestyle lap pacing, breathing technique, and pool workouts with a swimming instructor.",
    "starterPrompt": "Hello! Swimming is one of the best full-body workouts. Do you swim for cardio or just for fun on hot days?",
    "starterQuestions": [
      "Which stroke do you find most challenging: butterfly or breaststroke?"
    ]
  },
  {
    "id": "sp_10",
    "title": "Badminton Club: Fast Smashes & Rally Drills",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Badminton",
    "icon": "🏸",
    "scenario": "You are warming up with your badminton partner before an intense doubles tournament match.",
    "starterPrompt": "Hi! Great to see you on the court. Are your wrists warmed up for some fast cross-court smashes today?",
    "starterQuestions": [
      "Do you prefer playing singles or doubles badminton?"
    ]
  },
  {
    "id": "sp_11",
    "title": "Road Cycling & Tour de France Strategy",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cycling",
    "icon": "🚴",
    "scenario": "You are talking with an endurance cyclist about aerodynamic bikes, cadence, and grueling mountain stages.",
    "starterPrompt": "Good morning! What an incredible morning for a long bike ride. What kind of bike do you ride most often?",
    "starterQuestions": [
      "Do you prefer climbing steep hills or sprinting on flats?"
    ]
  },
  {
    "id": "sp_12",
    "title": "Formula 1 Racing: Pit Stops & Pole Positions",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Motorsport",
    "icon": "🏎️",
    "scenario": "You are debating race strategies, tire degradation, and team rivalries with an avid Formula 1 fan.",
    "starterPrompt": "Welcome to race weekend! The qualifying session was unbelievable. Which F1 team are you backing for the podium?",
    "starterQuestions": [
      "Who do you consider the fastest driver on the grid?"
    ]
  },
  {
    "id": "sp_13",
    "title": "Boxing & Combat Sports Sparring",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Boxing",
    "icon": "🥊",
    "scenario": "You are wrapping your hands and talking footwork, defense, and jab combinations with a boxing coach.",
    "starterPrompt": "Hey champ! Ready to hit the heavy bag today? How are your combinations and head movement feeling?",
    "starterQuestions": [
      "What do you think is more crucial: punching power or ring stamina?"
    ]
  },
  {
    "id": "sp_14",
    "title": "Golf: 18 Holes & The Perfect Swing",
    "language": "English",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Golf",
    "icon": "⛳",
    "scenario": "You are having a relaxed conversation at the golf clubhouse after completing a round on the green.",
    "starterPrompt": "Good afternoon! How did your round go today? Did you manage to stay out of the sand traps and water hazards?",
    "starterQuestions": [
      "What is the strongest club in your golf bag?"
    ]
  },
  {
    "id": "sp_15",
    "title": "Volleyball & Beach Smash Tournaments",
    "language": "English",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Volleyball",
    "icon": "🏐",
    "scenario": "You are teaming up with a beach volleyball player for a sunny weekend competition on the sand.",
    "starterPrompt": "Hey teammate! The sand is warm and the breeze is light. Ready to practice our serves and sets?",
    "starterQuestions": [
      "Do you prefer playing on the beach or indoor hard courts?"
    ]
  },
  {
    "id": "sp_16",
    "title": "Surfing & Catching Ocean Waves",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Surfing",
    "icon": "🏄",
    "scenario": "You are waxing your surfboard and chatting with a surf instructor about ocean currents and wave swell.",
    "starterPrompt": "Aloha! The swell is looking fantastic today with clean offshore sets. Have you caught any good waves yet?",
    "starterQuestions": [
      "Do you ride a longboard or a shortboard?"
    ]
  },
  {
    "id": "sp_17",
    "title": "Table Tennis: Spin, Slices & Rapid Rallies",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Table Tennis",
    "icon": "🏓",
    "scenario": "You are playing ping pong at a recreational club and talking about top-spin serves and paddle rubbers.",
    "starterPrompt": "Nice rally! That backhand slice had unbelievable spin. How long have you been playing table tennis?",
    "starterQuestions": [
      "Do you rely more on heavy spin or quick placement?"
    ]
  },
  {
    "id": "sp_18",
    "title": "Mountain Hiking & Wilderness Backpacking",
    "language": "English",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Hiking",
    "icon": "🥾",
    "scenario": "You are resting at a scenic mountain overlook and talking with a fellow trekker about trail navigation.",
    "starterPrompt": "Hello there! What a breathtaking panoramic view from the summit. How was the trail incline for you today?",
    "starterQuestions": [
      "What essential gear do you always carry in your backpack?"
    ]
  },
  {
    "id": "sp_19",
    "title": "Yoga, Core Flexibility & Breathwork",
    "language": "English",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Yoga",
    "icon": "🧘",
    "scenario": "You are cooling down after an energizing Vinyasa flow session with your yoga teacher.",
    "starterPrompt": "Namaste. Wonderful practice today! How did your body and breathing feel during the warrior poses?",
    "starterQuestions": [
      "Do you practice yoga primarily for flexibility or mental relaxation?"
    ]
  },
  {
    "id": "sp_20",
    "title": "Marathon Training: 42km Endurance & Pacing",
    "language": "English",
    "level": "Advanced",
    "category": "Sports",
    "subCategory": "Running",
    "icon": "🏃",
    "scenario": "You are discussing hydration gels, heart rate zones, and long run milestones with a distance running coach.",
    "starterPrompt": "Hey runner! Great job logging those early morning miles. What distance are you training for right now?",
    "starterQuestions": [
      "How do you push through the mental barrier after the 30-kilometer mark?"
    ]
  },
  {
    "id": "sp_21",
    "title": "Winter Sports: Alpine Skiing & Snowboarding",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Skiing",
    "icon": "⛷️",
    "scenario": "You are riding the chairlift up a snow-covered mountain talking about fresh powder runs and slope difficulty.",
    "starterPrompt": "Brrr, it is crisp up here! The fresh powder snow looks amazing today. Do you prefer skis or a snowboard?",
    "starterQuestions": [
      "Have you ever attempted a black diamond slope?"
    ]
  },
  {
    "id": "sp_22",
    "title": "Rugby Match: Scrums, Tackles & Team Spirit",
    "language": "English",
    "level": "Advanced",
    "category": "Sports",
    "subCategory": "Rugby",
    "icon": "🏉",
    "scenario": "You are talking with a rugby club captain about sportsmanship, intense tackles, and set-piece scrums.",
    "starterPrompt": "Good match today! Rugby demands incredible physical toughness. Which position do you play on the squad?",
    "starterQuestions": [
      "What makes team culture in rugby so unique compared to other sports?"
    ]
  },
  {
    "id": "sp_es_1",
    "title": "El Clásico: Real Madrid vs FC Barcelona",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Fútbol",
    "icon": "⚽",
    "scenario": "Estás debatiendo sobre el clásico del fútbol español con un aficionado apasionado en un café de Madrid.",
    "starterPrompt": "¡Hola amigo! ¿Qué opinas del clásico del fin de semana? ¿Quién crees que se llevará la victoria este año?",
    "starterQuestions": [
      "¿Prefieres ver el partido en el estadio o con amigos en casa?"
    ]
  },
  {
    "id": "sp_es_2",
    "title": "Partido de Pádel con Amigos en el Club",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Pádel",
    "icon": "🎾",
    "scenario": "Estás organizando un partido de pádel por parejas en el club deportivo local.",
    "starterPrompt": "¡Buenas tardes! Nos falta una persona para completar el partido de pádel. ¿Te apetece jugar un set con nosotros?",
    "starterQuestions": [
      "¿Sueles jugar en el lado derecho o izquierdo de la pista?"
    ]
  },
  {
    "id": "sp_es_3",
    "title": "Ciclismo y La Vuelta a España",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Ciclismo",
    "icon": "🚴",
    "scenario": "Hablas sobre ciclismo de montaña y las etapas míticas de la Vuelta a España con un ciclista experimentado.",
    "starterPrompt": "¡Hola! Las rutas de montaña por aquí son increíbles para pedalear. ¿Sueles salir en bicicleta los fines de semana?",
    "starterQuestions": [
      "¿Prefieres bicicleta de montaña o de carretera?"
    ]
  },
  {
    "id": "sp_jp_1",
    "title": "大相撲観戦と両国国技館",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "相撲",
    "icon": "🤼",
    "scenario": "両国国技館で日本の伝統スポーツである大相撲についてファンと話しています。",
    "starterPrompt": "大相撲を見たことがありますか？好きな力士や印象に残る取組はありますか？",
    "starterQuestions": [
      "相撲の伝統や儀式についてどう思いますか？"
    ]
  },
  {
    "id": "sp_jp_2",
    "title": "サッカーJリーグ観戦とスタジアム応援",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "サッカー",
    "icon": "⚽",
    "scenario": "スタジアムでJリーグの白熱した試合についてサポーターと熱く語り合っています。",
    "starterPrompt": "今日の試合はとても熱気がありますね！Jリーグでどのクラブを応援していますか？",
    "starterQuestions": [
      "スタジアムグルメや応援の雰囲気はどうですか？"
    ]
  },
  {
    "id": "sp_kr_1",
    "title": "KBO 프로야구 직관과 응원 문화",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "야구",
    "icon": "⚾",
    "scenario": "잠실야구장에서 열정적인 한국 프로야구 응원 문화와 치킨 맥주에 대해 대화합니다.",
    "starterPrompt": "한국 야구장의 응원 열기는 정말 최고예요! 오늘 어느 팀을 응원하러 오셨나요?",
    "starterQuestions": [
      "야구장에서 치맥 드셔보셨나요?"
    ]
  },
  {
    "id": "sp_kr_2",
    "title": "e스포츠와 롤챔스 리그 (LCK)",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "e스포츠",
    "icon": "🎮",
    "scenario": "한국의 세계적인 e스포츠 문화와 프로게이머들에 대해 토론합니다.",
    "starterPrompt": "한국 e스포츠 경기 보신 적 있으세요? 가장 좋아하는 프로게이머나 게임이 무엇인가요?",
    "starterQuestions": [
      "직접 게임하는 것을 좋아하시나요, 보는 것을 좋아하시나요?"
    ]
  },
  {
    "id": "sp_ar_1",
    "title": "دوري روشن السعودي ونجوم كرة القدم",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "كرة القدم",
    "icon": "⚽",
    "scenario": "أنت تتحدث مع مشجع كروي في الرياض حول منافسات دوري روشن وأشهر اللاعبين العالميين.",
    "starterPrompt": "أهلاً بك! كيف ترى منافسات الدوري السعودي هذا الموسم؟ من هو فريقك المفضل؟",
    "starterQuestions": [
      "ما رأيك في تطور كرة القدم في العالم العربي؟"
    ]
  },
  {
    "id": "sp_ar_2",
    "title": "ركوب الخيل والفروسية العربية الأصيلة",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "فروسية",
    "icon": "🐎",
    "scenario": "تتحدث مع مدرب فروسية في نادٍ للخيول العربية الأصيلة حول أسرار ركوب الخيل.",
    "starterPrompt": "مرحباً بك! الخيل العربي معروف بجماله وسرعته وذكائه. هل مارست رياضة ركوب الخيل من قبل؟",
    "starterQuestions": [
      "ما الذي يعجبك أكثر في الخيول العربية؟"
    ]
  },
  {
    "id": "sp_ta_1",
    "title": "ஐபிஎல் கிரிக்கெட் மற்றும் சென்னை சூப்பர் கிங்ஸ்",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "கிரிக்கெட்",
    "icon": "🏏",
    "scenario": "சென்னை மைதானத்தில் நடக்கும் விறுவிறுப்பான கிரிக்கெட் போட்டி பற்றி நண்பருடன் பேசுகிறீர்கள்.",
    "starterPrompt": "வணக்கம் நண்பா! நேற்றைய கிரிக்கெட் மேட்ச் பார்த்தீர்களா? உங்களுக்கு பிடித்த அணி எது?",
    "starterQuestions": [
      "தோனியின் ஆட்டம் பற்றி உங்கள் கருத்து என்ன?"
    ]
  },
  {
    "id": "sp_ta_2",
    "title": "பாரம்பரிய கபடி விளையாட்டு மற்றும் புரோ கபடி",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "கபடி",
    "icon": "🤼",
    "scenario": "பாரம்பரிய தமிழர்களின் வீர விளையாட்டான கபடி போட்டி பற்றி உடற்பயிற்சி ஆசிரியரிடம் பேசுகிறீர்கள்.",
    "starterPrompt": "கபடி என்பது தமிழர்களின் பாரம்பரிய வீர விளையாட்டு. நீங்கள் பள்ளியிலோ கல்லூரியிலோ கபடி ஆடியிருக்கிறீர்களா?",
    "starterQuestions": [
      "ரைடர் பிடிப்பதை விட டேக்கிள் செய்வது உங்களுக்கு பிடிக்குமா?"
    ]
  },
  {
    "id": "tr_1",
    "title": "Airport Check-In & Boarding Gate",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Airport",
    "icon": "✈️",
    "scenario": "You are talking to an airline counter agent checking in your luggage for an international flight.",
    "starterPrompt": "Good morning! Welcome to Airways. May I please see your passport and booking reference?",
    "starterQuestions": [
      "Do you have any check-in bags or just carry-on?"
    ]
  },
  {
    "id": "tr_2",
    "title": "Hotel Check-In & Room Requests",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You are arriving at a boutique seaside hotel and checking into your reserved room with the receptionist.",
    "starterPrompt": "Welcome to Paradise Resort! How can I assist you today, and under what name is your reservation?",
    "starterQuestions": [
      "Would you like a room with a balcony view?"
    ]
  },
  {
    "id": "tr_3",
    "title": "Asking For Street Directions in a New City",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Directions",
    "icon": "🗺️",
    "scenario": "You are lost in a foreign downtown district and stopping a friendly local pedestrian for directions.",
    "starterPrompt": "Excuse me! I seem to be a little turned around. Where are you trying to get to in the city center?",
    "starterQuestions": [
      "Are you looking for the subway station?"
    ]
  },
  {
    "id": "tr_4",
    "title": "Renting a Car for a Scenic Road Trip",
    "language": "English",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Transport",
    "icon": "🚗",
    "scenario": "You are speaking with a car rental agent choosing vehicle type and insurance coverage.",
    "starterPrompt": "Hello! Welcome to Scenic Cars. What type of vehicle are you looking to drive during your vacation?",
    "starterQuestions": [
      "Would you like an SUV or a compact car?"
    ]
  },
  {
    "id": "tr_5",
    "title": "Train Ticket at Shinjuku Station",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Transport",
    "icon": "🚅",
    "scenario": "You are buying a Shinkansen bullet train ticket from a station attendant in Tokyo.",
    "starterPrompt": "いらっしゃいませ。京都までの新幹線チケットですか？指定席と自由席どちらがよろしいですか？",
    "starterQuestions": [
      "何時の電車に乗りますか？ (What time train would you like to take?)"
    ]
  },
  {
    "id": "tr_6",
    "title": "Checking into a Traditional Ryokan in Kyoto",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏯",
    "scenario": "You are arriving at a beautiful traditional Japanese onsen inn.",
    "starterPrompt": "ようこそお越しくださいました。ご予約のお名前を伺ってもよろしいでしょうか？",
    "starterQuestions": [
      "夕食は何時がご希望ですか？ (What time would you prefer dinner?)"
    ]
  },
  {
    "id": "tr_7",
    "title": "Taking a Taxi to Hongdae in Seoul",
    "language": "Korean",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Transport",
    "icon": "🚕",
    "scenario": "You just stepped into a taxi in downtown Seoul and are telling the driver your destination.",
    "starterPrompt": "어서오세요! 어디로 모실까요?",
    "starterQuestions": [
      "홍대입구역 어디쯤에 내려드릴까요? (Where around Hongdae Station should I drop you?)"
    ]
  },
  {
    "id": "fd_1",
    "title": "Ordering Coffee & Pastry in a Cozy Cafe",
    "language": "English",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "You are ordering a warm specialty beverage and snack from a barista in a local artisan coffee shop.",
    "starterPrompt": "Hi there! Welcome to The Roastery. What can I brew up fresh for you today?",
    "starterQuestions": [
      "Do you want regular dairy milk or oat milk?"
    ]
  },
  {
    "id": "fd_2",
    "title": "Dining at an Italian Restaurant",
    "language": "English",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍝",
    "scenario": "You are enjoying an evening meal and asking the waiter for menu recommendations and wine pairing.",
    "starterPrompt": "Buona sera! Welcome to Trattoria Bella. Are you ready to order, or would you like to hear today's chef specials?",
    "starterQuestions": [
      "Do you prefer homemade pasta or wood-fired pizza?"
    ]
  },
  {
    "id": "fd_3",
    "title": "Street Food Market: Tasting Exotic Dishes",
    "language": "English",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🍢",
    "scenario": "You are exploring a bustling outdoor night market stall with spicy noodles and skewers.",
    "starterPrompt": "Hey! Come try our famous spicy grilled skewers! How much chili heat can you handle?",
    "starterQuestions": [
      "Have you ever tried local street snacks before?"
    ]
  },
  {
    "id": "fd_4",
    "title": "Cooking Recipe & Favorite Ingredients",
    "language": "English",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Cooking",
    "icon": "🍳",
    "scenario": "You are sharing your favorite home-cooked dish and cooking tips with a fellow foodie.",
    "starterPrompt": "I love cooking at home! Tell me, what is one dish you really enjoy making from scratch?",
    "starterQuestions": [
      "What secret spices or ingredients do you add?"
    ]
  },
  {
    "id": "fd_5",
    "title": "Ordering Ramen at an Authentic Tokyo Shop",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍜",
    "scenario": "You are sitting at the wooden counter of a famous tonkotsu ramen shop in Tokyo.",
    "starterPrompt": "へい、いらっしゃい！ラーメンのスープの濃さと麺の硬さはどうしますか？",
    "starterQuestions": [
      "トッピングに煮玉子はつけますか？ (Would you like a soft-boiled egg topping?)"
    ]
  },
  {
    "id": "fd_6",
    "title": "Korean BBQ in Gangnam: Ordering Samgyeopsal",
    "language": "Korean",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥩",
    "scenario": "You are sitting around a charcoal grill at a popular Seoul K-BBQ restaurant with a hospitable owner.",
    "starterPrompt": "어서오세요! 삼겹살 2인분 드릴까요, 아니면 소고기 갈비가 좋으세요?",
    "starterQuestions": [
      "된장찌개나 밥도 같이 준비해 드릴까요? (Shall I prepare soybean stew and rice together?)"
    ]
  },
  {
    "id": "fd_7",
    "title": "Ordering Bingsu Dessert in Hongdae",
    "language": "Korean",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Dessert",
    "icon": "🍧",
    "scenario": "You are cooling off on a warm afternoon ordering shaved ice dessert at a dessert cafe in Seoul.",
    "starterPrompt": "주문 도와드릴게요! 인절미 빙수랑 망고 빙수 중에 어떤 것으로 하시겠어요?",
    "starterQuestions": [
      "사이즈는 레귤러로 드릴까요? (Regular size?)"
    ]
  },
  {
    "id": "car_1",
    "title": "Job Interview: Tell Me About Yourself",
    "language": "English",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "💼",
    "scenario": "You are interviewing for an exciting international role with the senior hiring manager.",
    "starterPrompt": "Hello! Welcome to our interview. To start off, could you walk me through your background and experience?",
    "starterQuestions": [
      "What are your greatest professional strengths?"
    ]
  },
  {
    "id": "car_2",
    "title": "Explaining Strengths, Weaknesses & Goals",
    "language": "English",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "🎯",
    "scenario": "The interviewer asks you behavioral questions about challenges and professional growth.",
    "starterPrompt": "Thank you. Now tell me about a time you faced a difficult deadline or conflict at work and overcame it.",
    "starterQuestions": [
      "What is an area you are currently trying to improve?"
    ]
  },
  {
    "id": "car_3",
    "title": "Team Standup: Sprint Progress Update",
    "language": "English",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Meeting",
    "icon": "💻",
    "scenario": "You are participating in a daily agile standup meeting with your software engineering team.",
    "starterPrompt": "Good morning team! Let's go around. What did you accomplish yesterday and what are you working on today?",
    "starterQuestions": [
      "Are there any blockers preventing your progress?"
    ]
  },
  {
    "id": "car_4",
    "title": "Salary Negotiation & Benefits Discussion",
    "language": "English",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Negotiation",
    "icon": "🤝",
    "scenario": "You are discussing a job offer compensation package with the company HR director.",
    "starterPrompt": "We are thrilled to offer you this role! Having reviewed the offer letter, what are your thoughts on the compensation?",
    "starterQuestions": [
      "What salary expectations did you have in mind?"
    ]
  },
  {
    "id": "car_5",
    "title": "Business Introductions & Business Card Exchange",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Business Etiquette",
    "icon": "📇",
    "scenario": "You are meeting an important Japanese business client and exchanging meishi (business cards).",
    "starterPrompt": "初めまして。本日はお時間をいただき誠にありがとうございます。名刺を交換させていただけますでしょうか？",
    "starterQuestions": [
      "御社の事業について簡単にご紹介いただけますか？ (Could you briefly introduce your company?)"
    ]
  },
  {
    "id": "car_6",
    "title": "Korean Company Interview (면접)",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "🏢",
    "scenario": "You are sitting across from a panel of Korean corporate interviewers at a leading tech firm.",
    "starterPrompt": "지원자님, 먼저 긴장을 푸시고 간단하게 자기소개 부탁드립니다.",
    "starterQuestions": [
      "우리 회사에 지원하게 된 특별한 동기가 있나요? (What motivated you to apply to our company?)"
    ]
  },
  {
    "id": "ent_1",
    "title": "Favorite Movies & Cinema Trends",
    "language": "English",
    "level": "Beginner",
    "category": "Entertainment",
    "subCategory": "Movies",
    "icon": "🎬",
    "scenario": "You are meeting a film enthusiast chatting about recent blockbusters and favorite directors.",
    "starterPrompt": "Hey! What is the latest movie or series you watched that completely blew your mind?",
    "starterQuestions": [
      "Do you prefer sci-fi, comedy, or thriller films?"
    ]
  },
  {
    "id": "ent_2",
    "title": "Gaming & Esports: PC vs Console",
    "language": "English",
    "level": "Beginner",
    "category": "Entertainment",
    "subCategory": "Gaming",
    "icon": "🎮",
    "scenario": "You are talking with a fellow gamer about favorite multiplayer games and story-driven campaigns.",
    "starterPrompt": "What games have you been playing lately? Do you prefer gaming on PC, PlayStation, or mobile?",
    "starterQuestions": [
      "What was the most memorable game from your childhood?"
    ]
  },
  {
    "id": "ent_3",
    "title": "Music Festivals & Musical Taste",
    "language": "English",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎵",
    "scenario": "You are having a fun conversation with a friend about music genres and favorite live concerts.",
    "starterPrompt": "I always have music playing in my headphones! What kind of music gets you into the best mood?",
    "starterQuestions": [
      "Have you ever been to a live concert or music festival?"
    ]
  },
  {
    "id": "ent_4",
    "title": "Discussing Anime & Manga Favorites",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Entertainment",
    "subCategory": "Anime",
    "icon": "⛩️",
    "scenario": "You are talking with an Akihabara anime fan about legendary anime series and manga.",
    "starterPrompt": "日本のアニメやマンガはお好きですか？一番好きな作品は何ですか？",
    "starterQuestions": [
      "最近見ているアニメはありますか？ (Is there an anime you are currently watching?)"
    ]
  },
  {
    "id": "ent_5",
    "title": "K-Pop Music & K-Drama Favorites",
    "language": "Korean",
    "level": "Beginner",
    "category": "Entertainment",
    "subCategory": "K-Culture",
    "icon": "🎤",
    "scenario": "You are chatting with a university student in Seoul about K-pop idols and trending Korean dramas.",
    "starterPrompt": "혹시 좋아하는 K-POP 아이돌이나 한국 드라마가 있으신가요?",
    "starterQuestions": [
      "한국 노래 중에 자주 듣는 곡이 있나요? (Is there a Korean song you listen to often?)"
    ]
  },
  {
    "id": "dl_1",
    "title": "Clothes Shopping & Trying on Sizes",
    "language": "English",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "🛍️",
    "scenario": "You are in a fashion retail store asking the shop assistant for sizes and trying clothes in the fitting room.",
    "starterPrompt": "Hi there! Looking for anything in particular today? We have a great summer collection over here.",
    "starterQuestions": [
      "What size do you usually wear?"
    ]
  },
  {
    "id": "dl_2",
    "title": "Visiting the Doctor: Describing Symptoms",
    "language": "English",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "Health",
    "icon": "🩺",
    "scenario": "You are visiting a clinic and explaining how you feel to a caring medical doctor.",
    "starterPrompt": "Good afternoon. Please have a seat. What seems to be bothering you today?",
    "starterQuestions": [
      "How long have you had this fever or headache?"
    ]
  },
  {
    "id": "dl_3",
    "title": "At the Pharmacy: Buying Medicine",
    "language": "English",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "You are talking to a pharmacist asking for advice on allergy or pain relief tablets.",
    "starterPrompt": "Hello! How can I help you at the pharmacy counter today?",
    "starterQuestions": [
      "Do you have a doctor's prescription?"
    ]
  },
  {
    "id": "dl_4",
    "title": "Hair Salon: Getting a Fresh Haircut",
    "language": "English",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Salon",
    "icon": "💇",
    "scenario": "You are sitting in the barber or salon chair discussing how short you want your hair styled.",
    "starterPrompt": "Hey! Welcome to the salon. How are we doing your hair today — just a trim or a totally new style?",
    "starterQuestions": [
      "How short would you like the sides?"
    ]
  },
  {
    "id": "dl_5",
    "title": "Shopping at a Japanese Convenience Store (Konbini)",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "🏪",
    "scenario": "You are paying for bento and drinks at a 7-Eleven or Lawson in Tokyo.",
    "starterPrompt": "いらっしゃいませ！お弁当は温めますか？",
    "starterQuestions": [
      "お箸は何膳おつけしますか？ (How many pairs of chopsticks would you like?)"
    ]
  },
  {
    "id": "dl_6",
    "title": "Buying Cosmetics in Myeongdong, Seoul",
    "language": "Korean",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "💄",
    "scenario": "You are browsing skincare and face masks with a friendly shop assistant in Seoul.",
    "starterPrompt": "어서오세요 고객님! 요즘 환절기라 수분 크림이랑 마스크팩이 인기인데, 피부 타입이 어떻게 되세요?",
    "starterQuestions": [
      "선물용이신가요, 직접 쓰실 건가요? (Is this a gift, or for yourself?)"
    ]
  },
  {
    "id": "tech_1",
    "title": "Artificial Intelligence & Future of Work",
    "language": "English",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "AI",
    "icon": "🤖",
    "scenario": "You are having a deep intellectual debate on how AI models and robotics will reshape human jobs.",
    "starterPrompt": "AI is accelerating faster than anyone anticipated. In your view, will AI help workers or displace them?",
    "starterQuestions": [
      "What jobs do you think are impossible to automate?"
    ]
  },
  {
    "id": "tech_2",
    "title": "Space Exploration & Colonizing Mars",
    "language": "English",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "Space",
    "icon": "🚀",
    "scenario": "You are discussing rocket technology, space tourism, and lunar bases with an aerospace enthusiast.",
    "starterPrompt": "If you were offered a one-way ticket to travel and live on Mars, would you take it?",
    "starterQuestions": [
      "Why do humans have such a deep drive to explore space?"
    ]
  },
  {
    "id": "tech_3",
    "title": "Smartphone Addiction vs Digital Detox",
    "language": "English",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "Digital Life",
    "icon": "📱",
    "scenario": "You are discussing screen time habits and social media impact with a lifestyle writer.",
    "starterPrompt": "Almost everyone checks their phone first thing in the morning! How many hours of screen time do you average daily?",
    "starterQuestions": [
      "Have you ever tried doing a 24-hour digital detox?"
    ]
  },
  {
    "id": "soc_1",
    "title": "First Day at a Global Language Exchange Meetup",
    "language": "English",
    "level": "Beginner",
    "category": "Social",
    "subCategory": "Meetup",
    "icon": "👋",
    "scenario": "You just arrived at a casual international networking meetup and are breaking the ice with a fellow attendee.",
    "starterPrompt": "Hey there! Mind if I join you? What brings you out to this language exchange tonight?",
    "starterQuestions": [
      "Where are you originally from?"
    ]
  },
  {
    "id": "soc_2",
    "title": "Talking About Weekend Plans & Relaxation",
    "language": "English",
    "level": "Beginner",
    "category": "Social",
    "subCategory": "Weekend",
    "icon": "🌴",
    "scenario": "It is Friday afternoon and a coworker asks what exciting things you have planned for the weekend.",
    "starterPrompt": "Finally, Friday is here! Do you have any exciting plans lined up for the weekend?",
    "starterQuestions": [
      "Do you prefer staying home relaxing or going outdoors?"
    ]
  },
  {
    "id": "soc_3",
    "title": "Self Introduction in Tokyo (自己紹介)",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Social",
    "subCategory": "Introduction",
    "icon": "🌸",
    "scenario": "You are introducing yourself at a Japanese language conversation club in Tokyo.",
    "starterPrompt": "初めまして！自己紹介をお願いできますか？お名前と、日本語を勉強している理由を教えてください！",
    "starterQuestions": [
      "日本で一番行きたい場所はどこですか？ (Where in Japan do you want to visit most?)"
    ]
  },
  {
    "id": "soc_4",
    "title": "Making Friends in Seoul (친구 사귀기)",
    "language": "Korean",
    "level": "Beginner",
    "category": "Social",
    "subCategory": "Introduction",
    "icon": "🤝",
    "scenario": "You are chatting with a friendly Korean peer at an international language meetup.",
    "starterPrompt": "반가워요! 한국어 공부한 지 얼마나 되셨어요?",
    "starterQuestions": [
      "취미가 무엇인가요? (What are your hobbies?)"
    ]
  },
  {
    "id": "spn_1",
    "title": "Ordering Tapas & Paella in Madrid",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥘",
    "scenario": "You are ordering dinner at a traditional tavern in central Madrid.",
    "starterPrompt": "¡Hola! Bienvenidos a nuestra taberna. ¿Qué tapas les apetece probar hoy?",
    "starterQuestions": [
      "¿Prefieren paella de mariscos o mixta?"
    ]
  },
  {
    "id": "spn_2",
    "title": "Hotel Check-In in Barcelona",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You are checking into your boutique hotel on Las Ramblas.",
    "starterPrompt": "¡Buenas tardes! Bienvenido al Hotel Ramblas. ¿Tiene una reserva a su nombre?",
    "starterQuestions": [
      "¿Desea una habitación con balcón o vista al jardín?"
    ]
  },
  {
    "id": "spn_3",
    "title": "Job Interview in Spanish (Entrevista de Trabajo)",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "💼",
    "scenario": "You are interviewing for a professional position at a Spanish company.",
    "starterPrompt": "¡Hola! Gracias por venir a la entrevista. Para comenzar, ¿podría contarme un poco sobre usted?",
    "starterQuestions": [
      "¿Cuáles son sus mayores fortalezas profesionales?"
    ]
  },
  {
    "id": "spn_4",
    "title": "Talking About Football & El Clásico",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "You are discussing Spanish football with a passionate fan in Madrid.",
    "starterPrompt": "¡Qué partido tan emocionante el fin de semana! ¿Quién es tu equipo favorito en La Liga?",
    "starterQuestions": [
      "¿Crees que el Real Madrid o el Barcelona ganarán la liga este año?"
    ]
  },
  {
    "id": "ar_1",
    "title": "Ordering Shawarma & Fresh Juice in Cairo",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🥙",
    "scenario": "You are ordering fresh food at a famous restaurant in downtown Cairo.",
    "starterPrompt": "أهلاً وسهلاً بك! ماذا تحب أن تطلب اليوم؟ لدينا شاورما لحم ودجاج طازجة ولذيذة!",
    "starterQuestions": [
      "هل تحب إضافة صوص الطحينة والثوم؟"
    ]
  },
  {
    "id": "ar_2",
    "title": "Airport Check-In in Dubai (مطار دبي)",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Airport",
    "icon": "✈️",
    "scenario": "You are checking in at Dubai International Airport with the counter agent.",
    "starterPrompt": "مرحباً بك في دبي! هل يمكنني رؤية جواز سفرك وتذكرة الطيران من فضلك؟",
    "starterQuestions": [
      "كم حقيبة ترغب في شحنها اليوم؟"
    ]
  },
  {
    "id": "ar_3",
    "title": "Casual Meeting & Arabic Coffee (تعارف وقهوة)",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Social",
    "subCategory": "Introduction",
    "icon": "☕",
    "scenario": "You are meeting an Arabic-speaking acquaintance at a cafe.",
    "starterPrompt": "السلام عليكم ورحمة الله! تشرفت بلقائك اليوم. كيف حالك وما هي أخبارك؟",
    "starterQuestions": [
      "منذ متى وأنت تتعلم اللغة العربية؟"
    ]
  },
  {
    "id": "ar_4",
    "title": "Job Interview in Arabic (مقابلة عمل)",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "🏢",
    "scenario": "You are attending a job interview with a regional director in Riyadh.",
    "starterPrompt": "أهلاً وسهلاً بك في شركتنا. هل يمكنك أن تعطينا نبذة مختصرة عن نفسك وخبرتك؟",
    "starterQuestions": [
      "ما هي أهم إنجازاتك في وظيفتك السابقة؟"
    ]
  },
  {
    "id": "ta_1",
    "title": "Ordering Dosa & Filter Coffee in Chennai",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "☕",
    "scenario": "You are having breakfast at a popular South Indian restaurant.",
    "starterPrompt": "வணக்கம்! என்ன சாப்பிடறீங்க? சூடான மசால் தோசையும் பில்டர் காப்பியும் ரெடியா இருக்கு!",
    "starterQuestions": [
      "தேங்காய் சட்னி, காரச் சட்னி வைக்கட்டுமா?"
    ]
  },
  {
    "id": "ta_2",
    "title": "Taking an Auto-Rickshaw (Tuk-Tuk) in Colombo",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Transport",
    "icon": "🛺",
    "scenario": "You are hiring an auto-rickshaw to travel across town.",
    "starterPrompt": "வணக்கம் அண்ணா! எங்க போகணும்? மீட்டர் போடுறேன், வாங்க ஏறுங்க!",
    "starterQuestions": [
      "கொழும்பு போர்ட் பக்கமா, இல்ல வெள்ளவத்தையா?"
    ]
  },
  {
    "id": "ta_3",
    "title": "Talking About Cricket: World Cup & IPL",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "You are chatting passionately about cricket and favorite players with a friend.",
    "starterPrompt": "வணக்கம் நண்பா! நேத்து மேட்ச் பாத்தீங்களா? கடைசி ஓவர் வரைக்கும் பயங்கர திரில்லிங்கா போச்சு!",
    "starterQuestions": [
      "உங்களுக்கு பிடிச்ச கிரிக்கெட் பிளேயர் யார்?"
    ]
  },
  {
    "id": "ta_4",
    "title": "Tech Job Interview in Tamil (நேர்காணல்)",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "💼",
    "scenario": "You are having a professional job interview in Tamil.",
    "starterPrompt": "வணக்கம்! நேர்காணலுக்கு வந்ததுக்கு நன்றி. உங்களைப் பத்தியும் உங்க வேலை அனுபவம் பத்தியும் கொஞ்சம் சொல்லுங்க.",
    "starterQuestions": [
      "உங்களுடைய பலம் மற்றும் லட்சியம் என்ன?"
    ]
  },
  {
    "id": "jp_9",
    "title": "Sumo Wrestling Tournament in Ryogoku",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Sumo",
    "icon": "🤼",
    "scenario": "You are watching the Grand Sumo Tournament at Ryogoku Kokugikan in Tokyo.",
    "starterPrompt": "こんにちは！国技館の熱気はすごいですね！大相撲を見るのは初めてですか？お気に入りの力士はいますか？",
    "starterQuestions": [
      "横綱の取組が楽しみですね！"
    ]
  },
  {
    "id": "jp_10",
    "title": "Climbing Mount Fuji: Trail Advice",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Adventure",
    "icon": "🗻",
    "scenario": "You are discussing climbing routes and gear at a Mount Fuji mountain lodge.",
    "starterPrompt": "お疲れ様です！富士山頂までの道のりは順調ですか？ご来光（朝日）を見る予定ですか？",
    "starterQuestions": [
      "高山病の症状は大丈夫ですか？"
    ]
  },
  {
    "id": "jp_11",
    "title": "Sushi Bar Omakase in Ginza",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Sushi",
    "icon": "🍣",
    "scenario": "You are seated at an authentic Ginza sushi counter ordering omakase from the master chef.",
    "starterPrompt": "いらっしゃいませ。本日の一番おすすめは豊洲直送の本マグロです。わさびはお入れしてよろしいですか？",
    "starterQuestions": [
      "苦手なネタやアレルギーはございますか？"
    ]
  },
  {
    "id": "jp_12",
    "title": "Izakaya Night: Ordering Yakitori & Drinks",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Izakaya",
    "icon": "🍶",
    "scenario": "You are enjoying an evening dinner with coworkers at a lively Japanese pub.",
    "starterPrompt": "お疲れ様でした！とりあえず生ビールで乾杯しましょうか？焼き鳥はタレと塩、どちらにしますか？",
    "starterQuestions": [
      "おすすめの枝豆と唐揚げも頼みますか？"
    ]
  },
  {
    "id": "jp_13",
    "title": "Renting a Kimono in Gion, Kyoto",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Culture",
    "icon": "👘",
    "scenario": "You are selecting and renting a traditional kimono for a stroll around Kyoto shrines.",
    "starterPrompt": "いらっしゃいませ！京都の散策にぴったりの着物が揃っていますよ。どんな色や柄がお好みですか？",
    "starterQuestions": [
      "帯の色はどちらを合わせましょうか？"
    ]
  },
  {
    "id": "jp_14",
    "title": "Job Interview at a Tokyo Tech Startup",
    "language": "Japanese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Interview",
    "icon": "💼",
    "scenario": "You are interviewing for a software engineering position in Tokyo.",
    "starterPrompt": "本日は面接にお越しいただきありがとうございます。まずは簡単に自己紹介と職務経歴をお願いできますか？",
    "starterQuestions": [
      "弊社のプロダクトに興味を持った理由は何ですか？"
    ]
  },
  {
    "id": "jp_15",
    "title": "Asking for Directions in Shibuya Scramble",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Directions",
    "icon": "🚦",
    "scenario": "You are asking a friendly Tokyo local for directions to Shibuya Sky observatory.",
    "starterPrompt": "すみません、道に迷ってしまったようですね！どちらに行きたいですか？渋谷スカイの展望台ですか？",
    "starterQuestions": [
      "ハチ公口の改札から行きますか？"
    ]
  },
  {
    "id": "jp_16",
    "title": "Visiting a Shinto Shrine: Temizuya & Prayers",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Tradition",
    "icon": "⛩️",
    "scenario": "A Japanese friend is showing you how to wash hands at temizuya and pray (2 bows, 2 claps, 1 bow).",
    "starterPrompt": "神社へようこそ！お参りの前に手水舎で手と口を清めましょう。二礼二拍手一礼のやり方を知っていますか？",
    "starterQuestions": [
      "おみくじを引いて運勢を占ってみますか？"
    ]
  },
  {
    "id": "jp_17",
    "title": "Singing Karaoke with Friends in Shinjuku",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Entertainment",
    "subCategory": "Karaoke",
    "icon": "🎤",
    "scenario": "You are at a karaoke box in Shinjuku picking songs and ordering drinks.",
    "starterPrompt": "カラオケルームに到着しました！飲み放題にしますか？最初に歌いたい曲は決まりましたか？",
    "starterQuestions": [
      "J-POPやアニメソングは歌えますか？"
    ]
  },
  {
    "id": "jp_18",
    "title": "Doctor Visit: Describing Cold & Fever Symptoms",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "Health",
    "icon": "🏥",
    "scenario": "You are explaining your symptoms to a doctor at a Tokyo medical clinic.",
    "starterPrompt": "こんにちは。今日はどうされましたか？いつから熱や咳の症状がありますか？",
    "starterQuestions": [
      "喉の痛みや頭痛はありますか？"
    ]
  },
  {
    "id": "jp_19",
    "title": "Buying Souvenirs (Omiyage) at Haneda Airport",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Shopping",
    "icon": "🎁",
    "scenario": "You are shopping for popular Japanese snacks like Tokyo Banana and matcha sweets before flight.",
    "starterPrompt": "東京のお土産はいかがですか？東京ばな奈や抹茶のお菓子が一番人気ですよ。プレゼント用にお包みしますか？",
    "starterQuestions": [
      "賞味期限はいつまでかご確認しますか？"
    ]
  },
  {
    "id": "jp_20",
    "title": "Japanese Tea Ceremony (Sadou) & Matcha",
    "language": "Japanese",
    "level": "Advanced",
    "category": "Social",
    "subCategory": "Culture",
    "icon": "🍵",
    "scenario": "You are attending a serene traditional matcha tea ceremony with a tea master in Kyoto.",
    "starterPrompt": "一期一会の茶会へようこそ。まずは季節の和菓子をお召し上がりください。お茶の味はいかがですか？",
    "starterQuestions": [
      "茶碗を二度回す作法をご知っていますか？"
    ]
  },
  {
    "id": "es_8",
    "title": "Ordering Tapas & Paella at a Madrid Plaza",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Tapas",
    "icon": "🥘",
    "scenario": "You are sitting at an outdoor terrace in Plaza Mayor, Madrid, ordering delicious tapas, sangría, and seafood paella.",
    "starterPrompt": "¡Buenas tardes! Bienvenido a nuestra terraza en Madrid. ¿Le gustaría empezar con unas tapas de jamón ibérico o prefiere ver la carta de paellas?",
    "starterQuestions": [
      "¿Tienen opciones vegetarianas?"
    ]
  },
  {
    "id": "es_9",
    "title": "El Clásico & Football Passion in Barcelona",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Fútbol",
    "icon": "⚽",
    "scenario": "You are discussing the exciting El Clásico derby with a passionate Spanish football supporter at a sports bar.",
    "starterPrompt": "¡Hola amigo! El partido de anoche estuvo increíble. ¿A qué equipo apoyas en La Liga, al Real Madrid o al Barcelona?",
    "starterQuestions": [
      "¿Quién crees que ganará el campeonato este año?"
    ]
  },
  {
    "id": "es_10",
    "title": "Checking In at an Andalusian Boutique Hotel",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You have just arrived at a historic hotel in Seville and are checking into your room with the receptionist.",
    "starterPrompt": "¡Bienvenido a Sevilla! Tengo una reserva confirmada a su nombre. ¿Desea una habitación con vista al patio andaluz?",
    "starterQuestions": [
      "¿A qué hora se sirve el desayuno?"
    ]
  },
  {
    "id": "es_11",
    "title": "Job Interview for a Bilingual Tech Consultant",
    "language": "Spanish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Entrevista",
    "icon": "💼",
    "scenario": "You are interviewing for an international tech consultancy position with a hiring manager in Mexico City.",
    "starterPrompt": "Estimado candidato, gracias por conectarse. Cuéntenos, ¿cuál ha sido el proyecto tecnológico más desafiante que ha liderado con éxito?",
    "starterQuestions": [
      "¿Cómo gestiona equipos multiculturales y remotos?"
    ]
  },
  {
    "id": "es_12",
    "title": "Exploring AI Innovations & Hispanic Tech Startups",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "Tecnología",
    "icon": "🤖",
    "scenario": "You are having a forward-looking conversation about artificial intelligence and voice coaches at an innovation summit.",
    "starterPrompt": "¡Qué tal! La inteligencia artificial está transformando la educación y la comunicación. ¿Cómo cree que la IA híbrida mejorará el aprendizaje de idiomas?",
    "starterQuestions": [
      "¿Qué herramientas de IA utiliza regularmente?"
    ]
  },
  {
    "id": "kr_11",
    "title": "Korean BBQ (Samgyeopsal) & Table Etiquette",
    "language": "Korean",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "K-Food",
    "icon": "🥩",
    "scenario": "You are grilling pork belly (samgyeopsal) with a Korean friend at a lively Seoul BBQ restaurant.",
    "starterPrompt": "어서오세요! 삼겹살 2인분 먼저 올려드릴게요. 쌈장과 마늘 넣어서 쌈 싸 드시는 법 아시나요?",
    "starterQuestions": [
      "된장찌개나 냉면도 같이 주문할까요?"
    ]
  },
  {
    "id": "kr_12",
    "title": "Riding the KTX Bullet Train to Busan",
    "language": "Korean",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "KTX",
    "icon": "🚅",
    "scenario": "You are boarding the high-speed KTX train at Seoul Station headed for Haeundae Beach in Busan.",
    "starterPrompt": "부산행 KTX 열차에 탑승하셨군요! 창가 쪽 좌석이 편안하신가요? 부산에 도착하면 가장 먼저 어디에 가실 계획이신가요?",
    "starterQuestions": [
      "해운대 해수욕장이나 자갈치 시장에 가보셨나요?"
    ]
  },
  {
    "id": "kr_13",
    "title": "Job Interview at a Pangyo Tech Valley Startup",
    "language": "Korean",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "면접",
    "icon": "💼",
    "scenario": "You are having an interview for an AI software engineering position in South Korea's Pangyo Silicon Valley.",
    "starterPrompt": "판교 테크노밸리 면접에 참석해 주셔서 감사합니다. 지원자님께서 최근에 개발하신 인공지능 프로젝트 경험에 대해 말씀해 주시겠어요?",
    "starterQuestions": [
      "협업 과정에서 발생한 기술적 문제를 어떻게 해결하셨나요?"
    ]
  },
  {
    "id": "kr_14",
    "title": "Visiting a Traditional Hanok Cafe in Bukchon",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "You are relaxing in a serene Bukchon Hanok village tea house chatting about Korean culture and architecture.",
    "starterPrompt": "북촌 한옥마을 분위기가 정말 고즈넉하죠? 따뜻한 오미자차 한 잔 어떠세요? 한국 전통 가옥에 대해 어떻게 생각하시나요?",
    "starterQuestions": [
      "한국 전통 다과인 약과나 한과를 드셔보셨나요?"
    ]
  },
  {
    "id": "kr_15",
    "title": "Fitness Routine & Gym Training in Gangnam",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "헬스",
    "icon": "🏋️",
    "scenario": "You are discussing workout split routines and health goals with a friendly personal trainer in Gangnam.",
    "starterPrompt": "안녕하세요! 강남 피트니스 센터에 오신 것을 환영합니다. 평소에 웨이트 트레이닝과 유산소 운동 중 어떤 것을 즐겨 하시나요?",
    "starterQuestions": [
      "하루에 물과 단백질을 얼마나 섭취하시나요?"
    ]
  },
  {
    "id": "ar_7",
    "title": "Traditional Shawarma & Arabic Coffee (Qahwa)",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "مطاعم",
    "icon": "☕",
    "scenario": "You are ordering hot Arabic shawarma with garlic toum and cardamom-infused Arabic coffee at a popular cafe.",
    "starterPrompt": "أهلاً وسهلاً بك في مطعمنا! هل تفضل شاورما الدجاج أم شاورما اللحم مع صلصة الثوم؟ وما رأيك في فنجان قهوة عربية بالهيل؟",
    "starterQuestions": [
      "هل تحب الأطباق العربية التقليدية مثل الحمص والتبولة؟"
    ]
  },
  {
    "id": "ar_8",
    "title": "Navigating Dubai International Airport & Metro",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "سفر",
    "icon": "✈️",
    "scenario": "You are asking customer service at Dubai Airport about connecting baggage and the Dubai Metro Red Line.",
    "starterPrompt": "مرحباً بك في دبي! كيف يمكنني مساعدتك في رحلتك اليوم؟ هل تبحث عن بوابة المغادرة أم تريد ركوب مترو دبي؟",
    "starterQuestions": [
      "كم من الوقت يستغرق الوصول إلى برج خليفة؟"
    ]
  },
  {
    "id": "ar_9",
    "title": "Football Passion & World Cup Memories",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "كرة القدم",
    "icon": "⚽",
    "scenario": "You are chatting with an enthusiastic Arab sports fan about historic World Cup matches and local football leagues.",
    "starterPrompt": "يا هلا والله! كرة القدم هي شغف الملايين في العالم العربي. ما هي أفضل مباراة شاهدتها في كأس العالم؟",
    "starterQuestions": [
      "من هو أفضل لاعب عربي في رأيك، محمد صلاح أم رياض محرز؟"
    ]
  },
  {
    "id": "ar_10",
    "title": "Business Meeting & Tech Startup Pitch",
    "language": "Arabic",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "أعمال",
    "icon": "💼",
    "scenario": "You are presenting an AI innovation project to Arab business executives and investors in Riyadh.",
    "starterPrompt": "السلام عليكم ورحمة الله. يشرفنا لقاؤك اليوم لبحث فرص الاستثمار والابتكار في مجال الذكاء الاصطناعي. تفضل بتقديم عرضك.",
    "starterQuestions": [
      "ما هي الميزة التنافسية لمنتجك في السوق الخليجي؟"
    ]
  },
  {
    "id": "ar_11",
    "title": "Shopping for Spices & Perfumes at the Souq",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "تسوق",
    "icon": "🛍️",
    "scenario": "You are browsing a historic old town market (Souq) bargaining for saffron, oud perfume, and dates.",
    "starterPrompt": "يا هلا ومرحبا! تفضل جرب هذا العود الملكي المميز وزعفران الدرجة الأولى. ما الذي تبحث عنه اليوم؟",
    "starterQuestions": [
      "كم سعر هذا العطر التراثي؟"
    ]
  },
  {
    "id": "ta_7",
    "title": "Crispy Ghee Roast Dosa & Filter Coffee",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "உணவு",
    "icon": "☕",
    "scenario": "You are enjoying morning breakfast at a bustling Chennai restaurant ordering hot ghee roast and filter coffee.",
    "starterPrompt": "வணக்கம்! காலை உணவு சாப்பிட வந்திருக்கீங்களா? சூடான நெய் ரோஸ்ட் தோசையும் டிகிரி பில்டர் காப்பியும் கொண்டு வரவா?",
    "starterQuestions": [
      "சாம்பார், தக்காளி சட்னி, தேங்காய் சட்னி எல்லாம் பிடிக்குமா?"
    ]
  },
  {
    "id": "ta_8",
    "title": "Chennai Super Kings (CSK) & IPL Passion",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "கிரிக்கெட்",
    "icon": "🏏",
    "scenario": "You are having an energetic chat with a die-hard cricket fan about Chepauk Stadium and CSK matches.",
    "starterPrompt": "விசில் போடு! சேப்பாக்கம் மைதானத்தில் சிஎஸ்கே (CSK) மேட்ச் பார்க்க போறது எப்பவுமே சிலிர்ப்பா இருக்கும். உங்களுக்கு தோனி பிடிக்குமா?",
    "starterQuestions": [
      "இந்த சீசன்ல கப் ஜெயிக்க வாய்ப்பு யாருக்கு இருக்கு?"
    ]
  },
  {
    "id": "ta_9",
    "title": "Scenic Mountain Train Journey to Ooty",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "பயணம்",
    "icon": "🚂",
    "scenario": "You are traveling on the famous Nilgiri Mountain toy train enjoying misty tea gardens and mountain air.",
    "starterPrompt": "வணக்கம்! நீலகிரி மலை ரயிலில் பயணம் செய்வது எவ்வளவு அருமையா இருக்கு பாருங்க! ஊட்டியில் என்னென்ன இடங்களை பார்க்க போறீங்க?",
    "starterQuestions": [
      "தேயிலைத் தோட்டம் மற்றும் ஏரிக்கு போகப் போறீங்களா?"
    ]
  },
  {
    "id": "ta_10",
    "title": "Software Engineer Tech Interview at Tidel Park",
    "language": "Tamil",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "நேர்காணல்",
    "icon": "💼",
    "scenario": "You are participating in a technical discussion and code review with a senior software architect in Chennai.",
    "starterPrompt": "வணக்கம், எங்கள் நிறுவனத்தின் தொழில்நுட்ப நேர்காணலுக்கு நல்வரவு. உங்களுடைய முந்தைய மென்பொருள் திட்டங்கள் பற்றி சுருக்கமாக கூறுங்கள்.",
    "starterQuestions": [
      "பெரிய அளவிலான சிஸ்டம் வடிவமைப்பில் நீங்கள் எதிர்கொண்ட சவால் என்ன?"
    ]
  },
  {
    "id": "ta_11",
    "title": "Shopping for Silk & Festive Wear in T. Nagar",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "ஷாப்பிங்",
    "icon": "🛍️",
    "scenario": "You are shopping for traditional silk attire and festive gifts on Chennai's lively shopping streets.",
    "starterPrompt": "வணக்கம் வாங்க! தீபாவளி மற்றும் விசேஷங்களுக்கு ஏற்ற அழகிய பட்டுப் புடவைகளும் ஆடைகளும் இருக்கு. உங்களுக்கு எந்த நிறம் பிடிக்கும்?",
    "starterQuestions": [
      "பாரம்பரிய காஞ்சிபுரம் பட்டு ஆடைகளை பார்க்க விரும்புறீங்களா?"
    ]
  },
  {
    "id": "en_new_1",
    "title": "Ordering Specialty Coffee from an Artisan Barista",
    "language": "English",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Coffee",
    "icon": "☕",
    "scenario": "You are visiting a third-wave artisan coffee roastery selecting single-origin beans and brewing style.",
    "starterPrompt": "Good morning! Welcome to our craft roastery. Are you in the mood for an espresso-based drink like a flat white, or a pour-over brew?",
    "starterQuestions": [
      "Do you prefer fruity Ethiopian notes or chocolaty Colombian roasts?"
    ]
  },
  {
    "id": "en_new_2",
    "title": "London Underground Tube & City Sightseeing",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Transit",
    "icon": "🚇",
    "scenario": "You are navigating the London Underground Tube station asking a transit assistant for line transfers to Big Ben.",
    "starterPrompt": "Mind the gap! Welcome to central London. Are you trying to reach Westminster for Big Ben, or heading towards the Tower of London?",
    "starterQuestions": [
      "Do you have a contactless payment card for the turnstile?"
    ]
  },
  {
    "id": "en_new_3",
    "title": "Pitching an AI Voice Agent to Silicon Valley Investors",
    "language": "English",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Startup Pitch",
    "icon": "🚀",
    "scenario": "You are pitching SpeakFlow AI's hybrid on-device voice architecture to venture capital partners in San Francisco.",
    "starterPrompt": "Thanks for having us! We built SpeakFlow AI to eliminate latency and cloud costs by combining on-device neural TTS with Gemini AI. What metrics would you like us to walk through first?",
    "starterQuestions": [
      "How does your hybrid model reduce cloud API expenses at scale?"
    ]
  },
  {
    "id": "en_new_4",
    "title": "NBA Basketball Championship Finals Debate",
    "language": "English",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Basketball",
    "icon": "🏀",
    "scenario": "You are breaking down game-winning buzzer-beaters and playoff predictions with fellow basketball fans.",
    "starterPrompt": "What an unbelievable fourth quarter comeback last night! Did you see that clutch three-pointer in the final seconds?",
    "starterQuestions": [
      "Who do you think deserves the Finals MVP award this season?"
    ]
  },
  {
    "id": "en_new_5",
    "title": "The Future of Autonomous AI & Robotics",
    "language": "English",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "AI & Robotics",
    "icon": "🤖",
    "scenario": "You are having a deep philosophical and technical debate with an AI robotics engineer about artificial general intelligence.",
    "starterPrompt": "The speed of AI progress over the last two years has been breathtaking. In your view, will humanoid robots become common household companions within this decade?",
    "starterQuestions": [
      "What safety guardrails are most critical as autonomous systems advance?"
    ]
  },
  {
    "id": "jp_new_1",
    "title": "Akihabara Retro Gaming & Anime Collectibles",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Entertainment",
    "subCategory": "Gaming",
    "icon": "🎮",
    "scenario": "You are browsing vintage Nintendo games and anime figures in a multi-story hobby shop in Akihabara, Tokyo.",
    "starterPrompt": "いらっしゃいませ！秋葉原のレトロゲームコーナーへようこそ。ファミコンやゲームボーイのソフトをお探しですか？",
    "starterQuestions": [
      "子どもの頃に遊んだ思い出のゲームは何ですか？"
    ]
  },
  {
    "id": "jp_new_2",
    "title": "Selecting Shinkansen Ekiben Lunchbox at Tokyo Station",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Shinkansen",
    "icon": "🚄",
    "scenario": "You are choosing a famous regional bento box (Ekiben) before boarding the bullet train to Kyoto.",
    "starterPrompt": "新幹線のご旅行ですね！駅弁屋では全国のご当地弁当が200種類以上揃っています。海鮮弁当とお肉の弁当、どちらが気になりますか？",
    "starterQuestions": [
      "温かいお茶とお手拭きはお付けしますか？"
    ]
  },
  {
    "id": "jp_new_3",
    "title": "Late-Night Tonkotsu Ramen Counter Order",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Ramen",
    "icon": "🍜",
    "scenario": "You are customizing your noodle firmness and broth richness at an authentic Fukuoka-style ramen counter.",
    "starterPrompt": "へい、いらっしゃい！とんこつラーメンですね。麺の硬さは「かため」「バリカタ」どちらにしましょうか？ニンニクはお入れしますか？",
    "starterQuestions": [
      "替え玉（追加の麺）や味付け煮玉子はいかがですか？"
    ]
  },
  {
    "id": "food_en_1",
    "title": "Artisan Pizza & Craft Gelato in Little Italy",
    "language": "English",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Italian",
    "icon": "🍕",
    "scenario": "You are ordering wood-fired Margherita pizza and authentic pistachio gelato in a lively Italian trattoria.",
    "starterPrompt": "Welcome to our trattoria! The wood-fired oven is roaring hot. Are you in the mood for our classic Margherita or a spicy diavola pizza today?",
    "starterQuestions": [
      "Do you prefer thin crispy crust or Neapolitan style dough?"
    ]
  },
  {
    "id": "food_en_2",
    "title": "Burgers, BBQ Ribs & Smokey Brisket at Texas Grill",
    "language": "English",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "BBQ",
    "icon": "🍔",
    "scenario": "You are selecting hickory-smoked ribs, brisket, and custom cheeseburgers at a bustling Texas smokehouse.",
    "starterPrompt": "Howdy partner! Everything here is smoked low and slow for 14 hours. Would you like a half-rack of ribs or our double brisket smashburger?",
    "starterQuestions": [
      "Do you like sweet barbecue sauce or tangy mustard glaze?"
    ]
  },
  {
    "id": "food_en_3",
    "title": "Michelin Fine Dining & 5-Course Wine Pairing",
    "language": "English",
    "level": "Advanced",
    "category": "Food",
    "subCategory": "Fine Dining",
    "icon": "🍷",
    "scenario": "You are conversing with a distinguished sommelier during an upscale tasting menu dinner.",
    "starterPrompt": "Good evening. For your second course featuring seared scallops, our sommelier recommends a crisp Chablis. May I pour a taste for you?",
    "starterQuestions": [
      "Do you lean towards mineral-driven whites or rich oaky Chardonnays?"
    ]
  },
  {
    "id": "food_en_4",
    "title": "Sushi Conveyor Belt (Kaitenzushi) Ordering",
    "language": "English",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Sushi",
    "icon": "🍣",
    "scenario": "You are seated at a bustling conveyor belt sushi bar ordering freshly torched salmon and miso soup.",
    "starterPrompt": "Welcome! You can grab any color-coded plate from the belt or order fresh rolls directly from the digital screen. What are you craving first?",
    "starterQuestions": [
      "Do you like salmon nigiri or spicy tuna rolls?"
    ]
  },
  {
    "id": "food_en_5",
    "title": "Vegan Cafe & Gluten-Free Plant-Based Bowls",
    "language": "English",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Healthy Food",
    "icon": "🥗",
    "scenario": "You are customizing an organic acai bowl with chia seeds and almond butter at an eco-friendly wellness cafe.",
    "starterPrompt": "Hello there! All our grain bowls and smoothies are 100% organic and dairy-free. Would you like our matcha power bowl or tropical dragonfruit bowl?",
    "starterQuestions": [
      "Which plant-based milk do you prefer, oat, almond, or coconut?"
    ]
  },
  {
    "id": "food_en_6",
    "title": "Baking French Pastries & Croissants with a Chef",
    "language": "English",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Bakery",
    "icon": "🥐",
    "scenario": "You are participating in a pastry masterclass learning the art of laminated dough and pain au chocolat.",
    "starterPrompt": "Bonjour! The secret to flaky French croissants is maintaining proper butter lamination and temperature. Ready to fold your first pastry dough?",
    "starterQuestions": [
      "Have you ever baked with yeast dough before?"
    ]
  },
  {
    "id": "food_es_1",
    "title": "Churros con Chocolate en una Chocolatería Tradicional",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Churros",
    "icon": "☕",
    "scenario": "You are ordering freshly fried churros and thick dipping chocolate at a historic café in Madrid.",
    "starterPrompt": "¡Buenos días! Nada como unos churros crujientes con chocolate caliente para empezar la mañana. ¿Cuántos churros o porras le gustaría pedir?",
    "starterQuestions": [
      "¿Prefiere el chocolate espeso o más ligero?"
    ]
  },
  {
    "id": "food_es_2",
    "title": "Mercado Gastronómico: Degustación de Quesos y Jamón Serrano",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Mercado",
    "icon": "🧀",
    "scenario": "You are touring a bustling covered food market sampling cured Manchego cheeses and vintage wines.",
    "starterPrompt": "¡Hola! Este queso manchego curado tiene más de doce meses de maduración. Pruébelo con esta rebanada de pan con tomate, ¿qué le parece el sabor?",
    "starterQuestions": [
      "¿Prefiere quesos suaves o con sabor más intenso?"
    ]
  },
  {
    "id": "food_es_3",
    "title": "Tacos Al Pastor y Guacamole en una Taquería de Barrio",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Tacos",
    "icon": "🌮",
    "scenario": "You are ordering marinated pork tacos with pineapple, cilantro, and fresh salsa verde at a neighborhood taqueria.",
    "starterPrompt": "¡Pásele, güero! ¿Cuántos de pastor le servimos? Salen con piña, cebollita y cilantro. ¿Le pone salsa verde o de la que pica más?",
    "starterQuestions": [
      "¿Prefiere tortillas de maíz o de harina?"
    ]
  },
  {
    "id": "food_kr_1",
    "title": "Tteokbokki & Kimbap at a Lively Pocha Street Stall (포장마차)",
    "language": "Korean",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "분식",
    "icon": "🍢",
    "scenario": "You are enjoying spicy rice cakes (tteokbokki) and warm fish cake broth at a bustling street food tent in Seoul.",
    "starterPrompt": "어서오세요! 날씨가 쌀쌀한데 따뜻한 어묵 국물 먼저 한 컵 드세요. 매콤한 떡볶이랑 바삭한 튀김 같이 드릴까요?",
    "starterQuestions": [
      "매운 음식 잘 드시나요? (Can you handle spicy food?)"
    ]
  },
  {
    "id": "food_kr_2",
    "title": "Crispy Chimaek: Korean Fried Chicken & Draft Beer (치맥)",
    "language": "Korean",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "치맥",
    "icon": "🍗",
    "scenario": "You are enjoying an evening feast of double-fried Korean garlic soy chicken and draft beer with friends along the Han River.",
    "starterPrompt": "한강에서 치맥(치킨과 맥주)하기 딱 좋은 저녁이네요! 바삭한 후라이드와 달콤한 양념 반반으로 주문할까요?",
    "starterQuestions": [
      "시원한 생맥주도 같이 주문할까요? (Shall we order cold draft beer together?)"
    ]
  },
  {
    "id": "food_kr_3",
    "title": "Traditional Kimchi Making (Kimjang) Experience",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "김치",
    "icon": "🥬",
    "scenario": "You are participating in a hands-on cultural workshop seasoning salted napa cabbage with red chili paste and garlic.",
    "starterPrompt": "김장 체험에 오신 것을 환영합니다! 절인 배추 잎 사이사이에 양념 속을 골고루 바르는 것이 핵심이에요. 손맛을 한번 내보실까요?",
    "starterQuestions": [
      "갓 담근 배추김치 맛이 어떠세요? (How does the freshly made kimchi taste?)"
    ]
  },
  {
    "id": "food_ar_1",
    "title": "Majlis Feast: Traditional Mandi & Biryani with Lamb",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "مندي",
    "icon": "🍗",
    "scenario": "You are seated on traditional carpets at an authentic Arabian restaurant sharing a large platter of slow-roasted spiced lamb mandi.",
    "starterPrompt": "حيّاك الله في مجلسنا! اليوم أعددنا مندي لحم طازج مدفون في التنور. هل تحب الأرز البسمتي مع المكسرات والزبيب وصلصة الدقوس الحارة؟",
    "starterQuestions": [
      "هل جربت المندي التقليدي من قبل؟"
    ]
  },
  {
    "id": "food_ar_2",
    "title": "Lebanese Mezze: Hummus, Mutabbal & Hot Fresh Pita",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "مقبلات",
    "icon": "🫓",
    "scenario": "",
    "starterPrompt": "",
    "starterQuestions": []
  },
  {
    "id": "food_ar_3",
    "title": "Sweet Baklava & Pistachio Kunafa at an Oriental Sweet Shop",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "حلويات",
    "icon": "🍯",
    "scenario": "You are selecting freshly baked cheese kunafa with sugar syrup and pistachio baklava at a celebrated pastry shop.",
    "starterPrompt": "يا مئة أهلاً وسهلاً! كنافة الجبن النابلسية الساخنة خرجت لتوها من الفرن ومعطرة بماء الزهر. هل نضع عليها فستق حلبي مطحون وقطر خفيف؟",
    "starterQuestions": [
      "هل تحب الكنافة الخشنة أم الناعمة بالجبن؟"
    ]
  },
  {
    "id": "food_ta_1",
    "title": "Chettinad Spicy Pepper Chicken & Parotta Feast",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "செட்டிநாடு",
    "icon": "🍗",
    "scenario": "You are dining at an authentic Tamil restaurant ordering flaky layered parotta and spicy Chettinad pepper chicken gravy.",
    "starterPrompt": "வணக்கம்! செட்டிநாடு ஸ்பெஷல் மிளகு சிக்கன் மற்றும் மொறுமொறு புரோட்டா ரெடியா இருக்கு. எவ்வளவு புரோட்டா சாப்பிட ஆசைப்படுறீங்க?",
    "starterQuestions": [
      "சால்னா ஊற்றி பிசைந்து சாப்பிட பிடிக்குமா?"
    ]
  },
  {
    "id": "food_ta_2",
    "title": "Madurai Famous Jigarthanda & Street Sweets",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "ஜிகர்தண்டா",
    "icon": "🍧",
    "scenario": "You are refreshing yourself on a hot evening with a cold glass of famous Madurai Jigarthanda with almond gum and ice cream.",
    "starterPrompt": "வணக்கம்! மதுரை பாரம்பரிய ஸ்பெஷல் ஜிகர்தண்டா குடிக்க வந்திருக்கீங்களா? பாதாம் பிசின், பால்கோவா மற்றும் ஐஸ்கிரீம் போட்டு ஸ்பெஷலா தரவா?",
    "starterQuestions": [
      "குளிர்ச்சியான ஜிகர்தண்டா சுவை எப்படி இருக்கு?"
    ]
  },
  {
    "id": "food_ta_3",
    "title": "Traditional South Indian Banana Leaf Rice Meal (சாப்பாடு)",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "சாப்பாடு",
    "icon": "🍛",
    "scenario": "You are experiencing an elaborate traditional South Indian feast served on a fresh green banana leaf with sambar, rasam, and payasam.",
    "starterPrompt": "வாழை இலை விருந்துக்கு நல்வரவு! இலை நுனியில் உப்பு, ஊறுகாய், பாயாசம் வச்சிருக்கோம். சூடான சாதத்தில் நெய் ஊற்றி சாம்பார் விடவா?",
    "starterQuestions": [
      "கூட்டு, பொரியல், அப்பளம் எல்லாம் போதுமானதா இருக்கா?"
    ]
  },
  {
    "id": "food_jp_1",
    "title": "Matcha Parfait & Dango at a Uji Green Tea Cafe",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "甘味",
    "icon": "🍡",
    "scenario": "You are enjoying traditional matcha desserts and sweet soy glazed dango in a historic Kyoto tea garden.",
    "starterPrompt": "いらっしゃいませ。宇治抹茶を贅沢に使った特製抹茶パフェと、焼きたてのみたらし団子はいかがですか？甘さ控えめで人気ですよ。",
    "starterQuestions": [
      "温かいほうじ茶もお持ちしましょうか？"
    ]
  },
  {
    "id": "food_jp_2",
    "title": "Teppanyaki Master Grill: Wagyu Beef Performance",
    "language": "Japanese",
    "level": "Advanced",
    "category": "Food",
    "subCategory": "鉄板焼き",
    "icon": "🥩",
    "scenario": "You are sitting in front of a master teppanyaki chef watching theatrical flame grilling of A5 Kobe Wagyu beef.",
    "starterPrompt": "今晩は。本日のメインは厳選されたA5ランクの神戸牛サーロインでございます。焼き加減はミディアムレアでよろしいでしょうか？",
    "starterQuestions": [
      "わさび塩と特製ガーリックチップ、どちらで召し上がりますか？"
    ]
  },
  {
    "id": "travel_en_1",
    "title": "Airport Lost Baggage Claim & Flight Rebooking",
    "language": "English",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Airport",
    "icon": "🧳",
    "scenario": "You are speaking with an airline baggage assistance agent filing a missing luggage report and confirming your hotel delivery.",
    "starterPrompt": "Hello! I understand your connecting bag did not appear on the carousel. Do you have your baggage claim tag so I can trace it in our global system?",
    "starterQuestions": [
      "Can you describe the color and brand of your suitcase?"
    ]
  },
  {
    "id": "travel_en_2",
    "title": "Booking an Island Scuba Diving & Coral Reef Tour",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Adventure",
    "icon": "🤿",
    "scenario": "You are inquiring about introductory scuba diving certifications and sea turtle snorkeling trips at an island dive shop.",
    "starterPrompt": "Hey there! Welcome to tropical paradise. The sea conditions are crystal clear today. Are you a certified diver or looking to try a beginner discover dive?",
    "starterQuestions": [
      "Have you ever snorkeled or used scuba gear before?"
    ]
  },
  {
    "id": "travel_en_3",
    "title": "Renting an RV Campervan for a National Park Road Trip",
    "language": "English",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Road Trip",
    "icon": "🚐",
    "scenario": "You are picking up a campervan at an outdoor rental depot reviewing generator usage, campsite hookups, and GPS maps.",
    "starterPrompt": "Welcome! Your four-berth campervan is fully inspected and prepped for the highway. Have you ever driven a vehicle of this size before?",
    "starterQuestions": [
      "Do you have reservations at national park campgrounds with electric hookups?"
    ]
  },
  {
    "id": "travel_en_4",
    "title": "Checking into a Luxury Mountain Ski Chalet",
    "language": "English",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Ski Resort",
    "icon": "🎿",
    "scenario": "You are checking into an Alpine ski lodge inquiring about lift passes, heated ski lockers, and shuttle routes to the slopes.",
    "starterPrompt": "Welcome to the lodge! The mountain received 20 inches of fresh powder overnight. Would you like us to activate your multi-day ski lift passes now?",
    "starterQuestions": [
      "Do you need rental equipment like skis, boots, or helmets?"
    ]
  },
  {
    "id": "travel_en_5",
    "title": "Historic European River Cruise & Castle Tour",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Cruise",
    "icon": "🚢",
    "scenario": "You are chatting with the cruise director on the sun deck as your riverboat glides past medieval castles and riverside vineyards.",
    "starterPrompt": "Good afternoon! We are currently cruising through the UNESCO Rhine Valley gorge. Can you spot the medieval hilltop fortress on your right?",
    "starterQuestions": [
      "Are you joining our guided walking tour of the historic town this afternoon?"
    ]
  },
  {
    "id": "travel_en_6",
    "title": "Currency Exchange & Travel Insurance Queries",
    "language": "English",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Finance",
    "icon": "💱",
    "scenario": "You are converting currency at a reputable international exchange kiosk and asking about fee-free ATM withdrawals.",
    "starterPrompt": "Hello! Our foreign currency exchange rates are updated live today. What currency would you like to buy or convert from?",
    "starterQuestions": [
      "Would you prefer a mix of small and large denominations for daily spending?"
    ]
  },
  {
    "id": "travel_es_1",
    "title": "Comprando Billetes de Tren AVE de Alta Velocidad",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Tren AVE",
    "icon": "🚄",
    "scenario": "You are purchasing high-speed AVE train tickets at Madrid Atocha station traveling to Valencia.",
    "starterPrompt": "¡Buenos días! Bienvenido a Renfe. ¿Desea viajar en clase estándar o confort en el tren AVE de alta velocidad? El trayecto dura menos de dos horas.",
    "starterQuestions": [
      "¿Prefiere asiento de ventanilla o de pasillo?"
    ]
  },
  {
    "id": "travel_es_2",
    "title": "Excursión a la Alhambra de Granada con un Guía Local",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Turismo",
    "icon": "🏰",
    "scenario": "You are touring the breathtaking Nasrid Palaces and Generalife gardens of the Alhambra with an art historian guide.",
    "starterPrompt": "¡Bienvenidos a la Alhambra! La arquitectura hispanomusulmana de estos patios y arcos es única en el mundo. ¿Aprecia los detalles tallados en las paredes?",
    "starterQuestions": [
      "¿Tiene sus entradas con acceso a los Palacios Nazaríes?"
    ]
  },
  {
    "id": "travel_es_3",
    "title": "Alquiler de Coche en Mallorca para Recorrer Calas Escondidas",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Playas",
    "icon": "🚗",
    "scenario": "You are picking up a rental car at Palma airport to explore turquoise Mediterranean beaches and mountain coves.",
    "starterPrompt": "¡Hola! Su coche compacto con aire acondicionado está listo en el aparcamiento. ¿Desea incluir seguro a todo riesgo sin franquicia?",
    "starterQuestions": [
      "¿Tiene carnet de conducir internacional válido?"
    ]
  },
  {
    "id": "travel_kr_1",
    "title": "Jeju Island Olle Trail & Sunrise Peak Exploration (제주도 성산일출봉)",
    "language": "Korean",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "제주도",
    "icon": "🏝️",
    "scenario": "You are planning a scenic coastal hike along the Jeju Olle Trail and watching the sunrise over Seongsan Ilchulbong crater.",
    "starterPrompt": "제주도에 오신 것을 진심으로 환영합니다! 푸른 바다와 성산일출봉 풍경이 정말 아름답죠? 올레길 코스를 걸어보실 계획인가요?",
    "starterQuestions": [
      "제주 흑돼지나 신선한 해산물 드셔보셨나요? (Have you tried Jeju black pork or fresh seafood?)"
    ]
  },
  {
    "id": "travel_kr_2",
    "title": "Seoul Subway Transfer & T-Money Card Inquiries (지하철 환승)",
    "language": "Korean",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "지하철",
    "icon": "🚇",
    "scenario": "You are asking station staff at Seoul Station how to reload a T-money transit card and transfer from Line 1 to Line 4.",
    "starterPrompt": "안녕하세요! 지하철 이용에 도움이 필요하신가요? 티머니 교통카드 충전은 저쪽 자동발매기에서 한국어와 영어로 가능합니다. 어디로 가시나요?",
    "starterQuestions": [
      "환승 통로 안내 표지판이 잘 보이시나요? (Can you clearly see the transfer signs?)"
    ]
  },
  {
    "id": "travel_kr_3",
    "title": "Booking a Traditional Hanok Homestay in Jeonju (전주 한옥마을)",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "한옥숙박",
    "icon": "🏮",
    "scenario": "You are checking into an authentic Hanok guesthouse with heated ondol floors in the historic Jeonju Hanok Village.",
    "starterPrompt": "전주 한옥마을 숙소에 도착하셨군요! 바닥에 따뜻한 온돌이 들어와 포근할 거예요. 내일 아침 전주 콩나물국밥이나 비빔밥을 드시겠어요?",
    "starterQuestions": [
      "온돌방에서 요를 깔고 주무시는 것은 처음이신가요? (Is it your first time sleeping on a futon on an ondol floor?)"
    ]
  },
  {
    "id": "travel_ar_1",
    "title": "Desert Safari & Dune Bashing in Arabian Sands",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "سفاري",
    "icon": "🏜️",
    "scenario": "You are joining a 4x4 desert safari tour riding across golden sand dunes, riding camels, and watching the sunset.",
    "starterPrompt": "مرحباً بك في مغامرة الصحراء العربية! سيارة الدفع الرباعي جاهزة لركوب الكثبان الرملية الذهبية. هل أنت مستعد لتجربة حماسية وممتعة؟",
    "starterQuestions": [
      "هل تحب ركوب الجمال والتقاط صور تذكارية مع الصقور؟"
    ]
  },
  {
    "id": "travel_ar_2",
    "title": "Visiting Burj Khalifa Observatory & Dancing Fountains",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "معالم",
    "icon": "🏙️",
    "scenario": "You are standing on the 124th floor observation deck of Burj Khalifa admiring the skyline views of Dubai and the Arabian Gulf.",
    "starterPrompt": "أهلاً بك في قمة برج خليفة، أطول مبنى في العالم! المنظر من هذا الارتفاع البانورامي مذهل للغاية. هل يمكنك رؤية جزر النخلة والبحر؟",
    "starterQuestions": [
      "هل حجزت تذكرة وقت غروب الشمس لمشاهدة عرض النوافير الراقصة؟"
    ]
  },
  {
    "id": "travel_ar_3",
    "title": "Cruising on a Traditional Wooden Dhow in Dubai Creek",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "رحلة بحرية",
    "icon": "⛵",
    "scenario": "You are relaxing on a traditional wooden boat (Dhow) gliding through historic Dubai Creek between Deira and Bur Dubai.",
    "starterPrompt": "مساء الخير والأنوار! رحلة السفينة الخشبية التراثية (الداو) في خور دبي تأخذنا في رحلة عبر تاريخ التجارة القديم. هل تستمتع بالهواء العليل ومناظر الأبراج المضيئة؟",
    "starterQuestions": [
      "هل زرت أسواق التوابل والذهب التقليدية القريبة؟"
    ]
  },
  {
    "id": "travel_ta_1",
    "title": "Visiting the Historic Meenakshi Temple in Madurai",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "கோவில்",
    "icon": "🛕",
    "scenario": "You are touring the grand Meenakshi Amman Temple in Madurai admiring the thousand-pillar hall and towering sculpted gopurams.",
    "starterPrompt": "வணக்கம்! மதுரை மீனாட்சி அம்மன் கோவில் ஆயிரம் கால் மண்டபமும், வண்ணமயமான கோபுர சிற்பங்களும் உலகப் பிரசித்தி பெற்றவை. கோவில் அழகை ரசிக்கிறீர்களா?",
    "starterQuestions": [
      "கோவிலின் பிரமாண்ட கோபுரங்களை புகைப்படம் எடுத்தீர்களா?"
    ]
  },
  {
    "id": "travel_ta_2",
    "title": "Beach Walk & Sea Breeze at Marina Beach, Chennai",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "கடற்கரை",
    "icon": "🏖️",
    "scenario": "You are taking an evening stroll along the world's second longest urban beach in Chennai enjoying sea breeze and roasted corn.",
    "starterPrompt": "வணக்கம்! மாலை நேரத்தில் மெரினா கடற்கரையில் காற்று வாங்குவது சென்னை மக்களுக்கு ரொம்ப பிடிக்கும். சுடச்சுட சுட்ட சோளம் அல்லது சுண்டல் சாப்பிடலாமா?",
    "starterQuestions": [
      "கடற்கரை கலங்கரை விளக்கம் (Lighthouse) உச்சிக்கு போய் பார்த்தீங்களா?"
    ]
  },
  {
    "id": "travel_ta_3",
    "title": "Boat Ride & Boathouse Stay in Kanyakumari Waters",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "படகு சவாரி",
    "icon": "⛵",
    "scenario": "You are taking a ferry boat ride to the Vivekananda Rock Memorial and Thiruvalluvar Statue at the confluence of three oceans in Kanyakumari.",
    "starterPrompt": "கன்னியாகுமரி முக்கடல் சங்கமத்திற்கு நல்வரவு! விவேகானந்தர் பாறை நினைவு மண்டபத்திற்கு படகில் செல்வது சிலிர்ப்பான அனுபவம். கடலின் மூன்று நிறங்கள் தெரிகிறதா?",
    "starterQuestions": [
      "சூரிய உதயம் மற்றும் சூரிய அஸ்தமனம் இரண்டுமே இங்கு தெரிவது வியப்பானதுதானே?"
    ]
  },
  {
    "id": "travel_jp_1",
    "title": "Hot Spring Onsen Etiquette & Ryokan Stay in Hakone",
    "language": "Japanese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "温泉",
    "icon": "♨️",
    "scenario": "You are staying at a traditional Hakone hot spring inn (Ryokan) learning bathing etiquette and wearing a relaxed yukata robe.",
    "starterPrompt": "箱根の温泉旅館へようこそ！大浴場に入る前に体を洗い場で流すのが日本の温泉マナーです。浴衣に着替えて露天風呂を満喫しませんか？",
    "starterQuestions": [
      "富士山が見える露天風呂はお試しになりましたか？"
    ]
  },
  {
    "id": "travel_jp_2",
    "title": "Tokyo Metro Navigation & Suica Card IC Tap",
    "language": "Japanese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "地下鉄",
    "icon": "🚇",
    "scenario": "You are tapping your digital Suica card through Tokyo Metro ticket gates and asking an attendant about Ginza Line transfers.",
    "starterPrompt": "すみません、銀座線への乗り換えですね！Suicaカードを改札機にピッとタッチして、黄色い矢印に沿って階段を下りてください。どちらの駅まで行かれますか？",
    "starterQuestions": [
      "Suicaの残高が足りているかチャージ機で確認しましたか？"
    ]
  },
  {
    "id": "sp_fr_200",
    "title": "Commander dans un Bistro Parisien (Ordering at a Paris Bistro)",
    "language": "French",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥐",
    "scenario": "You are seated at an authentic Parisian sidewalk cafe ordering a morning espresso and warm croissant.",
    "starterPrompt": "Bonjour ! Bienvenue au Café Saint-Germain. Que puis-je vous servir aujourd'hui ?",
    "starterQuestions": [
      "Préférez-vous un café serré ou un café crème ?",
      "Voulez-vous une viennoiserie avec cela ?"
    ]
  },
  {
    "id": "sp_fr_201",
    "title": "Perte de Bagages à l'Aéroport Charles de Gaulle (Lost Baggage Claim)",
    "language": "French",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Airport",
    "icon": "🧳",
    "scenario": "Your checked luggage didn't arrive on the carousel at CDG Airport and you need to file a claim.",
    "starterPrompt": "Bonjour, service des litiges bagages. Avez-vous votre reçu d'enregistrement et votre carte d'embarquement ?",
    "starterQuestions": [
      "Quelle est la couleur et la marque de votre valise ?",
      "Sur quel vol êtes-vous arrivé ?"
    ]
  },
  {
    "id": "sp_fr_202",
    "title": "Entretien d'Embauche chez une Startup Tech (Tech Job Interview)",
    "language": "French",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "You are interviewing for a Senior Software Engineer position with a Paris Station F startup.",
    "starterPrompt": "Bonjour et enchanté ! Pouvez-vous vous présenter et m'expliquer votre parcours dans le développement cloud ?",
    "starterQuestions": [
      "Quel est le projet dont vous êtes le plus fier ?",
      "Comment gérez-vous le stress des échéances serrées ?"
    ]
  },
  {
    "id": "sp_fr_203",
    "title": "Négociation de Salaire et Avantages (Salary Negotiation)",
    "language": "French",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Salary Negotiation",
    "icon": "📈",
    "scenario": "You are negotiating your annual package, remote work flexibility, and stock options with HR.",
    "starterPrompt": "Nous serions ravis de vous accueillir dans l'équipe. Quelles sont vos prétentions salariales pour ce poste ?",
    "starterQuestions": [
      "Quelles sont vos priorités entre fixe, variable et télétravail ?",
      "Quand pourriez-vous débuter ?"
    ]
  },
  {
    "id": "sp_fr_204",
    "title": "Enregistrement à l'Hôtel et Vue sur la Tour Eiffel (Hotel Check-in)",
    "language": "French",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You arrive at your boutique hotel in Montmartre to check into your reserved room.",
    "starterPrompt": "Bonsoir monsieur/madame ! Bienvenue à l'Hôtel des Arts. Avez-vous une réservation à notre réception ?",
    "starterQuestions": [
      "Quel est votre nom s'il vous plaît ?",
      "Souhaitez-vous le petit-déjeuner inclus le matin ?"
    ]
  },
  {
    "id": "sp_fr_205",
    "title": "Boutique de Vêtements & Essayage (Shopping for Clothes in Paris)",
    "language": "French",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Shopping",
    "icon": "🛍️",
    "scenario": "You are looking for a stylish winter coat in a Marais fashion boutique.",
    "starterPrompt": "Bonjour ! Est-ce que je peux vous aider à trouver votre taille ou un modèle particulier ?",
    "starterQuestions": [
      "Quelle est votre taille habituelle ?",
      "Préférez-vous cette veste en noir ou en bleu marine ?"
    ]
  },
  {
    "id": "sp_fr_206",
    "title": "À la Pharmacie pour un Rhume (Pharmacy Symptom Description)",
    "language": "French",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "You have caught a fever and sore throat while traveling and need relief medicine.",
    "starterPrompt": "Bonjour ! Quels sont vos symptômes exactement ? Avez-vous de la fièvre ou de la toux ?",
    "starterQuestions": [
      "Depuis combien de jours êtes-vous malade ?",
      "Êtes-vous allergique à certains médicaments comme l'aspirine ?"
    ]
  },
  {
    "id": "sp_fr_207",
    "title": "Drill de Grammaire : Passé Composé vs Imparfait (Targeted Grammar Drill)",
    "language": "French",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the critical distinction between completed past actions (Passé Composé) and ongoing backgrounds (Imparfait).",
    "starterPrompt": "Pratiquons le passé ! Racontez-moi ce que vous faisiez quand un événement soudain est arrivé hier.",
    "starterQuestions": [
      "Quel temps utilisez-vous pour une action terminée ?",
      "Comment accordez-vous le participe passé avec être ?"
    ]
  },
  {
    "id": "sp_de_208",
    "title": "Kaffee und Kuchen im Berliner Café (Ordering at a Berlin Cafe)",
    "language": "German",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "You are sitting outside a cozy Prenzlauer Berg cafe ordering specialty coffee and Apfelstrudel.",
    "starterPrompt": "Hallo! Herzlich willkommen. Was darf ich Ihnen heute bringen?",
    "starterQuestions": [
      "Möchten Sie den Cappuccino mit Hafermilch oder Kuhmilch?",
      "Darf es dazu ein Stück Kuchen sein?"
    ]
  },
  {
    "id": "sp_de_209",
    "title": "Zugverspätung und Umsteigen am Hauptbahnhof (Train Delay & Rebooking)",
    "language": "German",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Train",
    "icon": "🚆",
    "scenario": "Your ICE train to Munich is delayed and you must ask Deutsche Bahn service about connections.",
    "starterPrompt": "Guten Tag, Reisezentrum Deutsche Bahn. Wie kann ich Ihnen bei Ihrer Verbindung helfen?",
    "starterQuestions": [
      "Wohin möchten Sie reisen?",
      "Haben Sie bereits ein gültiges Ticket oder eine Reservierung?"
    ]
  },
  {
    "id": "sp_de_210",
    "title": "Technisches Vorstellungsgespräch (Tech Job Interview in Munich)",
    "language": "German",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "You are interviewing for an engineering team lead position at an innovative German tech enterprise.",
    "starterPrompt": "Guten Tag! Schön, dass Sie da sind. Bitte erzählen Sie uns kurz über Ihre bisherigen Erfahrungen im Software-Engineering.",
    "starterQuestions": [
      "Was war Ihre größte technische Herausforderung?",
      "Wie motivieren Sie Ihr Team bei engen Terminen?"
    ]
  },
  {
    "id": "sp_de_211",
    "title": "Wohnungsbesichtigung in München (Apartment Viewing in Munich)",
    "language": "German",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Housing",
    "icon": "🔑",
    "scenario": "You are viewing an apartment for rent and speaking with the landlord about lease terms.",
    "starterPrompt": "Guten Tag! Kommen Sie gerne herein. Was gefällt Ihnen an dieser Wohnung am besten?",
    "starterQuestions": [
      "Ab wann möchten Sie die Wohnung mieten?",
      "Haben Sie Ihre Schufa-Auskunft und Gehaltsnachweise dabei?"
    ]
  },
  {
    "id": "sp_de_212",
    "title": "Im Restaurant Abendessen Bestellen (Ordering Dinner in Frankfurt)",
    "language": "German",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍽️",
    "scenario": "You are dining with colleagues at a traditional German restaurant ordering schnitzel and regional sides.",
    "starterPrompt": "Guten Abend! Haben Sie schon einen Blick in die Speisekarte geworfen? Was darf ich Ihnen zu trinken bringen?",
    "starterQuestions": [
      "Haben Sie bestimmte Unverträglichkeiten oder Allergien?",
      "Möchten Sie das Schnitzel mit Bratkartoffeln oder Pommes?"
    ]
  },
  {
    "id": "sp_de_213",
    "title": "In der Apotheke nach Medikamenten Fragen (Pharmacy Symptom Description)",
    "language": "German",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "You have a painful headache and stomach upset and need over-the-counter medication.",
    "starterPrompt": "Guten Tag! Wie kann ich Ihnen heute helfen? Haben Sie bestimmte Beschwerden oder Schmerzen?",
    "starterQuestions": [
      "Nehmen Sie derzeit bereits andere Medikamente ein?",
      "Bevorzugen Sie Tabletten oder einen Saft?"
    ]
  },
  {
    "id": "sp_de_214",
    "title": "Bundesliga und Fußball-Debatte (Talking Football & Bundesliga)",
    "language": "German",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "You are chatting with a local sports fan about Bundesliga teams and the Champions League.",
    "starterPrompt": "Servus! Hast du das spannende Spiel am Wochenende gesehen? Für welche Mannschaft schlägt dein Herz?",
    "starterQuestions": [
      "Wer wird deiner Meinung nach dieses Jahr Meister?",
      "Gehst du oft selbst ins Stadion?"
    ]
  },
  {
    "id": "sp_de_215",
    "title": "Drill de Grammatik : Dativ vs Akkusativ Präpositionen (Targeted Grammar Drill)",
    "language": "German",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering two-way prepositions (Wechselpräpositionen) with Dative (location/wo) vs Accusative (motion/wohin).",
    "starterPrompt": "Lass uns Wechselpräpositionen üben! Wohin hast du dein Buch gelegt und wo liegt es jetzt?",
    "starterQuestions": [
      "Benutzt du Dativ für feste Orte oder Bewegungen?",
      "Welcher Fall folgt auf 'in die Stadt gehen'?"
    ]
  },
  {
    "id": "sp_it_216",
    "title": "Ordinare al Bar Italiano: Espresso e Cornetto (Coffee at a Roman Bar)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "Standing at a Roman bar counter ordering a morning espresso, cornetto alla crema, and a glass of water.",
    "starterPrompt": "Buongiorno! Cosa ti preparo di buono stamattina al banco?",
    "starterQuestions": [
      "Lo preferisci al vetro o in tazza normale?",
      "Vuoi un cornetto semplice o al pistacchio?"
    ]
  },
  {
    "id": "sp_it_217",
    "title": "Check-in in Hotel a Firenze (Hotel Check-in in Florence)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You are checking into an historic hotel in central Florence overlooking the Duomo.",
    "starterPrompt": "Benvenuto a Firenze! Ha una prenotazione con noi per questo weekend?",
    "starterQuestions": [
      "Mi può mostrare un documento d'identità?",
      "Desidera che le prenoti un taxi per domani mattina?"
    ]
  },
  {
    "id": "sp_it_218",
    "title": "Cena in Trattoria Tradizionale (Dinner at a Traditional Trattoria)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍝",
    "scenario": "You are ordering authentic handmade pasta and asking the waiter for wine recommendations.",
    "starterPrompt": "Buonasera! Avete già scelto o posso consigliarvi il nostro primo piatto del giorno fatto a mano?",
    "starterQuestions": [
      "Preferite pasta fresca o carne per secondo?",
      "Gradite un vino rosso toscano della casa?"
    ]
  },
  {
    "id": "sp_it_219",
    "title": "Colloquio di Lavoro nel Design e Moda (Fashion & Design Job Interview)",
    "language": "Italian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "You are interviewing for a digital product design lead in a prestigious Milanese creative studio.",
    "starterPrompt": "Buongiorno e benvenuto. Ci parli del suo percorso professionale e dei progetti più significativi.",
    "starterQuestions": [
      "Qual è il suo approccio alla collaborazione di squadra?",
      "Come gestisce i feedback complessi dai clienti?"
    ]
  },
  {
    "id": "sp_it_220",
    "title": "Chiedere Indicazioni a Venezia (Asking for Directions in Venice)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Directions",
    "icon": "🗺️",
    "scenario": "You are navigating through the narrow Venetian calli searching for Piazza San Marco.",
    "starterPrompt": "Ciao! Ti sei perso tra i canali? Dove stai cercando di arrivare esattamente?",
    "starterQuestions": [
      "Vuoi andare a piedi o prendere il vaporetto?",
      "Hai una mappa con te?"
    ]
  },
  {
    "id": "sp_it_221",
    "title": "In Farmacia per Emergenza (Pharmacy Symptoms & Care)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Describing sudden sunburn and a seasonal allergy to a compassionate Italian pharmacist.",
    "starterPrompt": "Buongiorno, mi dica tutto. Di quali medicinali ha bisogno oggi?",
    "starterQuestions": [
      "Ha dolore o solo bruciore sulla pelle?",
      "È allergico a farmaci antistaminici?"
    ]
  },
  {
    "id": "sp_it_222",
    "title": "Partita di Calcio e Serie A (Talking Football & Serie A)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Discussing the latest Serie A derby and legendary Italian players over coffee.",
    "starterPrompt": "Ciao! Hai visto il derby ieri sera? Che partita spettacolare! Per quale squadra fai il tifo?",
    "starterQuestions": [
      "Chi pensi che vincerà lo scudetto quest'anno?",
      "Preferisci il calcio offensivo o difensivo?"
    ]
  },
  {
    "id": "sp_it_223",
    "title": "Drill di Grammatica : Passato Prossimo con Essere o Avere (Targeted Grammar Drill)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Practicing when to use 'essere' (with agreement in gender/number) vs 'avere' in past tense.",
    "starterPrompt": "Esercitiamo il passato! Dove sei andato ieri e cosa hai fatto di bello?",
    "starterQuestions": [
      "Quale ausiliare si usa con i verbi di movimento?",
      "Come cambia la desinenza con il verbo essere?"
    ]
  },
  {
    "id": "sp_pt_224",
    "title": "Café da Manhã e Pão de Queijo (Ordering Breakfast in São Paulo)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "You are ordering freshly baked pão de queijo and a smooth café com leite at a bakery in São Paulo.",
    "starterPrompt": "Bom dia! Tudo bem com você? O que vai querer pedir hoje na nossa padaria?",
    "starterQuestions": [
      "Você prefere café puro ou com leite?",
      "Vai querer o pão de queijo quentinho para viagem?"
    ]
  },
  {
    "id": "sp_pt_225",
    "title": "Passeio na Praia de Copacabana (Beach Day in Rio de Janeiro)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Sightseeing",
    "icon": "🏖️",
    "scenario": "You are ordering fresh coconut water on Copacabana beach and renting an umbrella.",
    "starterPrompt": "E aí, beleza? Quer uma água de coco bem gelada ou uma cadeira para curtir a praia?",
    "starterQuestions": [
      "Você prefere coco gelado ou natural?",
      "Está gostando do calor do Rio?"
    ]
  },
  {
    "id": "sp_pt_226",
    "title": "Entrevista de Emprego em Tecnologia (Tech Job Interview in Brazil)",
    "language": "Portuguese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "You are interviewing for a Software Engineering position at a Brazilian fintech unicorn.",
    "starterPrompt": "Olá! Seja muito bem-vindo. Conte-me um pouco sobre sua trajetória profissional em tecnologia.",
    "starterQuestions": [
      "Qual foi o projeto mais desafiador que você liderou?",
      "Como você lida com prazos apertados e trabalho remoto?"
    ]
  },
  {
    "id": "sp_pt_227",
    "title": "Check-in no Hotel e Pedido de Informações (Hotel Check-in in Lisbon)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You arrive at your hotel in Lisbon and inquire about local tram routes and sightseeing.",
    "starterPrompt": "Boa tarde! Bem-vindo a Lisboa. Tem uma reserva confirmada connosco para hoje?",
    "starterQuestions": [
      "Pode facultar o seu passaporte para o registo?",
      "Deseja informações sobre o elétrico 28?"
    ]
  },
  {
    "id": "sp_pt_228",
    "title": "Jantar numa Churrascaria Tradicional (Dining at a Traditional Rodízio)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥩",
    "scenario": "Experiencing an authentic Brazilian steakhouse rodízio with caipirinhas and prime picanha.",
    "starterPrompt": "Boa noite! É sua primeira vez no nosso rodízio? Como você gosta do ponto da carne?",
    "starterQuestions": [
      "Você aceita uma picanha fatiada agora?",
      "Gostaria de experimentar nossa caipirinha tradicional?"
    ]
  },
  {
    "id": "sp_pt_229",
    "title": "Futebol e Seleção Brasileira (Talking Football & World Cup)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Talking about Brazilian football legends like Pelé, Neymar, and favorite local teams.",
    "starterPrompt": "E aí, você acompanha futebol? Para qual time brasileiro você torce aqui no campeonato?",
    "starterQuestions": [
      "Quem é o melhor jogador do mundo para você?",
      "Você já foi ao estádio do Maracanã?"
    ]
  },
  {
    "id": "sp_pt_230",
    "title": "Drill de Gramática : Por vs Para (Targeted Grammar Drill)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the crucial difference between 'por' (cause/duration/exchange) and 'para' (destination/purpose).",
    "starterPrompt": "Vamos praticar 'por' e 'para'! Por que você estuda línguas e para onde quer viajar?",
    "starterQuestions": [
      "Quando você usa 'para' em vez de 'por'?",
      "Como você diz 'obrigado por sua ajuda'?"
    ]
  },
  {
    "id": "sp_zh_231",
    "title": "在茶馆点点心与茶 (Ordering Dim Sum & Tea in Beijing)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥟",
    "scenario": "You are seated in a traditional teahouse ordering Longjing tea and hot soup dumplings.",
    "starterPrompt": "您好！欢迎光临。请问今天几位？想先喝点什么热茶？",
    "starterQuestions": [
      "您喜欢龙井茶还是普洱茶？ (Do you prefer Longjing or Pu-erh?)",
      "需要尝尝我们招牌的小笼包吗？ (Would you like to try our signature xiaolongbao?)"
    ]
  },
  {
    "id": "sp_zh_232",
    "title": "在北京大兴机场办理登机与问路 (Airport Check-in & Directions)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Airport",
    "icon": "✈️",
    "scenario": "Checking in for an international flight and finding your boarding gate at Beijing Daxing Airport.",
    "starterPrompt": "您好，请出示您的护照和电子机票，我帮您办理登机手续。",
    "starterQuestions": [
      "您有需要托运的大件行李吗？ (Do you have luggage to check in?)",
      "您想要靠窗还是靠过道的座位？ (Do you want a window or aisle seat?)"
    ]
  },
  {
    "id": "sp_zh_233",
    "title": "科技公司高级面试 (High-Tech Engineering Job Interview)",
    "language": "Chinese (Mandarin)",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "You are interviewing with a top tech enterprise for an Artificial Intelligence Architect role.",
    "starterPrompt": "您好！请您先用中文做个简单的自我介绍，重点讲讲您的技术背景。",
    "starterQuestions": [
      "您在以往项目中遇到过的最大架构挑战是什么？ (What was your biggest architectural challenge?)",
      "您如何看待混合AI边缘计算的发展？ (How do you view hybrid edge AI?)"
    ]
  },
  {
    "id": "sp_zh_234",
    "title": "在商场挑选礼物与砍价 (Shopping & Negotiating in Shanghai)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Shopping",
    "icon": "🛍️",
    "scenario": "Shopping for silk scarves and tea sets as souvenirs for friends back home.",
    "starterPrompt": "您好！来看看我们这里的精美丝绸和茶叶，今天有特别折扣！",
    "starterQuestions": [
      "您打算买给朋友还是自己用？ (Are you buying for friends or yourself?)",
      "如果买两件，可以给您优惠一点。 (Can give a discount if you buy two.)"
    ]
  },
  {
    "id": "sp_zh_235",
    "title": "在药店描述感冒症状 (Pharmacy Care & Medicine)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Describing fever, headache, and congestion to a helpful neighborhood pharmacist in Shanghai.",
    "starterPrompt": "您好，看您脸色不太好，请问有什么不舒服的症状吗？",
    "starterQuestions": [
      "发烧几天了？测过体温吗？ (How many days of fever? Checked temperature?)",
      "对中药或者西药有任何过敏吗？ (Any allergies to traditional or western medicine?)"
    ]
  },
  {
    "id": "sp_zh_236",
    "title": "语法强化训练：把字句与被字句 (Targeted Grammar Drill: Ba & Bei)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the fundamental Chinese disposal structure '把' (Bǎ) and passive structure '被' (Bèi).",
    "starterPrompt": "今天我们练习'把'字句！请用'把'字造句，告诉我你把手机放在哪里了？",
    "starterQuestions": [
      "什么时候必须使用'把'字句？ (When must you use 'Bǎ'?)",
      "'被'字句表示什么语态？ (What voice does 'Bèi' express?)"
    ]
  },
  {
    "id": "sp_hi_237",
    "title": "चाय की दुकान पर बातचीत (Ordering Chai at a Street Stall)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "You are ordering aromatic Masala Chai and hot samosas at a vibrant Delhi street stall.",
    "starterPrompt": "नमस्ते जी! आपका स्वागत है। आपके लिए अदरक वाली स्पेशल मसाला चाय बनाएं?",
    "starterQuestions": [
      "चाय में चीनी कम चाहिए या सामान्य? (Do you want less or normal sugar?)",
      "साथ में गरमा-गरम समोसा भी लेंगे? (Will you take a hot samosa as well?)"
    ]
  },
  {
    "id": "sp_hi_238",
    "title": "होटल में चेक-इन और कमरा देखना (Hotel Check-in in Jaipur)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "You arrive at your heritage hotel in Jaipur to check in and ask about local tours.",
    "starterPrompt": "नमस्ते! हमारे होटल में आपका स्वागत है। क्या आपके नाम से कोई बुकिंग है?",
    "starterQuestions": [
      "क्या आप अपना पहचान पत्र दिखा सकते हैं? (Can you show your ID?)",
      "क्या आपको कल के लिए टूर गाइड चाहिए? (Do you need a tour guide for tomorrow?)"
    ]
  },
  {
    "id": "sp_hi_239",
    "title": "सॉफ्टवेयर इंजीनियर जॉब इंटरव्यू (Tech Job Interview in Bengaluru)",
    "language": "Hindi",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "You are interviewing for a Senior AI Software Engineer role in Bengaluru.",
    "starterPrompt": "नमस्ते! आपसे मिलकर खुशी हुई। कृपया अपने तकनीकी अनुभव और पिछली उपलब्धियों के बारे में बताएं।",
    "starterQuestions": [
      "आप अपनी सबसे बड़ी तकनीकी सफलता किसे मानते हैं? (What is your greatest technical achievement?)",
      "कठिन समय-सीमा में आप टीम के साथ कैसे तालमेल बिठाते हैं? (How do you collaborate under tight deadlines?)"
    ]
  },
  {
    "id": "sp_hi_240",
    "title": "क्रिकेट मैच और आईपीएल पर चर्चा (Talking Cricket & IPL)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "Chatting passionately about Indian cricket, Virat Kohli, and IPL team rivalries.",
    "starterPrompt": "अरे भाई! कल का मैच देखा क्या? क्या रोमांचक मुकाबला था! आपकी पसंदीदा आईपीएल टीम कौन सी है?",
    "starterQuestions": [
      "आपके अनुसार सबसे बेहतरीन कप्तान कौन है? (Who is the greatest captain in your opinion?)",
      "क्या आप खुद भी क्रिकेट खेलते हैं? (Do you play cricket yourself?)"
    ]
  },
  {
    "id": "sp_hi_241",
    "title": "बाज़ार में खरीदारी और मोलभाव (Shopping & Bargaining in Bazaar)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Shopping",
    "icon": "🛍️",
    "scenario": "Shopping for handcrafted kurtas and spices in a bustling traditional market.",
    "starterPrompt": "नमस्ते सर! आइए, देखिए हमारे पास सबसे बेहतरीन हाथ से बने कुर्ते और साड़ियां हैं। क्या पसंद आया?",
    "starterQuestions": [
      "आपको कौन सा रंग और साइज चाहिए? (Which color and size do you need?)",
      "अगर आप दो लेंगे तो हम थोड़ा डिस्काउंट कर देंगे। (If you take two we can give a discount.)"
    ]
  },
  {
    "id": "sp_hi_242",
    "title": "व्याकरण अभ्यास : ने का प्रयोग (Targeted Grammar Drill: Ne Usage)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the ergative postposition 'ने' (Ne) in past tense transitive sentences.",
    "starterPrompt": "आइए भूतकाल में 'ने' का प्रयोग सीखें! बताइए, कल आपने क्या खाया और क्या नया सीखा?",
    "starterQuestions": [
      "सकर्मक क्रियाओं में कर्ता के साथ क्या लगता है? (What attaches to the subject with transitive verbs?)",
      "'मैं ने' की जगह सही रूप क्या है? (What is the correct form instead of 'Main ne'?)"
    ]
  },
  {
    "id": "sp_ru_243",
    "title": "Заказ в Кафе в Санкт-Петербурге (Ordering Coffee in St. Petersburg)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Cafe",
    "icon": "☕",
    "scenario": "Sitting in a historic Nevsky Prospect cafe ordering a hot cappuccino and syrniki.",
    "starterPrompt": "Здравствуйте! Добро пожаловать. Что для вас приготовить сегодня?",
    "starterQuestions": [
      "Вам кофе на обычном или на овсяном молоке? (Regular or oat milk?)",
      "Будете заказывать сырники со сметаной? (Will you order syrniki with sour cream?)"
    ]
  },
  {
    "id": "sp_ru_244",
    "title": "Регистрация в Гостинице (Hotel Check-in in Moscow)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Hotel",
    "icon": "🏨",
    "scenario": "Checking into your hotel near Red Square and asking about metro navigation.",
    "starterPrompt": "Добрый день! Рады приветствовать вас в Москве. У вас есть бронирование в нашей гостинице?",
    "starterQuestions": [
      "Пожалуйста, покажите ваш паспорт. (Please show your passport.)",
      "Вам нужен номер с видом на город? (Do you want a city view room?)"
    ]
  },
  {
    "id": "sp_ru_245",
    "title": "Техническое Собеседование (Senior Tech Job Interview)",
    "language": "Russian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead systems architect position with a global engineering company.",
    "starterPrompt": "Здравствуйте! Приятно познакомиться. Расскажите, пожалуйста, о вашем опыте в разработке распределённых систем.",
    "starterQuestions": [
      "С какими сложными архитектурными задачами вы сталкивались? (What complex architectural tasks have you faced?)",
      "Как вы решаете конфликты в команде? (How do you resolve team conflicts?)"
    ]
  },
  {
    "id": "sp_ru_246",
    "title": "В Аптеке : Описание Симптомов (Pharmacy Symptoms & Medicines)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Describing a sudden fever and cough to a knowledgeable pharmacist in Moscow.",
    "starterPrompt": "Здравствуйте! На что вы жалуетесь? Какая у вас температура и есть ли кашель?",
    "starterQuestions": [
      "Сколько дней вы болеете? (How many days have you been sick?)",
      "Есть ли у вас аллергия на антибиотики? (Do you have allergies to antibiotics?)"
    ]
  },
  {
    "id": "sp_ru_247",
    "title": "Покупка Сувениров и Книг (Shopping for Souvenirs & Books)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Shopping",
    "icon": "🛍️",
    "scenario": "Buying classic literature books and traditional wooden souvenirs in Arbat street.",
    "starterPrompt": "Здравствуйте! Ищете подарок или что-то для себя? У нас большой выбор сувениров.",
    "starterQuestions": [
      "Вам упаковать это в подарочную коробку? (Shall I wrap this in a gift box?)",
      "Оплата картой или наличными? (Card or cash?)"
    ]
  },
  {
    "id": "sp_ru_248",
    "title": "Грамматический Тренинг : Глаголы Движения (Targeted Grammar Drill: Verbs of Motion)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering multidirectional (ходить/ездить) vs unidirectional (идти/ехать) verbs of motion.",
    "starterPrompt": "Давайте потренируем глаголы движения! Куда вы обычно ходите по выходным и куда идете прямо сейчас?",
    "starterQuestions": [
      "В чем разница между 'идти' и 'ходить'? (Difference between 'idti' and 'khodit'?)",
      "Какой глагол используется для поездки на транспорте? (Which verb is used for transport?)"
    ]
  },
  {
    "id": "sp_si_249",
    "title": "ගාලු මුවදොර ඉස්සෝ වඩේ සහ වීදි ආහාර (Galle Face Isso Wade & Street Food)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🦐",
    "scenario": "Ordering fresh crispy isso wade and discussing spicy street snacks at Galle Face Green in Colombo at sunset.",
    "starterPrompt": "ආයුබෝවන්! ගාලු මුවදොර හවසට හරිම ලස්සනයි නේද? ඔයා ඉස්සෝ වඩේ කන්න කැමතිද? සැරට ඕනෙද අඩු සැරටද?",
    "starterQuestions": [
      "ඔයා වඩාත්ම කැමති ලංකාවේ කෑම මොනවද? (What is your favorite Sri Lankan food?)",
      "කොච්චි සම්බෝල ටිකක් වැඩියෙන් දාන්නද? (Shall I add extra kochchi sambol?)"
    ]
  },
  {
    "id": "sp_si_250",
    "title": "කොළඹ ත්‍රීවීලර් ගමන සහ මීටරේ කතාබහ (Colombo Tuk-Tuk Ride & Negotiation)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Local Transit",
    "icon": "🛺",
    "scenario": "Hailing a tuk-tuk in Kollupitiya, verifying the fare meter, and directing the driver through rush hour traffic.",
    "starterPrompt": "මල්ලි! කොළඹ කොටුවට යන්න කීයක් ගන්නවද? මීටරේ දාලා යමු නේද?",
    "starterQuestions": [
      "කොල්ලුපිටියේ ලොකු ට්‍රැෆික් එකක් තියෙනවද? (Is there heavy traffic in Kollupitiya?)",
      "ගාලු පාරෙන් යනවද මැරින් ඩ්‍රයිව් එකෙන් යනවද? (Will you take Galle Road or Marine Drive?)"
    ]
  },
  {
    "id": "sp_si_251",
    "title": "සීගිරිය පර්වත ගවේෂණය සහ පුරාවිද්‍යා විස්තරය (Sigiriya Rock & Ancient History)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Heritage & History",
    "icon": "🏛️",
    "scenario": "Talking with an expert Sri Lankan cultural guide while climbing the 1,200 steps to the Lion Rock summit.",
    "starterPrompt": "ආයුබෝවන්! සීගිරිය බලකොටුව ලෝක පුදුමයක් විදිහට සලකන්නේ ඇයි කියලා ඔයා දන්නවද? කාශ්‍යප රජුගේ වාස්තු විද්‍යාව ගැන කතා කරමු.",
    "starterQuestions": [
      "සීගිරි කුරුටු ගී සහ බිතුසිතුවම් ගැන ඔයාගේ අදහස මොකක්ද? (What do you think of the Sigiriya frescoes and graffiti poems?)",
      "පර්වත මුදුනට නගින්න කොපමණ වෙලාවක් යයිද? (How long does it take to reach the summit?)"
    ]
  },
  {
    "id": "sp_si_252",
    "title": "කොළඹ තාක්ෂණික සමාගමක මෘදුකාංග ඉංජිනේරු සම්මුඛ සාකච්ඡාව (Tech Firm Job Interview in Colombo)",
    "language": "Sinhala",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💻",
    "scenario": "Presenting cloud architecture, system scalability, and leadership experience for a Senior Tech Lead role in Sri Lanka.",
    "starterPrompt": "සුබ උදෑසනක්! අපගේ තාක්ෂණික සම්මුඛ පරීක්ෂණයට සාදරයෙන් පිළිගන්නවා. ඔබේ පෙර මෘදුකාංග ව්‍යාපෘති සහ cloud architecture අත්දැකීම් ගැන කෙටියෙන් හඳුන්වා දෙන්න පුළුවන්ද?",
    "starterQuestions": [
      "High scalability සහ low latency පද්ධති සැලසුම් කිරීමේදී ඔබ මුහුණ දුන් ලොකුම අභියෝගය කුමක්ද? (What was your biggest challenge designing high scalability and low latency systems?)",
      "කණ්ඩායම් කළමනාකරණය සඳහා ඔබ අනුගමනය කරන Agile ක්‍රමවේදය කුමක්ද? (What Agile methodology do you follow for team leadership?)"
    ]
  },
  {
    "id": "sp_si_253",
    "title": "ගමේ කඩෙන් කහට තේ සහ ආප්ප ඇණවුම් කිරීම (Ordering Hot Tea & Hoppers at a Local Kade)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Dining Out",
    "icon": "☕",
    "scenario": "Stopping at a traditional roadside teashop for breakfast: hot ginger tea, egg hoppers, and lunu miris.",
    "starterPrompt": "ආයුබෝවන් මුදලාලි! අද උදේට උණු උණු බිත්තර ආප්ප තියෙනවද? කහට තේ එකකුත් එක්ක ලුණු මිරිස් ටිකක් වැඩියෙන් දෙන්න පුළුවන්ද?",
    "starterQuestions": [
      "පැණි ආප්ප කීයක් හදන්නද? (How many sweet hoppers should I prepare?)",
      "ඉඟුරු දාලා ප්ලේන්ටියක් බොනවද? (Would you like ginger plain tea?)"
    ]
  },
  {
    "id": "sp_si_254",
    "title": "නුවරඑළිය තේ වතු චාරිකාව සහ හෝටල් කාමර වෙන්කරවා ගැනීම (Nuwara Eliya Tea Estate & Hotel Booking)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Hotel & Lodging",
    "icon": "🍃",
    "scenario": "Booking a cozy mountain bungalow in Nuwara Eliya and asking about tea tasting tours and weather.",
    "starterPrompt": "ආයුබෝවන්! අපි ලබන සති අන්තයේ නුවරඑළියට එන්න බලාපොරොත්තු වෙනවා. තේ වත්ත පෙනෙන ලස්සන කාමරයක් තියෙනවද?",
    "starterQuestions": [
      "දැන් නුවරඑළියේ කාලගුණය ගොඩක් ශීතලද? (Is the weather in Nuwara Eliya very cold right now?)",
      "තේ කර්මාන්තශාලා නිරීක්ෂණ චාරිකාවට වෙලාව වෙන්කරන්න පුළුවන්ද? (Can you arrange a tea factory visit slot?)"
    ]
  },
  {
    "id": "sp_si_255",
    "title": "ලංකාවේ ක්‍රිකට් ලෝලීන්ගේ කතාබහ (Cricket Fever: Sri Lanka Lions Match Discussion)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "Debating T20 tactics, explosive spinners, and batting finishes with fellow passionate Sri Lankan fans at R. Premadasa Stadium.",
    "starterPrompt": "මචං! ඊයේ මැච් එක බැලුවද? අපේ කොල්ලන්ගේ bowling attack එක නම් සුපිරි නේද?",
    "starterQuestions": [
      "අවසාන ඕවරේ batting එක ගැන ඔයා මොකද හිතන්නේ? (What do you think about the final over batting?)",
      "ලෝක කුසලානය සඳහා හොඳම playing XI එක කවුද? (Who is in your best playing XI for the World Cup?)"
    ]
  },
  {
    "id": "sp_si_256",
    "title": "ඉලක්කගත ව්‍යාකරණ පුහුණුව : කථන සිංහල අතීත කාල ක්‍රියා පද (Targeted Grammar Drill: Spoken Sinhala Past Tense)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Practicing spoken Sinhala past tense suffixes (-වා, -ලා, ගියා vs යනවා) without mixing formal written forms.",
    "starterPrompt": "අපි කථන සිංහලෙන් අතීත කාල ක්‍රියා පද පුහුණු වෙමු! ඊයේ ඔයා කොහෙද ගියේ සහ මොනවද කළේ කියලා විස්තර කරන්න පුළුවන්ද?",
    "starterQuestions": [
      "'මම කනවා' යන්න අතීත කාලයෙන් කියන්නේ කොහොමද? (How do you say 'I eat' in spoken past tense?)",
      "'ගියා' සහ 'ගිහින් තියෙනවා' අතර වෙනස කුමක්ද? (What is the difference between 'went' and 'have gone'?)"
    ]
  },
  {
    "id": "sp_nl_257",
    "title": "Fietsen langs de Grachten van Amsterdam (Cycling Along Amsterdam Canals)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "City Biking",
    "icon": "🚲",
    "scenario": "Renting an 'omafiets' near Centraal Station, asking about cycling rules, bike locks, and canal routes.",
    "starterPrompt": "Hallo! Welkom bij onze fietsverhuur. Zoekt u een stadsfiets voor vandaag? Wilt u een terugtraprem of handremmen?",
    "starterQuestions": [
      "Moet ik op het fietspad blijven of mag ik overal rijden? (Should I stay on bike paths or can I ride anywhere?)",
      "Heeft u een stevig kettingslot tegen diefstal? (Do you have a sturdy chain lock against theft?)"
    ]
  },
  {
    "id": "sp_nl_258",
    "title": "Koffie en Stroopwafels op de Albert Cuypmarkt (Coffee & Stroopwafels at the Market)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🧇",
    "scenario": "Ordering fresh warm caramel stroopwafels and a coffee from a friendly stallholder in De Pijp.",
    "starterPrompt": "Goedemorgen! Een warme stroopwafel met extra karamel? Ze zijn net vers gebakken!",
    "starterQuestions": [
      "Kan ik pinnen of heeft u liever contant geld? (Can I pay with card or do you prefer cash?)",
      "Mag ik er ook een verse muntthee bij? (May I also have fresh mint tea?)"
    ]
  },
  {
    "id": "sp_nl_259",
    "title": "Sollicitatiegesprek bij een Nederlandse Tech Startup (Job Interview at a Dutch Tech Startup)",
    "language": "Dutch",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💼",
    "scenario": "Explaining full-stack architecture, direct communication culture, and agile teamwork in Amsterdam.",
    "starterPrompt": "Fijn dat je er bent! Vertel ons eens over je ervaring met schaalbare systemen en cloud engineering.",
    "starterQuestions": [
      "Hoe ga je om met de directe Nederlandse feedbackcultuur? (How do you handle direct Dutch feedback culture?)",
      "Wat is je ervaring met geautomatiseerde CI/CD pipelines? (What is your experience with automated CI/CD pipelines?)"
    ]
  },
  {
    "id": "sp_nl_260",
    "title": "Een Woning Bezichtigen en Huren in Utrecht (Viewing an Apartment in Utrecht)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Tech",
    "subCategory": "Housing",
    "icon": "🏠",
    "scenario": "Viewing a rental apartment, asking the real estate agent about service costs, registration, and lease terms.",
    "starterPrompt": "Welkom bij de bezichtiging! Zoals je ziet heeft het appartement veel lichtinval. Heb je al vragen over het huurcontract?",
    "starterQuestions": [
      "Zijn gas, water en elektriciteit inbegrepen in de servicekosten? (Are gas, water and electricity included in service costs?)",
      "Mag ik mij hier inschrijven bij de gemeente? (Can I register here at the municipality?)"
    ]
  },
  {
    "id": "sp_nl_261",
    "title": "De Trein Nemen naar Rotterdam Centraal (Taking the Train to Rotterdam Central)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Public Transit",
    "icon": "🚆",
    "scenario": "Checking in with your OV-chipkaart and asking NS conductor about transfer platforms and Intercity Direct surcharges.",
    "starterPrompt": "Pardon, weet u vanaf welk spoor de Intercity naar Rotterdam Centraal vertrekt? Moet ik een toeslag betalen?",
    "starterQuestions": [
      "Vergeet niet in te checken bij de poortjes! (Don't forget to check in at the fare gates!)",
      "Is er vertraging door werkzaamheden op het spoor? (Is there a delay due to track maintenance?)"
    ]
  },
  {
    "id": "sp_nl_262",
    "title": "Gerichte Grammatica Oefening : De vs Het en Scheidbare Werkwoorden (Targeted Grammar Drill)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the distinction between 'de' and 'het' words and word order of separable verbs (opbellen, meenemen).",
    "starterPrompt": "Laten we scheidbare werkwoorden oefenen! Hoe zeg je 'Ik bel je vanavond op' in het verleden en in een bijzin?",
    "starterQuestions": [
      "Waarom is het 'de tafel' maar 'het bureau'? (Why is it 'de tafel' but 'het bureau'?)",
      "Waar komt het voorvoegsel als je 'hebben' gebruikt? (Where does the prefix go with auxiliary 'have'?)"
    ]
  },
  {
    "id": "sp_tr_263",
    "title": "Kapalıçarşı'da Çay Eşliğinde Pazarlık (Bargaining over Tea at the Grand Bazaar)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Bazaar Shopping",
    "icon": "☕",
    "scenario": "Sipping hot Turkish black tea while bargaining courteously for handwoven kilims and ceramics in Istanbul.",
    "starterPrompt": "Hoş geldiniz efendim! Buyrun bir tavşan kanı çayımızı için. Halılarımıza ve seramiklerimize bakmak ister misiniz?",
    "starterQuestions": [
      "Bu el dokuması kilim için en son ne kadar olur? (What is your best price for this handmade kilim?)",
      "Nakit ödersem indirim yapar mısınız? (Do you give a discount if I pay cash?)"
    ]
  },
  {
    "id": "sp_tr_264",
    "title": "Geleneksel Türk Kahvaltısı Siparişi (Ordering a Traditional Turkish Breakfast)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Breakfast & Dining",
    "icon": "🍳",
    "scenario": "Ordering a rich serpme kahvaltı with menemen, kaymak, honey, olives, and fresh simit along the seaside.",
    "starterPrompt": "Günaydın! İki kişilik serpme kahvaltı mı arzu edersiniz? Menemeninizi soğanlı mı soğansız mı tercih edersiniz?",
    "starterQuestions": [
      "Taze sıkılmış portakal suyu da alabilir miyiz? (Could we also have freshly squeezed orange juice?)",
      "Çay sınırsız mı servis ediliyor? (Is tea served unlimited with breakfast?)"
    ]
  },
  {
    "id": "sp_tr_265",
    "title": "Boğaz Vapuru ile Karşıya Geçiş (Taking the Bosphorus Ferry across Istanbul)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Ferry Commute",
    "icon": "⛴️",
    "scenario": "Taking the scenic ferry from Eminönü to Kadıköy, feeding simit to seagulls and enjoying the Bosphorus breeze.",
    "starterPrompt": "Kadıköy iskelesi hangi tarafta? İstanbulkart ile turnikelerden geçebilir miyim?",
    "starterQuestions": [
      "Martılara simit atmak için simitçi nerede? (Where is the simit seller to feed the seagulls?)",
      "Son vapur saat kaçta kalkıyor? (What time is the last ferry?)"
    ]
  },
  {
    "id": "sp_tr_266",
    "title": "İstanbul'da Yazılım Mühendisi Mülakatı (Software Engineer Interview in Istanbul)",
    "language": "Turkish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💼",
    "scenario": "Discussing distributed microservices, Redis caching, and real-time WebSocket pipelines for an e-commerce giant.",
    "starterPrompt": "Merhaba, teknik mülakatımıza hoş geldiniz! Bize yüksek trafikli sistemlerdeki tecrübelerinizden bahseder misiniz?",
    "starterQuestions": [
      "Veritabanı darboğazlarını çözerken nasıl bir strateji izliyorsunuz? (What strategy do you follow when resolving database bottlenecks?)",
      "Mikroservis mimarisinde hata toleransını nasıl sağlıyorsunuz? (How do you ensure fault tolerance in microservices?)"
    ]
  },
  {
    "id": "sp_tr_267",
    "title": "Eczanede Şikayetlerini Anlatma (Describing Symptoms at a Turkish Pharmacy)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Describing throat irritation, dry cough, and mild fever to a knowledgeable local 'Eczane' pharmacist.",
    "starterPrompt": "Geçmiş olsun! Boğaz ağrınız ve öksürüğünüz ne zamandır devam ediyor? Ateşinizi ölçtünüz mü?",
    "starterQuestions": [
      "Günde kaç defa bu şurubu kullanmalıyım? (How many times a day should I take this syrup?)",
      "Tok karnına mı aç karnına mı içilecek? (Should I take it on a full or empty stomach?)"
    ]
  },
  {
    "id": "sp_tr_268",
    "title": "Hedefli Dilbilgisi Pratiği : -miş'li Geçmiş Zaman ve İlgi Ekleri (Targeted Grammar Drill)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the evidential/reported past tense (-miş/-mış) versus direct past (-di) and vowel harmony suffixes.",
    "starterPrompt": "Türkçe dilbilgisinde dolaylı geçmiş zamanı (-miş) çalışalım! Başkasından duyduğunuz bir haberi nasıl anlatırsınız?",
    "starterQuestions": [
      "Gördüğünüz bir olayla duyduğunuz olay arasındaki ek farkı nedir? (Difference in suffixes between witnessed vs reported event?)",
      "Büyük ve küçük ünlü uyumu kuralı nasıl işler? (How does major and minor vowel harmony work?)"
    ]
  },
  {
    "id": "sp_vi_269",
    "title": "Gọi Phở Bò và Cà Phê Trứng tại Phố Cổ Hà Nội (Ordering Pho & Egg Coffee in Hanoi)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🍜",
    "scenario": "Sitting on small plastic stools in Hanoi Old Quarter, ordering steaming Pho Bo Tai and creamy sweet egg coffee.",
    "starterPrompt": "Chào bạn! Quán mình có phở bò tái, nạm, gầu. Bạn muốn gọi bát phở như thế nào và uống cà phê trứng nóng hay đá?",
    "starterQuestions": [
      "Cho mình xin thêm chanh và ớt tươi được không? (Could I please have extra lime and fresh chili?)",
      "Cà phê trứng ở đây làm theo công thức gia truyền đúng không? (Is the egg coffee here made from a family recipe?)"
    ]
  },
  {
    "id": "sp_vi_270",
    "title": "Mặc Cả Mua Trái Cây tại Chợ Bến Thành (Bargaining for Fruit at Ben Thanh Market)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Market Shopping",
    "icon": "🥭",
    "scenario": "Buying ripe mangosteen, dragon fruit, and mangoes, negotiating a polite discount with a cheerful market auntie.",
    "starterPrompt": "Mua gì đó con ơi! Măng cụt và xoài cát Hòa Lộc hôm nay ngọt lịm luôn nè! Con mua mấy ký?",
    "starterQuestions": [
      "Dạ cô ơi, nếu con mua hai ký thì cô bớt cho con chút đỉnh được không? (Auntie, if I buy two kilos, can you give me a small discount?)",
      "Trái cây này có để được lâu khi đi máy bay không cô? (Will this fruit keep well for an airplane flight?)"
    ]
  },
  {
    "id": "sp_vi_271",
    "title": "Phỏng Vấn Xin Việc tại Công Ty Công Nghệ Sài Gòn (Tech Job Interview in Saigon)",
    "language": "Vietnamese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💼",
    "scenario": "Presenting system design, Golang microservices, and mobile AI inference for a leading tech unicorn in Ho Chi Minh City.",
    "starterPrompt": "Chào em, cảm ơn em đã tham gia buổi phỏng vấn hôm nay. Em có thể chia sẻ về kinh nghiệm tối ưu hóa hệ thống microservices của mình không?",
    "starterQuestions": [
      "Em xử lý vấn đề data consistency giữa các distributed database như thế nào? (How do you handle data consistency across distributed databases?)",
      "Kỹ năng làm việc nhóm và giải quyết xung đột kỹ thuật của em ra sao? (What is your approach to teamwork and resolving technical disagreements?)"
    ]
  },
  {
    "id": "sp_vi_272",
    "title": "Đi Xe Ôm Công Nghệ và Hỏi Đường ở Đà Nẵng (Hailing a Grab Bike in Da Nang)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Rideshare",
    "icon": "🛵",
    "scenario": "Navigating through Da Nang to Dragon Bridge on a motorbike taxi, asking about local viewpoints and bridge fire shows.",
    "starterPrompt": "Alo, bạn đang đứng ở sảnh khách sạn đúng không? Mình mặc áo khoác xanh lá cây, đội mũ bảo hiểm cho bạn nhé!",
    "starterQuestions": [
      "Anh ơi, cầu Rồng tối nay mấy giờ phun lửa và phun nước? (Brother, what time does the Dragon Bridge breathe fire and water tonight?)",
      "Đường ven biển Mỹ Khê đoạn này có kẹt xe không anh? (Is the My Khe coastal road congested at this hour?)"
    ]
  },
  {
    "id": "sp_vi_273",
    "title": "Khám Bệnh tại Phòng Khám Đa Khoa (Describing Symptoms at a Clinic)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Clinic Visit",
    "icon": "🏥",
    "scenario": "Explaining stomach ache, indigestion, and headache symptoms to a doctor at a clinic in Vietnam.",
    "starterPrompt": "Chào bạn, hôm nay bạn cảm thấy không khỏe ở đâu? Cơn đau bụng bắt đầu từ khi nào và có bị sốt không?",
    "starterQuestions": [
      "Bác sĩ có kê đơn thuốc uống trong bao nhiêu ngày? (For how many days has the doctor prescribed this medication?)",
      "Tôi có cần kiêng ăn đồ cay nóng và dầu mỡ không? (Do I need to avoid spicy and greasy food?)"
    ]
  },
  {
    "id": "sp_vi_274",
    "title": "Luyện Tập Ngữ Pháp Mục Tiêu : Đại Từ Xưng Hô và Trợ Từ (Targeted Grammar Drill)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering Vietnamese social pronouns (anh, chị, em, cô, chú, cháu) and tense/aspect markers (đã, đang, sẽ, rồi).",
    "starterPrompt": "Hôm nay chúng ta hãy luyện tập hệ thống đại từ xưng hô tôn kính trong tiếng Việt! Khi nói chuyện với người lớn tuổi hơn mình một chút, em nên xưng hô như thế nào?",
    "starterQuestions": [
      "Sự khác biệt giữa 'đã làm' và 'làm rồi' là gì? (What is the difference between 'da lam' and 'lam roi'?)",
      "Khi nào chúng ta dùng từ 'dạ' ở đầu câu? (When do we use 'da' at the beginning of a sentence?)"
    ]
  },
  {
    "id": "sp_id_275",
    "title": "Pesan Nasi Goreng dan Sate di Warung (Ordering Nasi Goreng at a Jakarta Warung)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🍛",
    "scenario": "Ordering authentic spicy Nasi Goreng Gila and chicken satay with peanut sauce at a buzzing Jakarta roadside warung.",
    "starterPrompt": "Selamat malam mas! Mau pesan nasi goreng spesial atau sate ayam madura? Pedas sedang atau pedas banget?",
    "starterQuestions": [
      "Tolong jangan pakai terlalu banyak minyak dan tambahkan kerupuk ya! (Please don't use too much oil and add extra crackers!)",
      "Berapa lama kira-kira pesanannya siap? (About how long until the order is ready?)"
    ]
  },
  {
    "id": "sp_id_276",
    "title": "Sewa Motor dan Menjelajahi Ubud, Bali (Renting a Scooter in Ubud, Bali)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Scooter Rental",
    "icon": "🛵",
    "scenario": "Renting an automatic scooter, checking helmet safety, fuel type, and asking for directions to the Tegalalang Rice Terrace.",
    "starterPrompt": "Halo bu! Mau sewa motor matic untuk tiga hari. Berapa tarif per hari termasuk helm dan jas hujan?",
    "starterQuestions": [
      "Bensinnya pakai Pertamax atau Pertalite? (Does it take Pertamax or Pertalite gasoline?)",
      "Bisa tolong rekomendasikan rute paling tenang ke sawah bertingkat? (Could you recommend the quietest route to the rice terrace?)"
    ]
  },
  {
    "id": "sp_id_277",
    "title": "Wawancara Kerja Startup di Jakarta Selatan (Startup Job Interview in South Jakarta)",
    "language": "Indonesian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💼",
    "scenario": "Discussing mobile fintech scalability, offline-first data synchronization, and cross-functional leadership in Indonesia.",
    "starterPrompt": "Halo, selamat datang di sesi wawancara kami! Bisa ceritakan pengalaman Anda dalam membangun arsitektur aplikasi mobile berskala besar?",
    "starterQuestions": [
      "Bagaimana strategi Anda memastikan aplikasi tetap responsif saat koneksi internet lambat di daerah terpencil? (What is your strategy to keep apps responsive on slow internet in remote areas?)",
      "Bagaimana gaya kepemimpinan Anda dalam memotivasi tim engineer junior? (What is your leadership style in mentoring junior engineers?)"
    ]
  },
  {
    "id": "sp_id_278",
    "title": "Membeli Kain Batik di Pasar Tradisional (Buying Batik at a Traditional Market)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Textiles & Souvenirs",
    "icon": "🧵",
    "scenario": "Appreciating hand-drawn batik tulis vs printed patterns in Yogyakarta, negotiating a respectful cultural price.",
    "starterPrompt": "Permisi mbak, ini kain batik tulis asli atau cap? Motifnya sangat indah, dari daerah mana ya?",
    "starterQuestions": [
      "Apakah warnanya akan luntur saat dicuci pertama kali? (Will the colors fade when washed the first time?)",
      "Kalau saya ambil dua lembar, bisa dapat harga spesial? (If I take two pieces, can I get a special price?)"
    ]
  },
  {
    "id": "sp_id_279",
    "title": "Konsultasi Kesehatan di Apotek (Consulting a Pharmacist in Indonesia)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Explaining mild dehydration, fever, and traveler's upset stomach to a licensed pharmacist in Indonesia.",
    "starterPrompt": "Selamat siang! Saya merasa kurang enak badan sejak kemarin, kepala pusing dan perut kembung. Obat apa yang paling cocok?",
    "starterQuestions": [
      "Apakah ada obat oralit untuk rehidrasi tubuh? (Do you have oral rehydration salts?)",
      "Berapa tablet yang harus diminum setelah makan? (How many tablets should be taken after meals?)"
    ]
  },
  {
    "id": "sp_id_280",
    "title": "Latihan Tata Bahasa Terarah : Imbuhan Me- dan Ber- (Targeted Grammar Drill)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering Indonesian verbal affixes (me-, ber-, di-, -kan, -i) to distinguish active, intransitive, and passive verbs.",
    "starterPrompt": "Mari berlatih imbuhan bahasa Indonesia! Apa perbedaan makna antara 'berjalan' dan 'menjalankan' dalam sebuah kalimat?",
    "starterQuestions": [
      "Kapan awalan 'me-' berubah menjadi 'mem-', 'men-', atau 'meng-'? (When does the prefix 'me-' change to 'mem-', 'men-', or 'meng-'?)",
      "Bagaimana cara mengubah kalimat aktif ke bentuk pasif dengan awalan 'di-'? (How do you turn active sentences into passive with 'di-'?)"
    ]
  },
  {
    "id": "sp_th_281",
    "title": "สั่งผัดไทยและชาไทยที่ตลาดนัดกลางคืน (Ordering Pad Thai & Thai Tea at Night Market)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🍲",
    "scenario": "Ordering sizzling shrimp pad thai and fragrant orange iced tea at a bustling Bangkok night bazaar.",
    "starterPrompt": "สวัสดีครับ! รับผัดไทยกุ้งสดหรือผัดไทยหมูกรอบดีครับ? ใส่พริกเยอะไหม และรับชาไทยหวานน้อยไหมครับ?",
    "starterQuestions": [
      "ขอถั่วงอกกับมะนาวเพิ่มอีกนิดได้ไหมครับ? (Could I please have extra bean sprouts and lime?)",
      "ชาไทยโบราณร้านนี้ใช้นมสดหรือนมข้นหวานครับ? (Does this traditional Thai tea use fresh milk or condensed milk?)"
    ]
  },
  {
    "id": "sp_th_282",
    "title": "นั่งเรือด่วนเจ้าพระยาและเที่ยววัดอรุณ (Chao Phraya Express Boat & Wat Arun)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "River Transit",
    "icon": "🚤",
    "scenario": "Buying a blue flag tourist boat ticket, crossing the Chao Phraya River, and visiting the Temple of Dawn.",
    "starterPrompt": "ขอโทษนะครับ เรือด่วนธงส้มไปท่าเตียนและวัดอรุณขึ้นที่โป๊ะไหนครับ? ค่าโดยสารคนละเท่าไหร่?",
    "starterQuestions": [
      "ต้องแต่งกายสุภาพอย่างไรก่อนเข้าชมพระวิหาร? (What is the dress code before entering the temple hall?)",
      "เรือข้ามฟากแม่น้ำปิดกี่โมงครับ? (What time does the river cross-ferry close?)"
    ]
  },
  {
    "id": "sp_th_283",
    "title": "การสัมภาษณ์งานวิศวกรซอฟต์แวร์ในกรุงเทพฯ (Tech Job Interview in Bangkok)",
    "language": "Thai",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💼",
    "scenario": "Discussing AI models, low-latency microservices, and collaborative engineering culture in Bangkok's digital tech hub.",
    "starterPrompt": "สวัสดีค่ะ ยินดีต้อนรับสู่การสัมภาษณ์งานด้านเทคนิค กรุณาแนะนำตัวและเล่าประสบการณ์การพัฒนาระบบ AI และ Cloud ให้เราฟังได้ไหมคะ?",
    "starterQuestions": [
      "คุณมีวิธีแก้ไขปัญหาเมื่อเกิดระบบขัดข้องฉุกเฉิน (High Severity Incident) อย่างไร? (How do you handle critical high-severity production incidents?)",
      "คุณปรับตัวเข้ากับวัฒนธรรมการทำงานแบบ Agile และการสื่อสารในทีมอย่างไร? (How do you adapt to Agile collaboration and team communication?)"
    ]
  },
  {
    "id": "sp_th_284",
    "title": "ต่อรองราคาของที่ระลึกที่ตลาดนัดจตุจักร (Bargaining at Chatuchak Weekend Market)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Daily Life",
    "subCategory": "Weekend Market",
    "icon": "🛍️",
    "scenario": "Browsing handmade silk scarves and wooden carvings at Chatuchak Market, practicing polite Thai bargaining terms.",
    "starterPrompt": "ชิ้นนี้สวยมากเลยครับพี่ ทำจากผ้าไหมแท้หรือเปล่าครับ? ถ้าซื้อสามผืนลดราคาให้หน่อยได้ไหมครับ?",
    "starterQuestions": [
      "มีสีอื่นหรือลายอื่นให้ดูอีกไหมครับ? (Do you have other colors or patterns to show?)",
      "สแกนจ่ายผ่าน QR Code พร้อมเพย์ได้ไหมครับ? (Can I scan to pay with PromptPay QR code?)"
    ]
  },
  {
    "id": "sp_th_285",
    "title": "ปรึกษาเภสัชกรเรื่องยาแก้แพ้และเจ็บคอ (Asking Pharmacist for Medicine in Thailand)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Describing tropical heat fatigue, runny nose, and dry throat at a licensed pharmacy in Bangkok.",
    "starterPrompt": "สวัสดีค่ะ มีอาการอย่างไรบ้างคะ? รู้สึกเจ็บคอหรือมีไข้ตัวร้อนตั้งแต่เมื่อไหร่คะ?",
    "starterQuestions": [
      "ยานี้กินแล้วง่วงนอนไหมคะ? (Does this medicine make you drowsy?)",
      "ต้องรับประทานก่อนอาหารหรือหลังอาหารกี่นาที? (How many minutes before or after meals should this be taken?)"
    ]
  },
  {
    "id": "sp_th_286",
    "title": "ฝึกไวยากรณ์เป้าหมาย : คำลงท้ายสุภาพ (ครับ/ค่ะ) และกริยาช่วยบอกกาล (Targeted Grammar Drill)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering polite sentence-ending particles (ครับ/ค่ะ), aspect markers (แล้ว, กำลัง, จะ), and Thai tone rules.",
    "starterPrompt": "เรามาฝึกการใช้คำช่วยบอกกาลและอนุภาคความสุภาพในภาษาไทยกันครับ! บอกเล่าสิ่งที่ 'กำลังทำ' และสิ่งที่ 'ทำเสร็จแล้ว' ในวันนี้หน่อยครับ",
    "starterQuestions": [
      "คำว่า 'กำลัง' และ 'อยู่' นำมาใช้วางตรงไหนในประโยค? (Where are 'kamlang' and 'yu' placed in a sentence?)",
      "ทำไมการลงท้ายด้วย 'ครับ/ค่ะ' จึงสำคัญมากในสังคมไทย? (Why are polite endings so crucial in Thai communication?)"
    ]
  },
  {
    "id": "sp_se_287",
    "title": "Fika med Kanelbulle på ett Café i Gamla Stan (Fika with Cinnamon Bun in Stockholm)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Café & Fika",
    "icon": "☕",
    "scenario": "Experiencing Swedish 'fika' culture: ordering brewed coffee ('bryggkaffe') and warm cinnamon buns in historical Gamla Stan.",
    "starterPrompt": "Hej och välkommen! Ska du ha en vanlig bryggkaffe med påtår, eller en havrelatte? Vill du ha en nygräddad kanelbulle till?",
    "starterQuestions": [
      "Ingår påtår i kaffepriset här? (Is a refill included in the coffee price here?)",
      "Är kardemummabullarna bakade med äkta smör? (Are the cardamom buns baked with real butter?)"
    ]
  },
  {
    "id": "sp_se_288",
    "title": "Köpa SL-biljett och Åka Tunnelbana i Stockholm (Stockholm Metro & Commuting)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Public Transit",
    "icon": "🚇",
    "scenario": "Tapping your contactless card at the SL turnstile, checking the green line towards T-Centralen, and asking transit staff.",
    "starterPrompt": "Ursäkta mig, går det här tåget mot T-Centralen och Odenplan? Kan jag bara blippa mitt vanliga betalkort i spärren?",
    "starterQuestions": [
      "Hur länge gäller en enkelbiljett i SL-trafiken? (How long is a single ticket valid in SL transit?)",
      "Vilken uppgång ska jag ta för att komma till Drottninggatan? (Which exit should I take for Drottninggatan?)"
    ]
  },
  {
    "id": "sp_se_289",
    "title": "Anställningsintervju på ett Svenskt Techbolag (Job Interview at a Swedish Tech Enterprise)",
    "language": "Swedish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Job Interviews",
    "icon": "💼",
    "scenario": "Discussing horizontal hierarchy, consensus decision-making, and high-performance backend systems in Stockholm.",
    "starterPrompt": "Välkommen till intervjun! Berätta lite om din bakgrund och hur du arbetar med autonoma team och distribuerade molnsystem.",
    "starterQuestions": [
      "Hur trivs du med en platt organisationsstruktur utan strikt mikrostyrning? (How do you thrive in a flat organizational structure without micromanagement?)",
      "Vilka teknologier föredrar du för realtidsdataströmmar? (What technologies do you prefer for real-time streaming pipelines?)"
    ]
  },
  {
    "id": "sp_se_290",
    "title": "Handla Mat på ICA och Fråga Personalen (Grocery Shopping at ICA)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Supermarket",
    "icon": "🛒",
    "scenario": "Locating local organic products ('ekologiskt'), asking staff where oat milk and crispbread ('knäckebröd') are shelved.",
    "starterPrompt": "Hej! Ursäkta, var kan jag hitta havremjölken och det traditionella knäckebrödet? Har ni några lokala ostar?",
    "starterQuestions": [
      "Finns det någon självscanningskassa ledig? (Is there a self-checkout scanner available?)",
      "Behöver jag betala extra för papperspåsarna? (Do I need to pay extra for paper bags?)"
    ]
  },
  {
    "id": "sp_se_291",
    "title": "Boka Läkartid på Vårdcentralen (Booking an Appointment at a Health Clinic)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Clinic Visit",
    "icon": "🏥",
    "scenario": "Speaking with a triage nurse at a Swedish Vårdcentral about persistent cough, fever, and scheduling an appointment.",
    "starterPrompt": "Hej, du har kommit till Vårdcentralen. Vad kan vi hjälpa dig med idag? Hur länge har du haft dessa symptom?",
    "starterQuestions": [
      "Har du svårt att andas eller hög feber? (Do you have breathing difficulty or high fever?)",
      "Har du ett svenskt personnummer eller samordningsnummer? (Do you have a Swedish personal number or coordination number?)"
    ]
  },
  {
    "id": "sp_se_292",
    "title": "Riktad Grammatikträning : V2-regeln och Bestämd Form (Targeted Grammar Drill)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Daily Life",
    "subCategory": "Grammar Repair",
    "icon": "🎓",
    "scenario": "Mastering the fundamental Swedish V2 word order rule (verb in second position) and definite noun suffixes (-en, -et).",
    "starterPrompt": "Idag övar vi på den klassiska V2-regeln på svenska! När du börjar en mening med en tidsangivelse som 'Igår...', var hamnar verbet?",
    "starterQuestions": [
      "Varför heter det 'en hund' men 'hunden'? (Why is it 'en hund' but 'hunden'?)",
      "Vad händer med ordföljden i en bisats med ordet 'inte'? (What happens to word order in a subordinate clause with 'inte'?)"
    ]
  },
  {
    "id": "top_1001",
    "title": "Commander au Café de Flore (Coffee & Pastries)",
    "language": "French",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Café",
    "icon": "☕",
    "scenario": "Ordering coffee, croissant, and asking for the bill at a Parisian sidewalk café.",
    "starterPrompt": "Bonjour monsieur! Bienvenue au Café de Flore. Que désirez-vous prendre ce matin?",
    "starterQuestions": [
      "Vous préférez votre café noir ou au lait?",
      "Désirez-vous également une carafe d'eau?"
    ]
  },
  {
    "id": "top_1002",
    "title": "Prendre le Métro à Châtelet (Paris Metro Navigation)",
    "language": "French",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Public Transit",
    "icon": "🚇",
    "scenario": "Asking the station agent how to buy a Navigo day pass and transfer to Line 1 toward the Louvre.",
    "starterPrompt": "Bonjour! Vous êtes au guichet RATP. Quelle est votre destination aujourd'hui?",
    "starterQuestions": [
      "Avez-vous besoin d'un ticket simple ou d'un pass journée?",
      "Savez-vous quelle sortie prendre?"
    ]
  },
  {
    "id": "top_1003",
    "title": "Entretien d'Embauche chez Station F (Tech Startup Job Interview)",
    "language": "French",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead AI engineering position at a Paris tech accelerator.",
    "starterPrompt": "Bonjour, merci d'avoir postulé. Parlez-moi de votre parcours et de votre plus grand défi d'architecture logicielle.",
    "starterQuestions": [
      "Comment gérez-vous la latence dans les modèles on-device?",
      "Quelle est votre approche du travail d'équipe agile?"
    ]
  },
  {
    "id": "top_1004",
    "title": "Match de Football au Parc des Princes (PSG Football Match)",
    "language": "French",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Discussing UEFA Champions League tactics, star players, and stadium atmosphere with a local supporter.",
    "starterPrompt": "Quelle ambiance ce soir au Parc! Tu as vu le but incroyable en première mi-temps? Quel est ton pronostic pour le match?",
    "starterQuestions": [
      "Qui est le meilleur joueur sur le terrain selon toi?",
      "Penses-tu que Paris ira jusqu'en finale?"
    ]
  },
  {
    "id": "top_1005",
    "title": "Soirée Apéro entre Amis (Social Gathering & Small Talk)",
    "language": "French",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Meetup",
    "icon": "🍷",
    "scenario": "Meeting new friends at a Friday evening rooftop apéro, sharing hobbies, travel stories, and food preferences.",
    "starterPrompt": "Salut! Bienvenue à la soirée! Tu connais l'hôte depuis longtemps? Tu habites dans quel quartier de Paris?",
    "starterQuestions": [
      "Quels sont tes projets pour ce week-end?",
      "Tu aimes les concerts de jazz?"
    ]
  },
  {
    "id": "top_1006",
    "title": "Discussion Cinéma Français & Festival de Cannes (Movies & Culture)",
    "language": "French",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema",
    "icon": "🎬",
    "scenario": "Debating recent award-winning French films, cinema styles, and favorite directors with a film buff.",
    "starterPrompt": "Tu as vu les sélections du Festival de Cannes cette année? Quel est ton genre de film français préféré?",
    "starterQuestions": [
      "Tu préfères les comédies légères ou les drames psychologiques?",
      "Connais-tu les classiques de la Nouvelle Vague?"
    ]
  },
  {
    "id": "top_1007",
    "title": "Startup & Intelligence Artificielle (AI & Tech Future)",
    "language": "French",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Artificial Intelligence",
    "icon": "🤖",
    "scenario": "Discussing European AI regulations, open-source Mistral models, and multimodal agents.",
    "starterPrompt": "Paris devient rapidement la capitale européenne de l'IA. Selon vous, quel rôle joueront les modèles open source?",
    "starterQuestions": [
      "Pensez-vous que l'IA sur appareil remplacera le cloud?",
      "Comment équilibrer innovation et éthique?"
    ]
  },
  {
    "id": "top_1008",
    "title": "Faire ses Courses au Marché de Belleville (Farmer's Market)",
    "language": "French",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "🧀",
    "scenario": "Buying fresh brie, baguettes, and seasonal strawberries from local market vendors.",
    "starterPrompt": "Bonjour! Regardez nos beaux fromages affinés aujourd'hui. Vous désirez un fromage plutôt doux ou corsé?",
    "starterQuestions": [
      "Combien de tranches de jambon souhaitez-vous?",
      "Ce sera tout pour aujourd'hui?"
    ]
  },
  {
    "id": "top_1009",
    "title": "Réserver un Hôtel sur la Côte d'Azur (Hotel Booking in Nice)",
    "language": "French",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Hotel Booking",
    "icon": "🏨",
    "scenario": "Calling a seaside hotel in Nice to confirm sea-view room reservations, late check-in, and breakfast options.",
    "starterPrompt": "Hôtel Beau Rivage à Nice, bonjour! En quoi puis-je vous aider pour votre séjour?",
    "starterQuestions": [
      "Pour combien de personnes et combien de nuits?",
      "Souhaitez-vous le petit-déjeuner continental inclus?"
    ]
  },
  {
    "id": "top_1010",
    "title": "Dîner dans un Bistro Lyonnais (Dinner at a Lyonnais Bouchon)",
    "language": "French",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍲",
    "scenario": "Exploring traditional Lyonnais gastronomy, asking the waiter for local wine pairing and dessert recommendations.",
    "starterPrompt": "Bonsoir! Voici notre menu du terroir. Avez-vous déjà goûté à notre quenelle maison?",
    "starterQuestions": [
      "Quel vin de la vallée du Rhône préférez-vous?",
      "Avez-vous gardé de la place pour une tarte aux pralines?"
    ]
  },
  {
    "id": "top_1011",
    "title": "Négocier un Salaire et des Avantages (Salary Negotiation)",
    "language": "French",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "📈",
    "scenario": "Negotiating compensation package, remote work flexibility, and stock options with an executive recruiter.",
    "starterPrompt": "Nous sommes ravis de vous faire cette offre. Cependant, que pensez-vous de la proposition salariale globale?",
    "starterQuestions": [
      "Quelles sont vos attentes concernant les jours de télétravail?",
      "Quel package d'intéressement visez-vous?"
    ]
  },
  {
    "id": "top_1012",
    "title": "Roland Garros & Tennis Français (Tennis Championship)",
    "language": "French",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Tennis",
    "icon": "🎾",
    "scenario": "Talking with a tennis enthusiast about clay court playstyles, five-set marathons, and French open legends.",
    "starterPrompt": "La saison de terre battue est enfin là! Tu penses que le jeu sur terre battue demande plus d'endurance physique?",
    "starterQuestions": [
      "Tu as déjà assisté à un match sur le court Philippe-Chatrier?",
      "Quel est ton joueur de tennis préféré?"
    ]
  },
  {
    "id": "top_1013",
    "title": "Louer un Vélo à Lyon et Se Balader (Cycling in the City)",
    "language": "French",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Cycling",
    "icon": "🚲",
    "scenario": "Renting a self-service bike in Lyon, asking a local for scenic river trails along the Rhône.",
    "starterPrompt": "Salut! Tu cherches à débloquer un vélo? Tu connais la piste cyclable le long des quais du Rhône?",
    "starterQuestions": [
      "Tu as l'application mobile de la ville?",
      "Tu veux pédaler jusqu'au parc de la Tête d'Or?"
    ]
  },
  {
    "id": "top_1014",
    "title": "Jeux Vidéo & Industrie Gaming Française (Video Games & Esports)",
    "language": "French",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Gaming",
    "icon": "🎮",
    "scenario": "Discussing French game studios, indie productions, and competitive esports leagues in Paris.",
    "starterPrompt": "Tu suis la scène esport française? La France a produit d'incroyables studios comme Ubisoft et Quantic Dream!",
    "starterQuestions": [
      "À quels jeux aimes-tu jouer en ce moment?",
      "Tu regardes des tournois comme les Worlds?"
    ]
  },
  {
    "id": "top_1015",
    "title": "Rejoindre un Club de Débat Universitaire (University Debate Club)",
    "language": "French",
    "level": "Advanced",
    "category": "Social",
    "subCategory": "Club",
    "icon": "🗣️",
    "scenario": "Defending an argument on renewable energy transition and climate technology in front of student debaters.",
    "starterPrompt": "Bienvenue au club d'éloquence de la Sorbonne! Quel est votre argument principal sur la transition écologique?",
    "starterQuestions": [
      "Comment répondez-vous à l'objection sur les coûts initiaux?",
      "Quel est votre exemple le plus probant?"
    ]
  },
  {
    "id": "top_1016",
    "title": "Cybersécurité et Cloud Souverain (Cloud & Cybersecurity)",
    "language": "French",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Cloud Architecture",
    "icon": "🔐",
    "scenario": "Discussing cloud infrastructure security, GDPR compliance, and edge AI data sovereignty with a systems architect.",
    "starterPrompt": "La question du cloud souverain est cruciale pour les entreprises européennes. Comment garantissez-vous la confidentialité des données?",
    "starterQuestions": [
      "Utilisez-vous le chiffrement de bout en bout pour le traitement vocal?",
      "Quelle est votre stratégie de reprise après sinistre?"
    ]
  },
  {
    "id": "top_1017",
    "title": "Visiter le Musée d'Orsay et Peintres Impressionnistes (Art History)",
    "language": "French",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Museum",
    "icon": "🎨",
    "scenario": "Exploring Claude Monet and Van Gogh masterpieces with an art historian guide inside the Musée d'Orsay.",
    "starterPrompt": "Admirez la lumière dans cette toile de Monet. Ressentez-vous comment les touches de pinceau capturent l'instant?",
    "starterQuestions": [
      "Quel peintre impressionniste vous inspire le plus?",
      "Avez-vous déjà visité les jardins de Giverny?"
    ]
  },
  {
    "id": "top_1018",
    "title": "Currywurst und Brezel am Alexanderplatz (Street Food in Berlin)",
    "language": "German",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🌭",
    "scenario": "Ordering authentic Berlin currywurst with fries and mayo, specifying spice levels.",
    "starterPrompt": "Hallo! Was darf es denn sein? Einmal Currywurst mit Pommes rot-weiß oder lieber eine frische Brezel?",
    "starterQuestions": [
      "Wie scharf möchten Sie die Soße haben?",
      "Möchten Sie etwas zu trinken dazu?"
    ]
  },
  {
    "id": "top_1019",
    "title": "Fahrkarte Kaufen am Hauptbahnhof (Buying DB Train Tickets)",
    "language": "German",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Train Transit",
    "icon": "🚆",
    "scenario": "Asking the Deutsche Bahn agent for ICE train reservations, seat selection, and BahnCard discounts.",
    "starterPrompt": "Guten Tag! Willkommen am DB Reisezentrum. Wohin möchten Sie heute reisen?",
    "starterQuestions": [
      "Möchten Sie einen Sitzplatz im Ruhebereich reservieren?",
      "Besitzen Sie eine BahnCard 25 oder 50?"
    ]
  },
  {
    "id": "top_1020",
    "title": "Vorstellungsgespräch bei einem Berliner Tech-Startup (Job Interview)",
    "language": "German",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a senior cloud software engineer role in Berlin Mitte.",
    "starterPrompt": "Guten Tag! Schön, dass Sie da sind. Erzählen Sie uns bitte über Ihre Erfahrungen mit hochskalierbaren Microservices.",
    "starterQuestions": [
      "Wie gehen Sie mit technischen Schulden im Team um?",
      "Haben Sie Erfahrung mit hybrider KI-Inferenz auf mobilen Endgeräten?"
    ]
  },
  {
    "id": "top_1021",
    "title": "Bundesliga-Spiel in München (Bayern Munich Football Match)",
    "language": "German",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Debating football tactics, Bundesliga title race, and stadium atmosphere with a Bavarian fan.",
    "starterPrompt": "Was für ein spannendes Spiel in der Allianz Arena! Glaubst du, dass die Taktik mit der hohen Abwehrlinie heute aufgeht?",
    "starterQuestions": [
      "Wer ist für dich der beste deutsche Nationalspieler?",
      "Wird der Verein dieses Jahr die Champions League gewinnen?"
    ]
  },
  {
    "id": "top_1022",
    "title": "WG-Zimmer Besichtigung in Kreuzberg (Flat-Sharing Interview)",
    "language": "German",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Flatshare",
    "icon": "🏠",
    "scenario": "Chatting with roommates during a flat inspection in Berlin, discussing cleanliness, cooking, and hobbies.",
    "starterPrompt": "Hi! Schön, dass du vorbeikommst! Wie gefällt dir unser Kiez in Kreuzberg? Kochst du gerne mit den Mitbewohnern?",
    "starterQuestions": [
      "Was machst du beruflich oder studierst du?",
      "Wie stellst du dir das WG-Leben bei uns vor?"
    ]
  },
  {
    "id": "top_1023",
    "title": "Berliner Technoszene und Clubkultur (Nightlife & Music)",
    "language": "German",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Nightlife",
    "icon": "🎵",
    "scenario": "Discussing electronic music history, club culture, and famous music venues in Berlin.",
    "starterPrompt": "Die Musikszene in Berlin ist weltberühmt. Welche Clubs oder Musikfestivals interessieren dich am meisten?",
    "starterQuestions": [
      "Hörst du lieber melodischen Deep House oder harten Techno?",
      "Warst du schon mal auf einem Open-Air-Festival an der Spree?"
    ]
  },
  {
    "id": "top_1024",
    "title": "Industrie 4.0 und Automatisierung (Smart Manufacturing & Tech)",
    "language": "German",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Robotics & AI",
    "icon": "🤖",
    "scenario": "Discussing German engineering, robotics automation, and AI integration in car manufacturing.",
    "starterPrompt": "Deutsche Industrieunternehmen setzen stark auf Industrie 4.0. Welche Chancen sehen Sie für autonome Roboter in der Fertigung?",
    "starterQuestions": [
      "Wie kann On-Device-KI Ausfallzeiten in Fabriken minimieren?",
      "Welche Rolle spielt predictive maintenance in Ihren Projekten?"
    ]
  },
  {
    "id": "top_1025",
    "title": "Wochenmarkt auf dem Kollwitzplatz (Grocery & Organic Shopping)",
    "language": "German",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Market Shopping",
    "icon": "🍎",
    "scenario": "Buying organic seasonal apples, artisan sourdough bread, and regional cheese at a farmers market.",
    "starterPrompt": "Guten Morgen! Suchen Sie süße oder säuerliche Äpfel zum Backen? Unser Bio-Sauerteigbrot ist ganz frisch!",
    "starterQuestions": [
      "Darf es noch etwas vom Allgäuer Bergkäse sein?",
      "Brauchen Sie eine Papiertüte für den Einkauf?"
    ]
  },
  {
    "id": "top_1026",
    "title": "Hotelbuchung in den Alpen (Alpine Hotel Booking)",
    "language": "German",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Hotel Booking",
    "icon": "🏔️",
    "scenario": "Calling a boutique hotel in Garmisch-Partenkirchen to reserve a mountain-view room with sauna access.",
    "starterPrompt": "Alpenresort Garmisch, grüß Gott! Wie kann ich Ihnen bei Ihrer Urlaubsbuchung behilflich sein?",
    "starterQuestions": [
      "Reisen Sie mit dem Auto oder mit dem Zug an?",
      "Möchten Sie einen Skipass direkt über das Hotel vorbestellen?"
    ]
  },
  {
    "id": "top_1027",
    "title": "Abendessen im Traditionsbrauhaus (Traditional Bavarian Dinner)",
    "language": "German",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍺",
    "scenario": "Ordering Käsespätzle, Schnitzel, and local wheat beer in a historic Munich tavern.",
    "starterPrompt": "Grüß Gott! Nehmen Sie gerne Platz. Darf es vorab ein kühles Helles oder ein Weißbier sein?",
    "starterQuestions": [
      "Haben Sie schon unsere hausgemachten Käsespätzle probiert?",
      "Möchten Sie einen gemischten Salatteller dazu?"
    ]
  },
  {
    "id": "top_1028",
    "title": "Gehaltsverhandlung mit dem Personalleiter (Salary Negotiation)",
    "language": "German",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "📊",
    "scenario": "Negotiating base salary, annual performance bonus, and flexible remote work hours.",
    "starterPrompt": "Wir schätzen Ihre Qualifikation sehr. Wie sind Ihre konkreten Gehaltserwartungen für diese Führungsposition?",
    "starterQuestions": [
      "Welche Sonderleistungen oder Weiterbildungsbudgets sind Ihnen wichtig?",
      "Ab wann könnten Sie die Stelle antreten?"
    ]
  },
  {
    "id": "top_1029",
    "title": "Skifahren und Snowboarden in Österreich (Skiing & Winter Sports)",
    "language": "German",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Winter Sports",
    "icon": "⛷️",
    "scenario": "Discussing ski gear, slope conditions (Pistenverhältnisse), and avalanche safety with an instructor.",
    "starterPrompt": "Der Neuschnee auf der Piste ist heute perfekt! Fährst du lieber auf den roten Pisten oder im Tiefschnee abseits der Piste?",
    "starterQuestions": [
      "Hast du dir schon die neue Carving-Skiausrüstung ausgeliehen?",
      "Kommst du später mit zur Hütte zum Aufwärmen?"
    ]
  },
  {
    "id": "top_1030",
    "title": "Fahrradreparatur in der Selbsthilfewerkstatt (Bike Repair)",
    "language": "German",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Bike Repair",
    "icon": "🔧",
    "scenario": "Fixing a flat tire and adjusting bike brakes with the help of a community bike shop volunteer.",
    "starterPrompt": "Moin! Brauchst du Flickzeug oder müssen wir den Schlauch komplett wechseln? Schau mal auf den Reifendruck.",
    "starterQuestions": [
      "Hast du das passende Werkzeug für die Bremsen?",
      "Möchtest du lernen, wie man die Kette richtig ölt?"
    ]
  },
  {
    "id": "top_1031",
    "title": "Streaming, Serien & Deutsches Kino (Movies & Media)",
    "language": "German",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema & Series",
    "icon": "📺",
    "scenario": "Discussing popular German series like 'Dark' and 'Babylon Berlin', acting styles, and streaming platforms.",
    "starterPrompt": "Hast du die Serie 'Dark' gesehen? Die deutsche Film- und Serienlandschaft hat sich in den letzten Jahren enorm weiterentwickelt!",
    "starterQuestions": [
      "Welche Genres schaust du am liebsten auf Netflix?",
      "Kennst du berühmte deutsche Filmklassiker?"
    ]
  },
  {
    "id": "top_1032",
    "title": "Networking auf der Tech-Messe re:publica (Tech Networking)",
    "language": "German",
    "level": "Advanced",
    "category": "Social",
    "subCategory": "Networking",
    "icon": "🤝",
    "scenario": "Connecting with software founders, venture capitalists, and digital rights advocates at a tech conference.",
    "starterPrompt": "Hallo! Toller Vortrag über digitale Souveränität gerade, nicht wahr? An welchem Projekt arbeitest du aktuell?",
    "starterQuestions": [
      "Suchst du gerade nach Investoren oder Kooperationspartnern?",
      "Lass uns gerne Kontaktdaten auf LinkedIn austauschen!"
    ]
  },
  {
    "id": "top_1033",
    "title": "Datenschutz, DSGVO und KI-Ethik (Data Privacy & AI Ethics)",
    "language": "German",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Ethics & Security",
    "icon": "🛡️",
    "scenario": "Debating strict German data privacy standards, GDPR compliance, and edge AI advantages.",
    "starterPrompt": "Deutschland legt höchsten Wert auf Datenschutz. Wie stellen Sie sicher, dass Ihre KI-Modelle vollständig DSGVO-konform arbeiten?",
    "starterQuestions": [
      "Verarbeiten Sie Sprachdaten lokal auf dem Gerät oder auf Cloud-Servern?",
      "Welche Anonymisierungsmethoden setzen Sie ein?"
    ]
  },
  {
    "id": "top_1034",
    "title": "Museumsinsel Besuch & Geschichte (Museum Island in Berlin)",
    "language": "German",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "History & Culture",
    "icon": "🏛️",
    "scenario": "Touring ancient artifacts at the Pergamon and Neues Museum with an archaeology enthusiast.",
    "starterPrompt": "Die Büste der Nofretete im Neuen Museum ist atemberaubend erhalten. Interessieren Sie sich für antike Geschichte?",
    "starterQuestions": [
      "Waren Sie schon in der Alten Nationalgalerie?",
      "Möchten Sie sich einen Audioguide auf Deutsch nehmen?"
    ]
  },
  {
    "id": "top_1035",
    "title": "කොළඹ පිලාවුස් එකෙන් කොත්තු ඕඩර් කිරීම (Ordering Kottu at Pilawoos)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🥘",
    "scenario": "Ordering cheese chicken kottu and iced milo late night on Galle Road, specifying spice level.",
    "starterPrompt": "ආයුබෝවන් මල්ලී! මොනවද අද රෑට ගන්නේ? චීස් චිකන් කොත්තුවක් එක්ක අයිස් මයිලෝ එකක් දාමුද?",
    "starterQuestions": [
      "සැර අඩුවෙන්ද වැඩියෙන්ද ඕනේ?",
      "රෝස්ට් චිකන් කෑල්ලක් එක්ක හොදි වෙනම දාන්නද?"
    ]
  },
  {
    "id": "top_1036",
    "title": "ගාලු මුවදොරට ත්‍රීවීල් එකක් ගැනීම (Taking a Tuk-Tuk to Galle Face)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Transit",
    "icon": "🛺",
    "scenario": "Negotiating a tuk-tuk ride using meter fare from Fort Railway station to Galle Face Green.",
    "starterPrompt": "ආයුබෝවන් සර්! කොහෙටද යන්න ඕනේ? මීටර් එක දාලා ගාලු මුවදොරට යමුද?",
    "starterQuestions": [
      "කොටුව ස්ටේෂන් එක ළඟ ට්‍රැෆික් එක වැඩියිද?",
      "ගෝල්ෆේස් එක ළඟින් බස්සන්නද හොටෙල් එක ළඟටම යන්නද?"
    ]
  },
  {
    "id": "top_1037",
    "title": "කොළඹ IT සමාගමක රැකියා සම්මුඛ පරීක්ෂණය (IT Tech Job Interview)",
    "language": "Sinhala",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a full-stack engineer role at an offshore tech firm in Colombo 03.",
    "starterPrompt": "සුබ උදෑසනක්! අපේ ආයතනයට සාදරයෙන් පිළිගන්නවා. ඔබේ පෙර මෘදුකාංග ව්‍යාපෘති ගැන කෙටි හැඳින්වීමක් කරන්න පුළුවන්ද?",
    "starterQuestions": [
      "Next.js සහ Cloud Firebase සමඟ වැඩ කරපු අත්දැකීම් මොනවාද?",
      "දුෂ්කර ඩෙඩ්ලයින් එකකදී කණ්ඩායම මෙහෙයවන්නේ කොහොමද?"
    ]
  },
  {
    "id": "top_1038",
    "title": "ශ්‍රී ලංකා සහ ඕස්ට්‍රේලියා ක්‍රිකට් මැච් එක (Cricket Match Discussion)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "Discussing a thrilling T20 match at R. Premadasa Stadium, spinners, and winning run-rate.",
    "starterPrompt": "ඊයේ ප්‍රේමදාස ස්ටේඩියම් එකේ මැච් එක බැලුවද? අපේ ස්පින් බෝලර්ස්ලා මැද ඕවර්ස් වල සුපිරියටම බෝල් කළා නේද?",
    "starterQuestions": [
      "ඔයා හිතන්නේ ලෝක කුසලානයට හොඳම කැප්ටන් කවුද?",
      "අන්තිම ඕවරේ ගහපු සික්ස් එක දැක්කද?"
    ]
  },
  {
    "id": "top_1039",
    "title": "සිංහල අලුත් අවුරුදු උත්සව කතාබහ (Sinhala New Year Traditions)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Cultural Festival",
    "icon": "🎉",
    "scenario": "Chatting with neighbors about Avurudu sweetmeats (Kevum, Kokis), auspicious times, and village games.",
    "starterPrompt": "සුබ අලුත් අවුරුද්දක් වේවා! කොහොමද ගෙදර අවුරුදු සූදානම? කැවුම්, කොකිස් එහෙම හැදුවද?",
    "starterQuestions": [
      "ලිප ගිනි මෙලවීමේ නැකතට මොනවද කිරිබත් එක්ක හැදුවේ?",
      "අවුරුදු ක්‍රීඩා වලට සහභාගී වෙන්න කැමතිද?"
    ]
  },
  {
    "id": "top_1040",
    "title": "සිංහල චිත්‍රපට සහ ටෙලි නාට්‍ය විචාරය (Sinhala Cinema & Drama)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema",
    "icon": "🎬",
    "scenario": "Discussing classic Lester James Peries cinema, modern teledramas, and local acting talent.",
    "starterPrompt": "ඔයා සිංහල සිනමාවේ සම්භාව්‍ය චිත්‍රපට නරඹන්න කැමතිද? ආචාර්ය ලෙස්ටර් ජේම්ස් පීරිස්ගේ නිර්මාණ ගැන මොකද හිතන්නේ?",
    "starterQuestions": [
      "මෑතකදී බලපු හොඳම සිංහල චිත්‍රපටය මොකක්ද?",
      "ටෙලිනාට්‍ය වල සංගීතය ඔයාගේ හිත ගත්තද?"
    ]
  },
  {
    "id": "top_1041",
    "title": "කෘත්‍රිම බුද්ධිය සහ දේශීය භාෂා තාක්ෂණය (AI for Sinhala Language)",
    "language": "Sinhala",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "AI Technology",
    "icon": "🤖",
    "scenario": "Debating Sinhala speech-to-text accuracy, LLM tokenization, and digital preservation.",
    "starterPrompt": "සිංහල භාෂාවට කෘත්‍රිම බුද්ධිය භාවිත කිරීමේදී ශබ්ද උච්චාරණය නිවැරදිව හඳුනාගැනීම කොතරම් වැදගත්ද?",
    "starterQuestions": [
      "දේශීය සිංහල වාග්මාලාව පරිගණක ගත කිරීමේදී මුහුණදෙන ප්‍රධාන ගැටලු මොනවාද?",
      "හයිබ්‍රිඩ් ඔන්-ඩිවයිස් AI මඟින් අඩු ප්‍රමාදයක් ලබාගන්නේ කොහොමද?"
    ]
  },
  {
    "id": "top_1042",
    "title": "පිටකොටුවේ බඩු මිලදී ගැනීම (Shopping in Pettah Market)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Market Shopping",
    "icon": "🛍️",
    "scenario": "Bargaining for spices, clothes, and electronics in the bustling streets of Pettah, Colombo.",
    "starterPrompt": "මල්ලි! මේ එනසාල් සහ කුරුඳු පැකට් එක කීයද? තොග මිලට ගන්නවා නම් අඩු කරලා දෙන්න පුළුවන්ද?",
    "starterQuestions": [
      "මේ ෂර්ට් එකේ මීඩියම් සයිස් එක තියෙනවද?",
      "වොරන්ටි එකක් දෙනවද මේ ඉලෙක්ට්‍රොනික් බඩුවට?"
    ]
  },
  {
    "id": "top_1043",
    "title": "සීගිරිය සහ නුවරඑළිය සංචාරයක් සැලසුම් කිරීම (Sigiriya & Hill Country Tour)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Tourism",
    "icon": "⛰️",
    "scenario": "Booking a guided tour to the ancient Sigiriya rock fortress and scenic hill country tea estates.",
    "starterPrompt": "ආයුබෝවන්! සීගිරිය නැරඹීමට හොඳම වෙලාව උදෑසන කාලයයි. එතනින් පස්සේ නුවරඑළියට යන්න වාහනයක් ලෑස්ති කරමුද?",
    "starterQuestions": [
      "සීගිරි කුරුටු ගී ගැන තොරතුරු දැනගන්න කැමතිද?",
      "තේ වතු සහ දියඇලි බලන්න කී දවසක් ගතවේවිද?"
    ]
  },
  {
    "id": "top_1044",
    "title": "ගමේ ගෙදර සාම්ප්‍රදායික දිවා ආහාරය (Traditional Village Rice & Curry)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Cuisine",
    "icon": "🍛",
    "scenario": "Discussing organic red rice, polos (jackfruit) curry, pol sambol, and wew maalu (lake fish).",
    "starterPrompt": "අද අපේ ගෙදර තියෙන්නේ නියම ගමේ කෑම වේලක්! පොලොස් ඇඹුලයි, පොල් සම්බෝලයි එක්ක රතු කැකුළු බත් ටිකක් බෙදාගන්න!",
    "starterQuestions": [
      "මාළු ඇඹුල් තියල් වලට ඔයා කැමතිද?",
      "තව වෑංජන ටිකක් බෙදන්නද?"
    ]
  },
  {
    "id": "top_1045",
    "title": "මාසික වැටුප් හා දීමනා සාකච්ඡා කිරීම (Salary & Benefits Discussion)",
    "language": "Sinhala",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💰",
    "scenario": "Negotiating tech allowances, remote work stipend, and annual increments with human resources.",
    "starterPrompt": "අපගේ ආයතනයෙන් ඔබට පිරිනමන වැටුප් පැකේජය ගැන ඔබේ අදහස කුමක්ද?",
    "starterQuestions": [
      "නිවසේ සිට වැඩ කිරීමේ දීමනා සහ ප්‍රවාහන පහසුකම් ප්‍රමාණවත්ද?",
      "වාර්ෂික ප්‍රසාද දීමනා ලබාදෙන ආකාරය පැහැදිලිද?"
    ]
  },
  {
    "id": "top_1046",
    "title": "වොලිබෝල් සහ ජාතික ක්‍රීඩා කතාබහ (National Volleyball & Sports)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Volleyball",
    "icon": "🏐",
    "scenario": "Talking about Sri Lanka's national sport volleyball, inter-district tournaments, and athletics.",
    "starterPrompt": "ලංකාවේ ජාතික ක්‍රීඩාව වොලිබෝල් වුණාට ගොඩක් අය ක්‍රිකට් වලටනේ කැමති! ඔයා වොලිබෝල් ගහන්න දන්නවද?",
    "starterQuestions": [
      "පාසල් කාලේ මොන වගේ ක්‍රීඩා වලටද සහභාගී වුණේ?",
      "ලංකාවේ මලල ක්‍රීඩකයන්ගේ දක්ෂතා ගැන මොකද හිතන්නේ?"
    ]
  },
  {
    "id": "top_1047",
    "title": "ෆාමසියකින් ඖෂධ ලබාගැනීම (Buying Medicine at a Pharmacy)",
    "language": "Sinhala",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "💊",
    "scenario": "Asking the pharmacist for paracetamol, cough syrup, and explaining flu symptoms politely.",
    "starterPrompt": "ආයුබෝවන්! මට උගුරේ අමාරුවටයි උණටයි බෙහෙත් වගයක් ගන්න ඕනේ. දවසට කී වතාවක් මේ පෙති බොන්න ඕනද?",
    "starterQuestions": [
      "කෑමට කලින්ද පසුවද මේ පෙත්ත ගන්න ඕනේ?",
      "වෛද්‍යවරයාගේ බෙහෙත් තුන්ඩුවක් අවශ්‍යද?"
    ]
  },
  {
    "id": "top_1048",
    "title": "පැරණි බයිලා සහ නූතන සංගීතය (Sri Lankan Baila & Music)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎸",
    "scenario": "Discussing upbeat Anton Jones baila, acoustic pop, and musical shows across the island.",
    "starterPrompt": "ලංකාවේ පාටියක් ගත්තොත් බයිලා නැතුවම බෑනේ! ක්ලැරන්ස් විජේවර්ධන මහත්මයාගේ සින්දු වලට ඔයා කැමතිද?",
    "starterQuestions": [
      "ඔයා වඩාත්ම ප්‍රිය කරන ගායකයා හෝ ගායිකාව කවුද?",
      "සංගීත ප්‍රසංග නරඹන්න ස්ටේඩියම් වලට යනවද?"
    ]
  },
  {
    "id": "top_1049",
    "title": "ආදි ශිෂ්‍ය හමුව සහ සුහද කතාබහ (School Alumni Reunion)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Reunion",
    "icon": "🏫",
    "scenario": "Reconnecting with high school classmates at an annual alumni get-together, reminiscing school days.",
    "starterPrompt": "අඩෝ මචං! කොහොමද කාලෙකට පස්සේ දැක්කේ! දැන් මොන ක්ෂේත්‍රයේද වැඩ කරන්නේ?",
    "starterQuestions": [
      "අපේ ඉස්කෝලේ කාලේ හිටපු යාලුවෝ මතකද?",
      "ඊළඟ අවුරුද්දෙත් මේ වගේ හමුවක් සංවිධානය කරමුද?"
    ]
  },
  {
    "id": "top_1050",
    "title": "දේශීය මෘදුකාංග ක්ෂේත්‍රයේ අනාගතය (Future of Sri Lankan Tech Ecosystem)",
    "language": "Sinhala",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Software Industry",
    "icon": "💻",
    "scenario": "Discussing startup incubators in Sri Lanka, global export of IT services, and foreign exchange growth.",
    "starterPrompt": "ලංකාවේ තොරතුරු තාක්ෂණ ක්ෂේත්‍රය ඩොලර් බිලියන ගණනක ආදායමක් රටට ගෙන එනවා. අපේ මෘදුකාංග ඉංජිනේරුවන්ගේ ගුණාත්මක බව කොහොමද?",
    "starterQuestions": [
      "නවක ආරම්භක ව්‍යාපාර සඳහා දේශීය ආයෝජන අවස්ථා ප්‍රමාණවත්ද?",
      "ලෝක වෙළඳපොළට ගැළපෙන AI විසඳුම් අපිට හදන්න පුළුවන්ද?"
    ]
  },
  {
    "id": "top_1051",
    "title": "නුවර දළදා පෙරහැර සහ සංස්කෘතික උරුමය (Kandy Esala Perahera)",
    "language": "Sinhala",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cultural Heritage",
    "icon": "🐘",
    "scenario": "Describing the grandeur of the sacred tooth relic pageant, traditional Kandyan dancers, and whip crackers.",
    "starterPrompt": "මහනුවර ඇසළ පෙරහැරේ උඩරට නැටුම් ශිල්පීන්ගේ සහ අලි ඇතුන්ගේ තේජස දැක්කම ඇඟ කිලිපොලා යනවා නේද?",
    "starterQuestions": [
      "ඔයා සජීවීව නුවර පෙරහැර නරඹන්න ගිහින් තියෙනවද?",
      "සාම්ප්‍රදායික බෙර වාදන රටා ගැන ඔයාට දැනුමක් තියෙනවද?"
    ]
  },
  {
    "id": "sp_es_19",
    "title": "Tapas y Cañas en La Latina (Tapas Bar in Madrid)",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Tapas",
    "icon": "🍤",
    "scenario": "Ordering patatas bravas, gambas al ajillo, and draft beer in Madrid.",
    "starterPrompt": "¡Buenas tardes! Bienvenidos a La Latina. ¿Os pongo unas cañas de cerveza o preferís un tinto de verano?",
    "starterQuestions": [
      "¿Queréis una ración de jamón ibérico?",
      "¿Picantes o suaves las patatas bravas?"
    ]
  },
  {
    "id": "sp_es_20",
    "title": "Billete de AVE en Atocha (High Speed Train in Madrid)",
    "language": "Spanish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "High-Speed Rail",
    "icon": "🚄",
    "scenario": "Buying a high-speed AVE train ticket to Barcelona, asking about carriage classes.",
    "starterPrompt": "¡Hola! Bienvenido a la estación de Atocha. ¿A qué hora deseas salir para Barcelona?",
    "starterQuestions": [
      "¿Prefieres asiento en ventanilla o pasillo?",
      "¿Viajas con equipaje grande?"
    ]
  },
  {
    "id": "sp_es_21",
    "title": "Entrevista de Trabajo en Barcelona (Tech Startup Interview)",
    "language": "Spanish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Discussing experience with distributed systems and frontend frameworks in a tech hub.",
    "starterPrompt": "Hola, muchas gracias por tu tiempo. Cuéntanos sobre tu mayor logro técnico liderando un equipo de ingeniería.",
    "starterQuestions": [
      "¿Cómo garantizas la baja latencia en producción?",
      "¿Tienes experiencia con metodologías ágiles?"
    ]
  },
  {
    "id": "sp_es_22",
    "title": "El Clásico: Real Madrid vs FC Barcelona (Football Match)",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Debating tactics, referee decisions, and star forwards during El Clásico with a passionate fan.",
    "starterPrompt": "¡Qué partidazo estamos viendo! ¿Crees que la táctica de presión alta va a funcionar los 90 minutos?",
    "starterQuestions": [
      "¿Quién es el mejor jugador del partido?",
      "¿Cuál es tu pronóstico para la Champions?"
    ]
  },
  {
    "id": "sp_es_23",
    "title": "Noche de Flamenco en Sevilla (Flamenco Show & Culture)",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Flamenco",
    "icon": "💃",
    "scenario": "Discussing guitar melodies, cante jondo vocals, and rhythm clapping (palmas) in Seville.",
    "starterPrompt": "¡Qué arte tiene este tablao en el barrio de Triana! ¿Has sentido el duende en el solo de guitarra?",
    "starterQuestions": [
      "¿Te gusta la música flamenca tradicional?",
      "¿Habías visto bailar flamenco en directo antes?"
    ]
  },
  {
    "id": "sp_es_24",
    "title": "Charla en una Terraza en Valencia (Social Meetup)",
    "language": "Spanish",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Meetup",
    "icon": "🍹",
    "scenario": "Chatting with local friends on a warm evening terrace, sharing vacation plans and weekend road trips.",
    "starterPrompt": "¡Hombre, qué alegría verte! Siéntate con nosotros. ¿Qué planes tienes para el puente festivo?",
    "starterQuestions": [
      "¿Te gusta la playa o prefieres escapada rural a la montaña?",
      "¿Has probado la auténtica paella valenciana?"
    ]
  },
  {
    "id": "sp_es_25",
    "title": "Inteligencia Artificial y Ética en España (AI Ecosystem)",
    "language": "Spanish",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Artificial Intelligence",
    "icon": "🤖",
    "scenario": "Discussing Spain's National AI Agency (AESIA), ethical auditing, and local startup growth.",
    "starterPrompt": "España está liderando iniciativas clave en regulación ética de la IA. ¿Cómo ves el impacto en las pymes tecnológicas?",
    "starterQuestions": [
      "¿Es factible ejecutar modelos LLM en local sin perder calidad?",
      "¿Qué opinas del Sandbox regulatorio europeo?"
    ]
  },
  {
    "id": "sp_it_9",
    "title": "Espresso e Cornetto al Bar (Coffee & Breakfast in Rome)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Café",
    "icon": "☕",
    "scenario": "Ordering a quick morning espresso al banco and a pistachio cornetto in a bustling Roman bar.",
    "starterPrompt": "Buongiorno! Cosa le preparo stamattina? Un bel caffè espresso e un cornetto caldo?",
    "starterQuestions": [
      "Lo prende normale o macchiato caldo?",
      "Desidera un bicchierino d'acqua frizzante?"
    ]
  },
  {
    "id": "sp_it_10",
    "title": "Vaporetto sul Canal Grande a Venezia (Venice Water Bus)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Water Transit",
    "icon": "🚤",
    "scenario": "Buying a day pass for the Venice vaporetto, asking how to reach Piazza San Marco.",
    "starterPrompt": "Buongiorno! Benvenuto a Venezia. Vuole il biglietto singolo o l'abbonamento giornaliero per il vaporetto?",
    "starterQuestions": [
      "Quale linea porta direttamente a San Marco?",
      "Ci sono fermate intermedie a Rialto?"
    ]
  },
  {
    "id": "sp_it_11",
    "title": "Colloquio nel Settore Moda e Design a Milano (Milan Job Interview)",
    "language": "Italian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Fashion & Tech",
    "icon": "💼",
    "scenario": "Interviewing for an e-commerce platform lead position at a renowned Milanese design agency.",
    "starterPrompt": "Buongiorno, siamo lieti di conoscerla. Ci parli del suo approccio all'esperienza utente su piattaforme di lusso.",
    "starterQuestions": [
      "Come gestite le performance durante la Milano Fashion Week?",
      "Qual è la sua esperienza con architetture headless?"
    ]
  },
  {
    "id": "sp_it_12",
    "title": "Partita di Serie A a San Siro (Italian Football Match)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Discussing team form, derby atmosphere, and tactical formations with an Italian tifoso.",
    "starterPrompt": "Che atmosfera incredibile stasera a San Siro! Hai visto che parata eccezionale del nostro portiere?",
    "starterQuestions": [
      "Pensi che vinceremo lo scudetto quest'anno?",
      "Quale attaccante sta facendo la differenza in campo?"
    ]
  },
  {
    "id": "sp_it_13",
    "title": "Aperitivo sui Navigli a Milano (Social Aperitivo)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Aperitivo",
    "icon": "🍹",
    "scenario": "Meeting friends for a classic Milanese aperitivo with Spritz, focaccia, and olives along the canal.",
    "starterPrompt": "Ciao! Che bello vederti! Prendiamo uno Spritz Aperol o un Campari per iniziare la serata?",
    "starterQuestions": [
      "Cosa ne pensi del buffet degli stuzzichini?",
      "Hai programmi per il weekend fuori porta?"
    ]
  },
  {
    "id": "sp_it_14",
    "title": "Cinema Italiano e Cinecittà (Italian Cinema Discussion)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema",
    "icon": "🎬",
    "scenario": "Discussing Fellini, Paolo Sorrentino, and contemporary Italian cinematic storytelling.",
    "starterPrompt": "Il cinema italiano ha una storia straordinaria. Qual è il tuo regista italiano preferito?",
    "starterQuestions": [
      "Hai mai visto 'La Grande Bellezza' di Sorrentino?",
      "Ti piacciono i film neorealisti del dopoguerra?"
    ]
  },
  {
    "id": "sp_it_15",
    "title": "Robotica Industriale e Made in Italy (Tech & Robotics)",
    "language": "Italian",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Robotics & Automation",
    "icon": "🤖",
    "scenario": "Discussing Italy's advanced industrial automation and mechatronics cluster in Emilia-Romagna.",
    "starterPrompt": "L'Italia è uno dei leader mondiali nella robotica industriale. Come vede l'integrazione di IA visiva nelle linee produttive?",
    "starterQuestions": [
      "Quali vantaggi offre l'inferenza AI on-device per i robot autonomi?",
      "Come si tutelano i brevetti tecnologici?"
    ]
  },
  {
    "id": "sp_it_16",
    "title": "Spesa al Mercato di Campo de' Fiori (Roman Food Market)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Market Shopping",
    "icon": "🍅",
    "scenario": "Buying San Marzano tomatoes, fresh pecorino romano, and basil from local market vendors.",
    "starterPrompt": "Buongiorno signore! Guardi che bei pomodori maturi oggi! Quanti chili gliene peso?",
    "starterQuestions": [
      "Vuole anche un pezzo di pecorino romano stagionato?",
      "Le serve una busta per la spesa?"
    ]
  },
  {
    "id": "sp_it_17",
    "title": "Giro in Bicicletta sulle Colline Toscane (Tuscany Cycling)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cycling",
    "icon": "🚴",
    "scenario": "Renting a gravel bike to explore the scenic white gravel roads (Strade Bianche) of Chianti.",
    "starterPrompt": "Ciao! Le nostre gravel bike sono pronte per le colline. Che itinerario hai scelto tra i vigneti?",
    "starterQuestions": [
      "Preferisci una salita impegnativa o un percorso panoramico?",
      "Hai con te il kit di riparazione per forature?"
    ]
  },
  {
    "id": "sp_it_18",
    "title": "Cena in Trattoria a Firenze (Florentine Steak Dinner)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥩",
    "scenario": "Ordering a traditional Bistecca alla Fiorentina, discussing doneness and Tuscan Chianti wine.",
    "starterPrompt": "Buonasera! Per la bistecca alla fiorentina consigliamo una cottura al sangue sulla brace. Va bene per voi?",
    "starterQuestions": [
      "Quale Chianti Classico desiderate abbinare alla carne?",
      "Desiderate provare il nostro tiramisù della casa?"
    ]
  },
  {
    "id": "sp_it_19",
    "title": "Noleggiare una Vespa sulla Costiera Amalfitana (Amalfi Road Trip)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Motorbike",
    "icon": "🛵",
    "scenario": "Renting a classic Vespa to drive the winding coastal road between Positano and Amalfi.",
    "starterPrompt": "Buongiorno! Ha la patente per guidare la Vespa 125? Le strade della costiera sono piene di curve spettacolari!",
    "starterQuestions": [
      "Vuole il casco con visiera parasole?",
      "Sa già dove fermarsi per scattare le foto più belle?"
    ]
  },
  {
    "id": "sp_it_20",
    "title": "Trattativa Salariale e Benefit (Salary Negotiation in Milan)",
    "language": "Italian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💼",
    "scenario": "Negotiating annual gross salary (RAL), remote working days, and company welfare bonus in Milan.",
    "starterPrompt": "La ringraziamo per l'ottimo colloquio. Qual è la sua richiesta economica in termini di RAL annuale?",
    "starterQuestions": [
      "Quanti giorni di smart working settimanali ritiene ideali?",
      "Quali benefit aziendali le interessano maggiormente?"
    ]
  },
  {
    "id": "sp_it_21",
    "title": "Serata all'Opera alla Scala di Milano (Opera & Classical Music)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Opera",
    "icon": "🎭",
    "scenario": "Attending a Verdi opera at Teatro alla Scala, discussing dress code, acoustics, and orchestra conductor.",
    "starterPrompt": "Che emozione essere qui al Teatro alla Scala! Le scenografie e l'orchestra sono tra le migliori al mondo.",
    "starterQuestions": [
      "Quale opera lirica preferisci tra quelle di Verdi e Puccini?",
      "Hai prenotato i posti nei palchi o in platea?"
    ]
  },
  {
    "id": "sp_it_22",
    "title": "Visita in Farmacia per Rimedi Naturali (Pharmacy & Health)",
    "language": "Italian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Asking the pharmacist for throat pastilles, sunblock, and natural herbal tea remedies.",
    "starterPrompt": "Buongiorno! Ha un leggero mal di gola o tosse? Le consiglio queste caramelle balsamiche con propoli.",
    "starterQuestions": [
      "È allergico a qualche principio attivo?",
      "Ha bisogno anche di una crema doposole idratante?"
    ]
  },
  {
    "id": "sp_it_23",
    "title": "Startup Digitali a Torino e Incubatori (Italian Tech Scene)",
    "language": "Italian",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Startup Ecosystem",
    "icon": "🚀",
    "scenario": "Discussing aerospace tech and automotive AI startups blooming around the Politecnico di Torino.",
    "starterPrompt": "Torino sta diventando un polo d'eccellenza per le tecnologie aerospaziali e la mobilità autonoma. Cosa ne pensa?",
    "starterQuestions": [
      "Quali sfide vede per attrarre capitali di venture capital in Italia?",
      "Come collaborate con i centri di ricerca universitari?"
    ]
  },
  {
    "id": "sp_it_24",
    "title": "Sciare sulle Dolomiti a Cortina d'Ampezzo (Dolomites Skiing)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Skiing",
    "icon": "🎿",
    "scenario": "Planning a day on the slopes of the Sellaronda ski circuit, checking snow reports and ski passes.",
    "starterPrompt": "Le piste delle Dolomiti sono perfettamente innevate oggi! Faremo il giro della Sellaronda in senso orario?",
    "starterQuestions": [
      "Hai già acquistato lo skipass Dolomiti Superski?",
      "Ci fermiamo in un rifugio per un bombardino caldo?"
    ]
  },
  {
    "id": "sp_it_25",
    "title": "Festa Patronale e Fuochi d'Artificio in Piazza (Local Town Festival)",
    "language": "Italian",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Festival",
    "icon": "🎆",
    "scenario": "Enjoying live street music, brass bands, and fireworks during a lively summer festa patronale in southern Italy.",
    "starterPrompt": "Tutta la piazza del paese è addobbata con le luminarie colorate! Hai provato i dolci tipici delle bancarelle?",
    "starterQuestions": [
      "A che ora comincia lo spettacolo dei fuochi pirotecnici?",
      "Ti piace la musica della banda tradizionale?"
    ]
  },
  {
    "id": "sp_pt_8",
    "title": "Pastel de Belém e Bica em Lisboa (Pastry & Coffee in Lisbon)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Café",
    "icon": "🥧",
    "scenario": "Ordering warm pastéis de nata with cinnamon and a bica espresso in Belém, Lisbon.",
    "starterPrompt": "Bom dia! Sejam bem-vindos! Vão querer os pastéis de nata com canela polvilhada e uma bica bem tirada?",
    "starterQuestions": [
      "Quantos pastéis vão ser para a mesa?",
      "Desejam também uma água fresca sem gás?"
    ]
  },
  {
    "id": "sp_pt_9",
    "title": "Elétrico 28 pelas Colinas de Lisboa (Historic Tram 28)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Historic Tram",
    "icon": "🚋",
    "scenario": "Boarding the yellow tram 28 through Alfama and Graça, asking about ticket validation and best viewpoints.",
    "starterPrompt": "Olá! Este elétrico sobe até ao Miradouro da Senhora do Monte. Tem o passe Navegante ou vai comprar a bordo?",
    "starterQuestions": [
      "Tem cuidado com a carteira nas viagens movimentadas!",
      "Sabe onde fica a melhor paragem para visitar o Castelo?"
    ]
  },
  {
    "id": "sp_pt_10",
    "title": "Entrevista de Emprego no Web Summit Lisboa (Tech Job Interview)",
    "language": "Portuguese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a principal full-stack role at a scale-up exhibiting at the Web Summit tech conference.",
    "starterPrompt": "Olá, parabéns pelo vosso percurso técnico. Pode falar-nos sobre como lidam com resiliência em sistemas distribuídos?",
    "starterQuestions": [
      "Qual é a vossa experiência com arquiteturas serverless e edge computing?",
      "Como gerem equipas de engenharia multiculturais?"
    ]
  },
  {
    "id": "sp_pt_11",
    "title": "Futebol no Estádio da Luz / Maracanã (Football Match Culture)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Discussing Brazilian and Portuguese football heritage, classic dribbles, and derby rivalries.",
    "starterPrompt": "Que espetáculo de jogo de futebol! O futebol jogado com paixão e técnica é pura arte, não achas?",
    "starterQuestions": [
      "Quem é o melhor jogador do campeonato neste momento?",
      "Acreditas que a seleção vai longe no torneio mundial?"
    ]
  },
  {
    "id": "sp_pt_12",
    "title": "Fado Tradicional em Alfama (Fado Music Evening)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Fado Music",
    "icon": "🎸",
    "scenario": "Listening to soulful Portuguese guitar and fado singers in an authentic candlelit tavern.",
    "starterPrompt": "Silêncio, que se vai cantar o fado! Sentes a nostalgia e a saudade na melodia da guitarra portuguesa?",
    "starterQuestions": [
      "Já conhecias a obra de Amália Rodrigues?",
      "Gostas mais de fado de Lisboa ou de Coimbra?"
    ]
  },
  {
    "id": "sp_pt_13",
    "title": "Churrasco com Amigos na Praia de Copacabana (Beach Barbecue)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Beach Gathering",
    "icon": "🏖️",
    "scenario": "Meeting friends by the beach in Rio de Janeiro for picanha barbecue, fresh coconut water, and samba.",
    "starterPrompt": "E aí, meu amigo! Pega uma água de coco bem gelada e puxa uma cadeira. O churrasco de picanha já tá saindo!",
    "starterQuestions": [
      "Vai dar um mergulho no mar antes de comer?",
      "Curte um samba de raiz ou prefere bossa nova?"
    ]
  },
  {
    "id": "sp_pt_14",
    "title": "Inteligência Artificial e Startups em Portugal e Brasil (AI Innovations)",
    "language": "Portuguese",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Artificial Intelligence",
    "icon": "🤖",
    "scenario": "Discussing the boom of Portuguese AI unicorns and Brazilian fintech innovation hubs.",
    "starterPrompt": "Lisboa e São Paulo tornaram-se polos incríveis de inteligência artificial e fintechs. Qual a vossa visão sobre este ecossistema?",
    "starterQuestions": [
      "Como avalia o uso de IA no processamento de linguagem natural em português?",
      "Quais as oportunidades para modelos em edge computing?"
    ]
  },
  {
    "id": "sp_pt_15",
    "title": "Feira da Ladra e Compras Vintage (Flea Market in Lisbon)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Flea Market",
    "icon": "🏺",
    "scenario": "Browsing antique ceramic tiles (azulejos), vinyl records, and handcrafted leather goods.",
    "starterPrompt": "Bom dia! Está à procura de azulejos antigos ou de livros em segunda mão? Posso fazer-lhe um bom desconto!",
    "starterQuestions": [
      "Gosta de peças de artesanato tradicional?",
      "Quer que embrulhe com cuidado para a viagem?"
    ]
  },
  {
    "id": "sp_pt_16",
    "title": "Surf nas Ondas Gigantes da Nazaré (Surfing & Extreme Sports)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Surfing",
    "icon": "🏄",
    "scenario": "Discussing big-wave surfing gear, ocean swell charts, and the brave world of Nazaré surf riders.",
    "starterPrompt": "As ondas no canhão da Nazaré hoje estão com mais de quinze metros! Já viu os surfistas de tow-in entrarem na água?",
    "starterQuestions": [
      "Você já experimentou fazer surf em praias mais calmas?",
      "Qual a sua prancha favorita para ondas médias?"
    ]
  },
  {
    "id": "sp_pt_17",
    "title": "Jantar de Bacalhau e Vinho do Porto (Portuguese Dinner in Porto)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍷",
    "scenario": "Tasting Bacalhau à Brás and pairing with aged Tawny Port wine in a wine cellar in Vila Nova de Gaia.",
    "starterPrompt": "Boa noite! O nosso Bacalhau à Brás é feito segundo a receita tradicional da casa. Desejam provar um vinho do Douro?",
    "starterQuestions": [
      "Preferem um vinho tinto encorpado ou um branco leve e fresco?",
      "Vão querer uma taça de Vinho do Porto para sobremesa?"
    ]
  },
  {
    "id": "sp_pt_18",
    "title": "Negociação de Salário e Trabalho Remoto (Salary & Remote Work)",
    "language": "Portuguese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💰",
    "scenario": "Negotiating compensation, remote work benefits, and health insurance at a technology firm.",
    "starterPrompt": "Gostámos imenso da vossa apresentação. Em termos de pacote remuneratório, quais são as vossas expectativas anuais?",
    "starterQuestions": [
      "Preferem regime cem por cento remoto ou modelo híbrido com visitas ao escritório?",
      "Têm interesse em planos de stock options?"
    ]
  },
  {
    "id": "sp_pt_19",
    "title": "Trilho nas Levadas da Ilha da Madeira (Hiking in Madeira)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Nature Hiking",
    "icon": "🥾",
    "scenario": "Planning a trek along lush laurel forest levada trails with waterfalls and mountain ridges.",
    "starterPrompt": "A Ilha da Madeira tem alguns dos trilhos naturais mais bonitos do mundo. Vai caminhar na Levada das 25 Fontes?",
    "starterQuestions": [
      "Tem calçado próprio para caminhada impermeável?",
      "Leva água e uma lanterna para os túneis na montanha?"
    ]
  },
  {
    "id": "sp_pt_10b",
    "title": "Roda de Capoeira e Cultura Popular (Capoeira & Martial Arts)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Martial Arts",
    "icon": "🪘",
    "scenario": "Listening to the berimbau rhythm and watching agile acrobatic capoeira moves in Salvador da Bahia.",
    "starterPrompt": "Ouça o toque do berimbau! A capoeira mistura dança, luta e tradição ancestral afro-brasileira de forma mágica.",
    "starterQuestions": [
      "Você já tentou tocar o atabaque ou o pandeiro numa roda?",
      "Conhece a história da capoeira regional e angola?"
    ]
  },
  {
    "id": "sp_pt_21",
    "title": "Consulta na Farmácia de Bairro (Local Pharmacy Advice)",
    "language": "Portuguese",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Pharmacy",
    "icon": "💊",
    "scenario": "Asking the neighborhood pharmacist for headache tablets, throat lozenges, and vitamin supplements.",
    "starterPrompt": "Bom dia! Em que posso ajudar? Está a sentir dores de cabeça ou sintomas de constipação?",
    "starterQuestions": [
      "Toma alguma medicação habitual neste momento?",
      "Prefere comprimidos efervescentes ou cápsulas normais?"
    ]
  },
  {
    "id": "sp_pt_22",
    "title": "Segurança da Informação e LGPD no Brasil (Cybersecurity & Privacy)",
    "language": "Portuguese",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Cybersecurity",
    "icon": "🛡️",
    "scenario": "Discussing data compliance with Brazilian LGPD and European GDPR for cloud mobile applications.",
    "starterPrompt": "A conformidade com a LGPD e GDPR exige controles rígidos no ciclo de vida de dados do utilizador. Como estruturam isso?",
    "starterQuestions": [
      "Como garantem que dados biométricos e de voz não sejam armazenados sem consentimento?",
      "Realizam testes de penetração regulares?"
    ]
  },
  {
    "id": "sp_pt_23",
    "title": "Passeio de Barco pelos Canais de Aveiro (Aveiro Moliceiro Boat)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Boat Tour",
    "icon": "⛵",
    "scenario": "Touring the Ria de Aveiro on a colorful painted moliceiro boat, tasting sweet 'ovos moles' delicacies.",
    "starterPrompt": "Sejam bem-vindos a Aveiro! Vamos navegar pelos canais urbanos para ver os edifícios de Arte Nova?",
    "starterQuestions": [
      "Já provaram os nossos deliciosos ovos moles de Aveiro?",
      "Gostariam de tirar uma fotografia junto à ponte dos laços?"
    ]
  },
  {
    "id": "sp_pt_24",
    "title": "Festival de Cinema e Música do Brasil (Arts & Film Festival)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Film Festival",
    "icon": "🎥",
    "scenario": "Discussing Brazilian modern cinema, documentary storytelling, and international festival accolades.",
    "starterPrompt": "O cinema nacional brasileiro tem conquistado prémios importantes em festivais internacionais como Cannes e Berlim.",
    "starterQuestions": [
      "Qual o seu filme brasileiro favorito de todos os tempos?",
      "Gosta de documentários sobre música popular e história?"
    ]
  },
  {
    "id": "sp_pt_25",
    "title": "Comemoração de São João no Porto (São João Street Festival)",
    "language": "Portuguese",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Street Party",
    "icon": "🎉",
    "scenario": "Hitting friends gently with plastic hammers, releasing paper hot air balloons, and eating grilled sardines.",
    "starterPrompt": "A noite de São João no Porto é a festa mais animada de Portugal! Já comprou o seu martelinho e o vaso de manjerico?",
    "starterQuestions": [
      "Vai comer sardinhas assadas com pimento na Ribeira?",
      "Fica acordado até ao espetáculo de fogo de artifício no rio Douro?"
    ]
  },
  {
    "id": "sp_nl_7",
    "title": "Stroopwafel en Koffie op de Markt (Stroopwafel & Coffee in Amsterdam)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Market Food",
    "icon": "🧇",
    "scenario": "Ordering a fresh warm caramel stroopwafel and black coffee on the Albert Cuyp market.",
    "starterPrompt": "Hallo! Welkom op de markt! Wil je een grote warme stroopwafel met extra karamel of liever een kleine?",
    "starterQuestions": [
      "Lust je er ook een verse kop koffie bij?",
      "Eet je hem meteen op of wil je hem meenemen?"
    ]
  },
  {
    "id": "sp_nl_8",
    "title": "Met de NS-Trein van Schiphol naar Utrecht (Dutch Rail Travel)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Train Transit",
    "icon": "🚆",
    "scenario": "Checking in with an OV-chipkaart or contactless debit card, finding the correct platform for the Intercity.",
    "starterPrompt": "Goedemorgen! Welkom bij de NS. Vergeet niet in te checken bij de poortjes met je ov-chipkaart of bankpas!",
    "starterQuestions": [
      "Moet je overstappen op station Amsterdam Centraal?",
      "Zoek je een zitplaats in de stiltecoupé van de trein?"
    ]
  },
  {
    "id": "sp_nl_9",
    "title": "Sollicitatiegesprek in de Tech-regio Eindhoven (Brainport Tech Interview)",
    "language": "Dutch",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead systems architect role in the Brainport Eindhoven high-tech semiconductor cluster.",
    "starterPrompt": "Goedemiddag, fijn dat u er bent. Kunt u toelichten hoe u complexe embedded systemen optimaliseert voor hoge prestaties?",
    "starterQuestions": [
      "Hoe ervaart u agile samenwerking binnen multidisciplinaire engineeringteams?",
      "Wat is uw visie op micro-architecturen in chiptechnologie?"
    ]
  },
  {
    "id": "sp_nl_10",
    "title": "Voetbalwedstrijd in de Johan Cruijff ArenA (Dutch Football Culture)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Discussing Ajax football legacy, Dutch total football philosophy (totaalvoetbal), and stadium energy.",
    "starterPrompt": "Wat een geweldige sfeer hier in de ArenA! Denk je dat het Nederlandse totaalvoetbal nog steeds actueel is in Europa?",
    "starterQuestions": [
      "Wie is volgens jou de beste Nederlandse voetballer aller tijden?",
      "Wat verwacht je van de uitslag van de wedstrijd vanavond?"
    ]
  },
  {
    "id": "sp_nl_11",
    "title": "Gezellige Borrel in een Bruin Café (Dutch Social Drinks)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Drinks & Snacks",
    "icon": "🍻",
    "scenario": "Enjoying craft beers, bitterballen with mustard, and good conversation in a cozy historic Amsterdam brown pub.",
    "starterPrompt": "Gezellig dat je erbij bent! Zullen we een portie warme bitterballen met mosterd bestellen bij het bier?",
    "starterQuestions": [
      "Welk lokaal speciaalbier wil je graag proeven?",
      "Wat zijn je plannen voor het aankomende weekend?"
    ]
  },
  {
    "id": "sp_nl_12",
    "title": "Nederlands Design en Moderne Kunst (Dutch Art & Design)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Art & Design",
    "icon": "🎨",
    "scenario": "Discussing Dutch masters from Rembrandt and Vermeer to modern Dutch design movements and exhibitions.",
    "starterPrompt": "Heb je de tentoonstelling in het Rijksmuseum al bezocht? De lichtinval bij Vermeer is werkelijk ongeëvenaard.",
    "starterQuestions": [
      "Houd je meer van klassieke schilderkunst of moderne kunst in het Stedelijk?",
      "Heb je de Dutch Design Week in Eindhoven wel eens bezocht?"
    ]
  },
  {
    "id": "sp_nl_13",
    "title": "Kwantumcomputers en AI in Delft (Quantum Computing & AI)",
    "language": "Dutch",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Quantum & AI",
    "icon": "💻",
    "scenario": "Discussing quantum computing algorithms and AI accelerators being developed at TU Delft and QuTech.",
    "starterPrompt": "De ontwikkelingen rond quantum computing in Delft gaan ontzettend snel. Welke impact verwacht u op cryptografie en AI?",
    "starterQuestions": [
      "Hoe kunnen hybrid on-device modellen profiteren van toekomstige quantumversnellers?",
      "Welke uitdagingen ziet u bij qubit-stabiliteit?"
    ]
  },
  {
    "id": "sp_nl_14",
    "title": "Winkelen in de Negen Straatjes (Shopping in Boutique Quarter)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Boutique Shopping",
    "icon": "🛍️",
    "scenario": "Browsing vintage clothing stores, bookshops, and artisan cheese stores in Amsterdam's Nine Streets.",
    "starterPrompt": "Goedemiddag! Kan ik u helpen met het vinden van de juiste maat, of kijkt u rustig even rond?",
    "starterQuestions": [
      "Zoekt u iets specifieks voor een speciale gelegenheid?",
      "Wilt u deze mooie leren tas even passen voor de spiegel?"
    ]
  },
  {
    "id": "sp_nl_15",
    "title": "Schaatsen op Natuurijs en Elfstedentocht (Ice Skating & Winter)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Ice Skating",
    "icon": "⛸️",
    "scenario": "Discussing speed skating techniques, canal ice thickness, and the legendary Frisian eleven cities tour.",
    "starterPrompt": "Als het hard genoeg vriest, hopen we allemaal op natuurijs! Heb jij je noren en schaatsen al geslepen?",
    "starterQuestions": [
      "Heb je de Elfstedentocht ooit meegemaakt op televisie?",
      "Schaats je liever op een overdekte ijsbaan of buiten in de natuur?"
    ]
  },
  {
    "id": "sp_nl_16",
    "title": "Haring Eten bij de Visboer (Traditional Raw Herring Snack)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🐟",
    "scenario": "Eating fresh Dutch raw herring by the tail with chopped onions and pickles at a local fish cart.",
    "starterPrompt": "Hallo! Wil je een Hollandse Nieuwe met uitjes en zuur, of heb je hem liever op een zacht wit broodje?",
    "starterQuestions": [
      "Eet je de haring op de traditionele manier aan de staart?",
      "Wil je er ook een portie warm gebakken kibbeling bij?"
    ]
  },
  {
    "id": "sp_nl_17",
    "title": "Salarisonderhandeling en Arbeidsvoorwaarden (Salary & CAO Negotiation)",
    "language": "Dutch",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "📈",
    "scenario": "Negotiating base salary, holiday allowance (vakantiegeld), and travel reimbursement under collective labor agreements.",
    "starterPrompt": "We zijn erg onder de indruk van uw kwaliteiten. Hoe verhoudt ons salarisaanbod zich tot uw wensen?",
    "starterQuestions": [
      "Heeft u voorkeur voor extra vakantiedagen of een leasebudget voor een elektrische auto?",
      "Wanneer kunt u bij ons team starten?"
    ]
  },
  {
    "id": "sp_nl_18",
    "title": "Fietsvakantie door Nationaal Park De Hoge Veluwe (Cycling Holiday)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Cycling Tour",
    "icon": "🚲",
    "scenario": "Renting a free white bike to explore heathlands, sand drifts, and the Kröller-Müller Museum sculpture park.",
    "starterPrompt": "Wat een schitterend natuurgebied om doorheen te fietsen! Heb je al edelherten of wilde zwijnen gespot op de heide?",
    "starterQuestions": [
      "Gaan we vanmiddag het Kröller-Müller museum bezoeken om de Van Goghs te zien?",
      "Heb je voldoende drinkwater meegenomen voor de fietstocht?"
    ]
  },
  {
    "id": "sp_nl_19",
    "title": "Muziekfestivals en Concerten in TivoliVredenburg (Music Venues)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music Venue",
    "icon": "🎸",
    "scenario": "Discussing the world-class acoustic concert halls at TivoliVredenburg in Utrecht and Dutch electronic music.",
    "starterPrompt": "TivoliVredenburg heeft een fantastische akoestiek voor zowel klassieke symfonieën als live jazz en popconcerten.",
    "starterQuestions": [
      "Naar wat voor concerten ga je meestal in je vrije tijd?",
      "Heb je weleens een groot festival zoals Lowlands of Pinkpop bezocht?"
    ]
  },
  {
    "id": "sp_nl_20",
    "title": "Afspraak bij de Huisarts voor Gezondheidscontrole (Doctor Visit)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "🩺",
    "scenario": "Explaining symptoms of fatigue and persistent cough to a general practitioner (huisarts).",
    "starterPrompt": "Goedemorgen, neem plaats. Wat zijn uw klachten precies en sinds wanneer heeft u er last van?",
    "starterQuestions": [
      "Heeft u koorts gemeten met een thermometer?",
      "Heeft u eerder allergische reacties gehad op bepaalde medicijnen?"
    ]
  },
  {
    "id": "sp_nl_21",
    "title": "Duurzame Energie en Windmolenparken op Zee (Clean Tech & Energy)",
    "language": "Dutch",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Clean Technology",
    "icon": "💨",
    "scenario": "Discussing massive North Sea offshore wind farms, hydrogen storage, and sustainable energy grid balancing.",
    "starterPrompt": "Nederland investeert fors in gigantische windparken op de Noordzee. Welke technologische uitdagingen ziet u voor netcongestie?",
    "starterQuestions": [
      "Hoe kunnen slimme AI-algoritmen het elektriciteitsnetwerk in realtime balanceren?",
      "Wat is de rol van groene waterstof in de zware industrie?"
    ]
  },
  {
    "id": "sp_nl_22",
    "title": "Koninginnedag en Koningsdag Tradities (King's Day Celebration)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "National Holiday",
    "icon": "👑",
    "scenario": "Wearing orange, participating in the nationwide vrijmarkt (flea market), and street concerts on April 27th.",
    "starterPrompt": "Heb je je oranje outfit al klaar voor Koningsdag? De hele stad verandert in één groot feest met overal vrijmarkten!",
    "starterQuestions": [
      "Ga je zelf ook spulletjes verkopen op de kleedjesmarkt?",
      "Heb je al een oranje tompouce gegeten bij de bakker vanmorgen?"
    ]
  },
  {
    "id": "sp_nl_23",
    "title": "Hardlopen langs de Amstel (Running & Marathon Training)",
    "language": "Dutch",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Running",
    "icon": "🏃",
    "scenario": "Discussing running pace, marathon training routes along the Amstel river, and hydration gear.",
    "starterPrompt": "Langs de rivier de Amstel hardlopen is heerlijk rustgevend. Welke afstand train je voor dit weekend?",
    "starterQuestions": [
      "Train je voor de marathon van Amsterdam of Rotterdam?",
      "Gebruik je een sporthorloge om je hartslag en cadans bij te houden?"
    ]
  },
  {
    "id": "sp_nl_24",
    "title": "Rondvaart door de Grachten van Amsterdam (Canal Cruise)",
    "language": "Dutch",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Sightseeing",
    "icon": "🚤",
    "scenario": "Learning about historic 17th-century merchant canal houses, drawbridges, and houseboats on a boat cruise.",
    "starterPrompt": "Welkom aan boord! Kijk links naar de beroemde Magere Brug over de Amstel. Wist je dat Amsterdam meer dan duizend bruggen heeft?",
    "starterQuestions": [
      "Zou jij in zo'n karakteristieke woonboot op de gracht willen wonen?",
      "Wil je meer weten over de Gouden Eeuw van Amsterdam?"
    ]
  },
  {
    "id": "sp_nl_25",
    "title": "Documentaires en Vrijheid van Meningsuiting bij IDFA (Documentary Festival)",
    "language": "Dutch",
    "level": "Advanced",
    "category": "Entertainment",
    "subCategory": "Film Festival",
    "icon": "🎥",
    "scenario": "Attending screenings and debates at the International Documentary Film Festival Amsterdam (IDFA).",
    "starterPrompt": "Het IDFA brengt elk jaar krachtige verhalen van over de hele wereld samen. Welke documentaire heeft jou diep geraakt?",
    "starterQuestions": [
      "Vind je dat documentaires maatschappelijke verandering in gang kunnen zetten?",
      "Wat vond je van het vraag-en-antwoordgesprek met de regisseur?"
    ]
  },
  {
    "id": "sp_sv_7",
    "title": "Fika med Kanelbulle på Gamla Stan (Swedish Fika & Coffee)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Café",
    "icon": "☕",
    "scenario": "Taking a classic Swedish fika break with a warm cinnamon bun and strong brewed filter coffee in Stockholm.",
    "starterPrompt": "Hej och välkommen! Ska det vara en färsk kanelbulle med pärlsocker och en kopp bryggkaffe?",
    "starterQuestions": [
      "Vill du ha påtår (gratis påfyllning) på kaffet?",
      "Föredrar du en kardemummabulle istället?"
    ]
  },
  {
    "id": "sp_sv_8",
    "title": "Ta Tunnelbanan och Beundra Konsten (Stockholm Metro Art)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Metro Transit",
    "icon": "🚇",
    "scenario": "Exploring the Stockholm metro cave stations, dubbed the world's longest art exhibition.",
    "starterPrompt": "Hej! Visste du att T-Centralen och Solna Centrum är kända för sina fantastiska grottmålningar?",
    "starterQuestions": [
      "Har du ett SL-kort eller blippar du med betalkortet i spärren?",
      "Ska du åka med den röda eller blå linjen?"
    ]
  },
  {
    "id": "sp_sv_9",
    "title": "Teknisk Intervju hos Spotify / Klarna (Stockholm Tech Interview)",
    "language": "Swedish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a senior engineering role at a world-leading Swedish music or fintech scale-up.",
    "starterPrompt": "Hej, roligt att träffas! Kan du berätta om hur du bygger skalbara mikrotjänster med hög feltolerans?",
    "starterQuestions": [
      "Hur ser din erfarenhet ut gällande strömmande data med låg latens?",
      "Hur arbetar du med feedback i autonoma team?"
    ]
  },
  {
    "id": "sp_sv_10",
    "title": "Ishockeymatch i Avicii Arena (Ice Hockey Championship)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Ice Hockey",
    "icon": "🏒",
    "scenario": "Discussing Swedish SHL ice hockey, slapshot power, and the electric atmosphere in the arena.",
    "starterPrompt": "Vilken otrolig stämning i Globen ikväll! Tror du Tre Kronor har vad som krävs för att ta guld i hockey-VM?",
    "starterQuestions": [
      "Vem tycker du är den mest värdefulla spelaren på isen just nu?",
      "Hur ser du på lagets powerplay-taktik i andra perioden?"
    ]
  },
  {
    "id": "sp_sv_11",
    "title": "Traditionellt Midsommarfirande (Midsummer Dance & Feast)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Midsummer",
    "icon": "🌸",
    "scenario": "Dancing around the majstång, singing 'Små grodorna', and enjoying pickled herring and fresh new potatoes.",
    "starterPrompt": "Glad midsommar! Har du plockat blommor till kransen? Kom med och dansa runt midsommarstången!",
    "starterQuestions": [
      "Har du smakat inlagd sill och färskpotatis med gräddfil och gräslök?",
      "Vilken är din favoritsång under midsommarfesten?"
    ]
  },
  {
    "id": "sp_sv_12",
    "title": "Nordic Noir och Svenska Kriminalromaner (Crime Fiction & TV)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Crime Fiction",
    "icon": "📖",
    "scenario": "Discussing Stieg Larsson, Henning Mankell, and dark Nordic crime thrillers.",
    "starterPrompt": "Nordic Noir har blivit ett globalt fenomen. Vad är det som gör svenska deckare så fängslande och stämningsfulla?",
    "starterQuestions": [
      "Har du läst Millennium-trilogin eller sett 'Bron'?",
      "Föredrar du psykologiska thrillers eller klassiska polisutredningar?"
    ]
  },
  {
    "id": "sp_sv_13",
    "title": "Spelutveckling och AI hos Svenska Spelstudior (Game Engine Tech)",
    "language": "Swedish",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Game Development",
    "icon": "🎮",
    "scenario": "Discussing Stockholm's booming gaming cluster (Dice, Mojang, King), Frostbite engine, and generative graphics.",
    "starterPrompt": "Sverige är en gigant inom global spelutveckling. Hur tror du generativ AI kommer att förändra speldesign och karaktärsdialoger?",
    "starterQuestions": [
      "Hur optimerar man grafikmotorer för att undvika frame drops?",
      "Vilken roll spelar procedurmässig världsgenerering i moderna spel?"
    ]
  },
  {
    "id": "sp_sv_14",
    "title": "Handla Inredning och Hållbarhet (Nordic Design & Sustainability)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Design Shopping",
    "icon": "🪑",
    "scenario": "Browsing minimalist Scandinavian furniture, clean wooden lighting, and recycled ceramics.",
    "starterPrompt": "Hej! Letar du efter något specifikt till vardagsrummet? Våra möbler i svensk björk och ek är tillverkade med hållbara metoder.",
    "starterQuestions": [
      "Föredrar du en ljus och minimalistisk stil eller mer färgstarka textilier?",
      "Vill du ha hjälp med hemleverans?"
    ]
  },
  {
    "id": "sp_sv_15",
    "title": "Längdskidåkning i Vasaloppets Spår (Cross-Country Skiing)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Skiing",
    "icon": "🎿",
    "scenario": "Discussing endurance training, ski wax selection (fästvalla), and participating in the historic 90km Vasaloppet.",
    "starterPrompt": "Spåren i Dalarna är fantastiska idag! Har du vallat skidorna för nysnö och minusgrader?",
    "starterQuestions": [
      "Har du som mål att genomföra det klassiska Vasaloppet någon gång?",
      "Hur tränar du kondition och stakning under barmarkssäsongen?"
    ]
  },
  {
    "id": "sp_sv_16",
    "title": "Middag med Köttbullar och Rårörda Lingon (Classic Swedish Dinner)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍲",
    "scenario": "Ordering traditional Swedish meatballs with velvety cream sauce, pressed cucumber, and tart lingonberries.",
    "starterPrompt": "Välkommen till restaurangen! Ska det vara våra hemlagade köttbullar med potatismos, gräddsås och rårörda lingon?",
    "starterQuestions": [
      "Vill du ha traditionell pressgurka till köttbullarna?",
      "Önskar du ett glas svenskt hantverksöl till maten?"
    ]
  },
  {
    "id": "sp_sv_17",
    "title": "Löneförhandling och Kollektivavtal (Salary Negotiation in Sweden)",
    "language": "Swedish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "📊",
    "scenario": "Discussing salary reviews, occupational pension (tjänstepension), and generous parental leave policies.",
    "starterPrompt": "Vi är mycket nöjda med dina intervjuer. Vad är ditt löneanspråk med tanke på tjänstens ansvarsområden?",
    "starterQuestions": [
      "Hur ser du på balansen mellan arbete och privatliv (work-life balance)?",
      "Har du frågor om vårt kollektivavtal och förmåner?"
    ]
  },
  {
    "id": "sp_sv_18",
    "title": "Båttur i Stockholms Skärgård (Stockholm Archipelago Cruise)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Boat Cruise",
    "icon": "⛵",
    "scenario": "Cruising past thousands of rocky pine-covered granite islands aboard a historic white steamboat.",
    "starterPrompt": "Välkommen ombord på skärgårdsbåten! Ska du kliva av vid Sandhamn för att vandra eller åker du hela vägen till Utö?",
    "starterQuestions": [
      "Har du besökt någon av de yttre karga skärgårdsöarna tidigare?",
      "Vill du sitta ute på akterdäck och njuta av havsbrisen?"
    ]
  },
  {
    "id": "sp_sv_19",
    "title": "Melodifestivalen och Svensk Popmusik (Eurovision & Music)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Pop Music",
    "icon": "🎤",
    "scenario": "Discussing ABBA, Max Martin, Eurovision songwriting traditions, and Sweden's pop dominance.",
    "starterPrompt": "Sverige har en otrolig förmåga att skapa internationella pophits. Tittar du på Melodifestivalen varje lördag under våren?",
    "starterQuestions": [
      "Vem är din favoritartist i svensk musikhistoria?",
      "Vad är hemligheten bakom den svenska musikexportens framgångar?"
    ]
  },
  {
    "id": "sp_sv_20",
    "title": "Bastubad och Vinterbad i Isvak (Sauna & Ice Bathing)",
    "language": "Swedish",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Wellness",
    "icon": "❄️",
    "scenario": "Taking a wood-fired sauna and jumping into an icy lake hole to boost circulation and energy.",
    "starterPrompt": "Värmen i bastun är underbar efter en kall vinterdag! Vågar du doppa dig i isvaken efteråt för en riktig adrenalinkick?",
    "starterQuestions": [
      "Hur länge brukar du sitta i bastun innan du svalkar dig?",
      "Känner du hur blodet börjar pumpa och hela kroppen vaknar till liv?"
    ]
  },
  {
    "id": "sp_sv_21",
    "title": "Grön Energi och Fossilfritt Stål (Green Tech & Industrial Transition)",
    "language": "Swedish",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Clean Tech",
    "icon": "⚡",
    "scenario": "Discussing Sweden's green industrial revolution in Norrland: green hydrogen, fossil-free steel (HYBRIT), and Northvolt battery gigafactories.",
    "starterPrompt": "Norra Sverige leder omställningen till fossilfritt stål med vätgasteknik. Hur ser du på skalbarheten i denna gröna industriella revolution?",
    "starterQuestions": [
      "Hur kan energilagring och smart elnätshantering stabilisera förnybar elproduktion?",
      "Vilka miljöutmaningar måste lösas vid mineralbrytning för batterier?"
    ]
  },
  {
    "id": "sp_sv_22",
    "title": "Kräftskiva i Sensommaren (Crayfish Party Traditions)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Party",
    "icon": "🦞",
    "scenario": "Wearing funny paper hats, singing drinking songs (snapsvisor), and peeling freshwater crayfish outdoors.",
    "starterPrompt": "Välkommen till årets kräftskiva! Sätt på dig pappershatten och häng upp månlampan. Är du redo att stämma upp i en snapsvisa?",
    "starterQuestions": [
      "Föredrar du svenska signalkräftor eller havskräftor från västkusten?",
      "Gillar du att äta västerbottensostpaj till kräftorna?"
    ]
  },
  {
    "id": "sp_sv_23",
    "title": "Paddla Kajak runt Djurgården (Kayaking in the Capital)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Kayaking",
    "icon": "🛶",
    "scenario": "Renting a sea kayak to paddle along scenic Djurgårdsbrunnskanalen and open Stockholm waterways.",
    "starterPrompt": "Vattnet är alldeles spegelblankt runt Djurgården idag! Har du paddlat kajak i stadsmiljö tidigare?",
    "starterQuestions": [
      "Vill du ha ett vattentätt fodral till mobiltelefonen under paddlingen?",
      "Ska vi paddla förbi Vasamuseet och Gröna Lund på tillbakavägen?"
    ]
  },
  {
    "id": "sp_sv_24",
    "title": "Upptäck Vikingatiden i Birka (Viking History Day Trip)",
    "language": "Swedish",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "History & Culture",
    "icon": "🛡️",
    "scenario": "Taking a boat trip on Lake Mälaren to the historic Viking settlement of Birka on Björkö.",
    "starterPrompt": "Här på ön Birka låg Sveriges första riktiga stad under vikingatiden. Vill du följa med på den guidade turen bland gravfälten?",
    "starterQuestions": [
      "Vad överraskar dig mest med hur vikingarna faktiskt levde till vardags?",
      "Vill du besöka det rekonstruerade vikingakvarteret vid vattnet?"
    ]
  },
  {
    "id": "sp_sv_25",
    "title": "Nobelpriset och Vetenskaplig Forskning (Nobel Prize & Science)",
    "language": "Swedish",
    "level": "Advanced",
    "category": "Entertainment",
    "subCategory": "Science & Culture",
    "icon": "🔬",
    "scenario": "Discussing the annual Nobel Prize ceremony in Stockholm City Hall, breakthrough discoveries, and scientific progress.",
    "starterPrompt": "Varje år i december riktas hela världens blickar mot Stockholms stadshus och Nobelbanketten. Vilken upptäckt har imponerat mest på dig?",
    "starterQuestions": [
      "Hur tror du artificiell intelligens kommer att belönas med framtida Nobelpris?",
      "Har du besökt Nobelprismuseet i Gamla Stan?"
    ]
  },
  {
    "id": "sp_zh_7",
    "title": "在茶餐厅点早茶点心 (Ordering Dim Sum in a Tea House)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Dim Sum",
    "icon": "🥟",
    "scenario": "Ordering steamed shrimp dumplings (Har Gow), pork buns, and Jasmine tea from rolling carts.",
    "starterPrompt": "您好，欢迎光临！今天喝什么茶？我们有新鲜出炉的虾饺、烧卖和叉烧包，要来一笼尝尝吗？",
    "starterQuestions": [
      "您要乌龙茶还是茉莉花茶？",
      "点心需要多加一份辣椒酱或酱油吗？"
    ]
  },
  {
    "id": "sp_zh_8",
    "title": "乘坐京沪高铁出行 (Beijing-Shanghai High-Speed Train)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "High-Speed Rail",
    "icon": "🚄",
    "scenario": "Booking a 350 km/h Fuxing bullet train ticket, checking in at Beijing South Railway station.",
    "starterPrompt": "您好！请出示您的身份证或护照。您购买的是前往上海虹桥的G1次高铁列车，二等座在5号车厢。",
    "starterQuestions": [
      "您需要靠窗的座位还是过道座位？",
      "需要帮您托运大件行李吗？"
    ]
  },
  {
    "id": "sp_zh_9",
    "title": "中关村科技园区技术面试 (Zhongguancun AI Tech Interview)",
    "language": "Chinese (Mandarin)",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a senior machine learning engineer position at a leading AI research lab in Beijing.",
    "starterPrompt": "您好，欢迎参加本次技术面试。请详细介绍一下您在端侧模型轻量化与低延迟推理方面的实战经验。",
    "starterQuestions": [
      "在有限的设备算力下，您如何平衡模型精度与响应速度？",
      "如何设计高并发、分布式的微服务推理集群？"
    ]
  },
  {
    "id": "sp_zh_10",
    "title": "乒乓球友谊赛与技巧切磋 (Table Tennis Match & Tactics)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Table Tennis",
    "icon": "🏓",
    "scenario": "Playing a friendly ping-pong match, discussing spin mechanics, penhold vs shakehand grip.",
    "starterPrompt": "好球！刚才那个正手弧圈球旋转太强了！你平时打球习惯用直拍还是横拍？",
    "starterQuestions": [
      "要不要再打一局十一分制的决胜局？",
      "你觉得乒乓球里最重要的发球技巧是什么？"
    ]
  },
  {
    "id": "sp_zh_11",
    "title": "胡同四合院茶话会 (Hutong Courtyard Tea Gathering)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Tea Culture",
    "icon": "🍵",
    "scenario": "Sipping fine Longjing tea in a traditional Beijing courtyard, discussing neighborhood history and changes.",
    "starterPrompt": "快请进！北京春天的四合院最舒服了。来尝尝我刚泡的明前龙井，香气扑鼻！",
    "starterQuestions": [
      "你在北京生活多久了？喜欢胡同里的慢节奏生活吗？",
      "周末喜欢去什刹海还是南锣鼓巷走走？"
    ]
  },
  {
    "id": "sp_zh_12",
    "title": "科幻电影与流浪地球讨论 (Chinese Sci-Fi & Cinema)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema",
    "icon": "🎬",
    "scenario": "Discussing hard sci-fi films like 'The Wandering Earth', special visual effects, and Liu Cixin's books.",
    "starterPrompt": "你看过《流浪地球》和刘慈欣的《三体》小说吗？中国科幻电影的特效和叙事在近几年取得了巨大飞跃！",
    "starterQuestions": [
      "你最喜欢《三体》里的哪一部或者哪个角色？",
      "你觉得宏大的硬科幻更吸引人，还是细腻的情感故事更好看？"
    ]
  },
  {
    "id": "sp_zh_13",
    "title": "多模态大模型与具身智能 (Multimodal AI & Robotics)",
    "language": "Chinese (Mandarin)",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Artificial Intelligence",
    "icon": "🤖",
    "scenario": "Discussing multimodal vision-language models, edge computing chips, and embodied humanoid robots.",
    "starterPrompt": "多模态智能与人形机器人的结合是未来十年的大趋势。您认为端侧神经处理单元（NPU）如何助力实时交互？",
    "starterQuestions": [
      "大语言模型在工业制造与自动化中有哪些实际落地场景？",
      "如何解决端侧部署时的内存带宽瓶颈？"
    ]
  },
  {
    "id": "sp_zh_14",
    "title": "潘家园旧货市场淘古玩 (Antique Market Bargaining)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Flea Market",
    "icon": "🏺",
    "scenario": "Browsing vintage ceramics, jade pendants, and calligraphy scrolls at Panjiayuan market.",
    "starterPrompt": "老板，这件青花瓷茶壶怎么卖？能不能给我便宜点？如果是真心想卖，你说个实在价！",
    "starterQuestions": [
      "这是景德镇手工烧制的吗？",
      "除了瓷器，你们这里有好的紫砂壶推荐吗？"
    ]
  },
  {
    "id": "sp_zh_15",
    "title": "攀登慕田峪长城 (Hiking the Mutianyu Great Wall)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Sightseeing",
    "icon": "🧱",
    "scenario": "Hiking along the restored watchtowers of the Great Wall, riding the cable car and toboggan.",
    "starterPrompt": "不到长城非好汉！今天天气真晴朗，长城在群山中绵延起伏，景色太壮观了！我们走缆车上去还是步行爬坡？",
    "starterQuestions": [
      "你带了充足的饮用水和登山杖吗？",
      "下山的时候你想体验一下刺激的旱地滑道吗？"
    ]
  },
  {
    "id": "sp_zh_16",
    "title": "品尝正宗北京烤鸭 (Authentic Peking Roast Duck Dinner)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🦆",
    "scenario": "Watching the chef carve crispy roast duck tableside, wrapping it in thin pancakes with sweet bean sauce.",
    "starterPrompt": "师傅正在旁边片鸭子呢！看这皮烤得多金黄酥脆！蘸点甜面酱、夹上葱丝黄瓜条，用荷叶饼卷起来吃！",
    "starterQuestions": [
      "鸭架您是想熬汤还是做成椒盐鸭架？",
      "喜欢吃酥脆的鸭皮蘸白糖吗？"
    ]
  },
  {
    "id": "sp_zh_17",
    "title": "年终薪资与股票期权谈判 (Salary & Equity Negotiation)",
    "language": "Chinese (Mandarin)",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💰",
    "scenario": "Negotiating base compensation package, performance bonuses, and stock vesting schedules.",
    "starterPrompt": "我们对您的技术背景非常认可。对于整体的薪酬结构，包括基本月薪、年终奖和期权分配，您有什么具体预期？",
    "starterQuestions": [
      "您对公司的期权归属周期和行权条件有疑问吗？",
      "关于远程办公和弹性工作制，您的要求是怎样的？"
    ]
  },
  {
    "id": "sp_zh_18",
    "title": "羽毛球双打战术与配合 (Badminton Doubles Match)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Badminton",
    "icon": "🏸",
    "scenario": "Discussing front-court net kills, smash placement, and rotational defense with a badminton partner.",
    "starterPrompt": "好杀球！落点太刁钻了！下半场我们前后站位，你在前场封网，我负责后场连续杀球和吊球！",
    "starterQuestions": [
      "你习惯穿几号磅数的羽毛球拍？",
      "防守接杀的时候拍面要放平还是挑高球？"
    ]
  },
  {
    "id": "sp_zh_19",
    "title": "同仁堂中药房看老中医 (Traditional Chinese Medicine Visit)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "🌿",
    "scenario": "Explaining symptoms of heat exhaustion, taking pulse (ba mai), and getting herbal soup prescriptions.",
    "starterPrompt": "大夫您好，我最近总是睡眠不太好，而且容易上火、口渴。能帮我把把脉、开几副调理气血的中药吗？",
    "starterQuestions": [
      "平时工作压力大吗？有没有经常熬夜？",
      "中药需要为您在药房代煎成便携包装吗？"
    ]
  },
  {
    "id": "sp_zh_20",
    "title": "国风民乐与古筝演奏会 (Traditional Music Concert)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎵",
    "scenario": "Attending a concert of guzheng, pipa, and erhu performing classical pieces like 'High Mountains and Flowing Water'.",
    "starterPrompt": "刚才那一曲《高山流水》的古筝独奏太震撼了，琴音清脆如泉水流动，意境非常悠远！",
    "starterQuestions": [
      "你喜欢听民族弹拨乐器还是吹管乐器如箫和笛子？",
      "你觉得传统民乐和现代流行音乐的国风融合怎么样？"
    ]
  },
  {
    "id": "sp_zh_21",
    "title": "校友创业沙龙与人脉拓展 (Alumni Entrepreneurship Salon)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Networking",
    "icon": "🤝",
    "scenario": "Connecting with university alumni at an entrepreneurial mixer in Haidian, exchanging startup pitches.",
    "starterPrompt": "师兄师姐好！很高兴在校友沙龙见到大家。我们团队正在研发一款面向跨国企业的实时多语言AI通信工具！",
    "starterQuestions": [
      "你们目前正在进行天使轮融资吗？",
      "在海外市场推广方面，你们有什么独特的渠道战略？"
    ]
  },
  {
    "id": "sp_zh_22",
    "title": "国产开源大模型与开发者社区 (Open Source LLM Ecosystem)",
    "language": "Chinese (Mandarin)",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Open Source",
    "icon": "💻",
    "scenario": "Discussing community fine-tuning, quantized deployment, and Chinese open-source AI models.",
    "starterPrompt": "中国开源大模型社区近期发展非常迅猛。您在自己的开源项目里更倾向于使用哪种量化推理引擎？",
    "starterQuestions": [
      "如何构建高质量的中英文双语对齐微调数据集？",
      "您认为开源生态对降低企业AI落地成本起到了多大作用？"
    ]
  },
  {
    "id": "sp_zh_23",
    "title": "武当太极拳修身与冥想 (Tai Chi & Inner Wellness)",
    "language": "Chinese (Mandarin)",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Tai Chi",
    "icon": "🥋",
    "scenario": "Learning slow, flowing Tai Chi movements in a park at sunrise, focusing on breathing and balance.",
    "starterPrompt": "吸气沉丹田，双手慢慢向上抬起，动作要柔和连贯，用意不用力。感受清晨新鲜的空气！",
    "starterQuestions": [
      "练习太极拳多久能感受到身体平衡和柔韧性的提升？",
      "在日常快节奏生活中，太极是否能帮助您减轻压力？"
    ]
  },
  {
    "id": "sp_zh_24",
    "title": "游览杭州西湖与乘摇橹船 (Hangzhou West Lake Boat Tour)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Sightseeing",
    "icon": "🛶",
    "scenario": "Taking a wooden rowing boat on West Lake, admiring the Three Pools Mirroring the Moon.",
    "starterPrompt": "水光潋滟晴方好，山色空蒙雨亦奇！乘着摇橹船在西湖碧波上荡漾，仿佛置身于水墨画之中！",
    "starterQuestions": [
      "船家，能给我们讲讲苏堤和白堤的历史故事吗？",
      "上岸后我们去尝尝正宗的西湖醋鱼和龙井虾仁好吗？"
    ]
  },
  {
    "id": "sp_zh_25",
    "title": "国产独立游戏与黑神话悟空热议 (Black Myth Wukong & Gaming)",
    "language": "Chinese (Mandarin)",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Gaming",
    "icon": "🐒",
    "scenario": "Debating high-budget AAA action RPG mechanics, Unreal Engine 5 graphics, and Sun Wukong lore.",
    "starterPrompt": "《黑神话：悟空》在全世界引发了巨大的反响！游戏里对中国古代古建筑和陕北说书的还原简直是文化奇迹！",
    "starterQuestions": [
      "你在游戏里打败了哪个难度最高的BOSS？",
      "你觉得以中国神话为背景的游戏未来会在全球占据更大的市场吗？"
    ]
  },
  {
    "id": "sp_hi_7",
    "title": "पुरानी दिल्ली के करीम्स में डिनर (Dinner at Karim's Old Delhi)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍛",
    "scenario": "Ordering mutton korma, tandoori roti, and phirni dessert in historic Old Delhi.",
    "starterPrompt": "नमस्ते सर! करीम्स में आपका स्वागत है। आज आप क्या लेंगे? हमारी मटन कोरमा और रेशमी कबाब बहुत मशहूर हैं!",
    "starterQuestions": [
      "आपको तीखा पसंद है या सामान्य मसालेदार?",
      "साथ में गरमा-गरम बटर नान लाएं या खमीरी रोटी?"
    ]
  },
  {
    "id": "sp_hi_8",
    "title": "दिल्ली मेट्रो में कार्ड रिचार्ज और यात्रा (Delhi Metro Transit)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Metro",
    "icon": "🚇",
    "scenario": "Recharging smart card at Rajiv Chowk station, asking for Yellow Line transfer to Gurgaon.",
    "starterPrompt": "नमस्ते! मुझे राजीव चौक से हुडा सिटी सेंटर गुड़गांव जाना है। क्या यह येलो लाइन सीधे जाएगी?",
    "starterQuestions": [
      "स्मार्ट कार्ड में कितना बैलेंस रिचार्ज करना चाहते हैं?",
      "क्या पीक ऑवर्स में मेट्रो में बहुत भीड़ होती है?"
    ]
  },
  {
    "id": "sp_hi_9",
    "title": "बेंगलुरु टेक स्टार्टअप में जॉब इंटरव्यू (Bengaluru Tech Interview)",
    "language": "Hindi",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a principal cloud architect position in India's Silicon Valley.",
    "starterPrompt": "नमस्ते, आपका स्वागत है। कृपया हमें अपने क्लाउड आर्किटेक्चर और लो-लेटेंसी सिस्टम्स के अनुभव के बारे में बताएं।",
    "starterQuestions": [
      "स्केलेबिलिटी के दौरान डेटा कंसिस्टेंसी कैसे बनाए रखते हैं?",
      "एज डिवाइस पर एआई मॉडल चलाने में क्या चुनौतियां आती हैं?"
    ]
  },
  {
    "id": "sp_hi_10",
    "title": "आईपीएल क्रिकेट मैच और धोनी का छक्का (IPL Cricket Banter)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "Discussing IPL rivalries, death overs bowling, and legendary finishes at Wankhede Stadium.",
    "starterPrompt": "क्या रोमांचक मैच था कल रात! आखिरी ओवर में धोनी का वो छक्का देखा आपने? पूरा स्टेडियम झूम उठा था!",
    "starterQuestions": [
      "आपकी पसंदीदा आईपीएल टीम कौन सी है?",
      "इस बार विश्व कप के लिए भारत की गेंदबाजी कैसी लग रही है?"
    ]
  },
  {
    "id": "sp_hi_11",
    "title": "दोस्तों के साथ शाम की चाय और समोसा (Evening Chai & Samosa)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Chai Meetup",
    "icon": "☕",
    "scenario": "Meeting friends at a roadside tapri for ginger masala chai, piping hot samosas, and lively debates.",
    "starterPrompt": "अरे यार, बहुत दिनों बाद मिले! चलो नुक्कड़ वाली टपरी पर कड़क अदरक वाली चाय पीते हैं और समोसा खाते हैं!",
    "starterQuestions": [
      "ऑफिस का काम कैसा चल रहा है आजकल?",
      "इस वीकेंड कहीं घूमने का प्लान बना रहे हो क्या?"
    ]
  },
  {
    "id": "sp_hi_12",
    "title": "बॉलीवुड सिनेमा और नए गानों की चर्चा (Bollywood Movies & Music)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema",
    "icon": "🎬",
    "scenario": "Debating classic 90s cinema, AR Rahman's music scores, and modern OTT streaming series.",
    "starterPrompt": "ए. आर. रहमान का संगीत हमेशा दिल को छू जाता है। आपको मेलोडी वाले गाने ज्यादा पसंद हैं या सूफी संगीत?",
    "starterQuestions": [
      "हाल ही में कौन सी बॉलीवुड फिल्म या वेब सीरीज देखी आपने?",
      "क्या सिनेमाघरों में फिल्में देखने का जादू अभी भी बरकरार है?"
    ]
  },
  {
    "id": "sp_hi_13",
    "title": "भारत में आर्टिफिशियल इंटेलिजेंस और यूपीआई क्रांति (AI & UPI Tech)",
    "language": "Hindi",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Fintech & AI",
    "icon": "📱",
    "scenario": "Discussing India's digital public infrastructure (UPI, Aadhaar, ONDC) and regional language AI models.",
    "starterPrompt": "भारत में यूपीआई ने डिजिटल भुगतान को हर नागरिक तक पहुंचाया। अब भाषिणी जैसे क्षेत्रीय एआई मॉडल कैसे क्रांति ला रहे हैं?",
    "starterQuestions": [
      "क्या स्थानीय भारतीय भाषाओं में वॉयस एआई से ग्रामीण अर्थव्यवस्था को फायदा होगा?",
      "डाटा प्राइवेसी और सुरक्षा को कैसे सुनिश्चित किया जा सकता है?"
    ]
  },
  {
    "id": "sp_hi_14",
    "title": "चांदनी चौक में कपड़ों की खरीदारी और मोलभाव (Bargaining in Chandni Chowk)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "🛍️",
    "scenario": "Bargaining for embroidered kurtas and silk sarees in the bustling alleys of Chandni Chowk.",
    "starterPrompt": "भैया, इस कुर्ते का सही दाम बताओ। थोड़ा रीज़नेबल लगाओगे तो हम दो जोड़ी और खरीद लेंगे!",
    "starterQuestions": [
      "क्या यह प्योर कॉटन है या मिक्स फैब्रिक?",
      "इसका रंग धोने के बाद तो नहीं छूटेगा?"
    ]
  },
  {
    "id": "sp_hi_15",
    "title": "जयपुर के आमेर किले की यात्रा (Jaipur Amber Fort Tour)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Tourism",
    "icon": "🏰",
    "scenario": "Exploring the royal Sheesh Mahal (mirror palace) and Rajput architecture with a local guide in Jaipur.",
    "starterPrompt": "खम्मा घणी सा! आमेर किले में आपका स्वागत है। यह शीश महल राजा मानसिंह जी ने बनवाया था, इसकी नक्काशी अद्वितीय है।",
    "starterQuestions": [
      "क्या आप किले के इतिहास के बारे में विस्तृत गाइड टूर चाहते हैं?",
      "शाम को होने वाला लाइट एंड साउंड शो देखना चाहेंगे?"
    ]
  },
  {
    "id": "sp_hi_16",
    "title": "साउथ इंडियन डोसा और फिल्टर कॉफी (Dosa & Filter Coffee Breakfast)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Breakfast",
    "icon": "🥞",
    "scenario": "Enjoying crispy masala dosa with coconut chutney, sambar, and hot brass-tumbler filter coffee.",
    "starterPrompt": "गरमा-गरम क्रिस्पी मसाला डोसा तैयार है! सांभर में थोड़ा और मसाला डालें या नारियल की चटनी और चाहिए?",
    "starterQuestions": [
      "क्या आपने यहां की पारंपरिक डिग्री फिल्टर कॉफी पी है?",
      "वड़ा कुरकुरा है या नरम?"
    ]
  },
  {
    "id": "sp_hi_17",
    "title": "सैलरी और स्टॉक ऑप्शंस पर बातचीत (Salary Negotiation)",
    "language": "Hindi",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💵",
    "scenario": "Negotiating base pay, joining bonus, and ESOP vesting schedule with HR leadership.",
    "starterPrompt": "हम आपकी तकनीकी क्षमताओं से बहुत प्रभावित हैं। हमारे ऑफर के सीटीसी पैकेज पर आपके क्या विचार हैं?",
    "starterQuestions": [
      "क्या आप हाइब्रिड वर्क मॉडल से संतुष्ट हैं?",
      "कंपनी में ईएसओपी (ESOP) की वेस्टिंग पॉलिसी को लेकर कोई सवाल?"
    ]
  },
  {
    "id": "sp_hi_18",
    "title": "बैडमिंटन मैच और फिटनेस ट्रेनिंग (Badminton & Fitness)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Badminton",
    "icon": "🏸",
    "scenario": "Discussing smash defense, stamina drills, and India's international badminton achievements.",
    "starterPrompt": "आज सुबह का गेम बहुत तेज था! आपके स्मैश को डिफेंड करना काफी मुश्किल हो रहा था। आप हफ्ते में कितने दिन खेलते हैं?",
    "starterQuestions": [
      "क्या आप कोर्ट पर स्टेमिना बढ़ाने के लिए कार्डियो भी करते हैं?",
      "भारत के उभरते हुए बैडमिंटन खिलाड़ियों के बारे में आपकी क्या राय है?"
    ]
  },
  {
    "id": "sp_hi_19",
    "title": "आयुर्वेदिक क्लिनिक में परामर्श (Ayurvedic Consultation)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "🌿",
    "scenario": "Consulting an Ayurvedic vaidya about digestion, immunity boosting herbs, and yoga routines.",
    "starterPrompt": "नमस्ते वैद्य जी, मुझे मौसमी बदलाव में जल्दी सर्दी-जुकाम हो जाता है। कोई प्राकृतिक इम्युनिटी बूस्टर बताएंगे?",
    "starterQuestions": [
      "क्या आप गिलोय और तुलसी का काढ़ा पीते हैं?",
      "दिनचर्या में योगासन और प्राणायाम के लिए कितना समय निकालते हैं?"
    ]
  },
  {
    "id": "sp_hi_20",
    "title": "शास्त्रीय संगीत और ग़ज़ल की महफ़िल (Classical Music & Ghazal)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎼",
    "scenario": "Listening to soulful ghazals of Jagjit Singh and tabla rhythms at an evening baithak.",
    "starterPrompt": "जगजीत सिंह की ग़ज़लों में जो रूहानियत है, वो सीधे दिल में उतर जाती है। क्या आपको भी ग़ज़लें सुनना पसंद है?",
    "starterQuestions": [
      "उस्ताद ज़ाकिर हुसैन की तबला जुगलबंदी आपने कभी लाइव सुनी है?",
      "भारतीय शास्त्रीय संगीत में आपका पसंदीदा राग कौन सा है?"
    ]
  },
  {
    "id": "sp_hi_21",
    "title": "दीपावली की खुशियां और घर की सजावट (Diwali Festival Celebrations)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Festival",
    "icon": "🪔",
    "scenario": "Decorating the house with clay diyas, rangoli designs, exchanging kaju katli sweets with family.",
    "starterPrompt": "शुभ दीपावली! घर की सजावट बहुत सुंदर लग रही है। रंगोली में कौन-कौन से रंगों का इस्तेमाल किया?",
    "starterQuestions": [
      "क्या आपने लक्ष्मी पूजन की तैयारी कर ली है?",
      "रिश्तेदारों को देने के लिए कौन सी मिठाइयां मंगवाई हैं?"
    ]
  },
  {
    "id": "sp_hi_22",
    "title": "भारतीय स्पेस एजेंसी इसरो की उपलब्धियां (ISRO Space Tech & Missions)",
    "language": "Hindi",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Space Tech",
    "icon": "🚀",
    "scenario": "Discussing Chandrayaan moon landing, Aditya solar mission, and cost-effective rocket engineering.",
    "starterPrompt": "इसरो ने पूरी दुनिया को दिखाया कि कम बजट में भी विश्वस्तरीय अंतरिक्ष मिशन कैसे पूरे किए जाते हैं।",
    "starterQuestions": [
      "गगनयान मिशन भारत के लिए कितना बड़ा मील का पत्थर साबित होगा?",
      "स्पेस सेक्टर में प्राइवेट स्पेस स्टार्टअप्स की क्या भूमिका है?"
    ]
  },
  {
    "id": "sp_hi_23",
    "title": "सुबह की सैर और योग साधना (Morning Walk & Yoga)",
    "language": "Hindi",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Yoga",
    "icon": "🧘",
    "scenario": "Doing Surya Namaskar and Pranayama in a peaceful public park at sunrise.",
    "starterPrompt": "सुबह की ठंडी हवा में गहरी सांस लें। सूर्य नमस्कार के बारह आसनों से पूरे शरीर में नई ऊर्जा आ जाती है।",
    "starterQuestions": [
      "क्या आप अनुलोम-विलोम प्राणायाम का अभ्यास नियमित करते हैं?",
      "सुबह टहलने के बाद दिनभर मन कितना शांत रहता है?"
    ]
  },
  {
    "id": "sp_hi_24",
    "title": "वाराणसी के गंगा घाट पर नाव की सैर (Varanasi Ganges Sunrise Boat)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Sightseeing",
    "icon": "⛵",
    "scenario": "Taking an early morning wooden boat ride past Assi Ghat and Dashashwamedh Ghat, listening to temple bells.",
    "starterPrompt": "हर हर महादेव! सुबह की धूप में बनारस के घाटों का यह दृश्य स्वर्ग जैसा लगता है। दूर से आरती की घंटी सुनाई दे रही है।",
    "starterQuestions": [
      "क्या आप शाम की भव्य गंगा आरती में शामिल होंगे?",
      "बनारसी पान और मलइयो का स्वाद चखना चाहेंगे?"
    ]
  },
  {
    "id": "sp_hi_25",
    "title": "स्टैंड-अप कॉमेडी और हास्य रस (Stand-Up Comedy & Satire)",
    "language": "Hindi",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Comedy",
    "icon": "🎭",
    "scenario": "Watching an Indian stand-up comedy show about middle-class family quirks and corporate life.",
    "starterPrompt": "हंसते-हंसते पेट में दर्द हो गया! उस कॉमेडियन ने कॉर्पोरेट लाइफ और मंडे मॉर्निंग की जो नकल उतारी, वो बिल्कुल सच थी!",
    "starterQuestions": [
      "आपको सटायर और व्यंग्य पसंद है या क्लीन फैमिली कॉमेडी?",
      "आपका पसंदीदा भारतीय स्टैंड-अप कॉमेडियन कौन है?"
    ]
  },
  {
    "id": "sp_ru_7",
    "title": "Заказ Борща и Блинов в Теремке (Russian Dining & Borscht)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍲",
    "scenario": "Ordering hot borscht with sour cream, black rye bread, and sweet condensed milk blini.",
    "starterPrompt": "Здравствуйте! Добро пожаловать. Что для вас приготовить сегодня? Горячий борщ со сметаной и сытные блины?",
    "starterQuestions": [
      "Желаете добавить чесночные пампушки к супу?",
      "С какой начинкой хотите блин: с мясом или со сгущенкой?"
    ]
  },
  {
    "id": "sp_ru_8",
    "title": "Поездка на Поезде Сапсан (Sapsan High-Speed Train)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "High-Speed Rail",
    "icon": "🚄",
    "scenario": "Taking the fast Sapsan train between Moscow and St. Petersburg, showing e-tickets.",
    "starterPrompt": "Добрый день! Предъявите, пожалуйста, ваш паспорт и посадочный талон. Ваш вагон номер четыре, место у окна.",
    "starterQuestions": [
      "Вам подсказать, где находится вагон-бистро?",
      "Нужна ли помощь с размещением багажа на верхней полке?"
    ]
  },
  {
    "id": "sp_ru_9",
    "title": "Собеседование в Яндекс / Технологической Компании (Tech Interview)",
    "language": "Russian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead distributed backend engineer position in Moscow.",
    "starterPrompt": "Здравствуйте! Рады познакомиться. Расскажите о вашем опыте оптимизации алгоритмов поиска и распределенных баз данных.",
    "starterQuestions": [
      "Как вы справляетесь с пиковыми нагрузками при миллионах запросов в секунду?",
      "Какой у вас опыт работы с Go и C++ в микросервисах?"
    ]
  },
  {
    "id": "sp_ru_10",
    "title": "Хоккейный Матч КХЛ на Арене (Ice Hockey Championship)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Ice Hockey",
    "icon": "🏒",
    "scenario": "Discussing Russian hockey legends, Ovechkin's one-timer, and playoff intensity.",
    "starterPrompt": "Какая бешеная скорость на льду сегодня! Заметил, как наш вратарь вытащил шайбу в шпагате в меньшинстве?",
    "starterQuestions": [
      "Как думаешь, сможем ли мы забить в большинстве в третьем периоде?",
      "Кто твой любимый хоккеист в истории сборной?"
    ]
  },
  {
    "id": "sp_ru_11",
    "title": "Чаепитие с Друзьями на Кухне (Kitchen Tea & Deep Talks)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Tea & Friendship",
    "icon": "🫖",
    "scenario": "Drinking strong black tea from a samovar with pryaniki and jam, talking about life and philosophy.",
    "starterPrompt": "Проходи на кухню, садись! Чайник только что вскипел. Бери малиновое варенье и тульские пряники!",
    "starterQuestions": [
      "Как твои дела на работе? Давно не виделись!",
      "Какие планы на длинные майские праздники?"
    ]
  },
  {
    "id": "sp_ru_12",
    "title": "Балет 'Лебединое Озеро' в Большом Театре (Bolshoi Ballet)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Ballet & Theater",
    "icon": "🩰",
    "scenario": "Attending Tchaikovsky's Swan Lake at the Bolshoi Theatre, admiring choreography and costumes.",
    "starterPrompt": "Музыка Чайковского и грация балерин в Большом Театре просто завораживают! Ты сидишь в партере или в бельэтаже?",
    "starterQuestions": [
      "Тебе больше нравится классический балет или современные драматические спектакли?",
      "Ты уже взял программку спектакля перед началом?"
    ]
  },
  {
    "id": "sp_ru_13",
    "title": "Искусственный Интеллект и Машинное Обучение (AI & Math Excellence)",
    "language": "Russian",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Artificial Intelligence",
    "icon": "🤖",
    "scenario": "Discussing Russian mathematical foundations in neural networks, computer vision, and speech synthesis.",
    "starterPrompt": "Математическая школа всегда была сильной стороной отечественных разработчиков. Как вы оцениваете развитие локальных LLM?",
    "starterQuestions": [
      "Как вы решаете проблемы галлюцинаций в генеративных моделях?",
      "Какие алгоритмы квантования весов вы используете для ускорения инференса?"
    ]
  },
  {
    "id": "sp_ru_14",
    "title": "Покупка Зимней Одежды и Шапки-Ушанки (Winter Gear Shopping)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "🧥",
    "scenario": "Buying a warm down coat (pukhovik), wool mittens, and insulated boots for cold weather.",
    "starterPrompt": "Здравствуйте! Ищете теплый пуховик на сильные морозы до минус двадцати? Вот отличная модель с мембраной!",
    "starterQuestions": [
      "Какой размер вы обычно носите: сорок восьмой или пятидесятый?",
      "Померите эту теплую шапку из натуральной шерсти?"
    ]
  },
  {
    "id": "sp_ru_15",
    "title": "Эрмитаж и Прогулка по Санкт-Петербургу (Hermitage Museum Tour)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Museum Tour",
    "icon": "🏛️",
    "scenario": "Touring the Winter Palace in Saint Petersburg, admiring Rembrandt and Leonardo da Vinci halls.",
    "starterPrompt": "Эрмитаж поражает своим масштабом! Говорят, чтобы осмотреть каждый экспонат, нужны годы. В какой зал пойдем в первую очередь?",
    "starterQuestions": [
      "Ты хочешь посмотреть на знаменитые часы 'Павлин'?",
      "Пойдем потом гулять по набережной Мойки и Невскому проспекту?"
    ]
  },
  {
    "id": "sp_ru_16",
    "title": "Шашлыки на Природе у Реки (Summer Dacha Barbecue)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Barbecue",
    "icon": "🍢",
    "scenario": "Grilling marinated pork and lamb skewers over birch coals at a countryside dacha.",
    "starterPrompt": "Угли уже побелели, пора нанизывать мясо на шампуры! Запах дымка просто невероятный!",
    "starterQuestions": [
      "Порезать свежие помидоры, огурцы и зелень для салата?",
      "Будешь шашлык с домашним томатным соусом или аджикой?"
    ]
  },
  {
    "id": "sp_ru_17",
    "title": "Обсуждение Оклада и Бонусов с Руководством (Salary Negotiation)",
    "language": "Russian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💰",
    "scenario": "Negotiating annual bonuses, equity options, and relocation assistance with tech recruiters.",
    "starterPrompt": "Мы высоко оцениваем ваш профессионализм. Какие финансовые ожидания вы закладываете на данной позиции?",
    "starterQuestions": [
      "Важен ли для вас расширенный пакет добровольного медицинского страхования (ДМС)?",
      "Рассматриваете ли вы гибридный график работы?"
    ]
  },
  {
    "id": "sp_ru_18",
    "title": "Шахматная Партия и Тактика (Chess Strategy & Mastery)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Chess",
    "icon": "♟️",
    "scenario": "Playing a tense game of blitz chess, discussing Sicilian defense and positional sacrifices.",
    "starterPrompt": "Красивый тактический ход конем! Ты атакуешь на королевском фланге или стремишься к быстрому эндшпилю?",
    "starterQuestions": [
      "Какую партию Гарри Каспарова ты считаешь величайшей?",
      "Часто играешь в шахматы онлайн или предпочитаешь деревянную доску?"
    ]
  },
  {
    "id": "sp_ru_19",
    "title": "Поход в Аптеку за Витаминами (Pharmacy Consultation)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "💊",
    "scenario": "Asking the pharmacist for vitamin D, cough lozenges, and herbal soothing teas.",
    "starterPrompt": "Здравствуйте! Подскажите, есть ли у вас витамины для иммунитета и таблетки от сухого кашля?",
    "starterQuestions": [
      "Вам сироп на растительной основе или леденцы с эвкалиптом?",
      "Нужен ли рецепт от терапевта для этих препаратов?"
    ]
  },
  {
    "id": "sp_ru_20",
    "title": "Русский Рок и Авторская Песня (Rock Music & Poetry)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Rock Music",
    "icon": "🎸",
    "scenario": "Listening to Kino, Viktor Tsoi, and acoustic guitar anthems around an evening campfire.",
    "starterPrompt": "Песни Виктора Цоя и группы 'Кино' знает наизусть каждое поколение. Какая композиция тебе ближе всего?",
    "starterQuestions": [
      "Ты умеешь играть на шестиструнной гитаре?",
      "Слушал когда-нибудь легендарные альбомы ленинградского рок-клуба?"
    ]
  },
  {
    "id": "sp_ru_21",
    "title": "Русская Баня с Березовым Веником (Banya Steam & Wellness)",
    "language": "Russian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Wellness",
    "icon": "🧖",
    "scenario": "Experiencing a traditional wood-fired Russian banya, gentle birch bough whisking, and herbal tea.",
    "starterPrompt": "Легкого пара! В парной отличная температура и аромат свежих березовых листьев. Осторожно поддай парку на камни!",
    "starterQuestions": [
      "Хочешь после парной облиться холодной колодезной водой?",
      "Попьем душистого чая с мятой и медом для отдыха?"
    ]
  },
  {
    "id": "sp_ru_22",
    "title": "Космическая Отрасль и Спутниковые Системы (Aerospace & Space Tech)",
    "language": "Russian",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Space Tech",
    "icon": "🛰️",
    "scenario": "Discussing orbital navigation, satellite constellations, and the history of Yuri Gagarin's flight.",
    "starterPrompt": "Космонавтика открыла новую эру для всего человечества. Как вы видите развитие современных спутниковых группировок связи?",
    "starterQuestions": [
      "Какие требования предъявляются к надежности микроэлектроники в условиях космической радиации?",
      "Смогут ли частные аэрокосмические компании ускорить освоение дальнего космоса?"
    ]
  },
  {
    "id": "sp_ru_23",
    "title": "Лыжная Прогулка по Зимнему Лесу (Cross-Country Skiing in Forest)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Skiing",
    "icon": "🎿",
    "scenario": "Skiing through snow-covered birch and pine forests on a crisp sunny winter weekend.",
    "starterPrompt": "Как тихо и белоснежно в лесу! Лыжня проложена идеально. Проедем пять километров до лесного озера?",
    "starterQuestions": [
      "Ты взял с собой термос с горячим чаем?",
      "Не замерзли ли руки на таком бодрящем морозце?"
    ]
  },
  {
    "id": "sp_ru_24",
    "title": "Круиз по Реке Волге на Теплоходе (Volga River Cruise)",
    "language": "Russian",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "River Cruise",
    "icon": "🚢",
    "scenario": "Traveling by river cruiser past ancient golden-domed monasteries in Yaroslavl and Nizhny Novgorod.",
    "starterPrompt": "Добро пожаловать на борт теплохода! Мы подходим к древнему городу Ярославлю, посмотрите на купола монастырей с палубы!",
    "starterQuestions": [
      "Пойдете ли вы на пешеходную экскурсию по историческому центру города?",
      "Какая вечерняя развлекательная программа запланирована в музыкальном салоне?"
    ]
  },
  {
    "id": "sp_ru_25",
    "title": "Литература Достоевского и Толстого (Russian Literature & Philosophy)",
    "language": "Russian",
    "level": "Advanced",
    "category": "Entertainment",
    "subCategory": "Literature",
    "icon": "📚",
    "scenario": "Discussing moral dilemmas in Crime and Punishment and philosophical epics in War and Peace.",
    "starterPrompt": "Глубина психологического анализа у Достоевского не имеет равных в мировой литературе. Что вас больше всего потрясло в романе?",
    "starterQuestions": [
      "Как вы относитесь к толстовской философии ненасилия и поиска смысла жизни?",
      "Какое произведение русской классики произвело на вас самое сильное впечатление?"
    ]
  },
  {
    "id": "sp_tr_7",
    "title": "Kapalıçarşı'da Türk Çayı ve Baklava (Grand Bazaar Tea & Baklava)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Café",
    "icon": "🫖",
    "scenario": "Drinking hot brewed black tea in tulip glasses and tasting pistachio baklava in Istanbul.",
    "starterPrompt": "Hoş geldiniz efendim! Size taze demlenmiş bir tavşan kanı Türk çayı ve fıstıklı baklava ikram edelim mi?",
    "starterQuestions": [
      "Çayınızı açık mı yoksa demli mi tercih edersiniz?",
      "Kaç porsiyon baklava getireyim masanıza?"
    ]
  },
  {
    "id": "sp_tr_8",
    "title": "Boğaz Vapurunda İstanbul Seyahati (Bosphorus Ferry Commute)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Ferry Transit",
    "icon": "⛴️",
    "scenario": "Taking the scenic public ferry between Eminönü and Kadıköy, tossing simit to seagulls.",
    "starterPrompt": "Merhaba! Vapurla Kadıköy'e geçerken martılara simit atmak harika bir gelenektir! İstanbulkart'ınız var mı?",
    "starterQuestions": [
      "Dış güvertede oturup deniz manzarasını seyretmek ister misiniz?",
      "Vapurda sıcak bir çay alalım mı büfeden?"
    ]
  },
  {
    "id": "sp_tr_9",
    "title": "Levent Finans Merkezinde Yazılım Mülakatı (Tech Job Interview)",
    "language": "Turkish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead mobile and backend engineering position in Istanbul's business district.",
    "starterPrompt": "Merhaba, şirketimize hoş geldiniz. Gerçek zamanlı sesli iletişim mimarileri ve düşük gecikme konusundaki deneyiminizden bahseder misiniz?",
    "starterQuestions": [
      "Mikroservis yapılarında hata toleransını nasıl sağlıyorsunuz?",
      "Mobil cihazlarda yerel AI modellerini çalıştırma tecrübeniz var mı?"
    ]
  },
  {
    "id": "sp_tr_10",
    "title": "Süper Lig Derbisi ve Futbol Coşkusu (Turkish Football Derby)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Debating football passion, Istanbul derby rivalries (Galatasaray vs Fenerbahçe), and stadium chants.",
    "starterPrompt": "Statta inanılmaz bir atmosfer var! İlk yarıdaki o muhteşem frikik golünü gördün mü? Şampiyonluk için ne düşünüyorsun?",
    "starterQuestions": [
      "Sen hangi takımı destekliyorsun bu sezon?",
      "Sence maçın en etkili oyuncusu kimdi sahada?"
    ]
  },
  {
    "id": "sp_tr_11",
    "title": "Kadıköy Moda Sahilinde Arkadaşlar ile Sohbet (Moda Beach Meetup)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Meetup",
    "icon": "🌊",
    "scenario": "Sitting on the grassy coast in Moda Kadıköy with friends, chatting as the sun sets over the Marmara Sea.",
    "starterPrompt": "Selam dostum! Çimlerde oturup gün batımını izlemek ne kadar huzur verici. Hafta sonu için ne planlar yaptın?",
    "starterQuestions": [
      "Birazdan Moda caddesinde dondurma yemeye gidelim mi?",
      "Yeni işinde projeler nasıl gidiyor?"
    ]
  },
  {
    "id": "sp_tr_12",
    "title": "Türk Dizileri ve Sinema Dünyası (Turkish TV Series & Cinema)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema & Series",
    "icon": "🎬",
    "scenario": "Discussing globally famous Turkish dramas (diziler), cinematic directors like Nuri Bilge Ceylan.",
    "starterPrompt": "Türk dizileri dünyada büyük bir ilgiyle izleniyor. Nuri Bilge Ceylan'ın filmlerindeki sanatsal derinliği seviyor musun?",
    "starterQuestions": [
      "En son hangi Türk dizisini veya filmini izledin?",
      "Dizilerdeki duygusal müzikler ve senaryo hakkında ne düşünüyorsun?"
    ]
  },
  {
    "id": "sp_tr_13",
    "title": "Bilişim Vadisi ve Yapay Zeka Ekosistemi (Turkish Tech Hubs)",
    "language": "Turkish",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "AI Ecosystem",
    "icon": "🤖",
    "scenario": "Discussing technological innovation at Bilişim Vadisi, defense tech avionics, and generative AI.",
    "starterPrompt": "Türkiye'de teknoloji ve yapay zeka girişimleri hızla büyüyor. Özellikle yerli donanım ve yazılım entegrasyonu hakkında ne düşünüyorsunuz?",
    "starterQuestions": [
      "Uç cihazlarda çalışan hafif dil modelleri sektöre nasıl fayda sağlayacak?",
      "Yapay zeka start-up'ları için kuluçka merkezlerinin rolü nedir?"
    ]
  },
  {
    "id": "sp_tr_14",
    "title": "Mısır Çarşısı'nda Baharat ve Lokum Alışverişi (Spice Bazaar Shopping)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Market Shopping",
    "icon": "🌿",
    "scenario": "Buying authentic Turkish delight (lokum), saffron, sumac, and apple tea at the historic Spice Bazaar.",
    "starterPrompt": "Buyrunuz efendim! Narlı antep fıstıklı lokumumuzun tadına bakın. Hangi baharatlardan tartmamı istersiniz?",
    "starterQuestions": [
      "Vakumlu poşet yapalım mı seyahat için?",
      "Ihlamur ve adaçayı gibi bitki çayları da ister misiniz?"
    ]
  },
  {
    "id": "sp_tr_15",
    "title": "Kapadokya'da Sıcak Hava Balonu Turu (Cappadocia Hot Air Balloon)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Tourism",
    "icon": "🎈",
    "scenario": "Floating above fairy chimneys (peri bacaları) at sunrise in a hot air balloon in Cappadocia.",
    "starterPrompt": "Gün doğumuyla birlikte gökyüzü yüzlerce rengarenk balonla doldu! Peri bacalarının manzarası nefes kesici, değil mi?",
    "starterQuestions": [
      "Fotoğraf çekmek için hazır mısınız?",
      "İndikten sonra geleneksel şampanya kutlamasına katılacak mıyız?"
    ]
  },
  {
    "id": "sp_tr_16",
    "title": "Gaziantep Usulü Kebap ve Lahmacun Ziyafeti (Authentic Kebab Dinner)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🥩",
    "scenario": "Feasting on hand-minced Ali Nazik kebab, spicy crispy lahmacun, and cold foamy ayran.",
    "starterPrompt": "Hoş geldiniz! Kebabımızı közde domates ve biberle servis ediyoruz. Lahmacununuzun yanına bol köpüklü yayık ayranı getirelim mi?",
    "starterQuestions": [
      "Kebabınız acılı mı olsun yoksa sade mi?",
      "Yemekten sonra közde pişmiş künefe ikram edelim mi?"
    ]
  },
  {
    "id": "sp_tr_17",
    "title": "Maaş ve Yan Haklar Pazarlığı (Salary & Benefits Negotiation)",
    "language": "Turkish",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "📈",
    "scenario": "Negotiating base compensation, remote work tech allowance, and private health insurance in Istanbul.",
    "starterPrompt": "Mülakat süreciniz çok başarılı geçti. Pozisyon için sunduğumuz maaş paketi ve yan haklar hakkındaki görüşünüz nedir?",
    "starterQuestions": [
      "Özel sağlık sigortası ve yemek kartı hakları sizin için yeterli mi?",
      "İşe ne zaman başlayabilirsiniz?"
    ]
  },
  {
    "id": "sp_tr_18",
    "title": "Güreş ve Okçuluk Sporları Sohbeti (Wrestling & Traditional Archery)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Traditional Sports",
    "icon": "🏹",
    "scenario": "Discussing oil wrestling (yağlı güreş) in Kırkpınar, traditional archery, and Olympic weightlifting.",
    "starterPrompt": "Geleneksel Türk okçuluğu ve Kırkpınar güreşleri yüzyıllardır süren köklü bir geleneğe sahip. Bu sporlara ilgin var mı?",
    "starterQuestions": [
      "Tarihi yay ve ok yapım tekniklerini hiç inceledin mi?",
      "Olimpiyatlarda Türk sporcularının başarıları hakkında ne düşünüyorsun?"
    ]
  },
  {
    "id": "sp_tr_19",
    "title": "Eczaneden Şurup ve Ağrı Kesici Alma (Pharmacy Health Visit)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "💊",
    "scenario": "Describing seasonal flu symptoms, sore throat, and asking the pharmacist for appropriate medication.",
    "starterPrompt": "Geçmiş olsun! Boğaz ağrısı ve burun akıntınız mı var? Size bu bitkisel pastili ve ağrı kesiciyi öneriyorum.",
    "starterQuestions": [
      "Günde kaç defa ve yemekten sonra mı almanız gerektiğini biliyor musunuz?",
      "Başka bir alerjiniz veya kronik rahatsızlığınız var mı?"
    ]
  },
  {
    "id": "sp_tr_20",
    "title": "Bağlama ve Anadolu Rock Müziği (Anatolian Rock & Folk)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎸",
    "scenario": "Discussing Barış Manço, Erkin Koray, the acoustic sound of the saz/bağlama, and psychedelic rock.",
    "starterPrompt": "Barış Manço ve Cem Karaca'nın Anadolu Rock müziğinde yarattığı ezgiler hala dillerde. En sevdiğin şarkı hangisi?",
    "starterQuestions": [
      "Bağlama sesi sana da derin bir hüzün ve coşku veriyor mu?",
      "Geleneksel halk türkülerini dinlemeyi sever misin?"
    ]
  },
  {
    "id": "sp_tr_21",
    "title": "Tarihi Türk Hamamı Deneyimi (Traditional Turkish Bath Experience)",
    "language": "Turkish",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Wellness",
    "icon": "🛁",
    "scenario": "Relaxing on the warm marble stone (göbek taşı), enjoying a scrub (kese) and bubble foam massage.",
    "starterPrompt": "Sıhhatler olsun! Göbek taşında iyice terledikten sonra köpük masajı ve kese ile tüm yorgunluğunuz gidecek.",
    "starterQuestions": [
      "Suyun sıcaklığı sizin için uygun mu?",
      "Masajdan sonra serinleme odasında soğuk bir maden suyu veya çay içer misiniz?"
    ]
  },
  {
    "id": "sp_tr_22",
    "title": "İHA/SİHA Teknolojileri ve Aviyonik Sistemler (Aviation & Drone Tech)",
    "language": "Turkish",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Aerospace",
    "icon": "✈️",
    "scenario": "Discussing autonomous flight control algorithms, embedded vision, and aerospace achievements.",
    "starterPrompt": "Havacılık ve otonom sistemlerde Türkiye küresel ölçekte dikkat çekiyor. Uçuş kontrol yazılımlarında yapay zeka nasıl kullanılıyor?",
    "starterQuestions": [
      "Sensör füzyonu ve radar verilerinin gerçek zamanlı işlenmesinde hangi zorluklar var?",
      "Geleceğin insansız hava araçlarında elektrikli motorların yeri nedir?"
    ]
  },
  {
    "id": "sp_tr_23",
    "title": "Uludağ'da Kayak ve Kış Tatili (Skiing in Uludağ Bursa)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Skiing",
    "icon": "🏂",
    "scenario": "Planning a ski weekend in Uludağ, checking ski rental gear and mountain weather reports.",
    "starterPrompt": "Uludağ'da kar kalınlığı bir metreyi aşmış! Hafta sonu telesiyejle zirveye çıkıp kayak yapmaya hazır mısın?",
    "starterQuestions": [
      "Snowboard mu yapmayı tercih edersin yoksa klasik kayak mı?",
      "Akşam dağ otelinde şömine başında sıcak çikolata içelim mi?"
    ]
  },
  {
    "id": "sp_tr_24",
    "title": "Efes Antik Kenti ve Tarih Turu (Ephesus Ancient City Tour)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Archaeology",
    "icon": "🏛️",
    "scenario": "Walking along the marble street of Ephesus, viewing Celsus Library and the grand ancient theater.",
    "starterPrompt": "Efes Antik Kenti'nin görkemi karşısında büyülenmemek elde değil! Celsus Kütüphanesi'nin ön cephesindeki heykellere bakar mısınız?",
    "starterQuestions": [
      "Antik tiyatronun akustiğini test etmek ister misiniz?",
      "Tarih boyunca bu şehrin bir liman kenti olduğunu biliyor muydunuz?"
    ]
  },
  {
    "id": "sp_tr_25",
    "title": "Karagöz ve Hacivat Gölge Oyunu (Traditional Shadow Puppetry)",
    "language": "Turkish",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Theater",
    "icon": "🎭",
    "scenario": "Watching a humorous Ottoman shadow theater performance of Karagöz and Hacivat.",
    "starterPrompt": "Perde arkasındaki Karagöz ile Hacivat'ın kelime oyunları ve esprileri yüzyıllardır insanları güldürüyor. Bu sanatı biliyor musun?",
    "starterQuestions": [
      "Deve derisinden yapılan tasvirlerin ışıkla perdedeki dansı sana nasıl hissettiriyor?",
      "Geleneksel temaşa sanatlarının korunması neden önemlidir?"
    ]
  },
  {
    "id": "sp_ar_18",
    "title": "شراء العطور والبخور في سوق واقف (Souq Waqif Perfume & Oud)",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "🏺",
    "scenario": "Selecting authentic agarwood oud, musk, and traditional Arabic perfumes in an old marketplace.",
    "starterPrompt": "أهلاً وسهلاً بك يا أخي! ما هو عطرك المفضل؟ هل تفضل دهن العود الكمبودي الفاخر أم خشب البخور الطبيعي؟",
    "starterQuestions": [
      "كم تولّة تريد أن أزن لك اليوم؟",
      "هل جربت دهن الصندل والمسك الأبيض من قبل؟"
    ]
  },
  {
    "id": "sp_ar_19",
    "title": "ركوب مترو دبي وحجز تذكرة الذهبية (Dubai Metro Gold Class)",
    "language": "Arabic",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Metro",
    "icon": "🚇",
    "scenario": "Buying a Nol Gold card to ride the automated Dubai Metro from Burj Khalifa to the Marina.",
    "starterPrompt": "مرحباً بك في محطة المترو! هل ترغب في بطاقة نول الذهبية للاستمتاع بالمناظر البانورامية؟",
    "starterQuestions": [
      "هل وجهتك نحو مول الإمارات أم دبي مارينا؟",
      "هل تحتاج إلى خريطة شبكة المواصلات العامة في دبي؟"
    ]
  },
  {
    "id": "sp_ar_20",
    "title": "مقابلة عمل تقنية في مركز الملك عبدالله المالي (Riyadh Tech Interview)",
    "language": "Arabic",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for an AI systems architect role in Riyadh under Saudi Vision 2030 digital initiatives.",
    "starterPrompt": "أهلاً بكم في الرياض. رؤية 2030 تركز بشكل هائل على التحول الرقمي والذكاء الاصطناعي. حدثنا عن خبرتك في الأنظمة السحابية.",
    "starterQuestions": [
      "كيف تضمن أمن وسرية البيانات الحساسة على خوادم محلية؟",
      "ما هي استراتيجيتك في بناء نماذج ذكاء اصطناعي تفهم اللهجات العربية المختلفة؟"
    ]
  },
  {
    "id": "sp_ar_21",
    "title": "سهرة شاي الكرك وشاورما في المساء (Evening Karak & Shawarma)",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🌯",
    "scenario": "Meeting friends at an open-air cafeteria for spiced saffron karak chai and garlic chicken shawarma.",
    "starterPrompt": "حياك الله يا طيب! تعال نشرب شاي كرك ساخن بالزعفران مع شاورما دجاج بصلصة الثوم والمخلل!",
    "starterQuestions": [
      "هل تحب الشاورما في خبز الصاج أم الخبز اللبناني؟",
      "ما رأيك أن نطلب حبات الفلافل الساخنة مع الطحينة؟"
    ]
  },
  {
    "id": "sp_ar_22",
    "title": "مباراة كرة قدم في دوري روشن السعودي (Saudi Pro League Football)",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Discussing global superstar signings, tactical pressing, and stadium atmosphere in Riyadh or Jeddah.",
    "starterPrompt": "يا لها من مباراة حماسية وقوية الليلة! هل رأيت الهدف الرائع الذي سجله النجم العالمي في الزاوية الصعبة؟",
    "starterQuestions": [
      "من هو أفضل لاعب في الدوري هذا الموسم بحسب رأيك؟",
      "هل تتوقع فوز فريقك باللقب وكأس آسيا؟"
    ]
  },
  {
    "id": "sp_ar_23",
    "title": "أمسية شعرية وموسيقى العود التراثية (Arabic Oud & Poetry Night)",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music & Poetry",
    "icon": "🎵",
    "scenario": "Listening to emotive oud improvisations (taqsim) and classical Arabic poetry recitation.",
    "starterPrompt": "تقاسيم العود تلامس الوجدان بسحر مقاماتها الشرقية كالنهاوند والبياتي. هل تعزف على أي آلة وترية؟",
    "starterQuestions": [
      "ما هي قصيدتك الشعرية المفضلة من الشعر العربي الكلاسيكي أو الحديث؟",
      "هل تفضل أغاني كوكب الشرق أم فيروز في الصباح؟"
    ]
  },
  {
    "id": "sp_ar_24",
    "title": "سفاري صحراوي وركوب الكثبان الرملية (Desert Safari & Dunes)",
    "language": "Arabic",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Desert Adventure",
    "icon": "🐪",
    "scenario": "Riding 4x4 vehicles over golden dunes, watching the desert sunset, and enjoying Bedouin hospitality.",
    "starterPrompt": "أهلاً بك في الصحراء العربية الشاسعة! انظر كيف تنعكس أشعة الشمس الذهبية على رمال الكثبان الرملية!",
    "starterQuestions": [
      "هل ترغب في تجربة التزلج على الرمال أو ركوب الجمال؟",
      "هل استمتعت بالقهوة العربية بالهيل في الخيمة البدوية؟"
    ]
  },
  {
    "id": "sp_ar_25",
    "title": "الحوسبة السحابية ومراكز البيانات الفائقة (Hyperscale AI Cloud)",
    "language": "Arabic",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Cloud & AI",
    "icon": "⚡",
    "scenario": "Discussing sovereign cloud data centers and supercomputing clusters powering Arabic frontier LLMs.",
    "starterPrompt": "الشرق الأوسط يستثمر مليارات الدولارات في مراكز البيانات الخضراء والمستدامة. كيف تنظر إلى تطوير نماذج الذكاء الاصطناعي السيادية؟",
    "starterQuestions": [
      "كيف يمكن تقليل استهلاك الطاقة في مراكز البيانات في البيئات الحارة؟",
      "ما هو دور الذكاء الاصطناعي في قطاع الطاقة المتجددة والهيدروجين الأخضر؟"
    ]
  },
  {
    "id": "sp_ta_18",
    "title": "மசாலா தோசை மற்றும் டிகிரி பில்டர் காபி (Masala Dosa & Filter Coffee)",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Breakfast",
    "icon": "🥞",
    "scenario": "Ordering hot ghee roast masala dosa with coconut chutney and frothy brass tumbler filter coffee in Chennai or Jaffna.",
    "starterPrompt": "வணக்கம் சார்! வாங்க, உட்காருங்க! இன்னைக்கு நல்ல மொறுமொறு நெய் ரோஸ்ட் மசாலா தோசையும் சூடான டிகிரி பில்டர் காபியும் போடட்டுமா?",
    "starterQuestions": [
      "உங்களுக்கு தக்காளி சட்னி பிடிக்குமா அல்லது கார சட்னி வேண்டுமா?",
      "சாம்பாரை தோசை மேல ஊற்றவா அல்லது தனியா வைக்கவா?"
    ]
  },
  {
    "id": "sp_ta_19",
    "title": "சென்னை மெட்ரோ மற்றும் ஆட்டோ பயணம் (Chennai Metro & Auto Commute)",
    "language": "Tamil",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Metro",
    "icon": "🚇",
    "scenario": "Taking Chennai Metro from Central to Airport, then negotiating an auto rickshaw ride in T. Nagar.",
    "starterPrompt": "வணக்கம்! சென்ட்ரல் ஸ்டேஷனிலிருந்து ஏர்போர்ட்டுக்கு மெட்ரோ ரயில் எத்தனாவது பிளாட்பாரத்தில் வரும் என்று சொல்ல முடியுமா?",
    "starterQuestions": [
      "மெட்ரோ கார்டில் ரீசார்ஜ் செய்துவிட்டீர்களா?",
      "தி.நகருக்கு ஆட்டோவில் மீட்டர் போட்டு போலாமா?"
    ]
  },
  {
    "id": "sp_ta_20",
    "title": "டைடல் பார்க் ஐடி நிறுவனத்தில் வேலை நேர்காணல் (Tidel Park IT Tech Interview)",
    "language": "Tamil",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead distributed software engineer role in Chennai's IT corridor on OMR.",
    "starterPrompt": "வணக்கம், உங்களுடைய டெக்னிக்கல் அனுபவம் மிகவும் சிறப்பாக உள்ளது. குறைந்த லேட்டன்சியில் இயங்கும் சிஸ்டம்ஸ் பற்றி விவரிக்க முடியுமா?",
    "starterQuestions": [
      "மைக்ரோசர்வீஸ் கட்டமைப்பு மற்றும் கிளவுட் பாதுகாப்பில் உங்கள் அணுகுமுறை என்ன?",
      "டீம் லீடராக பெரிய புராஜெக்ட்களை எப்படி மேனேஜ் செய்வீர்கள்?"
    ]
  },
  {
    "id": "sp_ta_21",
    "title": "சேப்பாக்கம் மைதானத்தில் சிஎஸ்கே கிரிக்கெட் மேட்ச் (CSK Cricket at Chepauk)",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Cricket",
    "icon": "🏏",
    "scenario": "Cheering for Chennai Super Kings at Chepauk Stadium, discussing Dhoni's finishing mastery and spin bowling.",
    "starterPrompt": "சேப்பாக்கம் ஸ்டேடியமே மஞ்சள் மயமாக காட்சியளிக்குது! தோனி பேட்டிங் செய்ய வரும்போது விசில் சத்தம் காதை பிளக்குது இல்லையா?",
    "starterQuestions": [
      "இந்த வருடம் சிஎஸ்கே கோப்பையை வெல்லும் என்று நினைக்கிறீர்களா?",
      "இன்றைய ஆட்டத்தின் சிறந்த பந்துவீச்சாளர் யார்?"
    ]
  },
  {
    "id": "sp_ta_22",
    "title": "மெரினா கடற்கரையில் மாலை நேர காற்று (Marina Beach Evening Walk)",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Beach Gathering",
    "icon": "🌊",
    "scenario": "Walking along the cool sands of Marina Beach, enjoying sundal, fried fish, and evening small talk with friends.",
    "starterPrompt": "அடடே! மெரினா பீச் காற்று எவ்வளவு இனிமையா இருக்கு! சூடான பட்டாணி சுண்டலும் வறுத்த மீனும் வாங்கி சாப்பிடலாமா?",
    "starterQuestions": [
      "வார இறுதியில் உங்கள் நண்பர்களுடன் எங்கே செல்ல திட்டமிட்டுள்ளீர்கள்?",
      "கடற்கரையில் நடப்பது மனதுக்கு எவ்வளவு அமைதியை தருகிறது?"
    ]
  },
  {
    "id": "sp_ta_23",
    "title": "ஏ.ஆர். ரஹ்மான் இசை மற்றும் தமிழ் சினிமா விவாதம் (AR Rahman Music & Cinema)",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music & Cinema",
    "icon": "🎵",
    "scenario": "Discussing legendary Tamil film scores by Ilaiyaraaja and AR Rahman, lyrical depth and global reach.",
    "starterPrompt": "இளையராஜாவின் பின்னணி இசையும் ஏ.ஆர். ரஹ்மானின் புதிய ஒலி அமைப்புகளும் தமிழ் சினிமாவை உலக அரங்கிற்கு கொண்டு சென்றுள்ளன!",
    "starterQuestions": [
      "உங்களுக்கு மெலடி பாடல்கள் பிடிக்குமா அல்லது துள்ளலான குத்து பாடல்கள் பிடிக்குமா?",
      "சமீபத்தில் நீங்கள் பார்த்து ரசித்த தமிழ் திரைப்படம் எது?"
    ]
  },
  {
    "id": "sp_ta_24",
    "title": "பொங்கல் திருநாள் மற்றும் உழவர் கலாச்சாரம் (Pongal Harvest Festival)",
    "language": "Tamil",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Cultural Festival",
    "icon": "🌾",
    "scenario": "Celebrating Thai Pongal, boiling sweet jaggery rice in clay pots, making sugarcane rangoli.",
    "starterPrompt": "இனிய பொங்கல் நல்வாழ்த்துகள்! வீட்டின் வாசலில் அழகான கோலமிட்டு, புதுப்பானையில் பொங்கல் வைத்து பொங்கலோ பொங்கல் என்று கொண்டாடினீர்களா?",
    "starterQuestions": [
      "உழவுத் தொழிலையும் சூரிய பகவானையும் போற்றும் இந்த பண்டிகை எவ்வளவு அர்த்தமுள்ளது!",
      "மாட்டுப் பொங்கலுக்கு கிராமத்தில் ஜல்லிக்கட்டு போட்டிகள் பார்த்ததுண்டா?"
    ]
  },
  {
    "id": "sp_ta_25",
    "title": "தமிழ் மொழிக்கான செயற்கை நுண்ணறிவு மற்றும் என்எல்பி (AI & Tamil NLP Tech)",
    "language": "Tamil",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Tamil NLP",
    "icon": "🤖",
    "scenario": "Discussing ancient Tamil grammatical structures (Tholkappiyam) and modern AI tokenizer development.",
    "starterPrompt": "தொன்மையான தமிழ் மொழியை டிஜிட்டல் உலகில் அடுத்த தலைமுறைக்கு கொண்டு சேர்க்க தமிழ் AI மாடல்கள் எவ்வளவு அவசியம்!",
    "starterQuestions": [
      "தமிழில் துல்லியமான குரல் அறிதல் (Speech Recognition) உருவாக்க என்னென்ன சவால்கள் உள்ளன?",
      "மொழியின் தனித்துவமான இலக்கண விதிகளை மாடலில் எப்படி உட்படுத்துவது?"
    ]
  },
  {
    "id": "sp_ko_22",
    "title": "홍대에서 양념치킨과 생맥주 (Korean Fried Chicken & Beer in Hongdae)",
    "language": "Korean",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍗",
    "scenario": "Ordering sweet-and-spicy Korean fried chicken and draft beer in youth hotspot Hongdae.",
    "starterPrompt": "어서 오세요! 양념치킨 반, 후라이드 반으로 주문하시겠어요? 시원한 생맥주도 두 잔 바로 준비해 드릴까요?",
    "starterQuestions": [
      "치킨무와 샐러드 더 필요하시면 말씀해 주세요!",
      "매운맛 정도는 보통으로 해드릴까요, 아니면 아주 맵게 해드릴까요?"
    ]
  },
  {
    "id": "sp_ko_23",
    "title": "판교 테크노밸리 기술 면접 (Pangyo Techno Valley Tech Interview)",
    "language": "Korean",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead distributed systems engineer in Korea's Silicon Valley in Pangyo.",
    "starterPrompt": "안녕하세요, 면접에 와주셔서 감사합니다. 대규모 트래픽 환경에서 실시간 저지연 음성 처리 아키텍처를 설계한 경험에 대해 말씀해 주세요.",
    "starterQuestions": [
      "온디바이스 AI 경량화 모델 최적화 경험이 있으신가요?",
      "팀 내 코드 리뷰와 기술 공유 문화는 어떻게 조성해 오셨습니까?"
    ]
  },
  {
    "id": "sp_ko_24",
    "title": "잠실야구장에서 프로야구 응원전 (KBO Baseball Game & Chants)",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Baseball",
    "icon": "⚾",
    "scenario": "Singing batter fight songs, eating snacks, and cheering loudly in the KBO baseball stadium.",
    "starterPrompt": "와, 잠실야구장 응원 열기가 정말 대단하네요! 관중들이 다 같이 외치는 응원가 정말 신나지 않나요?",
    "starterQuestions": [
      "오늘 경기에서 누가 결승타를 칠 것 같으세요?",
      "좋아하는 KBO 프로야구 팀이 어디인가요?"
    ]
  },
  {
    "id": "sp_ko_25",
    "title": "K-POP 댄스와 음원 프로듀싱 토론 (K-Pop Production & Dance)",
    "language": "Korean",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "K-Pop",
    "icon": "🎤",
    "scenario": "Discussing global K-pop production standards, synchronization in choreography, and world tours.",
    "starterPrompt": "K-POP의 칼군무와 세련된 비트 메이킹은 전 세계 음악 시장을 사로잡았죠. 가장 좋아하는 아티스트는 누구인가요?",
    "starterQuestions": [
      "최근에 발매된 신곡 중에서 플레이리스트에 계속 반복 재생하는 곡이 있나요?",
      "K-POP 콘서트나 팬미팅에 직접 가보신 적이 있나요?"
    ]
  },
  {
    "id": "sp_vi_7",
    "title": "Ăn Phở Bò Tái Nạm tại Phố Cổ Hà Nội (Traditional Hanoi Beef Pho)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍜",
    "scenario": "Ordering authentic beef pho with herbs, lime, chili, and crispy fried dough sticks (quẩy) in Hanoi.",
    "starterPrompt": "Dạ xin chào quý khách! Bác dùng phở bò tái nạm hay phở gà ạ? Cho thêm nhiều hành hoa và quẩy giòn nhé!",
    "starterQuestions": [
      "Bác có ăn được cay không ạ, để cháu thêm ớt tươi?",
      "Bác dùng thêm trà đá hay nước chanh tươi ạ?"
    ]
  },
  {
    "id": "sp_vi_8",
    "title": "Thuê Xe Máy Phượt Đèo Hải Vân (Motorbike Ride across Hai Van Pass)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Motorbike Adventure",
    "icon": "🏍️",
    "scenario": "Renting a semi-automatic motorbike in Da Nang, checking brakes, and driving scenic mountain pass curves.",
    "starterPrompt": "Chào anh! Xe máy bên em đã đổ đầy bình xăng và bảo dưỡng phanh rất kỹ. Anh mang mũ bảo hiểm đạt chuẩn nhé!",
    "starterQuestions": [
      "Anh đã có bằng lái xe máy quốc tế chưa ạ?",
      "Đoạn đèo Hải Vân có nhiều khúc cua gấp, anh nhớ chạy chậm và chú ý gương cầu lồi nhé!"
    ]
  },
  {
    "id": "sp_vi_9",
    "title": "Phỏng Vấn Kỹ Sư Phần Mềm tại Quận 1 Sài Gòn (Tech Job Interview)",
    "language": "Vietnamese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead cloud and mobile architect role in Ho Chi Minh City's tech hub.",
    "starterPrompt": "Chào bạn, rất vui được gặp bạn hôm nay. Bạn có thể chia sẻ về kinh nghiệm tối ưu hóa độ trễ cực thấp trong xử lý âm thanh thời gian thực không?",
    "starterQuestions": [
      "Bạn quản lý kiến trúc microservices và chịu tải cao như thế nào?",
      "Kinh nghiệm của bạn về việc triển khai mô hình AI trực tiếp trên thiết bị (on-device)?"
    ]
  },
  {
    "id": "sp_vi_10",
    "title": "Xem Trận Bóng Đá Đội Tuyển Việt Nam (Vietnam National Football Match)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Cheering with millions of fans during an international football match, waving red flags on the streets.",
    "starterPrompt": "Không khí tại sân vận động Mỹ Đình thật tuyệt vời! Cú sút xa vừa rồi suýt thành bàn thắng! Bạn dự đoán tỉ số trận này thế nào?",
    "starterQuestions": [
      "Cầu thủ nào bạn ấn tượng nhất trong đội hình hôm nay?",
      "Nếu đội tuyển Việt Nam thắng trận này, tối nay chúng ta cùng đi 'bão' ăn mừng nhé!"
    ]
  },
  {
    "id": "sp_vi_11",
    "title": "Cà Phê Sữa Đá và Tán Gẫu Vỉa Hè (Sidewalk Iced Milk Coffee)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Social",
    "subCategory": "Coffee Culture",
    "icon": "☕",
    "scenario": "Sitting on low plastic stools with friends sipping rich iced condensed milk coffee and roasting sunflower seeds.",
    "starterPrompt": "Ngồi cà phê bệt vỉa hè ngắm phố xá Sài Gòn thật là thú vị! Bạn uống cà phê sữa đá đậm đà hay bạc xỉu ngọt dịu?",
    "starterQuestions": [
      "Công việc tuần này của bạn có bận rộn lắm không?",
      "Cuối tuần này bạn có kế hoạch đi đâu chơi chưa?"
    ]
  },
  {
    "id": "sp_vi_12",
    "title": "Nhạc Indie Việt và Show Ca Nhạc Acoustic (Vietnamese Indie Music)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Acoustic Music",
    "icon": "🎸",
    "scenario": "Listening to soulful Vietnamese indie singer-songwriters at a cozy dimly-lit acoustic cafe in Da Lat.",
    "starterPrompt": "Giai điệu mộc mạc và ca từ sâu lắng của những bản nhạc indie Việt Nam luôn mang lại cảm giác rất bình yên. Bạn có thích nghe acoustic không?",
    "starterQuestions": [
      "Ca sĩ hoặc ban nhạc độc lập nào bạn yêu thích nhất hiện nay?",
      "Bạn đã từng đến một quán cà phê nhạc sống ở Đà Lạt vào buổi tối chưa?"
    ]
  },
  {
    "id": "sp_vi_13",
    "title": "Hệ Sinh Thái Khởi Nghiệp AI và Công Nghệ Việt Nam (AI Ecosystem in Vietnam)",
    "language": "Vietnamese",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "AI Startups",
    "icon": "🤖",
    "scenario": "Discussing the rise of Vietnamese tech unicorns, semiconductor testing plants, and speech-to-text AI.",
    "starterPrompt": "Việt Nam đang nhanh chóng vươn lên thành trung tâm đổi mới sáng tạo công nghệ và bán dẫn trong khu vực. Bạn đánh giá thế nào về tiềm năng AI tiếng Việt?",
    "starterQuestions": [
      "Làm thế nào để xây dựng bộ dữ liệu huấn luyện tiếng Việt đa dạng các phương ngữ Bắc - Trung - Nam?",
      "Xu hướng ứng dụng AI trong tự động hóa sản xuất hiện nay ra sao?"
    ]
  },
  {
    "id": "sp_vi_14",
    "title": "Mua Sắm tại Chợ Bến Thành và Mặc Cả (Bargaining at Ben Thanh Market)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Market Shopping",
    "icon": "🛍️",
    "scenario": "Bargaining for silk scarves, ground Robusta coffee beans, and handmade wooden souvenirs.",
    "starterPrompt": "Chị ơi, chiếc khăn lụa tơ tằm này giá bao nhiêu vậy? Nếu em mua hai chiếc thì chị bớt cho em một chút nhé!",
    "starterQuestions": [
      "Khăn này có phải lụa tơ tằm dệt thủ công ở Hà Đông không chị?",
      "Chị có gói quà giúp em được không?"
    ]
  },
  {
    "id": "sp_vi_15",
    "title": "Du Thuyền Khám Phá Vịnh Hạ Long (Halong Bay Island Cruise)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Cruise",
    "icon": "⛵",
    "scenario": "Cruising among thousands of limestone karst pillars and exploring Hang Sung Sot cave in Halong Bay.",
    "starterPrompt": "Kính chào quý khách! Du thuyền chúng ta đang tiến vào trung tâm Di sản Thiên nhiên Thế giới Vịnh Hạ Long. Cảnh núi đá vôi thật kỳ vĩ!",
    "starterQuestions": [
      "Chiều nay quý khách muốn tham gia chèo thuyền kayak hay tắm biển tại đảo Ti Tốp?",
      "Quý khách có muốn thưởng thức tiệc hải sản tươi sống trên boong tàu không?"
    ]
  },
  {
    "id": "sp_vi_16",
    "title": "Thưởng Thức Bánh Mì Kẹp Thịt Giòn Rụm (Crispy Vietnamese Banh Mi)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🥖",
    "scenario": "Customizing a crispy warm banh mi with pork pâté, cold cuts, pickled daikon, cucumber, and cilantro.",
    "starterPrompt": "Bánh mì nóng giòn đây ạ! Bạn ăn bánh mì thập cẩm đầy đủ pate, chả lụa và thịt xá xíu không? Có cho ớt cay và rau ngò không bạn?",
    "starterQuestions": [
      "Có chan thêm nhiều sốt bơ trứng béo ngậy không?",
      "Bạn có muốn mua thêm một ly sữa đậu nành nóng ăn kèm không?"
    ]
  },
  {
    "id": "sp_vi_17",
    "title": "Thương Lượng Lương Thưởng và Chế Độ Phúc Lợi (Salary Negotiation)",
    "language": "Vietnamese",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💰",
    "scenario": "Negotiating annual performance bonus, 13th-month salary, and flexible working hours in Vietnam.",
    "starterPrompt": "Chúng tôi đánh giá rất cao năng lực chuyên môn của bạn. Mức lương kỳ vọng và chế độ thưởng tháng 13 của bạn như thế nào?",
    "starterQuestions": [
      "Bạn có yêu cầu gì về gói bảo hiểm sức khỏe quốc tế cao cấp không?",
      "Nếu nhận được thư mời nhận việc, ngày sớm nhất bạn có thể bắt đầu là khi nào?"
    ]
  },
  {
    "id": "sp_vi_18",
    "title": "Cầu Lông và Tập Luyện Thể Thao Hàng Ngày (Badminton & Fitness)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Badminton",
    "icon": "🏸",
    "scenario": "Playing evening badminton matches with colleagues at a local sports club, discussing shot technique.",
    "starterPrompt": "Pha đập cầu vừa rồi của anh uy lực quá! Sân cầu lông tối nay đông vui thật. Anh thường tập luyện mấy buổi một tuần?",
    "starterQuestions": [
      "Anh thích đánh đôi nam hay đánh đôi nam nữ phối hợp?",
      "Làm thế nào để di chuyển bộ pháp thanh thoát và giữ sức bền suốt ba set đấu?"
    ]
  },
  {
    "id": "sp_vi_19",
    "title": "Mua Thuốc tại Hiệu Thuốc và Tư Vấn Y Tế (Pharmacy & Medical Care)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "💊",
    "scenario": "Explaining a sore throat and fever symptoms to a licensed pharmacist, asking for dosage instructions.",
    "starterPrompt": "Dạ chào dược sĩ! Tôi bị đau họng và sốt nhẹ từ hôm qua. Nhờ dược sĩ tư vấn giúp tôi thuốc hạ sốt và kẹo ngậm thảo dược giảm ho.",
    "starterQuestions": [
      "Thuốc này uống sau bữa ăn đúng không ạ?",
      "Mỗi ngày tôi cần uống mấy lần và trong bao nhiêu ngày liên tục?"
    ]
  },
  {
    "id": "sp_vi_20",
    "title": "Nghệ Thuật Múa Rối Nước Truyền Thống (Water Puppet Theater)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Traditional Art",
    "icon": "🎭",
    "scenario": "Watching wooden puppets dance on a water stage accompanied by live folk singing and Cheo drumming.",
    "starterPrompt": "Múa rối nước là một di sản văn hóa dân gian vô cùng độc đáo của đồng bằng Bắc Bộ! Bạn có biết người nghệ nhân đứng sau màn che điều khiển con rối bằng sào tre không?",
    "starterQuestions": [
      "Nhân vật chú Tễu hóm hỉnh mở màn vở diễn để lại cho bạn ấn tượng gì?",
      "Âm nhạc dân tộc với đàn bầu và tiếng trống chèo có làm bạn thích thú không?"
    ]
  },
  {
    "id": "sp_vi_21",
    "title": "Tết Nguyên Đán và Bánh Chưng Xanh (Lunar New Year Celebrations)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Festival",
    "icon": "🧧",
    "scenario": "Wrapping square banh chung with sticky rice and mung beans, wishing good fortune with red envelopes (lì xì).",
    "starterPrompt": "Chúc mừng năm mới, an khang thịnh vượng! Nhà bạn đã gói bánh chưng và trang trí cành đào, cây quất đón Tết chưa?",
    "starterQuestions": [
      "Bạn có về quê sum họp gia đình trong dịp Tết cổ truyền không?",
      "Món ăn ngày Tết nào bạn mong chờ được thưởng thức nhất?"
    ]
  },
  {
    "id": "sp_vi_22",
    "title": "Chuyển Đổi Số và Điện Toán Đám Mây tại Việt Nam (Cloud Transformation)",
    "language": "Vietnamese",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Cloud Infrastructure",
    "icon": "☁️",
    "scenario": "Discussing multi-cloud adoption, data localization laws, and enterprise digital transformation in Vietnam.",
    "starterPrompt": "Các ngân hàng và doanh nghiệp viễn thông lớn tại Việt Nam đang đẩy mạnh chuyển đổi số toàn diện. Thách thức lớn nhất trong bảo mật dữ liệu là gì?",
    "starterQuestions": [
      "Làm thế nào để kết hợp hạ tầng đám mây công cộng và đám mây riêng tư một cách hiệu quả?",
      "Đội ngũ kỹ sư Việt Nam đang nắm bắt các công nghệ DevOps mới nhanh như thế nào?"
    ]
  },
  {
    "id": "sp_vi_23",
    "title": "Chạy Bộ Buổi Sáng Quanh Hồ Hoàn Kiếm (Morning Run around Sword Lake)",
    "language": "Vietnamese",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Running",
    "icon": "🏃",
    "scenario": "Jogging under willow trees around Hoan Kiem Lake at dawn, watching elders practice tai chi.",
    "starterPrompt": "Sáng sớm quanh Hồ Gươm không khí trong lành và mát mẻ thật! Mọi người dậy sớm chạy bộ và tập thể dục đông đúc quá!",
    "starterQuestions": [
      "Bạn chạy được mấy vòng hồ Hoàn Kiếm sáng nay rồi?",
      "Sau khi chạy bộ xong, chúng ta cùng ghé ăn bát cháo sườn nóng hổi nhé?"
    ]
  },
  {
    "id": "sp_vi_24",
    "title": "Thăm Phố Cổ Hội An Đêm Rằm Hoa Đăng (Hoi An Lantern Festival)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Heritage Tourism",
    "icon": "🏮",
    "scenario": "Walking along glowing lantern-lit streets of ancient Hoi An and releasing paper flower candles on the Hoai River.",
    "starterPrompt": "Phố cổ Hội An về đêm lung linh rực rỡ dưới ánh sáng của hàng ngàn chiếc lồng đèn thủ công! Bạn đã thả đèn hoa đăng trên sông Hoài chưa?",
    "starterQuestions": [
      "Bạn có muốn may đo một bộ áo dài truyền thống lấy ngay trong ngày không?",
      "Đừng quên thử món cao lầu và bánh mì Phượng nổi tiếng nhé!"
    ]
  },
  {
    "id": "sp_vi_25",
    "title": "Trò Chơi Điện Tử và Thể Thao Điện Tử Việt Nam (Gaming & Esports in VN)",
    "language": "Vietnamese",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Esports",
    "icon": "🎮",
    "scenario": "Discussing Vietnam's passionate competitive gaming scene in League of Legends (VCS) and mobile esports.",
    "starterPrompt": "Cộng đồng thể thao điện tử tại Việt Nam vô cùng cuồng nhiệt và có những bước tiến lớn ở đấu trường quốc tế! Bạn có theo dõi các giải đấu game không?",
    "starterQuestions": [
      "Trò chơi điện tử nào bạn thường chơi cùng bạn bè vào những lúc rảnh rỗi?",
      "Bạn nghĩ gì về tiềm năng phát triển của ngành công nghiệp game tại Việt Nam?"
    ]
  },
  {
    "id": "sp_id_7",
    "title": "Makan Nasi Goreng Gila di Kaki Lima (Street Food Nasi Goreng in Jakarta)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🍳",
    "scenario": "Ordering authentic spicy nasi goreng with sausages, meatballs, sunny-side-up egg, and crispy kerupuk.",
    "starterPrompt": "Selamat malam, Mas! Mau pesan Nasi Goreng Gila pedasnya sedang atau super pedas? Telurnya mau dadar atau ceplok setengah matang?",
    "starterQuestions": [
      "Pakai acar mentimun dan kerupuk udang yang banyak ya, Bang?",
      "Mau minum es teh manis atau es jeruk segar?"
    ]
  },
  {
    "id": "sp_id_8",
    "title": "Pesan Ojek Online Gojek di Jakarta (Booking Gojek Ride in Traffic)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Ride-Hailing",
    "icon": "🛵",
    "scenario": "Messaging your Gojek driver via app chat, confirming pick-up point near Grand Indonesia mall.",
    "starterPrompt": "Halo, Mas driver! Saya sudah menunggu di lobi utara Grand Indonesia dekat halte busway. Naik motor helm hijau kan?",
    "starterQuestions": [
      "Bisa tolong bawakan helm yang kacanya bersih ya, Mas?",
      "Apakah jalanan ke arah Sudirman sedang macet parah sore ini?"
    ]
  },
  {
    "id": "sp_id_9",
    "title": "Wawancara Kerja Startup Unicorn di Jakarta (Tech Unicorn Job Interview)",
    "language": "Indonesian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a senior cloud software engineer role at a leading Indonesian tech unicorn.",
    "starterPrompt": "Halo, selamat siang. Terima kasih telah hadir. Bisakah Anda menjelaskan pengalaman Anda dalam menangani sistem berkapasitas jutaan pengguna aktif harian?",
    "starterQuestions": [
      "Bagaimana strategi Anda dalam mengoptimalkan latensi pemrosesan data audio real-time?",
      "Ceritakan pengalaman Anda saat memimpin tim engineering menghadapi downtime sistem!"
    ]
  },
  {
    "id": "sp_id_10",
    "title": "Dukung Timnas Garuda di Stadion Gelora Bung Karno (Indonesian Football Match)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Football",
    "icon": "⚽",
    "scenario": "Singing Indonesia Raya with 80,000 energetic fans at GBK stadium during a World Cup qualifier.",
    "starterPrompt": "Luar biasa atmosfer di Stadion GBK malam ini! Stadion bergetar oleh nyanyian suporter garuda! Bagaimana prediksi Anda untuk pertandingan ini?",
    "starterQuestions": [
      "Siapa pemain tim nasional yang tampil paling solid di lini pertahanan?",
      "Apakah Anda yakin Indonesia bisa lolos ke babak selanjutnya?"
    ]
  },
  {
    "id": "sp_id_11",
    "title": "Nongkrong Santai di Kedai Kopi Senopati (Hanging Out at Coffee Shop)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Coffee Hangout",
    "icon": "☕",
    "scenario": "Catching up with close friends over iced palm sugar latte (kopi susu gula aren) and banana fritters.",
    "starterPrompt": "Halo bro! Senang banget akhirnya bisa kumpul lagi di sini. Kamu mau pesan es kopi susu gula aren atau manual brew dingin?",
    "starterQuestions": [
      "Bagaimana kabar pekerjaan baru kamu di perusahaan rintisan?",
      "Ada rencana liburan akhir pekan ke Bandung atau Puncak?"
    ]
  },
  {
    "id": "sp_id_12",
    "title": "Musik Pop Indonesia dan Band Legendaris (Indonesian Music & Bands)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎸",
    "scenario": "Discussing timeless ballads by Sheila on 7, Dewa 19, and modern indie music sensation Tulus.",
    "starterPrompt": "Lagu-lagu Sheila on 7 dan Dewa 19 selalu sukses bikin kita bernostalgia. Siapa musisi atau grup band Indonesia favorit Anda?",
    "starterQuestions": [
      "Apakah Anda suka mendengarkan musik akustik santai atau pop rock bersemangat?",
      "Pernahkah Anda menonton festival musik Java Jazz di Jakarta?"
    ]
  },
  {
    "id": "sp_id_13",
    "title": "Ekonomi Digital dan Ekosistem FinTech Indonesia (Fintech & AI Boom)",
    "language": "Indonesian",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Digital Economy",
    "icon": "💳",
    "scenario": "Discussing rapid QRIS payment adoption, financial inclusion across thousands of islands, and edge AI.",
    "starterPrompt": "Sistem pembayaran QRIS telah merevolusi transaksi digital di seluruh pelosok Indonesia. Bagaimana peran kecerdasan buatan dalam deteksi penipuan keuangan?",
    "starterQuestions": [
      "Apa tantangan terbesar dalam pemerataan infrastruktur digital antar pulau di Indonesia?",
      "Bagaimana AI on-device dapat membantu pengguna di daerah dengan koneksi internet terbatas?"
    ]
  },
  {
    "id": "sp_id_14",
    "title": "Belanja Kain Batik di Pasar Beringharjo Yogyakarta (Batik Shopping)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Shopping",
    "icon": "👘",
    "scenario": "Browsing handcrafted traditional batik tulis patterns, asking about fabric quality and local motifs.",
    "starterPrompt": "Sugeng rawuh! Sedang mencari kain batik tulis motif parang atau kemeja batik cap untuk acara resmi, Mas?",
    "starterQuestions": [
      "Apakah bahan katun primisima ini adem dan tidak luntur saat dicuci?",
      "Bisa ditawar sedikit tidak harganya kalau saya beli dua potong kain?"
    ]
  },
  {
    "id": "sp_id_15",
    "title": "Wisata Menyelam di Terumbu Karang Raja Ampat (Raja Ampat Diving Tour)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Diving Adventure",
    "icon": "🤿",
    "scenario": "Booking a liveaboard boat to dive in pristine turquoise waters with manta rays in West Papua.",
    "starterPrompt": "Selamat datang di surga bawah laut Raja Ampat! Terumbu karang dan keanekaragaman hayati laut di sini adalah yang terkaya di dunia.",
    "starterQuestions": [
      "Apakah Anda sudah memiliki lisensi menyelam tingkat lanjutan (advanced)?",
      "Hari ini kita akan menyelam di spot Manta Sandy untuk melihat pari manta raksasa!"
    ]
  },
  {
    "id": "sp_id_16",
    "title": "Makan Malam Rendang Daging di Restoran Padang (Padang Feast with Rendang)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Restaurant",
    "icon": "🍛",
    "scenario": "Experiencing 'hidang' style where dozens of plates are balanced on the server's arms and stacked on the table.",
    "starterPrompt": "Silakan duduk, Uda! Kami sajikan langsung rendang daging sapi, ayam pop, gulai tunjang, dan sambal ijo segar di atas meja!",
    "starterQuestions": [
      "Rendang Padang ini dimasak perlahan selama delapan jam hingga bumbunya meresap sempurna!",
      "Mau coba daun singkong rebus dan kerupuk kulit siram kuah gulai?"
    ]
  },
  {
    "id": "sp_id_17",
    "title": "Negosiasi Gaji dan Tunjangan Hari Raya (Salary & THR Negotiation)",
    "language": "Indonesian",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "💵",
    "scenario": "Negotiating base compensation package, annual Tunjangan Hari Raya (THR), and remote work allowances.",
    "starterPrompt": "Kami sangat terkesan dengan rekam jejak profesional Anda. Bagaimana ekspektasi kompensasi tahunan serta komponen THR Anda?",
    "starterQuestions": [
      "Apakah Anda memiliki preferensi khusus terkait asuransi kesehatan swasta untuk keluarga?",
      "Kapan Anda bisa mulai bergabung secara efektif bersama tim kami?"
    ]
  },
  {
    "id": "sp_id_18",
    "title": "Main Bulu Tangkis Ganda Bersama Teman Kantor (Badminton Match)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Badminton",
    "icon": "🏸",
    "scenario": "Playing doubles badminton, praising jump smashes and fast net drop shots after working hours.",
    "starterPrompt": "Smash keras Anda tadi tajam sekali langsung masuk ke garis belakang! Ayo istirahat minum air putih dulu sebelum lanjut set ketiga!",
    "starterQuestions": [
      "Apakah Anda rutin latihan bulu tangkis di gelanggang olahraga setiap minggu?",
      "Siapa atlet bulu tangkis legenda Indonesia favorit Anda?"
    ]
  },
  {
    "id": "sp_id_19",
    "title": "Beli Obat Masuk Angin dan Vitamin di Apotek (Pharmacy Consultation)",
    "language": "Indonesian",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "💊",
    "scenario": "Asking the pharmacist for herbal Tolak Angin sachets, paracetamol, and eucalyptus oil (minyak kayu putih).",
    "starterPrompt": "Selamat siang! Badan saya terasa meriang, perut kembung dan masuk angin. Tolong berikan obat herbal pereda masuk angin dan minyak kayu putih ya.",
    "starterQuestions": [
      "Berapa kali sehari obat herbal ini sebaiknya diminum?",
      "Apakah perlu istirahat total dan banyak minum air hangat?"
    ]
  },
  {
    "id": "sp_id_20",
    "title": "Pertunjukan Wayang Kulit dan Gamelan Jawa (Shadow Puppets & Gamelan)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Traditional Art",
    "icon": "🎭",
    "scenario": "Listening to hypnotic bronze gamelan gongs and watching the Dalang narrate Mahabharata epics all night.",
    "starterPrompt": "Suara gamelan yang mengalun harmonis dan kepiawaian sang dalang memainkan wayang kulit semalam suntuk sungguh memukau jiwa.",
    "starterQuestions": [
      "Karakter wayang punakawan seperti Semar dan Petruk selalu menyelipkan pesan moral yang bijak, bukan?",
      "Pernahkah Anda mencoba memainkan instrumen saron atau gong gamelan?"
    ]
  },
  {
    "id": "sp_id_21",
    "title": "Silaturahmi Hari Raya Idul Fitri (Lebaran Family Gathering)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Religious Holiday",
    "icon": "🕌",
    "scenario": "Visiting relatives during Lebaran, seeking forgiveness (mohon maaf lahir batin), eating ketupat opor.",
    "starterPrompt": "Selamat Hari Raya Idul Fitri, mohon maaf lahir dan batin! Mari cicipi ketupat opor ayam dan sambal goreng ati buatan Ibu!",
    "starterQuestions": [
      "Bagaimana pengalaman mudik pulang kampung Anda tahun ini, apakah perjalanan lancar?",
      "Senang sekali seluruh keluarga besar bisa berkumpul bersama kembali!"
    ]
  },
  {
    "id": "sp_id_22",
    "title": "Pembangunan Ibu Kota Nusantara dan Smart City (Smart City IKN Tech)",
    "language": "Indonesian",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Smart City",
    "icon": "🏙️",
    "scenario": "Discussing green building standards, autonomous electric buses, and IoT sensor grids in the new capital Nusantara.",
    "starterPrompt": "Ibu Kota Nusantara dirancang sebagai kota pintar hijau yang berkelanjutan. Bagaimana pandangan Anda tentang integrasi teknologi IoT perkotaan di sana?",
    "starterQuestions": [
      "Bagaimana pemanfaatan energi terbarukan tenaga surya untuk memasok kebutuhan listrik kota secara mandiri?",
      "Tantangan apa saja yang dihadapi dalam migrasi sistem pemerintahan berbasis elektronik?"
    ]
  },
  {
    "id": "sp_id_23",
    "title": "Menjelajah Kawah Ijen dan Api Biru Alami (Ijen Blue Fire Trekking)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Mountain Trekking",
    "icon": "🌋",
    "scenario": "Hiking Mount Ijen at midnight to witness the rare natural blue sulfur flames and acid crater lake at dawn.",
    "starterPrompt": "Perjalanan mendaki Kawah Ijen tengah malam membutuhkan masker gas khusus karena asap belerangnya cukup pekat. Siap melihat keajaiban api biru?",
    "starterQuestions": [
      "Pemandangan danau kawah berwarna toska saat matahari terbit sungguh spektakuler!",
      "Perjalanan turun gunung cukup curam, berhati-hatilah saat melangkah!"
    ]
  },
  {
    "id": "sp_id_24",
    "title": "Olahraga Selancar Ombak di Pantai Kuta Bali (Surfing in Bali)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Surfing",
    "icon": "🏄",
    "scenario": "Renting a surfboard, taking paddling tips from a local Balinese instructor, catching afternoon waves.",
    "starterPrompt": "Ombak di Pantai Kuta sore ini sangat ramah untuk latihan selancar! Siap belajar cara berdiri seimbang di atas papan selancar?",
    "starterQuestions": [
      "Jangan lupa oleskan tabir surya anti-air ke wajah sebelum mendayung ke tengah laut!",
      "Rasanya sangat luar biasa saat berhasil meluncur mulus di atas gulungan ombak!"
    ]
  },
  {
    "id": "sp_id_25",
    "title": "Industri Perfilman Nasional dan Bioskop Indonesia (Indonesian Cinema)",
    "language": "Indonesian",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema",
    "icon": "🎬",
    "scenario": "Discussing horror cinema hits, festival arthouse films, and the massive growth of local cinema admissions.",
    "starterPrompt": "Film-film karya sineas Indonesia kini semakin berkualitas tinggi dan berhasil menembus berbagai festival film internasional bergengsi.",
    "starterQuestions": [
      "Apakah Anda lebih menyukai film bergenre drama sejarah atau film horor bertema cerita rakyat lokal?",
      "Bagaimana tanggapan Anda tentang perkembangan industri animasi di Indonesia saat ini?"
    ]
  },
  {
    "id": "sp_th_7",
    "title": "สั่งผัดไทยและต้มยำกุ้งที่เยาวราช (Ordering Pad Thai & Tom Yum in Chinatown)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Food",
    "subCategory": "Street Food",
    "icon": "🍜",
    "scenario": "Ordering famous stir-fried Pad Thai noodles with jumbo prawns and spicy sour Tom Yum soup in Bangkok.",
    "starterPrompt": "สวัสดีครับ! ยินดีต้อนรับสู่เยาวราชครับ วันนี้รับผัดไทยกุ้งสดใส่ไข่พิเศษ หรือต้มยำกุ้งน้ำข้นรสจัดจ้านดีครับ?",
    "starterQuestions": [
      "ชอบรสเผ็ดมากหรือเผ็ดน้อยครับ?",
      "ต้องการน้ำมะพร้าวสดเย็นๆ ดื่มคู่กันไหมครับ?"
    ]
  },
  {
    "id": "sp_th_8",
    "title": "นั่งเรือด่วนเจ้าพระยาไปวัดอรุณ (Chao Phraya River Express Boat)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Boat Transit",
    "icon": "⛴️",
    "scenario": "Taking the orange flag express boat along the Chao Phraya River to visit the Temple of Dawn (Wat Arun).",
    "starterPrompt": "สวัสดีค่ะ! เรือด่วนธงส้มจะจอดเทียบท่าที่ท่าวัดอรุณค่ะ ค่าโดยสารสิบหกบาท กรุณาเตรียมเงินทอนให้พร้อมนะคะ",
    "starterQuestions": [
      "วัดอรุณเปิดให้นักท่องเที่ยวขึ้นชมพระปรางค์ด้านบนไหมคะ?",
      "ขากลับต้องการข้ามฟากไปฝั่งท่าเตียนไหมคะ?"
    ]
  },
  {
    "id": "sp_th_9",
    "title": "สัมภาษณ์งานวิศวกรซอฟต์แวร์ย่านสาทร (Sathorn Bangkok Tech Interview)",
    "language": "Thai",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Tech Interview",
    "icon": "💼",
    "scenario": "Interviewing for a lead distributed cloud engineer role at an international fintech firm in Bangkok.",
    "starterPrompt": "สวัสดีครับ ยินดีที่ได้พบกันในวันนี้ครับ ช่วยเล่าประสบการณ์ของคุณในการออกแบบระบบประมวลผลข้อมูลที่มีความหน่วงต่ำมาก (ultra-low latency) ให้ฟังหน่อยครับ",
    "starterQuestions": [
      "คุณมีแนวทางในการจัดการสถาปัตยกรรม Microservices ขนาดใหญ่อย่างไร?",
      "เคยมีประสบการณ์นำโมเดล AI มาปรับใช้บนอุปกรณ์พกพา (On-Device AI) หรือไม่ครับ?"
    ]
  },
  {
    "id": "sp_th_10",
    "title": "ชมการแข่งขันมวยไทยที่เวทีราชดำเนิน (Muay Thai Match at Rajadamnern)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Muay Thai",
    "icon": "🥊",
    "scenario": "Watching exciting live Muay Thai bouts, discussing kicks, clinches, and traditional Sarama music.",
    "starterPrompt": "เสียงดนตรีปี่พาทย์มวยไทยเร้าใจมาก! หมัดฮุกซ้ายและลูกเตะก้านคอเมื่อกี้รวดเร็วและแม่นยำสุดๆ เลยครับ!",
    "starterQuestions": [
      "คุณคิดว่านักมวยฝ่ายแดงหรือฝ่ายน้ำเงินมีเทคนิคการออกอาวุธที่ดีกว่ากัน?",
      "เคยลองฝึกเรียนศิลปะการต่อสู้มวยไทยโบราณมาก่อนไหมครับ?"
    ]
  },
  {
    "id": "sp_th_11",
    "title": "จิบชาไทยและพูดคุยกับเพื่อนย่านอารีย์ (Sipping Thai Tea in Ari Cafe)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Cafe Meetup",
    "icon": "🧋",
    "scenario": "Catching up with friends over iced orange Thai tea and pandan toast in a trendy Ari neighborhood cafe.",
    "starterPrompt": "สวัสดีจ้า! ไม่ได้เจอกันตั้งนานเลย สั่งชาไทยเย็นหวานน้อยกับขนมปังนึ่งสังขยาใบเตยมาแบ่งกันทานนะ",
    "starterQuestions": [
      "ช่วงนี้งานที่บริษัทใหม่ราบรื่นดีไหม?",
      "วันหยุดสุดสัปดาห์นี้มีแพลนไปเที่ยวทะเลหัวหินหรือพัทยาบ้างหรือเปล่า?"
    ]
  },
  {
    "id": "sp_th_12",
    "title": "ภาพยนตร์ไทยและซีรีส์ยอดนิยมระดับโลก (Thai Cinema & Streaming Series)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Cinema & Series",
    "icon": "🎬",
    "scenario": "Discussing hit Thai films like 'Bad Genius', international awards, and popular streaming series.",
    "starterPrompt": "ภาพยนตร์ไทยอย่าง 'ฉลาดเกมส์โกง' ได้รับคำชมอย่างมากทั่วโลกเรื่องการตัดต่อและบทภาพยนตร์ที่เข้มข้น คุณชอบดูหนังแนวไหนครับ?",
    "starterQuestions": [
      "คุณคิดว่าซีรีส์ไทยมีจุดเด่นอะไรที่ดึงดูดผู้ชมในต่างประเทศได้มากขนาดนี้?",
      "มีนักแสดงหรือผู้กำกับไทยคนไหนที่คุณชื่นชอบเป็นพิเศษไหมครับ?"
    ]
  },
  {
    "id": "sp_th_13",
    "title": "การพัฒนาปัญญาประดิษฐ์ภาษาไทยและสตาร์ทอัพ (Thai NLP & AI Ecosystem)",
    "language": "Thai",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "Artificial Intelligence",
    "icon": "🤖",
    "scenario": "Discussing Thai language NLP challenges (no spaces between words), local LLMs, and smart city platforms.",
    "starterPrompt": "ภาษาไทยไม่มีการเว้นวรรคระหว่างคำ ทำให้การตัดคำและประมวลผลภาษาธรรมชาติมีความท้าทายสูง คุณมองอนาคตของ AI ภาษาไทยอย่างไรครับ?",
    "starterQuestions": [
      "ระบบจดจำเสียงพูดภาษาไทยสามารถตรวจจับวรรณยุกต์ได้อย่างแม่นยำแค่ไหนในปัจจุบัน?",
      "การประมวลผลบนชิป NPU ของสมาร์ทโฟนจะช่วยปกป้องข้อมูลส่วนบุคคลของผู้ใช้ได้อย่างไร?"
    ]
  },
  {
    "id": "sp_th_14",
    "title": "เดินตลาดนัดจตุจักรและต่อรองราคา (Chatuchak Weekend Market Shopping)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Market Shopping",
    "icon": "🛍️",
    "scenario": "Browsing through thousands of clothing, antique, and artisan handicraft stalls at Chatuchak market.",
    "starterPrompt": "สวัสดีค่ะ ตัวนี้เป็นผ้าฝ้ายทอมือย้อมครามธรรมชาติจากเชียงใหม่ค่ะ สนใจรับกี่ตัวดีคะ ลดราคาพิเศษให้ได้นะคะ",
    "starterQuestions": [
      "มีไซส์เสื้อสำหรับผู้ชายขนาดรอบอกสี่สิบนิ้วไหมครับ?",
      "ถ้าซื้อสามตัวลดราคาเหลือตัวละเท่าไหร่คะ?"
    ]
  },
  {
    "id": "sp_th_15",
    "title": "นั่งรถไฟลอยฟ้า BTS ท่องเที่ยวกรุงเทพฯ (Navigating Bangkok BTS Skytrain)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Travel",
    "subCategory": "Sky Train",
    "icon": "🚝",
    "scenario": "Buying a single journey ticket, switching lines at Siam interchange station towards Sukhumvit.",
    "starterPrompt": "สวัสดีครับ การเดินทางด้วยรถไฟฟ้า BTS ในชั่วโมงเร่งด่วนสะดวกรวดเร็วมาก ไม่ต้องติดไฟแดงบนท้องถนนเลยครับ",
    "starterQuestions": [
      "ต้องการเปลี่ยนสายจากสายสีลมไปสายสุขุมวิทที่สถานีสยามใช่ไหมครับ?",
      "สามารถแตะจ่ายค่าโดยสารด้วยบัตรเครดิตแบบไร้สัมผัสได้เลยนะครับ"
    ]
  },
  {
    "id": "sp_th_16",
    "title": "ลิ้มลองข้าวเหนียวมะม่วงน้ำดอกไม้ (Mango Sticky Rice Dessert)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Food",
    "subCategory": "Dessert",
    "icon": "🥭",
    "scenario": "Tasting sweet ripe golden Nam Dok Mai mango served with warm coconut sticky rice and roasted mung beans.",
    "starterPrompt": "ข้าวเหนียวมูนกะทิหอมหวานมัน ราดด้วยน้ำกะทิเข้มข้นและโรยถั่วทองกรุบกรอบ ทานคู่กับมะม่วงน้ำดอกไม้สุกสีทองอร่อยชื่นใจจริงๆ ครับ!",
    "starterQuestions": [
      "ชอบทานมะม่วงอกร่องหรือมะม่วงน้ำดอกไม้มากกว่ากันครับ?",
      "ต้องการแพ็คใส่กล่องนำกลับไปเป็นของฝากที่โรงแรมไหมครับ?"
    ]
  },
  {
    "id": "sp_th_17",
    "title": "เจรจาต่อรองเงินเดือนและสวัสดิการพนักงาน (Salary & Perks Negotiation)",
    "language": "Thai",
    "level": "Advanced",
    "category": "Career",
    "subCategory": "Compensation",
    "icon": "📈",
    "scenario": "Negotiating base compensation package, annual provident fund matching, and health insurance in Bangkok.",
    "starterPrompt": "ทางบริษัทประทับใจในทักษะและความสามารถของคุณมากครับ สำหรับโครงสร้างเงินเดือนและสวัสดิการ คุณมีความคาดหวังอย่างไรบ้างครับ?",
    "starterQuestions": [
      "คุณพึงพอใจกับนโยบายการทำงานแบบยืดหยุ่น (Hybrid Work) สัปดาห์ละกี่วันครับ?",
      "สามารถเริ่มงานกับทางเราได้เร็วที่สุดเมื่อไหร่ครับ?"
    ]
  },
  {
    "id": "sp_th_18",
    "title": "การฝึกโยคะและการนวดแผนไทยเพื่อสุขภาพ (Traditional Thai Massage & Yoga)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Sports",
    "subCategory": "Wellness",
    "icon": "🧘",
    "scenario": "Experiencing traditional therapeutic Thai massage (Nuad Thai) to relieve back pain and muscle tension.",
    "starterPrompt": "การนวดแผนไทยช่วยยืดเส้นและกดจุดตามแนวเส้นประธานเพื่อกระตุ้นการไหลเวียนโลหิตครับ รู้สึกผ่อนคลายกล้ามเนื้อขึ้นไหมครับ?",
    "starterQuestions": [
      "น้ำหนักมือในการกดจุดหนักไปหรือเบาไป แจ้งหมอนวดได้ตลอดเลยนะครับ",
      "หลังการนวดดื่มน้ำอุ่นมากๆ จะช่วยขับของเสียออกจากร่างกายได้ดียิ่งขึ้นครับ"
    ]
  },
  {
    "id": "sp_th_19",
    "title": "ปรึกษาเภสัชกรที่ร้านขายยาเรื่องไข้หวัด (Pharmacy Consultation in Bangkok)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Tech",
    "subCategory": "Healthcare",
    "icon": "💊",
    "scenario": "Explaining headache, nasal congestion, and mild cough to a community pharmacist.",
    "starterPrompt": "สวัสดีค่ะ มีอาการไอ เจ็บคอ หรือมีน้ำมูกไหลร่วมด้วยไหมคะ เดี๋ยวเภสัชกรจัดยาลดไข้และยาพ่นคอสมุนไพรให้นะคะ",
    "starterQuestions": [
      "ยานี้ทานครั้งละหนึ่งเม็ดหลังอาหารเช้า กลางวัน เย็น นะคะ",
      "มีประวัติแพ้ยาปฏิชีวนะหรือยาตัวไหนเป็นพิเศษไหมคะ?"
    ]
  },
  {
    "id": "sp_th_20",
    "title": "เทศกาลสงกรานต์และประเพณีรดน้ำดำหัว (Songkran Water Festival Fun)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Social",
    "subCategory": "Cultural Festival",
    "icon": "💦",
    "scenario": "Splashing cool water on Silom road and participating in traditional elder blessing ceremonies.",
    "starterPrompt": "สุขสันต์วันสงกรานต์ครับ! ประเพณีปีใหม่ไทยเต็มไปด้วยความสุขและความสดชื่น มาร่วมสรงน้ำพระและรดน้ำขอพรผู้ใหญ่กันครับ!",
    "starterQuestions": [
      "เตรียมปืนฉีดน้ำและซองกันน้ำสำหรับโทรศัพท์มือถือเรียบร้อยหรือยังครับ?",
      "ช่วงเทศกาลสงกรานต์ได้ไปทำบุญตักบาตรที่วัดมาหรือยังครับ?"
    ]
  },
  {
    "id": "sp_th_21",
    "title": "เครื่องดนตรีไทยเดิมและขิมแสนไพเราะ (Traditional Thai Music & Khim)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Entertainment",
    "subCategory": "Music",
    "icon": "🎵",
    "scenario": "Listening to rhythmic hammering on the hammered dulcimer (khim) and ranat ek xylophone.",
    "starterPrompt": "เสียงขิมบรรเลงเพลงไทยเดิมมีความไพเราะนุ่มนวลและอ่อนหวานมาก ช่วยให้จิตใจสงบได้อย่างน่าอัศจรรย์ใจครับ",
    "starterQuestions": [
      "คุณเคยเห็นการบรรเลงวงปี่พาทย์หรือวงมโหรีในงานพิธีมงคลไหมครับ?",
      "ชอบฟังเพลงไทยประยุกต์ร่วมสมัยที่ผสมผสานเครื่องดนตรีสากลไหมครับ?"
    ]
  },
  {
    "id": "sp_th_22",
    "title": "เทคโนโลยียานยนต์ไฟฟ้าและการลงทุนในไทย (EV Industry in Thailand)",
    "language": "Thai",
    "level": "Advanced",
    "category": "Tech",
    "subCategory": "EV & Clean Tech",
    "icon": "🚗",
    "scenario": "Discussing Thailand's hub status as the Detroit of Asia transitioning toward electric vehicles (EV).",
    "starterPrompt": "ประเทศไทยกำลังก้าวสู่การเป็นศูนย์กลางการผลิตยานยนต์ไฟฟ้าชั้นนำของภูมิภาคอาเซียน คุณมองการแข่งขันของค่ายรถยนต์ EV อย่างไรครับ?",
    "starterQuestions": [
      "การขยายสถานีชาร์จไฟฟ้าความเร็วสูงตามหัวเมืองใหญ่มีความพร้อมเพียงพอแล้วหรือยัง?",
      "เทคโนโลยีแบตเตอรี่แบบ Solid-state จะเข้ามาเปลี่ยนโฉมวงการยานยนต์อย่างไรในอนาคต?"
    ]
  },
  {
    "id": "sp_th_23",
    "title": "วิ่งออกกำลังกายยามเช้าที่สวนเบญจกิติ (Morning Run at Benjakitti Forest Park)",
    "language": "Thai",
    "level": "Beginner",
    "category": "Sports",
    "subCategory": "Running",
    "icon": "🏃",
    "scenario": "Jogging on skywalk elevated trails above urban wetlands and lakes with Bangkok skyscrapers in the background.",
    "starterPrompt": "สวนเบญจกิติยามเช้าอากาศดีมาก มีเส้นทางวิ่งลอยฟ้าท่ามกลางธรรมชาติใจกลางเมืองหลวงที่สวยงามระดับโลกเลยครับ!",
    "starterQuestions": [
      "วันนี้ตั้งเป้าวิ่งออกกำลังกายกี่กิโลเมตรดีครับ?",
      "วิวสะท้อนเงาตึกสูงบนผืนน้ำในสวนตอนพระอาทิตย์ขึ้นสวยงามน่าประทับใจมากเลยครับ"
    ]
  },
  {
    "id": "sp_th_24",
    "title": "ล่องเรือชมธรรมชาติและวิถีชีวิตตลาดน้ำอัมพวา (Amphawa Floating Market)",
    "language": "Thai",
    "level": "Intermediate",
    "category": "Travel",
    "subCategory": "Tourism",
    "icon": "🛶",
    "scenario": "Taking a long-tail wooden boat through canal communities, watching fireflies illuminate mangrove trees.",
    "starterPrompt": "ยินดีต้อนรับสู่ตลาดน้ำอัมพวาครับ เรือพายของพ่อค้าแม่ค้าขายหอยทอด กุ้งเผา และขนมไทยโบราณเต็มริมฝั่งคลองเลยครับ",
    "starterQuestions": [
      "ตอนค่ำเราจะนั่งเรือหางยาวออกไปชมแสงระยิบระยับของหิ่งห้อยใต้ต้นลำพูกันนะครับ",
      "อยากลองชิมก๋วยเตี๋ยวเรือสูตรโบราณรสเข้มข้นที่ปรุงสดๆ บนเรือพายไหมครับ?"
    ]
  },
  {
    "id": "sp_th_25",
    "title": "ศิลปะสถาปัตยกรรมวัดพระแก้วและพระบรมมหาราชวัง (Grand Palace Architecture)",
    "language": "Thai",
    "level": "Advanced",
    "category": "Entertainment",
    "subCategory": "Architecture & Art",
    "icon": "🏛️",
    "scenario": "Admiration of golden spires, mosaic glass stupas, and Ramakien mural paintings in the Emerald Buddha Temple.",
    "starterPrompt": "จิตรกรรมฝาผนังเรื่องรามเกียรติ์รอบพระระเบียงวัดพระแก้วมีความวิจิตรตระการตาและแสดงถึงยอดฝีมือช่างสิบหมู่ของไทยโบราณอย่างแท้จริงครับ",
    "starterQuestions": [
      "สถาปัตยกรรมยอดปราสาทและงานประดับกระจกสีสะท้อนแสงแดดยามบ่ายงดงามวิจิตรมากใช่ไหมครับ?",
      "มีความสนใจในเรื่องราวประวัติศาสตร์การสร้างกรุงรัตนโกสินทร์เพิ่มเติมไหมครับ?"
    ]
  }
];

export const FULL_MOBILE_TOPICS_CATALOG: CatalogTopicModel[] = MASTER_TOPICS_CATALOG;
