export interface ShipmentItem {
    shipmentItemId?: string;
    shipmentId: string; // Referencia Principal
    productId: string; // Referencia Principal
    quantityShipped: number;
}