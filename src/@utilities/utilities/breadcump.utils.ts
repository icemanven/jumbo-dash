import {SessionUtils} from './session.utils';
import {SystemUtils} from './system.utils';

export abstract class BreadCumpUtils {
    static getBreadCump (): string {
        return SessionUtils.getSession('breadcump');
    }

    static setBreadCump(value: string, isDinamic?: boolean): void {
        if (!isDinamic) {
            value = SystemUtils.getSysname() + value; // environment.nombreSistema
        }
        SessionUtils.setSession('breadcump', value);
    }

    static getPrinModFromBreadCump (value: string): string {
        const search = value.split(/\//);
        return search[1];
    }
}
