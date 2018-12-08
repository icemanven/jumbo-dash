import {StringUtils} from './string.utils';
import {ObjectUtils} from './object.utils';

export abstract class ErrorHandlerUtils {
    static errorCath (error: any): string {
        let errorMen = '';
        if (StringUtils.isString(error)) {
            errorMen = error;
        } else  if (ObjectUtils.isObject(error)) {
            if (error.error) {
                if (StringUtils.isString(error.error)) {
                    errorMen = error.error;
                } else if (ObjectUtils.isObject(error.error) && error.error.ResponseStatus) {
                    if (error.error.ResponseStatus.Message) {
                        errorMen = error.error.ResponseStatus.Message;
                    } else if (error.error.ResponseStatus.ErrorCode) {
                        errorMen = error.error.ResponseStatus.ErrorCode;
                    }
                }
            } else {
                if (error.message) {
                    errorMen = error.message;
                } else if (error.statusText) {
                    errorMen = error.statusText;
                }
            }
        }
        return errorMen;
    }
}
