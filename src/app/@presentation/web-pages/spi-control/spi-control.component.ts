import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NbButtonModule, NbContextMenuModule, NbLayoutModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';
import { ImagenCatchInformationComponent } from '../../@common-components/imagen-catch-information/imagen-catch-information.component';
import { SliderComponent } from '../../@common-components/slider/slider.component';
import { ChatbotComponent } from "../../@common-components/chatbot/chatbot.component";

@Component({
  selector: 'app-spi-control',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ReactiveFormsModule, NbLayoutModule, SliderComponent, NbContextMenuModule,
    ChatbotComponent
],
  templateUrl: './spi-control.component.html',
  styleUrl: './spi-control.component.scss'
})
export class SpiControlComponent {


    productMenuItems = [
    // La propiedad 'link' contiene la ruta RELATIVA a la que se navegará
    { title: 'Productos de Automatización', link: '/bussiness/spi-control/producto-automatizacion' },
    { title: 'Productos de Instrumentación', link: '/bussiness/spi-control/producto-instrumentacion' },
  ];

  // Datos de contacto (y otros datos que necesite el layout)
  contact = {
    address: 'Calle Enrique Pastor 120, San Borja, Lima',
    phone: '957127996',
    email: 'ventas@spicontrolsac.com'
  };
    constructor(private router: Router, private route: ActivatedRoute) {} // Inyecta ActivatedRoute

  handleProductMenuClick(item: { title: string }) {
    if (item.title === 'Productos de Automatización') {
      this.router.navigate(['./producto-automatizacion'], { relativeTo: this.route });
    } else if (item.title === 'Productos de Instrumentación') {
      this.router.navigate(['./producto-instrumentacion'], { relativeTo: this.route });
    }
  }


  services = [
    { icon: 'settings-2-outline', title: 'Instrumentación y Control', desc: 'Soluciones integrales en sistemas de control.' },
    { icon: 'flash-outline', title: 'Electricidad Industrial', desc: 'Instalaciones y mantenimiento eléctrico.' },
    { icon: 'layers-outline', title: 'Automatización', desc: 'Optimización de procesos productivos.' }
  ];



  // DATOS DE PROYECTOS CON RUTAS LOCALES
  projects = [
    { image: 'assets/web-pages/spi-control/pro-1-1-457x485.jpg', category: 'Manufacturing' },
    { image: 'assets/web-pages/spi-control/pro-3-457x485.jpg', category: 'Energy' },
    { image: 'assets/web-pages/spi-control/pro-4-457x485.jpg', category: 'Industry' },
    { image: 'assets/web-pages/spi-control/pro-5-457x485.jpg', category: 'Chemical' },
    { image: 'assets/web-pages/spi-control/pro-7-457x485.jpg', category: 'Agriculture' },
  ];

  // DATOS DE ALIADOS CON RUTAS LOCALES
  allies = [
    { name: 'Arenal', logo: 'assets/web-pages/spi-control/ARENAL.png' },
    { name: 'Limitorque', logo: 'assets/web-pages/spi-control/LIMITORQUE.png' },
    { name: 'Euromag', logo: 'assets/web-pages/spi-control/EUROMAG-international.png' },
    { name: 'Yokogawa', logo: 'assets/web-pages/spi-control/YOKOGAWA.png' },
    { name: 'Bray', logo: 'assets/web-pages/spi-control/BRAY.png' },
    { name: 'Krohne', logo: 'assets/web-pages/spi-control/KROHNE.png' },
    { name: 'Autonics', logo: 'assets/web-pages/spi-control/AUTONICS.png' },
    { name: 'Wika', logo: 'assets/web-pages/spi-control/WIKA.png' },
    { name: 'Rotork', logo: 'assets/web-pages/spi-control/ROTORK.png' },
    { name: 'Allen-Bradley', logo: 'assets/web-pages/spi-control/ALLEN-BRADLEY.png' },
    { name: 'Reotemp', logo: 'assets/web-pages/spi-control/REOTEMP.png' },
    { name: 'ATMI', logo: 'assets/web-pages/spi-control/ATMI.png' },
    { name: 'Endress+Hauser', logo: 'assets/web-pages/spi-control/Endress-Hauser.png' },
    { name: 'Omron', logo: 'assets/web-pages/spi-control/OMRON.png' },
    { name: 'Mitsubishi Electric', logo: 'assets/web-pages/spi-control/MITSUBISHI-ELECTRIC.png' },
    { name: 'Knick', logo: 'assets/web-pages/spi-control/KNICK.png' },
    { name: 'Siemens', logo: 'assets/web-pages/spi-control/SIEMENS.png' },
    { name: 'Schneider Electric', logo: 'assets/web-pages/spi-control/SCHNEIDER-ELECTRIC.png' },
    { name: 'Kubler', logo: 'assets/web-pages/spi-control/KUBLER.png' },
    { name: 'Ebro Armaturen', logo: 'assets/web-pages/spi-control/EBRO-ARMATUREN.png' }
  ];

// Pega este nuevo array dentro de tu clase SpiControlComponent


}

