// Archivo: src/app/core/models/contact.model.ts

export interface RespPhone {
  type: string;
  number: string;
}

export interface RespEmail {
  type: string;
  address: string;
}

export interface RespContact {
  id: string;
  companyId: string;
  type: string;
  name: string;
  street: string;
  city: string;
  region: string;
  country: string;
  phones: RespPhone[];
  emails: RespEmail[];
}

export interface ReqContact {
  message?: string;
  id?: string;
  type: string;
  name: string;
  street: string;
  city: string;
  region: string;
  country: string;
  phones: { type: string; number: string; }[];
  emails: { type: string; address: string; }[];
}

export interface ReqPhone {
  type: string;  // E.g., 'CELULAR', 'TRABAJO'
  number: string;
}

/**
 * Define la estructura de un email para ser enviado al backend.
 */
export interface ReqEmail {
  type: string;  // E.g., 'VENTAS', 'PRINCIPAL'
  address: string;
}