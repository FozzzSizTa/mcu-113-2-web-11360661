import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductFromPageComponent } from './product-from-page/product-from-page.component';
import { productResolver } from './resolver/product.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'product/new', component: ProductFromPageComponent },
  { path: 'product/view/:id', component: ProductDetailPageComponent, resolve: { product: productResolver } },
  { path: 'product/from/:id', component: ProductFromPageComponent, resolve: { product: productResolver } },
  { path: 'login', component: LoginPageComponent },
];
