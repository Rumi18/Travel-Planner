import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { MarcadorService } from '../services/marcador.service';

// Modelos 
import { Marcador } from '../models/marcador';

@Component({
    selector: 'mapa',
    templateUrl: '../views/mapa.component.html',
    providers: [MarcadorService]
})
export class MapaComponent implements OnInit {
    private maracadores: Marcador [];
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _marcadorService: MarcadorService,
    ) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente mapa.component.ts');

        let idMapa: number = null;
        this._route.params.forEach((params: Params) => {
            idMapa = params['id'];
        });

        if (idMapa != null) {
            this.getMarcadores(idMapa);
        }        
    }

    getMarcadores(idMapa: number) {
        this._marcadorService.getMarcadores(idMapa).subscribe(
            result => {
                if (result['code'] == 200) {
                    if (result['data'].length > 0) {
                        this.maracadores = result['data'];
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
