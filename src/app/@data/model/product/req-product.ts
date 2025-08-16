import { FileMetadata } from "../files/fileMetadata";
import { ProductMeasurement } from "./product-measurement.model";
import { SizeStock } from "./sizeStock";
import { SpecificationGroup } from "./specification-group.model";

export interface ReqProduct {
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
  supplierId?: string;
  manufacturer: string;
  brand: string;

  // Sizes
  fileMetadata?: FileMetadata[];

  // Batching & Production
  expirationDate: string;       // ISO Date string
  manufacturingDate: string;

  // Embedded Objects
  pricing: ProductPricing;
  inventory: ProductInventory;
  media: ProductMedia;

  // Status & Audit
  status: boolean;
  typeFile?: string;
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

// --- benefit.model.ts ---
export interface Benefit {
  feature: string;
  benefit: string;
}

// --- faq-item.model.ts ---
export interface FaqItem {
  question: string;
  answer: string;
}


export interface SalesGuide {
  valueProposition?: string;
  tagline?: string;
  targetAudience?: string[];
  useCases?: string[];
  keyBenefits?: Benefit[];
  fitAndStyleGuide?: string;
  careInstructions?: string[];
  faq?: FaqItem[];
}

export interface QuantityBasedPrice {
  size: string;
  description: string; // ej: "por docena", "mayor a 50"
  minQuantity: number;
  unitPrice: number;
}