import { NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';


export abstract class ModalRepository {
  abstract open(componentType: any): void;
  abstract showToast(status: NbComponentStatus, message: string, title: string): void;
  //open(componentType: any) {
}
