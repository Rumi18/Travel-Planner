import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { UsuarioService } from '../services/usuario.service';
import { Login } from '../models/login';

@Component({
    selector: 'login',
    templateUrl: '../views/login.component.html',
    providers: [UsuarioService],
    
})
export class LoginComponent implements OnInit{
    public usuarioLogin: Login;

    constructor(
        private _router: Router,
        private _usuarioService: UsuarioService
    ){
        this.usuarioLogin = new Login('', '');
    }

    ngOnInit(){
        console.log('Componente login.component.ts cargado');
    }

    onSubmit(){
        console.log(this.usuarioLogin);

        if(GLOBAL.url_api != 'prueba'){
           /* this._usuarioService.getUsuarios().subscribe(
                result => {
                    if(result['code'] != 200){
                        console.log(result);
                    }else{
                        this.productos = result['data'];
                    }
                }
            )*/
            console.log(this.usuarioLogin.user_name);
            console.log(this.usuarioLogin.user_passwd);
            this._router.navigate(['/inicio']);
        }else{
            this._router.navigate(['/inicio']);
        }
    }
}