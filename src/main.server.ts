import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// =========================================================================
// ✨✨✨ CÓDIGO ACTUALIZADO PARA MULTI-TENANCY CON TUS CONSTANTES DE JAVA ✨✨✨
// =========================================================================

// ⚠️ ATENCIÓN: REEMPLAZA ESTE VALOR CON LA URL BASE REAL DE TU API DE BACKEND.
// Para desarrollo local, podría ser: 'http://localhost:8080'
// Para producción, debería ser tu dominio de API, ej: 'https://api.alamodaperu.online'
const BACKEND_BASE_URL = 'http://localhost:8080'; // <-- ¡AJUSTA ESTO SEGÚN TU ENTORNO!

// Estas son las constantes de tu backend Java para construir la URL.
// NOTA: El "{access:private|public}" de BASE_ENDPOINT se maneja con ACCESS_TYPE_FOR_API_CALL.
const BASE_ENDPOINT_SEGMENT = ''; // La plantilla de Java incluye {access}/v1, que ya lo manejamos.
const ENDPOINT_MODULE_SEGMENT = '/support';
const TENANT_CONTROLLER_PATH = '/tenant';

// ✨ DEDUCIÓN CLAVE: Debemos usar 'private' o 'public' aquí.
// Basado en tu `TenantService` de Angular que usa `Const.URL_TYPE_ACCES_PRIVATE`,
// asumimos que el segmento de acceso para esta llamada es 'private'.
// SI TU API DE LISTAR TENANTS ES PÚBLICA (sin token), CAMBIA ESTO A 'public'.
const ACCESS_TYPE_FOR_API_CALL = 'private'; // <-- VERIFICA ESTO con el valor de Const.URL_TYPE_ACCES_PRIVATE

/**
 * Función para obtener dinámicamente la lista de IDs de tenants desde tu API de backend.
 *
 * @returns Un Promise que resuelve a un array de strings, cada string siendo un ID de tenant.
 */
async function getTenantIdsForPrerendering(): Promise<string[]> {
  console.log('Iniciando la obtención de IDs de tenants para prerenderizado desde la API...');

  // Construye la URL completa del endpoint de listar tenants.
  // Combina la URL base, el tipo de acceso, la versión (v1), el módulo (support) y el controlador (tenant).
  // Ejemplo: http://localhost:8080/private/v1/support/tenant?active=true
  const tenantsApiUrl = `${BACKEND_BASE_URL}/${ACCESS_TYPE_FOR_API_CALL}/v1${ENDPOINT_MODULE_SEGMENT}${TENANT_CONTROLLER_PATH}?active=true`;

  try {
    console.log(`Intentando llamar a la API de tenants: ${tenantsApiUrl}`);

    // Realiza la llamada HTTP. Como tu TenantController.listTenants no usa JWT para el GET,
    // asumimos que no es necesario un header de autorización aquí.
    const response = await fetch(tenantsApiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error HTTP al obtener tenants: ${response.status} - ${response.statusText}`);
      console.error('Respuesta de error de la API:', errorText);
      throw new Error(`Fallo al obtener la lista de tenants. Estado: ${response.status}`);
    }

    // Tu API devuelve un RespBase<List<RespTenant>>.
    // Necesitamos extraer el 'payload' que contiene la lista.
    const apiResponse: any = await response.json();
    console.log('Respuesta completa de la API:', apiResponse);

    const tenantsList: any[] = apiResponse.payload || [];

    if (!Array.isArray(tenantsList)) {
      console.warn('El payload de la API no es un array. Asumiendo un tenant por defecto.');
      return ['default']; // Fallback si el payload no es una lista
    }

    // Extrae el campo '_id' de cada objeto RespTenant y filtra por `active: true`.
    // Tu JSON de ejemplo muestra '_id', 'name', 'domain', 'active'.
    const tenantIds = tenantsList
      .filter(tenant => tenant && typeof tenant._id === 'string' && tenant.active === true)
      .map(tenant => tenant._id);

    if (tenantIds.length === 0) {
      console.warn('La API devolvió una lista de tenants vacía o sin tenants activos. Usando un ID de tenant por defecto.');
      return ['default']; // Fallback si no se encontraron tenants activos
    }

    console.log(`IDs de tenants obtenidos para prerenderizado: ${tenantIds.join(', ')}`);
    return tenantIds;

  } catch (error) {
    console.error('ERROR CRÍTICO: No se pudieron obtener los IDs de tenants para prerenderizar.', error);
    console.warn('Usando un ID de tenant por defecto para la prerenderización debido a un error.');
    return ['default']; // Fallback con un tenant por defecto si la API falla
  }
}

/**
 * Función que proporciona los parámetros para rutas dinámicas durante la prerenderización.
 * Es llamada por el CLI de Angular para cada ruta prerenderizable que tiene parámetros.
 * @param route La plantilla de la ruta (ej. '/bussiness/:tenant').
 * @returns Un Promise que resuelve a un array de objetos, donde cada objeto
 *          contiene los parámetros para una instancia específica de la ruta.
 */


// =========================================================================
// ✨✨✨ FIN DEL CÓDIGO ACTUALIZADO ✨✨✨
// =========================================================================


const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;