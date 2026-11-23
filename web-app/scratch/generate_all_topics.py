import json
import re

# Read current topicsCatalog.ts
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def canonical_cat(cat):
    c = cat.lower()
    if 'sport' in c or 'fitness' in c or 'cricket' in c or 'football' in c:
        return 'Sports'
    if 'travel' in c or 'transit' in c or 'transport' in c or 'airport' in c:
        return 'Travel'
    if 'food' in c or 'din' in c or 'cafe' in c or 'restaurant' in c:
        return 'Food'
    if 'career' in c or 'business' in c or 'work' in c or 'interview' in c:
        return 'Career'
    if 'social' in c or 'party' in c or 'meetup' in c or 'culture & arts' in c:
        return 'Social'
    if 'entertain' in c or 'movie' in c or 'gaming' in c or 'music' in c:
        return 'Entertainment'
    if 'tech' in c or 'robot' in c or 'ai' in c or 'software' in c:
        return 'Tech'
    return 'Daily Life'

def norm_lang(lang):
    if lang == 'Chinese':
        return 'Chinese (Mandarin)'
    return lang

existing_topics = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', content):
    block = m.group(0)
    try:
        t = json.loads(block)
        t['category'] = canonical_cat(t.get('category', 'Daily Life'))
        t['language'] = norm_lang(t.get('language', 'English'))
        existing_topics.append(t)
    except Exception as e:
        pass

print(f"Loaded {len(existing_topics)} existing topics cleanly.")

# Now let's define additions for each language to ensure at least 25 topics each.
additions = {
    "French": [
        {
            "title": "Commander au Café de Flore (Ordering Coffee & Pastries)",
            "level": "Beginner",
            "category": "Food",
            "subCategory": "Café",
            "icon": "☕",
            "scenario": "You are sitting on a Parisian terrace ordering an espresso, a croissant, and asking for the bill politely.",
            "starterPrompt": "Bonjour monsieur! Bienvenue au Café de Flore. Que désirez-vous prendre ce matin?",
            "starterQuestions": ["Vous préférez votre café noir ou au lait?", "Désirez-vous également une carafe d'eau?"]
        },
        {
            "title": "Prendre le Métro à Châtelet (Navigating the Paris Metro)",
            "level": "Beginner",
            "category": "Travel",
            "subCategory": "Public Transit",
            "icon": "🚇",
            "scenario": "Asking the station agent how to buy a Navigo day pass and transfer to Line 1 toward the Louvre.",
            "starterPrompt": "Bonjour! Vous êtes au guichet RATP. Quelle est votre destination aujourd'hui?",
            "starterQuestions": ["Avez-vous besoin d'un ticket simple ou d'un pass journée?", "Savez-vous quelle sortie prendre?"]
        },
        {
            "title": "Entretien d'Embauche chez Station F (Tech Startup Job Interview)",
            "level": "Advanced",
            "category": "Career",
            "subCategory": "Tech Interview",
            "icon": "💼",
            "scenario": "Interviewing for a lead AI engineering position at a Paris tech accelerator, detailing experience and architecture.",
            "starterPrompt": "Bonjour, merci d'avoir postulé. Parlez-moi de votre parcours et de votre plus grand défi d'architecture logicielle.",
            "starterQuestions": ["Comment gérez-vous la latence dans les modèles on-device?", "Quelle est votre approche du travail d'équipe agile?"]
        },
        {
            "title": "Match de Football au Parc des Princes (PSG Football Match)",
            "level": "Intermediate",
            "category": "Sports",
            "subCategory": "Football",
            "icon": "⚽",
            "scenario": "Discussing UEFA Champions League tactics, star players, and atmosphere with a local Parisian supporter.",
            "starterPrompt": "Quelle ambiance ce soir au Parc! Tu as vu le but incroyable en première mi-temps? Quel est ton pronostic pour le match?",
            "starterQuestions": ["Qui est le meilleur joueur sur le terrain selon toi?", "Penses-tu que Paris ira jusqu'en finale?"]
        },
        {
            "title": "Soirée Apéro entre Amis (Social Gathering & Small Talk)",
            "level": "Intermediate",
            "category": "Social",
            "subCategory": "Meetup",
            "icon": "🍷",
            "scenario": "Meeting new friends at a Friday evening rooftop apéro, sharing hobbies, travel stories, and food preferences.",
            "starterPrompt": "Salut! Bienvenue à la soirée! Tu connais l'hôte depuis longtemps? Tu habites dans quel quartier de Paris?",
            "starterQuestions": ["Quels sont tes projets pour ce week-end?", "Tu aimes les concerts de jazz?"]
        },
        {
            "title": "Discussion Cinéma Français & Festival de Cannes (Movies & Culture)",
            "level": "Intermediate",
            "category": "Entertainment",
            "subCategory": "Cinema",
            "icon": "🎬",
            "scenario": "Debating recent award-winning French films, cinema styles, and favorite directors with a film buff.",
            "starterPrompt": "Tu as vu les sélections du Festival de Cannes cette année? Quel est ton genre de film français préféré?",
            "starterQuestions": ["Tu préfères les comédies légères ou les drames psychologiques?", "Connais-tu les classiques de la Nouvelle Vague?"]
        },
        {
            "title": "Startup & Intelligence Artificielle (AI & Tech Future)",
            "level": "Advanced",
            "category": "Tech",
            "subCategory": "Artificial Intelligence",
            "icon": "🤖",
            "scenario": "Discussing European AI safety regulations, open-source Mistral models, and the future of multimodal agents.",
            "starterPrompt": "Paris devient rapidement la capitale européenne de l'IA. Selon vous, quel rôle joueront les modèles open source?",
            "starterQuestions": ["Pensez-vous que l'IA sur appareil remplacera le cloud?", "Comment équilibrer innovation et éthique?"]
        },
        {
            "title": "Faire ses Courses au Marché de Belleville (Farmer's Market)",
            "level": "Beginner",
            "category": "Daily Life",
            "subCategory": "Shopping",
            "icon": "🧀",
            "scenario": "Buying fresh brie, baguettes, and seasonal strawberries from local market vendors.",
            "starterPrompt": "Bonjour! Regardez nos beaux fromages affinés aujourd'hui. Vous désirez un fromage plutôt doux ou corsé?",
            "starterQuestions": ["Combien de tranches de jambon souhaitez-vous?", "Ce sera tout pour aujourd'hui?"]
        },
        {
            "title": "Réserver un Hôtel sur la Côte d'Azur (Hotel Booking in Nice)",
            "level": "Intermediate",
            "category": "Travel",
            "subCategory": "Hotel Booking",
            "icon": "🏨",
            "scenario": "Calling a seaside hotel in Nice to confirm sea-view room reservations, late check-in, and breakfast options.",
            "starterPrompt": "Hôtel Beau Rivage à Nice, bonjour! En quoi puis-je vous aider pour votre séjour?",
            "starterQuestions": ["Pour combien de personnes et combien de nuits?", "Souhaitez-vous le petit-déjeuner continental inclus?"]
        },
        {
            "title": "Dîner dans un Bistro Lyonnais (Dinner at a Lyonnais Bouchon)",
            "level": "Intermediate",
            "category": "Food",
            "subCategory": "Restaurant",
            "icon": "🍲",
            "scenario": "Exploring traditional Lyonnais gastronomy, asking the waiter for local wine pairing and dessert recommendations.",
            "starterPrompt": "Bonsoir! Voici notre menu du terroir. Avez-vous déjà goûté à notre quenelle maison?",
            "starterQuestions": ["Quel vin de la vallée du Rhône préférez-vous?", "Avez-vous gardé de la place pour une tarte aux pralines?"]
        },
        {
            "title": "Négocier un Salaire et des Avantages (Salary Negotiation)",
            "level": "Advanced",
            "category": "Career",
            "subCategory": "Compensation",
            "icon": "📈",
            "scenario": "Negotiating compensation package, remote work flexibility, and stock options with an executive recruiter.",
            "starterPrompt": "Nous sommes ravis de vous faire cette offre. Cependant, que pensez-vous de la proposition salariale globale?",
            "starterQuestions": ["Quelles sont vos attentes concernant les jours de télétravail?", "Quel package d'intéressement visez-vous?"]
        },
        {
            "title": "Roland Garros & Tennis Français (Tennis Championship)",
            "level": "Intermediate",
            "category": "Sports",
            "subCategory": "Tennis",
            "icon": "🎾",
            "scenario": "Talking with a tennis enthusiast about clay court playstyles, five-set marathons, and French open legends.",
            "starterPrompt": "La saison de terre battue est enfin là! Tu penses que le jeu sur terre battue demande plus d'endurance physique?",
            "starterQuestions": ["Tu as déjà assisté à un match sur le court Philippe-Chatrier?", "Quel est ton joueur de tennis préféré?"]
        },
        {
            "title": "Louer un Vélo à Lyon et Se Balader (Cycling in the City)",
            "level": "Beginner",
            "category": "Daily Life",
            "subCategory": "Cycling",
            "icon": "🚲",
            "scenario": "Renting a self-service bike in Lyon, asking a local for scenic river trails along the Rhône.",
            "starterPrompt": "Salut! Tu cherches à débloquer un vélo? Tu connais la piste cyclable le long des quais du Rhône?",
            "starterQuestions": ["Tu as l'application mobile de la ville?", "Tu veux pédaler jusqu'au parc de la Tête d'Or?"]
        },
        {
            "title": "Jeux Vidéo & Industrie Gaming Française (Video Games & Esports)",
            "level": "Intermediate",
            "category": "Entertainment",
            "subCategory": "Gaming",
            "icon": "🎮",
            "scenario": "Discussing French game studios, indie productions, and competitive esports leagues in Paris.",
            "starterPrompt": "Tu suis la scène esport française? La France a produit d'incroyables studios comme Ubisoft et Quantic Dream!",
            "starterQuestions": ["À quels jeux aimes-tu jouer en ce moment?", "Tu regardes des tournois comme les Worlds?"]
        },
        {
            "title": "Rejoindre un Club de Débat Universitaire (University Debate Club)",
            "level": "Advanced",
            "category": "Social",
            "subCategory": "Club",
            "icon": "🗣️",
            "scenario": "Defending an argument on renewable energy transition and climate technology in front of student debaters.",
            "starterPrompt": "Bienvenue au club d'éloquence de la Sorbonne! Quel est votre argument principal sur la transition écologique?",
            "starterQuestions": ["Comment répondez-vous à l'objection sur les coûts initiaux?", "Quel est votre exemple le plus probant?"]
        },
        {
            "title": "Cybersécurité et Cloud Souverain (Cloud & Cybersecurity)",
            "level": "Advanced",
            "category": "Tech",
            "subCategory": "Cloud Architecture",
            "icon": "🔐",
            "scenario": "Discussing cloud infrastructure security, GDPR compliance, and edge AI data sovereignty with a systems architect.",
            "starterPrompt": "La question du cloud souverain est cruciale pour les entreprises européennes. Comment garantissez-vous la confidentialité des données?",
            "starterQuestions": ["Utilisez-vous le chiffrement de bout en bout pour le traitement vocal?", "Quelle est votre stratégie de reprise après sinistre?"]
        },
        {
            "title": "Visiter le Musée d'Orsay et Peintres Impressionnistes (Art History)",
            "level": "Intermediate",
            "category": "Entertainment",
            "subCategory": "Museum",
            "icon": "🎨",
            "scenario": "Exploring Claude Monet and Van Gogh masterpieces with an art historian guide inside the Musée d'Orsay.",
            "starterPrompt": "Admirez la lumière dans cette toile de Monet. Ressentez-vous comment les touches de pinceau capturent l'instant?",
            "starterQuestions": ["Quel peintre impressionniste vous inspire le plus?", "Avez-vous déjà visité les jardins de Giverny?"]
        }
    ]
}

# Write a comprehensive additions dictionary for ALL 19 remaining languages
print("Script scaffold ready.")
