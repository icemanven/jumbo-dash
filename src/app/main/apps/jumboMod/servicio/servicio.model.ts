import {Moneda, Sistema} from '@configs/interfaces';

export class ServicioModel
{
    _id: number;
    nombre: string;
    descripcion: string;
    costo: number;
    moneda: Moneda;
    sistema: Sistema;

    /**
     * Constructor
     *
     * @param entidad
     */
    constructor(entidad?)
    {
        entidad = entidad || {};
        this._id = entidad._id || null;
        this.nombre = entidad.nombre || '';
        this.descripcion = entidad.descripcion || '';
        this.costo = entidad.costo || 0;
        this.moneda = entidad.moneda || {};
        this.sistema = entidad.sistema || {};
    }
}

export const ServicioConst = {
    name: 'Servicio',
    names: 'Servicios',
    icon: 'shopping_basket',
    urlEntidades: '/apps/jumbomod/servicios',
    urlEntidad: '/apps/jumbomod/servicio'
};

