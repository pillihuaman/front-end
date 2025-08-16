import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { Const } from './../../utils/const';
import { StoreRepository } from '../../@domain/repository/repository/StoreRepository'; // Assuming StoreRepository exists
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { RespStore } from '../model/store/RespStore';
import { ReqStore } from '../model/store/ReqStore';
;

@Injectable({
  providedIn: 'root',
})
export class StoreService extends StoreRepository {
  private storeSubject = new BehaviorSubject<RespStore[]>([]); // Changed from productSubject to storeSubject
  store$ = this.storeSubject.asObservable(); // Observable to provide store data

  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }

  // Get a list of stores with pagination
  override findStores(
    page: any, 
    pagesize: any, 
    id: any, 
    name: any, 
    country: any, 
    status: any
  ): Observable<ResponseBody> {
    const params: any = { page, pagesize, id, name, country, status };
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/store`;
    return this.apiService.get(url, params); // Fetch stores based on query params
  }

  // Get a store by its unique ID
  override getStoreById(id: string): Observable<RespStore> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/store/${id}`;
    return this.apiService.get(url); // Get a store by ID
  }

  // Save a store (either create or update)
  override saveStore(store: ReqStore): Observable<RespStore> {
    const request: RequestBody = { data: store, trace: { traceId: '01' } };
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/store`;
    return this.apiService.post(url, request); // Send store data to save or update
  }

  // Delete a store by its ID
  override deleteStore(id: String): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/store/${id}`;
    return this.apiService.delete(url); // Delete the store using the provided ID
  }

  // Fetch and load stores based on filters
  fetchStores(page: number, pageSize: number, id: string, name: string, country: string, status: string) {
    this.findStores(page, pageSize, id, name, country, status).subscribe((response) => {
      this.storeSubject.next(response.payload); // Store response data in the subject
    });
  }

  // Reload stores in the observable
  reloadStores() {
    this.storeSubject.next(this.storeSubject.value); // Trigger the reload of the current store data
  }
}
