// Archivo: src/app/@data/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRepository } from '../../@domain/repository/repository/contact.repository';
import { ApiService } from './api.service';
import { ResponseBody } from '../model/general/responseBody';
import { Const } from '../../utils/const';
import { ReqContact } from '../model/contact/contact.model';


@Injectable({ providedIn: 'root' })
export class ContactService extends ContactRepository {
  constructor(private apiService: ApiService) {
    super();
  }

  override filterContacts(req: Partial<ReqContact>): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/contact/filter`;
    
    let params = new HttpParams();
    Object.entries(req).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.apiService.get(url, { params });
  }

  override saveContact(req: ReqContact): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/contact`;
    return this.apiService.post(url, { payload: req });
  }

  override deleteContact(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/contact/${id}`;
    return this.apiService.delete(url);
  }
}