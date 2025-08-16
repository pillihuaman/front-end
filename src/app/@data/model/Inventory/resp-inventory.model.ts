export interface RespInventory {
  id: string;
  productId: string;
  warehouseId: string;
  quantityInStock: number;
  reorderLevel: number;
  productName?: string;
  warehouseName?: string;
}


