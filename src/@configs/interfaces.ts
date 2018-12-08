export interface WidthHeightMed {
    width?: number;
    height?: number;
    Media?: number;
}

export interface Sistema {
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioCreador: number | any;
    usuarioAsignado: number | any;
}

export interface Rol {
    id: number;
    name: string;
    descripcion: string;
    permisos: any[];
    sistema: Sistema;
}

export interface Usuario {
    id?: number;
    username: string;
    apikey: string;
    crmid: string;
    userInfo: any;
    rol?: Rol;
    sistema: Sistema;
}

export interface Moneda {
    id: number;
    nombre: string;
    code: string;
    simbolo: string;
    principal: boolean;
    descripcion: string;
    relacionPrincipal: number;
    sistema: Sistema;
}

export interface Servicio {
    _id?: number;
    nombre: string;
    descripcion: string;
    costo: number;
    moneda?: Moneda;
    sistema?: Sistema;
}

export interface FechasPenalidad {
    fechasini: Date;
    fechaFin: Date;
}

export interface Penalidad {
    _id: number;
    fechas?: FechasPenalidad[];
    cancelacionesDias: number;
    cargo: string;
    descripcion: string;
    sistema?: Sistema;
}

export interface Docs {
    _id: number;
}
