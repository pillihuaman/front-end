import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Const {
  public static USERNAME_SEGURIDAD: string;
  public static PASSWORD_SEGURIDAD: string;
  public static ACCEPT_COOKIE: string = 'ACCEPT_COOKIE';
  public static API_SEGURIDAD: string;
  public static API_SUPPORT: any;
  public static API_INTELLIGENCY_ARTIFICIAL: any;
  public static API_SEARCH: string;
  public static API_IMAGEN: string;
  public static URL_TYPE_ACCES_PRIVATE: any;
  public static URL_TYPE_ACCES_PUBLIC: any;
  public static URL_TYPE_ACCES_IMG_AWS: any;
  public static KEY = '@@@@@dddd....dont be evil.....';
  public static API_FILE_IA: any;
  public static IDPRODUCT: any;
  public static IDUSUARIO: any;

  constructor(private http: HttpClient) {}

  /** Carga la configuración común desde `common.config.json` */
  public async loadCommonConfig(): Promise<void> {
    console.log('[APP_INITIALIZER] Inicio de loadCommonConfig');

    try {
      const config: any = await lastValueFrom(
        this.http.get('./assets/config/common.config.pro.json')
      );

      console.log('[APP_INITIALIZER] Config cargado:', config);

      Const.API_SEGURIDAD = config.public_base_url_seguridad;
      Const.API_SUPPORT = config.public_base_url_support;
      Const.API_SEARCH = config.public_base_url_search;
      Const.URL_TYPE_ACCES_PUBLIC = config.acces_public;
      Const.URL_TYPE_ACCES_PRIVATE = config.acces_private;
      Const.API_IMAGEN = config.public_base_url_imagen;
      Const.API_INTELLIGENCY_ARTIFICIAL = config.public_base_url_file_IA;
      Const.URL_TYPE_ACCES_IMG_AWS = config.public_access_catalogo_img_aws;
      Const.IDPRODUCT = config.idProducto;
      Const.IDUSUARIO = config.idUsuario;

      console.log('[APP_INITIALIZER] Configuración común aplicada correctamente.');
    } catch (error) {
      console.error('[APP_INITIALIZER] Error al cargar configuración común:', error);
    }
  }

  /** Carga la configuración de entidad desde `pillihuaman-web.config.json` */
  public async loadEntidadConfig(): Promise<void> {
    console.log('[APP_INITIALIZER] Inicio de loadEntidadConfig');

    try {
      const config: any = await lastValueFrom(
        this.http.get('./assets/config/pillihuaman-web.config.json')
      );

      console.log('[APP_INITIALIZER] Config entidad cargada:', config);

      Const.USERNAME_SEGURIDAD = config.client_id;
      Const.PASSWORD_SEGURIDAD = config.client_secret;
    } catch (error) {
      console.error('[APP_INITIALIZER] Error al cargar configuración de entidad:', error);
    }
  }
}
