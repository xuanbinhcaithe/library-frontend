import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from './model/login-form';
import {Observable} from 'rxjs';
import {RegisterForm} from './model/register-form';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.api + 'user';

  constructor(private http: HttpClient) {
  }

  login(form: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', form, httpOptions);
  }

  register(form: RegisterForm): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register', form, httpOptions);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUserProfile(id: number, form: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, form);
  }

  uploadAvatar(id: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post(`${this.apiUrl}/uploadAvatar/${id}`, formData);
  }

  removeAvatar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeAvatar/${id}`);
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/allUser`);
  }

  getAllUserInvite(userIds: string, name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/allUserInvite?name=${name}`, userIds);
  }
}
