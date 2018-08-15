import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';


@Component({
    selector: 'menuOpciones',
    templateUrl: '../views/menu.component.html'
})
export class MenuComponent implements OnInit {
  
    constructor(private _router:Router, private _route:ActivatedRoute) {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente menu.component.ts');       
        GLOBAL.vistaSeleccionada = this._route.component['name'];    
    }    
}
