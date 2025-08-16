import { Component, Inject, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, Input } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbDialogRef, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    FormsModule,
    NbLayoutModule,NbDialogModule,
  ],
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements AfterViewInit {
  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  @Input() componentType!: any; // ✅ Define componentType as an @Input()

  componentRef!: ComponentRef<any>;

  constructor(@Inject(NbDialogRef) protected dialogRef: NbDialogRef<ModalContainerComponent>) {
    // ✅ Correct way to retrieve context in Nebular
    const context = (this.dialogRef as any).config?.context; // 🔹 Access context safely
    if (context?.componentType) {
      this.componentType = context.componentType;
    }
  }

  ngAfterViewInit(): void {
    if (this.componentType && this.contentContainer) {
      this.componentRef = this.contentContainer.createComponent(this.componentType);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
