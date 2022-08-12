
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';


export interface PeriodicElementComputo {
  codigo: string;
  procesador: string;
  ram: string;
}



export interface PeriodicElementCliente {
  cedula: string;
  nombre: string;
  edad: string;
}

const ELEMENT_DATA_CLIENTE: PeriodicElementCliente[] = [
  { cedula: '0126578945', nombre: 'Juan Andrade', edad: '18' },
  { cedula: '01048974569', nombre: 'Alisson Cardenas', edad: '19' },
  { cedula: '0156789412', nombre: 'Adriana Arevalo', edad: '8' },
  { cedula: '0108745689', nombre: 'Amalia Nieto', edad: '40' },
  { cedula: '0198745648', nombre: 'Jose Bermeo', edad: '30' },
  { cedula: '01897456987', nombre: 'Marco Polo', edad: '15' },

];

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
export class NuevaPrestamoComputoComponent {

  formCliente: FormGroup;

  public dialogoCliente: boolean;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = true;

  constructor(private _formBuilder: FormBuilder) { }

  prueba(valor: any) {
    alert(valor);
  }
  openDialog(){
    this.dialogoCliente=true;
  }

  closeDialog(){
    this.dialogoCliente=false;
  }

  //////////////////////////////////////////////////
  //LISTAR CURSOS
  displayedColumnsComputo: string[] = ['codigo'];
  dataSourceComputo = new MatTableDataSource(ELEMENT_DATA_COMPUTO);

  applyFilterComputo(event: Event) {
    const filterValueComputo = (event.target as HTMLInputElement).value;
    this.dataSourceComputo.filter = filterValueComputo.trim().toLowerCase();
  }


  //////////////////////////////////////////////////
  //LISTAR CLIENTE
  displayedColumnsCliente: string[] = ['cedula'];
  dataSourceCliente = new MatTableDataSource(ELEMENT_DATA_CLIENTE);

  applyFilterCliente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();
  }

}



