import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { Const } from '../../../../utils/const';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RespProduct } from '../../../../@data/model/product/resp-product';
import { FileRepository } from '../../../../@domain/repository/repository/file.repository';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { FileMetadata } from '../../../../@data/model/files/fileMetadata';
import { ChatbotComponent } from '../../../@common-components/chatbot/chatbot.component';
import { AuthStateService } from '../../../../@data/services/AuthStateService';
import { ProductViewImagenRepository } from '../../../../@domain/repository/repository/product-view-imagen-repository';
import { RespImagenProductRank } from '../../../../@data/model/product/resp-imagen-product-rank';

@Component({
  selector: 'app-detail-main-page',
  templateUrl: './detail-main-page.component.html',
  styleUrls: ['./detail-main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule, // Importante para los íconos
    NbInputModule,
    NebularSharedModule,
    FormsModule,
    ReactiveFormsModule, ChatbotComponent
  ]
})
export class DetailMainPageComponent implements OnInit {
  // --- Datos de tu componente original ---
  respProduct?: RespProduct;
  lstim?: listCorouseImages;
  colru?: CorouselImage;
  zoomed: boolean = false;

  // --- Datos de Relleno para la Maqueta "Temu" ---
  dummyRating = 4.8;
  dummyReviewsCount = "1.2k+";
  dummyPrice = 40.50;
  dummyOldPrice = 50.90;
  selectedColorIndex = 0;
  selectedSize: string | null = null;
  quantity = 1;
  catalogImagesMetadata: RespImagenProductRank[] = [];
  productData: RespImagenProductRank | null = null;
  // Datos estáticos para los selectores
  colors = [
    { name: 'Negro', imageUrl: 'https://i.imgur.com/gK6A4Lq.jpeg' },
    { name: 'Rojo', imageUrl: 'https://i.imgur.com/eB44aVn.jpeg' },
    { name: 'Azul', imageUrl: 'https://i.imgur.com/zN23pE5.jpeg' },
  ];
  sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileService: FileRepository, private authStateService: AuthStateService, private productViewImagenRepository: ProductViewImagenRepository,
  ) { }

 ngOnInit(): void {
    const stateData = window.history.state as RespProduct;

    if (stateData && stateData.id) {
      this.respProduct = stateData; // Guardamos la data básica inicial

      this.authStateService.waitForToken().then((token) => {
        if (token) {
          // --- LLAMADA ÚNICA Y EFICIENTE A LA API ---
          this.productViewImagenRepository.getViewsByProductId(this.respProduct?.id ?? '').subscribe({
            next: (response) => {
              if (response?.status?.success && response.payload) {
                 this.productData = response.payload;
                console.log("✅ Datos completos del producto recibidos:", this.productData);

                // --- ¡AQUÍ ESTÁ EL CAMBIO CLAVE! ---
                // Ya no llamamos a loadImages().
                // En su lugar, procesamos la data que acabamos de recibir.
                
                if (this.productData) {
                  this.setupImageGallery(this.productData);
                }

              } else {
                 console.warn('⚠️ La API no devolvió un payload para el producto.');
                 this.loadMockImages(); // Fallback si no hay payload
              }
            },
            error: (err) => {
              console.error('❌ Error al obtener los detalles del producto:', err);
              this.loadMockImages(); // Fallback en caso de error
            }
          });
        } else {
          console.warn('⚠️ Token no disponible después de esperar');
        }
      });
    } else {
        console.error('No se recibieron datos del producto desde la página anterior.');
        // Opcional: Redirigir al catálogo si no hay datos.
        // this.router.navigate(['/home/main']);
    }

    // Escuchar la tecla ESC para cerrar el zoom
    window.addEventListener('keydown', (e) => e.key === 'Escape' && (this.zoomed = false));
  }

  private setupImageGallery(productData: RespImagenProductRank): void {
    const product = productData.respProduct;

    // Verificación de seguridad: ¿Existe el producto y tiene imágenes?
    if (product && product.fileMetadata && product.fileMetadata.length > 0) {
      // Mapea el array 'fileMetadata' al formato 'CorouselImage' que el template espera.
      const images: CorouselImage[] = product.fileMetadata.map((file, index) => ({
        imageSrc: file.url ?? '',
        imageAlt: file.filename,
        imagetoken: file.id,
        firstObject: index === 0 ? 'true' : 'false',
        index: index,
        imageCountainerToken: product.id,
        indicators: true,
        idDetail: file.productId
      }));

      // Asigna los datos transformados a las variables que usa el HTML.
      this.lstim = { tokenCol: product.id, lstCorouseImages: images };
      this.colru = images[0]; // Establece la primera imagen como la imagen principal.

    } else {
      // Fallback: Si el producto no tiene imágenes, carga las de relleno.
      this.loadMockImages();
      console.warn(`Producto con ID ${product?.id} no tiene imágenes. Cargando imágenes de relleno.`);
    }
  }

  public getChatbotContext(): string {
    // Si el producto o su nombre aún no se han cargado, devuelve un contexto genérico.
    if (!this.respProduct?.name) {
      return 'producto-general';
    }

    // Formatea el nombre para usarlo como contexto:
    return this.respProduct.name
      .toLowerCase() // 1. Convierte todo a minúsculas
      .replace(/\s+/g, '-') // 2. Reemplaza uno o más espacios con un guion
      .replace(/[^a-z0-9-]/g, ''); // 3. Elimina cualquier caracter que no sea letra, número o guion
  }


  private loadMockImages(): void {
    const mockImages: CorouselImage[] = [
      { imageSrc: 'https://i.imgur.com/gK6A4Lq.jpeg', imageAlt: 'Polo Negro', imagetoken: 'mock1' },
      { imageSrc: 'https://i.imgur.com/eB44aVn.jpeg', imageAlt: 'Polo Rojo', imagetoken: 'mock2' },
      { imageSrc: 'https://i.imgur.com/zN23pE5.jpeg', imageAlt: 'Polo Azul', imagetoken: 'mock3' },
    ];
    this.lstim = { tokenCol: 'default-product-id', lstCorouseImages: mockImages };
    this.colru = mockImages[0];
  }


  // --- Métodos para la Interfaz "Temu" ---

  selectColor(index: number): void {
    this.selectedColorIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = this.selectedSize === size ? null : size;
  }

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }

  changeFothoDetail(image: any) {
    this.colru = image;
  }

  nextImage(): void {
    if (!this.lstim?.lstCorouseImages || !this.colru) return;
    const currentIndex = this.lstim.lstCorouseImages.findIndex(img => img.imagetoken === this.colru?.imagetoken);
    const nextIndex = (currentIndex + 1) % this.lstim.lstCorouseImages.length;
    this.colru = this.lstim.lstCorouseImages[nextIndex];
  }

  prevImage(): void {
    if (!this.lstim?.lstCorouseImages || !this.colru) return;
    const currentIndex = this.lstim.lstCorouseImages.findIndex(img => img.imagetoken === this.colru?.imagetoken);
    const prevIndex = (currentIndex - 1 + this.lstim.lstCorouseImages.length) % this.lstim.lstCorouseImages.length;
    this.colru = this.lstim.lstCorouseImages[prevIndex];
  }

  getWhatsAppLink(): string {
    const productName = this.respProduct?.name || 'este producto';
    const selectedColor = this.colors[this.selectedColorIndex]?.name || 'No seleccionado';
    const selectedSize = this.selectedSize || 'No seleccionada';
    const selectedImageUrl = this.colru?.imageSrc;
    const messageParts = [
      `Hola, quiero más información sobre este producto: *${productName}*`,
      `\n- *Color:* ${selectedColor}`,
      `- *Talla:* ${selectedSize}`,
      `- *Cantidad:* ${this.quantity}`
    ];
    if (selectedImageUrl) {
      messageParts.push(`\n- *Imagen de referencia:* ${selectedImageUrl}`);
    }
    const text = messageParts.join('\n');
    return `https://wa.me/51933418411?text=${encodeURIComponent(text)}`;
  }
}