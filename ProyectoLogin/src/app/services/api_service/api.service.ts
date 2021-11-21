import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://fastapi-ionic-login.herokuapp.com/';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
  }

  getHome(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers }).pipe();
  }

  crearUsuario(usuario: string, contrasena: string, correo: string): Observable<any> {
    const json = {
      nombre: `${usuario}`,
      password: `${contrasena}`,
      email: `${correo}`
    };

    const response = this.http.post(this.apiUrl, json, { headers: this.headers }).pipe();
    return response;
  }

}
