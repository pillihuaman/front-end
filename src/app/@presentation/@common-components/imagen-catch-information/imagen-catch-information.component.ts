import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SupportService } from '../../../@data/services/support.service';
import { NbButtonModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-imagen-catch-information',
  templateUrl: './imagen-catch-information.component.html',
  styleUrls: ['./imagen-catch-information.component.scss'],
  standalone: true,
  imports: [CommonModule,  NbButtonModule,
      RouterModule,
      NbButtonModule,
      NebularSharedModule ], // Importar módulos necesarios
})
export class ImagenCatchInformationComponent {
  @Input() image: any;
  @Input() urlImagen?: string;

  constructor(private supportService: SupportService) {}

  dataget() {
    console.log('Guardando clic en imagen:', this.image);
    this.supportService.saveClickCountImagen(this.image).subscribe({
      next: (value) => console.log('Click registrado:', value),
      error: (err) => console.error('Error al guardar el clic:', err),
    });
  }




  clickCount(event: any) {
    console.log(event);
  }

  concateInput(str1: any, str2: any) {
    return str1.concat(str2);
  }

}
