import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

// Nebular & Third-Party Imports
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbTimepickerModule, NbDialogService, NbAccordionModule, NbDialogModule, NbLayoutModule, NbSelectModule, NbCheckboxModule, NbTagListComponent, NbTagModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';

// Project-Specific Imports
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { ProductService } from '../../../../../@data/services/ProductService';
import { FileService } from '../../../../../@data/services/file.service';
import { SupplierRepository } from '../../../../../@domain/repository/repository/supplier.repository';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { CommonRepository } from '../../../../../@domain/repository/repository/common.repository';

import { AppModalFooterComponent } from '../../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../../@common-components/app-modal-header/app-modal-header.component';
import { SearchInputComponent } from '../../../../@common-components/search-input/search-input.component';
import { ModalComponent } from '../../../../@common-components/modal/modal.component';

import { ReqProduct } from '../../../../../@data/model/product/req-product';
import { RespProduct } from '../../../../../@data/model/product/resp-product';
import { RespSupplier } from '../../../../../@data/model/supplier/resp-supplier.model';
import { FileMetadata } from '../../../../../@data/model/files/fileMetadata';
import { SizeStock } from '../../../../../@data/model/product/sizeStock';
import { CatalogImageWrapper } from '../../../../../@data/model/files/catalogImageWrapper';

import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { Utils } from '../../../../../utils/utils';
import { GeneralConstans } from '../../../../../utils/generalConstant';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { commonConfigIds } from '../../../../../utils/values';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    // Nebular Modules
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbDialogModule,
    NbLayoutModule,
    NbAccordionModule,
    NbSelectModule,
    NbCheckboxModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    NebularSharedModule,
    // Common Components
    AppModalHeaderComponent,
    AppModalFooterComponent,
    SearchInputComponent,NbTagModule
  ],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'] // Use styleUrls (plural)
})
export class DetailProductComponent extends BaseImplementation<RespProduct> implements OnInit, AfterViewInit {

  // --- Class Properties ---
  @ViewChildren('columnRef') columnRefs!: QueryList<ElementRef>;
  proveedorSeleccionado: RespSupplier | null = null;
  
  // UI State for Images and Drag-Drop
  imageFiles: File[] = []; // Holds new files selected for upload
  imagePreviews: { file: File; url: string }[] = [];
  catalogImagesMetadata: CatalogImageWrapper[] = [];
  assignedImages: CatalogImageWrapper[] = [];

  // Data for Form Controls
  sizes: string[] = [];
  currencies: { code: string; name: string }[] = [];
  fileTypes: string[] = [];

  // Loading and State Flags
  productLoaded = false;
  catalogImagesLoaded = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private renderer: Renderer2,
    // Services
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    modalRepository: ModalRepository,
    public proveedorService: SupplierRepository,
    private productService: ProductService,
    private fileService: FileService,
    private commonRepository: CommonRepository
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  // --- Lifecycle Hooks ---

  ngOnInit(): void {
    this.buildForm();
    this.loadCommonData();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && Utils.isValidObjectId(id)) {
        // "Update" Mode: Load the product data from the server.
        this.loadProductById(id);
      } else {
        // "Create" Mode: The form is ready and empty.
        console.log('No product ID found, starting in create mode.');
      }
    });

    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }
  
  ngAfterViewInit(): void {
    this.syncColumnHeights();
    this.zone.runOutsideAngular(() => {
        const imageList = document.querySelector('.image-list');
        if (imageList) {
            new ResizeObserver(() => this.syncColumnHeights()).observe(imageList);
        }
    });
  }

  ngAfterViewChecked(): void {
    this.syncColumnHeights();
  }

  // --- Data Loading and Form Population ---

loadCommonData(): void {
  // 1. Obtenemos los IDs de configuración que necesitamos
  const configIds = Object.values(commonConfigIds);

  // 2. Llamamos al servicio (esto no cambia)
  this.commonRepository.getCommonParameters(configIds).subscribe({
    next: (resp) => {
      // 3. CORRECCIÓN: Procesamos el array `resp.payload` y adaptamos el `reduce`
      const configMap = (resp.payload || []).reduce((map: { [key: string]: any }, doc: any) => {
        // Usamos `doc.id` como clave (en lugar de `doc._id`)
        // Y guardamos el objeto `doc` completo como valor (en lugar de `doc.data`)
        if (doc.id) {
          map[doc.id] = doc;
        }
        return map;
      }, {} as { [key: string]: any });

      // 4. La asignación ahora funcionará correctamente porque el mapa es correcto.
      // Leemos la propiedad específica (`.sizes`, `.currencies`) del objeto que guardamos en el mapa.
      this.sizes = configMap[commonConfigIds.sizes]?.sizes || [];
      this.currencies = configMap[commonConfigIds.currencies]?.currencies || [];
      this.fileTypes = configMap[commonConfigIds.fileTypes]?.fileTypes || [];
    },
    error: (err) => {
      console.error('Error loading common data by IDs', err);
      // En caso de error, dejamos los arrays vacíos para evitar problemas en el template.
      this.sizes = [];
      this.currencies = [];
      this.fileTypes = [];
    }
  });
}


  loadProductById(id: string): void {
    this.spinnerService.show();
    this.productService.findProducts(1, 1, id, '', '', '').subscribe({
      next: (response) => {
        this.entityData = response.payload[0] as RespProduct;
        this.patchFormValues(); // This method will now populate everything
        this.productLoaded = true;
        this.catalogImagesLoaded = true;
        this.trySyncHeights();
        this.spinnerService.hide();
      },
      error: (err) => {
        this.spinnerService.hide();
        console.error('Error loading product by ID', err);
      }
    });
  }
  
// En detail-product.component.ts

buildForm() {
  this.formData = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: [''],
    category: [''],
    subcategory: [''],
    productCode: [''],
    barcode: [''],
    sku: [''],
    upc: [''],
    supplierId: [''],
    supplierName: [''],
    manufacturer: [''],
    brand: [''],
    expirationDate: [''],
    manufacturingDate: [''],
    costPrice: [null],
    sellingPrice: [null],
    discount: [null],
    currency: [''],
    unitMeasure: [''],
    minStock: [null],
    maxStock: [null],
    isFeatured: [false],
    isNewArrival: [false],
    batch: [''],
    weight: [null],
    height: [null],
    width: [null],
    length: [null],
    thumbnailUrl: [''],
    seoTitle: [''],
    seoDescription: [''],
    imageUrls: [''],
    tags: this.fb.array([]),
    status: [true],
    typeImagen: [''],
    sizes: this.fb.array([]),
    images: this.fb.array([]),
    measurements: this.fb.array([]),
    specifications: this.fb.array([]),
    quantityPricing: this.fb.array([]),
    // ▼▼▼ BLOQUE FALTANTE - AÑADE ESTO ▼▼▼
    salesGuide: this.fb.group({
      valueProposition: [''],
      tagline: [''], // Aunque no esté en el HTML aún, es bueno inicializarlo
      targetAudience: this.fb.array([]), // Lo mismo para estos
      useCases: this.fb.array([]),
      keyBenefits: this.fb.array([]),
      fitAndStyleGuide: [''],
      careInstructions: this.fb.array([]),
      faq: this.fb.array([]),
    }),
    // ▲▲▲ FIN DEL BLOQUE A AÑADIR ▲▲▲
  });
}
  get tags(): FormArray {
    return this.formData.get('tags') as FormArray;
  }
    get measurements(): FormArray {
    return this.formData.get('measurements') as FormArray;
  }

    addTag(input: HTMLInputElement): void {
    const value = (input.value || '').trim();

    if (value) {
      // Añade el nuevo tag al FormArray
      this.tags.push(this.fb.control(value));
    }

    // Limpia el input
    input.value = '';
  }

    private createMeasurementGroup(): FormGroup {
    return this.fb.group({
      size: ['', Validators.required],
      chestContour: [null],
      shoulderWidth: [null],
      totalLength: [null],
      sleeveLength: [null]
    });
  }
get quantityPricing(): FormArray {
  return this.formData.get('quantityPricing') as FormArray;
}

private createQuantityPriceGroup(): FormGroup {
  return this.fb.group({
    size: ['', Validators.required],
    description: ['', Validators.required],
    minQuantity: [0, Validators.required],
    unitPrice: [0, Validators.required],
  });
}

addQuantityPrice(): void {
  this.quantityPricing.push(this.createQuantityPriceGroup());
}

removeQuantityPrice(index: number): void {
  this.quantityPricing.removeAt(index);
}

  /**
   * Añade una nueva fila vacía al formulario de medidas.
   */
  addMeasurement(): void {
    this.measurements.push(this.createMeasurementGroup());
  }
    removeMeasurement(index: number): void {
    this.measurements.removeAt(index);
  }


  // Método para QUITAR una etiqueta
  removeTag(tagToRemove: { text: string }): void {
    const index = this.tags.controls.findIndex(control => control.value === tagToRemove.text);
    if (index >= 0) {
      this.tags.removeAt(index);
    }
  }

  // --- MÉTODOS PARA ESPECIFICACIONES GENÉRICAS (Estructura Flexible) ---
  get specifications(): FormArray {
    return this.formData.get('specifications') as FormArray;
  }
  private createSpecificationGroup(): FormGroup {
    return this.fb.group({
      groupName: ['', Validators.required],
      attributes: this.fb.array([])
    });
  }
  addSpecificationGroup(): void {
    this.specifications.push(this.createSpecificationGroup());
  }
  removeSpecificationGroup(groupIndex: number): void {
    this.specifications.removeAt(groupIndex);
  }
  getAttributes(groupIndex: number): FormArray {
    return this.specifications.at(groupIndex).get('attributes') as FormArray;
  }
  private createAttributePair(): FormGroup {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }
  addAttribute(groupIndex: number): void {
    this.getAttributes(groupIndex).push(this.createAttributePair());
  }
  removeAttribute(groupIndex: number, attributeIndex: number): void {
    this.getAttributes(groupIndex).removeAt(attributeIndex);
  }

  patchFormValues(): void {
    if (!this.entityData) return;

    // 1. Patch all the simple form controls
    this.formData.patchValue({
      id: this.entityData.id,
      name: this.entityData.name,
      description: this.entityData.description,
      category: this.entityData.category,
      subcategory: this.entityData.subcategory,
      productCode: this.entityData.productCode,
      barcode: this.entityData.barcode,
      sku: this.entityData.sku,
      upc: this.entityData.upc,
      supplierId: this.entityData.supplierId,
      supplierName: this.entityData.supplierName,
      manufacturer: this.entityData.manufacturer,
      brand: this.entityData.brand,
      expirationDate: this.entityData.expirationDate ? new Date(this.entityData.expirationDate) : null,
      manufacturingDate: this.entityData.manufacturingDate ? new Date(this.entityData.manufacturingDate) : null,
      costPrice: this.entityData.pricing?.costPrice,
      sellingPrice: this.entityData.pricing?.sellingPrice,
      discount: this.entityData.pricing?.discount,
      currency: this.entityData.pricing?.currency,
      unitMeasure: this.entityData.inventory?.unitMeasure,
      minStock: this.entityData.inventory?.minStock,
      maxStock: this.entityData.inventory?.maxStock,
      isFeatured: this.entityData.inventory?.isFeatured,
      isNewArrival: this.entityData.inventory?.isNewArrival,
      batch: this.entityData.inventory?.batch,
      weight: this.entityData.inventory?.weight,
      height: this.entityData.inventory?.height,
      width: this.entityData.inventory?.width,
      length: this.entityData.inventory?.length,
      thumbnailUrl: this.entityData.media?.thumbnailUrl,
      seoTitle: this.entityData.media?.seoTitle,
      seoDescription: this.entityData.media?.seoDescription,
      imageUrls: this.entityData.media?.imageUrls?.join(', ') || '',
     // tags: this.entityData.media?.tags?.join(', ') || '',
      status: this.entityData.status,
    });
  this.tags.clear();

  // 2. Si hay tags en la entidad, puebla el FormArray
  if (this.entityData.tags && Array.isArray(this.entityData.tags)) {
    this.entityData.tags.forEach(tag => {
      this.tags.push(this.fb.control(tag));
    });
  }
      this.measurements.clear(); // Limpiar filas existentes antes de poblar
    if (this.entityData.measurements && Array.isArray(this.entityData.measurements)) {
      this.entityData.measurements.forEach(measurement => {
        const measurementGroup = this.createMeasurementGroup();
        measurementGroup.patchValue(measurement); // Poblar el grupo con los datos
        this.measurements.push(measurementGroup);
      });
    }
        this.specifications.clear();
    if (this.entityData.specifications && Array.isArray(this.entityData.specifications)) {
      this.entityData.specifications.forEach(groupData => {
        const specGroup = this.createSpecificationGroup();
        specGroup.patchValue({ groupName: groupData.groupName });
        
        if (groupData.attributes && Array.isArray(groupData.attributes)) {
            groupData.attributes.forEach(attrData => {
              const attrPair = this.createAttributePair();
              attrPair.patchValue(attrData);
              (specGroup.get('attributes') as FormArray).push(attrPair);
            });
        }
        this.specifications.push(specGroup);
      });
    }

    
    // ▼▼▼ Poblar el formulario de la guía de ventas ▼▼▼
    if (this.entityData.salesGuide) {
        this.formData.get('salesGuide')?.patchValue(this.entityData.salesGuide);
        
        // Poblar el FormArray de beneficios
        this.keyBenefits.clear();
        this.entityData.salesGuide.keyBenefits?.forEach(b => {
            this.keyBenefits.push(this.fb.group(b));
        });
    }

    // 2. Clear out old data from UI arrays
    this.assignedImages = [];
    this.catalogImagesMetadata = [];
    
    // 3. Process the file metadata from the server to populate UI lists
    if (this.entityData.fileMetadata && Array.isArray(this.entityData.fileMetadata)) {
      this.entityData.fileMetadata.forEach(file => {
        // Convert the sizeStock array from API into the sizeStockMap object for the UI
        const sizeStockMap = (file.sizeStock || []).reduce((map, item) => {
          if (item.size !== undefined) {
            map[item.size] = item.stock ?? 0;
          }
          return map;
        }, {} as { [key: string]: number });
        
        const wrapper: CatalogImageWrapper = {
          fileMetadata: [file],
          sizeStockMap: sizeStockMap
        };

        if (file.position === 'ASIGNADA') {
          this.assignedImages.push(wrapper);
        } else if (file.position === 'CATALOG') {
          this.catalogImagesMetadata.push(wrapper);
        }
      });
    }
    
    // 4. Populate supplier information
    if (this.entityData.supplierId && this.entityData.supplierName) {
      this.proveedorSeleccionado = {
        id: this.entityData.supplierId,
        name: this.entityData.supplierName,
      } as RespSupplier;
    } else {
      this.proveedorSeleccionado = null;
    }

this.quantityPricing.clear();
if (this.entityData.quantityPricing && Array.isArray(this.entityData.quantityPricing)) {
  this.entityData.quantityPricing.forEach(price => {
    const group = this.createQuantityPriceGroup();
    group.patchValue(price);
    this.quantityPricing.push(group);
  });
}


  }

  // --- Form Submission ---

onSubmit() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      this.showWarningMessage('Por favor, complete todos los campos obligatorios.', 'Formulario Inválido');
      return;
    }
    this.spinnerService.show();

    const formRaw = this.formData.getRawValue();

    // --- CORRECCIÓN CLAVE: Filtrar antes de mapear para evitar errores con undefined ---
    const assignedMetadata = this.assignedImages
      .filter(w => w.fileMetadata && w.fileMetadata.length > 0) // Solo procesa si fileMetadata existe y no está vacío
      .map(w => {
          const meta = w.fileMetadata![0]; // TypeScript ahora sabe que no es nulo
          const sizeStock = Object.keys(w.sizeStockMap || {}).map(size => ({ size, stock: w.sizeStockMap![size] || 0 }));
          return { ...meta, position: 'ASIGNADA', sizeStock };
      });

    const catalogMetadata = this.catalogImagesMetadata
      .filter(w => w.fileMetadata && w.fileMetadata.length > 0)
      .map(w => ({ ...w.fileMetadata![0], position: 'CATALOG', sizeStock: [] }));


    // Construye el DTO final
    const productRequest: ReqProduct = {
      ...formRaw,
      expirationDate: this.datePipe.transform(formRaw.expirationDate, 'dd/MM/yyyy') || null,
      manufacturingDate: this.datePipe.transform(formRaw.manufacturingDate, 'dd/MM/yyyy') || null,
      tags: formRaw.tags,
      pricing: { costPrice: formRaw.costPrice, sellingPrice: formRaw.sellingPrice, discount: formRaw.discount, currency: formRaw.currency },
      inventory: { unitMeasure: formRaw.unitMeasure, minStock: formRaw.minStock, maxStock: formRaw.maxStock, isFeatured: formRaw.isFeatured, isNewArrival: formRaw.isNewArrival, batch: formRaw.batch, weight: formRaw.weight, height: formRaw.height, width: formRaw.width, length: formRaw.length },
      measurements: formRaw.measurements,
      media: { imageUrls: [], thumbnailUrl: formRaw.thumbnailUrl, seoTitle: formRaw.seoTitle, seoDescription: formRaw.seoDescription },
      // La metadata existente ya está procesada y filtrada
      fileMetadata: [...assignedMetadata, ...catalogMetadata],
        quantityPricing: formRaw.quantityPricing,
    };

    // Llama al servicio con el DTO y los nuevos archivos
    this.productService.saveProduct(productRequest, this.imageFiles).pipe(
      finalize(() => this.spinnerService.hide())
    ).subscribe({
      next: (response) => {
        if (response.status?.success) {
          this.showSuccessMessage('Producto guardado con éxito.', 'Operación Exitosa');
          this.returnToList();
        } else {
          this.showWErrorMessage( 'Ocurrió un error al guardar.', 'Error');
        }
      },
      error: (error) => this.handleErrorResponseSaveOrUpdate(error),
    });
  }

  private uploadNewFiles(productId: string, typeImagen: string): Observable<FileMetadata[]> {
    if (this.imageFiles.length === 0) {
      return of([]);
    }
    const newFilesMetadata: Partial<FileMetadata>[] = this.imageFiles.map(file => ({
      filename: file.name,
      typeFile: typeImagen || 'IMAGEN_PRODUCTO',
      position: 'ASIGNADA',
    }));
    return this.fileService.uploadFiles(this.imageFiles, newFilesMetadata, productId);
  }

  // --- UI and Event Handlers ---

  get sizesFormArray(): FormArray {
    return this.formData.get('sizes') as FormArray;
  }

  onProveedorSelected(option: any) {
    this.formData.patchValue({
      supplierId: option?.id,
      supplierName: option?.name,
    });
  }
  
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const productName = this.formData.get('name')?.value?.toLowerCase().replace(/\s+/g, '-');
    if (!productName) {
        this.showWarningMessage('Por favor, ingrese un nombre para el producto antes de subir imágenes.', 'Nombre Requerido');
        return;
    }
    if (input.files) {
      for (const file of Array.from(input.files)) {
        const uniqueIndex = Date.now() + Math.random(); // Better uniqueness
        const extension = file.name.split('.').pop();
        const newFileName = `${productName}-${uniqueIndex}.${extension}`;
        const renamedFile = new File([file], newFileName, { type: file.type });
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push({ file: renamedFile, url: reader.result as string });
          this.imageFiles.push(renamedFile);
        };
        reader.readAsDataURL(renamedFile);
      }
    }
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  onCatalogDrop(event: CdkDragDrop<CatalogImageWrapper[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.syncColumnHeights();
  }

  onAssignDrop(event: CdkDragDrop<CatalogImageWrapper[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.syncColumnHeights();
  }
  
  confirmDeleteImage(img: FileMetadata): void {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...img,
          typeDescription: 'QUESTION',
          description: `¿Estás seguro de que deseas eliminar permanentemente la imagen "${img.filename}"?`,
        },
      },
    });
    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        this.handleDeleteImage(img);
      }
    });
  }

  // --- Métodos para manejar los "keyBenefits" ---
get keyBenefits(): FormArray {
  return this.formData.get('salesGuide.keyBenefits') as FormArray;
}

addBenefit(): void {
  const benefitGroup = this.fb.group({
    feature: ['', Validators.required],
    benefit: ['', Validators.required]
  });
  this.keyBenefits.push(benefitGroup);
}

removeBenefit(index: number): void {
  this.keyBenefits.removeAt(index);
}

  handleDeleteImage(img: FileMetadata): void {
    if (!img.id) return;
    this.spinnerService.show();
    this.fileService.deleteFile(img.id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.catalogImagesMetadata = this.catalogImagesMetadata.filter(item => item.fileMetadata && item.fileMetadata.length > 0 && item.fileMetadata[0].id !== img.id);
        this.assignedImages = this.assignedImages.filter(item => item.fileMetadata && item.fileMetadata.length > 0 && item.fileMetadata[0].id !== img.id);
        this.showSuccessMessage('Imagen eliminada correctamente.', 'Éxito');
      },
      error: (error) => {
        this.spinnerService.hide();
        this.showWErrorMessage('Error al eliminar la imagen.', 'Error');
        console.error('Error deleting image:', error);
      }
    });
  }

  returnToList(): void {
    this.router.navigate(['/support/product']);
  }
  
  // --- UI Sync and Helpers ---

  trySyncHeights(): void {
    if (this.productLoaded && this.catalogImagesLoaded) {
      setTimeout(() => this.syncColumnHeights(), 0);
    }
  }

  syncColumnHeights(): void {
    if (!this.columnRefs || this.columnRefs.length < 2) return;
    const [leftCol, rightCol] = this.columnRefs.map(ref => ref.nativeElement);
    this.renderer.setStyle(leftCol, 'height', 'auto');
    this.renderer.setStyle(rightCol, 'height', 'auto');
    const maxHeight = Math.max(leftCol.offsetHeight, rightCol.offsetHeight);
    this.renderer.setStyle(leftCol, 'height', `${maxHeight}px`);
    this.renderer.setStyle(rightCol, 'height', `${maxHeight}px`);
  }

  get emptySlots(): any[] {
    const catLen = this.catalogImagesMetadata?.length ?? 0;
    const assLen = this.assignedImages?.length ?? 0;
    const diff = catLen - assLen;
    return Array(Math.max(diff, 0));
  }
}