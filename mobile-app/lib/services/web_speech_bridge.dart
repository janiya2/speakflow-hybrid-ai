import 'web_speech_bridge_stub.dart'
    if (dart.library.js) 'web_speech_bridge_web.dart' as bridge;

void speakWeb(String text, String lang, {String coach = 'sarah', String gender = 'female'}) {
  bridge.platformSpeakWeb(text, lang, coach: coach, gender: gender);
}

void stopWeb() {
  bridge.platformStopWeb();
}

void registerSpeechFinished(void Function() callback) {
  bridge.platformRegisterSpeechFinished(callback);
}

void registerSpeechStarted(void Function() callback) {
  bridge.platformRegisterSpeechStarted(callback);
}

void playCallRingtone() {
  bridge.platformPlayRingtone();
}

void stopCallRingtone() {
  bridge.platformStopRingtone();
}

Future<String?> promptGeminiNano(String prompt, String lang) {
  return bridge.platformPromptGeminiNano(prompt, lang);
}
