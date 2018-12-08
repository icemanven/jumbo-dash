import {SessionUtils} from './session.utils';
import {CurruserUtils} from '@utilities/utilities/curruser.utils';
import {GeneralUtils} from '@utilities/utilities/general.utils';
import {Sistema} from '@configs/interfaces';

export abstract class SystemUtils {
    static setSysname(name: string): void {
        SessionUtils.setSession('sysname', name);
    }

    static getSysname (): string {
        return SessionUtils.getSession('sysname');
    }

    static setEntitySistema (data): any {
        const {DashUser} = CurruserUtils.getCurrentUser();
        const userId = DashUser && DashUser._id && !GeneralUtils.isEmptyData(DashUser._id) ? DashUser._id : null;
        let sistema: Sistema;
        sistema = {
            usuarioCreador: userId,
            usuarioAsignado: userId,
            fechaCreacion: null,
            fechaModificacion: null
        };
        return {...data, ...{sistema: sistema}};
    }
}
