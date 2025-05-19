import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Router, provideRouter } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { BehaviorSubject, combineLatest, count, merge, startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private router = inject(Router);

  private ProductService = inject(ProductService);

  private readonly pageIndex$ = new BehaviorSubject(1);
  get pageIndex() {
    return this.pageIndex$.value;
  }
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }
  private readonly refresh$ = new Subject<void>();
  pageSize = 5;
  private readonly data$ = combineLatest([this.pageIndex$, this.refresh$.pipe(startWith(undefined))]).pipe(
    switchMap(() => this.ProductService.getList(undefined, this.pageIndex, this.pageSize))
  );
  private readonly data = toSignal(this.data$, { initialValue: { data: [], count: 0 } });

  readonly totalCount = computed(() => {
    const { count } = this.data();
    return count;
  });
  readonly products = computed(() => {
    const { data } = this.data();
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
    this.ProductService.add(product).subscribe(() => this.refresh$.next());
  }

  onRemove({ id }: Product): void {
    this.ProductService.remove(id).subscribe(() => {
      this.pageIndex = 1;
    });
  }
}
