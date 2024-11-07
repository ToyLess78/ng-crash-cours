import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {

    // Simulate a random error 500 (for example, in 50% of cases)
    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      return throwError(() => ({ status: 500, message: 'Internal Server Error' })).pipe(
        delay(1000)
      );
    }

    // Real request if no error occurred
    return  this.http.get<Product[]>('https://fakestoreapi.com/products', {
      // First params variant:
      // params: new HttpParams().append('limit', 5)

      // Second params variant:
      // params: new HttpParams({
      //   fromString: 'limit=5'
      // })

      // Third params variant:
      params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      delay(2000)
    )
  }
}
