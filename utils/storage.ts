let AsyncStorage: any = null;

try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {
  AsyncStorage = null;
}

const memCache = new Map<string, string>();

export async function getItem(key: string): Promise<string | null> {
  if (AsyncStorage) {
    try {
      return await AsyncStorage.getItem(key);
    } catch {}
  }
  return memCache.get(key) ?? null;
}

export async function setItem(key: string, value: string): Promise<void> {
  if (AsyncStorage) {
    try {
      await AsyncStorage.setItem(key, value);
      return;
    } catch {}
  }
  memCache.set(key, value);
}

export async function removeItem(key: string): Promise<void> {
  if (AsyncStorage) {
    try {
      await AsyncStorage.removeItem(key);
      return;
    } catch {}
  }
  memCache.delete(key);
}
