import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogModule, NbLayoutModule, NbAccordionModule, NbDialogService } from '@nebular/theme';
import { ProductService } from '../../../../@data/services/ProductService';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { RespProduct } from '../../../../@data/model/product/resp-product';
import { catchError, map, switchMap, tap } from 'rxjs';
import { Utils } from '../../../../utils/utils';
// Añadir esto al principio
import { Router } from '@angular/router';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { FileRepository } from '../../../../@domain/repository/repository/file.repository';
import { forkJoin, of } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbDialogModule,
    NbLayoutModule,
    NbAccordionModule,
    NebularSharedModule,
    TableDatasourceComponent,
  ],
})
export class ProductComponent extends BaseImplementation<any> implements OnInit {
  productForm!: FormGroup;
  datas?: TreeNode<any>[] = [];
  isLoading = false;
  searchButtonDisabled = true;
  listError: any;
  isdelelete: any;
  constructor(
    private fb: FormBuilder,
     modalRepository: ModalRepository,
     spinnerService: SpinnerService,
    private productService: ProductService,    dialogService: NbDialogService,
  private router: Router,private fileService:FileRepository
  ) {
    super(modalRepository,spinnerService,dialogService); // ✅ Pass dialogService to the parent class
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadProducts();
    this.  findProductProcess();
  }

  private buildForm() {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category:[''],
      barcode:[''],
      price:[''],
      stock:[''],
    });
  }
  columnMapping(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      barcode: 'Barcode',
      supplierName: 'Supplier',
      sizes: 'Sizes',
      expirationDate: 'Expiration Date',
      manufacturingDate: 'Manufacturing Date',
      pricing: 'Pricing',
      inventory: 'Inventory',
      category: 'Category',
    };
  
  

  }

  private loadProducts(): void {
    this.productService.product$.subscribe((product) => {
      this.processProductData(product);
      this.spinnerService.hide();
    });
  }
  private processProductData(produ: any[]): void {
    this.datas = this.customizePropertyNames(produ, this.columnMapping());
    this.setDefaultColumns(this.datas);
    if (this.datas && this.datas.length > 0) {
      this.updateHasMorePagesT(true);
    } else {
      this.updateHasMorePagesT(false);
    }
  }

  checkInputs() {
    const idToFind = this.productForm.get('id')?.value || '';
    const nameToFind = this.productForm.get('name')?.value || '';
    const category = this.productForm.get('category')?.value || '';
    const barcode = this.productForm.get('barcode')?.value || '';
    this.searchButtonDisabled = !(idToFind || nameToFind || category || barcode);
    if (this.searchButtonDisabled) {
      this.findProductProcess();
    }
  }


  findProductProcess() {
      this.spinnerService.show();
      const id = this.productForm.value.id || '';
      const name = this.productForm.value.name || '';
      const category = this.productForm.value.category || '';
      const barcode = this.productForm.value.barcode || '';
  
      this.productService.findProducts(this.page, this.pageSize, id, name, category, barcode).pipe(
        map(value => {
          let respo: RespProduct[] = value?.payload || []; // Asegurar que no sea null o undefined
          return this.customizePropertyNames(respo, this.columnMapping());
        }),
        catchError(error => {
          
          console.error("Error fetching employees:", error);
          return of([]); // Si hay error, retornar una lista vacía para evitar que la app falle
        })
      ).subscribe(data => {
        this.datas = data;
        console.log("Data source page", this.datas);
        
        this.setDefaultColumns(this.datas);
        if (this.datas && this.datas.length > 0) {
          this.updateHasMorePagesT(true);
        } else {
          this.updateHasMorePagesT(false);
        }
        this.spinnerService.hide();
      });
    }

    override findByparameter() {
      
      this.listError = this.validateObjectID();
      if (this.listError.length === 0) {
        this.productForm.get('id')?.markAsTouched();
        this.page = GeneralConstans.page
        this.pageSize = GeneralConstans.perPage;
        this.findProductProcess();
      }
    }
  validateObjectID(): string[] {
    const idToFind = this.productForm.get('id')?.value || '';
    const errorMessages: string[] = [];
    // Validate the idToFind control
    const isIdValid = Utils.isValidObjectId(idToFind);
    if (!Utils.empty(idToFind)) {
      if (!isIdValid) {
        // Handle the case when validation fails, e.g., add an error message to the array
        errorMessages.push('ID is not valid.');
      }
    }
    // Add more validation logic and error messages as needed
    return errorMessages;
  }

    onNewClick(): void {
      this.router.navigate(['/support/product/detail', 'new']);


    }

    handleEditAction(row: TreeNode<any>): void {
      
      if (!row?.data?.ID) {
        console.warn("Invalid product data.");
        return;
      }
      const productId = row.data.ID;
      this.router.navigate(['support/product/detail', productId]);
    }
    


handleDeleteAction(row: TreeNode<any>): void {
  if (!row.data.ID) {
    console.warn("Product ID missing.");
    return;
  }

  const productId: string = row.data.ID;
  this.spinnerService.show();

  // Step 1: Get the product images
  this.fileService.getCatalogImagen(GeneralConstans.tipoImagenCatalog, productId).pipe(
    switchMap((images) => {
      if (images && images.length > 0) {
        
        // Step 2: Delete all images
        const deleteCalls = images.map(img => this.fileService.deleteFile(img.id!));
        return forkJoin(deleteCalls); // Correctly using forkJoin
      }
      return of([]); // No images to delete
    }),
    switchMap(() => {
      // Step 3: Delete the product after images are removed
      return this.productService.deleteProduct(productId);
    })
  ).subscribe({
    next: () => {
      this.showSuccessMessage("Producto e imágenes eliminados con éxito", "Success");
      this.isdelelete = row;
      this.findProductProcess();
    },
    error: (error) => {
      console.error("Error eliminando producto o imágenes:", error);
      this.spinnerService.hide();
      this.handleErrorResponseSaveOrUpdate(error);
    }
  });
}


  deleting(event: any) {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...event.data,
          typeDescription: 'QUESTION',
          description: `"${event.data.Name}"?`,
        },
      }
    });
  
    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        
        this.handleDeleteAction(event); // Usa el método correctamente implementado
        this.findProductProcess();
      }
    });
  }
  
}
