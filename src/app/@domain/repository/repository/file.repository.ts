import { Observable } from 'rxjs';
import { FileMetadata } from '../../../@data/model/files/fileMetadata';


export abstract class FileRepository {
  abstract  uploadFiles(files: File[], metadataList: Partial<FileMetadata>[], productId: string): Observable<any>
  //uploadFiles(files: File[], dimension: string): Observable<FileMetadata[]>;
  abstract downloadFile(id: string): Observable<Blob>;
  abstract deleteFile(id: string): Observable<string>;
  abstract restoreFile(id: string): Observable<string>;
  abstract getCatalogImagen(typeImagen: string,idproduct: string): Observable<FileMetadata[]>;


}
