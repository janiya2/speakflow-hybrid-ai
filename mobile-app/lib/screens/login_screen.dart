import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'terms_policy_screen.dart';
import 'welcome_screen.dart';
import '../services/notification_service.dart';

class LoginScreen extends StatefulWidget {
  final bool startInLoginMode;

  const LoginScreen({
    super.key,
    this.startInLoginMode = false,
  });

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  bool _isLogin = true;
  bool _isLoading = false;
  String _errorMessage = '';

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _isLogin = widget.startInLoginMode;
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  void _openTerms(BuildContext context, int tabIndex) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => TermsAndPrivacyScreen(initialTabIndex: tabIndex),
      ),
    );
  }

  Future<void> _submitAuth() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();
    final name = _nameController.text.trim();

    if (email.isEmpty || password.isEmpty || (!_isLogin && name.isEmpty)) {
      setState(() => _errorMessage = 'Please fill in all fields.');
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });

    try {
      UserCredential userCred;
      if (_isLogin) {
        userCred = await _auth.signInWithEmailAndPassword(
          email: email,
          password: password,
        );
      } else {
        userCred = await _auth.createUserWithEmailAndPassword(
          email: email,
          password: password,
        );
        await userCred.user?.updateDisplayName(name);
      }

      final user = userCred.user;
      if (user != null) {
        final userDocRef = _firestore.collection('lang_users').doc(user.uid);
        final doc = await userDocRef.get();
        if (!doc.exists) {
          await userDocRef.set({
            'email': user.email ?? email,
            'displayName': name.isNotEmpty ? name : (user.displayName ?? 'Student'),
            'createdAt': DateTime.now().toIso8601String(),
            'totalCalls': 0,
            'totalMinutes': 0,
            'averageScore': 0,
            'streak': 1,
            'targetLanguages': ['English', 'Japanese', 'Korean'],
          });
        }

        // Save FCM Device Token for Push Notifications
        NotificationService.instance.saveTokenForUser(user.uid);

        if (mounted) {
          // If modal sheet open, close it
          Navigator.of(context, rootNavigator: true).popUntil((route) => route.isFirst);
          Navigator.of(context).pushReplacementNamed('/home');
        }
      }
    } on FirebaseAuthException catch (e) {
      setState(() {
        _errorMessage = e.message ?? 'Authentication error occurred.';
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _signInWithGoogle() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });

    try {
      final GoogleAuthProvider googleProvider = GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');

      UserCredential userCred;
      if (kIsWeb) {
        userCred = await _auth.signInWithPopup(googleProvider);
      } else {
        userCred = await _auth.signInWithProvider(googleProvider);
      }

      final user = userCred.user;
      if (user != null) {
        final userDocRef = _firestore.collection('lang_users').doc(user.uid);
        final doc = await userDocRef.get();
        if (!doc.exists) {
          await userDocRef.set({
            'email': user.email,
            'displayName': user.displayName ?? 'Student',
            'photoURL': user.photoURL,
            'createdAt': DateTime.now().toIso8601String(),
            'totalCalls': 0,
            'totalMinutes': 0,
            'averageScore': 0,
            'streak': 1,
            'targetLanguages': ['English', 'Japanese', 'Korean'],
          });
        }

        // Save FCM Device Token for Push Notifications
        NotificationService.instance.saveTokenForUser(user.uid);

        if (mounted) {
          Navigator.of(context).pushReplacementNamed('/home');
        }
      }
    } on FirebaseAuthException catch (e) {
      setState(() {
        _errorMessage = e.message ?? 'Google Sign-In failed.';
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _showEmailAuthModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (modalContext, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(modalContext).viewInsets.bottom,
              ),
              child: Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                  boxShadow: [
                    BoxShadow(color: Colors.black12, blurRadius: 20, spreadRadius: 4),
                  ],
                ),
                padding: const EdgeInsets.fromLTRB(24, 16, 24, 28),
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Pull handle
                      Center(
                        child: Container(
                          width: 44,
                          height: 4,
                          decoration: BoxDecoration(
                            color: Colors.grey.shade300,
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                      const SizedBox(height: 18),

                      // Title
                      Text(
                        _isLogin ? 'Welcome Back!' : 'Create Your Account',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Color(0xFF1E293B),
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        _isLogin
                            ? 'Enter your credentials to continue your language practice'
                            : 'Sign up in seconds to save your progress & streaks',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                      ),
                      const SizedBox(height: 20),

                      // Error message if any
                      if (_errorMessage.isNotEmpty) ...[
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFEE2E2),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: const Color(0xFFFCA5A5)),
                          ),
                          child: Text(
                            _errorMessage,
                            style: const TextStyle(color: Color(0xFFDC2626), fontSize: 11),
                          ),
                        ),
                        const SizedBox(height: 14),
                      ],

                      // Full Name field (Register only)
                      if (!_isLogin) ...[
                        TextField(
                          controller: _nameController,
                          style: const TextStyle(
                            color: Color(0xFF0F172A),
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                          ),
                          cursorColor: const Color(0xFF4361EE),
                          decoration: InputDecoration(
                            labelText: 'Your Full Name',
                            labelStyle: TextStyle(color: Colors.grey.shade600),
                            prefixIcon: const Icon(Icons.person_outline, size: 20, color: Color(0xFF64748B)),
                            filled: true,
                            fillColor: const Color(0xFFF1F5F9),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: BorderSide(color: Colors.grey.shade300),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: BorderSide(color: Colors.grey.shade300),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(14),
                              borderSide: const BorderSide(color: Color(0xFF4361EE), width: 1.5),
                            ),
                          ),
                        ),
                        const SizedBox(height: 12),
                      ],

                      // Email Field
                      TextField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        style: const TextStyle(
                          color: Color(0xFF0F172A),
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                        cursorColor: const Color(0xFF4361EE),
                        decoration: InputDecoration(
                          labelText: 'Email Address',
                          labelStyle: TextStyle(color: Colors.grey.shade600),
                          prefixIcon: const Icon(Icons.mail_outline, size: 20, color: Color(0xFF64748B)),
                          filled: true,
                          fillColor: const Color(0xFFF1F5F9),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: const BorderSide(color: Color(0xFF4361EE), width: 1.5),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Password Field
                      TextField(
                        controller: _passwordController,
                        obscureText: true,
                        style: const TextStyle(
                          color: Color(0xFF0F172A),
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                        cursorColor: const Color(0xFF4361EE),
                        decoration: InputDecoration(
                          labelText: 'Password',
                          labelStyle: TextStyle(color: Colors.grey.shade600),
                          prefixIcon: const Icon(Icons.lock_outline, size: 20, color: Color(0xFF64748B)),
                          filled: true,
                          fillColor: const Color(0xFFF1F5F9),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: const BorderSide(color: Color(0xFF4361EE), width: 1.5),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Submit Button
                      SizedBox(
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _isLoading
                              ? null
                              : () async {
                                  await _submitAuth();
                                  setModalState(() {});
                                },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF4361EE),
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                            ),
                          ),
                          child: _isLoading
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(
                                    color: Colors.white,
                                    strokeWidth: 2,
                                  ),
                                )
                              : Text(
                                  _isLogin ? 'Sign In' : 'Create Account',
                                  style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Switch between Sign In / Sign Up
                      Center(
                        child: GestureDetector(
                          onTap: () {
                            final nextMode = !_isLogin;
                            setModalState(() {
                              _isLogin = nextMode;
                              _errorMessage = '';
                            });
                            setState(() {
                              _isLogin = nextMode;
                              _errorMessage = '';
                            });
                          },
                          child: RichText(
                            text: TextSpan(
                              style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                              children: [
                                TextSpan(
                                  text: _isLogin
                                      ? "Don't have an account? "
                                      : 'Already have an account? ',
                                ),
                                TextSpan(
                                  text: _isLogin ? 'Sign Up' : 'Log In',
                                  style: const TextStyle(
                                    color: Color(0xFF4361EE),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
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

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: const Color(0xFFF0F7FF),
      body: Stack(
        children: [
          // 1. Soft Sky Blue Organic Wave Backdrop (Matching Screenshot 2)
          Positioned.fill(
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Color(0xFFE0F2FE),
                    Color(0xFFBAE6FD),
                    Color(0xFFF0F9FF),
                    Colors.white,
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: [0.0, 0.45, 0.75, 1.0],
                ),
              ),
            ),
          ),

          // 2. Safe Area Content
          SafeArea(
            child: Column(
              children: [
                // TOP BAR: CLOSE (X) BUTTON
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A).withOpacity(0.08),
                          shape: BoxShape.circle,
                        ),
                        child: IconButton(
                          icon: const Icon(Icons.close_rounded, color: Color(0xFF334155), size: 22),
                          onPressed: () {
                            if (Navigator.of(context).canPop()) {
                              Navigator.of(context).pop();
                            } else {
                              // If cannot pop, return to WelcomeScreen
                              Navigator.of(context).pushReplacement(
                                MaterialPageRoute(builder: (_) => const WelcomeScreen()),
                              );
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                ),

                // HERO IMAGE & BOTTOM CARD
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      children: [
                        // Smiling Teacher Portrait (Matching Screenshot 2)
                        SizedBox(
                          height: size.height * 0.38,
                          child: ShaderMask(
                            shaderCallback: (rect) {
                              return const LinearGradient(
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                                colors: [Colors.black, Colors.black, Colors.transparent],
                                stops: [0.0, 0.78, 1.0],
                              ).createShader(rect);
                            },
                            blendMode: BlendMode.dstIn,
                            child: Image.asset(
                              'assets/images/teacher_login_hero.jpg',
                              fit: BoxFit.contain,
                              alignment: Alignment.topCenter,
                            ),
                          ),
                        ),

                        const SizedBox(height: 8),

                        // Brand Title: SpeakFlow (Stylized matching Screenshot 2)
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Text(
                              'speak',
                              style: TextStyle(
                                color: Color(0xFF38BDF8),
                                fontSize: 32,
                                fontWeight: FontWeight.w900,
                                letterSpacing: -0.5,
                              ),
                            ),
                            Text(
                              'flow',
                              style: TextStyle(
                                color: Color(0xFF1E3A8A),
                                fontSize: 32,
                                fontWeight: FontWeight.w900,
                                letterSpacing: -0.5,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 6),

                        // Subtitle
                        const Text(
                          'Create your account to save your progress',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Color(0xFF475569),
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),

                        const SizedBox(height: 24),

                        // Error Banner if any
                        if (_errorMessage.isNotEmpty) ...[
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                            decoration: BoxDecoration(
                              color: const Color(0xFFFEE2E2),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: const Color(0xFFFCA5A5)),
                            ),
                            child: Text(
                              _errorMessage,
                              textAlign: TextAlign.center,
                              style: const TextStyle(color: Color(0xFFB91C1C), fontSize: 12),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        // 1. PRIMARY BUTTON: Continue with email (Matching Screenshot 2)
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: ElevatedButton.icon(
                            onPressed: () => _showEmailAuthModal(context),
                            icon: const Icon(Icons.mail, size: 20, color: Colors.white),
                            label: const Text(
                              'Continue with email',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.2,
                              ),
                            ),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF4361EE),
                              foregroundColor: Colors.white,
                              elevation: 2,
                              shadowColor: const Color(0xFF4361EE).withOpacity(0.35),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 20),

                        // DIVIDER: ─────── or ───────
                        Row(
                          children: [
                            Expanded(child: Divider(color: Colors.grey.shade300, thickness: 1)),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 16),
                              child: Text(
                                'or',
                                style: TextStyle(
                                  color: Colors.grey.shade500,
                                  fontSize: 13,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                            Expanded(child: Divider(color: Colors.grey.shade300, thickness: 1)),
                          ],
                        ),

                        const SizedBox(height: 20),

                        // 2. SOCIAL BUTTON: Sign in with Google (Apple excluded per request)
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: OutlinedButton(
                            onPressed: _isLoading ? null : _signInWithGoogle,
                            style: OutlinedButton.styleFrom(
                              backgroundColor: Colors.white,
                              side: BorderSide(color: Colors.grey.shade300, width: 1.2),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                            ),
                            child: _isLoading
                                ? const SizedBox(
                                    width: 20,
                                    height: 20,
                                    child: CircularProgressIndicator(strokeWidth: 2),
                                  )
                                : Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      // Google 'G' Logo
                                      Image.network(
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png',
                                        width: 22,
                                        height: 22,
                                        errorBuilder: (ctx, err, stack) => const Text(
                                          'G',
                                          style: TextStyle(
                                            color: Color(0xFF4285F4),
                                            fontWeight: FontWeight.bold,
                                            fontSize: 20,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      const Text(
                                        'Sign in with Google',
                                        style: TextStyle(
                                          color: Color(0xFF1E293B),
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                          ),
                        ),

                        const SizedBox(height: 28),

                        // FOOTER: Terms of Service & Privacy Policy
                        Wrap(
                          alignment: WrapAlignment.center,
                          children: [
                            Text(
                              'By continuing to use the app, you agree to our ',
                              style: TextStyle(
                                fontSize: 10,
                                color: Colors.grey.shade600,
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
                                color: Colors.grey.shade600,
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
                                color: Colors.grey.shade600,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
