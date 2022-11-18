import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/i18n/translation.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-site-content',
  templateUrl: './site-content.component.html',
  styleUrls: ['./site-content.component.scss']
})
export class SiteContentComponent implements OnInit {
  language: string = "en";
  page: string = "";
  content: string = "";
  constructor(
    private cdk: ChangeDetectorRef,
    private apiService: ApiService,
    private translationService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.getSelectedLanguage();
    this.getSiteContentMethod();
  }

  getSelectedLanguage() {
    this.language = this.translationService.getSelectedLanguage();
  }

  getSiteContentMethod() {
    this.apiService.getSiteContent().subscribe(
      (success) => {
        if (window.location.href.indexOf("terms-and-conditions") !== -1) {
          let content = success.dataObject.find(item => item.key_text == "terms_conditions");
          this.page = "Terms and Conditions";
          this.content = this.language == "en" ? content.value_en : content.value_ar;
        } else {
          let content = success.dataObject.find(item => item.key_text == "privacy_policy");
          this.page = "Privacy Policy";
          this.content = this.language == "en" ? content.value_en : content.value_ar;
        }
        this.cdk.detectChanges();
        // this.mapData(success);
      }, (error) => {
        // this.alert.error({ title: error.error.message });
        // this.spinner.hide();
      });
  }

}
