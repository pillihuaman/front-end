
import { Vendor } from '../vendor/vendor';
import { DetailStock } from './detailStock';
import { Size } from './size';

export interface StockProduct {
  _id?: String;
  name?: string;
  barCode?: string;
  description?: string;
  idProduct?: string;
  expiration_date?: Date;
  creation_date?: Date;
  state?: number;
  quantity?: number;
  price?: number;
  vendor?: Vendor;
  tags?: String[];
  detailStock?: DetailStock;
  material?: string;
  style?: string;
  care_instructions?: string;

}
