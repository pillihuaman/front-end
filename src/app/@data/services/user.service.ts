import { Const } from './../../utils/const';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestBody } from '../model/general/requestBody';
import { UserRepository } from '../../@domain/repository/repository/user.repository';
import { User } from '../model/User/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  getusers(): Observable<User[]> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/user/register`;
    return this.apiService.post(url, {});
  }
  registerUser(user: User): Observable<User[]> {
    //debuger;

    const request: RequestBody = {
      data: user,
      trace: { traceId: '01' },
    };
    const url =
      `${Const.API_SEGURIDAD}` +
      `/api/v1/auth/register`;
    return this.apiService.post(url, user);
  }
}
