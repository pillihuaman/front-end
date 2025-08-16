export interface LaborRequest{
  id?: string;
  idEmployee?: string;
  name?: string;
  startDate?: Date;
  finishDate?: Date;
  hourlyRateDay?: number; // total por hora
  hourlyRatenight?: number; // total por hora
}