import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const reduxStorage = {
    setItem(key: string, value: any) {
        storage.set(key, JSON.stringify(value));
        return Promise.resolve();
    },
    getItem(key: string) {
        const value = storage.getString(key);
        return Promise.resolve(value);
    },
    removeItem(key: string) {
        storage.delete(key);
        return Promise.resolve();
    },
    clear() {
        storage.clearAll();
        return Promise.resolve();
    }
};

export default reduxStorage;