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
import { LoginComponent } from './components/login.component';
import { Autorizado } from'../app/helpers/guard';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'menuOpciones', component: MenuComponent, canActivate: [Autorizado]},
    {path: 'perfil', component: PerfilComponent, canActivate: [Autorizado]},
    {path: 'historial', component: HistorialComponent, canActivate: [Autorizado]},
    {path: 'rutasPendientes', component: RutasPendientesComponent, canActivate: [Autorizado]},
    {path: 'configuracion', component: ConfiguracionComponent, canActivate: [Autorizado]},
    {path: 'tienda', component: TiendaComponent, canActivate: [Autorizado]},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);