import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicacion } from '../models/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  url = 'http://localhost:4000/api/ubicaciones/';

  constructor(private http: HttpClient) { }

  getUbicacion(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarUbicacion(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarUbicacion(ubicacion: Ubicacion): Observable<any>{
    return this.http.post(this.url, ubicacion);
  }

  obtenerUbicacion(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  editarUbicacion(id: string, ubicacion: Ubicacion): Observable<any>{
    return this.http.put(this.url + id, ubicacion);
  }
}
