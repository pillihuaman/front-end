export interface MenuItem {
    id?: string;
    title?: string;
    icon?: string;
    url?: string;
    order?: number;
    parentId?: string;
    systemId?: string;
    pageId?: string;
    status?: boolean;
    children?: MenuItem[];
  }