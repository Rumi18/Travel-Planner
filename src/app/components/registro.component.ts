import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5'

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'registro',
    templateUrl: '../views/registro.component.html',
    providers: [UsuarioService, Md5]
})
export class RegistroComponent implements OnInit {
    public usuario: Usuario;

    constructor(
        private _activateRoute: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.usuario = new Usuario('', '', '', '','', '', null, null);
    }

    ngOnInit() {
        console.log('Componente registro.component.ts cargado');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }

    onSubmit() {    

        this.usuario.contrasenia = String(Md5.hashStr(this.usuario.contrasenia));
       
        if (GLOBAL.url_api != null && GLOBAL.url_api != '') {
            this._usuarioService.crearUsuario(this.usuario).subscribe(
                response => {
                    if (response['code'] == 200) {
                        console.log(response);
                        this._router.navigate(['/menuOpciones']);
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