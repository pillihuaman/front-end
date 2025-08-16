export interface ReqProductView {
  id?: string;           // opcional
  productId: string;     // referencia al producto
  fileId?: string;       // opcional: si es una imagen específica
  userId?: string;       // opcional: para tracking de usuarios
}