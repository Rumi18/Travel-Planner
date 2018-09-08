import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

//Servicios
import { GLOBAL } from './global';

// Modelos
import { Usuario } from '../models/usuario';
import { Login } from '../models/login';
import { Recuperacion } from '../models/recuperacion';

@Injectable()
export class UsuarioService {

    constructor(
        public _http: HttpClient,
        private _md5: Md5
    ) {

    }
    
    addUsuario(usuario: Usuario) {
        // Comprobación de datos del formulario
        if (usuario.nombre == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else if (usuario.email == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else if (usuario.user_name == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else if (usuario.user_passwd == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else {
            //generar la contraseña
            usuario.user_passwd = Md5.hashStr(usuario.user_passwd).toString();

            let json = JSON.stringify(usuario);
            let params = "json=" + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            return this._http.post(GLOBAL.uri + GLOBAL.recurs_addUsuario, params, { headers: headers });
        }
    }

    getUsuario(usuarioLogueado: Login) {
        if (usuarioLogueado.user_name == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else if (usuarioLogueado.user_passwd == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else {
            return this._http.get(GLOBAL.uri + GLOBAL.recurs_getUsuario + usuarioLogueado.user_name);
        }
    }

    getInforUsuario(idUsuario: number){
        if (idUsuario == null) {
            return this._http.get(GLOBAL.uri + 'error');
        } else {
            return this._http.get(GLOBAL.uri + GLOBAL.recurs_getInforUsuario + idUsuario);
        }
    }

    getUsuarioEmail(recuperado: Recuperacion) {
        if (recuperado.correo == '') {
            return this._http.get(GLOBAL.uri + 'error');
        } else {            
            return this._http.get(GLOBAL.uri + GLOBAL.recurs_usuario_mail + recuperado.correo);
        }
    }

    setUsuario(usuario: Usuario){
        let json = JSON.stringify(usuario);
            let params = "json=" + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(GLOBAL.uri + GLOBAL.recurs_setUsuario + usuario.id, params, {headers: headers});
    }
    
    deleteUsuario(idUsuario: number){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_deleteUsuario + idUsuario);
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
}
