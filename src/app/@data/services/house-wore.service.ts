// warehouse.service.ts
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WarehouseRepository } from '../../@domain/repository/repository/warehouse.repository';

import { ApiService } from './api.service';
import { ResponseBody } from '../model/general/responseBody';
import { Const } from '../../utils/const';
import { ReqWarehouse } from '../model/Inventory/req-warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseService extends WarehouseRepository {
  constructor(private apiService: ApiService) {
    super();
  }

override listWarehouses(req: Partial<ReqWarehouse>): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/warehouse`;
    
    let params = new HttpParams();

    if (req.id) {
        params = params.set('warehouseId', req.id);
    }

    return this.apiService.get(url, { params: params });
}

  override saveWarehouse(req: ReqWarehouse): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/warehouse`;
    return this.apiService.post(url, { payload: req });
  }

  override deleteWarehouse(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/warehouse/${id}`;
    return this.apiService.delete(url);
  }
override filterWarehouses(req: Partial<ReqWarehouse>): Observable<ResponseBody> {
  const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/warehouse/filter`;

  let params = new HttpParams();

  // Mapea `id` del objeto a `warehouseId` para el backend
  Object.entries(req).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      const paramKey = key === 'id' ? 'warehouseId' : key;
      params = params.set(paramKey, String(value));
    }
  });

  // Depuración: ver la URL real
  console.log('URL generada (filterWarehouses):', `${url}?${params.toString()}`);

  // Aquí no agregamos un objeto "params", lo pasamos tal cual
  return this.apiService.get(`${url}?${params.toString()}`);
}



}
