// src/app/@data/services/quotation.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBody } from '../model/general/responseBody';
import { ApiService } from './api.service';
import { QuotationRepository } from '../../@domain/repository/repository/quotation.repository';
import { Const } from '../../utils/const';
import { ReqQuotation } from '../model/quotation/req-quotation';

@Injectable({
  providedIn: 'root',
})
export class QuotationService extends QuotationRepository {
  
  constructor(private apiService: ApiService) {
    super();
  }

  /**
   * La firma ahora coincide perfectamente con el repositorio.
   */
  override createQuotation(
    quotationData: ReqQuotation,
    logoFile: File | undefined,
    referenceImages: File[]
  ): Observable<ResponseBody> {
    
    const formData = new FormData();
    formData.append('quotationData', new Blob([JSON.stringify(quotationData)], { type: 'application/json' }));

    if (logoFile) {
      // <<< CORRECCIÓN CLAVE: Se unifica el nombre del parámetro a 'logoFile'
      formData.append('logoFile', logoFile, logoFile.name); 
    }
    if (referenceImages && referenceImages.length > 0) {
      referenceImages.forEach((file) => {
        formData.append('referenceImages', file, file.name);
      });
    }

    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations`;
    return this.apiService.post(url, formData);
  }

  /**
   * La firma ahora coincide perfectamente con el repositorio.
   */
   override updateQuotation(
    id: string,
    quotationData: ReqQuotation,
    logoFile: File | undefined,
    referenceImages: File[],
    filesToDelete: string[]
  ): Observable<ResponseBody> {
    
    const formData = new FormData();
    formData.append('quotationData', new Blob([JSON.stringify(quotationData)], { type: 'application/json' }));

    if (logoFile) {
      formData.append('logoFile', logoFile, logoFile.name);
    }
    
    referenceImages.forEach((file) => {
      formData.append('referenceImages', file, file.name);
    });

    filesToDelete.forEach(fileId => {
        formData.append('filesToDelete', fileId);
    });

    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations/${id}`;
    return this.apiService.put(url, formData);
  }

  // --- OTROS MÉTODOS (sin cambios) ---

  override listAllQuotations(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations`;
    return this.apiService.get(url);
  }

  override getQuotationById(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations/${id}`;
    return this.apiService.get(url);
  }

  override deleteQuotation(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations/${id}`;
    return this.apiService.delete(url);
  }
}