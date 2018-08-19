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
    public recurs_deleteUsuario: string;
    public recurs_uploadImage: string;


    constructor(
        public _http: Http
    ){
        this.uri = GLOBAL.uri;
        this.recurs_addUsuario = GLOBAL.recurs_addUsuario;
        this.recurs_login = GLOBAL.recurs_login;
        this.recurs_setUsuario = GLOBAL.recurs_setUsuario;
        this.recurs_getUsuario = GLOBAL.recurs_getUsuario;
        this.recurs_deleteUsuario = GLOBAL.recurs_deleteUsuario;
        this.recurs_uploadImage = GLOBAL.recurs_uploadImage;
    }

    addUsuario(usuario:Usuario){
        let json = JSON.stringify(usuario);
		let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.uri + this.recurs_addUsuario, params, {headers: headers})
						 .map(res => res.json());
    }

    login(nombre:string){
        return this._http.get(this.uri + this.recurs_login + nombre).map(res => res.json());
    }

    getUsuario(idUsuario:number){       
        return this._http.get(this.uri + this.recurs_getUsuario + idUsuario).map(res => res.json());
    }

    subirImagen(idUsuario:number, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('imagen', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", GLOBAL.uri + GLOBAL.recurs_uploadImage + idUsuario, true);
			xhr.send(formData);
		});
    }
    
    setUsuario(usuario: Usuario){
        let json = JSON.stringify(usuario);
		let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.uri + this.recurs_setUsuario + usuario.id, params, {headers: headers})
						 .map(res => res.json());
    }

    deleteUsuario(idUsuario: number){
        return this._http.get(this.uri + this.recurs_deleteUsuario + idUsuario).map(res => res.json());
    }

}