import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { ContarNumeroClass, Curso } from 'src/app/models/curso';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { __values } from 'tslib';
import { ClienteService } from 'src/app/services/cliente.service';
import { PersonaCliente } from 'src/app/models/personaCliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListarinscripcionCursoComponent } from '../listarInscripcionCurso/listar-inscripcion-curso.component';


@Component({
  selector: 'app-nueva-inscripcion-curso',
  templateUrl: './nueva-inscripcion-curso.component.html',
  styleUrls: ['./nueva-inscripcion-curso.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NuevaInscripcionComponent implements OnInit {

  public mensajeSinCupos: String = "SIN CuPOS xd"
  public mensajeSinCuposGuardar: String = "Mensaje jeje";

  //DECLARACIÓN DE VARIABLES
  public cursoLista: Curso[] = [];
  public clienteLista: PersonaCliente[] = [];
  public listaInicialCurso: Curso[] = [];
  //public contarLista: ContarNumeroClass[] = [];

  public formCliente: FormGroup;
  public dialogoCliente: boolean;

  public idCurso: any;
  public idCliente: any;

  public isEditable = true;
  public cardCursoMensaje: Boolean = true;
  public cardCurso: Boolean = false;
  public cardClienteMensaje: Boolean = true;
  public cardCliente: Boolean = false;

  public controlbotonSiguiente: Boolean;
  public controlmensajeSiguiente: Boolean;

  public numeroInscritos: Number;

  public Hoy = new Date();



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private cursoService: CursoService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.listarCursos();
    this.listarClientes();
  }


  //FormGroup

  firstFormGroup = this._formBuilder.group({
    disponibilidad: new FormControl<String>('', [Validators.required]),
    nombre: new FormControl<String>('', [Validators.required]),
    responsable: new FormControl<String>('', [Validators.required]),
    fechaInicioFin: new FormControl<String>('', [Validators.required]),
    lugar: new FormControl<String>('', [Validators.required]),
    descripcion: new FormControl<String>('', [Validators.required]),
  });


  secondFormGroup = this._formBuilder.group({
    cedula: new FormControl<String>('', [Validators.required]),
    nombres: new FormControl<String>('', [Validators.required]),
    edad: new FormControl<any>('', [Validators.required]),
    email: new FormControl<String>('', [Validators.required]),
    direccion: new FormControl<String>('', [Validators.required]),
    representante: new FormControl<String>('', [Validators.required]),
  });






  //LISTAR SERVICIOS
  listarCursos() {
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



      this.dataSourceCurso = new MatTableDataSource(this.cursoLista);
      this.dataSourceCurso.paginator = this.paginator;
      this.dataSourceCurso.sort = this.sort;
      console.log("Listado cursos generado exitosamente");
      console.log(this.cursoLista)
    })

  }


  listarClientes() {
    this.clienteService.getAllClientes().subscribe(value => {
      console.log("Listado clientes generado exitosamente");
      this.clienteLista = value;
      console.log(this.clienteLista);
      this.dataSourceCliente = new MatTableDataSource(value);
      this.dataSourceCliente.paginator = this.paginator;
      this.dataSourceCliente.sort = this.sort;

    })

  }


  contarClientesCurso(id: any) {
    this.idCurso = id;
    this.cursoService.getContarCurso(this.idCurso).subscribe(value => {
      this.cargarDatosCurso(Object.values(value)[0]);
    })


  }


  //CARGAR INFORMACION EN LOS INPUT
  cargarDatosCurso(inscritos: any) {

    this.cardCursoMensaje = false;
    this.cardCurso = true;

    for (var i = 0; i < this.cursoLista.length; i++) {
      if (this.cursoLista[i].idCurso == this.idCurso) {

        var total = parseInt(this.cursoLista[i].numParticipantes) - parseInt(inscritos);

        if (total <= 0) {
          this.controlbotonSiguiente = false;
          this.controlmensajeSiguiente = true;

        } else {
          this.controlbotonSiguiente = true;
          this.controlmensajeSiguiente = false;

        }

        this.firstFormGroup.setValue({
          disponibilidad: inscritos + "/" + this.cursoLista[i].numParticipantes,
          nombre: this.cursoLista[i].nombre.toUpperCase(),
          responsable: this.cursoLista[i].responsable.toUpperCase(),
          fechaInicioFin: this.cursoLista[i].fechaInicio + " hasta " + this.cursoLista[i].fechaFin,
          lugar: this.cursoLista[i].lugar.toUpperCase(),
          descripcion: this.cursoLista[i].descripcion.toUpperCase(),
        })

        console.log("Datos curso cargado correctamente");
      }

    }


  }



  cargarDatosCliente(id: any) {
    this.idCliente = id;
    this.cardCliente = true;
    this.cardClienteMensaje = false;
    for (var i = 0; i < this.clienteLista.length; i++) {

      if (this.clienteLista[i].idCliente == this.idCliente) {
        this.secondFormGroup.setValue({

          cedula: this.clienteLista[i].cedula,
          nombres: this.clienteLista[i].nombres + " " + this.clienteLista[i].apellidos,
          edad: this.clienteLista[i].edad,
          email: this.clienteLista[i].email,
          direccion: this.clienteLista[i].barrio + " - " + this.clienteLista[i].parroquia,
          representante: this.clienteLista[i].nombreResponsable,


        })

        console.log("Datos cliente cargado correctamente");
      }

    }
  }


  //GUARDAR INSCRIPCION EN LA BASE

  guardarclienteCurso() {

    this.cursoService.saveClienteCurso(this.idCliente, this.idCurso).subscribe(
      Response => {
        console.log("Cliente inscrito con exito");
        this.contarClientesCurso(this.idCurso);

        this._snackBar.open("Cliente inscrito con exito", "CERRAR");
      }, error => {
        this._snackBar.open(error.error.message, 'ACEPTAR');
      }
    )

  }


  //DIALOGO PARA CREAR UN NUEVO CLIENTE
  openDialog() {
    this.dialogoCliente = true;
  }





  //LISTAR CURSOS EN TABLA CON BOTON NARANJA

  displayedColumnsCurso: string[] = ['nombre'];
  dataSourceCurso: MatTableDataSource<Curso>;

  applyFilterCurso(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCurso.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCurso.paginator) {
      this.dataSourceCurso.paginator.firstPage();
    }
  }

  //LISTAR CLIENTE CON BOTON NARANJA
  displayedColumnsCliente: string[] = ['cedula'];
  dataSourceCliente = new MatTableDataSource<PersonaCliente>;


  //FILTRO DE BUSQUEDA
  applyFilterCliente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();
  }

}