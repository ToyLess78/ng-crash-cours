import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'ng crash course';
  loading: boolean;
  term: '';

  constructor(
    public productsService: ProductService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loading = true;
     this.productsService.getAll().subscribe(
      () => this.loading = false
    );
  }
}
