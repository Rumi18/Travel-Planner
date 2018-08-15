import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';

@Component({
    selector: 'rutasPendientes',
    templateUrl: '../views/rutasPendientes.component.html'
})
export class RutasPendientesComponent implements OnInit {
  
    constructor(private _router:Router, private _route:ActivatedRoute) {
        
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];    
        console.log('Se ha cargado el componente rutasPendientes.component.ts');       
    }    
}
