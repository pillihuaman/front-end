import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';
import { ReqStore } from '../../../@data/model/store/ReqStore';
import { RespStore } from '../../../@data/model/store/RespStore';

export abstract class StoreRepository {
  // Fetch stores with pagination and filtering options
  abstract findStores(
    page: any, 
    pagesize: any, 
    id: any, 
    name: any, 
    country: any, 
    status: any
  ): Observable<ResponseBody>;

  // Get a store by its unique ID
  abstract getStoreById(id: string): Observable<RespStore>;

  // Save a new store or update an existing store
  abstract saveStore(store: ReqStore): Observable<RespStore>;

  // Delete a store by its ID
  abstract deleteStore(id: String): Observable<ResponseBody>;
}
