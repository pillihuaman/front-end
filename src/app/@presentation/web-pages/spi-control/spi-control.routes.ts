import { Routes } from '@angular/router';
import { SpiControlComponent } from './spi-control.component';

// Importamos los nuevos componentes que acabamos de crear
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { SpiComponent } from './spi/spi.component';
import { ProductosAutomatizacionComponent } from './productos-automatizacion/productos-automatizacion.component';
import { ProductosInstrumentacionComponent } from './productos-instrumentacion/productos-instrumentacion.component';
import { ContactComponent } from './contact/contact.component';

export const SPI_CONTROL_ROUTES: Routes = [
  {
    // La ruta padre ('/spi-control') renderizará nuestro Layout
    path: '',
    component: SpiControlComponent,
    // Aquí definimos las rutas hijas que se cargarán en el <router-outlet>
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'spi', component: SpiComponent },
      { path: 'servicios', component: ServicesComponent },
       //{ path: 'producto-automatizacíon', component: ProductosAutomatizacionComponent },
       { path: 'producto-automatizacion', component: ProductosAutomatizacionComponent },
      { path: 'producto-instrumentacion', component: ProductosInstrumentacionComponent },
        { path: 'contactos', component: ContactComponent },
      // Redirige la ruta vacía (ej. /spi-control) a la página de inicio
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];