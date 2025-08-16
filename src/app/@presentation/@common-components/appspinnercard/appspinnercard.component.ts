import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-appspinnercard',
  standalone: true,
  imports: [CommonModule, NebularSharedModule],
  templateUrl: './appspinnercard.component.html',
  styleUrls: ['./appspinnercard.component.scss']
})
export class AppspinnercardComponent {}
