
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { DataService } from '../../../../@data/services/data.service';
import { ImagenTempService } from '../../../../@data/services/imagenTemp.service';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module'
import { GeneralConstans } from '../../../../utils/generalConstant';
import { ImagenCatchInformationComponent } from '../../../@common-components/imagen-catch-information/imagen-catch-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../@data/services/ProductService';
import { ProductViewImagenRepository } from '../../../../@domain/repository/repository/product-view-imagen-repository';
import { FileService } from '../../../../@data/services/file.service';
import { FileRepository } from '../../../../@domain/repository/repository/file.repository';
import { ProductRepository } from '../../../../@domain/repository/repository/ProductRepository';
import { FileMetadata } from '../../../../@data/model/files/fileMetadata';
import { CatalogImageWrapper } from '../../../../@data/model/files/catalogImageWrapper';
import { RespImagenProductRank } from '../../../../@data/model/product/resp-imagen-product-rank';
import { RespProduct } from '../../../../@data/model/product/resp-product';
import { AuthenticationRepository } from '../../../../@domain/repository/repository/authentication.repository';
import { AuthStateService } from '../../../../@data/services/AuthStateService';
import { SliderComponent } from '../../../@common-components/slider/slider.component';
import { DetailContactComponent } from '../../../@common-components/contact/detail-contact.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ImagenCatchInformationComponent,
    ReactiveFormsModule,SliderComponent,DetailContactComponent,YouTubePlayerModule
  ],
})
export class MainPageComponent implements OnInit {

  constructor(
    private imagenData: DataService,
    private imagenTempService: ImagenTempService,
    private productViewImagenRepository: ProductViewImagenRepository,
    private fileService: FileRepository,
    private productService: ProductRepository, private router: Router, private authService: AuthenticationRepository, private authStateService: AuthStateService
  ) { }

  catalogImagesMetadata: RespImagenProductRank[] = [];
    videoId = 'kYfJxffe-3c';
  productosCargados: RespProduct[] = []; // ✅ lista de productos ya disponibles
  selectToken?: string = '';
  selectCountainerToken: any;
  updateImagen = new EventEmitter<CorouselImage>();
  public isLoadingImages: { [productId: string]: boolean } = {};
  isCatalogLoading = true;

ngOnInit(): void {
    this.isCatalogLoading = true;

    this.authStateService.waitForToken().then((token) => {
      if (token) {
        this.productViewImagenRepository.findAllViewsProducImag().subscribe({
          next: (response) => {
            // Verificamos que la respuesta fue exitosa y que el payload existe.
            if (response?.status?.success && response.payload) {
              // Asignamos directamente el payload. ¡La data ya viene completa!
              this.catalogImagesMetadata = response.payload;
              console.log('✅ Productos con imágenes cargados en una sola llamada:', this.catalogImagesMetadata);
            } else {
              // Si no hay payload o la respuesta no fue exitosa, dejamos el array vacío.
              this.catalogImagesMetadata = [];
              console.warn('⚠️ La respuesta de la API no fue exitosa o no contenía payload.');
            }
          },
          error: (err) => {
            console.error('❌ Error al obtener el catálogo de productos:', err);
            this.catalogImagesMetadata = []; // Limpiamos los datos en caso de error.
          },
          complete: () => {
            // La carga finaliza tanto si la respuesta es exitosa como si hay un error.
            this.isCatalogLoading = false;
          }
        });
      } else {
        console.warn('⚠️ Token no disponible después de esperar. No se cargarán los productos.');
        this.isCatalogLoading = false; // Finaliza la carga si no hay token.
      }
    });
  }


    processAndSetCatalogData(data: RespImagenProductRank[]): void {
    // Verificar si la data es válida.
    if (!data || data.length === 0) {
      this.catalogImagesMetadata = [];
      console.log('No hay productos para mostrar.');
      return;
    }

    // El backend ya nos dio todo. El trabajo ahora es solo asignar y quizás
    // hacer alguna transformación simple si fuera necesario.

    // Por ejemplo, vamos a asegurarnos de que cada producto tenga al menos una imagen
    // principal para evitar errores en el template.
    const processedData = data.map(item => {
      if (item.respProduct && item.respProduct.fileMetadata && item.respProduct.fileMetadata.length > 0) {
        // Opcional: Si quieres mostrar solo UNA imagen principal en la galería,
        // puedes cortar el array aquí. Si tu HTML ya muestra solo la primera,
        // este paso no es estrictamente necesario, pero hace la data más predecible.
        // item.respProduct.fileMetadata = [item.respProduct.fileMetadata[0]];
      } else if (item.respProduct) {
        // Si un producto no tiene imágenes, nos aseguramos de que el array esté vacío
        // para evitar errores en el template.
        item.respProduct.fileMetadata = [];
      }
      return item;
    });

    // Asignamos la data procesada a la propiedad del componente.
    
    this.catalogImagesMetadata = processedData;
    console.log('✅ Datos del catálogo procesados y listos para mostrar:', this.catalogImagesMetadata);
  }

loadCatalogImages(data :any): void {
  // Verificar si está vacío y finalizar carga
  if (!this.catalogImagesMetadata || this.catalogImagesMetadata.length === 0) {
    this.isCatalogLoading = false;
    return;
  }

  this.catalogImagesMetadata.forEach((item: RespImagenProductRank, index: number) => {
    const productId: string = item?.respProduct?.id ?? '';

    // Marcar como "cargando"
    this.isLoadingImages[productId] = true;
    

    this.fileService.getCatalogImagen(GeneralConstans.tipoImagenCatalog, productId).subscribe({
      next: (files: FileMetadata[]) => {
        if (this.catalogImagesMetadata[index]?.respProduct) {
          this.catalogImagesMetadata[index].respProduct.fileMetadata = files.length > 0 ? [files[0]] : [];
        }
        this.isLoadingImages[productId] = false;
        this.isCatalogLoading = false;
      },
      error: (err) => {
        console.error(`❌ Error al obtener catálogo de imágenes para producto con ID ${productId}:`, err);
        this.isLoadingImages[productId] = false;
        this.isCatalogLoading = false;
      }
    });
  });
}




  /*
  this.productService.saveView().subscribe(
    (value) => {

      if (value?.payload) {
        console.log('Vista guardada correctamente', value.payload);
      }
    });


  this.productService.findAllViewsProducImag().subscribe(
    (value) => {
      if (value?.payload) {
        this.lstIMf = value.payload;
      }
    },
    (error) => {
      console.error('Error al cargar imágenes', error);
    }
  );
  this.imagenTempService
    .listMainTopImagen(GeneralConstans.page, GeneralConstans.perPage)
    .subscribe(
      (value) => {
        if (value?.payload) {
          this.lstIMf = value.payload;
        }
      },
      (error) => {
        console.error('Error al cargar imágenes', error);
      }
    );
    */

  changeImage(listImagenes: listCorouseImages, image: CorouselImage) {
    this.selectToken = image.imagetoken;
    this.selectCountainerToken = image.imageCountainerToken;
  }

  enviarData(image: CorouselImage) {
    this.updateImagen.emit(image);
  }
  viewCatalog(images: RespProduct | undefined): void {

    if (!images) {
      return;
    }
    this.router.navigate(['/home/detail'], { state: images });
  }
}
