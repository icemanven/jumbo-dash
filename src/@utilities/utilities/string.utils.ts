import {md5} from './md5';
import {Utf8} from './utf8';
import {Base64} from './base64';

export abstract class StringUtils {
    private static b64 = new Base64();
    private static utf8 = new Utf8();
    static isString(val: any): boolean {
        return (typeof val === 'string' || val instanceof String);
    }

    static removeAccents (text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    static StringToNumber (st: string, base = 10): number {
        return parseInt(st, base);
    }

    static Base64Decode (base: string): string {
        return this.b64.decode(base);
    }

    static Base64Encode (base: string): string {
        return this.b64.encode(base);
    }

    static Utf8Decode (base: string): string {
        return this.utf8.utf8decode(base);
    }

    static Utf8Encode (base: string): string {
        return this.utf8.utf8encode(base);
    }

    static Md5(data: string): any {
        return md5(data);
    }
}
