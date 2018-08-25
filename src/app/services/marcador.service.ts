import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

//Servicios
import { GLOBAL } from './global';

// Modelos
import { Marcador } from '../models/marcador';

@Injectable()
export class MarcadorService {

    constructor(
        public _http: HttpClient
    ) {

    }    

    getMarcadores(idMapa:number){
        return this._http.get(GLOBAL.uri + GLOBAL.recurs_getMarcadores + idMapa);
    }
   
}
