import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InventoryRepository } from '../../@domain/repository/repository/inventory.repository';
import { Const } from '../../utils/const';
import { ApiService } from './api.service';
import { ResponseBody } from '../model/general/responseBody';
import { ReqInventory } from '../model/Inventory/req-inventory.model';
import { RespInventory } from '../model/Inventory/resp-inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService extends InventoryRepository {

  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }

  override listInventories(req: Partial<ReqInventory>): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/inventory`;

    const params = new HttpParams({
      fromObject: {
        page: req.page?.toString() || '',
        pagesize: req.pagesize?.toString() || '',
        productId: req.productId || '',
        warehouseId: req.warehouseId || '',
      },
    });

    return this.apiService.get(url, params);
  }

  override saveInventory(req: ReqInventory): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/inventory`;
    return this.apiService.post(url, { payload: req });
  }

  override deleteInventory(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/inventory/${id}`;
    return this.apiService.delete(url);
  }
}
