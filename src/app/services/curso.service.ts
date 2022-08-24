import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { servicioUsado } from '../models/informemensual';
import { Curso } from '../models/curso';

@Injectable({
    providedIn: 'root'
})

export class CursoService {
    private _url = 'http://localhost:8082/api'


    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }


    getAllCurso(): Observable<Curso[]> {
        return this.http.get(this._url + "/curso/allCursos", { headers: this.httpHeaders }).pipe(map(Response => Response as Curso[]))
    }

}
