import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pref } from '../model/Pref';

@Injectable({
  providedIn: 'root'
})
export class PrefService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Pref[]>('http://localhost:5000/app/getAllPrefs', {withCredentials: true});
  }

  addPref(pref: Pref){
    const body = new URLSearchParams();
    body.set('spec_request', pref.spec_request);
    body.set('description', pref.description);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/addPref', body, {headers: headers, withCredentials: true});
  }

  deletePref(id: string){
    return this.http.delete('http://localhost:5000/app/deletePref/'+id, {withCredentials: true});
  }
}
