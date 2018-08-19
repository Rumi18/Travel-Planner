import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';

// Modelos
import { Usuario } from '../models/usuario';
import { Login } from '../models/login';

@Injectable()
export class UsuarioService{
    public url: string;

    constructor(
        public _http: HttpClient,
        private _md5: Md5
    ){
        this.url = GLOBAL.url_api;
    }

    getUsuarios(){
        return this._http.get(this.url+'usuarios');
    }

    getUsuario(usuarioLogueado:Login){
        if (usuarioLogueado.user_name == '') {
            return this._http.get(this.url+'error');
        } else if (usuarioLogueado.user_passwd == '') {
            return this._http.get(this.url+'error');
        } else {
            return this._http.get(this.url+'usuario/'+usuarioLogueado.user_name);
        }
    }

    addUsuario(usuario:Usuario){
        // Comprobación de datos del formulario
        if (usuario.nombre == '') {
            return this._http.get(this.url+'error');
        } else if (usuario.email == '') {
            return this._http.get(this.url+'error');
        } else if (usuario.user_name == '') {
            return this._http.get(this.url+'error');
        } else if (usuario.user_passwd == '') {
            return this._http.get(this.url+'error');
        } else {
            //generar la contraseña
            usuario.user_passwd = this._md5.appendStr(usuario.user_passwd).end().toString();

            let json = JSON.stringify(usuario);
            let params = "json="+json;
            let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

            return this._http.post(this.url+'usuarios', params, {headers:headers});
        }

    }
}