export interface ReqInventory {
  id?: string;
  productId: string;
  warehouseId: string;
  quantityInStock: number;
  reorderLevel: number;
  page?: number;
  pagesize?: number;
}