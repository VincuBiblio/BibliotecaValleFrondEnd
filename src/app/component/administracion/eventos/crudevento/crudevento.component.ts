import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from "sweetalert2";




@Component({
  selector: 'app-crudevento',
  templateUrl: './crudevento.component.html',
  styleUrls: ['./crudevento.component.css']
})
export class CrudeventoComponent implements OnInit {

  public eventoListaGuardar: Evento = new Evento();
  public idEvento: any;

  public eventoLista: Evento[] = [];

  public divNuevo: Boolean = true;
  public divListar: Boolean = false;
  public cardListarModulo: Boolean;
  public botonParaGuardar: Boolean = true;
  public botonParaEditar: Boolean = false;



  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public eventoService: EventoService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarEventoSinParticipantes();
  }


  public mostrarLista() {
    this.listarEventoSinParticipantes();
    this.divListar = true;
    this.divNuevo = false;
  }

  public mostrarNuevo() {
    this.divListar = false;
    this.divNuevo = true;
  }


  formGrupos = new FormGroup({
    descripcion: new FormControl<String>('', [Validators.required]),
    actividades: new FormControl<String>('', [Validators.required]),
    fecha: new FormControl<Date>(null, [Validators.required]),
    observacion: new FormControl<String>('', [Validators.required]),
  })

  guardarEvento() {

    this.eventoListaGuardar.descripcion = Object.values(this.formGrupos.getRawValue())[0];
    this.eventoListaGuardar.actividades = Object.values(this.formGrupos.getRawValue())[1];
    this.eventoListaGuardar.fecha = Object.values(this.formGrupos.getRawValue())[2];
    this.eventoListaGuardar.observacion = Object.values(this.formGrupos.getRawValue())[3];
    this.eventoListaGuardar.documento = null;
    this.eventoListaGuardar.numParticipantes = null;
    this.eventoListaGuardar.usuarioid = "1";

    console.log("Evento Guardado");
    console.log(this.eventoListaGuardar);

    this.eventoService.createEvento(this.eventoListaGuardar).subscribe(value => {
      this._snackBar.open('Evento registrado', 'ACEPTAR');
      this.vaciarFormulario();
      this.listarEventoSinParticipantes()
    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      //this.loaderGuardar=false
    })

  }

  vaciarFormulario() {
    this.formGrupos.setValue({
      actividades: "",
      descripcion: "",
      fecha: null,
      observacion: "",

    })
  }



  displayedColumnsTaller: string[] = ['id', 'descripcion', 'fecha', 'editar', 'eliminar'];
  dataSourceEvento: MatTableDataSource<Evento>;


  applyFilterEvento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEvento.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEvento.paginator) {
      this.dataSourceEvento.paginator.firstPage();
    }
  }

  listarEventoSinParticipantes() {
    this.eventoService.getEventoSinParticipantes().subscribe(value => {

      this.eventoLista = value;


      this.dataSourceEvento = new MatTableDataSource(this.eventoLista);
      this.dataSourceEvento.paginator = this.paginator;
      this.dataSourceEvento.sort = this.sort;
      console.log("Listado eventos generado exitosamente");
      console.log(this.eventoLista)
    })

  }

  //EDITAR

  editarEvento(id: any) {
    this.idEvento = id;
    this.botonParaGuardar = false;
    this.botonParaEditar = true;

    for (var k = 0; k < this.eventoLista.length; k++) {
      if (this.eventoLista[k].id == id) {
        this.formGrupos.setValue({
          actividades: this.eventoLista[k].actividades,
          descripcion: this.eventoLista[k].descripcion,
          fecha: this.eventoLista[k].fecha,
          observacion: "",

        })
        this.mostrarNuevo();
      }

    }
  }


  guardarEditarEvento() {
    this.eventoListaGuardar.descripcion = Object.values(this.formGrupos.getRawValue())[0];
    this.eventoListaGuardar.actividades = Object.values(this.formGrupos.getRawValue())[1];
    this.eventoListaGuardar.fecha = Object.values(this.formGrupos.getRawValue())[2];
    this.eventoListaGuardar.observacion = Object.values(this.formGrupos.getRawValue())[3];
    this.eventoListaGuardar.documento = null;
    this.eventoListaGuardar.numParticipantes = null;
    this.eventoListaGuardar.usuarioid = "1";
    this.eventoListaGuardar.id = this.idEvento;


    console.log("Datos Actualizar");
    console.log(this.eventoListaGuardar);

    this.eventoService.putEvento(this.eventoListaGuardar).subscribe(value => {
      this._snackBar.open('Evento Actualizado', 'ACEPTAR');
      this.vaciarFormulario();
      this.botonParaGuardar = true;
      this.botonParaEditar = false;
      this.listarEventoSinParticipantes()
    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      //this.loaderGuardar=false
    })


  }

  //ELIMINAR

  eliminarEvento(idEvento: any) {

    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "¡Sí, bórralo!",
      cancelButtonText: "Cancelar",
      background: '#f7f2dc',
      confirmButtonColor: '#f47f16',
      cancelButtonColor: '#d33',
      backdrop: false
    })
      .then(resultado => {
        if (resultado.value) {

          this.eventoService.deleteEvento(idEvento).subscribe(value => {
            this.listarEventoSinParticipantes();
            this._snackBar.open('Eliminado exitosamente', 'ACEPTAR');

          }, error => {
            this._snackBar.open(error.error.message, 'ACEPTAR');
          })
        }
      });



  }



}

