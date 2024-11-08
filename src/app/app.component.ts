import { Product } from './models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'ng crash course';
  products$: Observable<Product[]>;
  loading: boolean;
  term: '';

  constructor(
    private productsService: ProductService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.products$ = this.productsService.getAll().pipe(
      tap(() => this.loading = false)
    );
  }
}
