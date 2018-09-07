
export class Configuracion {
    constructor(
        public destino: number,
        public duracion: number,
        public presupuesto_limInf: number,
        public presupuesto_limSup: number,
        public mascotas: boolean,
        public acompaniantes: boolean,
        public ninios: boolean,
        public preferencias:number[]
    ) { }
}