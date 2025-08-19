import { Routes } from '@angular/router';
import { AuthComponent } from './@presentation/auth/auth.component';
import { HomeComponent } from './@presentation/home/home.component';
import { PageComponent } from './@presentation/pages/page.component';
import { AuthGuard } from './@data/interceptors';
import { NotauthGuard } from './@data/interceptors/notauth.guard';
import { SystemComponent } from './@presentation/system-admin/system.component';

export const routes: Routes = [
  // =================================================================
  //  RUTA PRINCIPAL (HOME)
  // =================================================================
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadComponent: () => import('./@presentation/home/main/main-page/main-page.component')
          .then(m => m.MainPageComponent)
      },
      {
        path: 'detail',
        loadComponent: () => import('./@presentation/home/main/detail-main-page/detail-main-page.component')
          .then(m => m.DetailMainPageComponent)
      },
      {
        path: 'quotations',
        loadComponent: () => import('./@presentation/home/cotizacion/quotation-list/quotation-list.component')
          .then(m => m.QuotationListComponent)
      },
      {
        path: 'quotation/detail/:id',
        loadComponent: () => import('./@presentation/home/cotizacion/quotation-detail/quotation-create.component')
          .then(m => m.QuotationCreateComponent),
        data: { renderMode: 'client' }
      },
    ],
  },

  // =================================================================
  //  RUTAS DE AUTENTICACIÓN
  // =================================================================
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotauthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./@presentation/auth/user/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./@presentation/auth/user/user-register/user-register.component')
          .then(m => m.UserRegisterComponent)
      },
    ],
  },
  {
    path: 'spi-control',
    loadChildren: () => import('./@presentation/web-pages/spi-control/spi-control.routes')
      .then(m => m.SPI_CONTROL_ROUTES),
    data: { renderMode: 'client' }
  },

  // =================================================================
  //  RUTAS DE PANEL DE SOPORTE (SUPPORT)
  // =================================================================
  {
    path: 'support',
    component: PageComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      {
        path: 'imagen-product',
        loadComponent: () => import('./@presentation/pages/support/register-image-by-product/register-image-by-product.component')
          .then(m => m.RegisterImageByProductComponent)
      },
      {
        path: 'product',
        loadComponent: () => import('./@presentation/pages/support/product/product.component')
          .then(m => m.ProductComponent)
      },
      {
        path: 'product/detail/:id',
        loadComponent: () => import('./@presentation/pages/support/product/detail-product/detail-product.component')
          .then(m => m.DetailProductComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'employee',
        loadComponent: () => import('./@presentation/pages/support/workers/employee/employee.component')
          .then(m => m.EmployeeComponent)
      },
      {
        path: 'store',
        loadComponent: () => import('./@presentation/pages/support/stores/store.component')
          .then(m => m.StoreComponent)
      },
      {
        path: 'supplier',
        loadComponent: () => import('./@presentation/pages/support/supplier/supplier.component')
          .then(m => m.SupplierComponent)
      },
      {
        path: 'supplier/detail/:id',
        loadComponent: () => import('./@presentation/pages/support/supplier/detail-supplier/detail-supplier.component')
          .then(m => m.DetailSupplierComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'tenant',
        loadComponent: () =>
          import('./@presentation/pages/support/tenant/support-tenant.component')
            .then(m => m.SupportTenantComponent)
      },
      {
        path: 'tenant/detail/:id',
        loadComponent: () =>
          import('./@presentation/pages/support/tenant/detail/support-tenant-detail.component')
            .then(m => m.SupportTenantDetailComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'common-data/detail/:id',
        loadComponent: () => import('./@presentation/pages/support/manage-common-data/manage-common-data.component')
          .then(m => m.ManageCommonDataComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'common-data/new',
        loadComponent: () => import('./@presentation/pages/support/manage-common-data/manage-common-data.component')
          .then(m => m.ManageCommonDataComponent),
        data: { renderMode: 'client' }
      }
    ],
  },

  // =================================================================
  //  RUTAS DE PANEL DE ADMINISTRACIÓN (SYSTEM-ADMIN)
  // =================================================================
  {
    path: 'system-admin',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'control', pathMatch: 'full' },
      {
        path: 'control',
        loadComponent: () => import('./@presentation/system-admin/admin/system/register-control/register-control.component')
          .then(m => m.RegisterControlComponent)
      },
      {
        path: 'parameter',
        loadComponent: () => import('./@presentation/system-admin/admin/system/parameters/parameters.component')
          .then(m => m.ParametersComponent)
      },
      {
        path: 'generate-random-color-imagen',
        loadComponent: () => import('./@presentation/pages/support/create-randon-imagen-color/create-randon-imagen-color.component')
          .then(m => m.CreateRandonImagenColorComponent)
      },
      {
        path: 'system',
        loadComponent: () => import('./@presentation/system-admin/admin/system/system.component')
          .then(m => m.SystemComponent)
      },
      {
        path: 'system/detail/:id',
        loadComponent: () => import('./@presentation/system-admin/admin/system/system-detail/system-detail.component')
          .then(m => m.SystemDetailComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'page/detail/:id',
        loadComponent: () => import('./@presentation/system-admin/admin/system/page-detail/page-detail.component')
          .then(m => m.PageDetailComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'menu/detail/:id',
        loadComponent: () => import('./@presentation/system-admin/admin/system/menu-detail/menu-detail.component')
          .then(m => m.MenuDetailComponent),
        data: { renderMode: 'client' }
      }
    ],
  },

  // =================================================================
  //  RUTAS DE PANEL DE NEGOCIO (BUSSINESS)
  // =================================================================
  {
    path: 'bussiness',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'warehouse', pathMatch: 'full' },
      {
        path: 'warehouse',
        loadComponent: () => import('./@presentation/pages/bussiness/warehouse/ware-house.component')
          .then(m => m.WarehouseComponent)
      },
      {
        path: 'warehouse/detail/:id',
        loadComponent: () => import('./@presentation/pages/bussiness/warehouse/detail-warehouse/detail-warehouse.component')
          .then(m => m.DetailWarehouseComponent),
        data: { renderMode: 'client' }
      },
      
      {
        path: 'purchase-order',
          loadComponent: () => import('./@presentation/pages/bussiness/purchase-order/purchase-order.component')
          .then(m => m.PurchaseOrderComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'purchase-order-item',
        loadComponent: () => import('./@presentation/pages/bussiness/purchase-order-item/purchase-order-item.component')
          .then(m => m.PurchaseOrderItemComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'inventory',
        loadComponent: () => import('./@presentation/pages/bussiness/inventory/inventory/inventory.component')
          .then(m => m.InventoryComponent),
        data: { renderMode: 'client' }
      },
    ],
  },

  // =================================================================
  //  ¡SOLUCIÓN! RUTAS DE REDIRECCIÓN A NIVEL RAÍZ (ÚLTIMAS RUTAS)
  // =================================================================
  {
    path: '',
    redirectTo: '/home/main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home/main',
  }
];