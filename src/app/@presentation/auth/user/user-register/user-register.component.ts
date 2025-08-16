import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NbDialogService, NbSelectModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { UserRepository } from '../../../../@domain/repository/repository/user.repository';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { EmployeeDetailComponent } from '../../../pages/support/workers/employee-detail/employee-detail.component';
import { User } from '../../../../@data/model/User/user';
import { Roles } from '../../../../@data/model/system/roles.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NebularSharedModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule
  ]
})
export class UserRegisterComponent implements OnInit {
  loginForm!: FormGroup;
  availableRoles: Roles[] = [];
  selectedItemType: any;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userRepository: UserRepository,
    private modalRepository: ModalRepository,
    private dialogService: NbDialogService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();

    // Simulamos roles. En producción, se deben obtener de un servicio.
    this.availableRoles = [
      { id: '68523aef733e164697be6f59', name: 'DEV', active: true, description: 'Desarrollador de software', permissionIds: [] },
      { id: '68523aef733e164697be6f5a', name: 'QA', active: true, description: 'Especialista en calidad', permissionIds: [] },
      { id: '68523aef733e164697be6f5b', name: 'DEVOPS', active: true, description: 'DevOps', permissionIds: [] },
      { id: '68523aef733e164697be6f5c', name: 'ANALYST', active: true, description: 'Analista', permissionIds: [] },
      { id: '68523aef733e164697be6f5d', name: 'SUPPORT', active: true, description: 'Soporte técnico', permissionIds: [] },
      { id: '68523aef733e164697be6f5e', name: 'MANAGER', active: true, description: 'Gerente', permissionIds: [] },
      { id: '68523aef733e164697be6f5f', name: 'ANONYMOUS', active: true, description: 'Acceso público', permissionIds: [] },
      { id: '68523aef733e164697be6f57', name: 'ADMIN', active: true, description: 'Administrador con acceso total', permissionIds: [] },
      { id: '68523aef733e164697be6f58', name: 'USER', active: true, description: 'suario estándar del sistema', permissionIds: [] },

    ];

    this.loginForm.patchValue({
      name: 'zarmir',
      lastName: 'pillihuaman hurtado',
      password: '............',
      repeatpassword: '............',
      numTypeDocument: '12345678',
      typeDocument: 'DNI',
      email: 'pillihuamanhz@gmail.com',
      phoneNumber: '999999999',
      alias: 'zarmir',
      userName: 'zarmirph',
      code: 1001,
      estatus: true,
      roles: [this.availableRoles[0]] // default selected role
    });
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control(''),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      repeatpassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      numTypeDocument: this.formBuilder.control(''),
      typeDocument: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.required]),
      phoneNumber: this.formBuilder.control(''),
      alias: this.formBuilder.control(''),
      userName: this.formBuilder.control(''),
      code: this.formBuilder.control(0),
      estatus: this.formBuilder.control(true),
      roles: this.formBuilder.control<Roles[]>([], Validators.required)
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.invalid) return;

    const data: User = {
      name: this.f['name'].value,
      lastName: this.f['lastName'].value,
      password: this.f['password'].value,
      repeatpassword: this.f['repeatpassword'].value,
      numTypeDocument: this.f['numTypeDocument'].value,
      typeDocument: this.f['typeDocument'].value,
      email: this.f['email'].value,
      phoneNumber: this.f['phoneNumber'].value,
      alias: this.f['alias'].value,
      userName: this.f['userName'].value,
      code: this.f['code'].value,
      estatus: this.f['estatus'].value,
      roles: this.f['roles'].value
    };
    
    this.userRepository.registerUser(data).subscribe(
      () => this.dialog.open(ModalComponent, { data: GeneralConstans.datamodelSucess }),
      () => this.dialog.open(ModalComponent, { data: GeneralConstans.datamodelError })
    );
  }

  onNewClick(): void {
    this.dialogService.open(EmployeeDetailComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: true,
    }).onClose.subscribe(result => console.log('Dialog closed', result));
  }
}