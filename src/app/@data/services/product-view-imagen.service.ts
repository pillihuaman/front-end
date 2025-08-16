import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { ReqSupplier } from '../model/supplier/req-supplier.model';
import { RespSupplier } from '../model/supplier/resp-supplier.model';
import { ProductViewImagenRepository } from '../../@domain/repository/repository/product-view-imagen-repository';
import { ReqProductView } from '../model/product/req-product-view';

@Injectable({
  providedIn: 'root',
})
export class ProductViewImagenService implements ProductViewImagenRepository {
  private supplierSubject = new BehaviorSubject<RespSupplier[]>([]);
  supplier$ = this.supplierSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) { }
  saveView(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product-view`;
    const view: ReqProductView = {
      productId: 'abc123',
      fileId: 'file789',
      userId: 'user456'
    };


    const request: RequestBody = { data: view, trace: { traceId: '01' } };
    return this.apiService.post(url, request);

  }

  findAllViewsProducImag(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product-view`;
    const params = { name };
    return new Observable(observer => {
      this.apiService.get(url).subscribe((response: ResponseBody) => {
        observer.next(response);  // No toques el response, mándalo tal cual
        observer.complete();
      }, err => observer.error(err));
    });
  }
getViewsByProductId(productId: string): Observable<ResponseBody> {
  const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product-view/by-productById/${productId}`;
    // Envía la solicitud GET sin parámetros de consulta
    return this.apiService.get(url)
  }

}