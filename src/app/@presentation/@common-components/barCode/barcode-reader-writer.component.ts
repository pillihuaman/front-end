import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, ElementRef, signal } from '@angular/core';
import { NbTreeGridModule, NbIconModule, NbButtonModule, NbInputModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser'; // Import IScannerControls
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Result } from '@zxing/library'; 
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-barcode-reader-writer',
  standalone: true,
  imports: [
    CommonModule,
    NebularSharedModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
    NgxBarcode6Module,
    FormsModule
  ],
  templateUrl: './barcode-reader-writer.component.html',
  styleUrl: './barcode-reader-writer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarcodeReaderWriterComponent {
  barcodeType = signal<'1D' | '2D'>('1D'); // State management with Signals
  barcodeValue = signal<string>(''); // Barcode value
  @Output() scannedBarcode = new EventEmitter<string>(); // Emit scanned barcode
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>; // Video element reference

  private scanner = new BrowserMultiFormatReader(); // Scanner instance
  private videoStream: MediaStream | null = null; // Store video stream

  // Start scanning function
  startScanning() {
    if (this.barcodeType() === '2D' && this.videoElement) {
      this.scanner
        .decodeFromVideoDevice(undefined, this.videoElement.nativeElement, (result: Result | undefined) => {
          if (result) {
            this.scannedBarcode.emit(result.getText());
            alert(`Código escaneado: ${result.getText()}`);
          }
        })
        .then((scannerControl: IScannerControls) => { // Use IScannerControls instead of MediaStream
          // You can access the scanner controls to manage scanning options
          console.log('Scanner controls:', scannerControl);
        })
        .catch((err) => console.error('Error al iniciar el escaneo', err));
    } else {
      alert('Use un escáner de código de barras para 1D.');
    }
  }

  // Stop scanning function
  stopScanning() {
    if (this.videoStream) {
      // Stop the video stream tracks
      const tracks = this.videoStream.getTracks();
      tracks.forEach(track => track.stop());
      this.videoStream = null; // Clear the video stream
    }
  }

  // Generate barcode function
  generateBarcode() {
    
    if (!this.barcodeValue()) {
      alert('Ingrese un valor para el código de barras.');
      return;
    }
    this.scannedBarcode.emit(this.barcodeValue());
  }
}
