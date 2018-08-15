import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';

@Component({
    selector: 'menuOpciones',
    templateUrl: '../views/menu.component.html'
})
export class MenuComponent implements OnInit {

    constructor(private _router: Router, private _route: ActivatedRoute) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        console.log('Se ha cargado el componente menu.component.ts');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }
}
