class PackageModel {
  final String id;
  final String name;
  final String description;
  final int minutes;
  final String price;
  final bool isMonthly;
  final String badge;
  final List<String> features;
  final bool isActive;

  const PackageModel({
    required this.id,
    required this.name,
    required this.description,
    required this.minutes,
    required this.price,
    this.isMonthly = false,
    this.badge = '',
    this.features = const [],
    this.isActive = true,
  });

  static String formatUsdPrice(String rawPrice) {
    final clean = rawPrice.trim();
    // 1. If it contains a USD pattern like $8.00 or $16.00 / mo or $14.99/mo
    final usdMatch = RegExp(r'\$([0-9]+(?:\.[0-9]{1,2})?)(?:\s*/\s*(?:mo|month))?', caseSensitive: false).firstMatch(clean);
    if (usdMatch != null) {
      final isMo = clean.toLowerCase().contains('/mo') || clean.toLowerCase().contains('/ month') || clean.toLowerCase().contains('month');
      final amount = usdMatch.group(1)!;
      return isMo ? '\$$amount/mo' : '\$$amount';
    }
    // 2. If it contains Rs or LKR
    if (clean.toLowerCase().contains('rs') || clean.toLowerCase().contains('lkr')) {
      final numMatch = RegExp(r'[0-9]+(?:\.[0-9]+)?').firstMatch(clean.replaceAll(',', ''));
      if (numMatch != null) {
        final val = double.tryParse(numMatch.group(0)!) ?? 1000;
        final usd = (val / 300).toStringAsFixed(2);
        final isMo = clean.toLowerCase().contains('mo') || clean.toLowerCase().contains('month');
        return isMo ? '\$$usd/mo' : '\$$usd';
      }
    }
    // 3. Fallback pure numeric
    final numOnly = RegExp(r'[0-9]+(?:\.[0-9]{1,2})?').firstMatch(clean);
    if (numOnly != null) {
      final isMo = clean.toLowerCase().contains('mo') || clean.toLowerCase().contains('month');
      return isMo ? '\$${numOnly.group(0)}/mo' : '\$${numOnly.group(0)}';
    }
    return '\$4.99';
  }

  factory PackageModel.fromFirestore(Map<String, dynamic> data, String id) {
    List<String> feats = [];
    if (data['features'] is List) {
      feats = (data['features'] as List).map((e) => e.toString()).toList();
    }
    return PackageModel(
      id: id,
      name: data['name'] ?? 'Speaking Package',
      description: data['description'] ?? 'Practice speaking with AI coaches',
      minutes: (data['minutes'] is num) ? (data['minutes'] as num).toInt() : 60,
      price: formatUsdPrice(data['price']?.toString() ?? '\$3.49'),
      isMonthly: data['isMonthly'] ?? false,
      badge: data['badge'] ?? '',
      features: feats,
      isActive: data['isActive'] ?? true,
    );
  }

  static List<PackageModel> get defaultPackages => const [
    PackageModel(
      id: 'topup_60',
      name: '60 Extra Minutes',
      description: 'Quick voice practice booster with instant activation.',
      minutes: 60,
      price: '\$3.49',
      isMonthly: false,
      badge: 'POPULAR',
      features: [
        '60 Live Spoken Minutes',
        'Valid across all 6 languages',
        'Real-time grammar corrections',
        'No expiry date',
      ],
      isActive: true,
    ),
    PackageModel(
      id: 'topup_180',
      name: '180 Extra Minutes Super Pack',
      description: 'Best value top-up for serious daily language learners.',
      minutes: 180,
      price: '\$7.99',
      isMonthly: false,
      badge: 'BEST VALUE',
      features: [
        '180 Live Spoken Minutes',
        'All male & female AI coaches',
        'Interactive Pronunciation Drills',
        'Priority low-latency audio engine',
      ],
      isActive: true,
    ),
    PackageModel(
      id: 'monthly_pro',
      name: 'Monthly Pro Speaking Pass',
      description: 'Daily speaking practice pass with generous 600 monthly minutes.',
      minutes: 600,
      price: '\$14.99 / mo',
      isMonthly: true,
      badge: 'RECOMMENDED',
      features: [
        '600 Monthly Practice Minutes (20 min/day)',
        'Full access to all 80+ conversation scenarios',
        'AI Custom Topic Generator (unlimited calls)',
        'Weekly Challenge Bonus Points & Badge boost',
      ],
      isActive: true,
    ),
    PackageModel(
      id: 'monthly_unlimited',
      name: 'Unlimited VIP Master Pass',
      description: 'Completely unlimited voice practice with zero restrictions.',
      minutes: -1,
      price: '\$29.99 / mo',
      isMonthly: true,
      badge: 'VIP UNLIMITED',
      features: [
        'UNLIMITED Speaking Time Every Day',
        'Zero waiting time & VIP priority cloud servers',
        'All 6 languages & all Coach Personas unlocked',
        'Personalized Fluency Certificate upon target completion',
      ],
      isActive: true,
    ),
  ];
}
