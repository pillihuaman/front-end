import { Status } from './status';
import { Trace } from './trace';

export interface RequestBody {
  trace?: Trace;
  Status?: Status;
  data?: any;
}
