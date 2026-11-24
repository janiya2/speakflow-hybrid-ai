// Stub implementation of PlatformAuthStorage for non-web platforms
class PlatformAuthStorage {
  static final Map<String, String> _inMemoryStorage = {};

  static String? getItem(String key) {
    return _inMemoryStorage[key];
  }

  static void setItem(String key, String value) {
    _inMemoryStorage[key] = value;
  }

  static void removeItem(String key) {
    _inMemoryStorage.remove(key);
  }
}
