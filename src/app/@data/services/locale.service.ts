
import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { LocalRepository } from '../../@domain/repository/repository/local.repository';

@Injectable({
  providedIn: 'root',
})
export class LocaleService extends LocalRepository {


  constructor(private dateAdapter: DateAdapter<any>) {
    super();
  }
  setLocale(localeId: string) {

    this.dateAdapter.setLocale(localeId || 'en-US');
  }
  getLanguageCode(): string {

    return navigator.language;
  }
  
}
