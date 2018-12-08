import {CotizacionConst, FacturaConst, PedidoConst} from '../../app/main/apps/jumboMod/docs/docs.model';

export abstract class DocumentosUtils {
    static getType(type: string): any {
        switch (type) {
            case 'quote':
                return CotizacionConst;
            case 'salesorder':
                return PedidoConst;
            case 'invoice':
                return FacturaConst;
            default: return {};
        }
    }
}
