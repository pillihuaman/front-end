import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { CorouselImage } from '../../../@data/model/general/corouselImage';
import { DataService } from '../../../@data/services/data.service';


@Component({
  selector: 'app-imagen-visor',
  templateUrl: './imagen-visor.component.html',
  styleUrls: ['./imagen-visor.component.scss'],
})
export class ImagenVisorComponent implements OnInit, OnChanges {
  @Input() image: CorouselImage = {};
  @Input() secondimage: CorouselImage = {};
  Counter = 0;
  constructor(private dataImagen: DataService) {}

  ngOnInit(): void {
    console.log('Inicio init imagen VISOR');
    console.log(this.image);
    console.log('Fin init  imagen VISOR');
  }

  ngOnChanges(changes: any) {
    //console.log(changes, 'SUSCRIPT');
    //this.dataImagen.corouseObject$.subscribe((x) => (this.image = x));
    this.Counter++;

    //      Type 'SimpleChanges' is missing the following properties from type 'SimpleChange': previousValue, currentValue, firstChange, isFirstChangets(2416)

    this.dataImagen.corouseObject$.subscribe((x) => console.log(x));

    console.log(this.Counter);
  }
  addImagen(image: any) {
    console.log('Init add Event');
    console.log(image);
  }
}
