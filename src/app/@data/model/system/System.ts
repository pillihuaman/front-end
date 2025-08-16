import { MenuItem } from "./MenuItem";
import { Page } from "./Page";

export interface System {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  order?: number;
  status?: boolean;
  pages?: Page[];
  menus?: MenuItem[];

  systemId?: string;
  systemName?: string;
  systemDescription?: string;
  pageId?: string;
  pageName?: string;
  pageUrl?: string;
  menuId?: string;
  menuTitle?: string;
  menuUrl?: string;
  
}
