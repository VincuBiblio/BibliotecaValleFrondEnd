import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { PersonaCliente } from 'src/app/models/personaCliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Impresion_Copia } from 'src/app/models/impresion-copia';
import { Impresion_CopiaService } from 'src/app/services/impresion-copia.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-nuevo-uso-impresion-copia',
  templateUrl: './nuevo-uso-impresion-copia.component.html',
  styleUrls: ['./nuevo-uso-impresion-copia.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NuevaUsoImpresionCopiaComponent implements OnInit {


  public clienteLista: PersonaCliente[] = [];

  public idCliente: any;
  public cardClienteMensaje: Boolean = true;
  public cardCliente: Boolean = false;

  public divNuevo: Boolean = true;
  public divListar: Boolean = false;

  public impresionListaGuardar: Impresion_Copia = new Impresion_Copia();

  formCliente: FormGroup;

  public valorColor: number = 0;
  public valorBlanco: number = 0;
  public valorTotal: number = 0;

  public Hoy = new Date();


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
    private impresion_copiaService: Impresion_CopiaService,) { }

  ngOnInit(): void {
    this.listarClientes();
    this.cargarTotal();
  }

  public mostrarLista() {
    this.divListar = true;
    this.divNuevo = false;
  }

  public mostrarNuevo() {
    this.divListar = false;
    this.divNuevo = true;
  }

  prueba(valor: any) {
    alert(valor);
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

  formGroupImpresion = this._formBuilder.group({
    fecha: new FormControl<any>('', [Validators.required]),
    color: new FormControl<any>('', [Validators.required]),
    blanconegro: new FormControl<any>('', [Validators.required]),
  })



  secondFormGroup = this._formBuilder.group({
    cedula: new FormControl<String>('', [Validators.required]),
    nombres: new FormControl<String>('', [Validators.required]),
    edad: new FormControl<any>('', [Validators.required]),
    email: new FormControl<String>('', [Validators.required]),
    direccion: new FormControl<String>('', [Validators.required]),
    representante: new FormControl<String>('', [Validators.required]),
  });

  formTotalPaginas = this._formBuilder.group({
    total: new FormControl<any>('', [Validators.required]),
  })

  cargarTotal() {
    this.formTotalPaginas.setValue({
      total: Number(this.valorTotal),
    })
  }


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

    this.formGroupImpresion.setValue({
      fecha: this.Hoy,
      color: "",
      blanconegro: "",
    })
  }

  //Guardar
  guardarImpresion() {

    this.impresionListaGuardar.idCliente = this.idCliente;
    this.impresionListaGuardar.fecha = Object.values(this.formGroupImpresion.getRawValue())[0];
    this.impresionListaGuardar.pagColor = Object.values(this.formGroupImpresion.getRawValue())[1];
    this.impresionListaGuardar.pagBlanco = Object.values(this.formGroupImpresion.getRawValue())[2];

    //console.log(this.impresionListaGuardar.pagBlanco);

    this.impresion_copiaService.createImpresionCopia(this.impresionListaGuardar).subscribe(value => {
      this._snackBar.open('Impresión Copia creado', 'ACEPTAR');
      this.vaciarFormulario();
      this.cardCliente=false;
      this.mostrarLista();
      this.cargaDatoTotal(0,0);
      
    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      //this.loaderGuardar=false
    })


  }

  vaciarFormulario() {
    this.formGroupImpresion.setValue({
      fecha: "",
      color: "",
      blanconegro: "",
    })
  }

  sumaTotal(event: Event, condi: number) {

    if (condi == 1) {
      this.valorColor = Number((event.target as HTMLInputElement).value);
    } else {
      if (condi == 2) {
        this.valorBlanco = Number((event.target as HTMLInputElement).value);
      }
    }

    this.cargaDatoTotal(this.valorColor, this.valorBlanco);

  }

  cargaDatoTotal(val1:number,val2:number) {
    this.formTotalPaginas.setValue({
      total: Number(val1+val2),
    })
  }
}

