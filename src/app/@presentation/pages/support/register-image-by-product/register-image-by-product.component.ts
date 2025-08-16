import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Imagen } from '../../../../@data/model/imagen/imagen';
import { ImagenDetail } from '../../../../@data/model/imagen/imagenDetail';
import { ImagenTempFile } from '../../../../@data/model/imagen/imagenTemFile';
import { ImagenTemp } from '../../../../@data/model/imagen/imagenTemp';
import { Product } from '../../../../@data/model/product/product';
import { ImagenTempService } from '../../../../@data/services/imagenTemp.service';
import { AuthenticationRepository } from '../../../../@domain/repository/repository/authentication.repository';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NbDialogModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { RouterButtonComponent } from '../../../@common-components/router-button/router-button.component';

@Component({
  selector: 'app-register-image-by-product',
  templateUrl: './register-image-by-product.component.html',
  styleUrls: ['./register-image-by-product.component.scss'],  
    standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        NbDialogModule,
        RouterModule,

        NbButtonModule,

        NbCardModule,
        NbInputModule,
        NbIconModule,
        NebularSharedModule,
        ReactiveFormsModule,
        FormsModule,
        
    ],
})
export class RegisterImageByProductComponent implements OnInit {
  listProductByUser?: Product[] = [];
  listImagenTemp?: Imagen[] = [
    {
      urlImagen:
        'http://localhost:8087/v1/imagen/getImagen?codImagen=6342acc01413e6298e29ef98',
    },
  ];
  idTempUnique: string =""
  imagenTem?: any;
  uuidValue?: any;
  count?: any = 0;
  base64File?: String;
  selectImagen?: File;
  filePath1?: String;
  filePath2?: String;
  filePath3?: String;
  filePath4?: String;
  img1?: ImagenDetail;
  img2?: ImagenDetail;
  img3?: ImagenDetail;
  img4?: ImagenDetail;
  myForm: FormGroup;
  lstfilePath?: ImagenDetail[] = [];
  idProductSelect: any;
  @ViewChild('inputFile') inputFile: ElementRef = {} as ElementRef;
  constructor(
    private imagenTempService: ImagenTempService,
    public fb: FormBuilder,
    private authenticationService: AuthenticationRepository
  ) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
      name: [''],
      description: [''],
      idProduct: [''],
    });
  }
  ngOnInit(): void {
    const currentUser = this.authenticationService.getCurrentUserValue;
    
    if (!currentUser?.rolId) {
      console.error('No user is logged in.');
      return;
    }
  
    const prod: Product = { idHeadImagen: currentUser.rolId };
  
    this.imagenTempService.listProdutByUser(prod).subscribe(response => {
      this.listProductByUser = response.payload;
    });
  }
  loadFile(event: any) {
    // //debuger;
    this.count++;
    const file: File[] = event.target.files;
    this.selectImagen = event.target.files[0];
    let imaFile: ImagenTempFile = { file: this.selectImagen };
    this.myForm?.patchValue({
      img: file,
    });
    this.myForm?.get('img')?.updateValueAndValidity();
    if (this.filePath1 === undefined) {
      const readers = new FileReader();
      readers.onload = () => {
        ////debuger;
        this.filePath1 = readers.result as string;
        this.img1 = {
          name: this.selectImagen?.name,
          value: this.filePath1,
          index: 0,
        };
      };
      readers.readAsDataURL(this.selectImagen!);
    } else if (this.filePath2 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        ////debuger;
        this.filePath2 = readers1.result as string;
        this.img2 = {
          name: this.selectImagen?.name,
          value: this.filePath2,
          index: 1,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    } else if (this.filePath3 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        ////debuger;
        this.filePath3 = readers1.result as string;
        this.img3 = {
          name: this.selectImagen?.name,
          value: this.filePath3,
          index: 2,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    } else if (this.filePath4 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        ////debuger;
        this.filePath4 = readers1.result as string;
        this.img4 = {
          name: this.selectImagen?.name,
          value: this.filePath4,
          index: 3,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    }
  }
  close(close: any) {
    ////debuger;
    if (close === 1) {
      this.filePath1 = undefined;
    } else if (close === 2) {
      this.filePath2 = undefined;
    }
    if (close === 3) {
      this.filePath3 = undefined;
    }
    if (close === 4) {
      this.filePath4 = undefined;
    }
    this.inputFile.nativeElement.value = null;
  }
  save() {
    ////debuger;
    this.lstfilePath = [];
    if (this.filePath1 && this.filePath1 !== '') {
      this.lstfilePath?.push(this.img1!);
      console.log(this.img1);
    }
    if (this.filePath2 && this.filePath2 !== '') {
      this.lstfilePath?.push(this.img2!);
    }
    if (this.filePath3 && this.filePath3 !== '') {
      this.lstfilePath?.push(this.img3!);
    }
    if (this.filePath4 && this.filePath4 !== '') {
      this.lstfilePath?.push(this.img4!);
    }

    if (this.lstfilePath && this.lstfilePath.length > 0) {
      ////debuger;
      let imageTem: ImagenTemp = {
        count: this.count,
        name: this.myForm.get('name')?.value,
        description: this.myForm.get('description')?.value,
        uniqueKeyHash:'',// UUID.UUID(),
        idProduct: this.idProductSelect,
        listImagen: this.lstfilePath,
      };
      //debuger;

      this.imagenTempService.registerImagenTemp(imageTem).subscribe(
        (value) => {},
        (error) => {}
      );
    }
  }
  changeProduct(values: any) {
    this.idProductSelect = values;
  }
}
