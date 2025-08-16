export interface LaborResponse {
  id?: string;
  idEmployee?: string;
  name?: string;
  startDate?: Date;
  finishDate?: Date;
  totalHoursDay?: number;
  totalHoursNight?: number;
  totalWage?: number; //total de pago por dia mas noche laboradoro
}