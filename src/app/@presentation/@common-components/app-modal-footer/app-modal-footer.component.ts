import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-modal-footer',
  imports: [   CommonModule,
      NbButtonModule,
      NbIconModule,
      NebularSharedModule],
  templateUrl: './app-modal-footer.component.html',
  styleUrl: './app-modal-footer.component.scss'
})
export class AppModalFooterComponent {
  currentYear: number = new Date().getFullYear();
}
