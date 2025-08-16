import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule, NbAutocompleteModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';
import { Observable, debounceTime, switchMap, catchError, map } from 'rxjs';
import { EMPTY, of } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,NbAutocompleteModule,  NbSelectModule , NbLayoutModule,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})

export class SearchInputComponent<T extends { [key: string]: any }> {
  @Input() service: any;
  @Input() fieldName?: string;
  @Output() selectedItem = new EventEmitter<any>();
  searchControl = new FormControl('');
  selectedProveedor: any;
  filteredResults: any[] = []; // ✅ aseguramos que nunca sea null
  showDropdown = false;
  @Input() displayField: string = 'name'; // por defecto muestra item.name
  private _selectedValue: any;

  @Input()
  set selectedValue(value: any) {
    
    this._selectedValue = value;
    if (value && value[this.displayField]) {
      this.searchControl.setValue(value[this.displayField], { emitEvent: false });
    } else {
      this.searchControl.setValue('', { emitEvent: false });
    }
  }

  get selectedValue(): any {
    return this._selectedValue;
  }
  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.search(value || '')),  // ✅ prevenimos null
        catchError(() => of([]))
      )
      .subscribe(results => {
        this.filteredResults = results || [];
        this.showDropdown = this.filteredResults.length > 0;
      });
  }

  search(value: string): Observable<any[]> {
    if (this.service && this.fieldName) {
      const methodName = `find${this.capitalizeFirstLetter(this.fieldName)}`;
      if (typeof this.service[methodName] === 'function') {
        return this.service[methodName](value).pipe(
          map((res: ResponseBody) => res.payload || [])
        );
      }
    }
    return of([]);
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onSelect(item: any) {
    
    this.selectedProveedor = item;
    this.searchControl.setValue(item.name, { emitEvent: false });
    this.filteredResults = [];
    this.showDropdown = false;
    this.selectedItem.emit(item);
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 200);
  }

  onInputChange() {
    
    this.showDropdown = true;
  }
}
