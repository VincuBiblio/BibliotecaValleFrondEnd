
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


export interface PeriodicElementComputo {
  codigo: string;
  procesador: string;
  ram: string;
}



const ELEMENT_DATA_COMPUTO: PeriodicElementComputo[] = [
  { codigo: '1', procesador: 'Core™ i7-11700K', ram: '4RAM' },
  { codigo: '2', procesador: 'Core™ i7-11700K', ram: '8RAM' },
  { codigo: '3', procesador: 'Core™ i7-11700K', ram: '8RAM' },
  { codigo: '4', procesador: 'Core™ i7-11700K', ram: '8RAM' },
  { codigo: '5', procesador: 'Core™ i7-11700K', ram: '8RAM' },


];

@Component({
  selector: 'app-nuevo-prestamo-computo',
  templateUrl: './nuevo-prestamo-computo.component.html',
  styleUrls: ['./nuevo-prestamo-computo.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NuevaPrestamoComputoComponent implements OnInit {

  public clienteLista: PersonaCliente[] = [];

  public idCliente: any;
  public cardClienteMensaje: Boolean = true;
  public cardCliente: Boolean = false;

  //ojo borraar el true
  public controlbotonSiguiente: Boolean=true;
  public controlmensajeSiguiente: Boolean;

  public mensajeSinCupos: String = "SIN CUPOS"
  public mensajeSinCuposGuardar: String = "SIN CUPOS";

  formCliente: FormGroup;

  public dialogoCliente: boolean;


  //COMPUTO
  public listaInicialCurso:Computo[]=[];
  public ComputoLista:Computo[]=[];


  //OTROS
public Hoy = new Date();


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
  ) { }

  ngOnInit(): void {
    this.listarComputadoras();
    this.listarClientes();
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

  //////////////////////////////////////////////////
  //LISTAR CURSOS
  displayedColumnsComputo: string[] = ['codigo'];
  dataSourceComputo = new MatTableDataSource(ELEMENT_DATA_COMPUTO);

  applyFilterComputo(event: Event) {
    const filterValueComputo = (event.target as HTMLInputElement).value;
    this.dataSourceComputo.filter = filterValueComputo.trim().toLowerCase();
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


  //COMPUTO
  listarComputadoras() {
    this.computoService.getAllComputo().subscribe(value => {
      this.listaInicialCurso = value;
      console.log(value);


      /*
      var AnyoHoy = this.Hoy.getFullYear();
      var MesHoy = this.Hoy.getMonth() + 1;
      var DiaHoy = this.Hoy.getDate();
      for (var i = 0; i < this.listaInicialTaller.length; i++) {

        let cadena = this.listaInicialTaller[i].fechaMaxInscripcion;
        let palabra = cadena.split('-')

        var AnyoFecha = palabra[0];
        var MesFecha = palabra[1];
        var DiaFecha = palabra[2];


        //console.log(DiaFecha);

        if (AnyoFecha < AnyoHoy) {

        }
        else {
          if (AnyoFecha == AnyoHoy && MesFecha < MesHoy) {

          }
          else {
            if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha < DiaHoy) {

            }
            else {
              if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {

                this.tallerLista.push(this.listaInicialTaller[i]);
              }
              else {

                this.tallerLista.push(this.listaInicialTaller[i]);

              }
            }
          }
        }



      }*/

      /*
      this.dataSourceTaller = new MatTableDataSource(this.ComputoLista);
      this.dataSourceTaller.paginator = this.paginator;
      this.dataSourceTaller.sort = this.sort;
      console.log("Listado talleres generado exitosamente");
      console.log(this.tallerLista)*/
    })



  }
  

}



