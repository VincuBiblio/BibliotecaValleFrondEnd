import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Impresion_Copia } from '../models/impresion-copia';

@Injectable({
    providedIn: 'root'
})

export class Impresion_CopiaService {
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }


    createImpresionCopia(impresion: Impresion_Copia): Observable<Impresion_Copia> {
        return this.http.post(environment.URL_APP + "/copias", impresion, { headers: this.httpHeaders })
    }


}