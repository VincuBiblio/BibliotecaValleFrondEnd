import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { PersonaCliente } from 'src/app/models/personaCliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { libro, PrestamoLibro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from "sweetalert2";


@Component({
  selector: 'app-nuevo-prestamo-libro',
  templateUrl: './nuevo-prestamo-libro.component.html',
  styleUrls: ['./nuevo-prestamo-libro.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NuevaPrestamoLibroComponent implements OnInit {


  public clienteLista: PersonaCliente[] = [];
  public libroDisponibleLista: libro[] = [];
  public listaGuardarPrestamo: PrestamoLibro = new PrestamoLibro();
  public listaDatoLibroNuevo: libro = new libro();

  public idCliente: any;
  public cardClienteMensaje: Boolean = true;
  public cardCliente: Boolean = false;

  public divNuevo: Boolean = true;
  public divListar: Boolean = false;


  formCliente: FormGroup;



  public dialogoCliente: boolean;
  public dialogoVerDatoCliente: boolean;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  isEditable = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private clienteService: ClienteService,
    private libroService: LibroService,) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarLibroDispo();
  }

  public mostrarLista() {
    this.divListar = true;
    this.divNuevo = false;
  }

  public mostrarNuevo() {
    this.divListar = false;
    this.divNuevo = true;
  }

  prueba() {
    alert("aqui ta");
  }
  openDialog() {
    this.dialogoCliente = true;
  }

  closeDialog() {
    this.dialogoCliente = false;
  }





  //////////////////////
  //CLIENTE

  //LISTAR CLIENTE CON BOTON NARANJA
  displayedColumnsCliente: string[] = ['cedula'];
  dataSourceCliente = new MatTableDataSource<PersonaCliente>;

  //FILTRO DE BUSQUEDA
  applyFilterCliente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();
  }

  listarClientes() {
    this.clienteService.getAllClientes().subscribe(value => {
      console.log("Listado clientes generado exitosamente");
      this.clienteLista = value;
      console.log(this.clienteLista);
      this.dataSourceCliente = new MatTableDataSource(value);
      this.dataSourceCliente.paginator = this.paginator;
      this.dataSourceCliente.sort = this.sort;

    })

  }

  secondFormGroup = this._formBuilder.group({
    cedula: new FormControl<String>('', [Validators.required]),
    nombres: new FormControl<String>('', [Validators.required]),
    edad: new FormControl<any>('', [Validators.required]),
    email: new FormControl<String>('', [Validators.required]),
    direccion: new FormControl<String>('', [Validators.required]),
    representante: new FormControl<String>('', [Validators.required]),
  });

  cargarDatosCliente(id: any) {
    this.idCliente = id;
    this.cardCliente = true;
    this.cardClienteMensaje = false;
    for (var i = 0; i < this.clienteLista.length; i++) {

      if (this.clienteLista[i].idCliente == this.idCliente) {
        this.secondFormGroup.setValue({

          cedula: this.clienteLista[i].cedula,
          nombres: this.clienteLista[i].nombres.toUpperCase() + " " + this.clienteLista[i].apellidos.toUpperCase(),
          edad: this.clienteLista[i].edad,
          email: this.clienteLista[i].email,
          direccion: this.clienteLista[i].barrio.toUpperCase() + " - " + this.clienteLista[i].parroquia.toUpperCase(),
          representante: this.clienteLista[i].nombreResponsable.toUpperCase(),


        })

        console.log("Datos cliente cargado correctamente");
      }

    }
  }


  //LIBRO

  prestamoLibroFormGroup = this._formBuilder.group({
    fechaEntrega: new FormControl<String>('', [Validators.required]),
    fechaDev: new FormControl<String>('', [Validators.required]),
    libro: new FormControl<any>('', [Validators.required]),
    observacion: new FormControl<String>('', [Validators.required]),
  });

  listarLibroDispo() {

    this.libroService.getLibrosDisponibles().subscribe(value => {
      console.log("Listado libro Disponible generado exitosamente");
      this.libroDisponibleLista = value;
      console.log(this.libroDisponibleLista);
      /*
  this.dataSourceCliente = new MatTableDataSource(value);
  this.dataSourceCliente.paginator = this.paginator;
  this.dataSourceCliente.sort = this.sort;*/

    })
  }

  crearLibro() {
    Swal.fire({
      title: "Ingrese el nombre del Libro",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      background: '#f7f2dc',
      confirmButtonColor: '#a01b20',
      backdrop: false
    })
      .then(resultado => {
        if (resultado.value) {
          this.listaDatoLibroNuevo.codigoLibro = resultado.value;
          this.listaDatoLibroNuevo.estado = true;
          console.log(this.listaDatoLibroNuevo);
          this.libroService.createLibro(this.listaDatoLibroNuevo).subscribe(value => {
            this._snackBar.open('Libro registrado', 'ACEPTAR');
            //this.vaciarFormulario();
            //this.listarEventoSinParticipantes();
            //this.mostrarLista();
          }, error => {
            this._snackBar.open(error.error.message, 'ACEPTAR');
            //this.loaderGuardar=false
          })
        }
      });
  }

  guardarPrestamoLibro() {
    this.listaGuardarPrestamo.idCliente = this.idCliente;
    this.listaGuardarPrestamo.fechaEntrega = Object.values(this.prestamoLibroFormGroup.getRawValue())[0];
    this.listaGuardarPrestamo.fechaDev = Object.values(this.prestamoLibroFormGroup.getRawValue())[1];
    this.listaGuardarPrestamo.idLibro = Object.values(this.prestamoLibroFormGroup.getRawValue())[2];
    this.listaGuardarPrestamo.observacion = Object.values(this.prestamoLibroFormGroup.getRawValue())[3];

    this.libroService.createPrestamoLibro(this.listaGuardarPrestamo).subscribe(value => {
      this._snackBar.open('registrado exitosamente', 'ACEPTAR');
      //this.vaciarFormulario();
      //this.listarEventoSinParticipantes();
      //this.mostrarLista();
    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      //this.loaderGuardar=false
    })

  }




}

