import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  key: any;
  iv: any;
  encrypted: any;
  decrypted: any;

  constructor() { }

   //The encrypt method is use for encrypt the value.
  encrypt(keys: any, value: any) {
    this.key = CryptoJS.enc.Utf8.parse(keys);
    this.iv = CryptoJS.enc.Utf8.parse(keys);
    this.encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), this.key, 
    {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return this.encrypted.toString();
  }

  decrypt(keys: any, value: any){
    this.key = CryptoJS.enc.Utf8.parse(keys);
    this.iv = CryptoJS.enc.Utf8.parse(keys);
    this.decrypted = CryptoJS.AES.decrypt(value, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return this.decrypted.toString(CryptoJS.enc.Utf8);
  }
}
