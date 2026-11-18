import 'package:flutter/material.dart';

class TermsAndPrivacyScreen extends StatefulWidget {
  final int initialTabIndex; // 0 for Terms, 1 for Privacy

  const TermsAndPrivacyScreen({
    super.key,
    this.initialTabIndex = 0,
  });

  @override
  State<TermsAndPrivacyScreen> createState() => _TermsAndPrivacyScreenState();
}

class _TermsAndPrivacyScreenState extends State<TermsAndPrivacyScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
      length: 2,
      vsync: this,
      initialIndex: widget.initialTabIndex,
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white, size: 20),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          'Legal Documentation',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: const Color(0xFF6366F1),
          indicatorWeight: 3,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white54,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          tabs: const [
            Tab(text: 'Terms of Service'),
            Tab(text: 'Privacy Policy'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Quick Search & Date Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: const Color(0xFF1E293B).withOpacity(0.5),
            child: Row(
              children: [
                Expanded(
                  child: Container(
                    height: 40,
                    decoration: BoxDecoration(
                      color: const Color(0xFF0F172A),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: Colors.white12),
                    ),
                    child: TextField(
                      controller: _searchController,
                      style: const TextStyle(color: Colors.white, fontSize: 13),
                      decoration: InputDecoration(
                        hintText: 'Search terms, voice data, privacy clauses...',
                        hintStyle: TextStyle(color: Colors.white.withOpacity(0.35), fontSize: 12),
                        prefixIcon: const Icon(Icons.search, color: Colors.white38, size: 18),
                        border: InputBorder.none,
                        contentPadding: const EdgeInsets.only(top: 8),
                      ),
                      onChanged: (val) {
                        setState(() {
                          _searchQuery = val.trim().toLowerCase();
                        });
                      },
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF6366F1).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.3)),
                  ),
                  child: const Text(
                    'Nov 2026',
                    style: TextStyle(
                      color: Color(0xFFA5B4FC),
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Content TabViews
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildTermsOfServiceContent(),
                _buildPrivacyPolicyContent(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTermsOfServiceContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeroHeader(
            title: 'Terms of Service',
            subtitle: 'SpeakFlow AI Language Practice & Voice Coaching Platform',
            effectiveDate: 'November 1, 2026',
            version: 'Version 2.4.0',
          ),
          const SizedBox(height: 24),

          _buildSection(
            number: '1',
            title: 'Acceptance of Terms & Legally Binding Agreement',
            content:
                'Welcome to SpeakFlow AI (the "Application," "Service," "Platform," "We," "Us," or "Our"). By downloading, installing, registering an account with, accessing, or otherwise using this mobile application and its associated web interfaces, backends, APIs, and voice synthesis services, you ("User," "Student," "You," or "Your") irrevocably agree to be bound by every term, condition, guideline, and covenant contained within this Terms of Service agreement ("Terms").\n\n'
                'IF YOU DO NOT AGREE WITH ANY PROVISION OR COVENANT STATED HEREIN, YOU MUST NOT DOWNLOAD, INSTALL, REGISTER, OR USE THE SERVICE IN ANY MANNER, AND YOU MUST IMMEDIATELY UNINSTALL AND DELETE ALL COPIES OF THE MOBILE APPLICATION FROM YOUR PERSONAL HARDWARE DEVICES.\n\n'
                'These Terms constitute a legally enforceable digital contract between you and the operators of SpeakFlow AI. Your continuous or repeated use of our real-time voice coaching engines, conversational drills, speech recognition tools, pronunciation grading modules, and related software features constitutes conclusive legal evidence of your unreserved acceptance of these Terms as updated from time to time.',
          ),

          _buildSection(
            number: '2',
            title: 'Eligibility, Age Verification & Account Responsibility',
            content:
                '2.1 Minimum Age Requirements:\n'
                'The Service is engineered exclusively for individuals who are at least thirteen (13) years of age, or sixteen (16) years of age if residing within the European Economic Area (EEA), the United Kingdom, or jurisdictions where statutory data protection law imposes higher thresholds. If you are between the ages of thirteen (13) and eighteen (18) (or the age of legal majority in your territory), you represent and warrant that you have obtained the explicit affirmative consent of a parent or legal guardian who has read, understood, and agreed to these Terms on your behalf.\n\n'
                '2.2 Account Credentials & Confidentiality:\n'
                'To unlock interactive conversational calls and save continuous learning streaks, grammar corrections, and fluency benchmarks, you must establish an authenticated user account. You agree to provide accurate, truthful, current, and complete registration information (including valid email addresses) and promptly update such information whenever changes occur. You are solely and comprehensively responsible for maintaining the strict confidentiality of your account login credentials, passwords, authentication tokens, and PINs. Any activity, session, voice call, data exchange, or purchase initiated under your account shall be conclusively attributed to you.\n\n'
                '2.3 Account Security & Unauthorized Access:\n'
                'You agree to notify SpeakFlow AI technical support immediately upon discovering any unauthorized entry, breach of security, credential harvesting, or suspicious account compromise. SpeakFlow AI shall not be liable for any loss, damages, data destruction, or consequential liabilities arising from your failure to protect your login identifiers.',
          ),

          _buildSection(
            number: '3',
            title: 'AI Voice Coaching Technology & Realistic Conversational Disclaimers',
            content:
                '3.1 Generative AI Coaches Are Not Human Beings:\n'
                'You explicitly acknowledge, comprehend, and agree that all coaches, tutors, conversation partners, avatars, simulated speakers, and interactive voices made available through SpeakFlow AI (including personas styled as Marcus, David, Sarah, Elena, Keita, or others) are entirely synthetic, artificial intelligence software algorithms powered by multimodal Large Language Models (LLMs) and automated text-to-speech synthesis engines. None of our coaches are living human beings, certified educators, licensed speech pathologists, accredited linguists, or human conversational agents.\n\n'
                '3.2 Nature of Generative Outputs & Hallucinations:\n'
                'While our generative models are meticulously prompted and calibrated to deliver high-quality conversational practice, grammatical corrections, and native idioms, generative AI systems inherently possess non-deterministic characteristics. Outputs may occasionally contain factual inaccuracies, grammatical ambiguities, unusual syntactical formulations, contextual misunderstandings, or conversational hallucinations. SpeakFlow AI makes no warranty or representation that every correction, explanation, or linguistic analysis is linguistically infallible, legally authoritative, or academically certified.\n\n'
                '3.3 Pronunciation Scoring & Fluency Scoring Metrics:\n'
                'All pronunciation ratings, drill evaluations, composite grades (e.g., A, B, C, D, F), fluency percentages, and accuracy scores displayed within the app are calculated algorithmically via acoustic phoneme matching, automated speech recognition heuristics, and statistical metrics. These scores are designed solely for personal gamification, encouragement, and self-directed practice, and must not be used as official language certifications (such as IELTS, TOEFL, JLPT, DELE, or CEFR equivalents).',
          ),

          _buildSection(
            number: '4',
            title: 'Microphone Permissions, Audio Capture & Speech-to-Text Operations',
            content:
                '4.1 Operating System Microphone Authorization:\n'
                'The core feature of SpeakFlow AI is hands-free, real-time spoken conversation. To participate in interactive calls, you must grant the Application explicit hardware access to your device microphone via Android, iOS, or web browser permission dialogues. You retain the ability to revoke this permission at any moment through your device hardware settings, with the understanding that revoking microphone access will render the voice call and pronunciation drill features completely inoperative.\n\n'
                '4.2 Real-Time Audio Streaming & Processing:\n'
                'When you initiate a live call session, the Application activates the microphone and converts your audible speech into phonetic and textual data using on-device or cloud-assisted automated speech recognition (ASR) engines. Audio input is captured and analyzed strictly for the ephemeral purposes of converting your words into text, evaluating spoken accuracy, and feeding transcripts into the AI dialogue generator.\n\n'
                '4.3 Microphone Always-On / Mute Functionality:\n'
                'During an active voice call, the speech recognition service operates in a continuous active listening state between bot utterances so that you may speak naturally without requiring physical "press-and-hold" button mechanics. You may pause audio reception at any point during a call by tapping the on-screen "Mute" button. We do not covertly record audio in the background when the Application is closed, minimized, or when a voice call is not actively running.',
          ),

          _buildSection(
            number: '5',
            title: 'User Conduct, Community Integrity & Acceptable Use Policy',
            content:
                'You agree to use SpeakFlow AI exclusively for lawful, constructive, and legitimate educational purposes. You agree that you shall NOT, under any circumstance:\n\n'
                'a) Speak, upload, input, transmit, or generate any text or audio containing hate speech, violent threats, racial or religious slurs, sexually explicit content, obscenities, harassment, defamation, or content intended to intimidate or degrade any individual or group;\n'
                'b) Attempt to trick, jailbreak, prompt-inject, exploit, or bypass the safety filters, safety classifiers, or operational parameters of the underlying AI language models;\n'
                'c) Intercept, reverse engineer, decompile, disassemble, scrape, decipher, or extract source code, neural network prompts, proprietary algorithmic weights, or architectural designs from the mobile client or backend APIs;\n'
                'd) Use automated bots, headless emulators, spider scripts, or automated audio injection tools to generate artificial call traffic, farm credits, or artificially inflate session metrics;\n'
                'e) Impersonate any person, business entity, representative, or official of SpeakFlow AI or its parent company;\n'
                'f) Utilize the platform to transmit unsolicited commercial communications, promotional materials, pyramid schemes, or digital spam;\n'
                'g) Introduce malware, viruses, worms, Trojan horses, ransomware, or malicious payloads designed to disrupt, degrade, or overload our servers and cloud hosting infrastructure.\n\n'
                'SpeakFlow AI reserves the unfettered, unilateral right to suspend, terminate, or permanently ban any user account found to have violated these standards without prior notice and without liability for refund.',
          ),

          _buildSection(
            number: '6',
            title: 'Intellectual Property, Trademarks & Proprietary Rights',
            content:
                '6.1 Exclusive Ownership of Application Assets:\n'
                'All intellectual property rights, titles, and interests in and to SpeakFlow AI—including but not limited to the source code, object code, UI/UX designs, animations, graphic illustrations, 3D app icons, audio sound effects, coach persona profiles, starter scenarios, drill curricula, database structures, trademarks, service marks, and commercial branding—are and shall remain the exclusive proprietary property of SpeakFlow AI and its licensors.\n\n'
                '6.2 Limited Non-Exclusive License:\n'
                'Subject to your full and continuous compliance with these Terms, SpeakFlow AI grants you a revocable, non-exclusive, non-transferable, non-sublicensable, limited personal license to download, install, and execute the mobile client on personal devices owned or controlled by you solely for your non-commercial, personal educational enrichment. No right, title, or ownership interest is conveyed to you through your download or operation of the software.\n\n'
                '6.3 Feedback & Recommendations:\n'
                'If you submit comments, suggestions, feature ideas, error reports, or feedback regarding the Application ("Feedback"), you hereby grant SpeakFlow AI a perpetual, worldwide, irrevocable, royalty-free, fully transferable, and sublicensable license to utilize, adopt, implement, modify, publish, and commercialize such Feedback without any compensation, attribution, or accounting to you.',
          ),

          _buildSection(
            number: '7',
            title: 'Subscriptions, Billing, In-App Purchases & Refund Policies',
            content:
                '7.1 Free Tier and Premium Upgrades:\n'
                'SpeakFlow AI may offer free access tiers alongside optional premium subscriptions ("SpeakFlow Pro" or "Unlimited Voice"). The specific entitlements, voice call durations, advanced coach personas, and offline modules included in each tier are outlined on our official in-app subscription screens.\n\n'
                '7.2 App Store & Google Play In-App Transactions:\n'
                'All subscription billing, recurring transactions, trial periods, and payment processing are handled exclusively through the respective app distribution marketplace (e.g., Apple App Store, Google Play Store). Payment terms, credit card authorization, currency conversion rates, and sales taxes are governed directly by the terms of service of the relevant platform store.\n\n'
                '7.3 Automatic Renewal & Cancellation:\n'
                'Unless explicitly cancelled at least twenty-four (24) hours prior to the conclusion of the active billing cycle or free trial period, subscriptions will renew automatically at the then-current standard rate. You may manage, modify, or cancel your subscription at any time through your Google Play Store or Apple App Store Account Settings. SpeakFlow AI cannot directly modify, cancel, or refund subscriptions managed by third-party application marketplaces.\n\n'
                '7.4 Refund Policy:\n'
                'Except where statutory consumer protection law mandates otherwise, all subscription fees, in-app purchases, and token credits are strictly non-refundable. If you believe a billing error occurred within the Google Play Store or Apple App Store, you must submit a formal refund claim directly to the appropriate marketplace operator pursuant to their published refund regulations.',
          ),

          _buildSection(
            number: '8',
            title: 'Disclaimer of Warranties ("AS IS" & "AS AVAILABLE")',
            content:
                'TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE SERVICE, APPLICATION, REAL-TIME VOICE RECOGNITION, AI COACH RESPONSES, PRONUNCIATION ANALYTICS, AND ALL ACCOMPANYING CONTENT ARE DELIVERED STRICTLY ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.\n\n'
                'SPEAKFLOW AI AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, NON-INFRINGEMENT, AND QUIET ENJOYMENT.\n\n'
                'WE DO NOT WARRANT THAT: (A) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, ACCURATE, OR ERROR-FREE; (B) DEFECTS OR SYNTACTICAL ANOMALIES IN THE GENERATIVE AI WILL BE CORRECTED; (C) THE SERVER INFRASTRUCTURE IS ENTIRELY FREE OF VIRUSES, NETWORK PACKET LOSS, OR LATENCY JITTER; OR (D) USING THE SERVICE WILL ENSURE PROFICIENCY, EXAM SUCCESS, OR FLUENCY IN ANY FOREIGN LANGUAGE. YOUR RELIANCE ON ANY SPEECH CORRECTION OR BOT STATEMENT IS AT YOUR SOLE AND EXCLUSIVE RISK.',
          ),

          _buildSection(
            number: '9',
            title: 'Limitation of Liability & Maximum Damages Cap',
            content:
                'UNDER NO CIRCUMSTANCES SHALL SPEAKFLOW AI, ITS PARENT ENTITIES, SUBSIDIARIES, DIRECTORS, OFFICERS, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES WHATSOEVER (INCLUDING DAMAGES FOR LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF GOODWILL, LOSS OF DATA, DEVICE MALFUNCTION, WORK STOPPAGE, OR EMOTIONAL DISTRESS) ARISING OUT OF OR IN CONNECTION WITH THE USE OF OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.\n\n'
                'IN NO EVENT SHALL OUR AGGREGATE CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS, DISPUTES, OR LIABILITIES ARISING UNDER THESE TERMS OR RELATING TO THE SERVICE EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO SPEAKFLOW AI FOR THE SERVICE DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE OCCURRENCE GIVING RISE TO LIABILITY, OR (B) FIFTY UNITED STATES DOLLARS (\$50.00 USD).\n\n'
                'SOME JURISDICTIONS DO NOT PERMIT THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF SUCH LAWS APPLY TO YOU, CERTAIN OR ALL OF THE ABOVE EXCLUSIONS OR LIMITATIONS MAY NOT APPLY, AND YOU MAY POSSESS ADDITIONAL STATUTORY RIGHTS.',
          ),

          _buildSection(
            number: '10',
            title: 'Indemnification Obligations',
            content:
                'You agree to defend, indemnify, and hold harmless SpeakFlow AI, its parent companies, affiliates, directors, officers, employees, contractors, agents, and licensors from and against any and all claims, lawsuits, demands, damages, liabilities, losses, judgments, settlements, costs, and expenses (including reasonable attorneys\' fees and legal disbursements) arising out of or resulting from:\n\n'
                'a) Your breach, violation, or non-observance of any provision of these Terms;\n'
                'b) Any audio content, speech statements, or materials spoken or submitted by you during live practice calls;\n'
                'c) Your infringement, misappropriation, or violation of any third-party intellectual property, privacy, or publicity right;\n'
                'd) Your unlawful, fraudulent, or abusive utilization of the Application;\n'
                'e) Any willful misconduct or gross negligence attributable to your account.',
          ),

          _buildSection(
            number: '11',
            title: 'Dispute Resolution, Mandatory Binding Arbitration & Class Action Waiver',
            content:
                '11.1 Informal Resolution Requirement:\n'
                'Prior to filing any formal legal proceeding or arbitration against SpeakFlow AI, you agree to make a good-faith effort to resolve the dispute informally by emailing a detailed written notice of dispute to legal@speakflow.ai. Both parties shall engage in good-faith negotiations for a minimum period of thirty (30) days from receipt of such notice.\n\n'
                '11.2 Mandatory Binding Arbitration:\n'
                'If an informal resolution cannot be achieved within thirty (30) days, any controversy, dispute, or claim arising out of or relating to these Terms or the breach thereof shall be resolved exclusively through final and binding arbitration administered by a recognized arbitration tribunal in accordance with its commercial dispute rules. The arbitration shall be conducted in the English language.\n\n'
                '11.3 CLASS ACTION WAIVER:\n'
                'YOU AND SPEAKFLOW AI EXPRESSLY AGREE THAT ALL DISPUTES MUST BE RESOLVED ON AN INDIVIDUAL BASIS ONLY, AND NEITHER PARTY SHALL COMMENCE, PARTICIPATE IN, OR ACT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION, COLLECTIVE PROCEEDING, PRIVATE ATTORNEY GENERAL ACTION, OR REPRESENTATIVE LITIGATION.',
          ),

          _buildSection(
            number: '12',
            title: 'Governing Law, Jurisdiction, Severability & Entire Agreement',
            content:
                '12.1 Governing Law:\n'
                'These Terms shall be interpreted, construed, and enforced in accordance with the substantive laws of the jurisdiction in which SpeakFlow AI\'s primary operating headquarters is established, without regard to conflict of law principles or the United Nations Convention on Contracts for the International Sale of Goods (CISG).\n\n'
                '12.2 Severability:\n'
                'If any covenant, condition, or clause of these Terms is determined by a court of competent jurisdiction to be invalid, illegal, void, or unenforceable, such provision shall be severed or modified to the minimum extent necessary, and the remaining provisions shall continue in full force and legal efficacy.\n\n'
                '12.3 Entire Agreement:\n'
                'These Terms, together with our Privacy Policy and any official subscription notices published inside the Application, constitute the complete, entire, and exclusive agreement between you and SpeakFlow AI concerning the subject matter hereof, superceding all prior oral or written discussions, agreements, or understandings.',
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildPrivacyPolicyContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeroHeader(
            title: 'Privacy Policy',
            subtitle: 'Voice Data Protection, Encryption, & Information Governance',
            effectiveDate: 'November 1, 2026',
            version: 'GDPR / CCPA / CalOPPA Compliant (v2.4)',
          ),
          const SizedBox(height: 24),

          _buildSection(
            number: '1',
            title: 'Our Privacy Philosophy & Transparent Data Governance',
            content:
                'At SpeakFlow AI, your privacy, vocal integrity, and personal trust form the cornerstone of our engineering philosophy. We understand that practicing a spoken language requires vulnerability, spontaneity, and comfort. Therefore, we design our systems with strict privacy-by-design standards.\n\n'
                'This Privacy Policy transparently articulates how SpeakFlow AI collects, processes, encrypts, caches, transmits, and protects your information whenever you interact with our mobile application, real-time voice calls, automated speech recognition pipelines, and administrative interfaces. We never sell your personal contact information, biometric voiceprints, or conversational recordings to third-party data brokers, marketing networks, or unsolicited commercial entities.',
          ),

          _buildSection(
            number: '2',
            title: 'Categories of Information We Collect',
            content:
                '2.1 Account & Identity Data:\n'
                'When you register an account, authenticate via Google Sign-In, or log in using email credentials, we collect identifying details including your name, email address, unique Firebase User Identifier (UID), account creation timestamp, and optional avatar URL.\n\n'
                '2.2 Audio Inputs & Spoken Conversational Transcripts:\n'
                'During active live practice calls, our speech recognition module processes your spoken voice to generate real-time text transcripts ("User Utterances"). We analyze these text segments to formulate contextual AI responses, detect grammatical missteps, and evaluate pronunciation quality.\n\n'
                '2.3 Learning Progress & Fluency Analytics:\n'
                'To track your improvement over time, we store structured session metadata including: call duration, target language practiced (English, Japanese, Korean, Spanish, Arabic, or Tamil), selected coach persona, fluency percentage, grammatical accuracy score, target phrases repeated, and session timestamps in secure cloud databases.\n\n'
                '2.4 Device & Telemetry Data:\n'
                'We automatically collect non-biometric diagnostic information, including your mobile device model, operating system version, client application version, device locale, network connection type (Wi-Fi or Cellular), and anonymized crash logs to troubleshoot audio stream stability.',
          ),

          _buildSection(
            number: '3',
            title: 'How We Process Voice & Speech Data During Live Calls',
            content:
                '3.1 Ephemeral Voice Recognition:\n'
                'Audio recorded during a conversation is streamed in real time to automated speech-to-text engines (such as on-device speech recognizers or Google Speech APIs) for instantaneous transcription into text characters. We DO NOT maintain persistent, permanent raw voice archives of your complete conversations for public broadcasting or surveillance.\n\n'
                '3.2 No Biometric Identification or Voiceprinting:\n'
                'SpeakFlow AI does NOT extract biometric voiceprints, vocal geometry, vocal cord frequency mapping, or physical biological identifiers from your speech. Your voice is utilized solely as an acoustic medium to identify conversational words and phoneme accuracy for language learning.\n\n'
                '3.3 Text-to-Speech Output Generation:\n'
                'When the AI coach speaks to you, the text generated by the language model is converted into clear spoken audio through native device TTS voices or secure Google Cloud Text-to-Speech audio streams. These audio streams are buffered ephemerally in memory to play over your device speaker and discarded upon completion of playback.',
          ),

          _buildSection(
            number: '4',
            title: 'Purposes for Which We Process Your Personal Information',
            content:
                'We process your information strictly for the following lawful business and operational objectives:\n\n'
                'a) Delivering Core Educational Services: Facilitating real-time audio phone conversations with synthetic AI coaches in 6 global languages;\n'
                'b) Grammatical Correction & Drills: Analyzing your sentence structure to identify grammatical mistakes, formulate instant corrections, and deliver active pronunciation drills;\n'
                'c) Progress Tracking & Dashboard Analytics: Generating personal scorecards, fluency trends, daily streak badges, and historical session logs;\n'
                'd) Account Authentication & Security: Authenticating authorized users, preventing brute-force logins, and securing student accounts;\n'
                'e) Platform Optimization & Bug Remediation: Diagnosing latency bottlenecks, audio buffer underruns, and speech recognition anomalies;\n'
                'f) Customer Support: Responding to user inquiries, resolving technical glitches, and fulfilling data subject access requests;\n'
                'g) Regulatory Compliance: Satisfying applicable legal duties, statutory bookkeeping requirements, and responding to lawful judicial orders.',
          ),

          _buildSection(
            number: '5',
            title: 'Third-Party Processors & Sub-Contracted Infrastructure',
            content:
                'SpeakFlow AI collaborates with industry-leading cloud infrastructure providers to deliver high-availability, low-latency voice practice. Our primary technical sub-processors include:\n\n'
                '1) Google Cloud Platform & Firebase (Google LLC):\n'
                'Hosts our primary user authentication (Firebase Auth), real-time database storage (Cloud Firestore), and Google Cloud Speech & Gemini AI conversational pipelines under enterprise data privacy and security agreements;\n\n'
                '2) Apple App Store & Google Play Services:\n'
                'Processes in-app subscription payments, billing credentials, and application updates pursuant to their independent privacy standards;\n\n'
                'All third-party sub-processors are vetted for stringent information security standards (SOC 2, ISO 27001, GDPR Data Processing Addendums) and are contractually prohibited from using your personal data for their independent commercial or advertising purposes.',
          ),

          _buildSection(
            number: '6',
            title: 'Data Retention & Account Deletion Policy',
            content:
                '6.1 Retention of Session History:\n'
                'We retain your account profile and learning records (session duration, scores, and grammar correction summaries) for as long as your account remains active, so you can track your educational evolution over months and years.\n\n'
                '6.2 Complete Account Deletion (Right to Be Forgotten):\n'
                'You possess the absolute statutory right to request the permanent deletion of your account and all associated data at any time. You may initiate account deletion directly from the mobile application settings or by contacting privacy@speakflow.ai. Upon receipt of a verified deletion request, all personal data, email records, and session histories will be permanently wiped from our active databases within thirty (30) days, except where statutory legal retention obligations apply.',
          ),

          _buildSection(
            number: '7',
            title: 'Global Data Protection Rights (GDPR & UK GDPR)',
            content:
                'If you are located within the European Economic Area (EEA), Switzerland, or the United Kingdom, you enjoy specific statutory rights under the General Data Protection Regulation (GDPR):\n\n'
                '• Right of Access: You may request confirmation of whether we process your personal data and obtain a copy of such data;\n'
                '• Right to Rectification: You may request the correction of inaccurate or incomplete personal information;\n'
                '• Right to Erasure: You may request the deletion of your personal data ("Right to be Forgotten");\n'
                '• Right to Restriction of Processing: You may restrict our processing of your personal information under certain circumstances;\n'
                '• Right to Data Portability: You may request your data in a structured, commonly used, and machine-readable format;\n'
                '• Right to Object: You may object at any time to the processing of your personal data based on legitimate interests;\n'
                '• Right to Withdraw Consent: Where processing relies on consent, you may withdraw your consent at any time without affecting the lawfulness of prior processing.\n\n'
                'To exercise any of these rights, email our Data Protection Office at dpo@speakflow.ai.',
          ),

          _buildSection(
            number: '8',
            title: 'California & United States State Privacy Rights (CCPA / CPRA)',
            content:
                'Under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), California residents are entitled to specific disclosures regarding their personal information:\n\n'
                '• Right to Know: You may request disclosures regarding the categories and specific pieces of personal information we have collected, used, or disclosed over the prior 12 months;\n'
                '• Right to Delete: You may request the deletion of personal information collected from you;\n'
                '• Right to Correct: You may request the correction of inaccurate personal information;\n'
                '• Right to Non-Discrimination: We will never discriminate against you, deny you educational services, or charge you differing prices simply because you exercised your privacy rights;\n'
                '• DO NOT SELL OR SHARE MY PERSONAL INFORMATION: SpeakFlow AI does NOT sell your personal information, nor do we share your personal data for cross-context behavioral advertising.',
          ),

          _buildSection(
            number: '9',
            title: 'Data Security, Cryptographic Encryption & Safeguards',
            content:
                'We implement robust, state-of-the-art administrative, technical, and physical safeguards designed to shield your personal data and spoken transcripts from accidental loss, unauthorized access, destruction, alteration, or disclosure.\n\n'
                'All audio streams, API communications, and user authentication tokens are encrypted in transit across public networks using Transport Layer Security (TLS 1.3 / HTTPS). Data stored within our cloud databases is encrypted at rest using industry-standard Advanced Encryption Standard (AES-256) algorithms. Furthermore, access to backend database infrastructure is restricted through strict Role-Based Access Control (RBAC), multi-factor authentication (MFA), and automated intrusion detection monitoring.',
          ),

          _buildSection(
            number: '10',
            title: 'Children\'s Online Privacy Protection (COPPA Compliance)',
            content:
                'SpeakFlow AI does not knowingly solicit, collect, or process personal data from children under thirteen (13) years of age without prior verifiable parental consent. If we become aware that a child under thirteen (13) has submitted personal information or registered an account without verified parental authorization, we will promptly take steps to permanently delete such information from our records.\n\n'
                'If you are a parent or legal guardian and discover that your minor child has created an account or transmitted audio recordings through SpeakFlow AI without your consent, please contact us immediately at privacy@speakflow.ai so that we may enact swift remedial action.',
          ),

          _buildSection(
            number: '11',
            title: 'International Cross-Border Data Transfers',
            content:
                'SpeakFlow AI operates globally, and our server infrastructure, databases, and AI model clusters may be located in the United States, the European Union, or other international hosting centers. By using the Application, you consent to the transfer, storage, and processing of your information outside your country of residence, where data protection standards may differ from those in your local territory.\n\n'
                'When transferring personal data originating from the EEA or the United Kingdom, we rely on legally validated transfer mechanisms recognized by the European Commission, such as standard contractual clauses (SCCs) and binding corporate rules.',
          ),

          _buildSection(
            number: '12',
            title: 'Modifications to this Privacy Policy & Contact Information',
            content:
                'We may revise, amend, or update this Privacy Policy periodically to reflect technological advancements, new features, or legislative changes. When updates occur, we will revise the "Effective Date" at the top of this screen. For material modifications, we will provide conspicuous in-app notifications or send direct email notices before changes take effect.\n\n'
                'If you have questions, comments, concerns, or legal inquiries regarding our privacy practices or these terms, please contact our Legal and Privacy Department at:\n\n'
                'SpeakFlow AI Legal & Data Protection\n'
                'Email: privacy@speakflow.ai\n'
                'Legal Inquiries: legal@speakflow.ai\n'
                'Data Protection Officer: dpo@speakflow.ai\n'
                'Website: https://speakflow.ai/legal',
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildHeroHeader({
    required String title,
    required String subtitle,
    required String effectiveDate,
    required String version,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF1E293B),
            const Color(0xFF0F172A),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFF6366F1).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.gavel_rounded, color: Color(0xFF818CF8), size: 24),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    Text(
                      subtitle,
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.6),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 8,
            children: [
              _buildBadge(Icons.calendar_today, 'Effective: $effectiveDate'),
              _buildBadge(Icons.verified_outlined, version),
              _buildBadge(Icons.lock_outline, 'End-to-End TLS 1.3'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBadge(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.06),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: const Color(0xFFA5B4FC), size: 12),
          const SizedBox(width: 6),
          Text(
            label,
            style: const TextStyle(
              color: Color(0xFFCBD5E1),
              fontSize: 11,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSection({
    required String number,
    required String title,
    required String content,
  }) {
    // If search active, check if query matches
    if (_searchQuery.isNotEmpty &&
        !title.toLowerCase().contains(_searchQuery) &&
        !content.toLowerCase().contains(_searchQuery)) {
      return const SizedBox.shrink();
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withOpacity(0.6),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: const Color(0xFF6366F1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: Text(
                    number,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    height: 1.3,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(
            content,
            style: TextStyle(
              color: Colors.white.withOpacity(0.85),
              fontSize: 13,
              height: 1.6,
              letterSpacing: 0.15,
            ),
          ),
        ],
      ),
    );
  }
}

