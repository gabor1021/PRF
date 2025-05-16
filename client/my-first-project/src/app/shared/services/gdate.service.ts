import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gdate } from '../model/Gdate';

@Injectable({
  providedIn: 'root'
})
export class GdateService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Gdate[]>('http://localhost:5000/app/getHist', {withCredentials: true});
  }
}
