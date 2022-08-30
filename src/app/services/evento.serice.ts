import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EventoService {
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }


    createEvento(evento: Evento): Observable<Evento> {
        return this.http.post(environment.URL_APP + "/eventos/registrarEvento", evento, { headers: this.httpHeaders })
    }


}