import { Observable } from 'rxjs';
import { User } from '../../../@data/model/User/user';
/* import { User } from "../../@data/model/user";
import { Observable } from "rxjs";
import { RegistroPostulante } from '../models/registro.postulante';
import { ComboitemModel } from '../models/comboitem.model';
import { Convdept } from '../../@data/model/home/convdept';
import { EntidadOferta } from '../../@data/model/home/entidadoferta';
import { Ubigeo } from '../../@data/model/ubigeo';
import { Convocatoria } from '../../@data/model/convocatoria/convocatoria'; */



export abstract class AuthenticationRepository {
  abstract get getCurrentUserValue(): User | null;
  abstract clearUser(): void;
  abstract login(login: string, clave: string): Observable<any>;
 abstract  getGuestToken(): Observable<any> 
  abstract logout(): void 
  /* 
    abstract get getCurrentUserValue(): User;
    abstract login(login: string, clave: string): Observable<any>;
    abstract logout(): void;
    abstract singup(data: RegistroPostulante): Observable<Boolean>;
    abstract forgotPassword(numeroDocumento: string): Observable<any>;
    abstract changePassword(password: string, newPassword: string): Observable<any>;
    abstract clearUser();
    abstract listaPaises(): Observable<ComboitemModel[]>;
    abstract listarTipoDocumentos(request: any): Observable<ComboitemModel[]>;
    abstract getRegimenesServir(): Observable<ComboitemModel[]>;
    abstract getConvocatorioPorPais(): Observable<Convdept[]>;
    abstract getEntidadConv(): Observable<EntidadOferta[]>;
    abstract getDepartamento(): Observable<Ubigeo[]>;
    abstract getEstadoOportunidad(): Observable<ComboitemModel[]>;
    abstract getNivelEducativo(): Observable<ComboitemModel[]>;
    abstract getCarreras(): Observable<ComboitemModel[]>;
    abstract getEntidades(): Observable<ComboitemModel[]>;
    abstract obtenerConvocatorias(filtros: any): Observable<Convocatoria[]>;
    abstract setFavoritos(idConvocatoria: string): Observable<boolean>;
    abstract removeFavoritos(idConvocatoria: string): Observable<boolean>;
    abstract obtenerPDF(idBase: number): Observable<string>; */
}
