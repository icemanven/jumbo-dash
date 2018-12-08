import {FuseConfig} from '@fuse/types';

export const CrmConst = {
    sysName: 'Cotizaciones Jumbo',
    vtigerUrl: 'http://jumbo.ltncrm.com', // 'http://jumbo.ltncrm.com' 'http://colombiacrm.ltnxmart.com/' 'http://192.168.182.130'
    logoDir: 'assets/images/jumbo/logo/LOGO_JUMBO.jpg',
    loginDir: '/pages/auth/jumbologin',
    homeDir: ''
};

export const BackEndConst = {
    backEndUrl: 'http://127.0.0.1:3000',
    endPoints: {
        usuarios: '/jumboApi/usuarios',
        servicios: '/jumboApi/servicios',
        penalidades: '/jumboApi/penalidades',
        docs: '/jumboApi/docs'
    }
};


export const customfuseConfig: FuseConfig = {
    layout          : {
        style    : 'vertical-layout-1',
        width    : 'fullwidth',
        navbar   : {
            background: 'mat-indigo-900-bg',
            folded    : false,
            hidden    : false,
            position  : 'left',
            variant   : 'vertical-style-2'
        },
        toolbar  : {
            background: 'mat-yellow-500-bg',
            hidden    : false,
            position  : 'below-static'
        },
        footer   : {
            background: 'mat-fuse-dark-900-bg',
            hidden    : true,
            position  : 'below-fixed'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    },
    customScrollbars: true
};

