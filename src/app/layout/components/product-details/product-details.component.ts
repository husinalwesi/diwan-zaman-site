import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslationService } from 'src/app/i18n/translation.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  share: any = [
    {
      link: '',
      img: 'assets/images/copy_link.png',
      text: 'Copy Link'
    },
    {
      link: `https://api.whatsapp.com/send?text=`,
      img: 'assets/images/whats.png',
      text: 'WhatsApp'
    },
    {
      link: `https://www.facebook.com/sharer/sharer.php?u=`,
      img: 'assets/images/face.png',
      text: 'Facebook'
    },
    // {
    //   link: '',
    //   img: 'assets/images/inst.png',
    //   text: 'Instagram'
    // }
  ];
  id: string = "";
  language: string = "en";
  product: any = null;
  counter: number = 1;
  selection: string = "";
  notes: string = "";
  // choises: any = [];
  constructor(
    private metaService: Meta,
    private sharedService: SharedService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private cdk: ChangeDetectorRef,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private title: Title,
    // private modalService: NgbModal,
    private alert: AlertService,
  ) {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('ID');
    this.getData();    
  }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  handleClick(item) {
    let productLink = `http://diwan-zaman.com/#/product/${this.id}`;
    if (item.text == "Copy Link") {
      this.copyToClipboard(productLink);
      this.alert.success({ title: 'Link copied' });
    } else {
      window.open(item.link + productLink, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=200,width=400,height=400");
    }
  }

  copyToClipboard(txt) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = txt;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  showShare() {
    this.sharedService.showModal();
  }



  getSelectedLanguage() {
    this.language = this.translationService.getSelectedLanguage();
  }

  getData() {
    this.apiService.getProductByID(this.id).subscribe(
      (success) => {
        // this.list = success.dataObject;
        this.product = success.dataObject;
        // console.log(this.product);
        this.title.setTitle(this.product.title_en + " Diwan Zaman | Arabic Restaurant - Grill Restaurant");
        this.metaService.updateTag({ name: 'og:title', content: this.product.title_en + " Diwan Zaman | Arabic Restaurant - Grill Restaurant" });        
        this.metaService.updateTag({ name: 'og:image', content: this.product.image });        
        // console.log(this.product);

        // this.choises = [
        //   {
        //     id: 1,
        //     title: '250 G',
        //     price: 5.75
        //   },
        //   {
        //     id: 2,
        //     title: '300 G',
        //     price: 65
        //   },
        //   {
        //     id: 3,
        //     title: '500 G',
        //     price: 45
        //   }
        // ];
        // console.log(this.product.unitsDetails);

        if (this.product.unitsDetails.length > 0) this.selection = this.product.unitsDetails[0].id;
        // console.log(this.selection);

        this.updateData();
        this.cdk.detectChanges();
        this.spinner.hide();
        // this.mapData(success);
      }, (error) => {
        this.spinner.hide();
        // this.alert.error({ title: error.error.message });
        // this.spinner.hide();
      });
  }

  changeSelection(id) {
    this.selection = id;
    this.updateData();
  }

  plus(e) {
    this.counter = e;
    // this.counter++;
    this.updateData();
  }

  noteChange(e) {
    this.updateData();
  }

  minus(e) {
    this.counter = e;
    // this.counter--;
    // if (this.counter < 1) this.counter = 1;
    this.updateData();
  }

  updateData() {
    this.sharedService.product$.next({
      selection: this.product.unitsDetails.find(choice => +choice.id == +this.selection),
      counter: this.counter,
      notes: this.notes,
      data: this.product
    });
  }

}
