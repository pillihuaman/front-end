import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderRepository } from '../../@domain/repository/repository/purchase-order.repository';
import { ReqPurchaseOrder } from '../model/purchaseOrder/req-purchase-order.model';
import { RespPurchaseOrder } from '../model/purchaseOrder/resp-purchase-order.model';
import { ApiService } from './api.service';
import { ResponseBody } from '../model/general/responseBody';
import { Const } from '../../utils/const';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService extends PurchaseOrderRepository {
  constructor(private apiService: ApiService) {
    super();
  }

  override listPurchaseOrders(req: Partial<ReqPurchaseOrder>): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order`;
    const params = new HttpParams({ fromObject: req as any });
    return this.apiService.get(url, params);
  }

  override savePurchaseOrder(req: ReqPurchaseOrder): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order`;
    const body = { payload: req };
    return this.apiService.post(url, body);
  }

  override deletePurchaseOrder(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/purchase-order/${id}`;
    return this.apiService.delete(url);
  }
}
