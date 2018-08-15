import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'inicio',
    templateUrl: '../views/inicio.component.html'
})
export class InicioComponent implements OnInit {
    public titulo: string;

    constructor(
        private _translateService: TranslateService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.titulo = 'Página principal';
        this._translateService.setDefaultLang('en');
    }

    ngOnInit() {
        console.log('Componente inicio.component.ts cargado');
        this._translateService.use('es');
    }

    switchLanguage(language: string) {
        console.log('Estas usando ' + language);
        this._translateService.use(language);
    }
}
