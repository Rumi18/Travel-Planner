import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { ConfiguracionService } from '../services/configuracion.service';

// Modelos
import { Configuracion } from '../models/configuracion';
import { TipoTurismo } from '../enums/tipoTurismo';
import { Ciudad } from '../models/ciudad';

@Component({
    selector: 'configuracion',
    templateUrl: '../views/configuracion.component.html',
    providers: [ConfiguracionService]
})
export class ConfiguracionComponent implements OnInit {
    public configuracion: Configuracion;
    public ciudades: Ciudad[];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _configuracionService: ConfiguracionService
    ) {       
        this.configuracion = new Configuracion("Sevilla", 0, 0, 0, false, false, false, TipoTurismo.Cultura);
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {            
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente configuracion.component.ts');     
        
        this.getCiudades();         
    }

    getCiudades() {
        this._configuracionService.getCiudades().subscribe(
            result => {              
                if (result.code == 200) {                                     
                    this.ciudades = result.data;         
                    console.log(this.ciudades);                
                } else {
                    this.ciudades = [];                    
                }
            },
            error => {              
                this._router.navigate(['/error']);
            }
        );
    }

    // Método para persistir en BD una nueva configuración
    onSubmit() {
    }
}
