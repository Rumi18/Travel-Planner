import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

// Modelos
import { Configuracion } from '../models/configuracion';

//Servicios
import { GLOBAL } from './global';

@Injectable()
export class ConfiguracionService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
       
    }

    getCiudades(){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getCiudades);
    }

    getPreferencias(){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getPreferencias);
    }
}