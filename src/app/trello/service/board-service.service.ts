import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  apiUrl = environment.api + 'board';

  constructor(private http: HttpClient) {
  }

  findByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  save(userId: number, board: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}`, board);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addUserToBoard(id: number, userId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addUserToBoard/${id}?userId=${userId}`, userId);
  }

  exportExcel(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/export/excel/${id}`, { responseType: 'blob' as 'json'});
  }
}
