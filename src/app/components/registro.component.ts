import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../app.component';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'registro',
    templateUrl: '../views/registro.component.html',
    providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
    public usuario: Usuario;

    constructor(
        private _usuarioService: UsuarioService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _app: AppComponent
    ) {
        this.usuario = new Usuario('', '', '', '', '', '', '', '');
    }

    ngOnInit() {
        console.log('Componente registro.component.ts cargado');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        //this._app.componentURL = this._router.url;
    }

    onSubmit() {

        if (GLOBAL.url_api != null && GLOBAL.url_api != '') {
            this._usuarioService.crearUsuario(this.usuario).subscribe(
                response => {
                    if (response['code'] == 200) {
                        console.log(response);
                        this._router.navigate(['/login']);
                    } else {
                        console.log(response);
                        this._router.navigate(['/error']);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        } else {
            this._router.navigate(['/login']);
        }

    }
}