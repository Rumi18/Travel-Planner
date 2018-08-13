import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'configuracion',
    templateUrl: '../views/configuracion.component.html'
})
export class ConfiguracionComponent implements OnInit {
  
    constructor() {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente configuracion.component.ts');       
    }    
}
