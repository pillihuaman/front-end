export interface RespPurchaseOrderItem {
  purchaseOrderItemId: string;
  purchaseOrderId: string;
  productId: string;
  quantityOrdered: number;
  unitCost: number;
  productName?: string;
}
