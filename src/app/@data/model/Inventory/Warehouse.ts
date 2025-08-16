export interface Warehouse {
    warehouseId?: string;
    location: string;
    capacity: number;
    managerId?: string; // Referencia Principal
}