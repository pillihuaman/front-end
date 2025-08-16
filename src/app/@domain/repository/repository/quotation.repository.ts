// src/app/@domain/repository/repository/quotation.repository.ts

import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';

export abstract class QuotationRepository {
  /**
   * Crea una nueva cotización.
   * Se unifica el tipo de logoFile a `File | undefined` para consistencia.
   */
  abstract createQuotation(
    quotationData: any,
    logoFile: File | undefined, // <<< CORRECCIÓN CLAVE
    referenceImages: File[]
  ): Observable<ResponseBody>;

  /**
   * Actualiza una cotización existente.
   * Se unifica el tipo de logoFile a `File | undefined` para consistencia.
   */
  abstract updateQuotation(
    id: string,
    quotationData: any,
    logoFile: File | undefined, // <<< CORRECCIÓN CLAVE
    referenceImages: File[],
    filesToDelete: string[]
  ): Observable<ResponseBody>;

  /**
   * Obtiene todas las cotizaciones.
   */
  abstract listAllQuotations(): Observable<ResponseBody>;

  /**
   * Obtiene una cotización por su ID.
   */
  abstract getQuotationById(id: string): Observable<ResponseBody>;

  /**
   * Elimina una cotización por su ID.
   */
  abstract deleteQuotation(id: string): Observable<ResponseBody>;
}