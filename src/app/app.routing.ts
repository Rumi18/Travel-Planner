import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { InicioComponent } from './components/inicio.component';
import { RegistroComponent } from './components/registro.component';
import { ErrorComponent } from './components/error.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);