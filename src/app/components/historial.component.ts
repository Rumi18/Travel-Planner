import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { MapaService } from '../services/mapa.service';
import { AlmacenamientoService } from '../services/almacenamiento.service';
import { ConfiguracionService } from '../services/configuracion.service';

// Modelos
import { Mapa } from '../models/mapa';
import { Configuracion } from '../models/configuracion';
import { Preferencia } from '../models/preferencia';
import { Valoracion } from '../models/valoracion';

@Component({
    selector: 'historial',
    templateUrl: '../views/historial.component.html',
    providers: [MapaService, ConfiguracionService]
})
export class HistorialComponent implements OnInit {
    public mapas: Mapa[];
    public configuracion: Configuracion;
    public preferencias: Preferencia[];
    public valoracion: Valoracion;


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mapaService: MapaService,
        private _almacenamientoService: AlmacenamientoService,
        private _configuracionService: ConfiguracionService
    ) {
        this.configuracion = new Configuracion(0, 1, null, null, null, null, null, null, []);
        this.preferencias = [];
        this.valoracion = new Valoracion(null, 0, null);
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

    verDetalles(idMapa:number, idConfiguracion: number) {
        this._configuracionService.getConfiguracion(idConfiguracion).subscribe(
            result => {
                if (result['code'] == 200) {
                    this.configuracion = result['data'];                   
                }else{
                    this.mapas = null;
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );

        this._configuracionService.getPreferenciasConfiguracion(idConfiguracion).subscribe(
            result => {
                if (result['code'] == 200) {
                    this.preferencias = result['data'];
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );

        this._mapaService.getMapa(idMapa).subscribe(
            result => {
                if (result['code'] == 200) {
                    this.valoracion = result['data'];
                    console.log("aaa");
                    console.log(this.valoracion);
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }
}
