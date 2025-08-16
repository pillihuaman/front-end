import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';
import { RespTenant } from '../../../@data/model/tenant/resp-tenant';
import { ReqTenant } from '../../../@data/model/tenant/req-tenant';



export abstract class TenantRepository {
  abstract listTenants(filters: ReqTenant): Observable<RespTenant[]>;
  abstract saveTenant(tenant: ReqTenant): Observable<RespTenant>;
  abstract deleteTenant(id: string): Observable<boolean>;
  abstract findTenantsByName(name: string): Observable<ResponseBody>;
}
