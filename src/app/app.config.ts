import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject, LOCALE_ID, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbDialogModule, NbSidebarModule, NbMenuModule, NbWindowModule, NbOverlayModule, NbOverlayContainer, NbOverlayContainerAdapter, NbDialogService, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptor, ErrorInterceptor } from './@data/interceptors';
import { MyHttpInterceptor } from './@data/interceptors/request.interceptor';
import { ApiService } from './@data/services/api.service';
import { DataService } from './@data/services/data.service';
import { SpinnerService } from './@data/services/spinner.service';
import { routes } from './app.routes';
import { AuthenticationService } from './@data/services/authentication.service';
import { AuthenticationRepository } from './@domain/repository/repository/authentication.repository';
import { ModalService } from './@data/services/modal.service';
import { UserService } from './@data/services/user.service';
import { UserRepository } from './@domain/repository/repository/user.repository';
import { Const } from './utils/const';
import { ModalRepository } from './@domain/repository/repository/modal.repository ';
import { SupportRepository } from './@domain/repository/repository/support.repository';
import { SupportService } from './@data/services/support.service';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { SupplierService } from './@data/services/supplier.service';
import { SupplierRepository } from './@domain/repository/repository/supplier.repository';
import { CommonRepository } from './@domain/repository/repository/common.repository';
import { CommonService } from './@data/services/common.service';
import { ProductViewImagenRepository } from './@domain/repository/repository/product-view-imagen-repository';
import { ProductViewImagenService } from './@data/services/product-view-imagen.service';
import { FileRepository } from './@domain/repository/repository/file.repository';
import { FileService } from './@data/services/file.service';
import { ProductRepository } from './@domain/repository/repository/ProductRepository';
import { ProductService } from './@data/services/ProductService';
import { TenantInterceptor } from './@data/interceptors/TenantInterceptor';
import { DebugInterceptor } from './@data/interceptors/DebugInterceptor';
import { WarehouseService } from './@data/services/house-wore.service';
import { InventoryService } from './@data/services/inventory.repository';
import { PurchaseOrderItemService } from './@data/services/purchase-order-item.service';
import { PurchaseOrderService } from './@data/services/purchase-order.service';
import { InventoryRepository } from './@domain/repository/repository/inventory.repository';
import { PurchaseOrderItemRepository } from './@domain/repository/repository/purchase-order-item.repository';
import { PurchaseOrderRepository } from './@domain/repository/repository/purchase-order.repository';
import { WarehouseRepository } from './@domain/repository/repository/warehouse.repository';
import { ContactService } from './@data/services/contact.service';
import { ContactRepository } from './@domain/repository/repository/contact.repository';
import { MAT_DATE_LOCALE } from '@angular/material/core';
export function initConfig(constService: Const) {
  return () =>
    Promise.all([constService.loadCommonConfig(), constService.loadEntidadConfig()])
      .catch(error => {
        console.error("Error en APP_INITIALIZER:", error);
        return [];
      });
}



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),

    { provide: NbOverlayContainer, useClass: NbOverlayContainerAdapter }, // ✅ FIX
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // ✅ Fix: No manual interceptor injection

    importProvidersFrom(
      NbOverlayModule, // ✅ Move to the top to ensure `_NbOverlayService` is available
      NbLayoutModule,
      CommonModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      NbThemeModule.forRoot({ name: 'corporate' }),
      NbEvaIconsModule,
      NbSidebarModule.forRoot(),
      NbDialogModule.forRoot(),
      NbMenuModule.forRoot(),
      NbWindowModule.forRoot(),
      NbToastrModule.forRoot(),
       NbDatepickerModule.forRoot(), // ✅ Ya agregado
      NbTimepickerModule.forRoot(),
     
      NbDateFnsDateModule.forRoot({
          format: 'dd/MM/yyyy HH:mm:ss'
      }),
  

    ),

    provideAppInitializer(
      () => inject(Const).loadCommonConfig(),
    ),

    // ✅ Fix: HTTP Interceptors (Ensure No Circular Dependency)
    { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DebugInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: LOCALE_ID, useValue: 'es-PE' },

    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    { provide: UserRepository, useClass: UserService },
    { provide: SupportRepository, useClass: SupportService },
    { provide: SupplierRepository, useClass: SupplierService },
    { provide: CommonRepository, useClass: CommonService },
    { provide: ProductViewImagenRepository, useClass: ProductViewImagenService },
    { provide: FileRepository, useClass: FileService },
    { provide: ProductRepository, useClass: ProductService },
    { provide: WarehouseRepository, useClass: WarehouseService },
    { provide: InventoryRepository, useClass: InventoryService },
    { provide: PurchaseOrderItemRepository, useClass: PurchaseOrderItemService },
    { provide: PurchaseOrderRepository, useClass: PurchaseOrderService },
    { provide: ContactRepository, useClass: ContactService },

    Const,
    ApiService,
    DataService,
    SpinnerService, NbDialogService,

  ],
};
