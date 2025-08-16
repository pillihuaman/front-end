// page-request.model.ts

import { Menu } from "./menu";

export interface PageResponse {
  id?: string;
  title?: string;
  content?: string;
  url?: string;
  parentMenu?: Menu;
  isPublished?: boolean;
  metaKeywords?: string;
  metaDescription?: string;
  [key: string]: any;
}
