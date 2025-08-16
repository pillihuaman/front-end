import { Contact } from "./contact.model";

export interface RespSupplier {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  status: string; // 👈 Ojo: aquí en Java es String, no boolean
  contacts: Contact[];
}
