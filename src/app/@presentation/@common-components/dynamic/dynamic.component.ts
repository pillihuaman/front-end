import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  @Input() fileInput:any;
  img:any
componentDynamic:String | undefined;
  constructor() { }

  ngOnInit(): void {
    ////debuger
    if(this.fileInput){
    this.renderImagen(this.fileInput);
  }
  }
  close(close: any) {
    
  }
  removeView() {
    ////debuger;
    const viewIndexToRemove = 0;
    
    //this.container?.remove(viewIndexToRemove);
  }
  renderImagen(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.img=reader.result as string;
    };
    reader.readAsDataURL(file);
}
}
