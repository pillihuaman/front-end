import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  imports: [CommonModule, RouterModule, NebularSharedModule] // ✅ Se importan los módulos requeridos
})
export class ValidationMessageComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl | null = null;
  @Input() errorMessages?: string[];
  @Input() isValidObjectId?: (value: string) => boolean; // Método de validación como entrada
  isArray: boolean = false;

  private statusChangesSubscription: Subscription | null = null;

  constructor() {
    console.log(this.control);
    console.log(this.errorMessages);
  }

  ngOnInit(): void {
    if (this.control) {
      console.log('Control Status:', this.control.status);
      this.statusChangesSubscription = this.control.statusChanges.subscribe(() => {
        this.isArray = Array.isArray(this.errorMessages);
        console.log(this.control);
      });
    }
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription?.unsubscribe();
  }
}
