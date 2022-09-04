import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Cliente_Impresion, Impresion_Copia } from '../models/impresion-copia';

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
        return this.http.post(environment.URL_APP + "/copias/registrocopias", impresion, { headers: this.httpHeaders })
    }


    getClienteImpresion(mes: any, anio: any): Observable<Cliente_Impresion[]> {
        return this.http.get(environment.URL_APP + "/copias/allCopiasbymesandanio/" + mes + "/{anio}?anio=" + anio, { headers: this.httpHeaders }).pipe(map(Response => Response as Cliente_Impresion[]))
    }


    putImpresionCopia(dato: Impresion_Copia): Observable<Impresion_Copia> {
        return this.http.put(environment.URL_APP + "/copias/updateregistrodecopias", dato, { headers: this.httpHeaders })
    }

}