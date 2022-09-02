import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { MaterialModule } from "../../../material/material.module";
import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from './clientes/clientes.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AsistenciacursoComponent } from "./cursos/asistenciacurso/asistenciacurso.component";
import { ReporteCursoComponent } from "./cursos/reporteCurso/reporte-curso.component";
import { CrudcursoComponent } from "./cursos/crudcurso/crudcurso.component";
import { NuevaInscripcionComponent } from './cursos/inscripcionCurso/nuevaInscripcionCurso/nueva-inscripcion-curso.component';
import {
  NuevaParticipacionTallerComponent
} from "./taller/participacionTaller/nuevaParticipacionTaller/nueva-participacion-taller.component";

import {
  NuevaPrestamoComputoComponent
} from './computo/prestamoComputo/nuevoPrestamoComputo/nuevo-prestamo-computo.component';

import { NuevaPrestamoLibroComponent } from './libros/prestamoLibro/nuevoPrestamoLibro/nuevo-prestamo-libro.component';
import { AsistenciaTallerComponent } from './taller/asistenciaTaller/asistencia-taller.component';
import { ReporteTallerComponent } from './taller/reporteTaller/reporte-taller.component';
import { ReporteLibrosComponent } from './libros/reporteLibros/reporte-libros.component';
import { NuevaUsoImpresionCopiaComponent } from './ImpresionesCopias/UsoImpresionCopia/nuevoUsoImpresionCopia/nuevo-uso-impresion-copia.component';
import { ReporteComputoComponent } from './computo/reporteComputo/reporte-computo.component';
import { ReporteImpresionCopiasComponent } from './ImpresionesCopias/reporteImpresionCopias/reporte-impresion-copias.component';
import { ReporteEventoComponent } from './eventos/reporteEvento/reporte-evento.component';
import { informeMensualComponent } from './informes/mensual/informe-mensual.component';
import { registroEventoComponent } from './eventos/registroEvento/registro-evento.component';
import { CrudtallerComponent } from './taller/crudtaller/crudtaller.component';
import { CrudeventoComponent } from './eventos/crudevento/crudevento.component';
import { CrudusuarioComponent } from './crudusuario/crudusuario.component';
import { CrudcomputoComponent } from './computo/crudcomputo/crudcomputo.component';
import { nuevoClienteComponent } from './clientes/nuevoCliente/nuevoCliente.component';
import { EditarClientesComponent } from './clientes/editarClientes/editar-clientes.component';
import { EditarUsuariosComponent } from './crudusuario/editarUsuarios/editar-usuarios.component';
import { EditarCursoComponent } from './cursos/crudcurso/editar-curso/editar-curso.component';
import { EditarTallerComponent } from './taller/crudtaller/editar-taller/editar-taller.component';

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
    component: NuevaInscripcionComponent

  },
  {
    path: 'inscripciontaller',
    component: NuevaParticipacionTallerComponent
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
    component: NuevaPrestamoComputoComponent
  },
  {
    path: 'prestamolibro',
    component: NuevaPrestamoLibroComponent
  },

  {
    path: 'usoImpresionCopia',
    component: NuevaUsoImpresionCopiaComponent
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
  },
  {
    path: 'informeMensualdoc',
    component: informeMensualComponent
  },
  {
    path: 'reportecomputo',
    component: ReporteComputoComponent
  },
  {
    path: 'reporteimpresioncopia',
    component: ReporteImpresionCopiasComponent
  },
  {
    path: 'reporteeventos',
    component: ReporteEventoComponent
  },
  {
    path: 'registroevento',
    component: registroEventoComponent
  },
  {
    path: 'crudtaller',
    component: CrudtallerComponent
  },
  {
    path: 'crudevento',
    component: CrudeventoComponent
  },
  {
    path: 'crudusuario',
    component: CrudusuarioComponent
  },
  {
    path: 'crudcomputo',
    component: CrudcomputoComponent
  },
  {
    path: 'editarcliente/:id',
    component: EditarClientesComponent
  },
  {
    path: 'administracionusuarios',
    component: CrudusuarioComponent
  },
  {
    path: 'editarusuarios/:id',
    component: EditarUsuariosComponent
  },
  {
    path: 'editarcursos/:id',
    component: EditarCursoComponent
  },
  {
    path: 'editartalleres/:id',
    component: EditarTallerComponent
  }
]

@NgModule({
  declarations: [
    BienvenidaComponent,
    ClientesComponent,
    AsistenciacursoComponent,
    ReporteCursoComponent,
    CrudcursoComponent,
    NuevaInscripcionComponent,
    NuevaParticipacionTallerComponent,
    NuevaPrestamoComputoComponent,
    NuevaPrestamoLibroComponent,
    NuevaUsoImpresionCopiaComponent,
    AsistenciaTallerComponent,
    ReporteTallerComponent,
    ReporteLibrosComponent,
    informeMensualComponent,
    ReporteComputoComponent,
    ReporteImpresionCopiasComponent,
    ReporteEventoComponent,
    registroEventoComponent,
    nuevoClienteComponent,
    CrudtallerComponent,
    CrudeventoComponent,
    CrudusuarioComponent,
    CrudcomputoComponent,
    EditarClientesComponent,
    EditarUsuariosComponent,
    EditarCursoComponent,
    EditarTallerComponent,
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



