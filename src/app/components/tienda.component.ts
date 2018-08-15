import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'tienda',
    templateUrl: '../views/tienda.component.html'
})
export class TiendaComponent implements OnInit {
  
    constructor(private _router:Router, private _route:ActivatedRoute) {
        
    }

    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];    
        console.log('Se ha cargado el componente tienda.component.ts');       
    }    
}
