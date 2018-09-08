import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { GLOBAL } from '../services/global';
import { ConfiguracionService } from '../services/configuracion.service';

// Modelos
import { Configuracion } from '../models/configuracion';
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
    public msg_error: string;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _configuracionService: ConfiguracionService
    ) {
        this.configuracion = new Configuracion(0, 1, null, null, null, null, null, null, []);
    }

    // Método que se lanza automáticamente después del constructor del componente 
    ngOnInit() {
        GLOBAL.vistaSeleccionada = this._route.component['name'];
        console.log('Se ha cargado el componente configuracion.component.ts');
        this.cargaValores();
    }

    cargaValores() {
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
        this.msg_error = 'no';

        if (this.validaFormulario(this.configuracion)) {
            this._configuracionService.addConfiguracion(this.configuracion).subscribe(
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

    //Método que actualiza la lista de preferencias que selecciona el usuario
    onChange(id: number, isChecked: boolean) {
        if (isChecked) {
            this.configuracion.preferencias.push(id);
        } else {
            let index = this.configuracion.preferencias.indexOf(id);
            this.configuracion.preferencias.splice(index, 1);
        }
    }

    private validaFormulario(configuracion: Configuracion) {
        let res;

        if (configuracion.destino == 0) {
            res = false;
            this.msg_error = 'si';

        } else if (configuracion.presupuesto_min == null || isNaN(configuracion.presupuesto_min)) {
            res = false;
            this.msg_error = 'si';

        } else if (configuracion.presupuesto_max == null || isNaN(configuracion.presupuesto_max)) {
            res = false;
            this.msg_error = 'si';

        } else if (configuracion.presupuesto_max > configuracion.presupuesto_max) {
            res = false;
            this.msg_error = 'si';

        } else if (configuracion.mascotas == null || configuracion.acompaniantes == null || configuracion.ninios == null) {
            res = false;
            this.msg_error = 'si';

        } else if (configuracion.preferencias.length <= 0) {
            res = false;
            this.msg_error = 'si';

        } else {
            res = true;
            this.msg_error = 'no';
        }

        return res;
    }
}
