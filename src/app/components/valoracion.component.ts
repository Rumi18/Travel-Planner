import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

// Servicios
import { GLOBAL } from '../services/global';
import { MapaService } from '../services/mapa.service';

// Modelos
import { Valoracion } from '../models/valoracion';

@Component({
    selector: 'valoracion',
    templateUrl: '../views/valoracion.component.html',
    providers: [NgbRatingConfig, MapaService]
})
export class ValoracionComponent implements OnInit {
    public valoracion: Valoracion;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        rating: NgbRatingConfig,
        private _mapaService: MapaService
    ) {
        this.valoracion = new Valoracion(null, 0, null);
        rating.max = 5;
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente valoracion.component.ts');

        this._route.params.forEach((params: Params) => {
            this.valoracion.idMapa = params['id'];
        });
    }

    onSubmit() {
        console.log(this.valoracion);

        this._mapaService.addValoracion(this.valoracion).subscribe(
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
