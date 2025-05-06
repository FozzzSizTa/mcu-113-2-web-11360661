import { ProductService } from './../services/product.service';
import { Product } from './../models/product';
import { Component, inject, input, numberAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent implements OnInit {
  id = input.required<number, string | number>({ transform: numberAttribute });
  product!: Product;

  readonly router = inject(Router);

  private ProductService = inject(ProductService);

  ngOnInit(): void {
    this.product = this.ProductService.getById(this.id());
  }
  onEdit(): void {
    this.router.navigate(['product', 'from', this.product.id]);
  }
  onBack(): void {
    this.router.navigate(['products']);
  }
  onRemove(): void {
    this.ProductService.remove(this.product.id);
    this.router.navigate(['products']);
  }
}
