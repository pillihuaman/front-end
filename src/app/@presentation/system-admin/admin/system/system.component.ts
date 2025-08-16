import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbAccordionModule, NbDialogModule, NbLayoutModule, NbDialogService } from '@nebular/theme';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ReqSystem } from '../../../../@data/model/system/ReqSystem';
import { RespSystemEntities } from '../../../../@data/model/system/RespSystemEntities';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { SystemService } from '../../../../@data/services/system.service';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';

@Component({
  selector: 'app-system',
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
    TableDatasourceComponent,
  ],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent extends BaseImplementation<any> implements OnInit {
  unifiedForm!: FormGroup;
  results: TreeNode<RespSystemEntities>[] = [];

  constructor(
    private fb: FormBuilder,
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private systemService: SystemService,
    private router: Router,    dialogService: NbDialogService,
  ) {
    super(modalRepository, spinnerService,dialogService);
  }


  ngOnInit(): void {
    this.unifiedForm = this.fb.group({
      id: [''],
      name: [''],
      pageName: [''],
      pageUrl: [''],
      menuTitle: [''],
      menuUrl: ['']
    });

    this.loadSystemStructure();
  }

  loadSystemStructure(): void {
    const formValue = this.unifiedForm.value as ReqSystem;

    this.spinnerService.show();
    this.systemService.searchSystemEntitiesLineal({
      ...formValue,
      page: this.page,
      pagesize: this.pageSize
    }).subscribe({
      next: (res) => {
        const rows = res.payload || [];
        this.results = this.customizePropertyNames(rows, this.columnMapping());
        this.setDefaultColumns(this.results);
        this.updateHasMorePagesT(this.results.length > 0);
        this.spinnerService.hide();
      },
      error: (err) => {
        this.results = [];
        this.spinnerService.hide();
      }
    });
  }

  columnMapping(): { [key: string]: string } {
    return {
      systemId: 'System ID',
      systemName: 'System Name',
      systemDescription: 'System Description',
     // pageId: 'Page ID',
      pageName: 'Page Name',
      pageUrl: 'Page URL',
     // menuId: 'Menu ID',
      menuTitle: 'Menu Title',
      menuUrl: 'Menu URL',
    };
  }

  override findByparameter(): void {
    this.page = 1;
    this.pageSize = 10;
    this.loadSystemStructure();
  }


  onNewSystem(): void {
    this.router.navigate(['/system-admin/system/detail', 'new']);
  }
  
  onNewPage(): void {
    this.router.navigate(['/system-admin/page/detail', 'new']);
  }
  
  onNewMenu(): void {
    this.router.navigate(['/system-admin/menu/detail', 'new']);
  }
  

  handleEditAction(row: TreeNode<any>) {
    const id = row?.data?.systemId;
    if (id) this.router.navigate(['/system-admin/system/detail', id]);
  }

  deleting(event: any) {
    const dialogRef = this.openDeleteModal(event);
    dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
      const id = event.data.systemId;
      this.systemService.deleteSystem(id).subscribe(() => {
        this.showSuccessMessage("Deleted successfully", "Success");
        this.loadSystemStructure();
      });
    });
  }
}
