import {WidthHeightMed} from '../../@configs/interfaces';

export abstract class GeneralUtils {
    static isEmptyData(data: any): boolean {
        return (data === '' || data === 0 || data  === null);
    }

    static setWithHeight (whm?: WidthHeightMed): any {
        let mm = 1.5;
        if (whm && whm.Media) {
            mm = whm.Media;
        }
        const val = {
            width: window.innerWidth / mm,
            height: window.innerHeight / mm
        };
        if (whm && whm.hasOwnProperty('width')) {
            val.width = whm.width;
        }
        if (whm && whm.hasOwnProperty('height')) {
            val.height = whm.height;
        }
        return val;
    }
}
