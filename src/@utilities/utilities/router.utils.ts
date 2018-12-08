import {Router} from '@angular/router';
import {AllowedpageUtils} from './Allowedpage.utils';

export abstract class RouterUtils {
    static router: Router;

    static getRerouteUrl (): string {
        return this.router.url;
    }

    static evalPerm(extra?: any): void {
        let url: string = this.getRerouteUrl();
        const sinDrouter = url.split('(');
        url = sinDrouter[0];
        if (url.indexOf(';') >= 0) {
            const surl = url.split(';');
            url = surl[0];
        }
        if (extra) {
            url = url.replace(extra, '');
        }
        if (AllowedpageUtils.urlNotAllowed(url) ) {
            this.router.navigate(['/not-allowed']);
        }
    }
}
