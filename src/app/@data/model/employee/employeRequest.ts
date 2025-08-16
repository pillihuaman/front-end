export interface EmployeeRequest {
  finishDateFormatted: string;
  startDateFormatted: string;
  id?: string;
  name?: string;
  lastName?: string;
  startDate?: Date;
  finishDate?: Date;
  totalHours?: number;
  department?: string;
  salaryMonth?: number;
  salaryHours?: number;
  typeDocument?: string;
  document?:string;
}
// Function to format date to "dd/MM/yyyy HH:mm:ss"
function formatDate(date: Date): string {
  if (!date) {
    return '';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
