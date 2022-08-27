import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CursoClientes, ListaClientesRequests } from 'src/app/models/clienteCurso';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-listar-inscripcion-curso',
  templateUrl: './listar-inscripcion-curso.component.html',
  styleUrls: ['./listar-inscripcion-curso.component.css'],
})
export class ListarinscripcionCursoComponent implements OnInit {


  public listaInicialCurso: Curso[] = [];
  public cursoLista: Curso[] = [];
  public clientesListaCurso: ListaClientesRequests[] = [];


  public Hoy = new Date();


  public selectedIdCurso: any;

  public listaClientesInscritos: ListaClientesRequests[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private cursoService: CursoService,
    private _snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.listarCursosParaLista();
  }


  displayedColumns: string[] = ['position', 'cedula', 'nombres', 'apellidos', 'eliminar'];
  dataSource = new MatTableDataSource<ListaClientesRequests>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //LISTAR POR ID


  hola(){
alert("hello mundo");
  }

  listarParticipantesCurso(event: Event, condicion: number, valor: any) {

    if (condicion == 1) {
      this.selectedIdCurso = (event.target as HTMLSelectElement).value;
    } else {
      if (condicion == 2) {
        this.selectedIdCurso = valor;
      }
    }


    this.cursoService.getClientesCurso(this.selectedIdCurso).subscribe(values => {

      var quesirva = JSON.stringify(Object.values(values)[12])
      var coche = JSON.parse(quesirva);

      this.listaClientesInscritos = coche;

      this.dataSource = new MatTableDataSource(this.listaClientesInscritos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //console.log(this.listaClientesInscritos.length);


    })
  }


  //LISTAR SERVICIOS
  listarCursosParaLista() {
    this.cursoService.getAllCurso().subscribe(value => {
      this.listaInicialCurso = value;
      var AnyoHoy = this.Hoy.getFullYear();
      var MesHoy = this.Hoy.getMonth() + 1;
      var DiaHoy = this.Hoy.getDate();

      for (var i = 0; i < this.listaInicialCurso.length; i++) {
        //alert(this.listaInicialCurso[i].fechaMaxInscripcion);

        let cadena = this.listaInicialCurso[i].fechaMaxInscripcion;
        let palabra = cadena.split('-')

        var AnyoFecha = palabra[0];
        var MesFecha = palabra[1];
        var DiaFecha = palabra[2];


        //console.log(DiaFecha);

        if (AnyoFecha < AnyoHoy) {
          alert("La fecha introducida es anterior a Hoy");

        }
        else {
          if (AnyoFecha == AnyoHoy && MesFecha < MesHoy) {

          }
          else {
            if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha < DiaHoy) {

            }
            else {
              if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {

                this.cursoLista.push(this.listaInicialCurso[i]);

              }
              else {

                this.cursoLista.push(this.listaInicialCurso[i]);

              }
            }
          }
        }


      }
      console.log("Listado para buscar en Combo generado");
      console.log(this.cursoLista);

    })

  }

  eliminarClienteCurso(idCliente: any) {

    this.cursoService.deletePersonaCurso(idCliente, this.selectedIdCurso).subscribe(value => {
      this.listarParticipantesCurso(this.selectedIdCurso, 2, this.selectedIdCurso);
      this._snackBar.open('Elimado exitosamente', 'ACEPTAR');

    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
    })
  }



}