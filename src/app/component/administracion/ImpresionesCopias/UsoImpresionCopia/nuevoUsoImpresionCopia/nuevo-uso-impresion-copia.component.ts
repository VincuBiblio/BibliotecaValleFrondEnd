
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';


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
export class NuevaUsoImpresionCopiaComponent {

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
  //LISTAR CLIENTE
  displayedColumnsCliente: string[] = ['cedula'];
  dataSourceCliente = new MatTableDataSource(ELEMENT_DATA_CLIENTE);

  applyFilterCliente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();
  }

}



