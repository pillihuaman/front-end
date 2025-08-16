import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  NbMenuModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, NbMenuModule, NbIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Input() placeholder: any;

  constructor() { }

  ngOnInit(): void {
  }

}
