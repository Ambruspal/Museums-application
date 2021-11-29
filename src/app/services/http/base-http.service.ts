import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService<E> {
  baseUrl: string = environment.apiUrl;
  entity: string = '';

  constructor(public http: HttpClient) {}

  getAll(query: any = {}): Observable<E[]> {
    let queryString = '';
    if (query !== {}) {
      queryString = '?';
      for (const key in query) {
        if (query[key]) {
          queryString += `${key}=${query[key]}&`;
        }
      }
    }
    return this.http
      .get<E[]>(`${this.baseUrl}${this.entity}${queryString}`)
      .pipe(catchError(this.handleError));
  }

  getById(id: string): Observable<E> {
    return this.http
      .get<E>(`${this.baseUrl}${this.entity}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(newEntity: E): Observable<E> {
    return this.http
      .post<E>(`${this.baseUrl}${this.entity}`, newEntity)
      .pipe(catchError(this.handleError));
  }

  updateById(updatedEntity: E, id: string): Observable<E> {
    return this.http
      .put<E>(`${this.baseUrl}${this.entity}/${id}`, updatedEntity)
      .pipe(catchError(this.handleError));
  }

  deleteById(id: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}${this.entity}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('server error:', error);
    // if (error instanceof Error) {
    //   const errMessage = error.message;
    //   // return throwError(new Error(errMessage));
    //   return throwError(new Error(
    //     error.error ? error.error[0]['errorMessage'] || 'server error'
    //     ));
    // }
    return throwError(new Error(error.error[0]['errorMessage'] || 'server error'));
  }
}
