import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { ConfiguracionService } from '../services/configuracion.service';

// Modelos
import { Configuracion } from '../models/configuracion';
import { TipoTurismo } from '../enums/tipoTurismo';
import { Ciudad } from '../models/ciudad';
import { Preferencia } from '../models/preferencia';

@Component({
    selector: 'configuracion',
    templateUrl: '../views/configuracion.component.html',
    providers: [ConfiguracionService]
})
export class ConfiguracionComponent implements OnInit {
    public configuracion: Configuracion;
    public ciudades: Ciudad[];
    public preferencias: Preferencia[];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _configuracionService: ConfiguracionService
    ) {   
        let pref: Preferencia[] = [new Preferencia(1,"","")];
        this.configuracion = new Configuracion(0, 0, 0, false, false, false, pref);
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {            
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente configuracion.component.ts');           
        this.cargaValores();         
    }

    cargaValores(){
        this.getCiudades();
        this.getPreferencias();
    }

    getCiudades() {
        this._configuracionService.getCiudades().subscribe(
            result => {              
                if (result['code'] == 200) {                                     
                    this.ciudades = result['data'];              
                } else {
                    this.ciudades = [];                    
                }
            },
            error => {   
                console.log(<any>error);           
                this._router.navigate(['/error']);
            }
        );
    }

    getPreferencias() {
        this._configuracionService.getPreferencias().subscribe(
            result => {              
                if (result['code'] == 200) {                                     
                    this.preferencias = result['data'];                
                } else {
                    this.preferencias = [];                    
                }
            },
            error => {       
                console.log(<any>error);       
                this._router.navigate(['/error']);
            }
        );
    }

    // Método para persistir en BD una nueva configuración
    onSubmit() {
    }
}
