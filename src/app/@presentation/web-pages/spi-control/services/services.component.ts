import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { SliderComponent } from '../../../@common-components/slider/slider.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ReactiveFormsModule, NbLayoutModule, SliderComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

}
