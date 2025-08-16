import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogModule, NbLayoutModule, NbAccordionModule, NbDialogService } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { map, catchError, of, switchMap } from 'rxjs';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalService } from '../../../../@data/services/modal.service';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { Utils } from '../../../../utils/utils';
import { StoreService } from '../../../../@data/services/StoreService';
import { RespStore } from '../../../../@data/model/store/RespStore';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { StoreDetailComponent } from './store-detail.component';

@Component({
  selector: 'app-store',
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
    NebularSharedModule,
    TableDatasourceComponent,
  ],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent extends BaseImplementation<any> implements OnInit {
  StoreForm!: FormGroup;
  datas?: TreeNode<any>[] = [];
  isLoading = false;
  searchButtonDisabled = true;
  listError: any;
  isdelelete: any;

  constructor(
    private fb: FormBuilder,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private storeService: StoreService,    dialogService: NbDialogService,
 
  ) {
    super( modalRepository, spinnerService,dialogService); // ✅ Pass dialogService to the parent class
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadStores();
    this.finStoreProcess();
  }

  // Updated form based on ReqStore and RespStore interfaces
  private buildForm() {
    this.StoreForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      status: ['', Validators.required],
      ownerName: ['', Validators.required],
    });
  }

  // Adjusted column mapping based on ReqStore and RespStore fields
  columnMapping(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Store Name',
      address: 'Address',
      country: 'Country',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      ownerName: 'Owner Name',
    };
  }

  private loadStores(): void {
    this.storeService.store$.subscribe((store) => {
      this.processStoreData(store);
      this.spinnerService.hide();
    });
  }

  private processStoreData(stores: RespStore[]): void {
    this.datas = this.customizePropertyNames(stores, this.columnMapping());
    this.setDefaultColumns(this.datas);
    this.updateHasMorePagesT(this.datas && this.datas.length > 0);
  }

  checkInputs() {
    const idToFind = this.StoreForm.get('id')?.value || '';
    const nameToFind = this.StoreForm.get('name')?.value || '';
    const country = this.StoreForm.get('country')?.value || '';
    const email = this.StoreForm.get('email')?.value || '';
    const phone = this.StoreForm.get('phone')?.value || '';
    const status = this.StoreForm.get('status')?.value || '';
    this.searchButtonDisabled = !(idToFind || nameToFind || country || email || phone || status);
    if (this.searchButtonDisabled) {
      this.finStoreProcess();
    }
  }

  finStoreProcess() {
    this.spinnerService.show();
    const { id, name, country, email, phone, status } = this.StoreForm.value;
    
    this.storeService.findStores(this.page, this.pageSize, id, name, country, email).pipe(
      map(value => {
        let respo: RespStore[] = value?.payload || [];
        return this.customizePropertyNames(respo, this.columnMapping());
      }),
      catchError(error => {
        console.error("Error fetching stores:", error);
        return of([]); // Return empty array in case of error
      })
    ).subscribe(data => {
      this.datas = data;
      this.setDefaultColumns(this.datas);
      this.updateHasMorePagesT(this.datas && this.datas.length > 0);
      this.spinnerService.hide();
    });
  }

  override findByparameter() {
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.StoreForm.get('id')?.markAsTouched();
      this.page = GeneralConstans.page;
      this.pageSize = GeneralConstans.perPage;
      this.finStoreProcess();
    }
  }

  validateObjectID(): string[] {
    const idToFind = this.StoreForm.get('id')?.value || '';
    const errorMessages: string[] = [];
    const isIdValid = Utils.isValidObjectId(idToFind);
    if (!Utils.empty(idToFind) && !isIdValid) {
      errorMessages.push('ID is not valid.');
    }
    return errorMessages;
  }

  onNewClick(): void {

  }

  handleEditAction(row: TreeNode<any>): void {
    
    if (!row?.data?.ID) {
      console.warn("Invalid Store data.");
      return;
    }
    const StoreId = row.data.ID;

  }

  handleDeleteAction(row: TreeNode<any>): void {
    if (row.data.ID !== undefined) {
      const id: String = row.data.ID;
      this.storeService.deleteStore(id).subscribe(
        () => {
          this.showSuccessMessage("Delete Success", "Success");
          this.isdelelete = row;
        },
        error => {
          this.handleValidationErrors(error, this.formData);
        }
      );
    }
  }

  deleting(event: any) {
    const dialogRef = this.openDeleteModal(event);
    dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
      this.handleDeleteAction(event);
    });
  }
}
