import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      default:
        return web;
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAXlKI0I8yNMtHIFxKk3lC_hixfuZkj5_Y',
    appId: '1:265385222467:web:fd5c2a7551cf558b988ff6',
    messagingSenderId: '265385222467',
    projectId: 'uscut-a78e9',
    authDomain: 'uscut-a78e9.firebaseapp.com',
    storageBucket: 'uscut-a78e9.firebasestorage.app',
    measurementId: 'G-VCSC94X6QJ',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCwkyYNOAihQO4pEFM_Rq8pPt3KKDCKuRM',
    appId: '1:265385222467:android:8906deead56be1b5988ff6',
    messagingSenderId: '265385222467',
    projectId: 'uscut-a78e9',
    storageBucket: 'uscut-a78e9.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAXlKI0I8yNMtHIFxKk3lC_hixfuZkj5_Y',
    appId: '1:265385222467:ios:fd5c2a7551cf558b988ff6',
    messagingSenderId: '265385222467',
    projectId: 'uscut-a78e9',
    storageBucket: 'uscut-a78e9.firebasestorage.app',
  );
}

