import { ImagenDetail } from './imagenDetail';
import { ImagenTempFile } from './imagenTemFile';

export interface ImagenTemp {
  file?: File;
  name?: string;
  uniqueKeyHash?: string;
  count?: number;
  idProduct?: number;
  description?: string;
  listImagen?: ImagenDetail[];
}
