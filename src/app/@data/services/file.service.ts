import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FileRepository } from '../../@domain/repository/repository/file.repository';
import { Const } from '../../utils/const';
import { FileMetadata } from '../model/files/fileMetadata';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FileService implements FileRepository {

  constructor(private http: HttpClient,private apiService: ApiService) {}

  getCatalogImagen(typeImagen: string, productId: string): Observable<FileMetadata[]> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/getCatalogImagen`;
    const params = new HttpParams()
      .set('typeImagen', typeImagen)
      .set('productId', productId); // ← se llama productId en el backend
  
    return this.http.get<FileMetadata[]>(url, { params });
  }
  
  /*

  uploadFiles(files: File[], dimension: string,typeFile:string, productId: string): Observable<any> {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file); // ← usa 'files' (plural), igual al backend
    });
  
    formData.append('dimension', dimension); // string adicional
    formData.append('typeFile', typeFile); 
    formData.append('productId', productId); 
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/upload`;
  
    return this.apiService.uploadFilesMultipartFile(formData, url);
  }*/
uploadFiles(
  files: File[],
  metadataList: Partial<FileMetadata>[],
  productId: string
): Observable<any> {
  const formData = new FormData();

  // Archivos
  files.forEach((file) => {
    formData.append('files', file);
  });

  // Metadata como JSON (si el backend espera un array de objetos)
  const metadataArray = metadataList.map(meta => ({
    id: meta.id ?? null,
    dimension: meta.dimension ?? '',
    typeFile: meta.typeFile ?? '',
    position: meta.position ?? '',
      filename: meta.filename ?? '' 
  }));
  formData.append('metadata', JSON.stringify(metadataArray)); // ✅ Enviar como JSON

  // ID de producto
  formData.append('productId', productId);

  const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/upload`;
  return this.http.post(url, formData); // ❌ NO CONTENT-TYPE manual
}

  
  downloadFile(id: string): Observable<Blob> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  deleteFile(id: string): Observable<string> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  restoreFile(id: string): Observable<string> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/restore/${id}`;
    return this.http.put(url, null, { responseType: 'text' });
  }
}
