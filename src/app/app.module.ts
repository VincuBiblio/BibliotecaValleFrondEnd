import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import { LayoutComponent } from './component/layout/layout.component';
import {AppRoutingModule} from "./app-routing.module";
import { InscripcionCursoComponent } from './component/administracion/cursos/inscripcionCurso/inscripcion-curso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InscripcionTallerComponent } from './component/administracion/taller/inscripcionTaller/inscripcion-taller.component';
import { ListarinscripcionCursoComponent } from './component/administracion/cursos/inscripcionCurso/listarInscripcionCurso/listar-inscripcion-curso.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    InscripcionCursoComponent,
    InscripcionTallerComponent,
    ListarinscripcionCursoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

