import {ObjectUtils} from './object.utils';

export abstract class SessionUtils {
    static setSession(key: string, value: any): void {
        let val: any;
        if (ObjectUtils.isObject(value)) {
            val = JSON.stringify(value);
        } else {
            val = value;
        }
        sessionStorage.setItem(key, val);
    }

    static deleteSession(key: string): void {
        sessionStorage.removeItem(key);
    }

    static getSession(key: string): any {
        let val = sessionStorage.getItem(key);
        try {
            val = JSON.parse(val);
        } catch (e) {}
        return val;
    }
}
