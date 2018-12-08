import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export abstract class UrlUtils {
    static sanitizer: DomSanitizer;
    static sanitizeUrl(url: string): SafeResourceUrl {
        return this.sanitizer ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : url;
    }
}
