// Web-specific implementation using official Dart JS Interop and HTML events
import 'dart:html' as html;
import 'dart:js_interop';

@JS('speakWebText')
external void _speakWebText(JSString text, JSString lang, JSString coach, JSString gender);

@JS('stopWebSpeech')
external void _stopWebSpeech();

@JS('playCallRingtone')
external void _playCallRingtone();

@JS('stopCallRingtone')
external void _stopCallRingtone();

@JS('promptGeminiNano')
external JSPromise<JSString?> _promptGeminiNano(JSString prompt, JSString lang);

Future<String?> platformPromptGeminiNano(String prompt, String lang) async {
  try {
    final promise = _promptGeminiNano(prompt.toJS, lang.toJS);
    final result = await promise.toDart;
    return result?.toDart;
  } catch (e) {
    return null;
  }
}

void Function()? _onSpeechEndCallback;
void Function()? _onSpeechStartCallback;
bool _isListenerRegistered = false;

void platformRegisterSpeechFinished(void Function() callback) {
  _onSpeechEndCallback = callback;
  _ensureListeners();
}

void platformRegisterSpeechStarted(void Function() callback) {
  _onSpeechStartCallback = callback;
  _ensureListeners();
}

void _ensureListeners() {
  if (!_isListenerRegistered) {
    _isListenerRegistered = true;
    html.window.addEventListener('coachSpeechStarted', (event) {
      print('🔊 Dart received coachSpeechStarted event from JS');
      _onSpeechStartCallback?.call();
    });
    html.window.addEventListener('coachSpeechEnded', (event) {
      print('🔊 Dart received coachSpeechEnded event from JS');
      _onSpeechEndCallback?.call();
    });
  }
}

void platformSpeakWeb(String text, String lang, {String coach = 'sarah', String gender = 'female'}) {
  try {
    print('🔊 Calling JS speakWebText: $text (lang: $lang, coach: $coach, gender: $gender)');
    _speakWebText(text.toJS, lang.toJS, coach.toJS, gender.toJS);
  } catch (e) {
    print('JS interop error: $e');
  }
}

void platformStopWeb() {
  try {
    _stopWebSpeech();
  } catch (_) {}
}

void platformPlayRingtone() {
  try {
    _playCallRingtone();
  } catch (_) {}
}

void platformStopRingtone() {
  try {
    _stopCallRingtone();
  } catch (_) {}
}
