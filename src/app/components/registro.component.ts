import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
        private _activateRoute: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.usuario = new Usuario('Carlos', 'Garcia Montellano', 'cgm@gmail.com', 'carmont87', '123456789', '', '');
    }

    ngOnInit() {
        console.log('Componente registro.component.ts cargado');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }

    onSubmit() {
        console.log(this.usuario);

        if (GLOBAL.url_api != 'prueba') {
            this._usuarioService.addUsuario(this.usuario).subscribe(
                response => {
                    if (response['code'] == 200) {
                        console.log(response);
                        this._router.navigate(['/inicio']);
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
            this._router.navigate(['/inicio']);
        }

    }
}