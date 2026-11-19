import 'package:flutter/material.dart';

class CoachPersona {
  final String id;
  final String name;
  final String gender; // 'female' or 'male'
  final String avatarUrl;
  final String assetAvatar;
  final String videoAsset;
  final String? idleVideoAsset;
  final String tagline;
  final String accent;
  final double pitch;
  final double speechRate;
  final String promptPersonality;
  final List<Color> themeGradient;
  final Color primaryAccent;

  const CoachPersona({
    required this.id,
    required this.name,
    required this.gender,
    required this.avatarUrl,
    required this.assetAvatar,
    required this.videoAsset,
    this.idleVideoAsset,
    required this.tagline,
    required this.accent,
    required this.pitch,
    required this.speechRate,
    required this.promptPersonality,
    required this.themeGradient,
    required this.primaryAccent,
  });

  bool get isFemale => gender.toLowerCase() == 'female';
  bool get isMale => gender.toLowerCase() == 'male';

  String get flag {
    if (id == 'sarah' || id == 'alex') return '🇺🇸';
    if (id == 'emma' || id == 'oliver') return '🇬🇧';
    return '🇯🇵';
  }

  String get flagAsset {
    if (id == 'sarah' || id == 'alex') return 'assets/images/flag_us.png';
    if (id == 'emma' || id == 'oliver') return 'assets/images/flag_gb.png';
    return 'assets/images/flag_jp.png';
  }

  String get shortAccent {
    if (id == 'sarah' || id == 'alex') return 'American';
    if (id == 'emma' || id == 'oliver') return 'British';
    return 'Global Tech';
  }

  String get shortTone {
    if (id == 'sarah') return 'Warm & Friendly';
    if (id == 'emma') return 'Articulate & Clear';
    if (id == 'aoi') return 'Gentle & Patient';
    if (id == 'alex') return 'Daily Fluency';
    if (id == 'oliver') return 'Cambridge Debate';
    if (id == 'kenji') return 'Bilingual JP/EN';
    return 'Conversational';
  }

  Widget buildAvatar({double radius = 24, BoxFit fit = BoxFit.cover}) {
    final size = radius * 2;
    return Container(
      width: size,
      height: size,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: Color(0xFF334155),
      ),
      child: ClipOval(
        child: Image.asset(
          assetAvatar,
          width: size,
          height: size,
          fit: fit,
          errorBuilder: (_, __, ___) => Image.network(
            'assets/images/coaches/$id.jpg',
            width: size,
            height: size,
            fit: fit,
            errorBuilder: (_, __, ___) => Image.network(
              'http://localhost:3001/images/coaches/$id.jpg',
              width: size,
              height: size,
              fit: fit,
              errorBuilder: (_, __, ___) => Image.network(
                avatarUrl,
                width: size,
                height: size,
                fit: fit,
                errorBuilder: (_, __, ___) => Container(
                  color: const Color(0xFF334155),
                  child: Center(
                    child: Text(
                      isFemale ? '👩' : '👨',
                      style: TextStyle(fontSize: radius * 0.9),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  static const List<CoachPersona> presetCoaches = [
    // 1. Female Coaches
    CoachPersona(
      id: 'sarah',
      name: 'Sarah',
      gender: 'female',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      assetAvatar: 'assets/images/coaches/sarah.jpg',
      videoAsset: 'assets/videos/sarah.mp4',
      idleVideoAsset: 'assets/videos/sarah_idle.mp4',
      tagline: 'Warm & Patient • Master English Tutor',
      accent: 'American English / Warm Tone',
      pitch: 1.30,
      speechRate: 0.92,
      promptPersonality: 'You are Coach Sarah, a kind, patient female language tutor with a warm, encouraging smile and empathetic conversational style. Keep answers natural, supportive, and conversational.',
      themeGradient: [Color(0xFF1C1310), Color(0xFF1A1D2E)],
      primaryAccent: Color(0xFFFF9F43),
    ),
    CoachPersona(
      id: 'emma',
      name: 'Emma',
      gender: 'female',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      assetAvatar: 'assets/images/coaches/emma.jpg',
      videoAsset: 'assets/videos/emma.mp4',
      idleVideoAsset: 'assets/videos/emma_idle.mp4',
      tagline: 'Executive & Cambridge Business English',
      accent: 'British / Confident Articulate Tone',
      pitch: 1.25,
      speechRate: 0.90,
      promptPersonality: 'You are Coach Emma, an articulate British female language mentor who helps learners speak with professional poise, clear diction, and interview confidence.',
      themeGradient: [Color(0xFF0F172A), Color(0xFF1E293B)],
      primaryAccent: Color(0xFF38BDF8),
    ),
    CoachPersona(
      id: 'aoi',
      name: 'Aoi',
      gender: 'female',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      assetAvatar: 'assets/images/coaches/aoi.jpg',
      videoAsset: 'assets/videos/aoi.mp4',
      idleVideoAsset: 'assets/videos/aoi_idle.mp4',
      tagline: 'Gentle & Clear • International Linguistics Specialist',
      accent: 'Clear & Articulate Tone',
      pitch: 1.25,
      speechRate: 0.88,
      promptPersonality: 'You are Coach Aoi, a gentle and remarkably clear multilingual female coach who paces sentences carefully for learners.',
      themeGradient: [Color(0xFF101B20), Color(0xFF191D32)],
      primaryAccent: Color(0xFF2DD4BF),
    ),

    // 2. Male Coaches
    CoachPersona(
      id: 'alex',
      name: 'Alex',
      gender: 'male',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      assetAvatar: 'assets/images/coaches/alex.jpg',
      videoAsset: 'assets/videos/alex.mp4',
      idleVideoAsset: 'assets/videos/alex_idle.mp4',
      tagline: 'Casual & Modern • Silicon Valley English Mentor',
      accent: 'American English / Deep Casual Tone',
      pitch: 0.95,
      speechRate: 0.96,
      promptPersonality: 'You are Coach Alex, a friendly, encouraging American male tutor with a modern, relaxed conversational style. You specialize in daily conversational flow, slang, idioms, and natural English cadence.',
      themeGradient: [Color(0xFF1E1B4B), Color(0xFF0F172A)],
      primaryAccent: Color(0xFF818CF8),
    ),
    CoachPersona(
      id: 'oliver',
      name: 'Oliver',
      gender: 'male',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      assetAvatar: 'assets/images/coaches/oliver.jpg',
      videoAsset: 'assets/videos/oliver.mp4',
      idleVideoAsset: 'assets/videos/oliver_idle.mp4',
      tagline: 'Executive Poise & Cambridge Business English',
      accent: 'British / Distinguished RP Diction',
      pitch: 0.92,
      speechRate: 0.92,
      promptPersonality: 'You are Coach Oliver, a sophisticated British male executive coach. You mentor students in professional diction, business meetings, job interviews, and precise presentation vocabulary.',
      themeGradient: [Color(0xFF0F172A), Color(0xFF1E293B)],
      primaryAccent: Color(0xFF38BDF8),
    ),
    CoachPersona(
      id: 'kenji',
      name: 'Kenji',
      gender: 'male',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      assetAvatar: 'assets/images/coaches/kenji.jpg',
      videoAsset: 'assets/videos/kenji.mp4',
      idleVideoAsset: 'assets/videos/kenji_idle.mp4',
      tagline: 'Methodical & Patient • Bilingual Linguistics Expert',
      accent: 'Articulate & Clear Global Tone',
      pitch: 0.98,
      speechRate: 0.90,
      promptPersonality: 'You are Coach Kenji, a calm, patient, and highly articulate multilingual coach. You excel in breaking down tricky grammar patterns, phonetics, and building confidence in non-native speakers.',
      themeGradient: [Color(0xFF064E3B), Color(0xFF0F172A)],
      primaryAccent: Color(0xFF34D399),
    ),
  ];

  static CoachPersona get defaultCoach => presetCoaches.first; // Sarah

  static CoachPersona findById(String? id) {
    if (id == null) return defaultCoach;
    return presetCoaches.firstWhere(
      (c) => c.id.toLowerCase() == id.toLowerCase(),
      orElse: () => defaultCoach,
    );
  }
}
