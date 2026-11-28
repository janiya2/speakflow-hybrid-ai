import 'package:flutter_test/flutter_test.dart';
import 'package:language_coach_app/services/language_pack_20.dart';

void main() {
  test('All 20 languages have varied turns, nudges, non-repeating openings & grammar checks', () {
    const languages = [
      'Arabic', 'Chinese', 'Dutch', 'English', 'French',
      'German', 'Hindi', 'Indonesian', 'Italian', 'Japanese',
      'Korean', 'Portuguese', 'Russian', 'Sinhala', 'Spanish',
      'Swedish', 'Tamil', 'Thai', 'Turkish', 'Vietnamese',
    ];

    for (final lang in languages) {
      final b = LanguagePack20.resolve(lang);
      if (lang != 'English') {
        expect(b.code, isNot('en'), reason: '$lang fell back to English');
      }
      expect(b.dialogueTurns.length, greaterThanOrEqualTo(8));
      expect(b.nudges.length, greaterThanOrEqualTo(4));
      expect(b.dialogueTurns.map((t) => t.question).toSet().length, greaterThanOrEqualTo(8));
      expect(b.nudges.toSet().length, greaterThanOrEqualTo(4));

      final open1 = LanguagePack20.buildVariedOpeningQuestion(
        language: lang,
        defaultPrompt: 'Starter?',
        alternateQuestions: ['Alt 1?', 'Alt 2?'],
        lastUsedOpening: '',
      );
      final open2 = LanguagePack20.buildVariedOpeningQuestion(
        language: lang,
        defaultPrompt: 'Starter?',
        alternateQuestions: ['Alt 1?', 'Alt 2?'],
        lastUsedOpening: open1,
      );
      expect(open1, isNot(open2), reason: '$lang repeated the same opening!');
    }

    // Verify Offline Grammar Detection across multiple languages
    expect(LanguagePack20.detectGrammarMistake('I am agree with you', 'English').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake("He don't play cricket", 'English').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('Yesterday I go to Paris', 'English').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake("I didn't went there", 'English').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('Je veux un café crème', 'French').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('Je suis 25 ans', 'French').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('Yo soy 20 años', 'Spanish').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('Ich habe 25 Jahre', 'German').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('Sono 20 anni', 'Italian').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('tabeta', 'Japanese').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('보고 싶어', 'Korean').hasCorrection, isTrue);
    expect(LanguagePack20.detectGrammarMistake('I would like a cup of tea.', 'English').hasCorrection, isFalse);
  });
}
