import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/i18n/translation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  language: string = "en";
  @Input() product: any;
  constructor(
    private translateService: TranslateService,
    private translationService: TranslationService,
  ) {
    translateService.onLangChange.subscribe(lang => {
      this.getSelectedLanguage();
    });
  }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.language = this.translationService.getSelectedLanguage();
  }

}
