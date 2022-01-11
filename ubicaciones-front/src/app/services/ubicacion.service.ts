import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  url = 'http://localhost:4000/api/ubicaciones/';

  constructor(private http: HttpClient) { }

  getUbicacion(): Observable<any>{
    return this.http.get(this.url);
  }
}
