import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

// Servicios
import { GLOBAL } from '../services/global';
import { UsuarioService } from '../services/usuario.service';
import { AlmacenamientoService } from '../services/almacenamiento.service';

 // Modelos
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
        private _almacenamientoService: AlmacenamientoService
    ) {
        this.usuarioLogin = new Login('', '');

    }

    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente login.component.ts');
    }

    onSubmit() {
        this.msg_error = 'no';
        this.msg_warn = 'no';

        this._usuarioService.getUsuario(this.usuarioLogin).subscribe(
            result => {
                if (result['code'] == 200) {
                    this.usuario = result['data'];

                    this.usuarioLogin.user_passwd = Md5.hashStr(this.usuarioLogin.user_passwd).toString();
                
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

                } else {
                    this.msg_warn = 'si';
                    this.usuarioLogin.user_passwd = '';
                    this._router.navigate(['/login']);
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }
}