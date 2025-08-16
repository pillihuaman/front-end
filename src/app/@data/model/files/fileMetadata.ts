import { SizeStock } from "../product/sizeStock";


export interface FileMetadata {
    id?: string;
    filename: string;
    s3Key?: string;
    contentType: string;
    size: number;
    hashCode?: string;
    dimension: string;
    userId: string;
    uploadTimestamp?: number;
    status?: boolean;
    order?:number
    typeFile?:string
    url?:string,
    position?: string;
    productId?: string; 
   sizeStock?:  SizeStock[] ;

}

  
  