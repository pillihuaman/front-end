import { Menu } from "./menu";
export interface SystemRequest {
    name?: string;
    version?: string;
    mainMenu?: Menu;
    timezone?: string;
    isActive?: boolean;
    contactEmail?: string;
    supportPhone?: string;

  }
