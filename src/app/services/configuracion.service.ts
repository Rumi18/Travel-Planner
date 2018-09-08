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

    getCiudades() {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getCiudades);
    }

    getPreferencias() {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getPreferencias);
    }

    getConfiguracion(idConfiguracion: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getConfiguracion + idConfiguracion);
    }

    getPreferenciasConfiguracion(idConfiguracion: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getPreferenciasConfiguracion + idConfiguracion);
    }

    addConfiguracion(configuracion: Configuracion) {     
        let json = JSON.stringify(configuracion);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(GLOBAL.uri + GLOBAL.recurs_addConfiguracion, params, { headers: headers });
    }
}
