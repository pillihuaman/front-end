import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule,  NbMenuItem,  NbSidebarService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { SupportService } from '../../../../@data/services/support.service';
import { AuthenticationRepository } from '../../../../@domain/repository/repository/authentication.repository';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { User } from '../../../../@data/model/User/user';
import { AuthStateService } from '../../../../@data/services/AuthStateService';
import { ResponseBody } from '../../../../@data/model/general/responseBody';
import { SystemService } from '../../../../@data/services/system.service';
import { mapToNbMenuItems } from '../../../../utils/general';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NebularSharedModule, FormsModule
  ]

})
export class LoginComponent implements OnInit {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  cantidadUsuario: number = 3;
  everySecond$: Observable<number> = timer(0, 100);
  appName: string = 'AlamodaPeru.com';
  logging: boolean = false;
  hasError: boolean | undefined;
  private unsubscribe: Subscription[] = [];
  //returnUrl: string = '/home/main';
  returnUrl: string = '/home/main';
  loginForm: FormGroup;

  constructor(
    private sidebarService: NbSidebarService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationRepository,
    private router: Router,
    private supportService: SupportService,
    private modalRepository: ModalRepository,  private authStateService: AuthStateService,

  ) {
    // Inicialización de loginForm en el constructor
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    });

  }
submit() {
  try {
    this.hasError = false;

    // 🔄 Limpieza total antes de loguear

    this.authStateService.setLoginState(false);


    const loginSubscr = this.authService
      .login(this.f['user'].value, this.f['password'].value)
      .pipe(first())
      .subscribe((user: User) => {
        if (user) {
          // 🟢 Establecer login verdadero
          this.authStateService.setLoginState(true);
  
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });

    this.unsubscribe.push(loginSubscr);
  } catch (e) {
    console.error('An error occurred:', e);
    throw e;
  }
}


}