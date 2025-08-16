import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';
import { ReqInventory } from '../../../@data/model/Inventory/req-inventory.model';

export abstract class InventoryRepository {
abstract listInventories(req: Partial<ReqInventory>): Observable<ResponseBody>;
abstract saveInventory(req: ReqInventory): Observable<ResponseBody>;
abstract deleteInventory(id: string): Observable<ResponseBody>;

}


