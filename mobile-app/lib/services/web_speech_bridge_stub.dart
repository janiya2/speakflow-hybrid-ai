// Stub implementation for Android / iOS native platforms
void platformSpeakWeb(String text, String lang, {String coach = 'sarah', String gender = 'female'}) {
  // Native Android/iOS uses flutter_tts / cloud TTS directly
}

void platformStopWeb() {
  // Native Android/iOS uses flutter_tts / cloud TTS directly
}

void platformRegisterSpeechFinished(void Function() callback) {
  // Native Android/iOS uses flutter_tts completionHandler directly
}

void platformRegisterSpeechStarted(void Function() callback) {
  // Native Android/iOS uses flutter_tts startHandler directly
}

void platformPlayRingtone() {}
void platformStopRingtone() {}
