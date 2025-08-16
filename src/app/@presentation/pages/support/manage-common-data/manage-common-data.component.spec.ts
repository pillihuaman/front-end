import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommonDataComponent } from './manage-common-data.component';

describe('ManageCommonDataComponent', () => {
  let component: ManageCommonDataComponent;
  let fixture: ComponentFixture<ManageCommonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCommonDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCommonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
