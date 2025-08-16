
export interface ReqPurchaseOrderItem {
  purchaseOrderItemId?: string;
  purchaseOrderId: string;
  productId: string;
  quantityOrdered: number;
  unitCost: number;
}