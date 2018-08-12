import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'menuOpciones',
    templateUrl: '../views/menu.component.html'
})
export class MenuComponent implements OnInit {
  
    constructor(private _translateService: TranslateService) {
        
    }

    ngOnInit() {
        console.log('Se ha cargado el componente menu.component.ts');       
    }    
}
