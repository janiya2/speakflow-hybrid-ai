import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'home_screen.dart';
import 'welcome_screen.dart';
import '../services/auth_session_service.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin {
  late AnimationController _logoController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;

  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  late AnimationController _textController;
  late Animation<Offset> _textSlideAnimation;
  late Animation<double> _textFadeAnimation;

  double _progressValue = 0.0;
  Timer? _progressTimer;
  String _statusText = 'Initializing AI Voice Engine...';
  Future<User?>? _authRestoreFuture;

  final List<Map<String, String>> _languages = [
    {'name': 'English', 'flag': 'assets/images/flag_us.png'},
    {'name': 'Spanish', 'flag': 'assets/images/flag_es.png'},
    {'name': 'French', 'flag': 'assets/images/flag_fr.png'},
    {'name': 'German', 'flag': 'assets/images/flag_de.png'},
    {'name': 'Italian', 'flag': 'assets/images/flag_it.png'},
    {'name': 'Portuguese', 'flag': 'assets/images/flag_br.png'},
    {'name': 'Japanese', 'flag': 'assets/images/flag_jp.png'},
    {'name': 'Korean', 'flag': 'assets/images/flag_kr.png'},
    {'name': 'Chinese', 'flag': 'assets/images/flag_cn.png'},
    {'name': 'Arabic', 'flag': 'assets/images/flag_sa.png'},
    {'name': 'Hindi', 'flag': 'assets/images/flag_in.png'},
    {'name': 'Russian', 'flag': 'assets/images/flag_ru.png'},
    {'name': 'Tamil', 'flag': 'assets/images/flag_lk.png'},
    {'name': 'Sinhala', 'flag': 'assets/images/flag_lk.png'},
    {'name': 'Dutch', 'flag': 'assets/images/flag_nl.png'},
    {'name': 'Turkish', 'flag': 'assets/images/flag_tr.png'},
    {'name': 'Vietnamese', 'flag': 'assets/images/flag_vi.png'},
    {'name': 'Indonesian', 'flag': 'assets/images/flag_id.png'},
    {'name': 'Thai', 'flag': 'assets/images/flag_th.png'},
    {'name': 'Swedish', 'flag': 'assets/images/flag_se.png'},
  ];

  @override
  void initState() {
    super.initState();

    // 1. Logo Scale & Fade
    _logoController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _logoScaleAnimation = CurvedAnimation(
      parent: _logoController,
      curve: Curves.easeOutBack,
    );
    _logoFadeAnimation = CurvedAnimation(
      parent: _logoController,
      curve: Curves.easeIn,
    );

    // 2. Continuous Ambient Pulse
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
    _pulseAnimation = Tween<double>(begin: 0.95, end: 1.08).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // 3. Text & Badges Entrance
    _textController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _textSlideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _textController, curve: Curves.easeOutCubic));
    _textFadeAnimation = CurvedAnimation(
      parent: _textController,
      curve: Curves.easeIn,
    );

    // Pre-heat persistent authentication check while splash animation runs
    _authRestoreFuture = _resolveInitialUser();

    // Start Animations
    _logoController.forward();
    Future.delayed(const Duration(milliseconds: 400), () {
      if (mounted) _textController.forward();
    });

    // Start Simulated Progress and Step Messages
    _startLoadingSequence();
  }

  Future<User?> _resolveInitialUser() async {
    try {
      return await AuthSessionService.restoreOrEnsureSession();
    } catch (e) {
      debugPrint('Auth initial check notice: $e');
      return FirebaseAuth.instance.currentUser;
    }
  }

  void _startLoadingSequence() {
    const totalTicks = 50;
    int currentTick = 0;

    _progressTimer = Timer.periodic(const Duration(milliseconds: 50), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }
      currentTick++;
      setState(() {
        _progressValue = currentTick / totalTicks;
        if (currentTick == 12) {
          _statusText = 'Loading 6 Native Language Coaches...';
        } else if (currentTick == 26) {
          _statusText = 'Calibrating Real-Time Pronunciation...';
        } else if (currentTick == 40) {
          _statusText = 'Entering Personalized Practice Space...';
        } else if (currentTick >= totalTicks) {
          _statusText = 'Welcome!';
        }
      });

      if (currentTick >= totalTicks) {
        timer.cancel();
        _navigateToNextScreen();
      }
    });
  }

  void _navigateToNextScreen() async {
    await Future.delayed(const Duration(milliseconds: 100));
    if (!mounted) return;

    // Check Firebase user with graceful resolution from background token restoration
    User? user;
    try {
      if (_authRestoreFuture != null) {
        user = await _authRestoreFuture;
      }
      user ??= FirebaseAuth.instance.currentUser;
    } catch (e) {
      debugPrint('Navigation auth check notice: $e');
    }

    if (!mounted) return;
    if (user == null && AuthSessionService.isLoggedIn) {
      try {
        user = await AuthSessionService.restoreOrEnsureSession();
      } catch (_) {}
    }
    final bool shouldGoToHome = (user != null) || AuthSessionService.isLoggedIn;
    final Widget nextScreen = shouldGoToHome ? const HomeScreen() : const WelcomeScreen();

    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 700),
        pageBuilder: (context, animation, secondaryAnimation) => nextScreen,
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(
            opacity: CurvedAnimation(parent: animation, curve: Curves.easeInOut),
            child: child,
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    _progressTimer?.cancel();
    _logoController.dispose();
    _pulseController.dispose();
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0A0E1A),
      body: Stack(
        children: [
          // 1. Ambient Background Glows
          Positioned(
            top: -120,
            left: -80,
            child: Container(
              width: 320,
              height: 320,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    const Color(0xFF6366F1).withOpacity(0.22),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            bottom: -100,
            right: -60,
            child: Container(
              width: 350,
              height: 350,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    const Color(0xFF38BDF8).withOpacity(0.18),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),

          // 2. Central Content
          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Glowing 3D Logo with Ambient Pulse
                  AnimatedBuilder(
                    animation: _pulseAnimation,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _pulseAnimation.value,
                        child: child,
                      );
                    },
                    child: FadeTransition(
                      opacity: _logoFadeAnimation,
                      child: ScaleTransition(
                        scale: _logoScaleAnimation,
                        child: Container(
                          width: 130,
                          height: 130,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(32),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF6366F1).withOpacity(0.4),
                                blurRadius: 40,
                                spreadRadius: 4,
                                offset: const Offset(0, 10),
                              ),
                              BoxShadow(
                                color: const Color(0xFF38BDF8).withOpacity(0.25),
                                blurRadius: 60,
                                spreadRadius: 2,
                              ),
                            ],
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(32),
                            child: Image.asset(
                              'assets/images/app_logo.png',
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 28),

                  // Animated Title & Tagline
                  SlideTransition(
                    position: _textSlideAnimation,
                    child: FadeTransition(
                      opacity: _textFadeAnimation,
                      child: Column(
                        children: [
                          // App Name with Gradient Shader
                          ShaderMask(
                            shaderCallback: (bounds) => const LinearGradient(
                              colors: [
                                Color(0xFFFFFFFF),
                                Color(0xFFC7D2FE),
                                Color(0xFF818CF8),
                              ],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ).createShader(bounds),
                            child: const Text(
                              'SpeakFlow AI',
                              style: TextStyle(
                                fontSize: 34,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 0.5,
                                color: Colors.white,
                              ),
                            ),
                          ),

                          const SizedBox(height: 6),

                          // Subtitle Badge
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                            decoration: BoxDecoration(
                              color: const Color(0xFF6366F1).withOpacity(0.18),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: const Color(0xFF818CF8).withOpacity(0.35),
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: const [
                                Icon(Icons.bolt, color: Color(0xFFFBBF24), size: 14),
                                SizedBox(width: 4),
                                Text(
                                  'Real-Time AI Voice Language Coach',
                                  style: TextStyle(
                                    color: Color(0xFFE0E7FF),
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: 0.2,
                                  ),
                                ),
                              ],
                            ),
                          ),

                          const SizedBox(height: 24),

                          // Multilingual Chips Ribbon
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            alignment: WrapAlignment.center,
                            children: _languages.map((lang) {
                              return Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1E293B).withOpacity(0.7),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(
                                    color: Colors.white.withOpacity(0.08),
                                  ),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(2.5),
                                      child: Image.asset(
                                        lang['flag']!,
                                        width: 15,
                                        height: 10.5,
                                        fit: BoxFit.cover,
                                        errorBuilder: (ctx, err, stack) => const SizedBox(width: 15),
                                      ),
                                    ),
                                    const SizedBox(width: 6),
                                    Text(
                                      lang['name']!,
                                      style: const TextStyle(
                                        color: Color(0xFF94A3B8),
                                        fontSize: 11,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }).toList(),
                          ),

                          const SizedBox(height: 40),

                          // Modern Glowing Progress Bar
                          SizedBox(
                            width: 220,
                            child: Column(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: LinearProgressIndicator(
                                    value: _progressValue,
                                    minHeight: 5,
                                    backgroundColor: const Color(0xFF1E293B),
                                    valueColor: const AlwaysStoppedAnimation<Color>(
                                      Color(0xFF6366F1),
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 12),
                                AnimatedSwitcher(
                                  duration: const Duration(milliseconds: 300),
                                  child: Text(
                                    _statusText,
                                    key: ValueKey<String>(_statusText),
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.65),
                                      fontSize: 11,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // 3. Bottom Version & Powered By
          Positioned(
            bottom: 24,
            left: 0,
            right: 0,
            child: Center(
              child: Text(
                'Powered by Gemini AI • v1.0.0',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.3),
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                  letterSpacing: 0.5,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

