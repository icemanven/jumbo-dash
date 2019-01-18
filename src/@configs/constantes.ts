import { FuseConfig } from '@fuse/types';

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
        habitaciones: '/jumboApi/habitaciones',
        docs: '/jumboApi/docs'
    }
};


export const customfuseConfig: FuseConfig = {
    colorTheme      : 'theme-default',
    customScrollbars: true,
    layout          : {
        style    : 'vertical-layout-1',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'mat-indigo-700-bg',
            secondaryBackground: 'mat-indigo-900-bg',
            folded             : false,
            hidden             : false,
            position           : 'left',
            variant            : 'vertical-style-2'
        },
        toolbar  : {
            customBackgroundColor: false,
            background: 'mat-yellow-500-bg',
            hidden    : false,
            position  : 'below-static'
        },
        footer   : {
            customBackgroundColor: true,
            background           : 'mat-fuse-dark-900-bg',
            hidden               : false,
            position             : 'below-fixed'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    }
};

