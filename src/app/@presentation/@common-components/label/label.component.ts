import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  @Input() lblText: any;
  @Input() class: any;
  @Input() visible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.class);
  }
}
