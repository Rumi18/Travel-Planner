import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../app/services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'Travel Planner';
  
  constructor(private _router: Router, private _route: ActivatedRoute) {
  }

  verComponente() {
    console.log('Se ha cargado el componente app.component.ts');

    //Se compruba a cual es la página que se tiene que redirigir en función de la página en la que está
    switch (GLOBAL.vistaSeleccionada) {
      case 'MenuComponent':        
        break;

      case 'PerfilComponent':       
        this._router.navigate(['/inicio']);
        break;

      case 'HistorialComponent':      
        this._router.navigate(['/menuOpciones']);
        break;

      case 'RutasPendientesComponent':       
        this._router.navigate(['/menuOpciones']);
        break;

      case 'ConfiguracionComponent':
        this._router.navigate(['/menuOpciones']);
        break;

      case 'TiendaComponent':
        this._router.navigate(['/menuOpciones']);
        break;

      default:
        this._router.navigate(['/inicio']);
        break;
    }

  }

}
