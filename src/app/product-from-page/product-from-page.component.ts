import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { map, tap } from 'rxjs';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-from-page',
  templateUrl: './product-from-page.component.html',
  styleUrl: './product-from-page.component.scss',
  imports: [JsonPipe, ReactiveFormsModule],
})
export class ProductFromPageComponent implements OnInit {
  // Inject Angular services
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  constructor(private http: HttpClient) {}

  // Reactive Form
  form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    authors: new FormArray<FormControl<string | null>>([]),
    company: new FormControl<string | null>(null, { validators: [Validators.required] }),
    price: new FormControl<number | null>(null, { validators: [Validators.required] }),
    isShow: new FormControl<boolean>(true, { nonNullable: true }),
  });

  product!: Product;
  get id() {
    return this.form.get('id') as FormControl<number | null>;
  }
  get name() {
    return this.form.get('name') as FormControl<string | null>;
  }

  get authors() {
    return this.form.get('authors') as FormArray<FormControl<string | null>>;
  }

  get company() {
    return this.form.get('company') as FormControl<string | null>;
  }

  get price() {
    return this.form.get('price') as FormControl<number | null>;
  }

  get isShow() {
    return this.form.get('isShow') as FormControl<boolean>;
  }

  // Load resolved product data if needed
  ngOnInit(): void {
    this.route.data
      .pipe(map(({ product }: Data) => product))
      .pipe(tap(({ authors }) => this.onAddAuthor(authors.length)))
      .subscribe((product) => this.form.patchValue(product));
  }

  // Add new author input
  onAddAuthor(length = 1): void {
    for (let i = 1; i <= length; i++) {
      const control = new FormControl<string | null>(null, { validators: [Validators.required] });
      this.authors.push(control);
    }
  }

  // Cancel and return to product list
  onCancel(): void {
    this.router.navigate(['products']);
  }

  // Save new product, generate ID from local static db.json
  onSave(): void {
    this.http.get<any>('/assets/db.json').subscribe((dbData) => {
      const products = dbData.products as Product[];
      const maxId = products.reduce((max, p) => Math.max(max, +p.id), 0);
      const newId = maxId + 1;
      const formData = new Product({
        id: this.id.value ? +this.id.value : newId,
        name: this.name.value!,
        authors: this.authors.value.map((author) => author!),
        company: this.company.value!,
        isShow: this.isShow.value,
        photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
        createDate: new Date(),
        price: +(this.price.value || '0'),
      });
      const action$ = this.id.value ? this.productService.update(formData) : this.productService.add(formData);
      action$.subscribe(() => {
        this.router.navigate(['products']);
      });
    });
  }
}
