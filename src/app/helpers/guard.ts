import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AlmacenamientoService } from '../services/almacenamiento.service';

@Injectable()
export class Autorizado implements CanActivate {

    constructor(
        private _router: Router,
        private _almacenamientoService: AlmacenamientoService
    ) {

    }

    canActivate() {
        if (!this._almacenamientoService.estaAutenticado()) {
            this._router.navigate(['/login']);
        }
        return this._almacenamientoService.estaAutenticado();
    }
}