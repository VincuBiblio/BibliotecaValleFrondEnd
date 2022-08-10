import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import { ClientesComponent } from './clientes/clientes.component';
import { InscripcionCursoComponent } from './cursos/inscripcionCurso/inscripcion-curso.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AsistenciacursoComponent } from './asistenciacurso/asistenciacurso.component';
import { InscripcionTallerComponent } from './taller/inscripcionTaller/inscripcion-taller.component';

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
    component: InscripcionCursoComponent

  },
  {
    path: 'inscripciontaller',
    component: InscripcionTallerComponent

  }



]

@NgModule({
  declarations: [
    BienvenidaComponent,
    ClientesComponent,
    AsistenciacursoComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ]
})
export class AdministracionModule { }

