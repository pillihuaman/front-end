import { Observable } from 'rxjs';

import { ResponseBody } from '../../../@data/model/general/responseBody';
import { ReqWarehouse } from '../../../@data/model/Inventory/req-warehouse.model';

export abstract class WarehouseRepository {
  abstract listWarehouses(req: Partial<ReqWarehouse>): Observable<ResponseBody>;
  abstract saveWarehouse(req: ReqWarehouse): Observable<ResponseBody>;
  abstract deleteWarehouse(id: string): Observable<ResponseBody>;
 abstract filterWarehouses(req: Partial<ReqWarehouse>): Observable<ResponseBody> ;
}