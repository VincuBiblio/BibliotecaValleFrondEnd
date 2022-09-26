import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ServiciosVarios } from '../models/ServiciosVarios';



@Injectable({
    providedIn: 'root'
})

export class serviciosVariosService {
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }

    createServicioVarios(dato: ServiciosVarios): Observable<ServiciosVarios> {
        return this.http.post(environment.URL_APP + "/serviciosVarios/create/serviciovarios", dato, { headers: this.httpHeaders })
    }

    getServicioVarios(): Observable<ServiciosVarios[]> {
        return this.http.get(environment.URL_APP + "/serviciosVarios/all/serviciovarios", { headers: this.httpHeaders }).pipe(map(Response => Response as ServiciosVarios[]))
    }


    putServicioVarios(dato: ServiciosVarios): Observable<ServiciosVarios> {
        return this.http.put(environment.URL_APP + "/serviciosVarios/update/serviciovarios", dato, {headers: this.httpHeaders})
      }


}
