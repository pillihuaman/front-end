import { Features } from "../general/features";
import { Parameter } from "../general/parameter";
import { Size } from "./size";

export interface DetailStock {
    size?:Size,
    parameter?:Parameter,
    features?:Features;

}


