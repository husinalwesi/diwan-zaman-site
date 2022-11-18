import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService as translateS } from 'src/app/i18n/translation.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public product$ = new BehaviorSubject<any>([]);
  public sharedData$ = new BehaviorSubject<any>({});
  public imageFullView$ = new BehaviorSubject<string>('');
  public isModalEnabled$ = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private translate: TranslateService,
    private translateS: translateS,
  ) {
    this.translate.use(this.translateS.getSelectedLanguage());
  }

  redirectTo(path, params = null) {
    if (params) this.router.navigate([path, params]);
    else this.router.navigate([path]);
  }

  removeFromArrayByIndex(arr, index) {
    if (arr.length > 1) {
      arr.splice(index, 1);
      return arr;
    } else {
      return [];
    }
  }

  t(str) {
    if (!str) return "";
    let translated = this.translate.instant(str);
    return translated ? translated : str;
  }

  isRTL() {
    return this.translateS.getSelectedLanguage() == "ar" ? true : false;
  }

  setHtmlDirection(lang: string) {
    let htmlTag = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    htmlTag.lang = lang;
    htmlTag.classList.add(lang === "ar" ? "rtl" : "ltr");
    htmlTag.classList.remove(lang !== "ar" ? "rtl" : "ltr");
  }

  showImageFullView(img) {
    this.imageFullView$.next(img);
  }

  showModal() {
    this.isModalEnabled$.next(true);
    document.body.classList.add("overflow-hidden");
  }

  hideModal() {
    this.isModalEnabled$.next(false);
    document.body.classList.remove("overflow-hidden");
  }

  isEmpty(value) {
    return (
      // null or undefined
      (value == null) ||

      // has length and it's zero
      (value.hasOwnProperty('length') && value.length === 0) ||

      // is an Object and has no keys
      (value.constructor === Object && Object.keys(value).length === 0)
    )
  }

}
