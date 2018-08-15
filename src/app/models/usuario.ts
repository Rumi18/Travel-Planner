export class Usuario{

    constructor(
        public nombre: string,
        public apellidos: string,
        public email: string,
        public user_name: string,
        public contrasenia: string,
        public repeatContrasenia: string
    ){}
}