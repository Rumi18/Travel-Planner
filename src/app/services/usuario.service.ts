import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';

// Modelos
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url_api;
    }

    getUsuarios(){
        return this._http.get(this.url+'usuarios');
    }

    getUsuario(nombre:string){
        return this._http.get(this.url+'usuario/'+nombre);
    }

    addUsuario(usuario:Usuario){
        let json = JSON.stringify(usuario);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+'usuarios', params, {headers:headers});
    }
}