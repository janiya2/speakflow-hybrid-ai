import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'auth_session_stub.dart' if (dart.library.js) 'auth_session_web.dart';

class AuthSessionService {
  static const String _kLoggedIn = 'speakflow_is_logged_in';
  static const String _kUserUid = 'speakflow_user_uid';
  static const String _kUserEmail = 'speakflow_user_email';
  static const String _kDisplayName = 'speakflow_display_name';
  static const String _kIsDemo = 'speakflow_is_demo_vip';

  static bool get isLoggedIn {
    final flag = PlatformAuthStorage.getItem(_kLoggedIn);
    return flag == 'true';
  }

  static bool get isDemoVip {
    final flag = PlatformAuthStorage.getItem(_kIsDemo);
    return flag == 'true';
  }

  static String? get savedUid => PlatformAuthStorage.getItem(_kUserUid);
  static String? get savedEmail => PlatformAuthStorage.getItem(_kUserEmail);
  static String? get savedName => PlatformAuthStorage.getItem(_kDisplayName);

  static void saveSession({
    required String uid,
    String? email,
    String? displayName,
    bool isDemo = true,
  }) {
    PlatformAuthStorage.setItem(_kLoggedIn, 'true');
    PlatformAuthStorage.setItem(_kUserUid, uid);
    if (email != null && email.isNotEmpty) {
      PlatformAuthStorage.setItem(_kUserEmail, email);
    }
    if (displayName != null && displayName.isNotEmpty) {
      PlatformAuthStorage.setItem(_kDisplayName, displayName);
    }
    if (isDemo) {
      PlatformAuthStorage.setItem(_kIsDemo, 'true');
    }
    debugPrint('[AuthSessionService] Session saved for $uid (demo: $isDemo)');
  }

  static void clearSession() {
    PlatformAuthStorage.removeItem(_kLoggedIn);
    PlatformAuthStorage.removeItem(_kUserUid);
    PlatformAuthStorage.removeItem(_kUserEmail);
    PlatformAuthStorage.removeItem(_kDisplayName);
    PlatformAuthStorage.removeItem(_kIsDemo);
    debugPrint('[AuthSessionService] Session cleared');
  }

  /// Ensures user is restored or seamlessly authenticated as Judge VIP demo user
  static Future<User?> restoreOrEnsureSession() async {
    final auth = FirebaseAuth.instance;

    // 1. If Firebase already has currentUser, ensure session stored and return
    if (auth.currentUser != null) {
      saveSession(
        uid: auth.currentUser!.uid,
        email: auth.currentUser!.email ?? 'judge.evaluator@google-hackathon.ai',
        displayName: auth.currentUser!.displayName ?? 'Hackathon Judge (VIP Demo)',
        isDemo: true,
      );
      return auth.currentUser;
    }

    // 2. Wait briefly for Firebase auth state restoration
    try {
      final user = await auth.authStateChanges().firstWhere((u) => u != null).timeout(
        const Duration(milliseconds: 1500),
        onTimeout: () => null,
      );
      if (user != null) {
        saveSession(
          uid: user.uid,
          email: user.email ?? 'judge.evaluator@google-hackathon.ai',
          displayName: user.displayName ?? 'Hackathon Judge (VIP Demo)',
          isDemo: true,
        );
        return user;
      }
    } catch (_) {}

    // 3. Guaranteed Judge VIP fallback authentication
    try {
      debugPrint('[AuthSessionService] Initializing guaranteed Judge VIP demo session...');
      final cred = await auth.signInAnonymously();
      final newUser = cred.user;
      if (newUser != null) {
        final name = savedName ?? 'Hackathon Judge (VIP Demo)';
        final email = savedEmail ?? 'judge.evaluator@google-hackathon.ai';
        try {
          await newUser.updateDisplayName(name);
        } catch (_) {}

        try {
          final userDocRef = FirebaseFirestore.instance.collection('lang_users').doc(newUser.uid);
          final doc = await userDocRef.get();
          if (!doc.exists) {
            await userDocRef.set({
              'email': email,
              'displayName': name,
              'createdAt': DateTime.now().toIso8601String(),
              'totalCalls': 12,
              'totalMinutes': 48,
              'averageScore': 94,
              'streak': 5,
              'isVip': true,
              'isVipMonthly': true,
              'targetLanguages': ['English', 'Spanish', 'Sinhala'],
            }, SetOptions(merge: true));
          }
        } catch (_) {}

        saveSession(
          uid: newUser.uid,
          email: email,
          displayName: name,
          isDemo: true,
        );
        return newUser;
      }
    } catch (err) {
      debugPrint('[AuthSessionService] Anonymous sign in fallback error: $err');
    }

    return auth.currentUser;
  }
}
