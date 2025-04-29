import { Product } from '../models/product';
import { Component, input, output } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-product-card-list',
  imports: [PaginationComponent, ProductCardComponent],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss',
})
export class ProductCardListComponent {
  readonly products = input<Product[]>([]);
  readonly view = output<Product>();

  readonly edit = output<Product>();
  readonly remove = output<Product>();
  pageIndex = 1;
}
