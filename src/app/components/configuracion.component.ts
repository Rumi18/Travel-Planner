import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'configuracion',
    templateUrl: '../views/configuracion.component.html'
})
export class ConfiguracionComponent implements OnInit {
    
    constructor(private _router:Router, private _route:ActivatedRoute) {
        
    }

    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];    
        console.log('Se ha cargado el componente configuracion.component.ts');       
    }    
}
