import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
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

  constructor() { }

  ngOnInit(): void {
    this.bankingDetails();
  }

  bankingDetails() {
    this.details = this.bankDetails.sort((a,b) => a.option.localeCompare(b.option));
    console.log('bankDetails: ', this.details);
    this.selected = this.bankDetails[0].link;
    console.log('currently selected bank: ', this.selected);
  }

}
