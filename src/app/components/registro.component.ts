import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
    selector: 'registro',
    templateUrl: '../views/registro.component.html',
    providers: [UsuarioService]
})
export class RegistroComponent implements OnInit{
    public titulo: string;
    public usuario: Usuario;

    constructor(
        private _activateRoute: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.usuario = new Usuario('Carlos','Garcia Montellano','cgm@gmail.com','carmont87','123456789','');
    }

    ngOnInit(){
        console.log('Componente registro.component.ts cargado');
    }

    onSubmit(){
        console.log(this.usuario);
        this._router.navigate(['/inicio']);
        /*this._usuarioService.addUsuario(this.usuario).subscribe(
            response => {
                if(response.code == 200){
                    this.usuario = response.data;
                    this._router.navigate(['/inicio']);
                }else{
                    console.log(response);
                }
            },
            error => {
                console.log(<any>error);
            }
        );*/
    }
}