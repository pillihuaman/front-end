import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Const } from '../../utils/const';
import { CorouselImage } from '../model/general/corouselImage';
import { Control } from '../model/general/control';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _imagenSource = new Subject<CorouselImage>();
  corouseObject$ = this._imagenSource.asObservable();

  private lstControlGlobal = new BehaviorSubject<Control[]>([{ description: '' }]);

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  SendCorousel(img: CorouselImage) {
    this._imagenSource.next(img);
  }

  setData(data: Control[]) {
    if (this.isBrowser) {
      try {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), Const.KEY).toString();
        localStorage.setItem('control', encryptedData);
        this.lstControlGlobal.next(data);
      } catch (error) {
        console.error('Error encrypting data:', error);
      }
    }
  }

  getData(): Observable<Control[]> {
    if (this.isBrowser) {
      try {
        const encryptedData = localStorage.getItem('control');
        if (encryptedData) {
          const decryptedData = CryptoJS.AES.decrypt(encryptedData, Const.KEY).toString(CryptoJS.enc.Utf8);
          this.lstControlGlobal.next(JSON.parse(decryptedData));
        }
      } catch (error) {
        console.error('Error decrypting data:', error);
      }
    }
    return this.lstControlGlobal.asObservable();
  }
}
