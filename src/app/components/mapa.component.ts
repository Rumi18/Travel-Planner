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
    public dias: number[];
    public marcadores: Marcador[];

    latMapa: number;
    lngMapa: number;
    zoom: number;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mapaService: MapaService
    ) {      
        this.dias = [];
        
        this.zoom = 11;
        this.latMapa = GLOBAL.latidud_defecto;
        this.lngMapa = GLOBAL.longitud_defecto;       
        this.marcadores = [new Marcador('', GLOBAL.latidud_defecto, GLOBAL.longitud_defecto, 1)];
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente mapa.component.ts');

        let idMapa = null;
        let numDias = null;

        this._route.params.forEach((params: Params) => {
            idMapa = params['id'];
            numDias = params['numDias'];
        });

        if (idMapa != null) {
            this.creaMenuDias(numDias);
            this.getMarcadores(idMapa);
        }
    }

    creaMenuDias(numDias: number) {        
        if (numDias != null) {
            for (let i = 0; i <= numDias; i++) {
                this.dias.push(i);
            }
        }
    }

    getMarcadores(idMapa: number) {
        this._mapaService.getMarcadores(idMapa).subscribe(
            result => {
                if (result['code'] == 200) {
                    result['data'].forEach(marcador => {
                        marcador.latitud = parseFloat(marcador.latitud);
                        marcador.longitud = parseFloat(marcador.longitud);
                        this.marcadores.push(marcador);
                    });
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }
}
