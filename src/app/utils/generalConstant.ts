import { ModalModel } from '../@data/model/User/modalModel';

export class GeneralConstans {
  public static tipoImagenCatalog: string = "CATALOG";
    public static productionCostSublimadoTeamFutbol: string = "PRODUCTION_COSTS_SUBLIMADO_TEAM_FUTBOL";
  public static successCode: number = 1;
  public static errorCode: number = 2;
  public static warningCode: number = 3;
  public static successMessage: string = 'Success !';
  public static errorMessage: string = 'Error !';
  public static warningMessage: string = 'Warning !';
  public static lazyLoad: boolean = false;
  public static page: number = 0;
  public static perPage: number = 500;
  public static perPageTodefault: number = 50;
  public static maxPerPage: number = 2;
  public static typeSearchEspecific: String = 'ESPECIFIC';
  public static typeSearchDefault: String = 'DEFAULT';
  public static typeSearchbynputEvent: String = 'ALLINPUTCLEAN';
  public static pageSizeTable: number = 50;
  public static currentPageTable: number = 1;
    public static commonConstant: String = 'default';
  public static datamodelError: ModalModel = {
    code: GeneralConstans.errorCode,
    message: GeneralConstans.errorMessage,
    lazyLoad: false,
  };
  public static datamodelSucess: ModalModel = {
    code: GeneralConstans.successCode,
    message: GeneralConstans.successMessage,
    lazyLoad: false,
  };
  public static lazyLoadmodel: ModalModel = {
    lazyLoad: true,
  };
}
