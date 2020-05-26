import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCliente } from './cliente-formulario';

describe('FormularioCliente', () => {
  let component: FormularioCliente;
  let fixture: ComponentFixture<FormularioCliente>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCliente ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
