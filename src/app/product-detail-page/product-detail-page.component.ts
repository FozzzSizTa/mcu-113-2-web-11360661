import { Product } from './../models/product';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  product = new Product({
    id: 10,
    name: '書籍 J',
    authors: ['作者甲', '作者乙', '作者丙'],
    company: '碩博文化',
    isShow: true,
    photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    createDate: new Date('2025/4/9'),
    price: 10000,
  });

  readonly router = inject(Router);
  onEdit(): void {
    this.router.navigate(['product', 'from', this.product.id]);
  }
  onBack(): void {
    this.router.navigate(['products']);
  }
}
