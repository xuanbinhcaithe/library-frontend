import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = environment.api + 'card';

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  saveCard(formCard: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formCard);
  }

  changeOrderInlist(lstId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orderInTab`, lstId);
  }

  changeOrderInOtherList(tabId: number, lstId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orderOtherTab/${tabId}`, lstId);
  }

  moveCard(tabId: any, cardId: any, order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/moveCard?tabId=${tabId}&cardId=${cardId}&order=${order}`, cardId);
  }

  changeName(id: any, name: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/changeName/${id}?name=${name}`, name);
  }

  changeDes(id: any, description: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/changeDes/${id}?description=${description}`, id);
  }

  inviteUser(id: any, userId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inviteUser/${id}?userId=${userId}`, userId);
  }

  changeDate(id: any, startDate: any, endDate: any, notifyDay: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/changeDate/${id}?startDate=${startDate}&endDate=${endDate}&notifyDay=${notifyDay}`, endDate);
  }
}
