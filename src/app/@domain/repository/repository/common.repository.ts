import { Observable } from 'rxjs';
import { FileMetadata } from '../../../@data/model/files/fileMetadata';
import { SaveCommonDataReq } from '../../../@data/model/general/common-data.model';
import { ResponseBody } from '../../../@data/model/general/responseBody';


export abstract class CommonRepository {
abstract getCommonParameters(ids: string[]): Observable<any>
  abstract getCommonParameter(id: String): Observable<any>;
abstract    getCommonParametersByConfigType(ids: string): Observable<any> ;
 abstract saveOrUpdateCommonData(data: SaveCommonDataReq): Observable<ResponseBody>;
}
