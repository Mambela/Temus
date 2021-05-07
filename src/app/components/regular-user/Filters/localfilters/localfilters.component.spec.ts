import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalfiltersComponent } from './localfilters.component';

describe('LocalfiltersComponent', () => {
  let component: LocalfiltersComponent;
  let fixture: ComponentFixture<LocalfiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalfiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
