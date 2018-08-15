import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';

@Component({
    selector: 'inicio',
    templateUrl: '../views/inicio.component.html'
})
export class InicioComponent implements OnInit {
    public titulo: string;

    constructor(
        private _translateService: TranslateService,
        private _router: Router,
        private _route: ActivatedRoute) {
        this.titulo = 'Página principal';
        this._translateService.setDefaultLang('es');
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        console.log('Componente inicio.component.ts cargado');
        this._translateService.use('es');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }

    // Método para cambiar el idioma de la aplicación
    switchLanguage(language: string) {
        console.log('Estas usando ' + language);
        this._translateService.use(language);
    }
}
