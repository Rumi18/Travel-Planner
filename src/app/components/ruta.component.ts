import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';

// Modelos 

@Component({
    selector: 'ruta',
    templateUrl: '../views/ruta.component.html'
})
export class RutaComponent implements OnInit {   
    lat: number = 37.3890924;
    lng: number = -5.984458899999936;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente ruta.component.ts');
    }
}
