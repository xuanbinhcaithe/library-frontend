import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  apiUrl = environment.api + 'tab';

  constructor(private http: HttpClient) {
  }

  getTabByBoardId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/board/${id}`);
  }

  getTabById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  saveTab(id: number, tab: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/board/${id}`, tab);
  }

  moveTab(lstTabIds: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/moveTab`, lstTabIds);
  }

  moveTabToBoard(tabId: any, boardId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/moveTabToBoard?tabId=${tabId}&boardId=${boardId}`, boardId);
  }

}
