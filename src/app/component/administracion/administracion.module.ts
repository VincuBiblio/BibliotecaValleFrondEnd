import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import { ClientesComponent } from './clientes/clientes.component';
import {ReactiveFormsModule} from "@angular/forms";
import { InscripcionTallerComponent } from './taller/inscripcionTaller/inscripcion-taller.component';
import {AsistenciacursoComponent} from "./cursos/asistenciacurso/asistenciacurso.component";
import {
  ControlInscripcionCursoComponent
} from "./cursos/inscripcionCurso/controlnscripcionCurso/control-inscripcion-curso.component";
import {ReporteCursoComponent} from "./cursos/reporteCurso/reporte-curso.component";
import {CrudcursoComponent} from "./cursos/crudcurso/crudcurso.component";



const routes: Routes = [
  {
    path: 'bienvenida',
    component: BienvenidaComponent
  },
  {
    path: 'administracionclientes',
    component: ClientesComponent
  },
  {
    path: 'asistenciacurso',
    component: AsistenciacursoComponent

  },
  {
    path: 'inscripcioncurso',
    component: ControlInscripcionCursoComponent

  },
  {
    path: 'inscripciontaller',
    component: InscripcionTallerComponent

  },
  {
    path: 'reportecurso',
    component: ReporteCursoComponent

  },
  {

    path: 'cursos',
    component: CrudcursoComponent

  }

]

@NgModule({
  declarations: [
    BienvenidaComponent,
    ClientesComponent,
    AsistenciacursoComponent,
    ReporteCursoComponent,
    CrudcursoComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ]
})
export class AdministracionModule { }

