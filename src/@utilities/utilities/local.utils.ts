import {ObjectUtils} from './object.utils';

export abstract class LocalUtils {
    static setLocalStorage(key: string, value: any): void {
        let val: any;
        if (ObjectUtils.isObject(value)) {
            val = JSON.stringify(value);
        } else {
            val = value;
        }
        localStorage.setItem(key, val);
    }

    static deleteLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }

    static getLocalStorage(key: string): any {
        let val = localStorage.getItem(key);
        try {
            val = JSON.parse(val);
        } catch (e) {}
        return val;
    }
}
