import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, UserType } from '../../../../../../modules/auth';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user$: Observable<UserType>;
  langs = languages;
  username= localStorage.getItem('username')
  private unsubscribe: Subscription[] = [];
  selectedLang!:string;
  currentLang: string;
  user:string;
  constructor(
    private auth: AuthService,
    private translationService: TranslationService,
    @Inject(DOCUMENT) private document: Document

  ) {
    
  }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onChangeLanguage(lang: string): void {
    this.selectedLang = lang;
    const htmlTag = this.document.getElementsByTagName('html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = this.selectedLang === 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = this.selectedLang;
    this.document.body.className = this.selectedLang === 'ar' ? 'body_Ar' : 'body_En';
    // localStorage.setItem('lang', this.selectedLang);
    // this.translationService.use(this.selectedLang);
   
  }
  changeCurrentLang(lang: string){
    // this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
    localStorage.setItem('Lang','0');
    this.onChangeLanguage(lang);
    window.location.reload();
  }
  changeCurrentLangarb(){
    // this.translate.use('ar');
    localStorage.setItem('currentLang', 'ar');
    localStorage.setItem('Lang','1');
    this.onChangeLanguage('ar');
    window.location.reload();
  }

}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'ar',
    name: 'Egypt',
    flag: './assets/media/flags/egypt.svg',
  },

];
