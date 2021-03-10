import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { timestamp } from 'rxjs/operators';
import * as BankDetails from 'src/assets/json/bankDetails.json'

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.css']
})
export class QrCodeGeneratorComponent implements OnInit {
  // elementType = NgxQrcodeElementTypes.URL;
  // correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  details: any;
  selected: any;
  value: any;
  link: any;
  selectedValue: any
  bankDetails: any = BankDetails.default;
  _personalData: any;

  constructor() {}

  ngOnInit(): void {
    this.bankingDetails();
  }

  bankingDetails() {
    this.details = this.bankDetails.sort((a: any, b: any) => a.option.localeCompare(b.option));
    console.log('bankDetails: ', this.details);
    this.selected = this.bankDetails[0].link;
    console.log('currently selected bank: ', this.selected);
  }

}
