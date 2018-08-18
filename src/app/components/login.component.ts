import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { UsuarioService } from '../services/usuario.service';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

@Component({
    selector: 'login',
    templateUrl: '../views/login.component.html',
    providers: [UsuarioService],
    
})
export class LoginComponent implements OnInit{
    public usuarioLogin: Login;
    public usuario: Usuario;
    public validate:string;

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
           this._usuarioService.getUsuario(this.usuarioLogin.user_name).subscribe(
                result => {
                    if(result['code'] != 200){
                        this.validate = 'no';
                        this._router.navigate(['/login']);
                    }else{
                        this.usuario = result['data'];
                        if(this.usuario.user_passwd == this.usuarioLogin.user_passwd){
                            this.validate = 'si';
                            this._router.navigate(['/menuOpciones']);
                        }else{
                            this.validate = 'no';
                            this._router.navigate(['/login']);
                        }
                    }
                },
                error => {
                    console.log(<any>error);
                    this._router.navigate(['/error']);
                }
            );

            console.log("Este es mi usuario: ");
            console.log(this.usuario);

            //this._router.navigate(['/inicio']);
        }else{
            this._router.navigate(['/inicio']);
        }
    }
}