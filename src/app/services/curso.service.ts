import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { ContarNumeroClass, ContarPorIdCurso, Curso } from '../models/curso';
import { environment } from 'src/environments/environment';
import {UserData} from "../component/administracion/crudusuario/crudusuario.component";

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



    createCurso(curso:Curso):Observable<Curso>{
      return this.http.post(environment.URL_APP+"/curso/registrarCurso",curso,{headers: this.httpHeaders})
    }

    getAllCurso(): Observable<Curso[]> {
        return this.http.get(environment.URL_APP + "/curso/allCursos", { headers: this.httpHeaders }).pipe(map(Response => Response as Curso[]))
    }

    getContarCurso(idCurso: any): Observable<ContarNumeroClass[]> {
        return this.http.get(environment.URL_APP + "/curso/contarclientesencurso/"+idCurso, { headers: this.httpHeaders }).pipe(map(Response => Response as ContarNumeroClass[]))
    }

    getClientesCurso(idCurso:any): Observable<ContarPorIdCurso[]> {
        return this.http.get(environment.URL_APP + "/curso/allBylistaclientes/"+idCurso, { headers: this.httpHeaders }).pipe(map(Response => Response as ContarPorIdCurso[]))
    }

    saveClienteCurso(idCliente: any, idCurso: any) {
        return this.http.post(environment.URL_APP + "/curso/agregarcliente/" + idCliente + "/" + idCurso, null, { headers: this.httpHeaders })
    }

    actualizarbyidCurso(idcurso:number){
      return null;
    }

    deleteCurso(idcurso:number){
      return this.http.delete(environment.URL_APP+"/curso/"+idcurso,{headers:this.httpHeaders});
    }

    deletePersonaCurso(idCliente: any, idCurso: any){
        return this.http.delete(environment.URL_APP+"/curso/"+idCurso+"/cliente/"+idCliente,{headers:this.httpHeaders});
    }

}


