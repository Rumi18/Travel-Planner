import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Servicios
import { GLOBAL } from '../services/global';

@Component({
    selector: 'error',
    templateUrl: '../views/error.component.html'
})
export class ErrorComponent implements OnInit{
    public titulo: string;

    constructor(
        private _router: Router, 
        private _route: ActivatedRoute
    ){
        this.titulo = 'Error!! Página no encontrada';
    }

    ngOnInit(){
        console.log('Componente error.component.ts cargado');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }
}