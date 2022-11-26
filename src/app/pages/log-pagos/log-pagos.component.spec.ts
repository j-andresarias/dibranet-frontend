import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPagosComponent } from './log-pagos.component';

describe('LogPagosComponent', () => {
  let component: LogPagosComponent;
  let fixture: ComponentFixture<LogPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
