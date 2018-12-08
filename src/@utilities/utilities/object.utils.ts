export abstract class ObjectUtils {
    static areEquals(obj1, obj2): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    static isObject(obj: any): boolean {
        return (typeof obj === 'object');
    }

    static isEmpty(obj: any): boolean {
        return (this.isObject(obj) && this.areEquals(obj, {}));
    }

    static isEmptyCircular(obj: any): boolean {
        let isEmpty = true;
        Object.keys(obj).forEach(key => {
            isEmpty = false;
        });
        return isEmpty;
    }

    static copyNestedObject(myObject: object): any {
        return JSON.parse(JSON.stringify(myObject));
    }

    static copyObject(myObject: object): {} & Object {
        return { ...myObject};
    }

    static objectToNum (obj: any): any {
        const newObj: any = {};
        Object.keys(obj).forEach(prop => {
            newObj[prop] = +obj[prop];
        });
    }
}
