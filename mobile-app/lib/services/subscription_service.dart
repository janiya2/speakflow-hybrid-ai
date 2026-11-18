import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class SubscriptionService {
  SubscriptionService._();
  static final SubscriptionService instance = SubscriptionService._();

  // RevenueCat Public API Key (Configured dynamically from Firestore lang_settings/subscription_plans)
  static String _revenueCatApiKey = 'goog_YtmphTylsIXKLnPBAPRYWaLmnoB';
  static bool _isConfigured = false;

  /// Initialize Purchases
  Future<void> initialize({String? customApiKey}) async {
    if (kIsWeb) {
      debugPrint('[SubscriptionService] Web platform: Purchases disabled.');
      return;
    }

    try {
      // 1. Check if custom key provided or fetch from Firestore
      if (customApiKey != null && customApiKey.isNotEmpty) {
        _revenueCatApiKey = customApiKey;
      } else {
        final settingsDoc = await FirebaseFirestore.instance
            .collection('lang_settings')
            .doc('subscription_plans')
            .get();
        if (settingsDoc.exists) {
          final key = settingsDoc.data()?['revenueCatApiKey'] as String?;
          if (key != null && key.isNotEmpty && !key.contains('placeholder')) {
            _revenueCatApiKey = key;
          }
        }
      }

      // Configure Purchases if key is valid
      if (_revenueCatApiKey.startsWith('goog_') && !_revenueCatApiKey.contains('placeholder')) {
        await Purchases.setLogLevel(kDebugMode ? LogLevel.debug : LogLevel.info);
        final configuration = PurchasesConfiguration(_revenueCatApiKey);
        await Purchases.configure(configuration);
        _isConfigured = true;
        debugPrint('[SubscriptionService] RevenueCat configured successfully.');

        // Link with current Firebase user if logged in
        final user = FirebaseAuth.instance.currentUser;
        if (user != null) {
          await Purchases.logIn(user.uid);
        }
      } else {
        debugPrint('[SubscriptionService] Using simulated in-app purchases mode (Key pending).');
      }
    } catch (e) {
      debugPrint('[SubscriptionService] Initialization error: $e');
    }
  }

  /// Update active user
  Future<void> onUserLogin(String uid) async {
    if (_isConfigured && !kIsWeb) {
      try {
        await Purchases.logIn(uid);
      } catch (e) {
        debugPrint('[SubscriptionService] Error linking user: $e');
      }
    }
  }

  /// Purchase a subscription tier
  /// tierIndex: 0 = Weekly Trial, 1 = Monthly, 2 = Yearly
  Future<bool> purchaseTier({
    required int tierIndex,
    required int trialDays,
  }) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return false;

    final tierCode = tierIndex == 0 ? 'weekly' : (tierIndex == 1 ? 'monthly' : 'yearly');
    final tierName = tierIndex == 0
        ? 'Weekly Pro Trial'
        : (tierIndex == 1 ? 'Monthly Pro Pass' : 'Yearly VIP Pass');

    // 1. If RevenueCat is configured on a real device, try real Google Play Billing
    if (_isConfigured && !kIsWeb) {
      try {
        final offerings = await Purchases.getOfferings();
        if (offerings.current != null && offerings.current!.availablePackages.isNotEmpty) {
          Package? targetPackage;
          final packages = offerings.current!.availablePackages;

          if (tierIndex == 0) {
            targetPackage = packages.firstWhere(
              (p) =>
                  p.packageType == PackageType.weekly ||
                  p.identifier.toLowerCase().contains('week') ||
                  p.storeProduct.identifier.toLowerCase().contains('weekly'),
              orElse: () => packages.first,
            );
          } else if (tierIndex == 1) {
            targetPackage = packages.firstWhere(
              (p) =>
                  p.packageType == PackageType.monthly ||
                  p.identifier.toLowerCase().contains('month') ||
                  p.storeProduct.identifier.toLowerCase().contains('monthly'),
              orElse: () => packages.first,
            );
          } else {
            targetPackage = packages.firstWhere(
              (p) =>
                  p.packageType == PackageType.annual ||
                  p.identifier.toLowerCase().contains('year') ||
                  p.identifier.toLowerCase().contains('annual') ||
                  p.storeProduct.identifier.toLowerCase().contains('yearly'),
              orElse: () => packages.first,
            );
          }

          final purchaseResult = await Purchases.purchasePackage(targetPackage);
          final hasPro = purchaseResult.customerInfo.entitlements.active.isNotEmpty;
          if (hasPro) {
            await _syncProStatusToFirestore(user.uid, tierCode, tierName, trialDays);
            return true;
          }
        }
        return false;
      } catch (e) {
        debugPrint('[SubscriptionService] Purchases purchase error / canceled: $e');
        return false;
      }
    }

    // 2. Fallback / Test Simulation: Directly activate in Firestore
    await _syncProStatusToFirestore(user.uid, tierCode, tierName, trialDays);
    return true;
  }

  /// Restore purchases
  Future<bool> restorePurchases() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return false;

    if (_isConfigured && !kIsWeb) {
      try {
        final customerInfo = await Purchases.restorePurchases();
        if (customerInfo.entitlements.active.isNotEmpty) {
          await FirebaseFirestore.instance.collection('lang_users').doc(user.uid).set({
            'isVipMonthly': true,
            'vipRestoredAt': FieldValue.serverTimestamp(),
          }, SetOptions(merge: true));
          return true;
        }
      } catch (e) {
        debugPrint('[SubscriptionService] Restore error: $e');
      }
    }

    // Check Firestore doc
    final doc = await FirebaseFirestore.instance.collection('lang_users').doc(user.uid).get();
    return doc.exists && doc.data()?['isVipMonthly'] == true;
  }

  Future<void> _syncProStatusToFirestore(
    String uid,
    String tierCode,
    String tierName,
    int trialDays,
  ) async {
    final trialEndsAt = DateTime.now().add(Duration(days: trialDays));
    await FirebaseFirestore.instance.collection('lang_users').doc(uid).set({
      'isVip': true,
      'isVipMonthly': true,
      'subscriptionTier': tierCode,
      'subscriptionPlan': tierName,
      'vipPackageName': tierName,
      'hasTrialActive': trialDays > 0,
      'trialEndsAt': trialDays > 0 ? Timestamp.fromDate(trialEndsAt) : null,
      'subscriptionActivatedAt': FieldValue.serverTimestamp(),
      'extraMinutes': 9999,
    }, SetOptions(merge: true));
  }
}

