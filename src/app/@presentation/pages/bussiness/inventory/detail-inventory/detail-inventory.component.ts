// File: detail-inventory.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbCheckboxModule,
  NbDialogService
} from '@nebular/theme';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { InventoryRepository } from '../../../../../@domain/repository/repository/inventory.repository';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { Utils } from '../../../../../utils/utils';
import { ReqInventory } from '../../../../../@data/model/Inventory/req-inventory.model';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';

@Component({
  selector: 'app-detail-inventory',
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
    NbCheckboxModule
  ],
  templateUrl: './detail-inventory.component.html',
  styleUrl: './detail-inventory.component.scss'
})
export class DetailInventoryComponent extends BaseImplementation<any> implements OnInit {
  inventoryForm!: FormGroup;
  reqInventory!: ReqInventory;
  isEdit = false; // <-- Agregado

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private fb: FormBuilder,
    private inventoryRepository: InventoryRepository,
    private router: Router,
    dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      id: [''],
      productId: [''],
      warehouseId: [''],
      quantityInStock: [0],
      reorderLevel: [0]
    });

    this.loadInventoryData();
  }

  loadInventoryData(): void {
    const inventoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if (inventoryId && Utils.isValidObjectId(inventoryId)) {
      this.isEdit = true; // <-- Si tiene ID válido, es edición
      const filters: ReqInventory = {
        id: inventoryId,
        productId: '',
        warehouseId: '',
        quantityInStock: 0,
        reorderLevel: 0,
        page: 1,
        pagesize: 1
      };

      this.spinnerService.show();
      this.inventoryRepository.listInventories(filters).subscribe({
        next: (res) => {
          const inv = res?.payload && res.payload.length > 0 ? res.payload[0] : null;
          if (inv) this.inventoryForm.patchValue(inv);
          this.spinnerService.hide();
        },
        error: () => this.spinnerService.hide()
      });
    }
  }

  saveInventory(): void {
    const inv: ReqInventory = {
      ...this.inventoryForm.value
    };
    this.inventoryRepository.saveInventory(inv).subscribe(() => {
      this.router.navigate(['/bussiness/inventory']);
    });
  }

  returnToList(): void {
    this.router.navigate(['/bussiness/inventory']);
  }
}
