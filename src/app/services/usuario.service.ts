import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';

// Modelos
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
    private url_api: string;
    private crear_usuarios: string;
    private modificar_usuario: string;
    private obtener_usuario: string;
    private eliminar_usuario: string;
    private subir_img_perfil: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url_api = GLOBAL.url_api;
        this.crear_usuarios = GLOBAL.crear_usuarios;
        this.modificar_usuario = GLOBAL.modificar_usuario;
        this.obtener_usuario = GLOBAL.obtener_usuario;
        this.eliminar_usuario = GLOBAL.eliminar_usuario;
        this.subir_img_perfil = GLOBAL.subir_img_perfil;
    }

    crearUsuario(usuario: Usuario) {
        let json = JSON.stringify(usuario);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url_api + this.crear_usuarios, params, { headers: headers });
    }

    modifyUsuario(usuario: Usuario) {
       
    }
}