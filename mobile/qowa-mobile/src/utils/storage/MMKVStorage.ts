import { MMKV } from "react-native-mmkv";

const mmkv = new MMKV();

const MMKVStorage = {
  getItem: (key: string): Promise<string | null> => {
    const value = mmkv.getString(key);
    return Promise.resolve(value ?? null);
  },
  setItem: (key: string, value: string): Promise<void> => {
    mmkv.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    mmkv.delete(key);
    return Promise.resolve();
  },
};

export default MMKVStorage;
