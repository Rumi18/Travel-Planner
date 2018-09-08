import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

//Servicios
import { GLOBAL } from './global';

// Modelos
import { Mapa } from '../models/mapa';

@Injectable()
export class MapaService {

    constructor(
        public _http: HttpClient
    ) {

    }    

    getMapasPendientes(idUsuario:number){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getMapasPendientes + idUsuario);
    }

    
    getHistorialMapas(idUsuario:number){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getHistorialMapas + idUsuario);
    }

    getMarcadores(idMapa:number){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getMarcadores + idMapa);
    }

    deleteMapa(idMapa:number){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_deleteMapa + idMapa);
    }
}
