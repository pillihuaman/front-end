import { Component, OnInit, NgZone, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Imagen } from '../../../../@data/model/imagen/imagen';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';


@Component({
  selector: 'app-create-randon-imagen-color',
  standalone: true,
  templateUrl: './create-randon-imagen-color.component.html',
  styleUrls: ['./create-randon-imagen-color.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
})
export class CreateRandonImagenColorComponent implements OnInit {
  pageRequestForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: SafeUrl | null = null;
  responseBase64: string | null = null;
  imagen: Imagen = {};
  imagenResponse: string[] = [];
  base64Data: { base64String: string; contentType: string } = { base64String: '', contentType: '' };

  private fb = inject(FormBuilder);
  private supportService = inject(SupportRepository);
  private modalRepository = inject(ModalRepository);
  private dialog = inject(MatDialog);
  private spinnerService = inject(SpinnerService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private zone = inject(NgZone);
  private toastrService = inject(NbToastrService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.pageRequestForm = this.fb.group({
      files: [''],
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);

    if (this.selectedFile) {
      this.readFileContent(this.selectedFile).then((result) => {
        this.base64Data = result;
      });
    }
  }

  readFileContent(file: File): Promise<{ base64String: string; contentType: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const contentType = base64String.split(';')[0].split(':')[1];
        resolve({ base64String, contentType });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  private displayImage(base64String: string): void {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Uint8Array([...byteCharacters].map(char => char.charCodeAt(0)));
    const blob = new Blob([byteNumbers], { type: 'image/png' });

    this.zone.run(() => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    });
  }

  onSubmit() {
    if (this.pageRequestForm.valid) {
      this.spinnerService.show();
      this.imagen.file = this.base64Data.base64String;
      this.imagen.contentType = this.base64Data.contentType;
      this.imagen.name = this.selectedFile?.name || 'Untitled';

      this.supportService.changeColorImagen(this.imagen).subscribe(
        (value) => {
          this.modalRepository.showToast('success', 'Save Success', 'Success');
          this.pageRequestForm.reset();
          this.imagenResponse = value.payload.colorsCode;
          this.displayImage(value.payload.base64Image);
          this.spinnerService.hide();
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
    }
  }
}
