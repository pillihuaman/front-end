import { Size } from './size';

export interface Stock {
  idProduct?: string;
  barCode?: string;
  size?: Size[];
  expirationDate?: Date;
  creationDate?: Date;
  count: number;
}
