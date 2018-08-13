import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'perfil',
    templateUrl: '../views/perfil.component.html'
})
export class PerfilComponent implements OnInit {
  
    constructor() {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente perfil.component.ts');       
    }    
}
