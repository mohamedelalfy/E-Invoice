import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n/translation.service';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as arLang } from './modules/i18n/vocabs/ar';
import { TranslateService } from '@ngx-translate/core';




@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private translate: TranslateService) {

    // register translations
    this.translationService.loadTranslations(
      enLang,
      arLang,
    );
  }

  ngOnInit() {}
}
