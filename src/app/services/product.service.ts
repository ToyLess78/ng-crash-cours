import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { delay, Observable, retry, throwError } from 'rxjs';
import { Product } from '../models/product';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getAll(): Observable<Product[]> {
    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      return throwError(() => ({ status: 500, message: 'Internal Server Error' })).pipe(
        delay(1000),
        catchError(this.errorHandler.bind(this))
      );
    }

    // Real request if no error occurred
    return this.http.get<Product[]>('https://fakestoreapi.com/products', {
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
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message, error.status);
    return throwError(() => error.message);
  }
}
