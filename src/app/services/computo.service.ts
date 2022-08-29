import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { ContarNumeroClass, ContarPorIdCurso, Curso } from '../models/curso';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ComputoService{
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }

}