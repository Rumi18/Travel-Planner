export class Configuracion{
    constructor(
        public destino:String,
        public duracion:Number,
        public presupuesto_limInf:Number,
        public presupuesto_limSup:Number,
        public mascota:Boolean,
        public acompañantes:Boolean,
        public niños: Boolean,
        public tipoTurismo: TipoTurismo
    ){}
}