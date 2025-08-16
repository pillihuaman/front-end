import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogModule, NbLayoutModule, NbAccordionModule, NbDialogRef, NbDialogService } from '@nebular/theme';
import { RespStore } from '../../../../@data/model/store/RespStore';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { StoreService } from '../../../../@data/services/StoreService';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { AppModalFooterComponent } from '../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../@common-components/app-modal-header/app-modal-header.component';

@Component({
  selector: 'app-store-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbDialogModule,
    NbLayoutModule,
    NbAccordionModule,
    NebularSharedModule,   AppModalHeaderComponent,
        AppModalFooterComponent,
  ],
  templateUrl: './store-detail.component.html',
  styleUrl: './store-detail.component.scss'
})
export class StoreDetailComponent extends BaseImplementation<RespStore> implements OnInit {
  constructor(
    private fb: FormBuilder,
    spinnerService: SpinnerService,
    private storeService: StoreService,
    modalRepository: ModalRepository,
    override dialogRef: NbDialogRef<StoreDetailComponent>,    dialogService: NbDialogService,
  ) {
    super( modalRepository, spinnerService,dialogService);
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.entityData) {
      this.patchFormValues();
    }
    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  patchFormValues() {
    if (this.entityData) {
      this.formData.patchValue({
        id: this.entityData.id || '',
        name: this.entityData.name || '',
        address: this.entityData.address || '',
        country: this.entityData.country || '',
        email: this.entityData.email || '',
        phone: this.entityData.phone || '',
        status: this.entityData.status || '',
        ownerName: this.entityData.ownerName || '',
      });
    }
  }


  buildForm() {
    this.formData = this.fb.group({
      id: [], // ID predeterminado como "0"
      name: ['Default Name', Validators.required],
      address: ['Default Address', Validators.required],
      country: ['Default Country', Validators.required],
      email: ['default@email.com', [Validators.required, Validators.email]],
      phone: ['000-000-0000', Validators.required],
      status: ['Active', Validators.required],
      ownerName: ['Default Owner', Validators.required],
    });
  }


  onSubmit() {

    const formValues = {
      ...this.formData.value,
    };
    this.spinnerService.show();
    this.storeService.saveStore(formValues).subscribe({
      next: () => this.handleSuccessResponseSaveOrUpdate(formValues),
      error: (error) => this.handleErrorResponseSaveOrUpdate(error)
    });
  }
  onBarcodeScanned(barcode: string) {
    // Update the form's barcode field with the scanned barcode value
    this.formData.patchValue({ barcode });
  }
}