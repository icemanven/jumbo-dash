export abstract class DateUtils {
    static toDate (DateOri, RemoveHour?): any {
        let DateObj = DateOri;
        if (DateOri) {
            try {
                const isDate = (typeof DateObj.getMonth === 'function');
                if (!isDate) {
                    const part = DateObj.split('.');
                    DateObj = Date.parse(part[0]);
                }
                if (RemoveHour) {
                    DateObj.setHours(0, 0, 0, 0);
                }
                return DateObj;
            } catch (e) {
            }
        }
        return null;
    }

    static unsetTimeZero(time: string): string {
        return time.replace( /0001-01-01T00:00:00\.0000000/, '');
    }

    static unsetAnytimeZero (set: any): any {
        Object.keys(set).forEach(prop => {
            if (set[prop] === '0001-01-01T00:00:00.0000000') {
                set[prop] = this.unsetTimeZero(set[prop]);
            }
        });
        return set;
    }

    static unsetArrayTimeZero(set: any[]): any[] {
        const final: any[] = [];
        for (let s of set) {
            s = this.unsetAnytimeZero(s);
            final.push(s);
        }
        return final;
    }

    static isWeekend(date: Date): boolean {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    static isToday(date: Date): boolean {
        const today = new Date;
        return (date === today);
    }
}
