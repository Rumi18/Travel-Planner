import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Servicios
import { GLOBAL } from '../services/global';
import { AlmacenamientoService } from '../services/almacenamiento.service';

//Modelos
import { Usuario } from '../models/usuario';

@Component({
    selector: 'cabecera',
    templateUrl: '../views/cabecera.component.html'
})
export class CabeceraComponent {
    public title = 'Travel Planner';
    public componentURL = '';
    private user: Usuario;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _almacenamientoService: AlmacenamientoService
    ){

    }

    ngOnInit(){
        this.componentURL = this._router.url;
        this.user = this._almacenamientoService.getUsuarioActual();
        console.log(this.componentURL);
    }

    verComponente() {
        console.log('Se ha cargado el componente app.component.ts');
    
        //Se compruba a cual es la página que se tiene que redirigir en función de la página en la que está
        switch (GLOBAL.vistaSeleccionada) {
    
          case 'InicioComponent':
            break;
    
          case 'MenuComponent':
            break;
    
          case 'LoginComponent':
            this._router.navigate(['/inicio']);
            break; 
    
          case 'RegistroComponent':
            this._router.navigate(['/inicio']);
            break;
    
          case 'PerfilComponent':
            this._router.navigate(['/menuOpciones']);
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
            //Hay que discriminar entre si hay un usuario logueado o no
            //Logueado
            //this._router.navigate(['/menuOpciones']);
    
            //Sin loguear
            this._router.navigate(['/inicio']);
            break;
        }
    
      }

}