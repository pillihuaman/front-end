import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Control } from '../../../@data/model/general/control';
import { AuthenticationService } from '../../../@data/services/authentication.service';
import { DataService } from '../../../@data/services/data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbIconModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-router-button',
  templateUrl: './router-button.component.html',
  styleUrls: ['./router-button.component.scss'],  standalone: true,
    imports: [
      CommonModule,
      RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    
      NbButtonModule,NebularSharedModule,ReactiveFormsModule ,NbIconModule,FormsModule,   
       ReactiveFormsModule,
          NbCardModule,
          NbInputModule,
    ]
})
export class RouterButtonComponent implements OnInit {
  //@Input() textButton: string = '';
  //@Input() typeButton: any;
  //@Input() class: any;
  //@Input() visible: boolean = false;
  @Input() idCode?: String;
  lstControl?: Control[];
  subscription?: Subscription;
  control?: Control;
  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    /*let us = this.authenticationService.getCurrentUserValue.control;
    us?.forEach((element) => {
      if (element.idCode === this.idCode) {
        this.control = element;
      }
    });*/
  }
}
