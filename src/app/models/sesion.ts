import { Usuario } from "./usuario";

export class Sesion{
    constructor(
        public token: string,
        public usuario: Usuario,
    ) { }
}