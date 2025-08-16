import { Observable } from "rxjs";
import { BaseRepository } from "./baseRepository";
import { TreeNode } from "../@data/model/general/treeNode";
import { GeneralConstans } from "./generalConstant";
import { NbComponentStatus, NbDialogRef, NbDialogService } from "@nebular/theme";
import { Directive, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { Modal } from "../@data/model/general/modal";
import { ModalType } from "../@data/model/general/enumModal";
import { ModalComponent } from "../@presentation/@common-components/modal/modal.component";
import { ModalRepository } from "../@domain/repository/repository/modal.repository ";
import { SpinnerService } from "../@data/services/spinner.service";
@Directive()
export class BaseImplementation<T = any> implements BaseRepository {
  page: number = GeneralConstans.page;
  pageSize: number = GeneralConstans.perPage;
  result?: any;
  protected dialogRef?: NbDialogRef<any>;
  @Input() formData!: FormGroup;
  @Input() entityData!: T;
  @Output() entityUpdated = new EventEmitter<T>();
  protected hasMorePagesT: boolean = true;
  defaultColumnsInput: string[] = [];
  isRegisterEmployeeExpanded: boolean = false;
 protected modalRepository: ModalRepository;
  protected spinnerService: SpinnerService;
  protected dialogService: NbDialogService;
  constructor( modalRepository: ModalRepository,spinnerService: SpinnerService,dialogService: NbDialogService) {
    this.modalRepository = modalRepository;
    this.spinnerService = spinnerService;
    this.dialogService = dialogService;

  }
  customizePropertyNames(data: any[], columnNamesMapping: { [key: string]: string }): TreeNode<any>[] {

    return data.map((value, index) => {
      let transformedData: any = {};
      for (const key in value) {
        if (columnNamesMapping[key]) {
          transformedData[columnNamesMapping[key]] = value[key];
        } else {
          // transformedData[key] = value[key];
        }
      }

      let costuItem: TreeNode<any> = { data: transformedData }
      return costuItem;
    });
  }
  revertPropertyNames(data: TreeNode<any>[], columnNamesMapping: { [key: string]: string }): any[] {
    //debuger
    return data.map((node) => {
      //debuger
      let revertedData: any = {};
      for (const key in node.data) {
        const originalKey = Object.keys(columnNamesMapping).find(mappedKey => columnNamesMapping[mappedKey] === key);
        revertedData[originalKey || key] = node.data[key];
      }
      return revertedData;
    });
  }


  onPageSizeChange(pageSize: number): void {
    ;
    //this.pageSize = pageSize;
    //this.findPages();
  }
  onPageChange(page: number): void {
    this.page = page;
    console.log("emitter pageChange->>>employee " + this.page);
    this.findByDefualt(); // Adjust as needed
  }

  /*

  checkInputs() {
    //declare input to find 
    const idToFind = this.pageRequestForm.get('idToFind')?.value || '';
    const titleToFind = this.pageRequestForm.get('titleToFind')?.value || '';
    const contentToFind = this.pageRequestForm.get('contentToFind')?.value || '';
    const urlToFind = this.pageRequestForm.get('urlToFind')?.value || '';

    this.searchButtonDisabled = !(idToFind || titleToFind || contentToFind || urlToFind);
    if (this.searchButtonDisabled) {
      this.typeOfSearch === GeneralConstans.typeSearchDefault
      this.findPagesProcess();
    }
    this.validateObjectID();
  }*/

  findByparameter() {

    //  lista de errores
    /*
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.pageRequestForm.get('idToFind')?.markAsTouched();
      this.page = GeneralConstans.page
      this.pageSize = GeneralConstans.perPage;
      this.typeOfSearch = GeneralConstans.typeSearchEspecific
     Mthod to find  this.findPagesProcess();*/

  }
  findByDefualt() {
    /*
        this.typeOfSearch = GeneralConstans.typeSearchDefault
        this.findPagesProcess();
      }*/

  }
  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  handleEscKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }

  updateHasMorePagesT(value: boolean): void {
    this.hasMorePagesT = value;
  }
  setDefaultColumns(data: any[]): void {
    if (data && data.length > 0) {
      this.defaultColumnsInput = Object.keys(data[0].data);
    } else {
      this.defaultColumnsInput = [];
    }
  }
  openDeleteModal(data: any): any {
    const modal: Modal = {
      data: data,
      description: data.Name,
      typeDescription: ModalType.QUESTION.toString()
    };

     return this.dialogService.open(ModalComponent, { context: { rowData: modal } as any });

  }

  showNoDataMessage() {
    let nbComponentStatus: NbComponentStatus = 'warning';
      this.modalRepository.showToast(nbComponentStatus, "No se encontraron empleados con los filtros ingresados", "Succes");
  }

   showSuccessMessage(message: string, title: string): void {
    let nbComponentStatus: NbComponentStatus = 'success';
    this.modalRepository.showToast(nbComponentStatus, message, title);
    this.spinnerService.hide();
  }
   handleValidationErrors(error: any, form: FormGroup): void {
    if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
      error.error.data.payload.forEach((errorItem: any) => {
        const controlName = errorItem.propertyPath;
        const errorMessage = errorItem.valExceptionDescription;
        form.get(controlName)?.setErrors({ invalid: true, customError: errorMessage });
      });
    }
    this.spinnerService.hide();
  }
   handleSuccessResponseSaveOrUpdate(formValues: any): void {
    
    let nbComponentStatus: NbComponentStatus = 'success';
    this.modalRepository.showToast(nbComponentStatus, 'Save Success', 'Success');
    this.formData.reset();
    
    if (this.dialogRef) {
      this.entityUpdated.emit(formValues); // Emitir evento
      this.dialogRef.close(formValues);
      this.spinnerService.hide(); 
    }
  }
  
   handleErrorResponseSaveOrUpdate(error: any): void {
    if ((error.status === 422 || error.status === 500) && error.error?.data?.payload) {
      error.error.data.payload.forEach((errorItem: any) => {
        const controlName = errorItem.propertyPath;
        const errorMessage = errorItem.valExceptionDescription;
        this.formData.get(controlName)?.setErrors({ invalid: true, customError: errorMessage });
      });
    }
    this.spinnerService.hide();
  }

  /**
   * Displays a generic warning toast message.
   * @param message The main content of the warning message.
   * @param title The title for the warning toast.
   */
  showWarningMessage(message: string, title: string): void {
    const nbComponentStatus: NbComponentStatus = 'warning';
    this.modalRepository.showToast(nbComponentStatus, message, title);
    this.spinnerService.hide(); // It's good practice to hide the spinner when showing a message.
  }
    showWErrorMessage(message: string, title: string): void {
    const nbComponentStatus: NbComponentStatus = 'danger';
    this.modalRepository.showToast(nbComponentStatus, message, title);
    this.spinnerService.hide(); // It's good practice to hide the spinner when showing a message.
  }


}