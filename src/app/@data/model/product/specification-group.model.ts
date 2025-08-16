import { SpecificationAttribute } from './specification-attribute.model';

export interface SpecificationGroup {
  groupName: string;
  attributes: SpecificationAttribute[];
}