/**
 * Representa la estructura de un documento completo de la colección 'common_data'
 * tal como se recibe del backend.
 */
export interface CommonDataDocument {
  id: string;
  configType: string;
  data: { [key: string]: any }; // Un mapa flexible para cualquier estructura de datos
}

/**
 * Representa el cuerpo (payload) que se enviará a la API para guardar o actualizar
 * un documento de configuración.
 */
export interface SaveCommonDataReq {
  id: string;
  configType: string;
  data: { [key: string]: any };
}