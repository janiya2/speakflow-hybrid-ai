import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'firebase_options.dart';
import 'screens/splash_screen.dart';
import 'services/subscription_service.dart';
import 'services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
    if (kIsWeb) {
      await FirebaseAuth.instance.setPersistence(Persistence.LOCAL);
    }
    await SubscriptionService.instance.initialize();
    await NotificationService.instance.initialize();
  } catch (e) {
    debugPrint('Firebase init error: $e');
  }
  runApp(const LanguageCoachApp());
}

class LanguageCoachApp extends StatelessWidget {
  const LanguageCoachApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SpeakFlow AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        primaryColor: const Color(0xFF6366F1),
        fontFamilyFallback: const ['Noto Sans Sinhala', 'Apple Color Emoji', 'Segoe UI Emoji', 'sans-serif'],
      ),
      home: const SplashScreen(),
    );
  }
}
