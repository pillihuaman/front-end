export interface Shipment {
    shipmentId?: string;
    warehouseId: string; // Referencia Principal
    shipmentDate: Date;
    status: string;
}