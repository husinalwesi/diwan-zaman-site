import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
	selector: 'app-phone',
	templateUrl: './phone.component.html',
	styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
	@Input() isSubmit: boolean = false;
	// phone: any;
	CountryISO = CountryISO;

	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	@Output() phoneChange = new EventEmitter();
	@ViewChild('phoneEle') phoneEle: ElementRef;
	constructor() { }


	ngOnInit(): void {
	}

	getData() {
		return {
			isvalid: this.phoneForm.valid,
			phoneDetails: this.phoneForm.value.phone
		}
	}
}
