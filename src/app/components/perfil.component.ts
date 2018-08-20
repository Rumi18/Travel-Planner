import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../services/global';

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
        private _route: ActivatedRoute
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
        
        this._usuarioService.getUsuario(GLOBAL.idUsuario).subscribe(
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
    }

    private subirImagen(fileInput: any) {
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
        if (this.usuario.user_passwd != '' && this.antiguaPass != this.usuario.user_passwd) {
            this.msg_warn = 'si';
            this.usuario.user_passwd = '';
            this.usuario.newPasswd = '';
            this.usuario.repeatPasswd = '';
        } else {
            if (this.usuario.user_passwd == '') {              
                this.usuario.user_passwd = this.antiguaPass;
            } else {
                if (this.usuario.newPasswd != '') {
                    this.usuario.user_passwd = this.usuario.newPasswd;
                } else {
                    this.usuario.user_passwd = this.antiguaPass;
                }
            }

            if (this.usuario.nueva_imagen != '') {
                this.usuario.imagen = this.usuario.nueva_imagen;
            }

            this._usuarioService.setUsuario(this.usuario).subscribe(
                response => {
                    if (response.code == 200) {
                        this.msg_ok = 'si';
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

    eliminarUsuario(){
        this._usuarioService.deleteUsuario(this.usuario.id).subscribe(
                response => {
                    if (response.code == 200) {                         
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

