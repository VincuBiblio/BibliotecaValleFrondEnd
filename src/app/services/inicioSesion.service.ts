import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersonaUsuario} from "../models/personaUsuario";
import {Observable} from "rxjs";
import {FormControl, ɵFormGroupRawValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {


  private urlEndPoint: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  loginUsuario(persona: ɵTypedOrUntyped<{ clave: FormControl<String | null>; email: FormControl<String | null> }, ɵFormGroupRawValue<{ clave: FormControl<String | null>; email: FormControl<String | null> }>, any>): Observable<PersonaUsuario> {
    console.log(persona)
    return this.http.post<PersonaUsuario>(this.urlEndPoint + "persona/login", persona)
  }

}
