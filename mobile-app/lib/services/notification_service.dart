import 'package:flutter/foundation.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  debugPrint('FCM background message received: ${message.messageId}');
}

class NotificationService {
  NotificationService._();
  static final NotificationService instance = NotificationService._();

  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();

  static const AndroidNotificationChannel _channel = AndroidNotificationChannel(
    'speakflow_coach_channel',
    'AI Language Coach Alerts',
    description: 'Speaking streak reminders, Elena practice nudges, and special Pro offers',
    importance: Importance.high,
    playSound: true,
  );

  bool _isInitialized = false;

  Future<void> initialize() async {
    if (_isInitialized) return;

    try {
      // 1. Set background messaging handler
      FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

      // 2. Setup Local Notifications for Android foreground heads-up display
      const AndroidInitializationSettings androidSettings =
          AndroidInitializationSettings('@mipmap/ic_launcher');
      const InitializationSettings initSettings =
          InitializationSettings(android: androidSettings);

      await _localNotifications.initialize(
        initSettings,
        onDidReceiveNotificationResponse: (NotificationResponse response) {
          debugPrint('Local notification clicked: ${response.payload}');
        },
      );

      // Create Android Notification Channel
      final androidPlugin = _localNotifications.resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>();
      if (androidPlugin != null) {
        await androidPlugin.createNotificationChannel(_channel);
      }

      // 3. Request permissions explicitly (both Local Notifications & Firebase)
      await requestNotificationPermission();

      // 4. Foreground notification listener
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        final notification = message.notification;

        if (notification != null && !kIsWeb) {
          _localNotifications.show(
            notification.hashCode,
            notification.title,
            notification.body,
            NotificationDetails(
              android: AndroidNotificationDetails(
                _channel.id,
                _channel.name,
                channelDescription: _channel.description,
                importance: Importance.high,
                priority: Priority.high,
                icon: '@mipmap/ic_launcher',
                playSound: true,
              ),
            ),
            payload: message.data['route'],
          );
        }
      });

      // 5. Check if user is already logged in, save FCM token
      final currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser != null) {
        await saveTokenForUser(currentUser.uid);
      }

      // 6. Listen for token refresh
      _fcm.onTokenRefresh.listen((newToken) {
        final user = FirebaseAuth.instance.currentUser;
        if (user != null) {
          saveTokenForUser(user.uid, tokenOverride: newToken);
        }
      });

      _isInitialized = true;
      debugPrint('NotificationService initialized successfully.');
    } catch (e) {
      debugPrint('NotificationService init error (graceful fallback): $e');
    }
  }

  /// Check whether notifications are currently granted
  Future<bool> checkPermissionGranted() async {
    try {
      final settings = await _fcm.getNotificationSettings();
      if (settings.authorizationStatus == AuthorizationStatus.authorized ||
          settings.authorizationStatus == AuthorizationStatus.provisional) {
        return true;
      }

      final androidPlugin = _localNotifications.resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>();
      if (androidPlugin != null) {
        final areEnabled = await androidPlugin.areNotificationsEnabled();
        if (areEnabled == true) return true;
      }
      return false;
    } catch (e) {
      debugPrint('Error checking notification permission: $e');
      return false;
    }
  }

  /// Explicitly trigger the Android 13+ native permission popup dialog
  Future<bool> requestNotificationPermission() async {
    try {
      bool isGranted = false;

      // 1. Request via Android Local Notifications plugin (Triggers POST_NOTIFICATIONS system popup on Android 13+)
      final androidPlugin = _localNotifications.resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>();
      if (androidPlugin != null) {
        final androidGranted = await androidPlugin.requestNotificationsPermission();
        if (androidGranted == true) isGranted = true;
      }

      // 2. Request via Firebase Messaging
      final settings = await _fcm.requestPermission(
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized ||
          settings.authorizationStatus == AuthorizationStatus.provisional) {
        isGranted = true;
      }

      debugPrint('Notification permission request result: $isGranted');

      // If granted, save the token immediately for the logged-in user
      if (isGranted) {
        final currentUser = FirebaseAuth.instance.currentUser;
        if (currentUser != null) {
          await saveTokenForUser(currentUser.uid);
        }
      }

      return isGranted;
    } catch (e) {
      debugPrint('Error requesting notification permission: $e');
      return false;
    }
  }

  Future<void> saveTokenForUser(String uid, {String? tokenOverride}) async {
    try {
      if (kIsWeb) {
        // On web, avoid token retrieval if notification permission was blocked in browser
        final isGranted = await checkPermissionGranted();
        if (!isGranted) {
          debugPrint('[NotificationService] Web notification permission not granted. Skipping FCM token fetch.');
          return;
        }
      }

      final token = tokenOverride ?? await _fcm.getToken();
      if (token == null) return;

      debugPrint('Saving FCM device token for UID: $uid');
      await FirebaseFirestore.instance.collection('lang_users').doc(uid).set({
        'fcmToken': token,
        'notificationsEnabled': true,
        'platform': 'android',
        'lastTokenUpdate': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));
    } catch (e) {
      debugPrint('Error saving FCM token to Firestore: $e');
    }
  }
}
