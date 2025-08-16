import { NbMenuItem } from "@nebular/theme";

export interface RespMenuTree {
  id: string;
  parentId?: string;
  linkParent?: string;
  title: string;
  icon?: string;
  link?: string;
  expanded?: boolean;
  hidden?: boolean;
  home?: boolean;
  group?: boolean;
  pathMatch?: 'full' | 'prefix';
  skipLocationChange?: boolean;
  queryParams?: any;
  fragment?: string;
  preserveFragment?: boolean;
  ariaRole?: string;
  data?: any;
  children?: RespMenuTree[];
}
