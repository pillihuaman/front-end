import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { SliderComponent } from '../../../@common-components/slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ReactiveFormsModule, NbLayoutModule, SliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  heroSlides = [
    { image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754853710/Google_AI_Studio_2025-08-10T17_50_19.352Z_iruge1.png' },
    { image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754853710/Google_AI_Studio_2025-08-10T17_45_25.764Z_iux7pw.png' },
    { image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754853709/Google_AI_Studio_2025-08-10T17_39_50.577Z_foujoh.png' },
    { image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754853708/Google_AI_Studio_2025-08-10T17_47_54.095Z_yxmgp0.png' }
  ];
    industryServices = [
    { icon: 'assets/web-pages/spi-control/oil-blk.png', title: 'Industria Petroquímica', description: 'Ofrecemos soluciones especializadas de instrumentación y control de alta precisión para el procesamiento de productos petroquímicos, incluyendo monitoreo de temperatura, presión, nivel y caudal.' },
    { icon: 'assets/web-pages/spi-control/flask.png', title: 'Industria Alimentaria', description: 'Sistemas de monitoreo y control de procesos para la producción de alimentos y bebidas. Proporcionamos instrumentación para la medición de temperatura, pH, caudal y nivel.' },
    { icon: 'assets/web-pages/spi-control/airwind.png', title: 'Industria De La Energía', description: 'Servicios de instrumentación y control para plantas de generación eléctrica, centrales nucleares y sistemas de distribución de energía. Soluciones para el monitoreo de condiciones y seguridad.' },
    { icon: 'assets/web-pages/spi-control/pharmaceutical.png', title: 'Industria Farmacéutica', description: 'Servicios especializados para la producción de medicamentos. Sistemas de monitoreo de condiciones ambientales y sistemas de trazabilidad y registro para cumplir con las regulaciones.' },
    { icon: 'assets/web-pages/spi-control/manufacture-industry.png', title: 'Industria Automotriz', description: 'Soluciones de instrumentación y control para sistemas de fabricación, incluyendo monitoreo de calidad de componentes y sistemas de automatización para optimizar la eficiencia.' },
    { icon: 'assets/web-pages/spi-control/building.png', title: 'Industria De La Construcción', description: 'Nuestra empresa proporciona soluciones de instrumentación y control industrial para el monitoreo y control de procesos en obras de construcción y proyectos de infraestructura.' },
    { icon: 'assets/web-pages/spi-control/wastewater.png', title: 'Industria Del Aguas Y Aguas Residuales', description: 'Sistemas de monitoreo y control de procesos para la producción de agua potable y plantas de tratamiento de aguas residuales. Instrumentación para la medición de calidad del agua.' },
    { icon: 'assets/web-pages/spi-control/pulp.png', title: 'Industria De La Pulpa Y El Papel', description: 'Servicios de instrumentación y control para la industria de la pulpa y el papel. Incluyendo sistemas de medición de humedad, de nivel, presión y temperatura.' },
    { icon: 'assets/web-pages/spi-control/coal.png', title: 'Industria Minera', description: 'Soluciones especializadas de instrumentación y control industrial para la industria minera. Ofrecemos sistemas de monitoreo y control de procesos para la extracción y transporte de minerales.' },
    { icon: 'assets/web-pages/spi-control/thread.png', title: 'Industria Textil', description: 'Soluciones de instrumentación y control industrial para la industria textil. Proporcionamos sistemas de monitoreo y control de procesos para la producción de textiles.' },
    { icon: 'assets/web-pages/spi-control/cpu.png', title: 'Industria De Semiconductores Y Electrónica', description: 'Soluciones de instrumentación y control industrial para la industria de semiconductores y electrónica. Proporcionamos sistemas de monitoreo de alta precisión para la fabricación de semiconductores.' },
      { icon: 'assets/web-pages/spi-control/airwind.png', title: 'Industria De Fabricación De Productos De Consumo', description: 'Servicios de instrumentación y control industrial para la fabricación de productos de consumo. Proporcionamos sistemas de monitoreo de procesos para la producción de productos.' }
  ];
}
