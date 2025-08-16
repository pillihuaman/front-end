import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatasourceCustomComponent } from './table-datasource-custom.component';

describe('TableDatasourceCustomComponent', () => {
  let component: TableDatasourceCustomComponent;
  let fixture: ComponentFixture<TableDatasourceCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDatasourceCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDatasourceCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
