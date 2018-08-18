import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Servicios
import { GLOBAL } from '../services/global';

@Component({
    selector: 'error',
    templateUrl: '../views/error.component.html'
})
export class ErrorComponent implements OnInit {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Componente error.component.ts cargado');
    }
}