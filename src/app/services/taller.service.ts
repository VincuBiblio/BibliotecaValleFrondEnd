import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ContarPorIdTaller, Taller } from '../models/taller';

@Injectable({
    providedIn: 'root'
})

export class TallerService {
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }

    getAllTaller(): Observable<Taller[]> {
        return this.http.get(environment.URL_APP + "/taller/allTalleres", { headers: this.httpHeaders }).pipe(map(Response => Response as Taller[]))
    }

    getClientesCurso(idCurso:any): Observable<ContarPorIdTaller[]> {
        return this.http.get(environment.URL_APP + "/taller/allBylistaclientestaller/"+idCurso, { headers: this.httpHeaders }).pipe(map(Response => Response as ContarPorIdTaller[]))
    }

    saveClienteTaller(idTaller: any, idCurso: any) {
        return this.http.post(environment.URL_APP + "/taller/agregarclientetaller/" + idTaller + "/" + idCurso, null, { headers: this.httpHeaders })
    }

}