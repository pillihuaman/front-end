export interface ProductMeasurement {
  size: string; // Ejemplo: "S", "M", "L"
  chestContour?: number | null; // Contorno de Pecho
  shoulderWidth?: number | null; // Espalda (H-H)
  totalLength?: number | null; // Largo Total
  sleeveLength?: number | null; // Largo de Manga
}