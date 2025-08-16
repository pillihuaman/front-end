import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Const } from '../../utils/const';
import { ApiService } from './api.service';
import { OnboardingRepository } from '../../@domain/repository/repository/onboarding.repository';
import { ResponseBody } from '../model/general/responseBody';

@Injectable({ providedIn: 'root' })
export class OnboardingService implements OnboardingRepository {

  constructor(private apiService: ApiService) { }

  requestCode(email: string, mobilPhone: string): Observable<ResponseBody> {
    const url = `${Const.API_SEGURIDAD}/api/v1/onboarding/request-code`;
    return this.apiService.post(url, { email, mobilPhone });
  }

  verifyCode(identifier: string, code: string): Observable<ResponseBody> {
    const url = `${Const.API_SEGURIDAD}/api/v1/onboarding/verify`;
    return this.apiService.post(url, { identifier, code });
  }
}
