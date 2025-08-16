import { Observable } from "rxjs";
import { TreeNode } from "../@data/model/general/treeNode";

export abstract class BaseRepository{
  
      abstract customizePropertyNames(data: any[], columnNamesMapping: { [key: string]: string }): TreeNode<any>[] ;
      abstract onPageChange(number:any):void;
      abstract  onPageSizeChange(pageSize: number): void ;
      abstract  findByparameter() : void ;
      abstract   findByDefualt():void;
      abstract closeDialog(): void;
      abstract handleEscKey(event: KeyboardEvent): void;
      
    }
  

    
