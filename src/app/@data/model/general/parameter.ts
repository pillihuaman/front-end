import { MatCardSmImage } from "@angular/material/card";
import { pseudoRandomBytes } from "crypto";

export interface Parameter {
  id?: string;
  idCode?: string;
  name?: string;
  description?: string;
  parameterItems?:any[];
}
