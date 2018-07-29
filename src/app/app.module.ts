import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

// Dependencias para el idioma
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";

// Componentes
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })   
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Función que obtiene los ficheros json de las traducciones desde el directorio ./src/assets/i18n
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}