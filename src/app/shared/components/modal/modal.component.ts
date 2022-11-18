import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isClickOutSideDisabled: boolean = false;
  isModalEnabled: boolean = false;
  @Input() modalTemplate: TemplateRef<any>;

  constructor(
    private sharedService: SharedService,
    private cdk: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    let _this = this;
    this.sharedService.isModalEnabled$.subscribe(event => {
      _this.isModalEnabled = event;
      _this.cdk.detectChanges();
    });
  }

  hideModal() {
    if (this.isClickOutSideDisabled) return false;
    this.sharedService.hideModal();
  }

}
