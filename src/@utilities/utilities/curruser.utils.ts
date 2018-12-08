import {SessionUtils} from './session.utils';

export abstract class CurruserUtils {
    static setCurrentUser(value: any): void {
        SessionUtils.setSession('currentUser', value);
    }

    static getCurrentUser(): any {
        return SessionUtils.getSession('currentUser');
    }
}
