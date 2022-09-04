import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { PersonaCliente } from 'src/app/models/personaCliente';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComputoService } from 'src/app/services/computo.service';
import { Computo } from 'src/app/models/computo';
import Swal from "sweetalert2";
import { ClienteComputador } from 'src/app/models/cliente-computador';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-nuevo-prestamo-computo',
  templateUrl: './prestamo-computo.component.html',
  styleUrls: ['./prestamo-computo.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class PrestamoComputoComponent implements OnInit {

  public clienteComputadorGuardar: ClienteComputador = new ClienteComputador();
  public clienteLista: PersonaCliente[] = [];

  public idCliente: any;
  public idComputador: any;
  public cardClienteMensaje: Boolean = true;
  public cardCliente: Boolean = false;
  public cardComputo: Boolean = false;


  public divNuevo: Boolean = true;
  public divListar: Boolean = false;

  //ojo borraar el true
  public controlbotonSiguiente: Boolean = true;
  public controlmensajeSiguiente: Boolean;

  public mensajeSinCupos: String = "SIN CUPOS"
  public mensajeSinCuposGuardar: String = "SIN CUPOS";

  formCliente: FormGroup;

  public dialogoCliente: boolean;


  //COMPUTO
  public listaInicialComputo: Computo[] = [];
  public ComputoLista: Computo[] = [];


  //OTROS
  public Hoy = new Date();
  public today = new Date();

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup1 = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private computoService: ComputoService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarComputadoras();
    this.listarClientes();
  }



  openDialog() {
    this.dialogoCliente = true;
  }

  closeDialog() {
    this.dialogoCliente = false;
  }

  public mostrarLista() {
    this.divListar = true;
    this.divNuevo = false;
  }

  public mostrarNuevo() {
    this.divListar = false;
    this.divNuevo = true;
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

  compuFormGroup = this._formBuilder.group({
    numero: new FormControl<String>('', [Validators.required]),
    ram: new FormControl<String>('', [Validators.required]),
    discoDuro: new FormControl<String>('', [Validators.required]),
    procesador: new FormControl<String>('', [Validators.required]),
  })

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

  //////////////////////////////////////////////////
  //LISTAR COMPUTO
  displayedColumnsComputo: string[] = ['codigo'];
  dataSourceComputo = new MatTableDataSource<Computo>;
  //dataSourceComputo = new MatTableDataSource(ELEMENT_DATA_COMPUTO);


  //COMPUTO
  listarComputadoras() {
    this.computoService.getAllComputo().subscribe(value => {
      this.listaInicialComputo = value;
      console.log("Computadoras listado correctamente");
      console.log(value);

      this.dataSourceComputo = new MatTableDataSource(this.listaInicialComputo);
      this.dataSourceComputo.paginator = this.paginator;
      this.dataSourceComputo.sort = this.sort;
      console.log("Listado talleres generado exitosamente");

    })



  }

  applyFilterComputo(event: Event) {
    const filterValueComputo = (event.target as HTMLInputElement).value;
    this.dataSourceComputo.filter = filterValueComputo.trim().toLowerCase();
  }

  cargarDatosCompudaror(id: any) {
    this.idComputador = id;
    this.cardComputo = true;
    for (var i = 0; i < this.listaInicialComputo.length; i++) {

      if (this.listaInicialComputo[i].id == this.idComputador) {
        this.compuFormGroup.setValue({

          numero: this.listaInicialComputo[i].numero,
          ram: this.listaInicialComputo[i].ram,
          discoDuro: this.listaInicialComputo[i].discoDuro,
          procesador: this.listaInicialComputo[i].procesador,

        })

        console.log("Datos computo cargado correctamente");
      }

    }

  }


  //GUARDAR

  guardarClienteComputo() {
    Swal.fire({
      title: "¿Quiere añadir una observación?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      background: '#f7f2dc',
      confirmButtonColor: '#f47f16',
      cancelButtonColor: '#d33',
      backdrop: false
    })
      .then(resultado => {
        if (resultado.value) {

          Swal.fire({
            title: "Ingrese una observación",
            input: "text",

            inputAttributes: {
              autocapitalize: 'off'
            },

            showLoaderOnConfirm: true,

            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            background: '#f7f2dc',
            confirmButtonColor: '#a01b20',
            backdrop: false


          })
            .then(resultado => {
              if (resultado.value) {
                this.clienteComputadorGuardar.descripcion = resultado.value;
                this.guardarDatosClienteComputo();
              } else {
                this._snackBar.open("ERROR Debe de ingresar una observación", 'ACEPTAR');
              }
            });

        } else {
          this.clienteComputadorGuardar.descripcion = "Sin observación";
          this.guardarDatosClienteComputo();
        }
      });
  }

  guardarDatosClienteComputo() {
    this.clienteComputadorGuardar.idCliente = this.idCliente;
    this.clienteComputadorGuardar.idInventario = this.idComputador;
    this.clienteComputadorGuardar.horaFin = "0";
    this.clienteComputadorGuardar.horaInicio = this.today.toLocaleTimeString();

    this.computoService.createClienteComputador(this.clienteComputadorGuardar).subscribe(value => {
      this._snackBar.open('Se ha guardardo exitosamente', 'ACEPTAR');
      this.mostrarLista();
      this.cardComputo=false;
      //this.vaciarFormulario();
      //this.botonParaGuardar = true;
      //this.botonParaEditar = false;
      //this.listarEventoSinParticipantes()
    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      //this.loaderGuardar=false
    })

  }


}



