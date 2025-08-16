import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { Const } from './../../utils/const';
import { ProductRepository } from '../../@domain/repository/repository/ProductRepository';
import { RespProduct } from '../model/product/resp-product';
import { ReqProduct } from '../model/product/req-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ProductRepository {
    private productSubject = new BehaviorSubject<RespProduct[]>([]);
    product$ = this.productSubject.asObservable();
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  override findProducts(
    page: any, 
    pagesize: any, 
    id: any, 
    name: any, 
    category: any, 
    barcode: any
  ): Observable<ResponseBody> {
    const params: any = { page, pagesize, id, name, category, barcode };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PRIVATE}` +
      `/v1/support/product`;
    return this.apiService.get(url, params);
  }
  override getProductById(id: string): Observable<RespProduct> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product/listproducts/${id}`;
    return this.apiService.get(url);
  }

 override saveProduct(product: ReqProduct, images: File[]): Observable<ResponseBody> {
    const formData = new FormData();

    // 1. Añadir los datos del producto como un Blob JSON
    const productDataBlob = new Blob([JSON.stringify(product)], {
      type: 'application/json'
    });
    formData.append('productData', productDataBlob);

    // 2. Añadir los nuevos archivos de imagen si existen
    if (images && images.length > 0) {
      images.forEach(file => {
        // La clave 'images' debe coincidir con el @RequestPart del backend
        formData.append('images', file, file.name);
      });
    }

    // 3. Llamar al endpoint multipart del backend
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product`;
    return this.apiService.post(url, formData);
  }
  override deleteProduct(id: String): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product/${id}`;
    return this.apiService.delete(url);
  }

  
  fetchEmployees(page: number, pageSize: number, id: string, name: string, lastName: string, document: string) {
    //;
    this.findProducts(page, pageSize, id, name, lastName, document).subscribe((response) => {
      this.productSubject.next(response.payload);
    });
  }
  reloadEmployees() {
    this.productSubject.next(this.productSubject.value);
  }
    
  // ===================================================================
  // NUEVO MÉTODO PARA LA BÚSQUEDA INTELIGENTE
  // ===================================================================
  /**
   * Llama al endpoint de búsqueda por palabras clave.
   * @param query El texto de búsqueda del usuario.
   * @param limit El número máximo de resultados a devolver.
   * @returns Un observable con la lista de productos encontrados.
   */
  searchForIA(query: string, limit: number = 5): Observable<ResponseBody> {
    // Usamos HttpParams para construir los query parameters de forma segura
    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit.toString());

    // La URL debe coincidir con tu endpoint en el backend
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/search-for-ia`;
    
    // Pasamos los parámetros en la llamada al servicio
    return this.apiService.get(url, params);
  }
}