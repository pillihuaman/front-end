import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuidGenerator } from '../../../../../@data/model/general/guid-generator';
import { Parameter } from '../../../../../@data/model/general/parameter';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NbDialogModule,  NbButtonModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../../@common-components/table-datasource/table-datasource.component';
import { ValidationMessageComponent } from '../../../../@common-components/validation-message/validation-message.component';
import { RouterButtonComponent } from "../../../../@common-components/router-button/router-button.component";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
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
    RouterButtonComponent
],
})
export class ParametersComponent implements OnInit {
  timeFormControl:any
  event:any;
  myForm: FormGroup;
  btn: any;
  controlType: any;
  flag=false;
  cantidadForm:any;
  controlName:any;
  booleanContro:any=false;
  booleanControSelect:any=false;

 // hobbiesArray = new FormArray([new FormControl('', Validators.required)]);
  constructor(public fb: FormBuilder, private supportService: SupportRepository) {
    this.myForm =new FormGroup({
      parameterItems: new FormArray([
        new FormControl('')
      ]),
      id: new FormControl(''),
      name: new FormControl(''),
      idCode: new FormControl(''),
      description: new FormControl(''),
    });

    this.myForm.get('name')?.valueChanges.subscribe((newValue) => {
      this.updateIdCode(newValue);
    });


    
  }
  ngOnInit(): void {
    this.booleanControSelect=true;

   }
  get parameterItems(): FormArray {
    return this.myForm.get('parameterItems') as FormArray;
  }



  save() {

    let array=this.parameterItems.getRawValue();

    const control: Parameter = {
      description: this.myForm.get('description')?.value,
      idCode: this.myForm.get('idCode')?.value,
      name: this.myForm.get('name')?.value,
      parameterItems:array
    };
    this.supportService.saveParameter(control).subscribe(
      (value) => {
      //debuger;

       },
      (error) => { }
    );
    this.controlType = "text";
  }
  state(trues: any) {
    return trues;
  }
  createControl() {
    //debuger
    this.controlName = 'dynamicControl' + GuidGenerator.newGuid();
    const newControl = new FormControl('', Validators.required);
    this.myForm.addControl(this.controlName, newControl);
    this.cantidadForm=Object.keys(this.myForm.controls).length;
    console.log(this.cantidadForm);
  }
  addInputControl() {
    //debuger;
    this.controlName = 'dynamicControl' + GuidGenerator.newGuid();
    const newControl = new FormControl('', Validators.required);
    this.myForm.addControl(this.controlName, newControl);
    this.parameterItems.push(new FormControl('', Validators.required));
  }

  removeInputControl(idx: number) {
    //debuger;
    this.myForm;
    this.parameterItems.removeAt(idx);
  }
  disableControl(){

    this.myForm.get('name')?.disable();
    this.myForm.get('idCode')?.disable();
    this.myForm.get('description')?.disable();

  }
  clearControl(){
 
    this.myForm.get('name')?.enable();
    this.myForm.get('idCode')?.enable();
    this.myForm.get('description')?.enable();
  
    for (let index = 0; index <   this.parameterItems.length; index++) {
       if(index!=0){
      this.parameterItems.removeAt(index );
    }
      
    }
    this.myForm.reset();

  }
  onKeyUp(event:any){
    //debuger;
    this.booleanContro=true;
    this.booleanControSelect=false;
    return true;

  }
  updateIdCode(newValue: string) {
    this.myForm.get('idCode')?.setValue(newValue);
  }
}
