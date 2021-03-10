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
    this.personalData();
  }

  bankingDetails() {
    this.details = this.bankDetails.sort((a: any, b: any) => a.option.localeCompare(b.option));
    console.log('bankDetails: ', this.details);
    this.selected = this.bankDetails[0].link;
    console.log('currently selected bank: ', this.selected);
  }

  personalData() {
    const data = [{
      'firstName': 'Naresh',
      'lastName': 'Kumar',
      'linkedInProfileURL' : 'https://www.linkedin.com/in/nareshkumar-sundransegrin-a83b76a5/'
    }];
    this._personalData = JSON.stringify(data);
    console.log('_personalData: ', this._personalData);
  }

  downloadQRCode() {
    const fileNameToDownload = 'QR Code';
    const base64Img = document.getElementsByClassName('qrcode')[0].children[0]['src'];
    fetch (base64Img).then(res => res.blob()).then((blob) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob,fileNameToDownload);
      } else {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileNameToDownload;
        link.click();
      }
    })
  }

}
