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

    constructor(
        private _router: Router,
        private _route: ActivatedRoute
    ) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente perfil.component.ts');

        //Llamamos a base de datos para obtener la información del usuario
        this.usuario = new Usuario('Gaara', 'Del Desierto', 'realGaara@gmail.com', 'gaaraD', '', '', '');
    }

    onSubmit() {
        console.log(this.usuario);

    }
}
