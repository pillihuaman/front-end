import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { Page } from '../../../../../@data/model/system/Page';
import { RespSystemEntities } from '../../../../../@data/model/system/RespSystemEntities';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { SystemService } from '../../../../../@data/services/system.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { BaseImplementation } from '../../../../../utils/baseImplementation';

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    
  ],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.scss'
})
export class PageDetailComponent extends BaseImplementation<any> implements OnInit {
  pageForm!: FormGroup;
  systems: RespSystemEntities[] = [];

  constructor(    modalRepository: ModalRepository,
      spinnerService: SpinnerService,
    private fb: FormBuilder,
    private systemService: SystemService, private router: Router,    dialogService: NbDialogService,
  ) {
    super(modalRepository, spinnerService,dialogService);
  }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      id: [''],
      name: [''],
      url: [''],
      icon: [''],
      component: [''],
      systemId: [''],
      permissions: [[]],
      status: [true],
    });

    this.loadSystems();
  }

  loadSystems(): void {
    this.systemService.findSystems().subscribe((res) => {
      
      this.systems = res.payload;
    });
  }

  savePage(): void {
    const page: Page = {
      ...this.pageForm.value,
      systemId: this.pageForm.value.systemId?.toString() ?? null
    };
    
    this.systemService.savePage(page).subscribe((res) => {
      console.log('Page saved:', res);
    });
  }

  deletePage(): void {
    const id = this.pageForm.get('id')?.value;
    if (id) {
      this.systemService.deletePage(id).subscribe(() => {
        console.log('Page deleted:', id);
        this.pageForm.reset();
      });
    }
  }
  returnPage(){
    this.router.navigate(['/support/system']); 
  }
}