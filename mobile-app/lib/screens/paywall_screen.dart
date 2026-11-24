import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'terms_policy_screen.dart';
import '../services/subscription_service.dart';
import '../services/auth_session_service.dart';

class PaywallScreen extends StatefulWidget {
  final bool isDismissible;

  const PaywallScreen({
    super.key,
    this.isDismissible = true,
  });

  static Future<bool?> show(BuildContext context, {bool isDismissible = true}) {
    return Navigator.of(context).push<bool>(
      PageRouteBuilder(
        opaque: true,
        transitionDuration: const Duration(milliseconds: 350),
        pageBuilder: (context, animation, secondaryAnimation) => PaywallScreen(
          isDismissible: isDismissible,
        ),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          const begin = Offset(0.0, 1.0);
          const end = Offset.zero;
          const curve = Curves.easeOutCubic;
          final tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
          return SlideTransition(position: animation.drive(tween), child: child);
        },
      ),
    );
  }

  @override
  State<PaywallScreen> createState() => _PaywallScreenState();
}

class _PaywallScreenState extends State<PaywallScreen> {
  // 0: Weekly, 1: Monthly, 2: Yearly
  int _selectedTierIndex = 0;
  bool _isProcessing = false;

  // Defaults fallback
  int _trialDays = 3;
  String _weeklyPrice = '\$9.99';
  String _monthlyPrice = '\$19.99';
  String _yearlyPrice = '\$39.99';
  String _yearlySavings = 'Save 92%';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: StreamBuilder<DocumentSnapshot>(
        stream: FirebaseFirestore.instance.collection('lang_settings').doc('subscription_plans').snapshots(),
        builder: (context, snapshot) {
          if (snapshot.hasData && snapshot.data != null && snapshot.data!.exists) {
            final data = snapshot.data!.data() as Map<String, dynamic>? ?? {};
            _trialDays = (data['trialDays'] is num) ? (data['trialDays'] as num).toInt() : 3;
            if (data['weeklyPrice'] != null) _weeklyPrice = data['weeklyPrice'].toString();
            if (data['monthlyPrice'] != null) _monthlyPrice = data['monthlyPrice'].toString();
            if (data['yearlyPrice'] != null) _yearlyPrice = data['yearlyPrice'].toString();
            if (data['yearlySavings'] != null) _yearlySavings = data['yearlySavings'].toString();
          }

          return Stack(
            children: [
              // 1. Soft Gradient Background
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Color(0xFFDCE6FC),
                      Color(0xFFEBF1FD),
                      Color(0xFFF8FAFC),
                      Colors.white,
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    stops: [0.0, 0.28, 0.55, 1.0],
                  ),
                ),
              ),

              // 2. Main Scrollable Content
              SafeArea(
                child: SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Top Action Bar (Close & Restore)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          if (widget.isDismissible)
                            GestureDetector(
                              onTap: () => Navigator.of(context).pop(false),
                              child: Container(
                                width: 36,
                                height: 36,
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.85),
                                  shape: BoxShape.circle,
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.06),
                                      blurRadius: 8,
                                      offset: const Offset(0, 2),
                                    ),
                                  ],
                                ),
                                child: const Icon(
                                  Icons.close_rounded,
                                  color: Color(0xFF475569),
                                  size: 20,
                                ),
                              ),
                            )
                          else
                            const SizedBox(width: 36),
                          GestureDetector(
                            onTap: _restorePurchases,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.85),
                                borderRadius: BorderRadius.circular(20),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.05),
                                    blurRadius: 8,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: const Text(
                                'Restore',
                                style: TextStyle(
                                  color: Color(0xFF475569),
                                  fontSize: 13,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 10),

                      // Tutor Hero Portrait with ambient glow & smooth fade
                      _buildTutorHero(),

                      const SizedBox(height: 12),

                      // Brand Tagline
                      ShaderMask(
                        shaderCallback: (bounds) => const LinearGradient(
                          colors: [Color(0xFF3B82F6), Color(0xFF6366F1), Color(0xFF4F46E5)],
                        ).createShader(bounds),
                        child: const Text(
                          'SpeakFlow Pro',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 17,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 0.2,
                          ),
                        ),
                      ),

                      const SizedBox(height: 6),

                      // Main Bold Headline
                      const Text(
                        'Unlock Full Access',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Color(0xFF0F172A),
                          fontSize: 27,
                          fontWeight: FontWeight.w900,
                          letterSpacing: -0.5,
                        ),
                      ),

                      const SizedBox(height: 6),

                      // Subtitle
                      Text(
                        'Learn anytime and anywhere at your own pace',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: const Color(0xFF64748B).withOpacity(0.9),
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),

                      const SizedBox(height: 20),

                      // Feature Highlights Checklist
                      _buildFeatureBullets(),

                      const SizedBox(height: 24),

                      // Subscription Tiers (Weekly with Trial, Monthly, Yearly)
                      _buildTierCards(),

                      const SizedBox(height: 22),

                      // Auto-renewal Notice
                      Text(
                        'Auto-renewable, cancel anytime',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: const Color(0xFF64748B).withOpacity(0.9),
                          fontSize: 12.5,
                          fontWeight: FontWeight.w500,
                        ),
                      ),

                      const SizedBox(height: 12),

                      // Big Primary CTA Button
                      _buildStartButton(),

                      const SizedBox(height: 16),

                      // Bottom Legal Fine Print
                      _buildLegalDisclaimer(),
                    ],
                  ),
                ),
              ),

              // Processing overlay
              if (_isProcessing)
                Container(
                  color: Colors.black38,
                  child: const Center(
                    child: CircularProgressIndicator(
                      color: Color(0xFF4F46E5),
                    ),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }

  // -------------------------------------------------------------
  // TUTOR HERO AVATAR
  // -------------------------------------------------------------
  Widget _buildTutorHero() {
    return SizedBox(
      height: 180,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Soft radial glow behind
          Container(
            width: 170,
            height: 170,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  const Color(0xFF818CF8).withOpacity(0.35),
                  const Color(0xFFC7D2FE).withOpacity(0.15),
                  Colors.transparent,
                ],
                stops: const [0.0, 0.55, 1.0],
              ),
            ),
          ),

          // High-Res Coach Avatar Image
          ClipOval(
            child: Container(
              width: 150,
              height: 150,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Color(0xFFE0E7FF),
              ),
              child: Image.asset(
                'assets/images/teacher_login_hero.jpg',
                fit: BoxFit.cover,
                errorBuilder: (ctx, err, stack) {
                  return Container(
                    color: const Color(0xFFE0E7FF),
                    child: const Icon(
                      Icons.school_rounded,
                      size: 64,
                      color: Color(0xFF4F46E5),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  // -------------------------------------------------------------
  // FEATURE BULLETS
  // -------------------------------------------------------------
  Widget _buildFeatureBullets() {
    final features = [
      'Unlimited Learning with AI',
      'Instant Speaking Analysis',
      'Your Unique Study Plan',
      'Track Your Daily Progress',
    ];

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Column(
        children: features.map((feat) {
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 4.5),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(2),
                  decoration: const BoxDecoration(
                    color: Color(0xFF10B981),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.check,
                    color: Colors.white,
                    size: 13,
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  feat,
                  style: const TextStyle(
                    color: Color(0xFF1E293B),
                    fontSize: 14.5,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  // -------------------------------------------------------------
  // TIER SELECTION CARDS
  // -------------------------------------------------------------
  Widget _buildTierCards() {
    return Column(
      children: [
        // 1. Weekly Card (With Free Trial)
        _buildTierOptionCard(
          index: 0,
          title: 'Weekly',
          subtitle: '$_trialDays-day free trial, then USD $_weeklyPrice/week',
          badgeText: 'No payment now',
          badgeColor: const Color(0xFF10B981),
          showCheckBadge: true,
        ),

        const SizedBox(height: 12),

        // 2. Monthly Card
        _buildTierOptionCard(
          index: 1,
          title: 'Monthly',
          subtitle: 'USD $_monthlyPrice/month',
          badgeText: 'Popular',
          badgeColor: const Color(0xFF6366F1),
          showCheckBadge: false,
        ),

        const SizedBox(height: 12),

        // 3. Yearly Card (With Big Savings)
        _buildTierOptionCard(
          index: 2,
          title: 'Yearly',
          subtitle: 'USD $_yearlyPrice/year',
          badgeText: _yearlySavings,
          badgeColor: const Color(0xFF10B981),
          showCheckBadge: false,
        ),
      ],
    );
  }

  Widget _buildTierOptionCard({
    required int index,
    required String title,
    required String subtitle,
    required String badgeText,
    required Color badgeColor,
    required bool showCheckBadge,
  }) {
    final isSelected = _selectedTierIndex == index;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        GestureDetector(
          onTap: () {
            setState(() {
              _selectedTierIndex = index;
            });
          },
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            decoration: BoxDecoration(
              color: isSelected ? const Color(0xFFF0F5FF) : Colors.white,
              borderRadius: BorderRadius.circular(22),
              border: Border.all(
                color: isSelected ? const Color(0xFF4F46E5) : const Color(0xFFE2E8F0),
                width: isSelected ? 2.0 : 1.2,
              ),
              boxShadow: [
                BoxShadow(
                  color: isSelected
                      ? const Color(0xFF4F46E5).withOpacity(0.12)
                      : Colors.black.withOpacity(0.03),
                  blurRadius: isSelected ? 14 : 8,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Row(
              children: [
                // Radio indicator
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isSelected ? const Color(0xFF4F46E5) : const Color(0xFFE2E8F0),
                  ),
                  child: isSelected
                      ? const Icon(
                          Icons.check,
                          color: Colors.white,
                          size: 16,
                        )
                      : null,
                ),
                const SizedBox(width: 14),

                // Title & Price subtitle
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: const TextStyle(
                          color: Color(0xFF0F172A),
                          fontSize: 16.5,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        subtitle,
                        style: const TextStyle(
                          color: Color(0xFF64748B),
                          fontSize: 12.5,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),

                // Savings pill for Yearly or Monthly if not showing floating badge
                if (index != 0)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: badgeColor.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      badgeText,
                      style: TextStyle(
                        color: badgeColor,
                        fontWeight: FontWeight.w800,
                        fontSize: 12,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),

        // Floating "No payment now" badge on top right for Weekly Trial
        if (index == 0)
          Positioned(
            top: -10,
            right: 14,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3.5),
              decoration: BoxDecoration(
                color: const Color(0xFF10B981),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF10B981).withOpacity(0.35),
                    blurRadius: 6,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.check, color: Colors.white, size: 12),
                  SizedBox(width: 4),
                  Text(
                    'No payment now',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }

  // -------------------------------------------------------------
  // CTA BUTTON
  // -------------------------------------------------------------
  Widget _buildStartButton() {
    final isTrial = _selectedTierIndex == 0;
    final btnText = isTrial ? 'Start for Free' : 'Continue';

    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: _isProcessing ? null : _handleSubscribe,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF4F46E5),
          foregroundColor: Colors.white,
          elevation: 4,
          shadowColor: const Color(0xFF4F46E5).withOpacity(0.4),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
        ),
        child: Text(
          btnText,
          style: const TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.2,
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // LEGAL DISCLAIMER
  // -------------------------------------------------------------
  Widget _buildLegalDisclaimer() {
    String currentPriceText = 'USD $_weeklyPrice/week after $_trialDays days free trial';
    if (_selectedTierIndex == 1) currentPriceText = 'USD $_monthlyPrice/month';
    if (_selectedTierIndex == 2) currentPriceText = 'USD $_yearlyPrice/year';

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GestureDetector(
              onTap: () => _openLegalDocs(0),
              child: const Text(
                'Terms of Service',
                style: TextStyle(
                  color: Color(0xFF64748B),
                  fontSize: 11,
                  decoration: TextDecoration.underline,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            const Text(
              ' & ',
              style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
            ),
            GestureDetector(
              onTap: () => _openLegalDocs(1),
              child: const Text(
                'Privacy Policy',
                style: TextStyle(
                  color: Color(0xFF64748B),
                  fontSize: 11,
                  decoration: TextDecoration.underline,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 6),
        Text(
          'Please note: Your Google Play account payment method will automatically be charged $currentPriceText. Cancel your subscription at least 24 hours before the current subscription period ends to avoid being charged for a new period. Manage or cancel subscriptions anytime in Google Play Store settings.',
          textAlign: TextAlign.center,
          style: TextStyle(
            color: const Color(0xFF94A3B8).withOpacity(0.85),
            fontSize: 10,
            height: 1.35,
          ),
        ),
      ],
    );
  }

  void _openLegalDocs(int tabIndex) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => TermsAndPrivacyScreen(initialTabIndex: tabIndex),
      ),
    );
  }

  // -------------------------------------------------------------
  // RESTORE PURCHASES
  // -------------------------------------------------------------
  Future<void> _restorePurchases() async {
    setState(() => _isProcessing = true);
    final restored = await SubscriptionService.instance.restorePurchases();
    if (!mounted) return;
    setState(() => _isProcessing = false);

    if (restored) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Your Pro subscription was successfully restored! 🎉'),
          backgroundColor: Color(0xFF10B981),
          behavior: SnackBarBehavior.floating,
        ),
      );
      Navigator.of(context).pop(true);
      return;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('No active Google Play subscriptions found for this account.'),
        backgroundColor: Color(0xFF64748B),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  // -------------------------------------------------------------
  // HANDLE SUBSCRIBE / FREE TRIAL ACTIVATION
  // -------------------------------------------------------------
  Future<void> _handleSubscribe() async {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      try {
        user = await AuthSessionService.restoreOrEnsureSession();
      } catch (_) {}
    }
    if (user == null && !AuthSessionService.isDemoVip) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please log in first to activate your free trial.'),
          backgroundColor: Color(0xFFEF4444),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    setState(() => _isProcessing = true);

    try {
      final tierName = _selectedTierIndex == 0
          ? 'Weekly Pro Trial'
          : (_selectedTierIndex == 1 ? 'Monthly Pro Pass' : 'Yearly VIP Pass');
      final trialDays = _selectedTierIndex == 0 ? _trialDays : 0;

      // Call SubscriptionService (handles both real Play Billing via RevenueCat and fallback simulation)
      final success = await SubscriptionService.instance.purchaseTier(
        tierIndex: _selectedTierIndex,
        trialDays: trialDays,
      );

      if (!mounted) return;
      setState(() => _isProcessing = false);

      if (!success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Could not complete purchase. Please try again.'),
            backgroundColor: Color(0xFFEF4444),
            behavior: SnackBarBehavior.floating,
          ),
        );
        return;
      }

      // Show celebratory dialog
      await showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) {
          return AlertDialog(
            backgroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 12),
                Container(
                  width: 64,
                  height: 64,
                  decoration: const BoxDecoration(
                    color: Color(0xFFDCFCE7),
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Text('🎉', style: TextStyle(fontSize: 32)),
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Welcome to Pro!',
                  style: TextStyle(
                    color: Color(0xFF0F172A),
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  _selectedTierIndex == 0
                      ? 'Your $_trialDays-day free trial has been activated! Enjoy unlimited AI conversations.'
                      : 'Your $tierName is now active! All conversation topics & coaches are unlocked.',
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => Navigator.of(ctx).pop(),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF4F46E5),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      padding: const EdgeInsets.symmetric(vertical: 13),
                    ),
                    child: const Text('Let\'s Start Speaking', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          );
        },
      );

      if (!mounted) return;
      Navigator.of(context).pop(true);
    } catch (e) {
      if (!mounted) return;
      setState(() => _isProcessing = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error activating plan: $e'),
          backgroundColor: const Color(0xFFEF4444),
        ),
      );
    }
  }
}

