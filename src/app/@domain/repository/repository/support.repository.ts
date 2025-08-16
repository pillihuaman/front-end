import { Observable } from 'rxjs';
import { EmployeeRequest } from '../../../@data/model/employee/employeRequest';
import { Control } from '../../../@data/model/general/control';
import { CorouselImage } from '../../../@data/model/general/corouselImage';
import { PageRequest } from '../../../@data/model/general/pageRequest';
import { PageResponse } from '../../../@data/model/general/pageResponse';
import { Parameter } from '../../../@data/model/general/parameter';
import { ResponseBody } from '../../../@data/model/general/responseBody';
import { SystemRequest } from '../../../@data/model/general/systemRequest';
import { SystemResponse } from '../../../@data/model/general/systemResponse';
import { Product } from '../../../@data/model/product/product';


export abstract class SupportRepository {
  abstract saveClickCountImagen(
    corouselImage: CorouselImage
  ): Observable<CorouselImage[]>;
  abstract listControl(control: Control): Observable<Control>;
  abstract saveProduct(product: Product): Observable<Product>;
  abstract saveParameter(para: Parameter): Observable<Parameter>
  abstract getParameterbyIdCode(para: Parameter): Observable<Parameter[]>
  //system
  abstract listSystem(page:number, pageSize:number): Observable<SystemResponse>
  abstract saveSystem(para: SystemRequest): Observable<SystemResponse>
  abstract savePage(para: PageRequest): Observable<PageResponse>
  abstract deletePages(id: String): Observable<PageResponse>
  abstract findPages(page:any,pagesize:any,id:any,title:any,content:any,url:any):Observable<ResponseBody>
  abstract testListPage(): Observable<any>
  abstract  systemById(para: String): Observable<SystemResponse>
  abstract deleteSystem(para: String): Observable<boolean>
  abstract changeColorImagen(para: any): Observable<any> 
  abstract  findEmployee(page:any,pagesize:any,id:any,name:any,lastName:any,document:any):Observable<ResponseBody>
  abstract saveEmployee(para: EmployeeRequest): Observable<ResponseBody> 
  abstract deleteEmployee(id: String): Observable<ResponseBody> 

}