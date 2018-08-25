import { TipoTurismo } from '../enums/tipoTurismo';
import { Preferencia } from 'src/app/models/preferencia';

export class Configuracion {
    constructor(
        public duracion: number,
        public presupuesto_limInf: number,
        public presupuesto_limSup: number,
        public mascota: boolean,
        public acompañantes: boolean,
        public niños: boolean,
        public preferencias:Preferencia[]
    ) { }
}