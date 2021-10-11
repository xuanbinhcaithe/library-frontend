import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  apiUrl = environment.api + 'work';

  constructor(private http: HttpClient) {
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDTOById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workDTO/${id}`);
  }

  save(work: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, work);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getByCardId(cardId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cardId/${cardId}`);
  }
}
