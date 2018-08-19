export class Usuario {

    constructor(
        public id: number,
        public nombre: string,
        public apellidos: string,
        public email: string,
        public imagen: string,
        public user_name: string,
        public user_passwd: string,        
        public repeatPasswd: string,
        public newPasswd: string
    ) { }
}