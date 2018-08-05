import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { InicioComponent } from './components/inicio.component';

const appRoutes: Routes = [
    {path:'', component: InicioComponent},
    {path:'inicio', component: InicioComponent},
    {path:'**', component: InicioComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);