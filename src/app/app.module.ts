import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import { LayoutComponent } from './component/layout/layout.component';
import {AppRoutingModule} from "./app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { InscripcionTallerComponent } from './component/administracion/taller/inscripcionTaller/inscripcion-taller.component';
import { ListarinscripcionCursoComponent } from './component/administracion/cursos/inscripcionCurso/listarInscripcionCurso/listar-inscripcion-curso.component';
import { NuevaInscripcionComponent } from './component/administracion/cursos/inscripcionCurso/nuevaInscripcionCurso/nueva-inscripcion-curso.component';
import { ControlInscripcionCursoComponent } from './component/administracion/cursos/inscripcionCurso/controlnscripcionCurso/control-inscripcion-curso.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    InscripcionTallerComponent,
    ListarinscripcionCursoComponent,
    NuevaInscripcionComponent,
    ControlInscripcionCursoComponent,
    
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

