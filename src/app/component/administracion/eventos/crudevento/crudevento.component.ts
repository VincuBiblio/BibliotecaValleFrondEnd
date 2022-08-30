import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.serice';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-crudevento',
  templateUrl: './crudevento.component.html',
  styleUrls: ['./crudevento.component.css']
})
export class CrudeventoComponent implements OnInit {

  public eventoLista: Evento = new Evento();


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public eventoService: EventoService,
    private _snackBar: MatSnackBar,
  ) {

    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

  }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  formGrupos = new FormGroup({
    descripcion: new FormControl<String>('', [Validators.required]),
    actividades: new FormControl<String>('', [Validators.required]),
    fecha: new FormControl<Date>(null, [Validators.required]),
    observacion: new FormControl<String>('', [Validators.required]),
  })

  guardarCliente() {

    this.eventoLista.descripcion = Object.values(this.formGrupos.getRawValue())[0];
    this.eventoLista.actividades = Object.values(this.formGrupos.getRawValue())[1];
    this.eventoLista.fecha = Object.values(this.formGrupos.getRawValue())[2];
    this.eventoLista.observacion = Object.values(this.formGrupos.getRawValue())[3];
    this.eventoLista.documento = null;
    this.eventoLista.numParticipantes = null;
    this.eventoLista.usuarioid = "1";

    console.log("Evento Guardado");
    console.log(this.eventoLista);

    this.eventoService.createEvento(this.eventoLista).subscribe(value => {
      this._snackBar.open('Evento registrado', 'ACEPTAR');
      this.vaciarFormulario();
      //this.loaderGuardar=false
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


}




/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
