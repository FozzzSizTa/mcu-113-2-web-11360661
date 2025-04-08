import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  ProductName = '書籍 A';
  author = '作者甲、作者乙、作者丙';
  company = '碩博文化';

  isShow = true;
  onSetDisplay(isShow: boolean): void {
    this.isShow = isShow;
  }
}
