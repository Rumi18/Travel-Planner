import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'inicio',
    templateUrl: '../views/inicio.component.html'
})
export class InicioComponent implements OnInit {
    public titulo: string;

    constructor(
        private _translateService: TranslateService
    ) {
        this.titulo = 'Página principal';
        this._translateService.setDefaultLang('en');
    }

    ngOnInit() {
        console.log('Se ha cargado el componente inicio.component.ts');
        this._translateService.use('es');
    }

    switchLanguage(language: string) {
        console.log('Estas usando ' + language);
        this._translateService.use(language);
    }
}
