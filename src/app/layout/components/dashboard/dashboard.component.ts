import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/i18n/translation.service';
import { ApiService } from 'src/app/shared/services/api.service';
// import { SharedService } from '../../services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  banner1: string = "http://diwan-zaman.com/assets/images/banner.gif";
  banner2: string = "http://diwan-zaman.com/assets/images/banner-2.webp";
  isFirstTime: boolean = true;
  width: any = window.innerWidth;
  time: any = {
    startTime: "00:00",
    closeTime: "00:00"
    // startTime: {
    //   h: 10,
    //   m: 0
    // },
    // closeTime: {
    //   h: 22,
    //   m: 0
    // },
  };
  isClosed: boolean = false;
  language: string = "en";
  languages: any = ["en", "ar"];
  search: string = "";
  searchModal: boolean = false;
  activeTab: string = "";
  list: any = [];

  @ViewChild('tabs') left: ElementRef;
  stop: number = 0;

  constructor(
    private sharedService: SharedService,
    private translationService: TranslationService,
    private cdk: ChangeDetectorRef,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService,
  ) {
    this.getSharedData();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getSelectedLanguage();
    // getHomeData
    this.getHomeDataMethod();
  }

  getSharedData() {
    let _this = this;
    this.sharedService.sharedData$.subscribe(event => {
      if (!this.sharedService.isEmpty(event)) {
        this.banner1 = event.banner1;
        this.banner2 = event.banner2;
        _this.time = {
          startTime: event.startTime,
          closeTime: event.closeTime
        }
        _this.checkIsClosed();
        _this.cdk.detectChanges();
      }
    });
  }

  getHomeDataMethod() {
    this.apiService.getHomeData().subscribe(
      (success) => {
        this.list = success.dataObject.filter(item => item.data.length > 0);
        if (this.list.length > 0) this.calculateHeights();
        this.cdk.detectChanges();
        this.spinner.hide();
        // this.mapData(success);
      }, (error) => {
        this.spinner.hide();
        // this.alert.error({ title: error.error.message });
        // this.spinner.hide();
      });
  }

  calculateHeights() {
    this.activeTab = "all";
    setTimeout(() => {
      let collapses = document.querySelectorAll(".collapse");
      collapses.forEach(collapse => {
        let body: any = collapse.querySelector(".body");
        body.style.height = "auto";
        body.setAttribute("heightcustom", body.offsetHeight)
      });
      this.activeTab = "";
      this.closeExcept();
      this.open(this.list[0].id);
    });
  }

  checkIsClosed() {
    let cTime = new Date().getTime();
    let startTimeArray = this.time.startTime.split(":");
    let closeTimeArray = this.time.closeTime.split(":");
    let start = new Date(new Date().setHours(startTimeArray[0], startTimeArray[1], 0, 0)).getTime();
    let end = new Date(new Date().setHours(closeTimeArray[0], closeTimeArray[1], 0, 0)).getTime();
    // 
    if (cTime > start && cTime < end) this.isClosed = false;
    else this.isClosed = true;
    this.cdk.detectChanges();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.stop = this.left.nativeElement.offsetParent.offsetTop;
    });
  }

  closeExcept() {
    let collapses = document.querySelectorAll(".collapse");
    collapses.forEach(collapse => {
      let body: any = collapse.querySelector(".body");
      body.style.height = "0px";
    });
  }

  open(key) {
    setTimeout(() => {
      let ele: any = document.querySelector(`#section-${key} .body`);
      ele.style.height = `${ele.getAttribute('heightcustom')}px`;
      this.activeTab = key;
      if (!this.isFirstTime) {
        setTimeout(() => {
          window.scrollTo({ top: ele.offsetTop - 120, behavior: 'smooth' });
        }, 150);
      }
      this.isFirstTime = false;
    });
  }

  setSelectedTab(key) {
    let isSame = key == this.activeTab;
    this.activeTab = isSame ? "" : key;
    this.closeExcept();
    if (!isSame) this.open(key);
    // let xx = document.querySelectorAll(".collapse");

    // body.setAttribute("heightcustom", body.offsetHeight)


    // if (!isSame) {
    //   setTimeout(() => {
    //     // let ele: any = document.querySelector(`#section-${key}`);
    //     // console.log(ele.offsetTop);

    //     // window.scrollTo({ top: ele.offsetTop, behavior: 'smooth' });

    //     // ele.scrollIntoView({ behavior: "smooth", block: 'center' });
    //   });
    //   // console.log(ele);
    // }

    // 
    // let el = document.getElementById(`section-${key}`);
    // el.scrollIntoView({ behavior: "smooth", block: 'center' });
    // setTimeout(() => {
    //   let tabsDetails: any = document.querySelectorAll("details");
    //   tabsDetails.forEach(ele => {
    //     if (!ele.classList.contains("active")) {
    //       ele.removeAttribute("open");
    //     } else {
    //       ele.setAttribute("open", true);
    //     }
    //   });
    // });
  }

  toggleSearch(flag) {
    this.searchModal = flag;
    this.search = "";
  }

  getFiltteredData() {
    let search = this.search.toLowerCase();
    return this.list.map(item => item.id != "special" && item.data.filter(product => search && (
      product.title_ar.toLowerCase().indexOf(search) !== -1 ||
      product.title_en.toLowerCase().indexOf(search) !== -1 ||
      product.desc1_en.toLowerCase().indexOf(search) !== -1 ||
      product.desc2_en.toLowerCase().indexOf(search) !== -1 ||
      product.desc1_ar.toLowerCase().indexOf(search) !== -1 ||
      product.desc2_ar.toLowerCase().indexOf(search) !== -1
    )) || []).flat() || [];
  }

  setLanguage(lang) {
    this.translationService.setLanguage(lang);
    location.reload();
    // this.language = lang;
    // this.sharedService.setHtmlDirection(lang);
  }
  getSelectedLanguage() {
    this.language = this.translationService.getSelectedLanguage();
  }

  getStartHour() {
    return this.time.startTime.split(":")[0];
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(event) {
    if (this.stop <= 0) return false;
    let windowEle: any = (document.documentElement || document.body.parentNode || document.body);
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : windowEle.scrollTop;
    if (scrollTop >= this.stop) {
      this.left.nativeElement.className = 'sticky-ele';
    } else {
      this.left.nativeElement.className = '';
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    if (this.width != window.innerWidth) {
      if (this.list.length > 0) this.calculateHeights();
      this.width = window.innerWidth;
    }
  }

}
