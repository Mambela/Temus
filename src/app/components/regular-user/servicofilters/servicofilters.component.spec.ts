import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicofiltersComponent } from './servicofilters.component';

describe('ServicofiltersComponent', () => {
  let component: ServicofiltersComponent;
  let fixture: ComponentFixture<ServicofiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicofiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicofiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
