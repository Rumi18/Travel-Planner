import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Md5 } from 'ts-md5';

//Servicios
import { Autorizado } from './helpers/guard';
import { AlmacenamientoService } from './services/almacenamiento.service';

// Traductor
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Rutas
import { routing, appRoutingProviders } from './app.routing';

// Componentes
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera.component';
import { InicioComponent } from './components/inicio.component';
import { RegistroComponent } from './components/registro.component';
import { LoginComponent } from './components/login.component';
import { RecuperacionComponent } from './components/recuperacion.component';
import { ErrorComponent } from './components/error.component';
import { MenuComponent } from './components/menu.component';
import { PerfilComponent } from './components/perfil.component';
import { HistorialComponent } from './components/historial.component';
import { RutasPendientesComponent } from './components/rutasPendientes.component';
import { ConfiguracionComponent } from './components/configuracion.component';
import { TiendaComponent } from './components/tienda.component';
import { MapaPendienteComponent } from './components/mapaPendiente.component';
import { MapaHistorialComponent } from './components/mapaHistorial.component';
import { MapaCreadoComponent } from './components/mapaCreado.component';
import { GuardarMapaComponent } from './components/guardarMapa.component';
import { ValoracionComponent } from './components/valoracion.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    InicioComponent,
    RegistroComponent,
    LoginComponent,
    RecuperacionComponent,
    ErrorComponent,
    MenuComponent,
    PerfilComponent,
    HistorialComponent,
    RutasPendientesComponent,
    ConfiguracionComponent,
    TiendaComponent,
    MapaPendienteComponent,
    MapaHistorialComponent,
    MapaCreadoComponent,
    GuardarMapaComponent,
    ValoracionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    routing,    
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBVj2Sx4KVLFWBuXhK6ypOrSCqPBX_-_fA'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [appRoutingProviders, Md5, Autorizado, AlmacenamientoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
