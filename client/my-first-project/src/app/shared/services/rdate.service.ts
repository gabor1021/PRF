import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rdate } from '../model/Rdate';

@Injectable({
  providedIn: 'root'
})
export class RdateService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Rdate[]>('http://localhost:5000/app/getAllRdates', {withCredentials: true});
    }

  addDate(rdate: Rdate){
    const body = new URLSearchParams();
    body.set('date', rdate.date);
    body.set('guestnum', rdate.guestnum.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/addDate',body, {headers: headers, withCredentials: true});
  }

  updateDate(id: string, guestnum: number){
    const body = new URLSearchParams();
    body.set('id', id);
    body.set('guestnum', guestnum.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/updateDate', body,  {headers: headers, withCredentials: true})
  }

  genDates(date: string){
    const body = new URLSearchParams();
    body.set('date',date)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/genDates', body, {headers: headers, withCredentials: true});
  }

  reserveTable(id: string, pref: string | undefined){
    const body = new URLSearchParams();
    body.set('id',id);
    if(pref){
      body.set('pref',pref);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/reserveTable', body, {headers: headers,withCredentials: true});
  }

  deleteDate(id: string){
    return this.http.delete('http://localhost:5000/app/deleteDate/'+id, {withCredentials: true});
  }
}
