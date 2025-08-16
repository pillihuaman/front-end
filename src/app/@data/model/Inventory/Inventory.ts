export interface Inventory {
    inventoryId?: string;
    productId: string; // Referencia Principal
    warehouseId: string; // Referencia Principal
    quantityInStock: number;
    reorderLevel: number;
}