import { Component, OnInit } from '@angular/core';
declare var device;

//Idioma
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'inicio',
    templateUrl: '../views/inicio.html'
})
export class InicioComponent implements OnInit{

    constructor(
        private _translateService: TranslateService
    ){
        // Se indica que el idioma por defecto es el español
        this._translateService.setDefaultLang('es');
    }

    ngOnInit(){
        console.log("Componenete inicio.component.ts cargado");
        // Se indica que el idioma seleccionado es el español
        this._translateService.use('es');
        // Se utiliza para saber informacion del dispositivo
        document.addEventListener("deviceready", function() { 
            alert(device.platform); 
        }, false);
    }

    switchLanguage(language: string){
        this._translateService.use(language);
    }

}