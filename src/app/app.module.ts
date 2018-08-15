import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

// Traductor
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio.component';
import { MenuComponent } from './components/menu.component';
import { PerfilComponent } from './components/perfil.component';
import { HistorialComponent } from './components/historial.component';
import { RutasPendientesComponent } from './components/rutasPendientes.component';
import { ConfiguracionComponent } from './components/configuracion.component';
import { TiendaComponent } from './components/tienda.component';

// Rutas
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    PerfilComponent,
    HistorialComponent,
    RutasPendientesComponent,
    ConfiguracionComponent,
    TiendaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    FormsModule,  
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
