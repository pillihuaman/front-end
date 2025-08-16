import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NbCardModule, NbIconModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
@Input() rowData: any; 

  constructor(@Inject(NbDialogRef) protected dialogRef: NbDialogRef<ModalComponent>) {

    console.log(this.rowData)

  }
  ngOnInit(): void {
    ;
    console.log(this.rowData);  // Aquí sí estará disponible
  }

  cancelar() {
    this.dialogRef.close(); // Cancel just closes
  }

  deleteInformation() {
    
    this.dialogRef.close('deleteConfirmed'); // OK button sends result
  }

  getIconClass(typeDescription: string): string {
    switch (typeDescription) {
      case 'WARNING':
        return 'warning-icon';
      case 'INFO':
        return 'info-icon';
      case 'QUESTION':
        return 'question-icon';
      default:
        return '';
    }
  }
}
