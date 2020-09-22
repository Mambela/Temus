import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLoaderComponent } from './side-loader.component';

describe('SideLoaderComponent', () => {
  let component: SideLoaderComponent;
  let fixture: ComponentFixture<SideLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
