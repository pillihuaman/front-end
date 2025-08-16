import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogService, NbLayoutModule, NbComponentStatus, NbAccordionModule } from '@nebular/theme';
import { ModalService } from '../../../../../@data/services/modal.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EmployeeResponse } from '../../../../../@data/model/employee/employeeResponse';
import { EmployeeRequest } from '../../../../../@data/model/employee/employeRequest';
import { ModalType } from '../../../../../@data/model/general/enumModal';
import { Modal } from '../../../../../@data/model/general/modal';
import { TreeNode } from '../../../../../@data/model/general/treeNode';
import { EmployeeService } from '../../../../../@data/services/employee.service';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { GeneralConstans } from '../../../../../utils/generalConstant';
import { Utils } from '../../../../../utils/utils';
import { ModalComponent } from '../../../../@common-components/modal/modal.component';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../../@common-components/table-datasource/table-datasource.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    FormsModule,    //✅ REQUIRED TO FIX LAYOUT ERROR
    NbDialogModule, NbLayoutModule, NbAccordionModule, NebularSharedModule, TableDatasourceComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent extends BaseImplementation<EmployeeResponse> implements OnInit {
  employeRequestForm!: FormGroup;
  employeRequest?: EmployeeRequest;
  datas?: TreeNode<EmployeeResponse>[] = [];
  teestMod: string = "tees";
  isModalVisible: boolean = false;
  //page?: number = GeneralConstans.page
  //pageSize?: number = GeneralConstans.perPage;
  isLoading = false;
  isdelelete: any;
  searchButtonDisabled = true;
  typeOfSearch: any;
  listError: any;
  columnMappin(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Name',
      lastName: 'Last Name',
      startDate: 'Start Date',
      finishDate: 'Finish Date',
      totalHours: 'Total Hours',
      total: 'Total',
      document: 'Document',

    };

  }
  constructor(
    private fb: FormBuilder,
    private supportService: SupportRepository,
     modalRepository: ModalRepository,
     spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private employeeService: EmployeeService,
    dialogService: NbDialogService,
  ) {
    super(modalRepository, spinnerService,dialogService);
    this.employeRequest = {
      finishDateFormatted: '',
      startDateFormatted: '',
    };
  }
  ngOnInit(): void {
    this.buildForm();
    this.loadEmployees();
    this.findEmproyeeProcess();
  }

  private loadEmployees(): void {
    this.employeeService.employees$.subscribe((employees) => {
      this.processEmployeeData(employees);
      this.spinnerService.hide();
    });
  }

  private processEmployeeData(employees: any[]): void {
    this.datas = this.customizePropertyNames(employees, this.columnMappin());
    this.setDefaultColumns(this.datas);
    if (this.datas && this.datas.length > 0) {
      this.updateHasMorePagesT(true);
    } else {
      this.updateHasMorePagesT(false);
    }
  }

  findByDefualtg() {
    //;
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';
    this.employeeService.fetchEmployees(this.page ?? GeneralConstans.page, this.pageSize ?? GeneralConstans.perPage, id, name, lastName, document);

  }

  deleting(event: any) {
    const dialogRef = this.openDeleteModal(event); // ✅ Use `this.`
    dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
      this.handleDeleteAction(event);
    });
  }


  buildForm() {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: [''],
      finishDate: [''],
      document: ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
      idToFind: [''],
      nameToFind: [''],
      lastNameToFind: [''],
      documentToFind: [''],
    });
  }


  findEmproyeeProcess() {
    this.spinnerService.show();
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';

    this.supportService.findEmployee(this.page, this.pageSize, id, name, lastName, document).pipe(
      map(value => {
        let respo: EmployeeResponse[] = value?.payload || []; // Asegurar que no sea null o undefined
        return this.customizePropertyNames(respo, this.columnMappin());
      }),
      catchError(error => {
        
        console.error("Error fetching employees:", error);
        return of([]); // Si hay error, retornar una lista vacía para evitar que la app falle
      })
    ).subscribe(data => {
      this.datas = data;
      console.log("Data source page", this.datas);
      
      this.setDefaultColumns(this.datas);
      if (this.datas && this.datas.length > 0) {
        this.updateHasMorePagesT(true);
      } else {
        this.updateHasMorePagesT(false);
      }
      this.spinnerService.hide();
    });
  }
  handleDeleteAction(row: TreeNode<any>): void {
    console.log('Deleting:', row);
    if (row.data.ID !== undefined) {
      const id: String = row.data.ID;
      this.supportService.deleteEmployee(id).subscribe(
        (value) => {
          this.showSuccessMessage("Delete Success", "Success");
          this.isdelelete = row;
        },
        (error) => {
          
          if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              this.employeRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();
        }

      );
    }

  }
  handleEditicionAction(row: TreeNode<any>): void {
    if (!row?.data?.ID) {
      console.warn("Invalid employee data.");
      return;
    }
    const employeeId = row.data.ID;

  }
  checkInputs() {
    //declare input to find 
    //////////////debuger;
    const idToFind = this.employeRequestForm.get('idToFind')?.value || '';
    const nameToFind = this.employeRequestForm.get('nameToFind')?.value || '';
    const lastNameToFind = this.employeRequestForm.get('lastNameToFind')?.value || '';
    const documentToFind = this.employeRequestForm.get('documentToFind')?.value || '';


    this.searchButtonDisabled = !(idToFind || nameToFind || lastNameToFind || documentToFind);
    if (this.searchButtonDisabled) {
      this.page = GeneralConstans.page
      this.typeOfSearch = GeneralConstans.typeSearchDefault
      this.findEmproyeeProcess();
    }
    // this.validateObjectID();
  }

  override findByparameter() {
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.employeRequestForm.get('idToFind')?.markAsTouched();
      this.page = GeneralConstans.page
      this.pageSize = GeneralConstans.perPage;
      this.typeOfSearch = GeneralConstans.typeSearchEspecific
      this.findEmproyeeProcess();
    }
  }
  override findByDefualt() {
    this.findEmproyeeProcess();
  }

  validateObjectID(): string[] {
    const idToFind = this.employeRequestForm.get('idToFind')?.value || '';
    const errorMessages: string[] = [];
    // Validate the idToFind control
    const isIdValid = Utils.isValidObjectId(idToFind);
    if (!Utils.empty(idToFind)) {
      if (!isIdValid) {
        // Handle the case when validation fails, e.g., add an error message to the array
        errorMessages.push('ID is not valid.');
      }
    }
    // Add more validation logic and error messages as needed
    return errorMessages;
  }

  onNewClick(): void {
   /* this.dialogService.open(EmployeeDetailComponent, {
      context: {
        // Optional: Pass any data you need for the modal (context)
      },
      closeOnBackdropClick: false, // Prevent closing on clicking outside the modal
      hasBackdrop: true,           // Ensure the backdrop is enabled
      backdropClass: 'custom-backdrop', // Optionally, customize the backdrop class
      dialogClass: 'custom-dialog'  // Customize the dialog class for the entire modal
    }).onClose.subscribe(result => {
      if (result) {
        this.findEmproyeeProcess(); // Recargar la lista después de una inserción o actualización
      }
    });*/
  }

}






