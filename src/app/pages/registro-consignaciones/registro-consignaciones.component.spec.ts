import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConsignacionesComponent } from './registro-consignaciones.component';

describe('RegistroConsignacionesComponent', () => {
  let component: RegistroConsignacionesComponent;
  let fixture: ComponentFixture<RegistroConsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroConsignacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroConsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
