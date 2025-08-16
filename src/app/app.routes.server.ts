import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'support/product/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'system-admin/system/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'system-admin/menu/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'support/supplier/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'system-admin/page/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'support/tenant/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'home/quotation/detail/:id',
    renderMode: RenderMode.Client
  },

  {
    path: 'support/common-data/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'bussiness/warehouse/detail/:id',
    renderMode: RenderMode.Client
  }
  ,
  {
    path: 'bussiness/purchase-order/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'bussiness/purchase-order-item/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'bussiness/purchase-order-item/detail/new',
    renderMode: RenderMode.Client
  },
  {
    path: 'bussiness/inventory/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'bussiness/inventory/detail/new',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender // This catches everything else
  }
];
