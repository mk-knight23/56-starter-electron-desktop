import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad request: ' + error.message;
              break;
            case 401:
              errorMessage = 'Unauthorized: Please login again';
              break;
            case 403:
              errorMessage = 'Forbidden: You don\'t have permission';
              break;
            case 404:
              errorMessage = 'Not found: The requested resource was not found';
              break;
            case 500:
              errorMessage = 'Server error: Please try again later';
              break;
            default:
              errorMessage = `Error: ${error.status} - ${error.message}`;
          }
        }

        // Show error in console
        console.error('HTTP Error:', error);

        // You could also show a toast notification or modal here
        // this.dialog.open(ErrorDialogComponent, { data: { message: errorMessage } });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}