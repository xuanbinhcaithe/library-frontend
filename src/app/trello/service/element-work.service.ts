import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementWorkService {
  apiUrl = environment.api + 'elementWork';

  constructor(private http: HttpClient) {
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDTOById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dto/${id}`);
  }

  save(eWork: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, eWork);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  convertToCard(tabId: any, userId: any, elementWorkId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/convertToCard?tabId=${tabId}&userId=${userId}&elementWorkId=${elementWorkId}`, name);
  }
}
