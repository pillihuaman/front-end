import { DesignDetails } from "./resp-quotation";

// Esta interfaz debe coincidir con la clase ReqQuotation.java
export interface ReqQuotation {
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  descripcionDetallada: string;
  items: QuotationItem[];
  aceptaTerminos?: boolean;
  tipoCostoProduccion?: string;
    designDetails?: DesignDetails; 
}

// Esta interfaz debe coincidir con la clase anidada Item en ReqQuotation.java
export interface QuotationItem {
  nombre: string;
  numeroCamisa: number | null;
  talla: string;
  cantidad: number;
  fullSet: boolean;
}