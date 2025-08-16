import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule, NbContextMenuModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { DetailContactComponent } from '../../../@common-components/contact/detail-contact.component';

@Component({
  selector: 'app-contact',
    standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ReactiveFormsModule, NbLayoutModule, NbContextMenuModule
    ,DetailContactComponent
],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
 contactInfo = {
    principal: { city: 'Lima', address: 'Calle Enrique Pastor 120, San Borja.' },
    sucursales: [
      { city: 'Arequipa', address: 'Calle Paucarpata 302 Of. 207' },
      { city: 'Ica', address: 'Urb. Las Casuarinas H-36' },
      { city: 'Trujillo', address: 'Av. América Norte 1810, Urb. Las Quintanas' }
    ],
    celulares: ['957127996'],
    correo: 'ventas1@spicontrolsac.com'
  };
}
