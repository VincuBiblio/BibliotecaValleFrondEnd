import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Curso} from "../../../../../models/curso";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CursoService} from "../../../../../services/curso.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {


  loaderCargar:boolean;
  loaderGuardar:boolean;


  constructor(private cursoService: CursoService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.loaderCargar=true;
    this.activatedRoute.params.subscribe(params => {

      this.cursoService.getAllCurso().subscribe(value =>{

        var curso: Curso=value.filter(value1 => value1.id==params['id'])[0];
        console.log(value.filter(value1 => value1.id == params['id'])[0]);
        this.formGrupos.setValue({
          id: curso.id,
          nombre: curso.nombre,
          responsable: curso.responsable,
          actividades: curso.actividades,

          numParticipantes: curso.numParticipantes,
          lugar: curso.lugar,
          descripcion: curso.descripcion,
          materiales: curso.materiales,
          //observaciones: curso.observaciones,
          fechaInicio: curso.fechaInicio,
          fechaFin: curso.fechaFin,
          fechaMaxInscripcion: curso.fechaMaxInscripcion,

        })
      })

    })

  }

  formGrupos = new FormGroup({
    id: new FormControl<Number>(null),
    nombre: new FormControl<String>('', [Validators.required, Validators.maxLength(20)]),
    responsable: new FormControl<String>('', [Validators.required]),
    actividades: new FormControl<String>('', [Validators.required]),

    numParticipantes: new FormControl<Number>(null, [Validators.required, Validators.pattern("[0-9]+")]),
    lugar: new FormControl<String>('', [Validators.required]),
    descripcion: new FormControl<String>('', [Validators.required, Validators.minLength(10)]),
    materiales: new FormControl<String>('', [Validators.required]),
    //observaciones: new FormControl<String>('', [Validators.required]),
    fechaInicio: new FormControl<Date | null>(null,[Validators.required]),
    fechaFin: new FormControl<Date | null>(null,[Validators.required]),
    fechaMaxInscripcion: new FormControl<Date | null>(null,[Validators.required]),
  })


  guardarCliente() {
    console.log(this.formGrupos.getRawValue())
    this.cursoService.updateCurso(this.formGrupos.getRawValue()).subscribe(value => {

      this._snackBar.open('Curso actualizado', 'ACEPTAR');
      this.vaciarFormulario()
      this.loaderGuardar=false
    },error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      this.loaderGuardar=false

    })
  }


  vaciarFormulario(){
    this.formGrupos.setValue({
      id: 0,
      actividades: "",
      descripcion: "",
      fechaFin: undefined,
      fechaInicio: undefined,
      fechaMaxInscripcion: undefined,
      lugar: "",
      materiales: "",
      nombre: "",
      numParticipantes: 0,
      //observaciones: "",
      responsable: ""

    })
  }


}


