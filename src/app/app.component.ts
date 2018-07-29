import { Component } from '@angular/core';

// Importación del TranslateService para el idioma
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
 
  constructor(private translateService: TranslateService){
    // Se indica que el idioma por defecto es el español
    this.translateService.setDefaultLang('es');
    // Se indica que el idioma seleccionado es el español
    this.translateService.use('es');  
  }

  switchLanguage(language: string) {  
      this.translateService.use(language);  
  }

}
