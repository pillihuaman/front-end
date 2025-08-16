import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbComponentStatus, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { SystemRequest } from '../../../../@data/model/general/systemRequest';
import { SupportService } from '../../../../@data/services/support.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';


@Component({
  selector: 'app-register-system',
  templateUrl: './register-system.component.html',
  styleUrls: ['./register-system.component.scss'],
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
  ],
})
export class RegisterSystemComponent implements OnInit {


  systemRequestForm!: FormGroup;

  constructor(private fb: FormBuilder, private supportService: SupportService, private modalRepository: ModalRepository) { }

  ngOnInit(): void {
    this.systemRequestForm = this.fb.group({
      name: ['', Validators.required],
      version: [''],
      mainMenu: [''],
      timezone: [''],
      isActive: [''],
      contactEmail: [''],
      supportPhone: [''],
    });
  }
  formErrors: { [key: string]: string[] } = {}; // Object to store form errors

  onSubmit(): void {
    // Check if the form is valid
    if (this.systemRequestForm.valid) {
      // Create a new instance of SystemRequest
      const systemRequest : SystemRequest={
  
      // Retrieve data from the form controls and assign it to the systemRequest object
      name : this.systemRequestForm.get('name')?.value,
      version :this.systemRequestForm.get('version')?.value,
      mainMenu : this.systemRequestForm.get('mainMenu')?.value,
      timezone :"" ,
      isActive : true,
      contactEmail : this.systemRequestForm.get('contactEmail')?.value,
      supportPhone : this.systemRequestForm.get('supportPhone')?.value
      }
  
      // Call the saveSystem method in your service to save the system request
      this.supportService.saveSystem(systemRequest).subscribe(
        (value) => {
          //debuger;
          // Handle success
          let nbComponentStatus: NbComponentStatus = 'success';
          // this.router.navigate(['/auth/login']);
           this.modalRepository.showToast(nbComponentStatus,"Save Succes","Succes");
          this.systemRequestForm.reset();
    
        },
        (error) => {
          //debuger;
          // Handle error
       
          if ((error.status === 422 || error.status === 500 )&& error.error && error.error.data && error.error.data.payload) {
            // Map the errors to the form controls
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              //this.systemRequestForm.get(controlName)?.setErrors({ customError: errorMesagge });

              this.systemRequestForm.get(controlName)?.setErrors({ invalid: true ,customError: errorMesagge});
            });
          }
        }
      );
    }
  }
  
}
