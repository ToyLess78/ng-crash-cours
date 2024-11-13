import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent {
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
