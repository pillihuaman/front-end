import { FileMetadata } from "../files/fileMetadata";
import { ProductMeasurement } from "./product-measurement.model";
import { SalesGuide } from "./req-product";
import { SizeStock } from "./sizeStock";
import { SpecificationGroup } from "./specification-group.model";

export interface RespProduct {
  id: string;

  // Identifiers
  productCode: string;
  barcode: string;
  sku: string;
  upc: string;

  // Basic Info
  name: string;
  description: string;
  category: string;
  subcategory: string;

  // Supplier & Manufacturer
  supplierId: string;
  supplierName: string;
  manufacturer: string;
  brand: string;

  // Batching & Production
  expirationDate: string;       // ISO Date string
  manufacturingDate: string;

  // Embedded Objects
  pricing: ProductPricing;
  inventory: ProductInventory;
  media: ProductMedia;

  // Status & Audit
  status: boolean;
  fileMetadata:FileMetadata[];
   tags?: string[];
  measurements?: ProductMeasurement[];
  specifications?: SpecificationGroup[];
   salesGuide?: SalesGuide;
    quantityPricing?: QuantityBasedPrice[]; 
}

// Subtypes



export interface ProductPricing {
  costPrice: number;
  sellingPrice: number;
  discount: number;
  currency: string;
}

export interface ProductInventory {
  unitMeasure: string;
  minStock: number;
  maxStock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  batch: string;
  weight: number;
  height: number;
  width: number;
  length: number;
}

export interface ProductMedia {
  imageUrls: string[];
  thumbnailUrl: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}


export interface QuantityBasedPrice {
  size: string;
  description: string; // ej: "por docena", "mayor a 50"
  minQuantity: number;
  unitPrice: number;
}