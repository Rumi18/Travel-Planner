import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public title = 'Travel Planner';
  public componentURL = '';

  constructor(
    private _translateService: TranslateService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this._translateService.setDefaultLang('es');
  }

}