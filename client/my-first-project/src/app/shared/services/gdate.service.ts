import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gdate } from '../model/Gdate';

@Injectable({
  providedIn: 'root'
})
export class GdateService {

  constructor(private http: HttpClient) { }

  getHist() {
    return this.http.get<Gdate[]>('http://localhost:5000/app/getHist', {withCredentials: true});
  }

  getAll() {
    return this.http.get<Gdate[]>('http://localhost:5000/app/getAllGdates', {withCredentials: true});
  }

  deleteDate(id: string){
    return this.http.delete('http://localhost:5000/app/deleteRes/'+id, {withCredentials: true});
  }

  
  updateDate(id: string, date: string, pref: string){
    const body = new URLSearchParams();
    body.set('id', id);
    body.set('date', date);
    body.set('pref', pref);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log(pref);
    return this.http.post('http://localhost:5000/app/updateResDate', body,  {headers: headers, withCredentials: true})
  }
}
