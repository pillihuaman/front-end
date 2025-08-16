import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Optional, Output } from '@angular/core';
import { NbButtonModule, NbDialogRef, NbIconModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-modal-header',
  templateUrl: './app-modal-header.component.html',
  styleUrls: ['./app-modal-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NbButtonModule,
    NbIconModule,
    NebularSharedModule
  ]
})
export class AppModalHeaderComponent {
  @Input() title: string = ''; // Título del modal por defecto
  @Output() close = new EventEmitter<void>();

  constructor(@Optional() private dialogRef?: NbDialogRef<any>) {}

  // Detectar la tecla ESC para cerrar el modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: KeyboardEvent) {
    this.closeModal();
  }

  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close(); // Cierra si es un modal de NbDialogRef
    } else {
      this.close.emit(); // Si no es un modal, emite el evento
    }
  }
}
