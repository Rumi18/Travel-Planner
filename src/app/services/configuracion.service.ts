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
    public uri: string;

    constructor(
        public _http: HttpClient
    ) {
        this.uri = GLOBAL.uri;
    }

}