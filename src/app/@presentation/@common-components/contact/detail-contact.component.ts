// Archivo: src/app/pages/bussiness/contact/detail-contact/detail-contact.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbSelectModule, NbDialogService } from '@nebular/theme';
import { RespContact, ReqContact, ReqPhone, ReqEmail } from '../../../@data/model/contact/contact.model';
import { SpinnerService } from '../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';
import { ContactRepository } from '../../../@domain/repository/repository/contact.repository';
import { ModalRepository } from '../../../@domain/repository/repository/modal.repository ';
import { BaseImplementation } from '../../../utils/baseImplementation';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-detail-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NebularSharedModule
  ],
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.scss']
})
export class DetailContactComponent extends BaseImplementation<RespContact> implements OnInit {

  @Input() showInquirySection: boolean = false;

  contactForm!: FormGroup;
  isEditMode = false;
  contactTypes: string[] = ['PRINCIPAL', 'SUCURSAL'];

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    private fb: FormBuilder,
    private contactRepository: ContactRepository,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.initForm();
    if (!this.showInquirySection) {
      this.checkRouteForEditMode();
    }
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      // Campos modo admin
      id: [null],
      name: [''],
      type: ['PRINCIPAL'],
      street: [''],
      city: [''],
      region: [''],
      country: [''],
      phones: this.fb.array([]),
      emails: this.fb.array([]),
      message: [null], // <-- Se añade el campo message
      
      // Campos modo consulta pública (solo para la UI)
      inquiryFullName: ['', this.showInquirySection ? Validators.required : []],
      inquiryEmail: ['', this.showInquirySection ? [Validators.required, Validators.email] : []],
      inquiryPhone: [''],
      inquiryMessage: ['', this.showInquirySection ? Validators.required : []]
    });

    if (!this.showInquirySection) {
      this.contactForm.get('name')?.setValidators(Validators.required);
      this.contactForm.get('type')?.setValidators(Validators.required);
      this.contactForm.get('street')?.setValidators(Validators.required);
      this.contactForm.get('city')?.setValidators(Validators.required);
      this.contactForm.get('country')?.setValidators(Validators.required);
    }
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  newPhone(): FormGroup {
    return this.fb.group({
      type: ['CELULAR', Validators.required],
      number: ['', Validators.required]
    });
  }

  newEmail(): FormGroup {
    return this.fb.group({
      type: ['VENTAS', Validators.required],
      address: ['', [Validators.required, Validators.email]]
    });
  }

  addPhone() {
    this.phones.push(this.newPhone());
  }

  removePhone(i: number) {
    this.phones.removeAt(i);
  }

  addEmail() {
    this.emails.push(this.newEmail());
  }

  removeEmail(i: number) {
    this.emails.removeAt(i);
  }

  private checkRouteForEditMode(): void {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    if (contactId && Utils.isValidObjectId(contactId)) {
      this.isEditMode = true;
      this.spinnerService.show();
      this.contactRepository.filterContacts({ id: contactId }).subscribe({
        next: (res) => {
          this.spinnerService.hide();
          const contact = res?.payload?.length > 0 ? res.payload[0] : null;
          if (contact) {
            this.contactForm.patchValue(contact);
            contact.phones.forEach(() => this.addPhone());
            this.phones.patchValue(contact.phones);
            contact.emails.forEach(() => this.addEmail());
            this.emails.patchValue(contact.emails);
          } else {
            this.showWarningMessage('No se encontró el contacto.', 'No Encontrado');
            this.returnToList();
          }
        },
        error: (err) => {
          this.spinnerService.hide();
          this.showWErrorMessage('Error al cargar datos del contacto.', 'Error');
          console.error(err);
        }
      });
    }
  }

  saveContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.showWarningMessage('Por favor, completa todos los campos requeridos.', 'Formulario Incompleto');
      return;
    }

    let contactToSave: ReqContact;
    
    if (this.showInquirySection) {
      const phonesArray: ReqPhone[] = [];
      const emailsArray: ReqEmail[] = [];
      if (this.contactForm.get('inquiryPhone')?.value) {
        phonesArray.push({ type: 'CELULAR', number: this.contactForm.get('inquiryPhone')?.value });
      }
      emailsArray.push({ type: 'PRINCIPAL', address: this.contactForm.get('inquiryEmail')?.value });

      contactToSave = {
        name: `Consulta de: ${this.contactForm.get('inquiryFullName')?.value}`,
        type: 'CONSULTA WEB',
        message: this.contactForm.get('inquiryMessage')?.value, // <-- Se usa el campo 'message'
        street: '',
        city: '',
        region: '',
        country: '',
        phones: phonesArray,
        emails: emailsArray
      };
    } else {
      contactToSave = this.contactForm.value;
    }

    this.spinnerService.show();
    this.contactRepository.saveContact(contactToSave).subscribe({
      next: () => {
        this.spinnerService.hide();
        const message = this.showInquirySection 
          ? 'Tu consulta ha sido enviada con éxito.'
          : `Contacto ${this.isEditMode ? 'actualizado' : 'creado'} con éxito.`;
        
        this.showSuccessMessage(message, 'Operación Exitosa');

        if (this.showInquirySection) {
          this.contactForm.reset();
          this.initForm();
        } else {
          this.returnToList();
        }
      },
      error: (err) => {
        this.spinnerService.hide();
        this.handleErrorResponseSaveOrUpdate(err);
        if (!err.error?.data?.payload) {
          this.showWErrorMessage('Ocurrió un error inesperado al guardar.', 'Error');
        }
        console.error(err);
      }
    });
  }

  returnToList(): void {
    this.router.navigate(['/bussiness/contact']);
  }
}