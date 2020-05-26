import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFornecedorComponent } from './home-fornecedor.component';

describe('HomeFornecedorComponent', () => {
  let component: HomeFornecedorComponent;
  let fixture: ComponentFixture<HomeFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
