import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ClienteComputador } from '../models/cliente-computador';
import { Computo } from '../models/computo';

@Injectable({
    providedIn: 'root'
})

export class ComputoService {
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })


    constructor(
        private http: HttpClient) {
    }

    getAllComputo(): Observable<Computo[]> {
        return this.http.get(environment.URL_APP + "/inventario/computo/all", { headers: this.httpHeaders }).pipe(map(Response => Response as Computo[]))
    }

    createClienteComputador(dato: ClienteComputador): Observable<ClienteComputador> {
        return this.http.post(environment.URL_APP + "/inventario/computo/registrocomputadorcliente", dato, { headers: this.httpHeaders })
    }

}