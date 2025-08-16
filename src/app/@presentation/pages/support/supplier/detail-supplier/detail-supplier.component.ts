import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../../@common-components/table-datasource/table-datasource.component';
import { ReqSupplier } from '../../../../../@data/model/supplier/req-supplier.model';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { SupplierRepository } from '../../../../../@domain/repository/repository/supplier.repository';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { Utils } from '../../../../../utils/utils';

@Component({
  selector: 'app-detail-supplier',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    
  ],
  templateUrl: './detail-supplier.component.html',
  styleUrl: './detail-supplier.component.scss'
})
export class DetailSupplierComponent extends BaseImplementation<any> implements OnInit {
  supplierForm!: FormGroup;
  reqSupplier!:ReqSupplier;
  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private fb: FormBuilder,
    private supplierRepository: SupplierRepository,
    private router: Router,    dialogService: NbDialogService,  private activatedRoute: ActivatedRoute, 
  ) {
    super(modalRepository, spinnerService,dialogService);
  }

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      id: [''],
      name: [''],
      ruc: [''],
      address: [''],
      phone: [''],
      email: [''],
      status: [true],
      contacts: this.fb.array([])
    });
    
    this.loadSupplierData();
  }

  
  loadSupplierData(): void {
    const supplierId = this.activatedRoute.snapshot.paramMap.get('id');
     if (supplierId && Utils.isValidObjectId(supplierId)) {
 
    
    if (supplierId) {
      // Prepare the filters for listSuppliers, passing only the id and pagination fields
      const filters: ReqSupplier = {
        id: supplierId, // Only pass the ID as a filter
        name: '', // Optional: Set empty or default values for other fields
        address: '',
        email: '',
        phone: '',
        country: '',
        status: true, // Optional: Set status if necessary
        contacts: [], // Optional: Set an empty array if contacts aren't needed
        page: 1, // Optional: Use page 1 as the starting point for pagination
        pagesize: 1, // Optional: Set pagesize to 1 to fetch only the supplier with the given ID
      };
  
      this.spinnerService.show(); // Show loading spinner while fetching data
  
      this.supplierRepository.listSuppliers(filters).subscribe({
        next: (res) => {
          // Assuming the response is an array of suppliers, take the first one (because you are filtering by ID)
          const supplier = res.length > 0 ? res[0] : null;
  
          if (supplier) {
            // Populate the form with the fetched supplier data
            this.supplierForm.patchValue(supplier);
  
            // Optionally, if there are contacts to be added to the contacts FormArray:
            if (supplier.contacts && supplier.contacts.length > 0) {
              supplier.contacts.forEach((contact) => {
                const contactForm = this.fb.group({
                  name: [contact.name],
                  phone: [contact.phone],
                  email: [contact.email],
                });
                this.contacts.push(contactForm);
              });
            }
          } else {
            console.error('Supplier not found');
          }
  
          this.spinnerService.hide(); // Hide spinner after data is loaded
        },
        error: () => {
          console.error('Error fetching supplier data');
          this.spinnerService.hide(); // Hide spinner in case of error
        }
      });
    }
  }
  }
  
  
  get contacts(): FormArray {
    return this.supplierForm.get('contacts') as FormArray;
  }

  addContact(): void {
    const contactForm = this.fb.group({
      name: [''],
      phone: [''],
      email: ['']
    });
    this.contacts.push(contactForm);
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  saveSupplier(): void {
    const supplier: ReqSupplier = {
      ...this.supplierForm.value
    };
    this.supplierRepository.saveSupplier(supplier).subscribe((res) => {
      console.log('Supplier saved:', res);
      this.router.navigate([`/support/supplier`]);
    });
  }

  deleteSupplier(): void {
    const id = this.supplierForm.get('id')?.value;
    if (id) {
      this.supplierRepository.deleteSupplier(id).subscribe(() => {
        console.log('Supplier deleted:', id);
        this.supplierForm.reset();
      });
    }
  }

  returnToList(): void {
    this.router.navigate(['/support/supplier']);
  }
}
