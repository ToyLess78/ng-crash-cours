import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  handle(message: string, status?: number) {
    const errorMessage = status === 500 ? 'The site is under maintenance. Please try again later.' : message;
    this.errorSubject.next(errorMessage);
  }

  clear() {
    this.errorSubject.next(null);
  }
}
