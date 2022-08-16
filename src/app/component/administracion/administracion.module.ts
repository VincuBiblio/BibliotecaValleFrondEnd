import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BienvenidaComponent} from './bienvenida/bienvenida.component';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {ClientesComponent} from './clientes/clientes.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AsistenciacursoComponent} from "./cursos/asistenciacurso/asistenciacurso.component";
import {
  ControlInscripcionCursoComponent
} from "./cursos/inscripcionCurso/controlnscripcionCurso/control-inscripcion-curso.component";
import {ReporteCursoComponent} from "./cursos/reporteCurso/reporte-curso.component";
import {CrudcursoComponent} from "./cursos/crudcurso/crudcurso.component";
import {
  ControlParticipacionTallerComponent
} from './taller/participacionTaller/controlParticipacionTaller/control-participacion-taller.component';
import {
  ListarinscripcionCursoComponent
} from "./cursos/inscripcionCurso/listarInscripcionCurso/listar-inscripcion-curso.component";
import {
  NuevaInscripcionComponent
} from "./cursos/inscripcionCurso/nuevaInscripcionCurso/nueva-inscripcion-curso.component";
import {
  ListarparticipacionTallerComponent
} from "./taller/participacionTaller/listaParticipacionTaller/listar-participacion-taller.component";
import {
  NuevaParticipacionTallerComponent
} from "./taller/participacionTaller/nuevaParticipacionTaller/nueva-participacion-taller.component";
import {
  ControlPrestamoComputoComponent
} from './computo/prestamoComputo/controlPrestamoComputo/control-prestamo-computo.component';
import {
  ListarprestamoComputoComponent
} from './computo/prestamoComputo/listarPrestamoComputo/listar-prestamo-computo.component';
import {
  NuevaPrestamoComputoComponent
} from './computo/prestamoComputo/nuevoPrestamoComputo/nuevo-prestamo-computo.component';
import {
  ControlPrestamoLibroComponent
} from './libros/prestamoLibro/controlPrestamoLibro/control-prestamo-libro.component';
import {ListarprestamoLibroComponent} from './libros/prestamoLibro/listarPrestamoLibro/listar-prestamo-libro.component';
import {NuevaPrestamoLibroComponent} from './libros/prestamoLibro/nuevoPrestamoLibro/nuevo-prestamo-libro.component';
import {AsistenciaTallerComponent} from './taller/asistenciaTaller/asistencia-taller.component';
import { ReporteTallerComponent } from './taller/reporteTaller/reporte-taller.component';
import { ReporteLibrosComponent } from './libros/reporteLibros/reporte-libros.component';
import { ControlUsoImpresionCopiaComponent } from './ImpresionesCopias/UsoImpresionCopia/controlUsoImpresionCopia/control-uso-impresion-copia.component';
import { ListarusoImpresionCopiaComponent } from './ImpresionesCopias/UsoImpresionCopia/listarUsoImpresionCopia/listar-uso-impresion-copia.component';
import { NuevaUsoImpresionCopiaComponent } from './ImpresionesCopias/UsoImpresionCopia/nuevoUsoImpresionCopia/nuevo-uso-impresion-copia.component';


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
    component: ControlParticipacionTallerComponent
  },
  {
    path: 'reportecurso',
    component: ReporteCursoComponent

  },
  {
    path: 'cursos',
    component: CrudcursoComponent
  },
  {
    path: 'prestamocomputo',
    component: ControlPrestamoComputoComponent
  },
  {
    path: 'prestamolibro',
    component: ControlPrestamoLibroComponent
  },

  {
    path: 'usoImpresionCopia',
    component:ControlUsoImpresionCopiaComponent
  },
  {
    path: 'asistenciataller',
    component: AsistenciaTallerComponent
  },
  {
    path: 'reportetaller',
    component: ReporteTallerComponent
  },
  {
    path: 'reportelibros',
    component: ReporteLibrosComponent
  }
]

@NgModule({
  declarations: [
    BienvenidaComponent,
    ClientesComponent,
    AsistenciacursoComponent,
    ReporteCursoComponent,
    CrudcursoComponent,
    ListarinscripcionCursoComponent,
    NuevaInscripcionComponent,
    ControlInscripcionCursoComponent,
    ControlParticipacionTallerComponent,
    ListarparticipacionTallerComponent,
    ListarprestamoComputoComponent,
    ListarprestamoLibroComponent,
    ListarusoImpresionCopiaComponent,
    NuevaParticipacionTallerComponent,
    NuevaPrestamoComputoComponent,
    NuevaPrestamoLibroComponent,
    NuevaUsoImpresionCopiaComponent,
    ControlPrestamoComputoComponent,
    ControlPrestamoLibroComponent,
    ControlUsoImpresionCopiaComponent,
    AsistenciaTallerComponent,
    ReporteTallerComponent,
    ReporteLibrosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AdministracionModule {
}


