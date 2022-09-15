import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import {libro, libroEstado, libroPrestamo, PrestamoLibro, ReporteLibros} from '../models/libro';
import {ReporteImpresionyCopias} from "../models/impresion-copia";

@Injectable({
  providedIn: 'root'
})

export class LibroService {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
  })


  constructor(
    private http: HttpClient) {
  }


  getLibrosDisponibles(): Observable<libro[]> {
    return this.http.get(environment.URL_APP + "/libros/all/estado", {headers: this.httpHeaders}).pipe(map(Response => Response as libro[]))
  }

  getLibroCliente(): Observable<libroPrestamo[]> {
    return this.http.get(environment.URL_APP + "/libro/cliente/lista/librosenprestamo", {headers: this.httpHeaders}).pipe(map(Response => Response as libroPrestamo[]))
  }

  createLibro(datos: libro): Observable<libro> {
    return this.http.post(environment.URL_APP + "/libros/create", datos, {headers: this.httpHeaders})
  }

  createPrestamoLibro(datos: PrestamoLibro): Observable<PrestamoLibro> {
    return this.http.post(environment.URL_APP + "/libro/cliente/registroprestamos", datos, {headers: this.httpHeaders})
  }

  putLibro(evento: libroEstado): Observable<libroEstado> {
    return this.http.put(environment.URL_APP + "/libros/estado/libro", evento, {headers: this.httpHeaders})
  }

  putLibroDevolucion(dato: PrestamoLibro): Observable<PrestamoLibro> {
    return this.http.put(environment.URL_APP + "/libro/cliente/actualizarregistroprestamos", dato, {headers: this.httpHeaders})
  }

  getReporteLibros(mes: any, anio: any): Observable<ReporteLibros> {
    return this.http.get(environment.URL_APP + "/estadisticas/filtrarByGeneroLibros/" + mes + "/" + anio, {headers: this.httpHeaders}).pipe(map(Response => Response as ReporteLibros))
  }

}
