import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFornecedor } from './cadastro-forn.component';

describe('FormularioFornecedor', () => {
  let component: FormularioFornecedor;
  let fixture: ComponentFixture<FormularioFornecedor>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioFornecedor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFornecedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
