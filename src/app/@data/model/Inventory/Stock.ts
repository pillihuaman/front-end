export interface Stock {
  id?: string;
  productId: string; // Referencia Principal
  quantity: number;
  location?: string;
  minStock?: number;
  maxStock?: number;
  expirationDate?: string; // ISO Date String
  batch?: string;
  entryDate?: Date;
}

export interface StockMovement {
  id?: string;
  productId: string; // Referencia Principal
  stockId?: string; // Referencia Principal
  movementType: MovementType;
  quantity: number;
  movementDate: Date;
  description?: string;
}

export enum MovementType {
    IN = 'IN',
    OUT = 'OUT',
    ADJUSTMENT = 'ADJUSTMENT',
    TRANSFER = 'TRANSFER'
}
