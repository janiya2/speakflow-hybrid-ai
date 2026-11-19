import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/topic.dart';
import '../models/coach_persona.dart';
import '../models/target.dart';
import '../models/package.dart';
import 'live_call_screen.dart';
import 'login_screen.dart';
import 'welcome_screen.dart';
import 'paywall_screen.dart';
import 'notifications_screen.dart';
import '../services/notification_service.dart';
import '../services/subscription_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentTabIndex = 0;
  String _selectedLanguage = 'All';
  String _selectedCategory = 'All';
  String _selectedLevel = 'All';
  String _searchQuery = '';
  int _selectedPlanFilterIndex = 0; // 0: All Plans, 1: Top-Up Packs, 2: Monthly Passes

  String? _userTargetLanguage = 'English';
  String _selectedCoachId = 'sarah';
  CoachPersona get _selectedCoach => CoachPersona.findById(_selectedCoachId);
  bool _isLoadingUserData = true;

  final TextEditingController _customTopicController = TextEditingController();
  String _customTopicLanguage = 'English';
  String _customTopicLevel = 'Intermediate';

  static const List<Map<String, String>> supportedLanguagesList = [
    {
      'name': 'English',
      'flag': '🇺🇸',
      'flagAsset': 'assets/images/flag_us.png',
      'native': 'English',
      'desc': 'Global Business & Conversational Fluency',
    },
    {
      'name': 'Japanese',
      'flag': '🇯🇵',
      'flagAsset': 'assets/images/flag_jp.png',
      'native': '日本語',
      'desc': 'JLPT & Daily Tokyo Life Conversations',
    },
    {
      'name': 'Spanish',
      'flag': '🇪🇸',
      'flagAsset': 'assets/images/flag_es.png',
      'native': 'Español',
      'desc': 'Spain & Latin America Conversations',
    },
    {
      'name': 'Korean',
      'flag': '🇰🇷',
      'flagAsset': 'assets/images/flag_kr.png',
      'native': '한국어',
      'desc': 'K-Culture, K-Drama & Daily Life',
    },
    {
      'name': 'Arabic',
      'flag': '🇸🇦',
      'flagAsset': 'assets/images/flag_sa.png',
      'native': 'العربية',
      'desc': 'Modern Standard & Spoken Arabic',
    },
    {
      'name': 'Tamil',
      'flag': '🇱🇰',
      'flagAsset': 'assets/images/flag_lk.png',
      'native': 'தமிழ்',
      'desc': 'Daily Conversations & Regional Fluency',
    },
  ];

  Timer? _notificationCheckTimer;
  bool _isNotificationPromptShowing = false;

  @override
  void initState() {
    super.initState();
    _loadUserLanguagePreference();

    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      NotificationService.instance.saveTokenForUser(user.uid);
    }

    _setupNotificationTimer();
  }

  void _setupNotificationTimer() {
    if (kIsWeb) return;
    // 1. Initial check after 2 seconds
    Future.delayed(const Duration(seconds: 2), () async {
      if (!mounted) return;
      final isGranted = await NotificationService.instance.checkPermissionGranted();
      if (!isGranted) {
        // Trigger system dialog
        final granted = await NotificationService.instance.requestNotificationPermission();
        if (granted) return; // If user granted, stop!
      }
    });

    // 2. Periodic check every 5 minutes (ONLY if not granted!)
    _notificationCheckTimer = Timer.periodic(const Duration(minutes: 5), (timer) async {
      if (!mounted) return;
      final isGranted = await NotificationService.instance.checkPermissionGranted();
      if (isGranted) {
        // PERMISSION IS GRANTED: STOP checking forever!
        timer.cancel();
        return;
      }

      // If NOT granted, politely remind user
      if (!_isNotificationPromptShowing && mounted) {
        _showNotificationReminderDialog();
      }
    });
  }

  void _showNotificationReminderDialog() {
    _isNotificationPromptShowing = true;
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isDismissible: true,
      builder: (ctx) {
        return Container(
          decoration: const BoxDecoration(
            color: Color(0xFF1E293B),
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          padding: const EdgeInsets.fromLTRB(24, 18, 24, 28),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              const SizedBox(height: 18),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF6366F1).withOpacity(0.15),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.notifications_active_rounded, color: Color(0xFF818CF8), size: 36),
              ),
              const SizedBox(height: 14),
              const Text(
                'Keep Your Speaking Streak Alive! 🔥',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                'Enable push notifications so Elena can remind you when it\'s practice time, send speaking fluency tips, and alert you on special Pro offers.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 12.5, height: 1.4),
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                height: 46,
                child: ElevatedButton(
                  onPressed: () async {
                    Navigator.pop(ctx);
                    final granted = await NotificationService.instance.requestNotificationPermission();
                    if (granted) {
                      _notificationCheckTimer?.cancel();
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF6366F1),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Allow Notifications', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                ),
              ),
              const SizedBox(height: 10),
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: Text('Maybe Later', style: TextStyle(color: Colors.white.withOpacity(0.45), fontSize: 12)),
              ),
            ],
          ),
        );
      },
    ).then((_) {
      _isNotificationPromptShowing = false;
    });
  }

  @override
  void dispose() {
    _notificationCheckTimer?.cancel();
    _customTopicController.dispose();
    super.dispose();
  }

  bool _hasCheckedPaywallPrompt = false;

  void _checkAndPromptPaywall(Map<String, dynamic>? data) {
    if (_hasCheckedPaywallPrompt) return;
    _hasCheckedPaywallPrompt = true;
    final isVip = data?['isVipMonthly'] == true;
    if (!isVip) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        Future.delayed(const Duration(milliseconds: 900), () {
          if (mounted) {
            PaywallScreen.show(context, isDismissible: true);
          }
        });
      });
    }
  }

  Future<void> _loadUserLanguagePreference() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      try {
        final doc = await FirebaseFirestore.instance.collection('lang_users').doc(user.uid).get();
        if (doc.exists) {
          final data = doc.data()!;
          final savedLang = data['targetLanguage'] as String?;
          final savedCoach = data['preferredCoach'] as String?;
          if (mounted) {
            setState(() {
              if (savedLang != null && savedLang.isNotEmpty) {
                _userTargetLanguage = savedLang;
                _selectedLanguage = savedLang;
                _customTopicLanguage = savedLang;
              }
              if (savedCoach != null && savedCoach.isNotEmpty) {
                _selectedCoachId = savedCoach;
              }
              _isLoadingUserData = false;
            });
            _checkAndPromptPaywall(data);
          }
          return;
        }
      } catch (e) {
        debugPrint('Error loading user language: $e');
      }
    }

    if (mounted) {
      setState(() => _isLoadingUserData = false);
    }
  }

  Future<void> _savePreferredCoach(String coachId) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      try {
        await FirebaseFirestore.instance.collection('lang_users').doc(user.uid).set(
          {'preferredCoach': coachId},
          SetOptions(merge: true),
        );
      } catch (e) {
        debugPrint('Error saving preferred coach: $e');
      }
    }
  }

  String _getLanguageFlag(String lang) {
    for (final l in supportedLanguagesList) {
      if (l['name']?.toLowerCase() == lang.toLowerCase()) {
        return l['flag']!;
      }
    }
    return '🌐';
  }

  String _getLanguageFlagAsset(String lang) {
    for (final l in supportedLanguagesList) {
      if (l['name']?.toLowerCase() == lang.toLowerCase()) {
        return l['flagAsset'] ?? 'assets/images/flag_us.png';
      }
    }
    return 'assets/images/flag_us.png';
  }

  Widget _buildFlagBadge(String lang, {double width = 36, double height = 24, double radius = 6}) {
    final asset = _getLanguageFlagAsset(lang);
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(radius),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.35),
            blurRadius: 4,
            offset: const Offset(0, 1.5),
          ),
        ],
        border: Border.all(color: Colors.white.withOpacity(0.2), width: 0.8),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(radius > 1 ? radius - 0.8 : radius),
        child: Image.asset(
          asset,
          width: width,
          height: height,
          fit: BoxFit.cover,
          errorBuilder: (ctx, err, stack) => Center(
            child: Text(
              _getLanguageFlag(lang),
              style: TextStyle(fontSize: height * 0.7),
            ),
          ),
        ),
      ),
    );
  }

  // Language Setup & Selection Modal
  void _showLanguageSetupModal(BuildContext context, {bool isMandatory = false}) {
    showModalBottomSheet(
      context: context,
      isDismissible: true,
      enableDrag: true,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E293B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (modalCtx, setModalState) {
            return Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      width: 44,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.white24,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Choose Practice Language',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            'ඔබ පුහුණු වීමට බලාපොරොත්තු වන භාෂාව තෝරන්න:',
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.6),
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                      if (!isMandatory)
                        IconButton(
                          onPressed: () => Navigator.pop(modalCtx),
                          icon: const Icon(Icons.close, color: Colors.white60),
                        ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // 6 Supported Language Cards
                  Column(
                    children: supportedLanguagesList.map((lang) {
                      final isSelected = _userTargetLanguage == lang['name'];

                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: InkWell(
                          onTap: () {
                            final chosenLang = lang['name']!;

                            // 1. First pop the modal cleanly before state mutation
                            if (Navigator.of(modalCtx).canPop()) {
                              Navigator.of(modalCtx).pop();
                            }

                            // 2. Safely defer state updates & snackbar to next frame to avoid Navigator rebuild collisions
                            WidgetsBinding.instance.addPostFrameCallback((_) {
                              if (!mounted) return;
                              setState(() {
                                _userTargetLanguage = chosenLang;
                                _selectedLanguage = chosenLang;
                                _customTopicLanguage = chosenLang;
                              });

                              ScaffoldMessenger.of(context).hideCurrentSnackBar();
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Target practice language set to $chosenLang!'),
                                  backgroundColor: const Color(0xFF10B981),
                                  behavior: SnackBarBehavior.floating,
                                  duration: const Duration(seconds: 2),
                                ),
                              );
                            });

                            // 3. Save to Firestore lang_users in background
                            final user = FirebaseAuth.instance.currentUser;
                            if (user != null) {
                              FirebaseFirestore.instance
                                  .collection('lang_users')
                                  .doc(user.uid)
                                  .set({'targetLanguage': chosenLang}, SetOptions(merge: true))
                                  .catchError((e) => debugPrint('Error saving language: $e'));
                            }
                          },
                          borderRadius: BorderRadius.circular(16),
                          child: Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0xFF6366F1).withOpacity(0.18)
                                  : const Color(0xFF0F172A),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isSelected
                                    ? const Color(0xFF6366F1)
                                    : Colors.white.withOpacity(0.08),
                                width: isSelected ? 1.5 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                _buildFlagBadge(lang['name']!, width: 44, height: 30, radius: 7),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Text(
                                            lang['name']!,
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 14,
                                            ),
                                          ),
                                          const SizedBox(width: 8),
                                          Text(
                                            '(${lang['native']})',
                                            style: TextStyle(
                                              color: const Color(0xFF818CF8),
                                              fontWeight: FontWeight.w600,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 2),
                                      Text(
                                        lang['desc']!,
                                        style: TextStyle(
                                          color: Colors.white.withOpacity(0.45),
                                          fontSize: 10,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                if (isSelected)
                                  Container(
                                    width: 22,
                                    height: 22,
                                    decoration: const BoxDecoration(
                                      color: Color(0xFF10B981),
                                      shape: BoxShape.circle,
                                    ),
                                    child: const Center(
                                      child: Text('✓', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                                    ),
                                  )
                                else
                                  Text('›', style: TextStyle(color: Colors.white38, fontSize: 24, fontWeight: FontWeight.w300, height: 1)),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  // Duration Picker Modal before entering live call
  void _promptCallDuration(BuildContext context, TopicModel topic) {
    // Check if user is logged in
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('කරුණාකර ඇමතුම් ගැනීමට පෙර Log in හෝ Sign up වන්න! (Please log in to start speaking practice!)'),
          backgroundColor: Color(0xFFEF4444),
          behavior: SnackBarBehavior.floating,
        ),
      );
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const WelcomeScreen()),
        (route) => false,
      );
      return;
    }

    // If language is not configured yet, prevent call and prompt language selection
    if (_userTargetLanguage == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('කරුණාකර ඇමතුම් ගැනීමට පෙර ඔබට පුහුණු වීමට අවශ්‍ය භාෂාව තෝරන්න! (Please set your target language first!)'),
          backgroundColor: Color(0xFFEF4444),
          behavior: SnackBarBehavior.floating,
        ),
      );
      _showLanguageSetupModal(context, isMandatory: true);
      return;
    }

    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1E293B),
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (modalCtx, setModalState) {
            return Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      margin: const EdgeInsets.only(bottom: 16),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  Row(
                    children: [
                      Container(
                        width: 46,
                        height: 46,
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: Colors.white10),
                        ),
                        child: Center(
                          child: Text(topic.icon, style: const TextStyle(fontSize: 24)),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              topic.title,
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${_getLanguageFlag(topic.language)} ${topic.language} • ${topic.level} • ${topic.category}',
                              style: TextStyle(
                                color: Colors.white.withOpacity(0.6),
                                fontSize: 11,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),

                  // 1. Choose Coach Section (Male & Female List with Pictures & Names - Zero overflow)
                  Row(
                    children: [
                      const Icon(Icons.auto_awesome, color: Color(0xFFF59E0B), size: 15),
                      const SizedBox(width: 6),
                      const Expanded(
                        child: Text(
                          'Choose Voice Coach (AI පුහුණුකරු):',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 12.5,
                            fontWeight: FontWeight.bold,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3.5),
                        decoration: BoxDecoration(
                          color: _selectedCoach.primaryAccent.withOpacity(0.16),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: _selectedCoach.primaryAccent.withOpacity(0.45),
                          ),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              Icons.check_circle_rounded,
                              color: _selectedCoach.primaryAccent,
                              size: 11,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              'Coach ${_selectedCoach.name}',
                              style: TextStyle(
                                color: _selectedCoach.primaryAccent,
                                fontSize: 10.5,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // 6 Balanced, Spacious AI Coach Cards (Female & Male) with Horizontal Scrolling
                  SizedBox(
                    height: 182,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      physics: const BouncingScrollPhysics(),
                      itemCount: CoachPersona.presetCoaches.length,
                      separatorBuilder: (_, __) => const SizedBox(width: 8),
                      itemBuilder: (context, index) {
                        final coach = CoachPersona.presetCoaches[index];
                        final isSel = coach.id == _selectedCoachId;

                        return Container(
                          width: 112,
                          child: InkWell(
                            onTap: () {
                              setModalState(() => _selectedCoachId = coach.id);
                              setState(() => _selectedCoachId = coach.id);
                              _savePreferredCoach(coach.id);
                            },
                            borderRadius: BorderRadius.circular(18),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 6),
                              decoration: BoxDecoration(
                                gradient: isSel
                                    ? LinearGradient(
                                        begin: Alignment.topCenter,
                                        end: Alignment.bottomCenter,
                                        colors: [
                                          coach.primaryAccent.withOpacity(0.24),
                                          const Color(0xFF0F172A),
                                        ],
                                      )
                                    : null,
                                color: isSel ? null : const Color(0xFF0F172A),
                                borderRadius: BorderRadius.circular(18),
                                border: Border.all(
                                  color: isSel ? coach.primaryAccent : Colors.white12,
                                  width: isSel ? 2 : 1,
                                ),
                                boxShadow: isSel
                                    ? [
                                        BoxShadow(
                                          color: coach.primaryAccent.withOpacity(0.35),
                                          blurRadius: 12,
                                          spreadRadius: 0,
                                          offset: const Offset(0, 3),
                                        ),
                                      ]
                                    : null,
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  // Top active badge
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: isSel ? coach.primaryAccent : Colors.white.withOpacity(0.06),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: isSel
                                        ? const Text(
                                            '✓ ACTIVE',
                                            style: TextStyle(
                                              color: Colors.black,
                                              fontSize: 8.5,
                                              fontWeight: FontWeight.w900,
                                              letterSpacing: 0.3,
                                            ),
                                          )
                                        : Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              ClipRRect(
                                                borderRadius: BorderRadius.circular(2),
                                                child: Image.asset(
                                                  coach.flagAsset,
                                                  width: 12,
                                                  height: 8,
                                                  fit: BoxFit.cover,
                                                  errorBuilder: (_, __, ___) => Text(coach.flag, style: const TextStyle(fontSize: 8)),
                                                ),
                                              ),
                                              const SizedBox(width: 4),
                                              Text(
                                                coach.name,
                                                style: const TextStyle(
                                                  color: Colors.white60,
                                                  fontSize: 8.5,
                                                  fontWeight: FontWeight.w900,
                                                  letterSpacing: 0.3,
                                                ),
                                              ),
                                            ],
                                          ),
                                  ),
                                  const SizedBox(height: 8),

                                  // Avatar with glowing ring & multi-tier bulletproof image loader
                                  Stack(
                                    alignment: Alignment.center,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(2.5),
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          border: Border.all(
                                            color: isSel ? coach.primaryAccent : Colors.white24,
                                            width: isSel ? 2 : 1,
                                          ),
                                        ),
                                        child: coach.buildAvatar(radius: 25),
                                      ),
                                      Positioned(
                                        bottom: 0,
                                        right: 0,
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1.5),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFF059669),
                                            borderRadius: BorderRadius.circular(6),
                                            border: Border.all(color: Colors.black, width: 1),
                                          ),
                                          child: const Text(
                                            'LIVE',
                                            style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 7.5,
                                              fontWeight: FontWeight.w900,
                                              letterSpacing: 0.4,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 7),

                                  // Coach Name + Gender Icon
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        coach.name,
                                        style: TextStyle(
                                          color: isSel ? Colors.white : Colors.white70,
                                          fontSize: 12.5,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      const SizedBox(width: 3),
                                      Text(
                                        coach.isFemale ? '👩' : '👨',
                                        style: const TextStyle(fontSize: 10),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 2),

                                  // Accent Badge
                                  Text(
                                    coach.shortAccent,
                                    style: TextStyle(
                                      color: isSel ? coach.primaryAccent : Colors.white54,
                                      fontSize: 9.5,
                                      fontWeight: isSel ? FontWeight.w700 : FontWeight.w500,
                                    ),
                                  ),
                                  const SizedBox(height: 2),

                                  // Tone Tag
                                  Text(
                                    coach.shortTone,
                                    textAlign: TextAlign.center,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.4),
                                      fontSize: 8.5,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  // Dynamic Coach Spotlight Banner below the 3 cards
                  Container(
                    margin: const EdgeInsets.only(top: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
                    decoration: BoxDecoration(
                      color: _selectedCoach.primaryAccent.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: _selectedCoach.primaryAccent.withOpacity(0.28),
                        width: 1,
                      ),
                    ),
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(7),
                          decoration: BoxDecoration(
                            color: _selectedCoach.primaryAccent.withOpacity(0.18),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.videocam_rounded,
                            color: _selectedCoach.primaryAccent,
                            size: 16,
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    'Coach ${_selectedCoach.name}',
                                    style: TextStyle(
                                      color: _selectedCoach.primaryAccent,
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(width: 6),
                                  Expanded(
                                    child: Text(
                                      '• ${_selectedCoach.accent}',
                                      style: TextStyle(
                                        color: Colors.white.withOpacity(0.65),
                                        fontSize: 10,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              Text(
                                _selectedCoach.tagline,
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.85),
                                  fontSize: 10.5,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFF10B981).withOpacity(0.18),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.fiber_manual_record, color: Color(0xFF10B981), size: 7),
                              SizedBox(width: 3),
                              Text(
                                '60 FPS HD',
                                style: TextStyle(
                                  color: Color(0xFF34D399),
                                  fontSize: 9.5,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 18),

                  // 2. Select Duration Section
                  Row(
                    children: [
                      const Icon(Icons.timer_outlined, color: Color(0xFF818CF8), size: 15),
                      const SizedBox(width: 6),
                      const Text(
                        'Select Call Duration (කතා කරන කාලය තෝරන්න):',
                        style: TextStyle(
                          color: Colors.white70,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(child: _buildDurationOption(ctx, topic, 3, "3 Min", "Quick Drill", icon: '⚡')),
                      const SizedBox(width: 6),
                      Expanded(child: _buildDurationOption(ctx, topic, 5, "5 Min", "Balanced", isPopular: true, icon: '⭐')),
                      const SizedBox(width: 6),
                      Expanded(child: _buildDurationOption(ctx, topic, 15, "15 Min", "Deep Fluency", icon: '🎯')),
                      const SizedBox(width: 6),
                      Expanded(child: _buildDurationOption(ctx, topic, 30, "30 Min", "Max Session", icon: '🛡️')),
                    ],
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildDurationOption(
    BuildContext ctx,
    TopicModel topic,
    int? mins,
    String title,
    String sub, {
    bool isPopular = false,
    String icon = '⏱️',
  }) {
    return InkWell(
      onTap: () {
        final user = FirebaseAuth.instance.currentUser;
        if (user == null) {
          if (Navigator.of(ctx).canPop()) {
            Navigator.of(ctx).pop();
          }
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (_) => const WelcomeScreen()),
            (route) => false,
          );
          return;
        }

        if (Navigator.of(ctx).canPop()) {
          Navigator.of(ctx).pop();
        }
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted) return;
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => LiveCallScreen(
                topic: topic,
                durationMinutes: mins,
                coach: _selectedCoach,
              ),
            ),
          );
        });
      },
      borderRadius: BorderRadius.circular(16),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
        decoration: BoxDecoration(
          gradient: isPopular
              ? LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    const Color(0xFF6366F1).withOpacity(0.28),
                    const Color(0xFF0F172A),
                  ],
                )
              : null,
          color: isPopular ? null : const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isPopular ? const Color(0xFF818CF8) : const Color(0xFF334155),
            width: isPopular ? 1.8 : 1,
          ),
          boxShadow: isPopular
              ? [
                  BoxShadow(
                    color: const Color(0xFF6366F1).withOpacity(0.3),
                    blurRadius: 10,
                    spreadRadius: 0,
                    offset: const Offset(0, 2),
                  ),
                ]
              : null,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isPopular)
              Container(
                margin: const EdgeInsets.only(bottom: 3),
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                decoration: BoxDecoration(
                  color: const Color(0xFF6366F1),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text(
                  '★ BEST',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 7.5,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.3,
                  ),
                ),
              )
            else
              Padding(
                padding: const EdgeInsets.only(bottom: 2),
                child: Text(icon, style: const TextStyle(fontSize: 11)),
              ),
            Text(
              title,
              style: TextStyle(
                color: isPopular ? Colors.white : Colors.white.withOpacity(0.9),
                fontWeight: FontWeight.bold,
                fontSize: 13,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              sub,
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: isPopular ? const Color(0xFFA5B4FC) : Colors.white.withOpacity(0.45),
                fontSize: 8.5,
                fontWeight: isPopular ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Launch a custom topic entered by the user
  void _startCustomTopicCall() {
    if (_userTargetLanguage == null) {
      _showLanguageSetupModal(context, isMandatory: true);
      return;
    }

    final topicText = _customTopicController.text.trim();
    if (topicText.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter a topic to talk about! (e.g. Cricket, My Favorite Movie)'),
          backgroundColor: Color(0xFFEF4444),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    final customTopic = TopicModel(
      id: 'custom_${DateTime.now().millisecondsSinceEpoch}',
      title: topicText,
      language: _customTopicLanguage,
      level: _customTopicLevel,
      category: 'Custom Topic',
      subCategory: topicText,
      icon: '✨',
      scenario: 'You are having a spontaneous, natural spoken conversation about: "$topicText" in $_customTopicLanguage.',
      starterPrompt: 'Hello! I am excited to talk with you about "$topicText". To get us started, what are your thoughts on this?',
      starterQuestions: [
        'What made you interested in "$topicText"?',
        'Can you share an interesting experience related to this?',
      ],
      isActive: true,
    );

    _promptCallDuration(context, customTopic);
  }

  List<TopicModel> _getAllCombinedTopics(List<TopicModel> firestoreTopics) {
    final Map<String, TopicModel> map = {};
    for (final t in presetTopicCatalog) {
      map[t.id] = t;
    }
    for (final t in firestoreTopics) {
      map[t.id] = t;
    }
    return map.values.toList();
  }

  List<TopicModel> _filterTopics(List<TopicModel> all) {
    final activeLanguage = _userTargetLanguage ?? 'English';
    return all.where((t) {
      if (activeLanguage.isNotEmpty && t.language.toLowerCase() != activeLanguage.toLowerCase()) {
        return false;
      }
      if (_selectedCategory != 'All' && t.category.toLowerCase() != _selectedCategory.toLowerCase()) {
        return false;
      }
      if (_selectedLevel != 'All' && t.level.toLowerCase() != _selectedLevel.toLowerCase()) {
        return false;
      }
      if (_searchQuery.isNotEmpty) {
        final q = _searchQuery.toLowerCase();
        final match = t.title.toLowerCase().contains(q) ||
            t.scenario.toLowerCase().contains(q) ||
            t.category.toLowerCase().contains(q) ||
            t.subCategory.toLowerCase().contains(q);
        if (!match) return false;
      }
      return true;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    // Wrap in PopScope so browser back or hardware back doesn't pop HomeScreen or log out!
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) return;
        if (_currentTabIndex != 0) {
          setState(() => _currentTabIndex = 0);
        }
      },
      child: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance.collection('lang_topics').snapshots(),
        builder: (context, snapshot) {
          List<TopicModel> firestoreTopics = [];
          if (snapshot.hasData && snapshot.data!.docs.isNotEmpty) {
            firestoreTopics = snapshot.data!.docs
                .map((d) => TopicModel.fromFirestore(d.data() as Map<String, dynamic>, d.id))
                .toList();
          }

          final allTopics = _getAllCombinedTopics(firestoreTopics);
          final filteredTopics = _filterTopics(allTopics);

          return Scaffold(
            backgroundColor: const Color(0xFF0F172A),
            body: SafeArea(
              child: _buildActiveTabContent(allTopics, filteredTopics),
            ),
            bottomNavigationBar: _buildBottomNavigationBar(),
          );
        },
      ),
    );
  }

  Widget _buildActiveTabContent(List<TopicModel> allTopics, List<TopicModel> filteredTopics) {
    switch (_currentTabIndex) {
      case 0:
        return _buildHomeTab(allTopics);
      case 1:
        return _buildConversationsTab(filteredTopics);
      case 2:
        return _buildTargetsAndWinnersTab();
      case 3:
        return _buildPackagesAndStoreTab();
      case 4:
        return _buildProfileTab();
      default:
        return _buildHomeTab(allTopics);
    }
  }

  // -------------------------------------------------------------
  // BOTTOM NAVIGATION BAR (5 DEDICATED TABS)
  // -------------------------------------------------------------
  Widget _buildBottomNavigationBar() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        border: Border(top: BorderSide(color: Colors.white.withOpacity(0.08))),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.4),
            blurRadius: 15,
            offset: const Offset(0, -3),
          ),
        ],
      ),
      child: BottomNavigationBar(
        currentIndex: _currentTabIndex,
        onTap: (index) => setState(() => _currentTabIndex = index),
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.transparent,
        elevation: 0,
        selectedItemColor: const Color(0xFF818CF8),
        unselectedItemColor: Colors.white.withOpacity(0.45),
        selectedFontSize: 11,
        unselectedFontSize: 10,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home_filled),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.phone_in_talk_outlined),
            activeIcon: Icon(Icons.phone_in_talk),
            label: 'Calls',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.emoji_events_outlined),
            activeIcon: Icon(Icons.emoji_events),
            label: 'Targets',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.schedule_outlined),
            activeIcon: Icon(Icons.schedule),
            label: 'Plans',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 0: HOME TAB (AI COACH DASHBOARD)
  // -------------------------------------------------------------
  Widget _buildHomeTab(List<TopicModel> allTopics) {
    // Pick topics matching the user's active language
    final langTopics = allTopics.where((t) {
      if (_userTargetLanguage == null || _userTargetLanguage!.isEmpty) return true;
      return t.language.toLowerCase() == _userTargetLanguage!.toLowerCase();
    }).toList();

    // Show 20 diverse, engaging scenarios for scrolling!
    final List<TopicModel> displayTopics = List.from(langTopics);
    for (final t in allTopics) {
      if (displayTopics.length >= 20) break;
      if (!displayTopics.any((dt) => dt.id == t.id)) {
        displayTopics.add(t);
      }
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Header Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 16, 18, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 38,
                      height: 38,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(11),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFF6366F1).withOpacity(0.4),
                            blurRadius: 12,
                            offset: const Offset(0, 3),
                          ),
                        ],
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(11),
                        child: Image.asset(
                          'assets/images/app_logo.png',
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'SpeakFlow AI',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            letterSpacing: -0.3,
                          ),
                        ),
                        Row(
                          children: [
                            Container(
                              width: 7,
                              height: 7,
                              decoration: const BoxDecoration(
                                color: Color(0xFF10B981),
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 5),
                            Text(
                              'Voice Coach Online',
                              style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 11),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),

                Row(
                  children: [
                    // Active Language Switcher Chip
                    InkWell(
                      onTap: () => _showLanguageSetupModal(context, isMandatory: false),
                      borderRadius: BorderRadius.circular(20),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: const Color(0xFF6366F1).withOpacity(0.18),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.4)),
                        ),
                        child: Row(
                          children: [
                            _buildFlagBadge(_userTargetLanguage ?? 'English', width: 20, height: 14, radius: 3),
                            const SizedBox(width: 6),
                            Text(
                              _userTargetLanguage ?? 'Set Lang',
                              style: const TextStyle(
                                color: Color(0xFF818CF8),
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(width: 3),
                            const Text('▼', style: TextStyle(color: Color(0xFF818CF8), fontSize: 9)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),

                    // Notification Bell Icon with Badge
                    StreamBuilder<QuerySnapshot>(
                      stream: FirebaseFirestore.instance.collection('lang_notifications').limit(10).snapshots(),
                      builder: (context, notifSnap) {
                        final count = notifSnap.data?.docs.length ?? 0;
                        return InkWell(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (_) => const NotificationsScreen()),
                            );
                          },
                          borderRadius: BorderRadius.circular(20),
                          child: Container(
                            padding: const EdgeInsets.all(7),
                            decoration: BoxDecoration(
                              color: const Color(0xFF1E293B),
                              shape: BoxShape.circle,
                              border: Border.all(color: Colors.white.withOpacity(0.12)),
                            ),
                            child: Stack(
                              clipBehavior: Clip.none,
                              children: [
                                const Icon(Icons.notifications_outlined, color: Colors.white, size: 20),
                                if (count > 0)
                                  Positioned(
                                    top: -2,
                                    right: -2,
                                    child: Container(
                                      width: 8,
                                      height: 8,
                                      decoration: const BoxDecoration(
                                        color: Color(0xFFEF4444),
                                        shape: BoxShape.circle,
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),



          // Mandatory Language Setup Banner (if not yet configured)
          if (_userTargetLanguage == null)
            Container(
              margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFFDC2626), Color(0xFF991B1B)],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  const Text('⚠️', style: TextStyle(fontSize: 22)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Language Setup Required',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                        Text(
                          'ඇමතුම් ගැනීමට පෙර ඔබට පුහුණු වීමට අවශ්‍ය භාෂාව තෝරන්න.',
                          style: TextStyle(color: Colors.white70, fontSize: 10),
                        ),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () => _showLanguageSetupModal(context, isMandatory: true),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFFDC2626),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
                    ),
                    child: const Text('Setup'),
                  ),
                ],
              ),
            ),

          // Daily Free Practice Time & Quota Status Pill
          _buildDailyQuotaBanner(),

          // Glowing Quick Call Action Hero Box
          Container(
            margin: const EdgeInsets.fromLTRB(16, 12, 16, 16),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF312E81), Color(0xFF4C1D95), Color(0xFF1E1B4B)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF6366F1).withOpacity(0.25),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
              border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        '⚡ Spoken AI Call (${_userTargetLanguage ?? "Select Lang"})',
                        style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                    ),
                    _buildMiniSoundWave(),
                  ],
                ),
                const SizedBox(height: 12),
                const Text(
                  'Practice Speaking Naturally',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'AI talks proactively, analyzes your accent & grammar live, and gives instant pronunciation drills.',
                  style: TextStyle(color: Colors.white.withOpacity(0.75), fontSize: 12, height: 1.4),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: () {
                          if (_userTargetLanguage == null) {
                            _showLanguageSetupModal(context, isMandatory: true);
                            return;
                          }
                          // Trigger Quick Call in user's target language
                          final pool = allTopics.where((t) => t.language.toLowerCase() == _userTargetLanguage!.toLowerCase()).toList();
                          final randomTopic = pool.isNotEmpty ? (pool..shuffle()).first : allTopics.first;
                          _promptCallDuration(context, randomTopic);
                        },
                        icon: const Icon(Icons.call, size: 18),
                        label: Text('Quick Call (${_userTargetLanguage ?? "Select"})'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          elevation: 4,
                          textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    InkWell(
                      onTap: () => setState(() => _currentTabIndex = 1),
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: const Icon(Icons.format_list_bulleted, color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),



          // User Stats Row
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(child: _buildStatCard('Target Lang', _userTargetLanguage ?? 'None', Icons.translate, const Color(0xFF60A5FA))),
                const SizedBox(width: 8),
                Expanded(child: _buildStatCard('Avg Fluency', '89%', Icons.trending_up, const Color(0xFF34D399))),
                const SizedBox(width: 8),
                Expanded(child: _buildStatCard('Scenarios', '${allTopics.length}+', Icons.menu_book, const Color(0xFFA78BFA))),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Gamified Weekly Targets & Sprint Card on Home
          _buildHomeWeeklyTargetCard(),

          const SizedBox(height: 18),

          // Quick Topic Launcher / Custom Input
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.08)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.edit, color: Color(0xFF818CF8), size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'Speak About Any Custom Topic (${_userTargetLanguage ?? "Select Lang"})',
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'කැමති ඕනෑම දෙයක් (Cricket, Travel, AI...) type කර live voice call එකක් ගන්න:',
                    style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _customTopicController,
                          style: const TextStyle(color: Colors.white, fontSize: 13),
                          decoration: InputDecoration(
                            hintText: 'e.g. Cricket World Cup, Traveling in Spain...',
                            hintStyle: TextStyle(color: Colors.white.withOpacity(0.35), fontSize: 12),
                            filled: true,
                            fillColor: const Color(0xFF0F172A),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: _startCustomTopicCall,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF6366F1),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: const Text('Call', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 22),

          // Categories Horizontal Quick Access
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Explore by Interests',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                ),
                TextButton(
                  onPressed: () => setState(() => _currentTabIndex = 2),
                  child: const Text('View All', style: TextStyle(color: Color(0xFF818CF8), fontSize: 12)),
                ),
              ],
            ),
          ),



          SizedBox(
            height: 108,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              children: [
                _buildCategoryPill('🏏 Sports', 'Sports', 'Cricket, Football...'),
                _buildCategoryPill('✈️ Travel', 'Travel', 'Hotel, Airport...'),
                _buildCategoryPill('🍕 Food', 'Food', 'Cafe, Restaurant...'),
                _buildCategoryPill('💼 Career', 'Career', 'Interviews, Pitch...'),
                _buildCategoryPill('🎮 Gaming', 'Entertainment', 'Games, Movies...'),
                _buildCategoryPill('🤖 Tech', 'Tech', 'AI, Future, Devices...'),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Featured & Trending Scenarios (20 Topics Scrollable)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.local_fire_department_rounded, color: Color(0xFFF59E0B), size: 20),
                    const SizedBox(width: 6),
                    Text(
                      'Featured & Trending Scenarios (${displayTopics.length})',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                  ],
                ),
                TextButton.icon(
                  onPressed: () {
                    setState(() => _currentTabIndex = 1); // Open Calls Page!
                  },
                  icon: const Icon(Icons.arrow_forward_ios, size: 12, color: Color(0xFF818CF8)),
                  label: const Text(
                    'View All',
                    style: TextStyle(
                      color: Color(0xFF818CF8),
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
          ),


          const SizedBox(height: 4),

          // 20 Scenario Cards List
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: displayTopics.map((topic) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: _buildScenarioCard(topic),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 12),

          // More / Explore All Calls Card
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF312E81), Color(0xFF1E1B4B)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.4)),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF6366F1).withOpacity(0.2),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {
                    setState(() => _currentTabIndex = 1); // Switch to Calls Page!
                  },
                  borderRadius: BorderRadius.circular(20),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 18),
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: const Color(0xFF6366F1).withOpacity(0.35),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.phone_in_talk_rounded, color: Color(0xFFA5B4FC), size: 22),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Explore All 80+ Practice Calls',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                'Browse all languages, search topics & filters',
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.65),
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Icon(Icons.arrow_forward_rounded, color: Color(0xFF818CF8), size: 22),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildMiniSoundWave() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        _waveBar(8, const Color(0xFF34D399)),
        const SizedBox(width: 2.5),
        _waveBar(16, const Color(0xFF10B981)),
        const SizedBox(width: 2.5),
        _waveBar(22, const Color(0xFF34D399)),
        const SizedBox(width: 2.5),
        _waveBar(14, const Color(0xFF6EE7B7)),
        const SizedBox(width: 2.5),
        _waveBar(9, const Color(0xFF34D399)),
      ],
    );
  }

  Widget _waveBar(double height, Color color) {
    return Container(
      width: 3.5,
      height: height,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Column(
        children: [
          if (label == 'Target Lang' && value != 'None')
            _buildFlagBadge(value, width: 28, height: 18, radius: 4)
          else
            Icon(icon, color: color, size: 20),
          const SizedBox(height: 6),
          Text(
            value,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10),
          ),
        ],
      ),
    );
  }

  Map<String, dynamic> _getCategoryStyle(String category) {
    switch (category.toLowerCase()) {
      case 'sports':
        return {
          'icon': Icons.sports_cricket_rounded,
          'color': const Color(0xFF10B981),
          'gradient': const [Color(0xFF064E3B), Color(0xFF0F172A)],
          'tag': 'Hot 🔥',
        };
      case 'travel':
        return {
          'icon': Icons.flight_takeoff_rounded,
          'color': const Color(0xFF0EA5E9),
          'gradient': const [Color(0xFF0C4A6E), Color(0xFF0F172A)],
          'tag': 'Popular ⭐',
        };
      case 'food':
        return {
          'icon': Icons.restaurant_rounded,
          'color': const Color(0xFFF59E0B),
          'gradient': const [Color(0xFF78350F), Color(0xFF0F172A)],
          'tag': 'Yummy 🍕',
        };
      case 'career':
        return {
          'icon': Icons.business_center_rounded,
          'color': const Color(0xFF8B5CF6),
          'gradient': const [Color(0xFF4C1D95), Color(0xFF0F172A)],
          'tag': 'Pro 💼',
        };
      case 'entertainment':
      case 'gaming':
        return {
          'icon': Icons.sports_esports_rounded,
          'color': const Color(0xFFEC4899),
          'gradient': const [Color(0xFF831843), Color(0xFF0F172A)],
          'tag': 'Play 🎮',
        };
      case 'tech':
        return {
          'icon': Icons.smart_toy_rounded,
          'color': const Color(0xFF6366F1),
          'gradient': const [Color(0xFF1E1B4B), Color(0xFF0F172A)],
          'tag': 'AI 🤖',
        };
      case 'daily life':
        return {
          'icon': Icons.coffee_rounded,
          'color': const Color(0xFF14B8A6),
          'gradient': const [Color(0xFF134E4A), Color(0xFF0F172A)],
          'tag': 'Daily ☕',
        };
      case 'social':
        return {
          'icon': Icons.people_rounded,
          'color': const Color(0xFFF43F5E),
          'gradient': const [Color(0xFF881337), Color(0xFF0F172A)],
          'tag': 'Social 👥',
        };
      default:
        return {
          'icon': Icons.forum_rounded,
          'color': const Color(0xFF38BDF8),
          'gradient': const [Color(0xFF1E293B), Color(0xFF0F172A)],
          'tag': 'Live',
        };
    }
  }

  Widget _buildCategoryPill(String title, String category, String sub) {
    final style = _getCategoryStyle(category);
    final Color accent = style['color'] as Color;
    final List<Color> gradient = style['gradient'] as List<Color>;
    final IconData iconData = style['icon'] as IconData;
    final String tag = style['tag'] as String;

    return InkWell(
      onTap: () {
        setState(() {
          _selectedCategory = category;
          _currentTabIndex = 1; // switch to conversations tab
        });
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        width: 148,
        margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 4),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: gradient,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: accent.withOpacity(0.35), width: 1.2),
          boxShadow: [
            BoxShadow(
              color: accent.withOpacity(0.18),
              blurRadius: 10,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: accent.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: accent.withOpacity(0.4), width: 0.8),
                  ),
                  child: Center(
                    child: Icon(iconData, color: accent, size: 18),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: accent.withOpacity(0.18),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    tag,
                    style: TextStyle(color: accent, fontSize: 8.5, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  category,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 13.5,
                    letterSpacing: 0.2,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  sub,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.55),
                    fontSize: 9.5,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 1: CONVERSATIONS / CALLS TAB (DEDICATED CALLING PAGE)
  // -------------------------------------------------------------
  Widget _buildConversationsTab(List<TopicModel> topics) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Header with Target Language Badge & Reset
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text(
                        'Speaking Scenarios',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 20),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFF10B981).withOpacity(0.18),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          '${topics.length} Live',
                          style: const TextStyle(color: Color(0xFF34D399), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 3),
                  Row(
                    children: [
                      _buildFlagBadge(_userTargetLanguage ?? 'English', width: 14, height: 9.5, radius: 2),
                      const SizedBox(width: 5),
                      Text(
                        'Practice in ${_userTargetLanguage ?? "English"} with AI Coach',
                        style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
                      ),
                    ],
                  ),
                ],
              ),
              IconButton(
                onPressed: () {
                  setState(() {
                    _selectedLanguage = _userTargetLanguage ?? 'English';
                    _selectedCategory = 'All';
                    _selectedLevel = 'All';
                    _searchQuery = '';
                  });
                },
                icon: Container(
                  padding: const EdgeInsets.all(7),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white.withOpacity(0.08)),
                  ),
                  child: const Icon(Icons.refresh_rounded, color: Colors.white70, size: 18),
                ),
                tooltip: 'Reset Filters',
              ),
            ],
          ),
        ),

        // Search Bar with Clear Button
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                hintText: 'Search 80+ topics (e.g. cricket, hotel, airport)...',
                hintStyle: TextStyle(color: Colors.white.withOpacity(0.35), fontSize: 12),
                prefixIcon: const Icon(Icons.search_rounded, color: Color(0xFF818CF8), size: 20),
                suffixIcon: _searchQuery.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear_rounded, color: Colors.white54, size: 18),
                        onPressed: () => setState(() => _searchQuery = ''),
                      )
                    : null,
                filled: false,
                contentPadding: const EdgeInsets.symmetric(vertical: 12),
                border: InputBorder.none,
              ),
            ),
          ),
        ),

        // Category Filter Pills with Icons
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          child: Row(
            children: [
              {'name': 'All', 'icon': Icons.auto_awesome_rounded},
              {'name': 'Sports', 'icon': Icons.sports_cricket_rounded},
              {'name': 'Travel', 'icon': Icons.flight_takeoff_rounded},
              {'name': 'Food', 'icon': Icons.restaurant_rounded},
              {'name': 'Career', 'icon': Icons.business_center_rounded},
              {'name': 'Entertainment', 'icon': Icons.sports_esports_rounded},
              {'name': 'Tech', 'icon': Icons.smart_toy_rounded},
              {'name': 'Daily Life', 'icon': Icons.coffee_rounded},
              {'name': 'Social', 'icon': Icons.people_rounded},
            ].map((catItem) {
              final cat = catItem['name'] as String;
              final catIcon = catItem['icon'] as IconData;
              final isSelected = _selectedCategory.toLowerCase() == cat.toLowerCase();
              final style = _getCategoryStyle(cat);
              final Color accent = style['color'] as Color;

              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: InkWell(
                  onTap: () => setState(() => _selectedCategory = cat),
                  borderRadius: BorderRadius.circular(12),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFF10B981) : const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isSelected ? const Color(0xFF10B981) : Colors.white.withOpacity(0.08),
                        width: 1,
                      ),
                      boxShadow: isSelected
                          ? [
                              BoxShadow(
                                color: const Color(0xFF10B981).withOpacity(0.35),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              )
                            ]
                          : null,
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          catIcon,
                          size: 13,
                          color: isSelected ? Colors.white : (cat == 'All' ? const Color(0xFFF59E0B) : accent),
                        ),
                        const SizedBox(width: 5),
                        Text(
                          cat,
                          style: TextStyle(
                            color: isSelected ? Colors.white : Colors.white70,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
                            fontSize: 11.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ),

        const SizedBox(height: 6),

        // List of Scenarios
        Expanded(
          child: topics.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.search_off_rounded, color: Colors.white30, size: 48),
                      const SizedBox(height: 8),
                      const Text('No scenarios found matching your filter.', style: TextStyle(color: Colors.white54)),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            _selectedLanguage = 'All';
                            _selectedCategory = 'All';
                            _searchQuery = '';
                          });
                        },
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF6366F1)),
                        child: const Text('Clear Filters'),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                  itemCount: topics.length,
                  itemBuilder: (context, index) {
                    return _buildScenarioCard(topics[index]);
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildScenarioCard(TopicModel topic) {
    final style = _getCategoryStyle(topic.category);
    final Color accent = style['color'] as Color;
    final IconData catIcon = style['icon'] as IconData;

    // Difficulty level colors
    Color levelColor = const Color(0xFF10B981); // Beginner - emerald
    if (topic.level.toLowerCase().contains('inter')) {
      levelColor = const Color(0xFFF59E0B); // Intermediate - amber
    } else if (topic.level.toLowerCase().contains('adv')) {
      levelColor = const Color(0xFFA855F7); // Advanced - purple
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.08), width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => _promptCallDuration(context, topic),
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // 1. Left Icon Container with Category Gradient
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        accent.withOpacity(0.25),
                        const Color(0xFF0F172A),
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: accent.withOpacity(0.4), width: 1),
                  ),
                  child: Center(
                    child: Text(
                      topic.icon,
                      style: const TextStyle(fontSize: 24),
                    ),
                  ),
                ),
                const SizedBox(width: 12),

                // 2. Middle Content
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        topic.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          letterSpacing: 0.1,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        topic.scenario,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.6),
                          fontSize: 11,
                          height: 1.25,
                        ),
                      ),
                      const SizedBox(height: 8),

                      // Tags Row
                      Wrap(
                        spacing: 6,
                        runSpacing: 4,
                        children: [
                          // Real Country Flag Badge + Language
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                            decoration: BoxDecoration(
                              color: const Color(0xFF6366F1).withOpacity(0.18),
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.35), width: 0.8),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                _buildFlagBadge(topic.language, width: 14, height: 9.5, radius: 2),
                                const SizedBox(width: 4),
                                Text(
                                  topic.language,
                                  style: const TextStyle(
                                    color: Color(0xFFA5B4FC),
                                    fontSize: 9.5,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),

                          // Category Tag with Icon
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                            decoration: BoxDecoration(
                              color: accent.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(color: accent.withOpacity(0.3), width: 0.8),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(catIcon, size: 9.5, color: accent),
                                const SizedBox(width: 3),
                                Text(
                                  topic.category,
                                  style: TextStyle(
                                    color: accent,
                                    fontSize: 9.5,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),

                          // Level Tag with Icon
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                            decoration: BoxDecoration(
                              color: levelColor.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.signal_cellular_alt_rounded, size: 9.5, color: levelColor),
                                const SizedBox(width: 3),
                                Text(
                                  topic.level,
                                  style: TextStyle(
                                    color: levelColor,
                                    fontSize: 9.5,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),

                // 3. Right Action Call Button
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF10B981), Color(0xFF059669)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF10B981).withOpacity(0.4),
                        blurRadius: 10,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  child: const Center(
                    child: Icon(Icons.call_rounded, color: Colors.white, size: 20),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // DAILY QUOTA BANNER & HOME WEEKLY TARGET CARD
  // -------------------------------------------------------------
  Widget _buildDailyQuotaBanner() {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return const SizedBox.shrink();

    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance.collection('lang_settings').doc('time_limits').snapshots(),
      builder: (context, settingsSnap) {
        final settingsData = (settingsSnap.hasData && settingsSnap.data != null && settingsSnap.data!.exists)
            ? (settingsSnap.data!.data() as Map<String, dynamic>?) ?? {}
            : {};
        final int dailyFreeLimit = (settingsData['dailyFreeMinutes'] is num)
            ? (settingsData['dailyFreeMinutes'] as num).toInt()
            : 10;

        return StreamBuilder<DocumentSnapshot>(
          stream: FirebaseFirestore.instance.collection('lang_users').doc(user.uid).snapshots(),
          builder: (context, userSnap) {
            final userData = (userSnap.hasData && userSnap.data != null && userSnap.data!.exists)
                ? (userSnap.data!.data() as Map<String, dynamic>?) ?? {}
                : {};

            final bool isVip = userData['isVipMonthly'] == true;
            final String today = DateTime.now().toIso8601String().substring(0, 10);
            final String? lastDate = userData['lastUsageDate'] as String?;
            final int usedToday = (lastDate == today) ? ((userData['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;
            final int extraMinutes = (userData['extraMinutes'] as num?)?.toInt() ?? 0;
            final int remainingFree = (dailyFreeLimit - usedToday).clamp(0, dailyFreeLimit);
            final double usedPct = (usedToday / dailyFreeLimit).clamp(0.0, 1.0);

            return Container(
              margin: const EdgeInsets.fromLTRB(16, 4, 16, 12),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: isVip
                      ? [const Color(0xFF78350F).withOpacity(0.9), const Color(0xFF1E1B4B)]
                      : [const Color(0xFF1E293B), const Color(0xFF0F172A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(18),
                border: Border.all(
                  color: isVip
                      ? const Color(0xFFF59E0B).withOpacity(0.6)
                      : (remainingFree <= 2 ? const Color(0xFFEF4444).withOpacity(0.5) : const Color(0xFF6366F1).withOpacity(0.35)),
                  width: 1.2,
                ),
                boxShadow: [
                  BoxShadow(
                    color: isVip ? const Color(0xFFF59E0B).withOpacity(0.12) : const Color(0xFF6366F1).withOpacity(0.1),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: isVip ? const Color(0xFFF59E0B).withOpacity(0.2) : const Color(0xFF6366F1).withOpacity(0.2),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          isVip ? Icons.workspace_premium : Icons.timer_outlined,
                          color: isVip ? const Color(0xFFFBBF24) : const Color(0xFF818CF8),
                          size: 18,
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  isVip
                                      ? '👑 VIP Unlimited Speaking Pass'
                                      : 'Free Daily Practice: $remainingFree min left',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 13,
                                  ),
                                ),
                                if (extraMinutes > 0 && !isVip) ...[
                                  const SizedBox(width: 6),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1.5),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF10B981).withOpacity(0.25),
                                      borderRadius: BorderRadius.circular(6),
                                      border: Border.all(color: const Color(0xFF10B981).withOpacity(0.5), width: 0.8),
                                    ),
                                    child: Text(
                                      '+$extraMinutes Extra',
                                      style: const TextStyle(
                                        color: Color(0xFF34D399),
                                        fontSize: 9.5,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              isVip
                                  ? 'Uncapped speaking time • Priority AI Voice Coach active'
                                  : 'Today: $usedToday mins used • $dailyFreeLimit min free daily quota (Resets midnight)',
                              style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 10),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: () {
                          if (isVip) {
                            setState(() => _currentTabIndex = 3);
                          } else {
                            PaywallScreen.show(context);
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isVip ? const Color(0xFFF59E0B) : const Color(0xFF6366F1),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          minimumSize: Size.zero,
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          elevation: 0,
                        ),
                        child: Text(
                          isVip ? 'VIP Active' : '👑 Pro / Top Up',
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  if (!isVip) ...[
                    const SizedBox(height: 10),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: usedPct,
                        backgroundColor: Colors.white12,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          remainingFree <= 2 ? const Color(0xFFEF4444) : const Color(0xFF34D399),
                        ),
                        minHeight: 5,
                      ),
                    ),
                  ],
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildHomeWeeklyTargetCard() {
    final user = FirebaseAuth.instance.currentUser;

    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance
          .collection('lang_targets')
          .where('isActive', isEqualTo: true)
          .limit(1)
          .snapshots(),
      builder: (context, targetSnap) {
        TargetModel target = TargetModel.defaultWeeklyTarget;
        if (targetSnap.hasData && targetSnap.data!.docs.isNotEmpty) {
          final doc = targetSnap.data!.docs.first;
          target = TargetModel.fromFirestore(doc.data() as Map<String, dynamic>, doc.id);
        }

        return StreamBuilder<DocumentSnapshot>(
          stream: user != null
              ? FirebaseFirestore.instance.collection('lang_users').doc(user.uid).snapshots()
              : const Stream.empty(),
          builder: (context, userSnap) {
            final userData = (userSnap.hasData && userSnap.data != null && userSnap.data!.exists)
                ? (userSnap.data!.data() as Map<String, dynamic>?) ?? {}
                : {};

            final String today = DateTime.now().toIso8601String().substring(0, 10);
            final String? lastDate = userData['lastUsageDate'] as String?;
            final int todayMinutes = (lastDate == today) ? ((userData['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;
            final int weeklyMinutes = (userData['weeklyMinutes'] as num?)?.toInt() ?? 0;
            final List<dynamic> activeDates = userData['activeDates'] ?? [];
            final int streak = (userData['streak'] as num?)?.toInt() ?? activeDates.length;

            final double dailyProgress = (todayMinutes / target.dailyMinutesGoal).clamp(0.0, 1.0);
            final double weeklyProgress = (weeklyMinutes / target.weeklyMinutesGoal).clamp(0.0, 1.0);
            final int weeklyPercent = (weeklyProgress * 100).toInt();

            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF1E1B4B), Color(0xFF1E293B), Color(0xFF0F172A)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.35)),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFFF59E0B).withOpacity(0.12),
                      blurRadius: 16,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Header Row
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(7),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF59E0B).withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: const Icon(Icons.emoji_events, color: Color(0xFFFBBF24), size: 18),
                              ),
                              const SizedBox(width: 8),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    target.title,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                    ),
                                  ),
                                  Text(
                                    'Weekly Fluency Sprint • +${target.rewardPoints} XP',
                                    style: TextStyle(
                                      color: const Color(0xFFFBBF24).withOpacity(0.85),
                                      fontSize: 10,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: const Color(0xFF10B981).withOpacity(0.18),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                            ),
                            child: Row(
                              children: [
                                const Text('🔥', style: TextStyle(fontSize: 10)),
                                const SizedBox(width: 3),
                                Text(
                                  '$streak Day Streak',
                                  style: const TextStyle(
                                    color: Color(0xFF34D399),
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Today's Spoken Goal Progress
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Today\'s Goal: $todayMinutes / ${target.dailyMinutesGoal} min',
                            style: const TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w600),
                          ),
                          Text(
                            todayMinutes >= target.dailyMinutesGoal ? 'Done! ⭐' : '${(dailyProgress * 100).toInt()}%',
                            style: TextStyle(
                              color: todayMinutes >= target.dailyMinutesGoal ? const Color(0xFF34D399) : const Color(0xFF818CF8),
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 5),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: LinearProgressIndicator(
                          value: dailyProgress,
                          backgroundColor: Colors.white.withOpacity(0.08),
                          valueColor: AlwaysStoppedAnimation<Color>(
                            todayMinutes >= target.dailyMinutesGoal ? const Color(0xFF10B981) : const Color(0xFF6366F1),
                          ),
                          minHeight: 6,
                        ),
                      ),
                      const SizedBox(height: 10),

                      // Weekly Spoken Minutes Progress
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Weekly Sprint: $weeklyMinutes / ${target.weeklyMinutesGoal} min',
                            style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 10),
                          ),
                          Text(
                            '$weeklyPercent% completed',
                            style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 10),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Action Button: View Weekly Winners Leaderboard
                      InkWell(
                        onTap: () => setState(() => _currentTabIndex = 2), // Switch to Targets & Winners tab!
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.06),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.white.withOpacity(0.1)),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Text('🥇', style: TextStyle(fontSize: 14)),
                              SizedBox(width: 6),
                              Text(
                                'View Weekly Winners & Leaderboard',
                                style: TextStyle(
                                  color: Color(0xFFFBBF24),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 11,
                                ),
                              ),
                              SizedBox(width: 4),
                              Icon(Icons.arrow_forward_ios, color: Color(0xFFFBBF24), size: 10),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  List<Widget> _buildWeekStreakChips(List<dynamic> activeDates) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    final now = DateTime.now();
    final currentDayWeekday = now.weekday; // 1 = Mon, 7 = Sun

    return List.generate(7, (idx) {
      final dayNumber = idx + 1;
      final isPastOrToday = dayNumber <= currentDayWeekday;
      final isActive = activeDates.isNotEmpty && isPastOrToday;
      final isToday = dayNumber == currentDayWeekday;

      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 7),
        decoration: BoxDecoration(
          color: isActive
              ? const Color(0xFF10B981).withOpacity(0.2)
              : (isToday ? const Color(0xFF6366F1).withOpacity(0.2) : const Color(0xFF0F172A)),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: isActive
                ? const Color(0xFF10B981)
                : (isToday ? const Color(0xFF818CF8) : Colors.white10),
            width: isToday ? 1.5 : 1,
          ),
        ),
        child: Column(
          children: [
            Text(
              days[idx],
              style: TextStyle(
                color: isToday ? Colors.white : Colors.white60,
                fontSize: 10,
                fontWeight: isToday ? FontWeight.bold : FontWeight.normal,
              ),
            ),
            const SizedBox(height: 3),
            Icon(
              isActive ? Icons.check_circle : (isToday ? Icons.radio_button_checked : Icons.radio_button_unchecked),
              color: isActive ? const Color(0xFF34D399) : (isToday ? const Color(0xFF818CF8) : Colors.white24),
              size: 13,
            ),
          ],
        ),
      );
    });
  }

  // -------------------------------------------------------------
  // TAB 2: WEEKLY TARGETS & WINNERS LEADERBOARD
  // -------------------------------------------------------------
  Widget _buildTargetsAndWinnersTab() {
    final user = FirebaseAuth.instance.currentUser;

    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance.collection('lang_targets').where('isActive', isEqualTo: true).snapshots(),
      builder: (context, targetSnap) {
        TargetModel activeTarget = TargetModel.defaultWeeklyTarget;
        if (targetSnap.hasData && targetSnap.data!.docs.isNotEmpty) {
          final doc = targetSnap.data!.docs.first;
          activeTarget = TargetModel.fromFirestore(doc.data() as Map<String, dynamic>, doc.id);
        }

        return StreamBuilder<DocumentSnapshot>(
          stream: user != null
              ? FirebaseFirestore.instance.collection('lang_users').doc(user.uid).snapshots()
              : const Stream.empty(),
          builder: (context, userSnap) {
            final userData = (userSnap.hasData && userSnap.data != null && userSnap.data!.exists)
                ? (userSnap.data!.data() as Map<String, dynamic>?) ?? {}
                : {};

            final String today = DateTime.now().toIso8601String().substring(0, 10);
            final String? lastDate = userData['lastUsageDate'] as String?;
            final int todayMins = (lastDate == today) ? ((userData['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;
            final int weeklyMins = (userData['weeklyMinutes'] as num?)?.toInt() ?? 0;
            final List<dynamic> activeDates = userData['activeDates'] ?? [];

            final double dailyPct = (todayMins / activeTarget.dailyMinutesGoal).clamp(0.0, 1.0);
            final double weeklyPct = (weeklyMins / activeTarget.weeklyMinutesGoal).clamp(0.0, 1.0);

            return SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 28),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Page Header
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF59E0B).withOpacity(0.18),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Icon(Icons.emoji_events, color: Color(0xFFFBBF24), size: 24),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Weekly Targets & Winners',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                          ),
                          Text(
                            'Practice speaking daily, earn XP & reach the podium!',
                            style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Active Challenge Card
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF312E81), Color(0xFF1E1B4B)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(22),
                      border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.4)),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF59E0B).withOpacity(0.15),
                          blurRadius: 18,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF59E0B).withOpacity(0.2),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.5)),
                              ),
                              child: Text(
                                activeTarget.rewardBadge,
                                style: const TextStyle(
                                  color: Color(0xFFFBBF24),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 11,
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: const Color(0xFF10B981).withOpacity(0.18),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                '+${activeTarget.rewardPoints} XP Reward',
                                style: const TextStyle(
                                  color: Color(0xFF34D399),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 11,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          activeTarget.title,
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 17),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          activeTarget.description,
                          style: TextStyle(color: Colors.white.withOpacity(0.75), fontSize: 12, height: 1.35),
                        ),
                        const SizedBox(height: 14),

                        // Daily Progress
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Today: $todayMins / ${activeTarget.dailyMinutesGoal} mins',
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600),
                            ),
                            Text(
                              todayMins >= activeTarget.dailyMinutesGoal ? 'Daily Goal Met! 🎉' : '${(dailyPct * 100).toInt()}%',
                              style: TextStyle(
                                color: todayMins >= activeTarget.dailyMinutesGoal ? const Color(0xFF34D399) : const Color(0xFF818CF8),
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(6),
                          child: LinearProgressIndicator(
                            value: dailyPct,
                            backgroundColor: Colors.white12,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              todayMins >= activeTarget.dailyMinutesGoal ? const Color(0xFF10B981) : const Color(0xFF6366F1),
                            ),
                            minHeight: 7,
                          ),
                        ),
                        const SizedBox(height: 12),

                        // Weekly Progress
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Weekly Goal: $weeklyMins / ${activeTarget.weeklyMinutesGoal} mins',
                              style: TextStyle(color: Colors.white.withOpacity(0.65), fontSize: 11),
                            ),
                            Text(
                              '${(weeklyPct * 100).toInt()}% of Sprint',
                              style: TextStyle(color: Colors.white.withOpacity(0.65), fontSize: 11),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(6),
                          child: LinearProgressIndicator(
                            value: weeklyPct,
                            backgroundColor: Colors.white12,
                            valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFF59E0B)),
                            minHeight: 7,
                          ),
                        ),
                        const SizedBox(height: 14),

                        // 7 Days Active Streak Row
                        const Text(
                          '7-Day Streak Tracker:',
                          style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: _buildWeekStreakChips(activeDates),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Weekly Winners Podium Section
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.leaderboard_rounded, color: Color(0xFFFBBF24), size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Weekly Winners Podium',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.08),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Text(
                          'Live Leaderboard',
                          style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Stream sessions & users to compute Leaderboard
                  StreamBuilder<QuerySnapshot>(
                    stream: FirebaseFirestore.instance.collection('lang_sessions').limit(200).snapshots(),
                    builder: (context, sessSnap) {
                      return StreamBuilder<QuerySnapshot>(
                        stream: FirebaseFirestore.instance.collection('lang_users').snapshots(),
                        builder: (context, usersSnap) {
                          final List<_StudentRankData> ranks = _calculateRanks(sessSnap, usersSnap);

                          if (ranks.isEmpty) {
                            return _buildEmptyLeaderboardState();
                          }

                          return Column(
                            children: [
                              // Top 3 Podium
                              _buildPodiumView(ranks),
                              const SizedBox(height: 20),

                              // Other Ranked Students
                              if (ranks.length > 3) ...[
                                Row(
                                  children: const [
                                    Icon(Icons.format_list_numbered_rounded, color: Color(0xFF818CF8), size: 18),
                                    SizedBox(width: 6),
                                    Text(
                                      'Active Student Rankings',
                                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 10),
                                ...ranks.skip(3).toList().asMap().entries.map((entry) => _buildStudentRankTile(entry.value, entry.key + 4)).toList(),
                              ],
                            ],
                          );
                        },
                      );
                    },
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  String _getDiverseStudentAvatar(String userId, String name, int rank) {
    final styles = ['bottts', 'avataaars', 'lorelei', 'adventurer', 'personas', 'fun-emoji'];
    final style = styles[(rank.abs() + name.length) % styles.length];
    final seed = Uri.encodeComponent(userId.isNotEmpty ? userId : name);
    return 'https://api.dicebear.com/7.x/$style/png?seed=$seed&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf';
  }

  List<_StudentRankData> _calculateRanks(
    AsyncSnapshot<QuerySnapshot> sessSnap,
    AsyncSnapshot<QuerySnapshot> usersSnap,
  ) {
    final Map<String, _UserAgg> agg = {};

    if (sessSnap.hasData) {
      for (final doc in sessSnap.data!.docs) {
        final data = doc.data() as Map<String, dynamic>;
        final uid = data['userId']?.toString() ?? 'guest';
        final dur = (data['durationSeconds'] as num?)?.toInt() ?? 0;
        final score = (data['score'] as num?)?.toInt() ?? 80;
        final name = data['userName']?.toString() ?? 'Student';
        final email = data['userEmail']?.toString() ?? '';

        if (!agg.containsKey(uid)) {
          agg[uid] = _UserAgg(name: name, email: email);
        }
        agg[uid]!.totalSeconds += dur;
        agg[uid]!.totalScore += score;
        agg[uid]!.callsCount += 1;
      }
    }

    final Map<String, Map<String, dynamic>> userDocs = {};
    if (usersSnap.hasData) {
      for (final doc in usersSnap.data!.docs) {
        userDocs[doc.id] = doc.data() as Map<String, dynamic>;
      }
    }

    userDocs.forEach((uid, uData) {
      if (!agg.containsKey(uid)) {
        agg[uid] = _UserAgg(
          name: uData['displayName'] ?? uData['name'] ?? (uData['email']?.toString().split('@').first ?? 'Student Speaker'),
          email: uData['email'] ?? '',
        );
      }
      agg[uid]!.weeklyMinutes = (uData['weeklyMinutes'] as num?)?.toInt() ?? 0;
      agg[uid]!.streak = (uData['streak'] as num?)?.toInt() ?? 1;
      if (uData['displayName'] != null && uData['displayName'].toString().isNotEmpty) {
        agg[uid]!.name = uData['displayName'];
      }
    });

    // Provide default fallback lively ranks if brand new database
    if (agg.isEmpty) {
      return [
        _StudentRankData(userId: 'u1', name: 'Kasun Perera', email: 'kasun@gmail.com', totalMinutes: 65, averageScore: 94, callsCount: 8, streak: 5),
        _StudentRankData(userId: 'u2', name: 'Nadeesha Silva', email: 'nadeesha@gmail.com', totalMinutes: 48, averageScore: 91, callsCount: 6, streak: 4),
        _StudentRankData(userId: 'u3', name: 'Dinuka Fernando', email: 'dinuka@gmail.com', totalMinutes: 36, averageScore: 87, callsCount: 5, streak: 3),
        _StudentRankData(userId: 'u4', name: 'Tharushi Jayawardena', email: 'tharushi@gmail.com', totalMinutes: 28, averageScore: 84, callsCount: 4, streak: 2),
      ];
    }

    final list = agg.entries.map((e) {
      final uData = userDocs[e.key] ?? {};
      final totalMins = (e.value.totalSeconds ~/ 60) > 0 ? (e.value.totalSeconds ~/ 60) : e.value.weeklyMinutes;
      final avgScore = e.value.callsCount > 0 ? (e.value.totalScore ~/ e.value.callsCount) : ((uData['lastScore'] as num?)?.toInt() ?? 85);
      final photo = (uData['photoUrl'] as String?) ?? (uData['avatar'] as String?);
      return _StudentRankData(
        userId: e.key,
        name: e.value.name.isNotEmpty ? e.value.name : 'Student Speaker',
        email: e.value.email,
        photoUrl: photo,
        totalMinutes: totalMins > 0 ? totalMins : 8,
        averageScore: avgScore,
        callsCount: e.value.callsCount > 0 ? e.value.callsCount : 1,
        streak: e.value.streak,
      );
    }).toList();

    list.sort((a, b) {
      final scoreA = a.totalMinutes * 10 + a.averageScore;
      final scoreB = b.totalMinutes * 10 + b.averageScore;
      return scoreB.compareTo(scoreA);
    });

    return list;
  }

  Widget _buildPodiumView(List<_StudentRankData> ranks) {
    final first = ranks.isNotEmpty ? ranks[0] : null;
    final second = ranks.length > 1 ? ranks[1] : null;
    final third = ranks.length > 2 ? ranks[2] : null;

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          // 2nd Place (Silver)
          if (second != null)
            _buildPodiumStep(second, 2, 100, const Color(0xFF94A3B8), '🥈')
          else
            const SizedBox(width: 80),

          // 1st Place (Gold Crown)
          if (first != null)
            _buildPodiumStep(first, 1, 135, const Color(0xFFF59E0B), '👑')
          else
            const SizedBox(width: 80),

          // 3rd Place (Bronze)
          if (third != null)
            _buildPodiumStep(third, 3, 85, const Color(0xFFD97706), '🥉')
          else
            const SizedBox(width: 80),
        ],
      ),
    );
  }

  Widget _buildPodiumStep(_StudentRankData student, int place, double height, Color accentColor, String medalEmoji) {
    final avatarUrl = (student.photoUrl != null && student.photoUrl!.isNotEmpty)
        ? student.photoUrl!
        : _getDiverseStudentAvatar(student.userId, student.name, place);

    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Text(medalEmoji, style: const TextStyle(fontSize: 24)),
        const SizedBox(height: 4),
        Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: accentColor, width: 2.5),
            boxShadow: [
              BoxShadow(
                color: accentColor.withOpacity(0.35),
                blurRadius: 10,
                spreadRadius: 1,
              ),
            ],
          ),
          child: ClipOval(
            child: Image.network(
              avatarUrl,
              width: 50,
              height: 50,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                color: accentColor.withOpacity(0.2),
                child: Center(
                  child: Text(
                    student.name.isNotEmpty ? student.name[0].toUpperCase() : 'S',
                    style: TextStyle(color: accentColor, fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 5),
        SizedBox(
          width: 88,
          child: Text(
            student.name,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 11),
          ),
        ),
        Text(
          '${student.totalMinutes}m • ${student.averageScore}%',
          style: TextStyle(color: accentColor, fontSize: 9.5, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 6),
        Container(
          width: 88,
          height: height,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [accentColor.withOpacity(0.32), accentColor.withOpacity(0.08)],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            border: Border.all(color: accentColor.withOpacity(0.6), width: 1.5),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '#$place',
                style: TextStyle(
                  color: accentColor,
                  fontWeight: FontWeight.w900,
                  fontSize: 22,
                ),
              ),
              if (place == 1)
                const Text(
                  'CHAMPION',
                  style: TextStyle(color: Color(0xFFFBBF24), fontSize: 8, fontWeight: FontWeight.w900, letterSpacing: 0.5),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStudentRankTile(_StudentRankData rank, int rankNumber) {
    final avatarUrl = (rank.photoUrl != null && rank.photoUrl!.isNotEmpty)
        ? rank.photoUrl!
        : _getDiverseStudentAvatar(rank.userId, rank.name, rankNumber);

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.2)),
            ),
            child: Center(
              child: Text(
                '#$rankNumber',
                style: const TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.bold, fontSize: 12),
              ),
            ),
          ),
          const SizedBox(width: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.network(
              avatarUrl,
              width: 36,
              height: 36,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                width: 36,
                height: 36,
                color: const Color(0xFF334155),
                child: Center(
                  child: Text(
                    rank.name.isNotEmpty ? rank.name[0].toUpperCase() : 'S',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  rank.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                ),
                Text(
                  '${rank.callsCount} calls logged • ${rank.streak} day streak',
                  style: TextStyle(color: Colors.white.withOpacity(0.45), fontSize: 10),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '${rank.totalMinutes} min',
                style: const TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold, fontSize: 13),
              ),
              Text(
                'Score: ${rank.averageScore}%',
                style: const TextStyle(color: Color(0xFF818CF8), fontSize: 10, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyLeaderboardState() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Center(
        child: Column(
          children: [
            const Icon(Icons.emoji_events_outlined, color: Colors.white30, size: 48),
            const SizedBox(height: 10),
            const Text(
              'Be the First Winner This Week!',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
            ),
            const SizedBox(height: 4),
            Text(
              'Complete your daily speaking session to secure the #1 Gold spot.',
              style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 11),
            ),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 3: SUBSCRIPTIONS & VIP PRACTICE PLANS
  // -------------------------------------------------------------
  Widget _buildPackagesAndStoreTab() {
    final user = FirebaseAuth.instance.currentUser;

    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance.collection('lang_settings').doc('time_limits').snapshots(),
      builder: (context, limitsSnap) {
        final limitsData = (limitsSnap.hasData && limitsSnap.data != null && limitsSnap.data!.exists)
            ? (limitsSnap.data!.data() as Map<String, dynamic>?) ?? {}
            : {};
        final int dailyFreeLimit = (limitsData['dailyFreeMinutes'] is num)
            ? (limitsData['dailyFreeMinutes'] as num).toInt()
            : 10;

        return StreamBuilder<DocumentSnapshot>(
          stream: FirebaseFirestore.instance.collection('lang_settings').doc('subscription_plans').snapshots(),
          builder: (context, subSnap) {
            final Map<dynamic, dynamic> subData = (subSnap.hasData && subSnap.data != null && subSnap.data!.exists)
                ? (subSnap.data!.data() as Map<dynamic, dynamic>?) ?? {}
                : {};

            return StreamBuilder<DocumentSnapshot>(
              stream: user != null
                  ? FirebaseFirestore.instance.collection('lang_users').doc(user.uid).snapshots()
                  : const Stream.empty(),
              builder: (context, userSnap) {
                final Map<dynamic, dynamic> userData = (userSnap.hasData && userSnap.data != null && userSnap.data!.exists)
                    ? (userSnap.data!.data() as Map<dynamic, dynamic>?) ?? {}
                    : {};

                final bool isVip = userData['isVip'] == true || userData['isVipMonthly'] == true;
                final String today = DateTime.now().toIso8601String().substring(0, 10);
                final String? lastDate = userData['lastUsageDate'] as String?;
                final int usedToday = (lastDate == today) ? ((userData['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;

                return SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.fromLTRB(16, 14, 16, 36),
                  child: isVip
                      ? _buildVipActiveDashboard(userData, subData)
                      : _buildNonVipSubscriptionView(userData, subData, dailyFreeLimit, usedToday),
                );
              },
            );
          },
        );
      },
    );
  }

  /// Active VIP Subscriber View
  Widget _buildVipActiveDashboard(Map<dynamic, dynamic> userData, Map<dynamic, dynamic> subData) {
    final String planName = userData['vipPackageName'] ?? userData['subscriptionPlan'] ?? 'SpeakFlow VIP Pass';
    final bool hasTrial = userData['hasTrialActive'] == true;
    final String currentTier = userData['subscriptionTier']?.toString().toLowerCase() ?? '';
    final bool isYearly = currentTier == 'yearly' || planName.toLowerCase().contains('year');
    final String yearlyName = subData['yearlyName'] ?? 'Yearly VIP Pass';
    final String yearlyPrice = subData['yearlyPrice'] ?? '\$39.99';
    final String yearlySavings = subData['yearlySavings'] ?? 'Save 92%';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 1. VIP Active Hero Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF312E81), Color(0xFF1E1B4B), Color(0xFF0F172A)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(
              color: const Color(0xFFF59E0B).withOpacity(0.55),
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFF59E0B).withOpacity(0.2),
                blurRadius: 20,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFF59E0B), Color(0xFFD97706)],
                      ),
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF59E0B).withOpacity(0.35),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.workspace_premium_rounded, color: Colors.white, size: 14),
                        const SizedBox(width: 5),
                        Text(
                          hasTrial ? 'FREE TRIAL ACTIVE' : 'VIP ACTIVE',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10.5,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.18),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.check_circle, color: Color(0xFF34D399), size: 12),
                        SizedBox(width: 4),
                        Text(
                          'Uncapped Speaking',
                          style: TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                planName,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.3,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Full VIP Access unlocked • All 6 AI Coaches & zero daily minute limits.',
                style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 12, height: 1.35),
              ),
              const SizedBox(height: 18),
              // Action Buttons Row
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        setState(() => _currentTabIndex = 0);
                      },
                      icon: const Icon(Icons.phone_in_talk_rounded, size: 16),
                      label: const Text('Start Practice Call', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF6366F1),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        elevation: 2,
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  OutlinedButton.icon(
                    onPressed: () => _showManageSubscriptionDialog(planName),
                    icon: const Icon(Icons.settings_outlined, size: 15),
                    label: const Text('Manage', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white70,
                      side: BorderSide(color: Colors.white.withOpacity(0.2)),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),

        // Upgrade Option Card: for users on Weekly or Monthly to easily upgrade to Yearly
        if (!isYearly) ...[
          const SizedBox(height: 16),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF2E1C0C), Color(0xFF1E293B)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(22),
              border: Border.all(
                color: const Color(0xFFF59E0B).withOpacity(0.7),
                width: 1.5,
              ),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFF59E0B).withOpacity(0.16),
                  blurRadius: 16,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3.5),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF59E0B).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.5)),
                      ),
                      child: Text(
                        '★ UPGRADE & $yearlySavings',
                        style: const TextStyle(
                          color: Color(0xFFFBBF24),
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.4,
                        ),
                      ),
                    ),
                    Text(
                      '$yearlyPrice / yr',
                      style: const TextStyle(
                        color: Color(0xFFFBBF24),
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  'Upgrade to $yearlyName 👑',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Lock in 12 months of unlimited AI speaking practice at the lowest price (~${_calculateWeeklyFromYearly(yearlyPrice)}/wk). Google Play automatically prorates your remaining $planName time.',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.7),
                    fontSize: 11.5,
                    height: 1.35,
                  ),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () => _purchaseSubscriptionTier(2, 0, yearlyName),
                    icon: const Icon(Icons.upgrade_rounded, size: 18),
                    label: Text(
                      'Upgrade to $yearlyName ($yearlyPrice/yr)',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF59E0B),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 13),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      elevation: 0,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ] else ...[
          const SizedBox(height: 16),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: const Color(0xFFF59E0B).withOpacity(0.12),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.35)),
            ),
            child: Row(
              children: [
                const Icon(Icons.verified, color: Color(0xFFFBBF24), size: 18),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'You are enjoying our top-tier Yearly VIP membership with maximum benefits!',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.85),
                      fontSize: 11.5,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],

        const SizedBox(height: 22),

        // 2. Unlocked VIP Benefits Grid
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFFF59E0B).withOpacity(0.18),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.star_rounded, color: Color(0xFFFBBF24), size: 16),
            ),
            const SizedBox(width: 10),
            const Text(
              'Your VIP Privileges & Features',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ],
        ),

        const SizedBox(height: 12),

        _buildBenefitCard(
          icon: Icons.all_inclusive_rounded,
          iconColor: const Color(0xFFFBBF24),
          title: 'Unlimited Spoken Minutes',
          desc: 'Zero daily quota limits. Practice speaking as long as you want every day.',
        ),
        _buildBenefitCard(
          icon: Icons.face_rounded,
          iconColor: const Color(0xFF818CF8),
          title: 'All 6 Native 60 FPS AI Coaches',
          desc: 'Full access to Emma, Sarah, Kenji, Aoi, Min-jun, and Carlos with real HD video.',
        ),
        _buildBenefitCard(
          icon: Icons.spellcheck_rounded,
          iconColor: const Color(0xFF34D399),
          title: 'Instant Pronunciation & Grammar Drills',
          desc: 'AI detects spoken mistakes in real-time and explains corrections instantly.',
        ),
        _buildBenefitCard(
          icon: Icons.theater_comedy_rounded,
          iconColor: const Color(0xFFF472B6),
          title: 'Custom Roleplay & Scenario Creator',
          desc: 'Generate custom practice scenarios for job interviews, travel, dating, or exams.',
        ),
        _buildBenefitCard(
          icon: Icons.bolt_rounded,
          iconColor: const Color(0xFF38BDF8),
          title: 'Priority Ultra-Low Latency Cloud',
          desc: 'Enjoy rapid voice responses powered by dedicated high-speed AI inference.',
        ),
        _buildBenefitCard(
          icon: Icons.block_rounded,
          iconColor: const Color(0xFFA78BFA),
          title: '100% Ad-Free Experience',
          desc: 'Zero interruptions, pure immersive conversation from start to finish.',
        ),

        const SizedBox(height: 24),
        _buildTrustGuaranteesCard(),
      ],
    );
  }

  /// Non-VIP Subscription Options View
  Widget _buildNonVipSubscriptionView(
    Map<dynamic, dynamic> userData,
    Map<dynamic, dynamic> subData,
    int dailyFreeLimit,
    int usedToday,
  ) {
    final int trialDays = (subData['trialDays'] is num) ? (subData['trialDays'] as num).toInt() : 3;
    final String weeklyName = subData['weeklyName'] ?? 'Weekly Access';
    final String weeklyPrice = subData['weeklyPrice'] ?? '\$9.99';
    final String monthlyName = subData['monthlyName'] ?? 'Monthly Pro';
    final String monthlyPrice = subData['monthlyPrice'] ?? '\$19.99';
    final String yearlyName = subData['yearlyName'] ?? 'Yearly VIP';
    final String yearlyPrice = subData['yearlyPrice'] ?? '\$39.99';
    final String yearlySavings = subData['yearlySavings'] ?? 'Save 92%';

    final int remainingFree = (dailyFreeLimit - usedToday).clamp(0, dailyFreeLimit);
    final double usedPct = (usedToday / dailyFreeLimit).clamp(0.0, 1.0);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Page Header
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF6366F1), Color(0xFF4F46E5)],
                ),
                borderRadius: BorderRadius.circular(14),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF6366F1).withOpacity(0.3),
                    blurRadius: 10,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: const Icon(Icons.workspace_premium_rounded, color: Colors.white, size: 22),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Unlock Full AI Speaking Access 🚀',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 17),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Practice anytime with 6 native AI coaches. Real 60 FPS video & zero limits.',
                    style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
                  ),
                ],
              ),
            ),
          ],
        ),

        const SizedBox(height: 16),

        // Free Daily Quota Status Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF1E293B),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.white.withOpacity(0.08)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: const Color(0xFF6366F1).withOpacity(0.2),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.timer_outlined, color: Color(0xFF818CF8), size: 16),
                      ),
                      const SizedBox(width: 8),
                      const Text(
                        'Standard Free Tier',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: remainingFree <= 2 ? const Color(0xFFEF4444).withOpacity(0.2) : const Color(0xFF10B981).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      '$remainingFree mins left today',
                      style: TextStyle(
                        color: remainingFree <= 2 ? const Color(0xFFF87171) : const Color(0xFF34D399),
                        fontSize: 10.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: LinearProgressIndicator(
                  value: usedPct,
                  backgroundColor: Colors.white12,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    remainingFree <= 2 ? const Color(0xFFEF4444) : const Color(0xFF10B981),
                  ),
                  minHeight: 6,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Used $usedToday of $dailyFreeLimit free daily minutes. Upgrade to VIP to speak without limits.',
                style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10.5),
              ),
            ],
          ),
        ),

        const SizedBox(height: 20),

        // Section Title with Trial Badge
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Select a VIP Plan',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
            ),
            if (trialDays > 0)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3.5),
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withOpacity(0.18),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                ),
                child: Text(
                  '🎁 $trialDays Days Free Trial',
                  style: const TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold, fontSize: 10.5),
                ),
              ),
          ],
        ),

        const SizedBox(height: 12),

        // PLAN 1: WEEKLY WITH 3-DAY FREE TRIAL (Hero Trial Plan)
        _buildSubscriptionTierCard(
          tierIndex: 0,
          title: weeklyName,
          badge: trialDays > 0 ? '$trialDays DAYS FREE TRIAL' : 'MOST POPULAR',
          badgeColor: const Color(0xFF10B981),
          price: '$weeklyPrice / week',
          subtitle: trialDays > 0
              ? 'Try $trialDays days 100% free, then $weeklyPrice/week. Cancel anytime.'
              : 'Flexible weekly speaking practice. Cancel anytime.',
          buttonText: trialDays > 0 ? 'Start $trialDays-Day Free Trial' : 'Get Weekly Access',
          isHero: true,
          trialDays: trialDays,
          features: [
            if (trialDays > 0) '$trialDays days free trial (No charge today)',
            'Unlimited AI voice calls with 6 coaches',
            'Real-time pronunciation & grammar fixes',
            'Cancel anytime in Google Play in 1 tap',
          ],
        ),

        const SizedBox(height: 14),

        // PLAN 2: MONTHLY PRO
        _buildSubscriptionTierCard(
          tierIndex: 1,
          title: monthlyName,
          badge: 'CONSISTENT LEARNER',
          badgeColor: const Color(0xFF6366F1),
          price: '$monthlyPrice / month',
          subtitle: 'Best for daily learners wanting uninterrupted progress.',
          buttonText: 'Get Monthly Pro',
          isHero: false,
          trialDays: 0,
          features: [
            'Unlimited speaking practice every day',
            'All 6 HD 60 FPS AI Video Coaches',
            'Custom Scenario & Roleplay Creator',
            'Billed monthly • Cancel anytime',
          ],
        ),

        const SizedBox(height: 14),

        // PLAN 3: YEARLY VIP (BEST VALUE)
        _buildSubscriptionTierCard(
          tierIndex: 2,
          title: yearlyName,
          badge: '★ BEST VALUE • $yearlySavings',
          badgeColor: const Color(0xFFF59E0B),
          price: '$yearlyPrice / year',
          subtitle: 'Complete 12 months of fluency practice at the lowest rate.',
          buttonText: 'Get Yearly VIP Pass',
          isHero: false,
          isBestValue: true,
          trialDays: 0,
          features: [
            'Full 12 Months of VIP Access',
            'Maximum savings ($yearlySavings off weekly)',
            'Priority Ultra-Low Latency voice server',
            'Zero daily limits on any coach or topic',
          ],
        ),

        const SizedBox(height: 18),

        // Full Paywall Comparison Button
        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            onPressed: () => PaywallScreen.show(context),
            icon: const Icon(Icons.compare_arrows_rounded, size: 16),
            label: const Text('Compare Plans & Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            style: OutlinedButton.styleFrom(
              foregroundColor: const Color(0xFF818CF8),
              side: const BorderSide(color: Color(0xFF6366F1), width: 1.2),
              padding: const EdgeInsets.symmetric(vertical: 14),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
          ),
        ),

        const SizedBox(height: 22),
        _buildTrustGuaranteesCard(),
      ],
    );
  }

  /// Subscription Tier Card Component
  Widget _buildSubscriptionTierCard({
    required int tierIndex,
    required String title,
    required String badge,
    required Color badgeColor,
    required String price,
    required String subtitle,
    required String buttonText,
    required bool isHero,
    bool isBestValue = false,
    required int trialDays,
    required List<String> features,
  }) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isBestValue
              ? [const Color(0xFF2E1C0C), const Color(0xFF1E293B)]
              : (isHero
                  ? [const Color(0xFF0F2B26), const Color(0xFF1E293B)]
                  : [const Color(0xFF1E1B4B).withOpacity(0.6), const Color(0xFF1E293B)]),
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: isBestValue
              ? const Color(0xFFF59E0B).withOpacity(0.7)
              : (isHero ? const Color(0xFF10B981).withOpacity(0.6) : const Color(0xFF6366F1).withOpacity(0.4)),
          width: (isHero || isBestValue) ? 1.5 : 1,
        ),
        boxShadow: [
          BoxShadow(
            color: (isBestValue
                    ? const Color(0xFFF59E0B)
                    : (isHero ? const Color(0xFF10B981) : const Color(0xFF6366F1)))
                .withOpacity(0.12),
            blurRadius: 14,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Badge & Price Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: badgeColor.withOpacity(0.18),
                        borderRadius: BorderRadius.circular(7),
                        border: Border.all(color: badgeColor.withOpacity(0.4)),
                      ),
                      child: Text(
                        badge,
                        style: TextStyle(
                          color: badgeColor,
                          fontSize: 9.5,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.4,
                        ),
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white.withOpacity(0.1)),
                  ),
                  child: Text(
                    price,
                    style: TextStyle(
                      color: isBestValue ? const Color(0xFFFBBF24) : Colors.white,
                      fontWeight: FontWeight.w900,
                      fontSize: 15,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              subtitle,
              style: TextStyle(color: Colors.white.withOpacity(0.65), fontSize: 11.5, height: 1.35),
            ),
            const SizedBox(height: 12),
            // Feature Bullets
            ...features.map((feat) => Padding(
              padding: const EdgeInsets.only(bottom: 5),
              child: Row(
                children: [
                  Icon(
                    Icons.check_circle_rounded,
                    color: isBestValue ? const Color(0xFFFBBF24) : const Color(0xFF34D399),
                    size: 14,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      feat,
                      style: TextStyle(color: Colors.white.withOpacity(0.85), fontSize: 11.5),
                    ),
                  ),
                ],
              ),
            )),
            const SizedBox(height: 14),
            // Checkout Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => _purchaseSubscriptionTier(tierIndex, trialDays, title),
                style: ElevatedButton.styleFrom(
                  backgroundColor: isBestValue
                      ? const Color(0xFFF59E0B)
                      : (isHero ? const Color(0xFF10B981) : const Color(0xFF6366F1)),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 13),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  elevation: 0,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      isBestValue ? Icons.workspace_premium : (trialDays > 0 ? Icons.card_giftcard : Icons.rocket_launch),
                      size: 16,
                      color: Colors.white,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      buttonText,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Purchase Trigger with UI Feedback
  Future<void> _purchaseSubscriptionTier(int tierIndex, int trialDays, String planName) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please log in first to activate a subscription.'),
          backgroundColor: Color(0xFFEF4444),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    // Show loading modal
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(
        child: Card(
          color: Color(0xFF1E293B),
          child: Padding(
            padding: EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircularProgressIndicator(color: Color(0xFF6366F1)),
                SizedBox(height: 16),
                Text(
                  'Activating subscription with Google Play...',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                ),
              ],
            ),
          ),
        ),
      ),
    );

    try {
      final success = await SubscriptionService.instance.purchaseTier(
        tierIndex: tierIndex,
        trialDays: trialDays,
      );

      if (mounted) {
        Navigator.of(context, rootNavigator: true).pop(); // dismiss loading dialog
      }

      if (success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Text('🎉', style: TextStyle(fontSize: 20)),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    trialDays > 0
                        ? '$planName activated! Your $trialDays-day free trial is now live.'
                        : '$planName activated! Unlimited VIP practice is now unlocked.',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            backgroundColor: const Color(0xFF10B981),
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 4),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        Navigator.of(context, rootNavigator: true).pop(); // dismiss loading dialog
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Purchase process: $e'),
            backgroundColor: const Color(0xFFEF4444),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  Widget _buildBenefitCard({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String desc,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: iconColor.withOpacity(0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: iconColor, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13.5),
                ),
                const SizedBox(height: 2),
                Text(
                  desc,
                  style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 11, height: 1.3),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showManageSubscriptionDialog(String planName) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: const [
            Icon(Icons.workspace_premium, color: Color(0xFFFBBF24), size: 22),
            SizedBox(width: 8),
            Text('Manage Subscription', style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Your current active plan:',
              style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12),
            ),
            const SizedBox(height: 4),
            Text(
              planName,
              style: const TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold, fontSize: 15),
            ),
            const SizedBox(height: 14),
            Text(
              'Your subscription is managed securely through your Google Play account.\n\nYou can update payment methods, view invoices, or cancel anytime in the Google Play Store under "Subscriptions".',
              style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 12, height: 1.4),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Close', style: TextStyle(color: Color(0xFF818CF8), fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildTrustGuaranteesCard() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withOpacity(0.6),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildTrustItem(Icons.verified_user_outlined, 'Google Play\nSecure Checkout', const Color(0xFF10B981)),
          Container(width: 1, height: 26, color: Colors.white12),
          _buildTrustItem(Icons.bolt_rounded, 'Instant\nVIP Activation', const Color(0xFF6366F1)),
          Container(width: 1, height: 26, color: Colors.white12),
          _buildTrustItem(Icons.cancel_outlined, 'Cancel Anytime\nin 1 Tap', const Color(0xFFF59E0B)),
        ],
      ),
    );
  }

  Widget _buildTrustItem(IconData icon, String label, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 18),
        const SizedBox(height: 4),
        Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 9.5, height: 1.2),
        ),
      ],
    );
  }

  String _calculateWeeklyFromYearly(String priceStr) {
    try {
      final clean = priceStr.replaceAll(RegExp(r'[^\d.]'), '');
      final val = double.tryParse(clean);
      if (val != null && val > 0) {
        final wk = val / 52.0;
        return '\$${wk.toStringAsFixed(2)}';
      }
    } catch (_) {}
    return '\$0.77';
  }

  // -------------------------------------------------------------
  // CALL RECORDING & SESSION HISTORY WIDGET (EMBEDDED IN PROFILE)
  // -------------------------------------------------------------
  Widget _buildPastSessionsList() {
    final user = FirebaseAuth.instance.currentUser;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: const [
            Icon(Icons.history, color: Color(0xFF818CF8), size: 18),
            SizedBox(width: 8),
            Text(
              'Past Call History & Fluency Scores',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
            ),
          ],
        ),
        const SizedBox(height: 10),
        StreamBuilder<QuerySnapshot>(
          stream: FirebaseFirestore.instance
              .collection('lang_sessions')
              .where('userId', isEqualTo: user?.uid ?? 'guest')
              .orderBy('createdAt', descending: true)
              .limit(15)
              .snapshots(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: Padding(padding: EdgeInsets.all(12), child: CircularProgressIndicator(color: Color(0xFF6366F1))));
            }

            if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
              return Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Center(
                  child: Column(
                    children: [
                      const Icon(Icons.phone_missed, color: Colors.white24, size: 36),
                      const SizedBox(height: 6),
                      const Text('No practice calls logged yet.', style: TextStyle(color: Colors.white70, fontSize: 12)),
                      const SizedBox(height: 2),
                      Text(
                        'Take your first live voice call to see pronunciation drills and scores here.',
                        style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 10),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              );
            }

            final docs = snapshot.data!.docs;
            return Column(
              children: docs.map((doc) {
                final data = doc.data() as Map<String, dynamic>;
                final score = data['score'] ?? 80;
                final grade = data['grade'] ?? 'A';
                final title = data['topicTitle'] ?? 'Speaking Session';
                final duration = data['durationSeconds'] ?? 0;
                final corrections = data['totalCorrections'] ?? 0;
                final lang = data['language'] ?? 'English';

                return Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.06)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 42,
                        height: 42,
                        decoration: BoxDecoration(
                          color: const Color(0xFF6366F1).withOpacity(0.18),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Center(
                          child: Text(
                            '$grade',
                            style: const TextStyle(
                              color: Color(0xFF818CF8),
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            const SizedBox(height: 2),
                            Row(
                              children: [
                                Text(
                                  '${_getLanguageFlag(lang)} $lang • $score/100 • ${duration}s',
                                  style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 10.5),
                                ),
                                if (corrections > 0) ...[
                                  const SizedBox(width: 6),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFEF4444).withOpacity(0.15),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      '$corrections Drills',
                                      style: const TextStyle(color: Color(0xFFF87171), fontSize: 9, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            );
          },
        ),
      ],
    );
  }

  // -------------------------------------------------------------
  // TAB 4: COMPREHENSIVE PROFILE & SETTINGS TAB
  // -------------------------------------------------------------
  Widget _buildProfileTab() {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.account_circle_outlined, size: 64, color: Colors.white38),
              const SizedBox(height: 14),
              const Text('Please Sign In', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Text('Log in to see your speaking stats, packages, and call history.',
                  textAlign: TextAlign.center, style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 13)),
              const SizedBox(height: 18),
              ElevatedButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const LoginScreen())),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF6366F1),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('Go to Login'),
              ),
            ],
          ),
        ),
      );
    }

    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance.collection('lang_settings').doc('time_limits').snapshots(),
      builder: (context, settingsSnap) {
        final settingsData = (settingsSnap.hasData && settingsSnap.data != null && settingsSnap.data!.exists)
            ? (settingsSnap.data!.data() as Map<String, dynamic>?) ?? {}
            : {};
        final int dailyFreeLimit = (settingsData['dailyFreeMinutes'] is num)
            ? (settingsData['dailyFreeMinutes'] as num).toInt()
            : 10;

        return StreamBuilder<DocumentSnapshot>(
          stream: FirebaseFirestore.instance.collection('lang_users').doc(user.uid).snapshots(),
          builder: (context, userSnap) {
            final userData = (userSnap.hasData && userSnap.data != null && userSnap.data!.exists)
                ? (userSnap.data!.data() as Map<String, dynamic>?) ?? {}
                : {};

            final bool isVip = userData['isVipMonthly'] == true;
            final String today = DateTime.now().toIso8601String().substring(0, 10);
            final String? lastDate = userData['lastUsageDate'] as String?;
            final int usedToday = (lastDate == today) ? ((userData['dailyMinutesUsed'] as num?)?.toInt() ?? 0) : 0;
            final int extraMinutes = (userData['extraMinutes'] as num?)?.toInt() ?? 0;
            final int remainingFree = (dailyFreeLimit - usedToday).clamp(0, dailyFreeLimit);
            final int totalAvailable = isVip ? 9999 : (remainingFree + extraMinutes);
            final String userDisplayName = userData['displayName'] ?? user.displayName ?? (user.email?.split('@')[0] ?? 'Student');
            final String? userPhoto = userData['photoUrl'] as String? ?? user.photoURL;
            final String displayAvatar = (userPhoto != null && userPhoto.isNotEmpty)
                ? userPhoto
                : _getDiverseStudentAvatar(user.uid, userDisplayName, 1);

            return StreamBuilder<QuerySnapshot>(
              stream: FirebaseFirestore.instance
                  .collection('lang_sessions')
                  .where('userId', isEqualTo: user.uid)
                  .snapshots(),
              builder: (context, sessSnap) {
                int totalSpokenSeconds = 0;
                int totalCalls = 0;
                int totalScore = 0;

                if (sessSnap.hasData) {
                  for (final d in sessSnap.data!.docs) {
                    final dData = d.data() as Map<String, dynamic>;
                    totalSpokenSeconds += (dData['durationSeconds'] as num?)?.toInt() ?? 0;
                    totalScore += (dData['score'] as num?)?.toInt() ?? 80;
                    totalCalls += 1;
                  }
                }

                final int totalSpokenMinutes = (totalSpokenSeconds ~/ 60) > 0 ? (totalSpokenSeconds ~/ 60) : ((userData['weeklyMinutes'] as num?)?.toInt() ?? 0);
                final int avgFluency = totalCalls > 0 ? (totalScore ~/ totalCalls) : ((userData['lastScore'] as num?)?.toInt() ?? 88);
                final int currentStreak = (userData['streak'] as num?)?.toInt() ?? 1;

                return SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
                  child: Column(
                    children: [
                      // User Header with Avatar & Change Photo Button
                      Center(
                        child: Column(
                          children: [
                            Stack(
                              children: [
                                Container(
                                  width: 90,
                                  height: 90,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    gradient: LinearGradient(
                                      colors: isVip
                                          ? [const Color(0xFFF59E0B), const Color(0xFFD97706)]
                                          : [const Color(0xFF6366F1), const Color(0xFFA855F7)],
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: isVip ? const Color(0xFFF59E0B).withOpacity(0.35) : const Color(0xFF6366F1).withOpacity(0.35),
                                        blurRadius: 18,
                                        spreadRadius: 2,
                                      ),
                                    ],
                                  ),
                                  padding: const EdgeInsets.all(3),
                                  child: ClipOval(
                                    child: Image.network(
                                      displayAvatar,
                                      width: 84,
                                      height: 84,
                                      fit: BoxFit.cover,
                                      errorBuilder: (_, __, ___) => Container(
                                        color: const Color(0xFF1E293B),
                                        child: Center(
                                          child: Text(
                                            userDisplayName.isNotEmpty ? userDisplayName[0].toUpperCase() : 'U',
                                            style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Positioned(
                                  bottom: 0,
                                  right: 0,
                                  child: InkWell(
                                    onTap: () => _showAvatarPickerModal(context, user.uid, userPhoto),
                                    borderRadius: BorderRadius.circular(20),
                                    child: Container(
                                      padding: const EdgeInsets.all(6),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF6366F1),
                                        shape: BoxShape.circle,
                                        border: Border.all(color: const Color(0xFF0F172A), width: 2),
                                      ),
                                      child: const Icon(Icons.camera_alt, color: Colors.white, size: 14),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            Text(
                              userDisplayName,
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              user.email ?? 'Logged In Student',
                              style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12),
                            ),
                            const SizedBox(height: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3.5),
                              decoration: BoxDecoration(
                                color: isVip ? const Color(0xFFF59E0B).withOpacity(0.2) : const Color(0xFF6366F1).withOpacity(0.2),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: isVip ? const Color(0xFFF59E0B).withOpacity(0.6) : const Color(0xFF818CF8).withOpacity(0.5),
                                  width: 0.8,
                                ),
                              ),
                              child: Text(
                                isVip ? '👑 VIP Master Pass Holder' : '⏱️ Standard Free Learner',
                                style: TextStyle(
                                  color: isVip ? const Color(0xFFFBBF24) : const Color(0xFFA5B4FC),
                                  fontSize: 10.5,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 20),

                      // Active Plan & Quota Card
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: isVip
                                ? [const Color(0xFF78350F).withOpacity(0.85), const Color(0xFF1E1B4B)]
                                : [const Color(0xFF1E293B), const Color(0xFF0F172A)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isVip ? const Color(0xFFF59E0B).withOpacity(0.5) : const Color(0xFF6366F1).withOpacity(0.35),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Icon(isVip ? Icons.workspace_premium : Icons.account_balance_wallet_outlined,
                                        color: isVip ? const Color(0xFFFBBF24) : const Color(0xFF818CF8), size: 18),
                                    const SizedBox(width: 8),
                                    Text(
                                      isVip ? 'VIP Speaking Quota' : 'Daily Free & Extra Balance',
                                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13.5),
                                    ),
                                  ],
                                ),
                                ElevatedButton(
                                  onPressed: () => setState(() => _currentTabIndex = 3),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: isVip ? const Color(0xFFF59E0B) : const Color(0xFF6366F1),
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                    minimumSize: Size.zero,
                                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                    elevation: 0,
                                  ),
                                  child: Text(
                                    isVip ? 'Manage VIP' : '+ Top Up',
                                    style: const TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Row(
                              children: [
                                Expanded(
                                  child: _buildProfileMetricTile(
                                    'Available Today',
                                    isVip ? 'Unlimited' : '$totalAvailable mins',
                                    const Color(0xFF34D399),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: _buildProfileMetricTile(
                                    'Daily Free',
                                    '$dailyFreeLimit mins',
                                    const Color(0xFF60A5FA),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: _buildProfileMetricTile(
                                    'Extra Balance',
                                    '+$extraMinutes mins',
                                    const Color(0xFFA78BFA),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            Text(
                              isVip
                                  ? 'Enjoy unlimited voice coaching calls with zero latency and priority cloud TTS.'
                                  : 'Free allowance resets nightly at 00:00. Extra minutes never expire.',
                              style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 10.5),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      // Practice Performance 4-Card Grid
                      Row(
                        children: [
                          Expanded(
                            child: _buildStatBox(
                              '🎙️ Spoken Time',
                              '$totalSpokenMinutes min',
                              const Color(0xFF6366F1),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildStatBox(
                              '📞 Voice Calls',
                              '$totalCalls calls',
                              const Color(0xFF10B981),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: _buildStatBox(
                              '🎯 Avg Fluency',
                              '$avgFluency%',
                              const Color(0xFFF59E0B),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildStatBox(
                              '🔥 Day Streak',
                              '$currentStreak Days',
                              const Color(0xFFEC4899),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 20),

                      // Learning Setup (Language, Coach, Drills)
                      Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: Colors.white.withOpacity(0.06)),
                        ),
                        child: Column(
                          children: [
                            ListTile(
                              leading: _buildFlagBadge(_userTargetLanguage ?? 'English', width: 36, height: 24, radius: 5),
                              title: const Text('Target Practice Language', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
                              subtitle: Text(_userTargetLanguage ?? 'English', style: const TextStyle(color: Color(0xFF818CF8), fontSize: 11)),
                              trailing: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF6366F1).withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: const Text('Change', style: TextStyle(color: Color(0xFFA5B4FC), fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                              onTap: () => _showLanguageSetupModal(context, isMandatory: false),
                            ),
                            const Divider(color: Colors.white10, height: 1),
                            ListTile(
                              leading: _selectedCoach.buildAvatar(radius: 18),
                              title: Text('Voice Coach: ${_selectedCoach.name}', style: const TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
                              subtitle: Text('${_selectedCoach.isFemale ? "Female" : "Male"} Persona • ${_selectedCoach.tagline}',
                                  maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.white54, fontSize: 10.5)),
                              trailing: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF6366F1).withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: const Text('Switch', style: TextStyle(color: Color(0xFFA5B4FC), fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                              onTap: () => _showCoachPickerModal(context),
                            ),
                            const Divider(color: Colors.white10, height: 1),
                            ListTile(
                              leading: const Icon(Icons.psychology, color: Color(0xFFA78BFA), size: 22),
                              title: const Text('Active Pronunciation Drill Mode', style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold)),
                              subtitle: const Text('Live repetition coach on mispronounced words', style: TextStyle(color: Colors.white54, fontSize: 10.5)),
                              trailing: const Icon(Icons.check_circle_rounded, color: Color(0xFF10B981), size: 20),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 20),

                      // Past Calls History
                      _buildPastSessionsList(),

                      const SizedBox(height: 20),

                      // Push Notifications Settings Card
                      Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: Colors.white.withOpacity(0.06)),
                        ),
                        child: FutureBuilder<bool>(
                          future: NotificationService.instance.checkPermissionGranted(),
                          builder: (context, notifSnap) {
                            final isGranted = notifSnap.data == true;
                            return ListTile(
                              leading: Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: isGranted ? const Color(0xFF10B981).withOpacity(0.15) : const Color(0xFFF59E0B).withOpacity(0.15),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Icon(
                                  isGranted ? Icons.notifications_active_rounded : Icons.notifications_off_outlined,
                                  color: isGranted ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                                  size: 22,
                                ),
                              ),
                              title: const Text(
                                'Push Notifications',
                                style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold),
                              ),
                              subtitle: Text(
                                isGranted ? 'Enabled • Streak reminders & coach nudges active' : 'Disabled • Tap to enable alerts',
                                style: TextStyle(color: isGranted ? const Color(0xFF34D399) : Colors.white54, fontSize: 10.5),
                              ),
                              trailing: ElevatedButton(
                                onPressed: () async {
                                  final granted = await NotificationService.instance.requestNotificationPermission();
                                  setState(() {});
                                  if (context.mounted) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(granted ? '✅ Push Notifications enabled!' : '⚠️ Notification permission not granted in system settings.'),
                                        backgroundColor: granted ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                                      ),
                                    );
                                  }
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: isGranted ? const Color(0xFF10B981).withOpacity(0.2) : const Color(0xFF6366F1),
                                  foregroundColor: isGranted ? const Color(0xFF34D399) : Colors.white,
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                  minimumSize: Size.zero,
                                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                  elevation: 0,
                                ),
                                child: Text(
                                  isGranted ? 'Active' : 'Enable',
                                  style: const TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold),
                                ),
                              ),
                            );
                          },
                        ),
                      ),

                      const SizedBox(height: 16),

                      // Developer & App Contact Card
                      Container(
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.25)),
                        ),
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF6366F1).withOpacity(0.2),
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: const Icon(Icons.support_agent_rounded, color: Color(0xFF818CF8), size: 22),
                                ),
                                const SizedBox(width: 10),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      'Help & Developer Support',
                                      style: TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.bold),
                                    ),
                                    Text(
                                      'Direct contact for inquiries & assistance',
                                      style: TextStyle(color: Colors.white54, fontSize: 10.5),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 14),

                            // Email Row
                            InkWell(
                              onTap: () {
                                Clipboard.setData(const ClipboardData(text: 'janithad2@gmail.com'));
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Copied janithad2@gmail.com to clipboard!'),
                                    backgroundColor: Color(0xFF6366F1),
                                  ),
                                );
                              },
                              borderRadius: BorderRadius.circular(10),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF0F172A),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.white.withOpacity(0.06)),
                                ),
                                child: const Row(
                                  children: [
                                    Icon(Icons.mail_outline_rounded, color: Color(0xFF60A5FA), size: 18),
                                    SizedBox(width: 10),
                                    Expanded(
                                      child: Text(
                                        'janithad2@gmail.com',
                                        style: TextStyle(color: Colors.white, fontSize: 12.5, fontWeight: FontWeight.w600),
                                      ),
                                    ),
                                    Icon(Icons.copy_rounded, color: Colors.white38, size: 16),
                                  ],
                                ),
                              ),
                            ),
                            const SizedBox(height: 8),

                            // Phone Row
                            InkWell(
                              onTap: () {
                                Clipboard.setData(const ClipboardData(text: '+94773543361'));
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Copied +94773543361 to clipboard!'),
                                    backgroundColor: Color(0xFF10B981),
                                  ),
                                );
                              },
                              borderRadius: BorderRadius.circular(10),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF0F172A),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.white.withOpacity(0.06)),
                                ),
                                child: const Row(
                                  children: [
                                    Icon(Icons.phone_outlined, color: Color(0xFF34D399), size: 18),
                                    SizedBox(width: 10),
                                    Expanded(
                                      child: Text(
                                        '+94 77 354 3361 (Call / WhatsApp)',
                                        style: TextStyle(color: Colors.white, fontSize: 12.5, fontWeight: FontWeight.w600),
                                      ),
                                    ),
                                    Icon(Icons.copy_rounded, color: Colors.white38, size: 16),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 24),

                      // Sign Out Button
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () async {
                            final confirm = await showDialog<bool>(
                              context: context,
                              builder: (dCtx) => AlertDialog(
                                backgroundColor: const Color(0xFF1E293B),
                                title: const Text('Sign Out', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                content: const Text('Are you sure you want to log out of your account?', style: TextStyle(color: Colors.white70)),
                                actions: [
                                  TextButton(onPressed: () => Navigator.pop(dCtx, false), child: const Text('Cancel', style: TextStyle(color: Colors.white54))),
                                  TextButton(onPressed: () => Navigator.pop(dCtx, true), child: const Text('Log Out', style: TextStyle(color: Color(0xFFEF4444)))),
                                ],
                              ),
                            );
                            if (confirm == true) {
                              // Close profile modal if open
                              if (Navigator.of(context).canPop()) {
                                Navigator.of(context).pop();
                              }
                              await FirebaseAuth.instance.signOut();
                              if (context.mounted) {
                                Navigator.of(context).pushAndRemoveUntil(
                                  MaterialPageRoute(builder: (_) => const WelcomeScreen()),
                                  (route) => false,
                                );
                              }
                            }
                          },
                          icon: const Icon(Icons.logout, size: 18),
                          label: const Text('Log Out of Account'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFEF4444).withOpacity(0.12),
                            foregroundColor: const Color(0xFFF87171),
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            side: BorderSide(color: const Color(0xFFEF4444).withOpacity(0.25)),
                            elevation: 0,
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            );
          },
        );
      },
    );
  }

  Widget _buildProfileMetricTile(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 6),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.06),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 9.5),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildStatBox(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 11, fontWeight: FontWeight.w600)),
          const SizedBox(height: 6),
          Text(value, style: TextStyle(color: color, fontSize: 18, fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }

  void _showAvatarPickerModal(BuildContext context, String uid, String? currentPhoto) {
    final TextEditingController urlController = TextEditingController();
    final List<Map<String, String>> presetAvatars = [
      {'name': 'Robot Tutor 🤖', 'url': 'https://api.dicebear.com/7.x/bottts/png?seed=robot_tutor_coach&backgroundColor=b6e3f4,c0aede'},
      {'name': 'Female Coach 👩‍💼', 'url': 'https://api.dicebear.com/7.x/lorelei/png?seed=coach_sarah_expert&backgroundColor=ffd5dc,ffdfbf'},
      {'name': 'Male Coach 👨‍💼', 'url': 'https://api.dicebear.com/7.x/personas/png?seed=coach_michael_lead&backgroundColor=d1d4f9,c0aede'},
      {'name': 'Smart Scholar 🎓', 'url': 'https://api.dicebear.com/7.x/avataaars/png?seed=smart_scholar_pro&backgroundColor=b6e3f4,d1d4f9'},
      {'name': 'Techie 💻', 'url': 'https://api.dicebear.com/7.x/bottts/png?seed=tech_coder_ai&backgroundColor=c0aede,ffd5dc'},
      {'name': 'Adventurer 🌍', 'url': 'https://api.dicebear.com/7.x/adventurer/png?seed=travel_adventurer&backgroundColor=ffdfbf,ffd5dc'},
      {'name': 'Global Diplomat 🌐', 'url': 'https://api.dicebear.com/7.x/personas/png?seed=diplomat_fluent&backgroundColor=b6e3f4,c0aede'},
      {'name': 'Creative Artist 🎨', 'url': 'https://api.dicebear.com/7.x/lorelei/png?seed=creative_speaker&backgroundColor=ffd5dc,d1d4f9'},
      {'name': 'Champion 🏆', 'url': 'https://api.dicebear.com/7.x/bottts/png?seed=champion_winner&backgroundColor=ffdfbf,ffd5dc'},
      {'name': 'Explorer 🚀', 'url': 'https://api.dicebear.com/7.x/adventurer/png?seed=galaxy_explorer&backgroundColor=c0aede,d1d4f9'},
      {'name': 'Friendly Star ⭐', 'url': 'https://api.dicebear.com/7.x/fun-emoji/png?seed=friendly_star&backgroundColor=ffd5dc,ffdfbf'},
      {'name': 'Super Thinker 💡', 'url': 'https://api.dicebear.com/7.x/bottts/png?seed=super_thinker&backgroundColor=b6e3f4,ffd5dc'},
    ];

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E293B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setModalState) {
            return Padding(
              padding: EdgeInsets.fromLTRB(20, 20, 20, MediaQuery.of(ctx).viewInsets.bottom + 24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.face_retouching_natural, color: Color(0xFF818CF8), size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Customize Profile Photo',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                        ],
                      ),
                      IconButton(
                        onPressed: () => Navigator.pop(ctx),
                        icon: const Icon(Icons.close, color: Colors.white54, size: 20),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Pick a stylish 3D character avatar, generate a surprise, or paste a custom photo link:',
                    style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 11),
                  ),
                  const SizedBox(height: 14),

                  // Avatar Grid
                  SizedBox(
                    height: 220,
                    child: GridView.builder(
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 4,
                        crossAxisSpacing: 10,
                        mainAxisSpacing: 10,
                        childAspectRatio: 0.85,
                      ),
                      itemCount: presetAvatars.length,
                      itemBuilder: (context, i) {
                        final av = presetAvatars[i];
                        final isSelected = av['url'] == currentPhoto;
                        return InkWell(
                          onTap: () async {
                            final selectedUrl = av['url']!;
                            await FirebaseFirestore.instance.collection('lang_users').doc(uid).set(
                              {'photoUrl': selectedUrl},
                              SetOptions(merge: true),
                            );
                            await FirebaseAuth.instance.currentUser?.updatePhotoURL(selectedUrl);
                            if (mounted) {
                              Navigator.pop(ctx);
                              ScaffoldMessenger.of(this.context).showSnackBar(
                                const SnackBar(
                                  content: Text('Profile picture updated successfully! ✨'),
                                  backgroundColor: Color(0xFF10B981),
                                ),
                              );
                            }
                          },
                          borderRadius: BorderRadius.circular(14),
                          child: Container(
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF6366F1).withOpacity(0.3) : const Color(0xFF0F172A),
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: isSelected ? const Color(0xFF818CF8) : Colors.white12,
                                width: isSelected ? 2 : 1,
                              ),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                ClipOval(
                                  child: Image.network(
                                    av['url']!,
                                    width: 44,
                                    height: 44,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  av['name']!,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(color: Colors.white70, fontSize: 8.5),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Random Shuffle Button
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final randomSeed = 'random_avatar_${DateTime.now().millisecondsSinceEpoch}';
                        final randomUrl = 'https://api.dicebear.com/7.x/bottts/png?seed=$randomSeed&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf';
                        await FirebaseFirestore.instance.collection('lang_users').doc(uid).set(
                          {'photoUrl': randomUrl},
                          SetOptions(merge: true),
                        );
                        await FirebaseAuth.instance.currentUser?.updatePhotoURL(randomUrl);
                        if (mounted) {
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(this.context).showSnackBar(
                            const SnackBar(
                              content: Text('Surprise avatar assigned! 🎲'),
                              backgroundColor: Color(0xFF6366F1),
                            ),
                          );
                        }
                      },
                      icon: const Icon(Icons.shuffle, size: 16),
                      label: const Text('🎲 Generate Surprise Avatar'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFF818CF8),
                        side: const BorderSide(color: Color(0xFF6366F1)),
                        padding: const EdgeInsets.symmetric(vertical: 11),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Custom Photo URL Input
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: urlController,
                          style: const TextStyle(color: Colors.white, fontSize: 12),
                          decoration: InputDecoration(
                            hintText: 'Or paste direct image URL (Firebase, Web)...',
                            hintStyle: TextStyle(color: Colors.white.withOpacity(0.35), fontSize: 11),
                            filled: true,
                            fillColor: const Color(0xFF0F172A),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: const BorderSide(color: Color(0xFF6366F1)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: () async {
                          final text = urlController.text.trim();
                          if (text.isEmpty || !text.startsWith('http')) {
                            ScaffoldMessenger.of(this.context).showSnackBar(
                              const SnackBar(content: Text('Please enter a valid https image link.')),
                            );
                            return;
                          }
                          await FirebaseFirestore.instance.collection('lang_users').doc(uid).set(
                            {'photoUrl': text},
                            SetOptions(merge: true),
                          );
                          await FirebaseAuth.instance.currentUser?.updatePhotoURL(text);
                          if (mounted) {
                            Navigator.pop(ctx);
                            ScaffoldMessenger.of(this.context).showSnackBar(
                              const SnackBar(
                                content: Text('Custom photo updated! 📸'),
                                backgroundColor: Color(0xFF10B981),
                              ),
                            );
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          elevation: 0,
                        ),
                        child: const Text('Save', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  void _showCoachPickerModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1E293B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Select Default AI Voice Coach',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(ctx),
                    icon: const Text('✕', style: TextStyle(color: Colors.white54, fontSize: 16)),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                'Choose your personal coach (Female & Male voices available):',
                style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
              ),
              const SizedBox(height: 14),
              Flexible(
                child: ListView.separated(
                  shrinkWrap: true,
                  itemCount: CoachPersona.presetCoaches.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                  itemBuilder: (context, index) {
                    final coach = CoachPersona.presetCoaches[index];
                    final isSel = coach.id == _selectedCoachId;
                    return InkWell(
                      onTap: () {
                        final coachId = coach.id;
                        if (Navigator.of(ctx).canPop()) {
                          Navigator.of(ctx).pop();
                        }
                        WidgetsBinding.instance.addPostFrameCallback((_) {
                          if (mounted) {
                            setState(() => _selectedCoachId = coachId);
                          }
                        });
                        _savePreferredCoach(coachId);
                      },
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF6366F1).withOpacity(0.2) : const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSel ? const Color(0xFF818CF8) : Colors.white12,
                            width: isSel ? 2 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Stack(
                              children: [
                                coach.buildAvatar(radius: 24),
                                Positioned(
                                  bottom: 0,
                                  right: 0,
                                  child: Container(
                                    padding: const EdgeInsets.all(2),
                                    decoration: BoxDecoration(
                                      color: coach.isFemale ? const Color(0xFFEC4899) : const Color(0xFF3B82F6),
                                      shape: BoxShape.circle,
                                    ),
                                    child: Text(
                                      coach.isFemale ? '👩' : '👨',
                                      style: const TextStyle(fontSize: 9),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        coach.name,
                                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: coach.isFemale ? const Color(0xFFEC4899).withOpacity(0.2) : const Color(0xFF3B82F6).withOpacity(0.2),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Text(
                                          coach.isFemale ? 'Female Voice' : 'Male Voice',
                                          style: TextStyle(
                                            color: coach.isFemale ? const Color(0xFFF472B6) : const Color(0xFF60A5FA),
                                            fontSize: 9,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    coach.tagline,
                                    style: TextStyle(color: Colors.white.withOpacity(0.55), fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                            if (isSel)
                              Container(
                                width: 22,
                                height: 22,
                                decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle),
                                child: const Center(
                                  child: Text('✓', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                                ),
                              )
                            else
                              Text('›', style: TextStyle(color: Colors.white38, fontSize: 22)),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _StudentRankData {
  final String userId;
  final String name;
  final String email;
  final String? photoUrl;
  final int totalMinutes;
  final int averageScore;
  final int callsCount;
  final int streak;

  _StudentRankData({
    required this.userId,
    required this.name,
    required this.email,
    this.photoUrl,
    required this.totalMinutes,
    required this.averageScore,
    required this.callsCount,
    required this.streak,
  });
}

class _UserAgg {
  String name;
  String email;
  int totalSeconds;
  int totalScore;
  int callsCount;
  int weeklyMinutes;
  int streak;

  _UserAgg({
    required this.name,
    required this.email,
    this.totalSeconds = 0,
    this.totalScore = 0,
    this.callsCount = 0,
    this.weeklyMinutes = 0,
    this.streak = 1,
  });
}
