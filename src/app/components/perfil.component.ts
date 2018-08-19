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

    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.usuario = new Usuario(null,'', '', '', '', '', '', '', '');  
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente perfil.component.ts');
        this.getInforUsuario();
               
    }

    onSubmit() {
       
    }

    private getInforUsuario(){
        this._usuarioService.getUsuario(GLOBAL.idUsuario).subscribe(
            result => {
                if (result['code'] == 200) {                    
                    this.usuario = result['data'];   
                    this.antiguaPass = this.usuario.user_passwd;
                    this.usuario.user_passwd='';

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
}
