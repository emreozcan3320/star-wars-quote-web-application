import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Quote} from '../models/quote.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  private static handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nMessage Detail:${error.error.message}`;
    }
    return throwError(errorMessage);
  }

  public getAllQuotes(): Observable<Array<Quote>> {
    return this.http.get<Array<Quote>>(`${this.apiUrl}/quotes`).pipe(catchError(QuoteService.handleError));
  }

  public saveQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.apiUrl}/quotes`, quote).pipe(catchError(QuoteService.handleError));
  }

  public updateQuote(quoteId: number, quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.apiUrl}/quotes/${quoteId}`, quote).pipe(catchError(QuoteService.handleError));
  }

  public delete(quoteId: number): Observable<Quote> {
    return this.http.delete<Quote>(`${this.apiUrl}/quotes/${quoteId}`).pipe(catchError(QuoteService.handleError));
  }
}


