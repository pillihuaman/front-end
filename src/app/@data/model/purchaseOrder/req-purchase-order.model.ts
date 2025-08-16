export interface ReqPurchaseOrder {
  purchaseOrderId?: string;
  supplierId: string;
  orderDate?: string | Date;
  deliveryDate?: string;
  status?: string;
  totalAmount?: number;
  observations?: string;
}