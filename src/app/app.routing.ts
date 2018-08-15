import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ErrorComponent } from './components/error.component';
import { InicioComponent } from './components/inicio.component';
import { RegistroComponent } from './components/registro.component';
import { LoginComponent } from './components/login.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);