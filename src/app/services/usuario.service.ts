import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';

// Modelos
import { Usuario } from '../models/usuario';



@Injectable()
export class UsuarioService{
    public uri: string;
    public recurs_addUsuario: string;
    public recurs_login: string;
    public recurs_setUsuario: string;
    public recurs_getUsuario: string;
    public recurs_deletUsuario: string;
    public recurs_uploadImage: string;


    constructor(
        public _http: Http
    ){
        this.uri = GLOBAL.uri;
        this.recurs_addUsuario = GLOBAL.recurs_addUsuario;
        this.recurs_login = GLOBAL.recurs_login;
        this.recurs_setUsuario = GLOBAL.recurs_setUsuario;
        this.recurs_getUsuario = GLOBAL.recurs_getUsuario;
        this.recurs_deletUsuario = GLOBAL.recurs_deletUsuario;
        this.recurs_uploadImage = GLOBAL.recurs_uploadImage;
    }

    login(nombre:string){
        return this._http.get(this.uri + this.recurs_login + nombre).map(res => res.json());
    }

    addUsuario(usuario:Usuario){
        let json = JSON.stringify(usuario);
		let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.uri + this.recurs_addUsuario, params, {headers: headers})
						 .map(res => res.json());
    }
}