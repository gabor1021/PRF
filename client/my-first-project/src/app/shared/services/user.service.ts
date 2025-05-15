import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});
  }
  
  update(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('password', user.password);
    body.set('name', user.name);
    body.set('phone', user.phone);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.put('http://localhost:5000/app/profile', body, {headers: headers, withCredentials: true});
  }

  delete(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.delete('http://localhost:5000/app/delete/'+id, {headers: headers, withCredentials: true});
  }
}
