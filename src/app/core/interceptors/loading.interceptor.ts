import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add loading state here if you have a loading service
    console.log('Loading started:', request.url);

    return next.handle(request).pipe(
      tap({
        next: () => console.log('Loading completed:', request.url),
        error: () => console.log('Loading failed:', request.url)
      })
    );
  }
}