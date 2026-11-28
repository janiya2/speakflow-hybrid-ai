import 'package:flutter_test/flutter_test.dart';
import '../lib/services/language_pack_20.dart';
import '../lib/services/category_questions_20.dart';

void main() {
  const langs = [
    'English', 'French', 'Spanish', 'German', 'Japanese',
    'Korean', 'Chinese', 'Arabic', 'Italian', 'Portuguese',
    'Russian', 'Hindi', 'Tamil', 'Sinhala', 'Dutch',
    'Turkish', 'Vietnamese', 'Indonesian', 'Thai', 'Swedish',
  ];

  const categories = [
    {'domain': CategoryDomain.sports, 'cat': 'Sports', 'sub': 'Cricket', 'title': 'Cricket World Cup'},
    {'domain': CategoryDomain.food, 'cat': 'Food', 'sub': 'Ramen', 'title': 'Ordering Ramen'},
    {'domain': CategoryDomain.travel, 'cat': 'Travel', 'sub': 'Shinkansen', 'title': 'Train Travel'},
    {'domain': CategoryDomain.career, 'cat': 'Career', 'sub': 'Startup Pitch', 'title': 'Investor Pitch'},
    {'domain': CategoryDomain.shopping, 'cat': 'Shopping', 'sub': 'Market', 'title': 'Market Bargaining'},
    {'domain': CategoryDomain.health, 'cat': 'Health', 'sub': 'Pharmacy', 'title': 'Clinic & Pharmacy'},
    {'domain': CategoryDomain.tech, 'cat': 'Tech', 'sub': 'AI & Robotics', 'title': 'Future of AI'},
    {'domain': CategoryDomain.culture, 'cat': 'Culture', 'sub': 'Movies', 'title': 'Cinema & Tradition'},
  ];

  test('All 20 languages x 8 categories produce non-empty non-repeating native questions', () {
    int count = 0;
    for (final lang in langs) {
      final bundle = LanguagePack20.resolve(lang);
      for (final c in categories) {
        final dom = CategoryQuestions20.resolveDomain(
          category: c['cat'] as String,
          subCategory: c['sub'] as String,
          title: c['title'] as String,
        );
        expect(dom, c['domain'], reason: 'Domain mismatch for $lang / ${c['cat']}');

        final q1 = CategoryQuestions20.pickQuestion(
          langCode: bundle.code,
          category: c['cat'] as String,
          subCategory: c['sub'] as String,
          title: c['title'] as String,
        );
        final q2 = CategoryQuestions20.pickQuestion(
          langCode: bundle.code,
          category: c['cat'] as String,
          subCategory: c['sub'] as String,
          title: c['title'] as String,
          recentBotTexts: [q1],
        );
        expect(q1.isNotEmpty, true);
        expect(q2.isNotEmpty, true);
        expect(q1 != q2, true, reason: 'Repeated question for $lang / ${c['cat']}');

        final opening = LanguagePack20.buildVariedOpeningQuestion(
          language: lang,
          defaultPrompt: 'Starter prompt',
          alternateQuestions: const [],
          category: c['cat'] as String,
          subCategory: c['sub'] as String,
          title: c['title'] as String,
        );
        expect(opening.isNotEmpty, true);
        count++;
      }
    }
    expect(count, 160);
  });
}
