import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductServiceComponent } from './add-new-product-service.component';

describe('AddNewProductServiceComponent', () => {
  let component: AddNewProductServiceComponent;
  let fixture: ComponentFixture<AddNewProductServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProductServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProductServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
