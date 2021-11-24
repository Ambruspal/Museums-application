import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<E[]>(`${this.baseUrl}${this.entity}${queryString}`);
  }

  getById(id: string): Observable<E> {
    return this.http.get<E>(`${this.baseUrl}${this.entity}/${id}`);
  }

  create(newEntity: E): Observable<E> {
    return this.http.post<E>(`${this.baseUrl}${this.entity}`, newEntity);
  }

  updateById(updatedEntity: E, id: string): Observable<E> {
    return this.http.put<E>(
      `${this.baseUrl}${this.entity}/${id}`,
      updatedEntity
    );
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.entity}/${id}`);
  }
}
