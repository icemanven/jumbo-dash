import {FechasPenalidad, Sistema} from '@configs/interfaces';

export type TypeFecha = 'ini' | 'fin';

export class PenalidadModel
{
    _id: string;
    nombre: string;
    fechas: FechasPenalidad[];
    cancelacionesDias: number;
    cargo: string;
    descripcion: string;
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
        this.fechas = entidad.fechas || [];
        this.cancelacionesDias = entidad.cancelacionesDias || '';
        this.cargo = entidad.cargo || '';
        this.descripcion = entidad.descripcion || '';
        this.sistema = entidad.sistema || {};
    }

    getfechas(type: TypeFecha): Date {
        const len = this.fechas.length;
        if (len === 0) {
            return null;
        } else if (len === 1) {
            if (type === 'ini') {
                return this.fechas[0].fechasini;
            } else if (type === 'fin') {
                return this.fechas[0].fechaFin;
            }
        } else if (len > 1) {
            if (type === 'ini') {
                const {fechasini} = [...this.fechas].shift();
                return fechasini;
            } else if (type === 'fin') {
                const {fechaFin} = [...this.fechas].pop();
                return fechaFin;
            }
        }
    }
}

export const PenalidadConst = {
    name: 'Penalidad',
    names: 'Penalidades',
    icon: 'shopping_basket',
    urlEntidades: '/apps/jumbomod/penalidades',
    urlEntidad: '/apps/jumbomod/penalidad'
};

