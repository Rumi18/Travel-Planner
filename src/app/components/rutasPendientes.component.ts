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

@Component({
    selector: 'rutasPendientes',
    templateUrl: '../views/rutasPendientes.component.html',
    providers: [MapaService, ConfiguracionService]
})
export class RutasPendientesComponent implements OnInit {
    public mapas: Mapa[];
    public configuracion: Configuracion;
    public preferencias: Preferencia[];
    private idUsuario: number;
   
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mapaService: MapaService,
        private _almacenamientoService: AlmacenamientoService,
        private _configuracionService: ConfiguracionService
    ) {
        this.configuracion = new Configuracion(0, 1, null, null, null, null, null, null, []);
        this.preferencias = [];      
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente rutasPendientes.component.ts');

        this.idUsuario = this._almacenamientoService.getUsuarioActual().id;
        this.getMapasPendientes(this.idUsuario);

    }

    getMapasPendientes(idUsuario: number) {
        this._mapaService.getMapasPendientes(idUsuario).subscribe(
            result => {
                if (result['code'] == 200) {
                    if (result['data'].length > 0) {
                        this.mapas = result['data'];
                    }else{
                        this.mapas = null;
                    }
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/error']);
            }
        );
    }

    verDetalles(idConfiguracion: number) {
        this._configuracionService.getConfiguracion(idConfiguracion).subscribe(
            result => {
                if (result['code'] == 200) {
                    this.configuracion = result['data'];
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
    }

    eliminarMapa(idMapa: number) {
        if (confirm("¿Está seguro que desea eliminar este mapa?\nAre you sure you want to delete this map?")) {
            this._mapaService.deleteMapa(idMapa).subscribe(
                response => {
                    console.log("Resultado: " + response['code']);
                    if (response['code'] == 200) {                 
                        this.getMapasPendientes(this.idUsuario); 
                        this._router.navigate(['/rutasPendientes']);
                        
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
}
