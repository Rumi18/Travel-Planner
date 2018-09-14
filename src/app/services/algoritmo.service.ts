import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

// Modelos
import { Configuracion } from '../models/configuracion';

//Servicios
import { GLOBAL } from './global';

@Injectable()
export class AlgoritmoService {

    constructor(
        public _http: HttpClient
    ) {

    }

    actualizaBD(){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_algoritmo);
    }

    extraeLocalizaciones(configuracion: Configuracion) {     
        let json = JSON.stringify(configuracion);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(GLOBAL.uri + GLOBAL.recurs_extraeLocalizaciones, params, {headers: headers});
    }

}