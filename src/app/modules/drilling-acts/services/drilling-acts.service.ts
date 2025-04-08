import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Page} from "../../../shared/models/page.model";
import {PageRequest} from "../../../shared/models/pageRequest.model";

@Injectable({
  providedIn: 'root'
})
export class DrillingActsService {
  private baseUrl = 'http://localhost:8080/acts';

  constructor(private http: HttpClient) {}


  getAll<T>(endpoint: string, isActiveOnly: boolean): Observable<T[]> {
    let params = new HttpParams().set('isActiveOnly', isActiveOnly.toString());
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`, { params });
  }

  getByPage<T>(endpoint: string, pageRequest: PageRequest): Observable<Page<T>> {
    let params = new HttpParams()
      .set('page', pageRequest.page)
      .set('size', pageRequest.size);

    if (pageRequest.sort && pageRequest.sort.length > 0) {
      const sortParam = pageRequest.sort
        .map(s => `${s.field}:${s.direction}`)
        .join(',');
      params = params.set('sort', sortParam);
    }

    return this.http.get<Page<T>>(`${this.baseUrl}/${endpoint}/paged`, { params });
  }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  update<T>(endpoint: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
