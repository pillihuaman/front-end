import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef, NbComponentStatus, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule, NbDatepickerModule, NbTimepickerModule, NbMediaBreakpointsService, NbDialogService } from '@nebular/theme';

import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { parse } from 'date-fns';
import { RouterModule } from '@angular/router';
import { EmployeeResponse } from '../../../../../@data/model/employee/employeeResponse';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { AppModalFooterComponent } from '../../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../../@common-components/app-modal-header/app-modal-header.component';
import { BaseImplementation } from '../../../../../utils/baseImplementation';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,
    AppModalHeaderComponent,
    AppModalFooterComponent,
    NbDatepickerModule,
    NbTimepickerModule,NbMomentDateModule,NbDateFnsDateModule
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent extends BaseImplementation<EmployeeResponse> implements OnInit {
 // @Input() formData!: FormGroup;
 //@Input() employeeData!: EmployeeResponse;
 // @Output() employeeUpdated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
     spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private supportService: SupportRepository,
     modalRepository: ModalRepository,
    override dialogRef: NbDialogRef<EmployeeDetailComponent>,
    dialogService: NbDialogService,
  ) {
    super(modalRepository,spinnerService,dialogService);
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {

    this.buildForm();
    if (this.entityData) {
      this.patchFormValues();
    }
    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }
  

  patchFormValues(): void {
    this.formData.patchValue({
      id: this.entityData.id || '',
      name: this.entityData.name || '',
      lastName: this.entityData.lastName || '',
      startDate: this.entityData.startDate ? parse(this.entityData.startDate+'', 'dd/MM/yyyy', new Date()) : null,
      finishDate: this.entityData.finishDate ? parse(this.entityData.finishDate+'', 'dd/MM/yyyy', new Date()) : null,  
      typeDocument: this.entityData.typeDocument || '',
      document: this.entityData.document || '',
      salaryHours: this.entityData.salaryHours || '',
    });
    console.log("Form Values:", this.formData.value);

  }
  

  buildForm() {
    this.formData = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      document: ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
      idToFind: [''],
      nameToFind: [''],
      lastNameToFind: [''],
      documentToFind: [''],
    });
  }
  onSubmit() {
    const startDateFormatted = this.datePipe.transform(this.formData.value.startDate, 'dd/MM/yyyy') || '';
    const finishDateFormatted = this.datePipe.transform(this.formData.value.finishDate, 'dd/MM/yyyy') || '';
  
    const formValues = {
      ...this.formData.value,
      startDate: startDateFormatted,
      finishDate: finishDateFormatted
    };
  
    this.spinnerService.show();
    this.supportService.saveEmployee(formValues).subscribe({
      next: () => this.handleSuccessResponseSaveOrUpdate(formValues),
      error: (error) => this.handleErrorResponseSaveOrUpdate(error)
    });
  }

}
