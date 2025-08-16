import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbComponentStatus, NbDialogModule, NbIconModule, NbInputModule, } from '@nebular/theme';
import { Control } from '../../../../../@data/model/general/control';
import { SupportService } from '../../../../../@data/services/support.service';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { RouterButtonComponent } from '../../../../@common-components/router-button/router-button.component';


@Component({
  selector: 'app-register-control',
  templateUrl: './register-control.component.html',
  styleUrls: ['./register-control.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      NbDialogModule,
      RouterModule,
      NbButtonModule,

      NbCardModule,
      NbInputModule,
      NbIconModule,
      NebularSharedModule,
      ReactiveFormsModule,
      FormsModule,
      RouterButtonComponent
  ],
})
export class RegisterControlComponent implements OnInit {
  myForm: FormGroup;
  listSystem: any = [{ idSystem: 1, description: 'support' }];
  listMenu: any = [{ idMenu: 1, idSystem: 1, description: 'support menu' }];
  listSubMenu: any = [
    { idSubMenu: 1, idMenu: 1, idSystem: 1, description: 'support product' },
  ];
  listPage: any = [{ idPage: 1, idSystem: 1, description: 'support controls' }];
  btn: any;
  constructor(public fb: FormBuilder, private supportService: SupportService, private modalRepository: ModalRepository) {
    this.myForm = this.fb.group({
      objectId: [null],
      idSystem: [''],
      idMenu: [''],
      idSubMenu: [''],
      idPage: [''],
      description: [''],
      icono: [''],
      iconClass: [''],
      status: [''],
      styleClass: [''],
      text: [''],
    });
  }
  ngOnInit(): void {}

  searchUser() {}
  save() {
//debuger;
    const control: Control = {
      description: this.myForm.get('description')?.value,
      iconClass: this.myForm.get('iconClass')?.value,
      icono: this.myForm.get('icono')?.value,
      idMenu: this.myForm.get('idMenu')?.value,
      idPage: this.myForm.get('idPage')?.value,
      idSystem: this.myForm.get('idSystem')?.value,
      status: 1,
      styleClass: this.myForm.get('styleClass')?.value,
      text: this.myForm.get('text')?.value,
      id_user: '64f8efabb4ddac6094476946',
    };
    this.supportService.saveControl(control).subscribe(
      (value) => {
        //debuger;
        let nbComponentStatus: NbComponentStatus = 'success';
       // this.router.navigate(['/auth/login']);
        this.modalRepository.showToast(nbComponentStatus, value+"Authenti interce","");
      },
      (error) => {
//debuger;
        let nbComponentStatus: NbComponentStatus = 'danger';
       // this.router.navigate(['/auth/login']);
        this.modalRepository.showToast(nbComponentStatus, error.message+"Authenti interce","");
      }
    );
  }
  state(trues: any) {
    return trues;
  }
}
