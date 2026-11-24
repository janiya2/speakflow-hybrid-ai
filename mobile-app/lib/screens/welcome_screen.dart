import 'home_screen.dart';
import '../services/auth_session_service.dart';
import 'package:flutter/material.dart';
import 'login_screen.dart';
import 'terms_policy_screen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  void _navigateToLogin(BuildContext context, {bool isDirectLogin = false}) {
    Navigator.of(context).push(
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 400),
        pageBuilder: (context, animation, secondaryAnimation) => LoginScreen(
          startInLoginMode: isDirectLogin,
        ),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          const begin = Offset(1.0, 0.0);
          const end = Offset.zero;
          const curve = Curves.easeInOutCubic;
          final tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
          return SlideTransition(position: animation.drive(tween), child: child);
        },
      ),
    );
  }

  void _openTerms(BuildContext context, int tabIndex) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => TermsAndPrivacyScreen(initialTabIndex: tabIndex),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight - 32),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // 1. TOP HEADLINE
                    Column(
                      children: [
                        const SizedBox(height: 12),
                        const Text(
                          "Let's Make Language\nLearning Simple and",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Color(0xFF1E293B),
                            fontSize: 27,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -0.5,
                            height: 1.25,
                          ),
                        ),
                        const SizedBox(height: 4),
                        ShaderMask(
                          shaderCallback: (bounds) => const LinearGradient(
                            colors: [Color(0xFFF59E0B), Color(0xFFD97706), Color(0xFFF97316)],
                            begin: Alignment.centerLeft,
                            end: Alignment.centerRight,
                          ).createShader(bounds),
                          child: const Text(
                            "Keep Growing Every Day",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 27,
                              fontWeight: FontWeight.w900,
                              letterSpacing: -0.5,
                              height: 1.2,
                            ),
                          ),
                        ),
                      ],
                    ),

                    // 2. HERO IMAGE (3D Robot Tutor)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: Stack(
                        alignment: Alignment.bottomCenter,
                        children: [
                          // Soft Ambient Halo
                          Container(
                            width: size.width * 0.75,
                            height: size.width * 0.75,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: RadialGradient(
                                colors: [
                                  const Color(0xFF38BDF8).withOpacity(0.12),
                                  const Color(0xFF6366F1).withOpacity(0.06),
                                  Colors.transparent,
                                ],
                              ),
                            ),
                          ),
                          // Hero Image with smooth organic all-side vignette (No box edges!)
                          SizedBox(
                            width: constraints.maxWidth * 0.88,
                            height: constraints.maxHeight * 0.44,
                            child: ShaderMask(
                              shaderCallback: (rect) {
                                return const RadialGradient(
                                  center: Alignment(0.0, -0.05),
                                  radius: 0.85,
                                  colors: [
                                    Colors.black,
                                    Colors.black,
                                    Colors.transparent,
                                  ],
                                  stops: [0.0, 0.70, 1.0],
                                ).createShader(rect);
                              },
                              blendMode: BlendMode.dstIn,
                              child: Image.asset(
                                'assets/images/robot_tutor_welcome.png',
                                fit: BoxFit.contain,
                                alignment: Alignment.topCenter,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                    // 3. TRUST & ESSENTIAL BADGES (Matching screenshot laurel wreaths)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Badge 1: 5 Stars Trusted AI-Tutor App
                          Expanded(
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text('🌿', style: TextStyle(fontSize: 20)),
                                const SizedBox(width: 4),
                                Column(
                                  children: [
                                    Row(
                                      children: List.generate(
                                        5,
                                        (i) => const Icon(
                                          Icons.star_rounded,
                                          color: Color(0xFFF59E0B),
                                          size: 14,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    const Text(
                                      'Trusted\nAI-Tutor App',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        color: Color(0xFF1E293B),
                                        fontSize: 11,
                                        fontWeight: FontWeight.w700,
                                        height: 1.15,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(width: 4),
                                Transform.flip(
                                  flipX: true,
                                  child: const Text('🌿', style: TextStyle(fontSize: 20)),
                                ),
                              ],
                            ),
                          ),

                          Container(
                            height: 38,
                            width: 1,
                            color: Colors.grey.withOpacity(0.2),
                          ),

                          // Badge 2: 2026 Essential Language Learning App
                          Expanded(
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text('🌿', style: TextStyle(fontSize: 20)),
                                const SizedBox(width: 4),
                                Column(
                                  children: const [
                                    Text(
                                      '2026',
                                      style: TextStyle(
                                        color: Color(0xFFF59E0B),
                                        fontSize: 14,
                                        fontWeight: FontWeight.w900,
                                      ),
                                    ),
                                    SizedBox(height: 2),
                                    Text(
                                      'Essential Language\nLearning App',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        color: Color(0xFF1E293B),
                                        fontSize: 11,
                                        fontWeight: FontWeight.w700,
                                        height: 1.15,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(width: 4),
                                Transform.flip(
                                  flipX: true,
                                  child: const Text('🌿', style: TextStyle(fontSize: 20)),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 16),

                    // 4. ACTION BUTTONS & FOOTER
                    Column(
                      children: [
                        // Continue Button (Vibrant Blue/Indigo)
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: ElevatedButton(
                            onPressed: () => _navigateToLogin(context),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF4361EE),
                              foregroundColor: Colors.white,
                              elevation: 2,
                              shadowColor: const Color(0xFF4361EE).withOpacity(0.4),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                            ),
                            child: const Text(
                              'Continue',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.3,
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 10),

                        // ⚡ 1-Click Judge Instant Demo Access
                        SizedBox(
                          width: double.infinity,
                          height: 52,
                          child: InkWell(
                            onTap: () async {
                              await AuthSessionService.restoreOrEnsureSession();
                              if (context.mounted) {
                                Navigator.of(context).pushReplacement(
                                  MaterialPageRoute(builder: (_) => const HomeScreen()),
                                );
                              }
                            },
                            borderRadius: BorderRadius.circular(16),
                            child: Container(
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(
                                  colors: [Color(0xFFFEF3C7), Color(0xFFFDE68A)],
                                ),
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: const Color(0xFFF59E0B), width: 1.2),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(0xFFF59E0B).withOpacity(0.18),
                                    blurRadius: 10,
                                    offset: const Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(5),
                                    decoration: const BoxDecoration(
                                      color: Color(0xFFD97706),
                                      shape: BoxShape.circle,
                                    ),
                                    child: const Icon(Icons.bolt, color: Colors.white, size: 14),
                                  ),
                                  const SizedBox(width: 8),
                                  const Text(
                                    '⚡ 1-Click Judge Instant Demo Access',
                                    style: TextStyle(
                                      color: Color(0xFF78350F),
                                      fontWeight: FontWeight.w800,
                                      fontSize: 13,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 12),

                        // Already have an account? Log In
                        GestureDetector(
                          onTap: () => _navigateToLogin(context, isDirectLogin: true),
                          child: RichText(
                            text: const TextSpan(
                              style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
                              children: [
                                TextSpan(text: 'Already have an account? '),
                                TextSpan(
                                  text: 'Log In',
                                  style: TextStyle(
                                    color: Color(0xFF4361EE),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        const SizedBox(height: 14),

                        // Terms and Privacy Footer
                        Wrap(
                          alignment: WrapAlignment.center,
                          children: [
                            Text(
                              'By continuing to use the app, you agree to our ',
                              style: TextStyle(
                                fontSize: 10,
                                color: Colors.grey.shade500,
                              ),
                            ),
                            GestureDetector(
                              onTap: () => _openTerms(context, 0),
                              child: const Text(
                                'Terms of Service',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Color(0xFF4361EE),
                                  decoration: TextDecoration.underline,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                            Text(
                              ' & ',
                              style: TextStyle(
                                fontSize: 10,
                                color: Colors.grey.shade500,
                              ),
                            ),
                            GestureDetector(
                              onTap: () => _openTerms(context, 1),
                              child: const Text(
                                'Privacy Policy',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Color(0xFF4361EE),
                                  decoration: TextDecoration.underline,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                            Text(
                              '.',
                              style: TextStyle(
                                fontSize: 10,
                                color: Colors.grey.shade500,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

