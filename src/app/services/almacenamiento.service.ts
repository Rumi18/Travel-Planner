import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../models/sesion';
import { Usuario } from '../models/usuario';

@Injectable()
export class AlmacenamientoService {

  private servicioAlmacenamientoLocal;
  private sesionActual : Sesion = null;

  constructor(private _router: Router) {
    this.servicioAlmacenamientoLocal = localStorage;
    this.sesionActual = this.cargarDatosSesion();
  }

  setSesionActual(sesion: Sesion): void {
    this.sesionActual = sesion;
    this.servicioAlmacenamientoLocal.setItem('usuarioActual', JSON.stringify(sesion));
  }

  cargarDatosSesion(): Sesion{
    var sesionStr = this.servicioAlmacenamientoLocal.getItem('usuarioActual');
    return (sesionStr) ? <Sesion> JSON.parse(sesionStr) : null;
  }

  getSesionActual(): Sesion {
    return this.sesionActual;
  }

  borrarSesionActual(): void {
    this.servicioAlmacenamientoLocal.removeItem('usuarioActual');
    this.sesionActual = null;
  }

  getUsuarioActual(): Usuario {
    var sesion: Sesion = this.getSesionActual();
    return (sesion && sesion.usuario) ? sesion.usuario : null;
  };

  estaAutenticado(): boolean {
    return (this.getTokenActual() != null) ? true : false;
  };

  getTokenActual(): string {
    var session = this.getSesionActual();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.borrarSesionActual();
    this._router.navigate(['/login']);
  }

  generarToken(): string {
    return Math.random().toString(36).substr(2);
  }

}