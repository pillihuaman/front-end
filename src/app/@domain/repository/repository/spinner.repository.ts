import { NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';


export abstract class SpinnerRepository {
  abstract show(): void;
  abstract hide(): void;
}
