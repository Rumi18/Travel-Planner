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
    public msg_error: string;

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
    }

    onSubmit() {
        if(this.validaFormulario(this.usuario)){
            this._usuarioService.addUsuario(this.usuario).subscribe(
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
            this._router.navigate(['/registro']);
        }
    }

    private validaFormulario(usuario : Usuario){
        let res;       

        if(usuario.nombre == null || usuario.nombre == ''){
            res = false;
            this.msg_error = 'si';
        }else if (usuario.email == null || usuario.email == ''){
            res = false;
            this.msg_error = 'si';
        }else if (usuario.user_name == null || usuario.user_name == ''){
            res = false;
            this.msg_error = 'si';
        }else if (usuario.user_passwd == null || usuario.user_passwd == ''){
            res = false;
            this.msg_error = 'si';
        }else{
            res = true;
            this.msg_error = 'si';
        }

        return res;
    }
}
