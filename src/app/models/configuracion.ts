import { TipoTurismo } from '../enums/tipoTurismo';
import { Preferencia } from 'src/app/models/preferencia';

export class Configuracion {
    constructor(
        public duracion: number,
        public presupuesto_limInf: number,
        public presupuesto_limSup: number,
        public mascotas: boolean,
        public acompaniantes: boolean,
        public ninios: boolean,
        public preferencias:Preferencia[]
    ) { }
}