import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { CorreoService } from '../services/correo.service';
import { GLOBAL } from '../services/global';

// Modelos
import { Recuperacion } from '../models/recuperacion';
import { Usuario } from '../models/usuario';

@Component({
    selector: 'recuperacion',
    templateUrl: '../views/recuperacion.component.html',
    providers: [UsuarioService, CorreoService],
})

export class RecuperacionComponent {
    public recuperado: Recuperacion;
    public usuario: Usuario;
    public emailCorrecto: string;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _correoService: CorreoService
    ) {
        this.recuperado = new Recuperacion('');
        this.emailCorrecto = '';
    }

    ngOnInit() {
        console.log('Se ha cargado el componente recuperacion.component.ts');
        GLOBAL.vistaSeleccionada = this._route.component['name'];
    }

    onSubmit() {
       
        this._usuarioService.getUsuarioEmail(this.recuperado).subscribe(
            result => {
                if (result['code'] != 200) {
                    console.log('No se ha recuperado ningun correo');
                    this.emailCorrecto = 'no';
                    this.recuperado.correo = '';
                    this._router.navigate(['/recuperacion']);
                } else {
                    this.usuario = result['data'];

                    if (this.usuario.email == this.recuperado.correo) {
                        // Mandar correo
                        this._correoService.enviarMensaje(this.usuario).subscribe(
                            res => {
                                console.log('AppComponent Success', res);
                            },
                            error => {
                                console.log('AppComponent Error', error);
                            }
                        );

                        this.emailCorrecto = 'si';
                        this._router.navigate(['/recuperacion']);
                        console.log('HURRAAAAAAAAAA ME VA A MANDAR UN CORREO');
                    } else {
                        this.emailCorrecto = 'no';
                        this._router.navigate(['/recuperacion']);
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