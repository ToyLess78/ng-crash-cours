import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  loaderItems = [
    { left: '0px', delay: '0ms' },
    { left: '12px', delay: '200ms' },
    { left: '24px', delay: '400ms' },
    { left: '36px', delay: '600ms' },
    { left: '48px', delay: '800ms' },
  ];
  constructor(public errorService: ErrorService) {
  }
  ngOnInit(): void {
  }
}
