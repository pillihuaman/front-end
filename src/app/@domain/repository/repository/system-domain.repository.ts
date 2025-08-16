import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';
import { Page } from '../../../@data/model/system/Page';
import { MenuItem } from '../../../@data/model/system/MenuItem';
import { System } from '../../../@data/model/system/System';
export abstract class SystemDomainRepository {
  abstract listSystems(system: System): Observable<ResponseBody>;
  abstract saveSystem(system: System): Observable<ResponseBody>;
  abstract deleteSystem(id: string): Observable<ResponseBody>;

  abstract listPages(): Observable<ResponseBody>;
  abstract savePage(page: Page): Observable<ResponseBody>;
  abstract deletePage(id: string): Observable<ResponseBody>;
  abstract findPagesBySystem(systemId: string): Observable<ResponseBody>;

  abstract listMenus(): Observable<ResponseBody>;
  abstract saveMenuItem(menu: MenuItem): Observable<ResponseBody>;
  abstract deleteMenu(id: string): Observable<ResponseBody>;
  abstract findMenusBySystem(systemId: string): Observable<ResponseBody>;
  abstract findMenusByParent(parentId: string): Observable<ResponseBody>;
}
