import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { libro, PrestamoLibro } from '../models/libro';

@Injectable({
    providedIn: 'root'
})

export class LibroService {
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }


    getLibrosDisponibles(): Observable<libro[]> {
        return this.http.get(environment.URL_APP + "/libros/all/estado", { headers: this.httpHeaders }).pipe(map(Response => Response as libro[]))
    }

    createLibro(datos: libro): Observable<libro> {
        return this.http.post(environment.URL_APP + "/libros", datos, { headers: this.httpHeaders })
    }

    createPrestamoLibro(datos: PrestamoLibro): Observable<PrestamoLibro> {
        return this.http.post(environment.URL_APP + "/libro/cliente", datos, { headers: this.httpHeaders })
    }

}