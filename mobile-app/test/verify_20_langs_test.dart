import 'package:flutter_test/flutter_test.dart';
import 'package:language_coach_app/services/language_pack_20.dart';

void main() {
  test('All 20 languages resolve cleanly with zero English leakage', () {
    const languages = [
      'Arabic', 'Chinese', 'Dutch', 'English', 'French',
      'German', 'Hindi', 'Indonesian', 'Italian', 'Japanese',
      'Korean', 'Portuguese', 'Russian', 'Sinhala', 'Spanish',
      'Swedish', 'Tamil', 'Thai', 'Turkish', 'Vietnamese',
    ];

    for (final lang in languages) {
      final b = LanguagePack20.resolve(lang);
      if (lang != 'English') {
        expect(b.code, isNot('en'), reason: '$lang fell back to English!');
        expect(b.offlineReplies.first.contains('insightful'), isFalse);
        expect(b.sampleUtterance.contains('order a coffee'), isFalse);
      }
      expect(b.offlineReplies.first.trim().isNotEmpty, isTrue);
      expect(b.defaultFollowUpQuestion.trim().isNotEmpty, isTrue);
      expect(b.praise.trim().isNotEmpty, isTrue);
      expect(b.grace.trim().isNotEmpty, isTrue);
      expect(b.wrapUp.trim().isNotEmpty, isTrue);
      expect(b.errorFallback.trim().isNotEmpty, isTrue);
      expect(b.retryTemplate('test').trim().isNotEmpty, isTrue);
      expect(b.drillPromptTemplate('test').trim().isNotEmpty, isTrue);
      expect(b.correctionPromptTemplate('test').trim().isNotEmpty, isTrue);
      // ignore: avoid_print
      print('PASS [${b.code}] $lang -> ${b.sampleUtterance} | ${b.offlineReplies.first}');
    }
  });
}
