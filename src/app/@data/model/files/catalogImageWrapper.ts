import { FileMetadata } from "./fileMetadata";

export interface CatalogImageWrapper {
  fileMetadata?: FileMetadata[];
  
  sizeStockMap?: { [size: string]: number; }; // La '?' la hace opcional

}
