import {DocumentosUtils} from './utilities/documentos.utils';
import {DateUtils} from './utilities/date.utils';
import {ObjectUtils} from './utilities/object.utils';
import {ArrayUtils} from './utilities/array.utils';
import {StringUtils} from './utilities/string.utils';
import {UrlUtils} from './utilities/url.utils';
import {GeneralUtils} from './utilities/general.utils';
import {BreadCumpUtils} from './utilities/breadcump.utils';
import {SessionUtils} from './utilities/session.utils';
import {LocalUtils} from './utilities/local.utils';
import {LoginUtils} from './utilities/login.utils';
import {CurruserUtils} from './utilities/curruser.utils';
import {RouterUtils} from './utilities/router.utils';
import {AllowedpageUtils} from './utilities/Allowedpage.utils';
import {ErrorHandlerUtils} from './utilities/error-handler.utils';
import {SystemUtils} from '@utilities/utilities/system.utils';

export abstract class Utilities {
    static allowedPages = AllowedpageUtils;
    static arrays = ArrayUtils;
    static breadcumps = BreadCumpUtils;
    static currentUser = CurruserUtils;
    static dates = DateUtils;
    static documentos = DocumentosUtils;
    static errors = ErrorHandlerUtils;
    static generals = GeneralUtils;
    static locals = LocalUtils;
    static logins = LoginUtils;
    static objects = ObjectUtils;
    static routers = RouterUtils;
    static session = SessionUtils;
    static strings = StringUtils;
    static systems = SystemUtils;
    static urls = UrlUtils;
}
