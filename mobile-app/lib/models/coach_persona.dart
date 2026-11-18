import 'package:flutter/material.dart';

class CoachPersona {
  final String id;
  final String name;
  final String gender; // 'female'
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

  bool get isFemale => gender == 'female';

  static const List<CoachPersona> presetCoaches = [
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
  ];

  static CoachPersona get defaultCoach => presetCoaches.first; // Sarah (Female)

  static CoachPersona findById(String? id) {
    if (id == null) return defaultCoach;
    return presetCoaches.firstWhere(
      (c) => c.id.toLowerCase() == id.toLowerCase(),
      orElse: () => defaultCoach,
    );
  }
}
