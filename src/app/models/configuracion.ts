import { TipoTurismo } from '../enums/tipoTurismo';

export class Configuracion {
    constructor(
        public destino: string,
        public duracion: number,
        public presupuesto_limInf: number,
        public presupuesto_limSup: number,
        public mascota: boolean,
        public acompañantes: boolean,
        public niños: boolean,
        public tipoTurismo: TipoTurismo
    ) { }
}