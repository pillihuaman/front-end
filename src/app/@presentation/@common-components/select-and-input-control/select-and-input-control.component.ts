import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-and-input-control',
  templateUrl: './select-and-input-control.component.html',
  styleUrls: ['./select-and-input-control.component.scss']
})
export class SelectAndInputControlComponent implements OnInit {

  constructor() { }
  isSelectMode = true;

  @Input() isInput?: boolean;
  @Input() isSelect?: boolean;
  @Input() data?: any;
  inputValue:any;
  handleInput(value: any) {
    // Handle the input event logic here
    console.log('Input value:', value);
  }

  handleSelect(value: any) {
    // Handle the select event logic here
    console.log('Selected value:', value);
  }
  ngOnInit(): void {
    if(this.isInput){
      this.inputValue = this.data
    }
  }

}
