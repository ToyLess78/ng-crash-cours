import { Product } from './models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng crash course';
  products$: Observable<Product[]>;
  loading: boolean;
  errorStatus: number | null = null;

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.products$ = this.productsService.getAll().pipe(
      tap(() => this.loading = false),
      catchError(error => {
        if (error.status === 500) {
          this.errorStatus = 500;
        }
        return of([]);
      })
    );
  }
}
