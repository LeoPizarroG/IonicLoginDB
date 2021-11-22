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

    const response = this.http.post(this.apiUrl + 'registro', json, { headers: this.headers }).pipe();
    return response;
  }

  loginUsuario(usuario: string, contrasena: string): Observable<any> {
    const json = {
      nombre: `${usuario}`,
      password: `${contrasena}`,
    };

    return this.http.post(this.apiUrl + 'login', json, { headers: this.headers }).pipe();
  }

  recuperarContrasena(usuario: string, correo: string, nuevaContrasena: string): Observable<any> {
    const json = {
      nombre: `${usuario}`,
      password: `${nuevaContrasena}`,
      email: `${correo}`
    };

    return this.http.patch(this.apiUrl + 'recuperar', json, { headers: this.headers }).pipe();
  }

  obtenerDatosUsuario(usuario: string): Observable<any> {
    return this.http.get(this.apiUrl + `usuario/?usuario=${usuario}` , { headers: this.headers }).pipe();
  }

  actualizarDatosUsuario(id: number, usuario: string, contrasena: string, correo: string): Observable<any> {
    const json = {
      nombre: `${usuario}`,
      password: `${contrasena}`,
      email: `${correo}`
    };

    return this.http.put(this.apiUrl + `actualizar/${id}`, json, { headers: this.headers }).pipe();
  }

  borrarCuenta(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `borrar/${id}` , { headers: this.headers }).pipe();
  }


}
