import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { MapaService } from '../services/mapa.service';
import { AlmacenamientoService } from '../services/almacenamiento.service';

// Modelos
import { Mapa } from '../models/mapa';

@Component({
    selector: 'historial',
    templateUrl: '../views/historial.component.html',
    providers: [MapaService]
})
export class HistorialComponent implements OnInit {
    public mapas: Mapa[];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mapaService: MapaService,
        private _almacenamientoService: AlmacenamientoService
    ) {

    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente historial.component.ts');

        let idUsuario: number = this._almacenamientoService.getUsuarioActual().id;
        this.getHistorial(idUsuario);
    }

    getHistorial(idUsuario: number) {
        this._mapaService.getHistorialMapas(idUsuario).subscribe(
            result => {
                if (result['code'] == 200) {
                    if (result['data'].length > 0) {
                        this.mapas = result['data'];
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
