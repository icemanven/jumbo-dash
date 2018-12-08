import {SessionUtils} from './session.utils';
import {ArrayUtils} from './array.utils';

export abstract class AllowedpageUtils {
    static setNotAllowMen(men: string): void {
        SessionUtils.setSession('notallowedmen', men);
    }

    static getNotAllowMen (menset: string): string {
        let men: any = SessionUtils.getSession('notallowedmen');
        if (men !== null) {
            SessionUtils.deleteSession('notallowedmen');
        } else {
            men = menset;
        }
        return men;
    }

    static setAllowedUrl(url: any): void {
        SessionUtils.setSession('allowedurl', url);
    }

    static urlNotAllowed (url: string): boolean {
        const urlsAllowed = SessionUtils.getSession('allowedurl');
        let notA = true;
        if (urlsAllowed !== null) {
            notA = ArrayUtils.notInArray(urlsAllowed, url);
        }
        return notA;
    }
}
