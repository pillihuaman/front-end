import { Observable } from 'rxjs';
import { ReqSupplier } from '../../../@data/model/supplier/req-supplier.model';
import { RespSupplier } from '../../../@data/model/supplier/resp-supplier.model';
import { ResponseBody } from '../../../@data/model/general/responseBody';

export abstract class SupplierRepository {
  abstract listSuppliers(filters: ReqSupplier): Observable<RespSupplier[]>;
  abstract saveSupplier(supplier: ReqSupplier): Observable<RespSupplier>;
  abstract deleteSupplier(id: string): Observable<boolean>;
  abstract findSuppliersByName(name: string): Observable<ResponseBody>;

}