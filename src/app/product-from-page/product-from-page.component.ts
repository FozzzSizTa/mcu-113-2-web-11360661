import { productResolver } from './../resolver/product.resolver';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Product } from '../models/product';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-from-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './product-from-page.component.html',
  styleUrl: './product-from-page.component.scss',
})
export class ProductFromPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null),
    authors: new FormArray<FormControl<string | null>>([]),
    company: new FormControl<string | null>(null),
    price: new FormControl<number | null>(null),
  });

  product!: Product;

  get authors(): FormArray<FormControl<string | null>> {
    return this.form.get('authors') as FormArray<FormControl<string | null>>;
  }

  ngOnInit(): void {
    this.route.data.pipe(map(({ product }: Data) => product)).subscribe((product) => (this.product = product));
  }

  onAddAuthor(): void {
    const formControl = new FormControl<string | null>(null);
    this.authors.push(formControl);
  }
}
