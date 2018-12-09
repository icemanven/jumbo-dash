import {Sistema} from '@configs/interfaces';

export class HabitacionModel
{
  _id: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  adulto: number;
  ninos: number;
  inf: number;
  tipoCama: string;
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
        this.capacidad = entidad.capacidad || 0;
        this.adulto = entidad.adulto || 0;
        this.ninos = entidad.ninos || 0;
        this.inf = entidad.inf || 0;
        this.tipoCama = entidad.tipoCama || '';
        this.sistema = entidad.sistema || {};
    }
}

export const HabitacionConst = {
    name: 'Habitacion',
    names: 'Habitaciones',
    icon: 'shopping_basket',
    urlEntidades: '/apps/jumbomod/habitaciones',
    urlEntidad: '/apps/jumbomod/habitacion'
};

