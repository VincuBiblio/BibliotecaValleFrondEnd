
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { __values } from 'tslib';
import { ClienteService } from 'src/app/services/cliente.service';
import { PersonaCliente } from 'src/app/models/personaCliente';



export interface PeriodicElementCliente {
  cedula: string;
  nombre: string;
  edad: string;
}

const ELEMENT_DATA_CLIENTE: PeriodicElementCliente[] = [
  { cedula: '0126578945', nombre: 'Juan Andrade', edad: '18' },
  { cedula: '01048974569', nombre: 'Alisson Cardenas', edad: '19' },
  { cedula: '0156789412', nombre: 'Adriana Arevalo', edad: '8' },
  { cedula: '0108745689', nombre: 'Amalia Nieto', edad: '40' },
  { cedula: '0198745648', nombre: 'Jose Bermeo', edad: '30' },
  { cedula: '01897456987', nombre: 'Marco Polo', edad: '15' },

];



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

  public cursoLista: Curso[] = [];
  public clienteLista: PersonaCliente[] = [];

  public formCliente: FormGroup;
  public dialogoCliente: boolean;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;




  constructor(
    private _formBuilder: FormBuilder,
    private cursoService: CursoService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.listarCursos();
    this.listarClientes();
  }



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

    /*
    cedula
    nombres
    edad
    email
    direccion
    representante*/

  });
  isEditable = true;


  //////////////////////////////////////////////////
  //LISTAR SERVICIOS

  listarCursos() {
    this.cursoService.getAllCurso().subscribe(value => {
      this.cursoLista = value;
      this.dataSourceCurso = new MatTableDataSource(value);
      this.dataSourceCurso.paginator = this.paginator;
      this.dataSourceCurso.sort = this.sort;
      console.log("Listado cursos generado exitosamente");
    })
  }


  listarClientes() {
    this.clienteService.getAllClientes().subscribe(value => {
      this.clienteLista = value;
      console.log(this.clienteLista);
      this.dataSourceCliente = new MatTableDataSource(value);
      this.dataSourceCliente.paginator = this.paginator;
      this.dataSourceCliente.sort = this.sort;
      console.log("Listado clientes generado exitosamente");
    })

  }

  cargarDatosCurso(id: any) {

    for (var i = 0; i < this.cursoLista.length; i++) {
      if (this.cursoLista[i].id == id) {
        this.firstFormGroup.setValue({
          disponibilidad: "/" + this.cursoLista[i].numParticipantes,
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
    console.log("numeroo " + id);
    for (var i = 0; i < this.clienteLista.length; i++) {

      if (this.clienteLista[i].idCliente == id) {
        this.secondFormGroup.setValue({

          cedula: this.clienteLista[i].cedula,
          nombres: this.clienteLista[i].nombres + " " + this.clienteLista[i].apellidos,
          edad: this.clienteLista[i].edad,
          email: this.clienteLista[i].email,
          direccion: "Octavio Chacon",
          representante: this.clienteLista[i].nombreResponsable,


        })

        console.log("Datos cliente| cargado correctamente");
      }

    }
  }

  prueba(valor: any) {
    alert(valor);
  }

  //////////////////////////////////////////////////
  //DIALOGO PARA CREAR UN NUEVO CLIENTE
  openDialog() {
    this.dialogoCliente = true;
  }

  closeDialog() {
    this.dialogoCliente = false;
  }

  //////////////////////////////////////////////////
  //LISTAR CURSOS

  displayedColumnsCurso: string[] = ['nombre'];
  dataSourceCurso: MatTableDataSource<Curso>;

  applyFilterCurso(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCurso.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCurso.paginator) {
      this.dataSourceCurso.paginator.firstPage();
    }
  }

  //////////////////////////////////////////////////
  //LISTAR CLIENTE
  displayedColumnsCliente: string[] = ['cedula'];
  dataSourceCliente = new MatTableDataSource<PersonaCliente>;


  applyFilterCliente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();
  }

}



