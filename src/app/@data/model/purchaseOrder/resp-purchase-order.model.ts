export interface RespPurchaseOrder {
  purchaseOrderId: string;
  supplierId: string;
  orderDate: string;
  deliveryDate?: string;
  status: string;
  totalAmount: number;
  observations?: string;
  supplierName?: string;
}
