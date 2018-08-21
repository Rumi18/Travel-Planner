import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlmacenamientoService } from './services/almacenamiento.service';

//Modelos
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public title: string;
  public componentURL: string;
  private user: Usuario;

  constructor(
    private _translateService: TranslateService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _almacenamientoService: AlmacenamientoService
  ) {
    this.title = 'Travel Planner';
    this.componentURL = '';
    this._translateService.setDefaultLang('es');
  }

  ngOnInit() {
    this.user = this._almacenamientoService.getUsuarioActual();
    if (this._almacenamientoService.estaAutenticado()) {
      this._router.navigate(['/menuOpciones']);
    }
  }

}