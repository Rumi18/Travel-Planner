import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { InicioComponent } from './components/inicio.component';
import { RegistroComponent } from './components/registro.component';
import { ErrorComponent } from './components/error.component';
import { MenuComponent } from './components/menu.component';
import { PerfilComponent } from './components/perfil.component';
import { HistorialComponent } from './components/historial.component';
import { RutasPendientesComponent } from './components/rutasPendientes.component';
import { ConfiguracionComponent } from './components/configuracion.component';
import { TiendaComponent } from './components/tienda.component';

const appRoutes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'menuOpciones', component: MenuComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'historial', component: HistorialComponent },
    { path: 'rutasPendientes', component: RutasPendientesComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);