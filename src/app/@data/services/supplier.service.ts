import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { SupplierRepository } from '../../@domain/repository/repository/supplier.repository';
import { ReqSupplier } from '../model/supplier/req-supplier.model';
import { RespSupplier } from '../model/supplier/resp-supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService implements SupplierRepository {
  private supplierSubject = new BehaviorSubject<RespSupplier[]>([]);
  supplier$ = this.supplierSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  // Listar todos los proveedores
  listSuppliers(filters: ReqSupplier): Observable<RespSupplier[]> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/supplier`;

    const params: any = {};
    if (filters?.id) params.id = filters.id;
    if (filters?.name) params.name = filters.name;
    if (filters?.page != null) params.page = filters.page;
    if (filters?.pagesize != null) params.pagesize = filters.pagesize;

    return new Observable(observer => {
      this.apiService.get(url, params).subscribe((response: ResponseBody) => {
        const suppliers = response.payload as RespSupplier[];
        observer.next(suppliers);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  // Guardar proveedor
  saveSupplier(supplier: ReqSupplier): Observable<RespSupplier> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/supplier`;
    const request: RequestBody = { data: supplier, trace: { traceId: '01' } };

    return new Observable(observer => {
      this.apiService.post(url, request).subscribe((response: ResponseBody) => {
        const saved = response.payload as RespSupplier;
        observer.next(saved);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  // Eliminar proveedor
  deleteSupplier(id: string): Observable<boolean> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/supplier/${id}`;

    return new Observable(observer => {
      this.apiService.delete(url).subscribe((response: ResponseBody) => {
        const deleted = response.payload as boolean;
        observer.next(deleted);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  // Buscar proveedor por nombre
  findSuppliersByName(name: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/supplier/search`;
    const params = { name };
  
    return new Observable(observer => {
      this.apiService.get(url, params).subscribe((response: ResponseBody) => {
        observer.next(response);  // No toques el response, mándalo tal cual
        observer.complete();
      }, err => observer.error(err));
    });
  }
  // Métodos reactivos opcionales si quieres
  fetchSuppliers(filters: ReqSupplier) {
    this.listSuppliers(filters).subscribe(suppliers => {
      this.supplierSubject.next(suppliers);
    });
  }

  reloadSuppliers() {
    this.supplierSubject.next(this.supplierSubject.value);
  }
}