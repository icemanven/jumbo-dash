import {SessionUtils} from './session.utils';

export abstract class LoginUtils {
    static isLoggedin(): boolean {
        return (SessionUtils.getSession('isLoggedin'));
    }

    static setLoggedin(): void {
        SessionUtils.setSession('isLoggedin', 'true');
    }

    static logOff(): void {
        sessionStorage.clear();
    }
}
