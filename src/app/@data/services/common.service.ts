import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { CommonRepository } from '../../@domain/repository/repository/common.repository';
import { SaveCommonDataReq } from '../model/general/common-data.model';
import { ResponseBody } from '../model/general/responseBody';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements CommonRepository {

    private readonly endpoint = 'support/common-data'; // Endpoint base de tu API

  constructor(private apiService: ApiService) {
  }

  getCommonParameter(id: String): Observable<any> {
        const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/common/default-data/${id}`;
      return this.apiService.get(url);
  }
    saveOrUpdateCommonData(payload: SaveCommonDataReq): Observable<ResponseBody> {
          const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/common`;
    return this.apiService.put(url, payload);
  }
   getCommonParameters(ids: string[]): Observable<any> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/common/default-data/batch`; // Apunta al nuevo endpoint POST

    // Usamos el método post de apiService para enviar la lista de IDs en el body
    return this.apiService.post(url, ids);
  }
   getCommonParametersByConfigType(ids: string): Observable<any> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/common/default-data/configType`; // Apunta al nuevo endpoint POST

    // Usamos el método post de apiService para enviar la lista de IDs en el body
    return this.apiService.post(url, ids);
  }

}