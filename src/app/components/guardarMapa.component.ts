import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MapaService } from '../services/mapa.service';

// Servicios
import { GLOBAL } from '../services/global';

@Component({
    selector: 'guardarMapa',
    templateUrl: '../views/guardarMapa.component.html',
    providers: [MapaService]
})
export class GuardarMapaComponent implements OnInit {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mapaService: MapaService
    ) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente guardarMapa.component.ts');
    }

    guardarMapa() {
        let idMapa: number;
        this._route.params.forEach((params: Params) => {
            idMapa = params['id'];
        });

        this._mapaService.addMapa(idMapa).subscribe(
            response => {
                if (response['code'] == 200) {
                    this._router.navigate(['/menuOpciones']);
                } else {
                    this._router.navigate(['/error']);
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }
}
