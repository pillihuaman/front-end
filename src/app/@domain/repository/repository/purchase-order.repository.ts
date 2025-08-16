import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';
import { ReqPurchaseOrder } from '../../../@data/model/purchaseOrder/req-purchase-order.model';
import { RespPurchaseOrder } from '../../../@data/model/purchaseOrder/resp-purchase-order.model';

export abstract class PurchaseOrderRepository {
  abstract listPurchaseOrders(req: Partial<ReqPurchaseOrder>): Observable<ResponseBody>;
  abstract savePurchaseOrder(req: ReqPurchaseOrder): Observable<ResponseBody>;
  abstract deletePurchaseOrder(id: string): Observable<ResponseBody>;
}
