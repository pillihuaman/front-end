import { Observable } from 'rxjs';
import { ReqSpeech } from '../../../@data/model/general/reqSpeech';

export abstract class ChatRepository {
  abstract speech(chat: ReqSpeech): Observable<any>;
}
