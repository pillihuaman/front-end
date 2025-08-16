import { Contact } from "./contact.model";


export interface ReqSupplier {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  status: boolean; // 👈 Aquí sí es Boolean (no String)
  contacts: Contact[];
  page: number;
  pagesize: number;
}
