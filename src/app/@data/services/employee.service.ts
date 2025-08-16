
import { BehaviorSubject, Observable, config } from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeResponse } from '../model/employee/employeeResponse';
import { SupportRepository } from '../../@domain/repository/repository/support.repository';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService  {

  private employeesSubject = new BehaviorSubject<EmployeeResponse[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private supportRepository: SupportRepository) {}

  fetchEmployees(page: number, pageSize: number, id: string, name: string, lastName: string, document: string) {
    //;
    this.supportRepository.findEmployee(page, pageSize, id, name, lastName, document).subscribe((response) => {
      this.employeesSubject.next(response.payload);
    });
  }

  reloadEmployees() {
    this.employeesSubject.next(this.employeesSubject.value);
  }
}