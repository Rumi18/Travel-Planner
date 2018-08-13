import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'historial',
    templateUrl: '../views/historial.component.html'
})
export class HistorialComponent implements OnInit {
  
    constructor() {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente historial.component.ts');       
    }    
}
