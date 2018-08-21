import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Modelo
import { Usuario } from '../models/usuario';

// Servicios
import { GLOBAL } from '../services/global';

@Injectable()
export class CorreoService{
    private emailUrl:string; 

    constructor(
        private _http: HttpClient
    ){
        this.emailUrl = '/assets/email.php/';
    }

    enviarMensaje(usuario: Usuario){
       return this._http.post(GLOBAL.url_email, usuario);
    }
}