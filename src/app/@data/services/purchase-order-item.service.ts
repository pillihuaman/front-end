import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ResponseBody } from '../../@data/model/general/responseBody';
import { Const } from './../../utils/const';
import { PurchaseOrderItemRepository } from '../../@domain/repository/repository/purchase-order-item.repository';
import { ReqPurchaseOrderItem } from '../model/purchaseOrder/req-purchase-order-item.model';


@Injectable({ providedIn: 'root' })
export class PurchaseOrderItemService extends PurchaseOrderItemRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }


  override deletePurchaseOrderItem(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order-item/${id}`;
    return this.apiService.delete(url);
  }

  override listItems(req: Partial<ReqPurchaseOrderItem>): Observable<ResponseBody> {
    const params = new HttpParams({ fromObject: req as any });
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order-item`;
    return this.apiService.get(url, params);
  }

  override saveItem(req: ReqPurchaseOrderItem): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order-item`;
    return this.apiService.post(url, { payload: req });
  }

  override deleteItem(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order-item/${id}`;
    return this.apiService.delete(url);
  }
}
