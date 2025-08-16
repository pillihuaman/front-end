import { Status } from './status';
import { Trace } from './trace';

export interface ResponseBody {
  trace?: Trace;
  status?: Status;
  payload?: any;
}
