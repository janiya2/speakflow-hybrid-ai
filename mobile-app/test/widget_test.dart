import 'package:flutter_test/flutter_test.dart';
import 'package:language_coach_app/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const LanguageCoachApp());
  });
}
