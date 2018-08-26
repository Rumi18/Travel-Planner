import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { MapaService } from '../services/mapa.service';

// Modelos 
import { Marcador } from '../models/marcador';

@Component({
    selector: 'mapa',
    templateUrl: '../views/mapa.component.html',
    providers: [MapaService]
})
export class MapaComponent implements OnInit {
    public idMapa: number;
    public numDias: number;
    public marcadores: Marcador[][];
    latMapa: number;
    lngMapa: number;


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mapaService: MapaService
    ) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente mapa.component.ts');

        this.idMapa = null;
        this._route.params.forEach((params: Params) => {
            this.idMapa = params['id'];
            this.numDias = params['numDias'];
        });

        if (this.idMapa != null) {
            this.getMarcadores(this.idMapa);
        }
    }

    getMarcadores(idMapa: number) {
        this._mapaService.getMarcadores(idMapa).subscribe(
            result => {
                if (result['code'] == 200) {
                    if (result['data'].length > 0) {
                        this.clasificaMarcadores(result['data']);
                    }
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }

    clasificaMarcadores(marcadoresOb: Marcador[]) {
        this.marcadores = [];

        for (let i = 0; i <= this.numDias; i++) {
            this.marcadores.push([]);
        }

        marcadoresOb.forEach(marcador => {
            this.marcadores[0].push(marcador);
            this.marcadores[(marcador.dia)].push(marcador);
        });

        this.latMapa = parseFloat(this.marcadores[0][0].latitud);
        this.lngMapa = parseFloat(this.marcadores[0][0].longitud);
    }
}
