import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Router, provideRouter } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { BehaviorSubject, combineLatest, count, merge, single, startWith, Subject, switchMap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private router = inject(Router);

  private productService = inject(ProductService);

  readonly pageIndex = signal(1);
  readonly pageSize = signal(5);

  private readonly data = rxResource({
    request: () => ({ pageIndex: this.pageIndex(), pageSize: this.pageSize() }),
    defaultValue: { data: [], count: 0 },
    loader: ({ request }) => {
      const { pageIndex, pageSize } = request;
      return this.productService.getList(undefined, pageIndex, pageSize);
    },
  });

  readonly totalCount = computed(() => {
    const { count } = this.data.value();
    return count;
  });
  readonly products = computed(() => {
    const { data } = this.data.value();
    return data;
  });

  /*
  ngOnInit(): void {
    combineLatest([this.pageIndex$, this.refresh$.pipe(startWith(undefined))])
      .pipe(switchMap(() => this.ProductService.getList(undefined, this.pageIndex, this.pageSize)))
      .subscribe(({ data, count }) => {
        this.products = data;
        this.totalCount = count;
      });
  }
  */
  onEdit(product: Product) {
    this.router.navigate(['product', 'from', product.id]);
  }
  onView(product: Product) {
    this.router.navigate(['product', 'view', product.id]);
  }

  onAdd(): void {
    const product = new Product({
      id: 11,
      name: '書籍 Z',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '碩博文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    });
    this.productService.add(product).subscribe(() => this.data.reload());
  }

  onRemove({ id }: Product): void {
    this.productService.remove(id).subscribe(() => this.pageIndex.set(1));
  }
}
