import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableDatasourceCustomComponent } from './app-table-datasource-custom.component';

describe('AppTableDatasourceCustomComponent', () => {
  let component: AppTableDatasourceCustomComponent;
  let fixture: ComponentFixture<AppTableDatasourceCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTableDatasourceCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTableDatasourceCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
