import { Observable } from 'rxjs';
import { FileMetadata } from '../../../@data/model/files/fileMetadata';
import { ResponseBody } from '../../../@data/model/general/responseBody';


export abstract class OnboardingRepository {

  abstract  requestCode(email: string, mobilPhone: string): Observable<ResponseBody>
  abstract verifyCode(identifier: string, code: string): Observable<ResponseBody>


}
