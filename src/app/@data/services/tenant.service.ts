import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { TenantRepository } from '../../@domain/repository/repository/tenant.repository ';
import { ReqTenant } from '../model/tenant/Req-tenant';
import { RespTenant } from '../model/tenant/resp-tenant';

@Injectable({
  providedIn: 'root',
})
export class TenantService implements TenantRepository {
  private tenantSubject = new BehaviorSubject<RespTenant[]>([]);
  tenant$ = this.tenantSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  listTenants(filters: ReqTenant): Observable<RespTenant[]> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/tenant`;

    const params: any = {};
    if (filters?.id) params.id = filters.id;
    if (filters?.name) params.name = filters.name;
    if (filters?.domain) params.domain = filters.domain;

    return new Observable(observer => {
      this.apiService.get(url, params).subscribe({
        next: (response: ResponseBody) => {
          const tenants = response.payload as RespTenant[];
          observer.next(tenants);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  saveTenant(tenant: ReqTenant): Observable<RespTenant> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/tenant`;
    const request: RequestBody = { data: tenant, trace: { traceId: '01' } };

    return new Observable(observer => {
      this.apiService.post(url, request).subscribe({
        next: (response: ResponseBody) => {
          const saved = response.payload as RespTenant;
          observer.next(saved);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  deleteTenant(id: string): Observable<boolean> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/tenant/${id}`;

    return new Observable(observer => {
      this.apiService.delete(url).subscribe({
        next: (response: ResponseBody) => {
          const deleted = response.payload as boolean;
          observer.next(deleted);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  findTenantsByName(name: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/tenant/search`;
    const params = { name };

    return new Observable(observer => {
      this.apiService.get(url, params).subscribe({
        next: (response: ResponseBody) => {
          observer.next(response);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  fetchTenants(filters: ReqTenant) {
    this.listTenants(filters).subscribe(tenants => {
      this.tenantSubject.next(tenants);
    });
  }

  reloadTenants() {
    this.tenantSubject.next(this.tenantSubject.value);
  }
}
