
export class Configuracion {
    constructor(
        public destino: number,
        public duracion: number,
        public presupuesto_min: number,
        public presupuesto_max: number,
        public mascotas: boolean,
        public acompaniantes: boolean,
        public ninios: boolean,
        public creacion: Date,
        public preferencias:number[]
    ) { }
}