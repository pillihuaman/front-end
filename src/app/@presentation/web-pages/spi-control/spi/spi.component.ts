import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { SliderComponent } from '../../../@common-components/slider/slider.component';

@Component({
  selector: 'app-spi',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ReactiveFormsModule, NbLayoutModule, SliderComponent
  ],
  templateUrl: './spi.component.html',
  styleUrl: './spi.component.scss'
})
export class SpiComponent {
  industriesList = [
    'Industria petroquímica',
    'Industria de la energía',
    'Industria alimentaria',
    'Industria farmacéutica',
    'Industria automotriz',
    'Industria de la construcción',
    'Industria de procesos',
    'Industria del agua y aguas residuales',
    'Industria de la pulpa y el papel',
    'Industria minera',
    'Industria textil',
    'Industria de semiconductores y electrónica',
    'Industria aeroespacial',
    'Industria de la defensa',
    'Industria de fabricación de productos de consumo'
  ];
}
