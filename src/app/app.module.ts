import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import { LayoutComponent } from './component/layout/layout.component';
import {AppRoutingModule} from "./app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ListarinscripcionCursoComponent } from './component/administracion/cursos/inscripcionCurso/listarInscripcionCurso/listar-inscripcion-curso.component';
import { NuevaInscripcionComponent } from './component/administracion/cursos/inscripcionCurso/nuevaInscripcionCurso/nueva-inscripcion-curso.component';
import { ControlInscripcionCursoComponent } from './component/administracion/cursos/inscripcionCurso/controlnscripcionCurso/control-inscripcion-curso.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { ControlParticipacionTallerComponent } from './component/administracion/taller/participacionTaller/controlParticipacionTaller/control-participacion-taller.component';
import { ListarparticipacionTallerComponent } from './component/administracion/taller/participacionTaller/listaParticipacionTaller/listar-participacion-taller.component';
import { NuevaParticipacionTallerComponent } from './component/administracion/taller/participacionTaller/nuevaParticipacionTaller/nueva-participacion-taller.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        
        ListarinscripcionCursoComponent,
        NuevaInscripcionComponent,
        ControlInscripcionCursoComponent,
        ControlParticipacionTallerComponent,
        ListarparticipacionTallerComponent,
        NuevaParticipacionTallerComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        DialogModule

    ],
    providers: [],
    exports: [
        ListarinscripcionCursoComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

