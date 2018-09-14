import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

//Servicios
import { GLOBAL } from './global';

// Modelos
import { Mapa } from '../models/mapa';
import { Valoracion } from '../models/valoracion';

@Injectable()
export class MapaService {

    constructor(
        public _http: HttpClient
    ) {

    }

    getMapasPendientes(idUsuario: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getMapasPendientes + idUsuario);
    }

    getMapa(idMapa: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getMapa + idMapa);
    }

    getHistorialMapas(idUsuario: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getHistorialMapas + idUsuario);
    }

    getMarcadores(idMapa: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getMarcadores + idMapa);
    }

    deleteMapa(idMapa: number) {
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_deleteMapa + idMapa);
    }

    addValoracion(valoracion: Valoracion) {
        let json = JSON.stringify(valoracion);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(GLOBAL.uri + GLOBAL.recurs_addValoracion + valoracion.idMapa, params, { headers: headers });
    }

    habilitarMapa(idMapa){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_habilitarMapa + idMapa);
    }
}
