import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiComponent } from './spi.component';

describe('SpiComponent', () => {
  let component: SpiComponent;
  let fixture: ComponentFixture<SpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
