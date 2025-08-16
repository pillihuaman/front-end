export interface Page {
    id?: string;
    name?: string;
    url?: string;
    component?: string;
    systemId?: string;
    permissions?: string[];
    status?: boolean;
  }