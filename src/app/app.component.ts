import { products as data } from './data/products';
import { Product } from './models/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng crash course';
  products: Product[] = data;
}
