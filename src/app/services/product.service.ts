import { delay, map, Observable } from 'rxjs';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api/products'; // 根據 proxy 設定調整
  constructor(private http: HttpClient) {}

  getById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    // 依 json-server 支援的查詢參數調整
    let params: any = { _page: index, _limit: size };
    if (name) params.name = name;
    return this.http.get<Product[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      delay(500),
      // 取得總數與分頁資料
      map((resp) => ({
        data: resp.body || [],
        count: +(resp.headers.get('X-Total-Count') || '0'),
      }))
    );
  }

  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  remove(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
