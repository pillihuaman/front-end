// src/app/core/models/warehouse/req-warehouse.model.ts

/**
 * Representa los datos necesarios para crear o actualizar un almacén.
 * Se utiliza en formularios y se envía al backend.
 * El 'id' es opcional: si está presente, es una actualización; si no, es una creación.
 */
export interface ReqWarehouse {
  id?: string;
  warehouseCode: string;
  type: string; // Ej: "CENTRO_DISTRIBUCION"
  operationalStatus: string; // Ej: "OPERATIVO"

  capacity: number;
  capacityUnit: string; // Ej: "PALETAS"
  dockDoors?: number;

  // Datos de la dirección
  street: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressDescription?: string;

  // Información de contacto
  mainPhoneNumber: string;
  mainEmail: string;

  // Solo se envía el ID del gerente
  managerId: string;
}