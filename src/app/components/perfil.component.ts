import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { AlmacenamientoService } from '../services/almacenamiento.service';

// Modelos
import { Usuario } from '../models/usuario';
import { Sesion } from '../models/sesion';

@Component({
    selector: 'perfil',
    templateUrl: '../views/perfil.component.html',
    providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
    public usuario: Usuario;
    private antiguaPass: string;
    public msg_error: string;
    public msg_ok: string;
    public msg_warn: string;
    public filesToUpload;
    public resultUpload;

    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _almacenamientoService: AlmacenamientoService
    ) {
        this.usuario = new Usuario(null, '', '', '', '', '', '', '', '', '');
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente perfil.component.ts');
        this.getInforUsuario();
    }

    private getInforUsuario() {
        console.log(this._almacenamientoService.getUsuarioActual().id);

        this._usuarioService.getInforUsuario(this._almacenamientoService.getUsuarioActual().id).subscribe(
            result => {
                if (result['code'] == 200) {
                    this.usuario = result['data'];
                    this.antiguaPass = this.usuario.user_passwd;
                    this.usuario.user_passwd = '';
                    this.usuario.newPasswd = '';
                    this.usuario.repeatPasswd = '';
                    this.usuario.nueva_imagen = '';

                } else {
                    this._router.navigate(['/menu']);
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );

        console.log(this.usuario);
    }

    public subirImagen(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    onSubmit() {
        this.msg_error = 'no';
        this.msg_warn = 'no';
        this.msg_ok = 'no';

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._usuarioService.subirImagen(this.usuario.id, [], this.filesToUpload).then((result) => {
                this.resultUpload = result;
                this.usuario.nueva_imagen = this.resultUpload.filename;
                this.guardarUsuario();

            }, (error) => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            });
        } else {
            this.guardarUsuario();
        }
    }

    private guardarUsuario() {

        if (this.usuario.user_passwd != '' && this.usuario.user_passwd != null) {
            this.usuario.user_passwd = Md5.hashStr(this.usuario.user_passwd).toString();
        }

        if (this.usuario.user_passwd != '' && this.usuario.user_passwd != null && this.antiguaPass != this.usuario.user_passwd) {
            this.msg_warn = 'si';
            this.usuario.user_passwd = '';
            this.usuario.newPasswd = '';
            this.usuario.repeatPasswd = '';
        } else {
            if (this.usuario.user_passwd == '' || this.usuario.user_passwd == null) {
                this.usuario.user_passwd = this.antiguaPass;
            } else {
                if (this.usuario.newPasswd != '' && this.usuario.newPasswd != null) {
                    this.usuario.newPasswd = Md5.hashStr(this.usuario.newPasswd).toString();
                    this.usuario.user_passwd = this.usuario.newPasswd;
                } else {
                    this.usuario.user_passwd = this.antiguaPass;
                }
            }

            if (this.usuario.nueva_imagen != '' && this.usuario.nueva_imagen != null) {
                this.usuario.imagen = this.usuario.nueva_imagen;
            }

            this._usuarioService.setUsuario(this.usuario).subscribe(
                response => {
                    if (response['code'] == 200) {
                        this.msg_ok = 'si';
                        this._almacenamientoService.setSesionActual(new Sesion(this._almacenamientoService.getTokenActual(), this.usuario));
                        this.getInforUsuario();
                        this._router.navigate(['/perfil']);
                    } else {
                        this.msg_error = 'si';
                        this._router.navigate(['/perfil']);
                    }
                },
                error => {
                    console.log(<any>error);
                    this._router.navigate(['/error']);
                }
            );

        }
        this.getInforUsuario();

    }

    eliminarUsuario() {
        if (confirm("¿Está seguro que desea eliminar su cuenta?\nAre you sure you want to delete your account?")) { }
        this._usuarioService.deleteUsuario(this.usuario.id).subscribe(
            response => {
                if (response['code'] == 200) {
                    this._almacenamientoService.borrarSesionActual();
                    this._router.navigate(['/inicio']);
                } else {
                    this.msg_error = 'si';
                    this._router.navigate(['/perfil']);
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }
}
