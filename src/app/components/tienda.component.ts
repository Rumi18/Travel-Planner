import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'tienda',
    templateUrl: '../views/tienda.component.html'
})
export class TiendaComponent implements OnInit {
  
    constructor() {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente tienda.component.ts');       
    }    
}
