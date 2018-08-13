import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'rutasPendientes',
    templateUrl: '../views/rutasPendientes.component.html'
})
export class RutasPendientesComponent implements OnInit {
  
    constructor() {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente rutasPendientes.component.ts');       
    }    
}
