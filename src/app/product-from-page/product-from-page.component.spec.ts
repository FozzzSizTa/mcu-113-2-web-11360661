import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFromPageComponent } from './product-from-page.component';

describe('ProductFromPageComponent', () => {
  let component: ProductFromPageComponent;
  let fixture: ComponentFixture<ProductFromPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFromPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFromPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
