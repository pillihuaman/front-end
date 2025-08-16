import { ModalComponent } from './../../@presentation/@common-components/modal/modal.component';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbToastrConfig,
  NbToastrService,
} from '@nebular/theme';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';

@Injectable({
  providedIn: 'root',
})
export class ModalService extends ModalRepository {
  //private index: number = 0;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    super();
  }

  openModal(component: any, context?: any) {
    return this.dialogService.open(component, {
      context,
      closeOnBackdropClick: false,
    });
  }

  open(closeOnBackdropClick: boolean) {
    this.dialogService.open(ModalComponent, {
      closeOnBackdropClick: closeOnBackdropClick, // Use the parameter here
    });
  }

  showToast(status: NbComponentStatus, message: string, title: string) {
    const centeredConfig = new NbToastrConfig({
      position: NbGlobalLogicalPosition.TOP_START,
      status: status,
      duration: 2000,
      destroyByClick: false,
      preventDuplicates: false,
      duplicatesBehaviour: 'previous',
      toastClass: 'modal-wrapper',
      hasIcon: false,
      icon: '',
    });
  
    this.toastrService.show(message, title, centeredConfig);
  }
  
}
