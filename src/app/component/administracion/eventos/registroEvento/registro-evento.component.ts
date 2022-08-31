

import { Component, OnInit, VERSION } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { Evento } from "src/app/models/evento";
import { EventoService } from "src/app/services/evento.service";
import { Observable, ReplaySubject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.css'],

})
export class registroEventoComponent implements OnInit {

  public eventoLista: Evento[] = [];
  public selectedIdEvento: any;

  public eventoListaGuardar: Evento = new Evento();

  base64Output: string;

  public divMostrar: boolean = false;
  constructor(
    private eventoService: EventoService,
    private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
    this.listarEventoSinParticipantes();
  }


  name = "Angular " + VERSION.major;
  display: FormControl = new FormControl("", Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    console.log(l);
    console.log(Object.values(l)[0]);
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }


  }


  //LISTAR

  formGrupos = new FormGroup({
    descripcion: new FormControl<String>('', [Validators.required]),
    actividades: new FormControl<String>('', [Validators.required]),
    fecha: new FormControl<Date>(null, [Validators.required]),
    observacion: new FormControl<String>('', [Validators.required]),
    participantes: new FormControl<String>('', [Validators.required]),
  })

  listarEventoSinParticipantes() {
    this.eventoService.getEventoSinParticipantes().subscribe(value => {
      this.eventoLista = value;
      console.log(value);
    })

  }


  cargarParticipantesCurso(id) {
    this.selectedIdEvento = (id.target as HTMLSelectElement).value;

    for (var k = 0; k < this.eventoLista.length; k++) {
      if (this.eventoLista[k].id == this.selectedIdEvento) {
        this.formGrupos.setValue({
          actividades: this.eventoLista[k].actividades,
          descripcion: this.eventoLista[k].descripcion,
          fecha: this.eventoLista[k].fecha,
          observacion: this.eventoLista[k].observaciones,
          participantes: '',
        })
      }

    }
    this.divMostrar = true;
  }


  //editar

  guardarEditarEvento() {

    this.eventoListaGuardar.descripcion = Object.values(this.formGrupos.getRawValue())[0];
    this.eventoListaGuardar.actividades = Object.values(this.formGrupos.getRawValue())[1];
    this.eventoListaGuardar.fecha = Object.values(this.formGrupos.getRawValue())[2];
    this.eventoListaGuardar.observaciones = Object.values(this.formGrupos.getRawValue())[3];
    this.eventoListaGuardar.numParticipantes = Object.values(this.formGrupos.getRawValue())[4];
    this.eventoListaGuardar.usuarioid = "1";
    this.eventoListaGuardar.id = this.selectedIdEvento;

    console.log(this.eventoListaGuardar);

    try {
      if (this.eventoListaGuardar.documento.length != 0) {
        console.log("Datos Actualizar");
        console.log(this.eventoListaGuardar);
        this.eventoService.putEvento(this.eventoListaGuardar).subscribe(value => {
          this._snackBar.open('Evento Actualizado', 'ACEPTAR');
          this.listarEventoSinParticipantes();
          this.divMostrar = false;
        }, error => {
          this._snackBar.open(error.error.message, 'ACEPTAR');
          //this.loaderGuardar=false
        })
      }
    } catch (error) {


      this._snackBar.open('Seleccione un archivo', 'ACEPTAR');
    }
  }



  //convertir a base 64
  onFileSelected(event) {
    console.log(event);
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      this.eventoListaGuardar.documento = base64;
      console.log("Convertido a base 64");
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }


}

