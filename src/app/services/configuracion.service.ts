import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        this.url = GLOBAL.url_api;
    }

    // Método para almacenar en base de datos una nueva configuración
    addConfiguracion(configuracion: Configuracion) {
        let json = JSON.stringify(configuracion);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'configuraciones', params, { headers: headers });
    }
}