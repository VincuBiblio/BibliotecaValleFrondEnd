import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Curso } from '../models/curso';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CursoService {

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }


    getAllCurso(): Observable<Curso[]> {
        return this.http.get(environment.URL_APP + "/curso/allCursos", { headers: this.httpHeaders }).pipe(map(Response => Response as Curso[]))
    }

}
