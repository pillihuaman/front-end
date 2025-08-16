/**
 * Representa la respuesta completa de una cotización desde el backend.
 * Define la estructura de datos que se usará para mostrar o editar cotizaciones existentes.
 */
export interface RespQuotation {
  id: string;
  customerInfo: CustomerInfo;
  items: QuotationItem[];
  designDetails: DesignDetails;
  totals: QuotationTotals;
  status: string;
  createdAt: string; // Se recibe como un string en formato ISO (ej: "2023-10-27T10:00:00Z")
  updatedAt: string;
  aceptaTerminos?: boolean;
  
}

// --- Interfaces para los objetos anidados ---

export interface CustomerInfo {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface QuotationItem {
  playerName: string;
  shirtNumber: number | null;
  size: string;
  quantity: number;
  fullSet: boolean;
}

export interface DesignDetails {
  detailedDescription: string;
  logoFile: FileMetadata | null; // El logo puede no existir
  referenceImages: FileMetadata[];
}

export interface FileMetadata {
    id: string; 
  filename: string;
  url: string; // URL pública del archivo en S3
  contentType: string;
  size: number;
}

export interface QuotationTotals {
  totalGarments: number;
  garmentsSubtotal: number; // El tipo BigDecimal de Java se maneja como number en TypeScript
  designTotal: number;
  grandTotal: number;
  fullSetPrice: number | null;
  poloOnlyPrice: number | null;
  designCostPerGarment: number | null;
  subtotal: number | null; // Asumo que es el mismo que garmentsSubtotal, pero lo incluyo por si acaso
  igvAmount: number | null;
}