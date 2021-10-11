import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  apiUrl = environment.api + 'notify';

  constructor(private http: HttpClient) {
  }

  getBo(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDto(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dto/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

//  thong bao khi them thanh vien vao bang

  notifyAddUserToBoard(model: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addUserToBoard`, model);
  }
}
