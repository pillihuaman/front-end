import { Roles } from "../system/roles.model";

export interface User {
  name?: string;
  lastName?: string;
  code?: number;
  estatus?: boolean;
  token?: string;
  personID?: number;
  email?: string;
  rolId?: number;
  userName?: string;
  typeDocument?: string;
  numTypeDocument?: string;
  alias?:string;
  password?:string;
  repeatpassword?:string;
  phoneNumber?:string;
  access_token?:string;
  roles:Roles[];
}
