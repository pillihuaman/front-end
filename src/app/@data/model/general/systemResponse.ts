import { Menu } from "./menu";

export class SystemResponse {
    id?: string;
    name?: string;
    version?: string;
    mainMenu?: Menu;
    timezone?: string;
    isActive?: boolean;
    contactEmail?: string;
    supportPhone?: string;
  
    constructor(data: Partial<SystemResponse> = {}) {
      Object.assign(this, data);
    }
  }