import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../../models/curso";
import {CursoService} from "../../../../services/curso.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];

@Component({
  selector: 'app-crudcurso',
  templateUrl: './crudcurso.component.html',
  styleUrls: ['./crudcurso.component.css']
})
export class CrudcursoComponent implements OnInit {

  loaderGuardar:boolean;
  loaderActualizar:boolean;
  cursos: Curso[]=[]


  displayedColumns: string[] = ['id', 'nombre', 'lugar', 'responsable', 'fechaInicio', 'fechaFin', 'Editar','Eliminar'];
  dataSource: MatTableDataSource<Curso>;


  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cursoService: CursoService,
              private _snackBar: MatSnackBar,) {



  }

  ngOnInit(): void {
  this.listarCursos();
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarCursos(){
    this.cursoService.getAllCurso().subscribe(value => {

      this.dataSource=new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaderActualizar=false

    })
  }

  formGrupos = new FormGroup({
    nombre: new FormControl<String>('', [Validators.required, Validators.maxLength(20)]),
    responsable: new FormControl<String>('', [Validators.required]),
    actividades: new FormControl<String>('', [Validators.required]),

    numParticipantes: new FormControl<Number>(null, [Validators.required, Validators.pattern("[0-9]+")]),
    lugar: new FormControl<String>('', [Validators.required]),
    descripcion: new FormControl<String>('', [Validators.required, Validators.minLength(10)]),
    materiales: new FormControl<String>('', [Validators.required]),
    observaciones: new FormControl<String>('', [Validators.required]),
    fechaInicio: new FormControl<Date | null>(null,[Validators.required]),
    fechaFin: new FormControl<Date | null>(null,[Validators.required]),
    fechaMaxInscripcion: new FormControl<Date | null>(null,[Validators.required]),
  })


  guardarCliente() {
    console.log(this.formGrupos.getRawValue())
    this.cursoService.createCurso(this.formGrupos.getRawValue()).subscribe(value => {
      this._snackBar.open('Curso registrado', 'ACEPTAR');
      this.vaciarFormulario()
      this.loaderGuardar=false
    },error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      this.loaderGuardar=false
    })
  }


  vaciarFormulario(){
    this.formGrupos.setValue({
      actividades: "",
      descripcion: "",
      fechaFin: undefined,
      fechaInicio: undefined,
      fechaMaxInscripcion: undefined,
      lugar: "",
      materiales: "",
      nombre: "",
      numParticipantes: 0,
      observaciones: "",
      responsable: ""

    })
  }


}

