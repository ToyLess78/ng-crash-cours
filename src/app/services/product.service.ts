import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { delay, Observable, retry, throwError } from 'rxjs';
import { Product } from '../models/product';
import { ErrorService } from './error.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  products: Product[] =[]

  getAll(): Observable<Product[]> {
    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      return throwError(() => ({ status: 500, message: 'Internal Server Error' })).pipe(
        delay(1000),
        catchError(this.errorHandler.bind(this))
      );
    }

    // Real request if no error occurred
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, {
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
      delay(1000),
      retry(2),
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
    );
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product)
      .pipe(
      tap(product => this.products.push(product))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message, error.status);
    return throwError(() => error.message);
  }
}
