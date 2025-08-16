import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { NbDatepickerModule, NbOverlayContainer, NbOverlayContainerAdapter } from '@nebular/theme';

registerLocaleData(localeEsPe, 'es-PE');

// Simulación: obtengo tenants desde BD o API
async function getTenantIdsForPrerendering(): Promise<string[]> {
  return ['spi-control', 'otro-tenant']; // Cambia por tus tenants reales
}

// 👇 Esta función debe existir y exportarse exactamente así
export async function getPrerenderParams(route: string): Promise<Record<string, string>[]> {
  console.log(`Prerender solicitado para: ${route}`);

  // Normalizar ruta para evitar problemas
  const normalizedRoute = route.startsWith('/') ? route : '/' + route;

  // Cubrir cualquier ruta que empiece con /bussiness/:tenant
  if (normalizedRoute.startsWith('/bussiness/:tenant')) {
    const tenantIds = await getTenantIdsForPrerendering();
    return tenantIds.map(id => ({ tenant: id }));
  }

  return [];
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    { provide: NbOverlayContainer, useClass: NbOverlayContainerAdapter },
    NbDatepickerModule
  ],
}).catch(err => console.error(err));
