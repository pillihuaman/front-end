import { Observable } from 'rxjs';

import { ResponseBody } from '../../../@data/model/general/responseBody';
import { ReqPurchaseOrderItem } from '../../../@data/model/purchaseOrder/req-purchase-order-item.model';

export abstract class PurchaseOrderItemRepository {
  abstract listItems(req: Partial<ReqPurchaseOrderItem>): Observable<ResponseBody>;
  abstract saveItem(req: ReqPurchaseOrderItem): Observable<ResponseBody>;
  abstract deleteItem(id: string): Observable<ResponseBody>;
abstract deletePurchaseOrderItem(id: string): Observable<ResponseBody>;

}
