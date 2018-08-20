import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { Md5 } from 'ts-md5/dist/md5';
import { UsuarioService } from '../services/usuario.service';
import { AlmacenamientoService } from '../services/almacenamiento.service';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';
import { Sesion } from '../models/sesion';

@Component({
    selector: 'login',
    templateUrl: '../views/login.component.html',
    providers: [UsuarioService],

})
export class LoginComponent implements OnInit {
    public usuarioLogin: Login;
    public usuario: Usuario;
    public msg_error: string;
    public msg_warn: string;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _md5: Md5,
        private _almacenamientoService: AlmacenamientoService
    ) {
        this.usuarioLogin = new Login('', '');

    }

    ngOnInit() {
        console.log('Componente login.component.ts cargado');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }

    onSubmit() {
        this._usuarioService.getLogin(this.usuarioLogin).subscribe(
            result => {
                if (result['code'] != 200) {
                    this.msg_warn = 'si';
                    this.usuarioLogin.user_passwd = '';
                    this._router.navigate(['/login']);
                } else {
                    this.usuario = result['data'];

                    this.usuarioLogin.user_passwd = this._md5.appendStr(this.usuarioLogin.user_passwd).end().toString();

                    if (this.usuario.user_passwd == this.usuarioLogin.user_passwd) {
                        this.msg_error = 'no';

                        // Generar sesion
                        let token = this._almacenamientoService.generarToken();
                        let sesion = new Sesion(token, this.usuario);
                        this._almacenamientoService.setSesionActual(sesion);

                        this._router.navigate(['/menuOpciones']);
                    } else {
                        this.msg_error = 'si';
                        this.usuarioLogin.user_passwd = '';
                        this._router.navigate(['/login']);
                    }
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }

        );
    }
}