// src/app/core/models/warehouse/resp-warehouse.model.ts

/**
 * Representa los datos de un almacén tal como se reciben del backend.
 * Es un modelo aplanado y listo para ser mostrado en la interfaz de usuario.
 */
export interface RespWarehouse {
  id: string;
  warehouseCode: string;
  type: string; // Opcional: podrías usar un Enum si los tipos son fijos
  operationalStatus: string; // Opcional: también podría ser un Enum
  status: boolean; // El borrado lógico es importante para la UI

  // Datos de la dirección aplanados
  street: string;
  city: string;
  postalCode: string;
  country: string;
  coordinates: number[]; // Formato [longitud, latitud]

  // Datos de capacidad
  capacity: number;
  capacityUnit: string; // Opcional: podría ser un Enum
  dockDoors: number;

  // Información de contacto
  mainPhoneNumber: string;
  mainEmail: string;

  // Información del gerente
  managerId: string;
  managerFullName: string;
}