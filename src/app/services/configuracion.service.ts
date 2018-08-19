import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Servicios
import { GLOBAL } from './global';

@Injectable()
export class ConfiguracionService{
    public uri: string;
    public recurs_getCiudades: string;


    constructor(
        public _http: Http
    ){
        this.uri = GLOBAL.uri;
        this.recurs_getCiudades = GLOBAL.recurs_getCiudades;

    }
 

    getCiudades(){
        return this._http.get(this.uri + this.recurs_getCiudades).map(res => res.json());
    }

}