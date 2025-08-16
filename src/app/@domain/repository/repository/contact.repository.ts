import { Observable } from "rxjs";
import { ReqContact } from "../../../@data/model/contact/contact.model";
import { ResponseBody } from "../../../@data/model/general/responseBody";

export abstract class ContactRepository {
  abstract filterContacts(req: Partial<ReqContact>): Observable<ResponseBody>;
  abstract saveContact(req: ReqContact): Observable<ResponseBody>;
  abstract deleteContact(id: string): Observable<ResponseBody>;
}