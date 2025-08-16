import { Const } from '../../utils/const';
import { User } from '../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestBody } from '../model/general/requestBody';
import { ReqSpeech } from '../model/general/reqSpeech';
import { ChatRepository } from '../../@domain/repository/repository/chat.repository';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends ChatRepository {
  speech(ReqSpeech: ReqSpeech): Observable<any> {
    let rquest: RequestBody = { data: ReqSpeech };
    const url =
      `${Const.API_INTELLIGENCY_ARTIFICIAL}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/speechVoice`;
    return this.apiService.post(url, rquest);
  }
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
}
