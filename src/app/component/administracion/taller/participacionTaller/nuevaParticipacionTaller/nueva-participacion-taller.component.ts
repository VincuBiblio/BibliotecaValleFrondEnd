
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';


export interface PeriodicElementTaller {
  nombreTaller: string;
  fecha: string;
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

const ELEMENT_DATA_TALLER: PeriodicElementTaller[] = [
  { nombreTaller: 'creativos', fecha: '20/08/2022' },
  { nombreTaller: 'Pintura',  fecha: '24/08/2022' },
  { nombreTaller: 'construcción', fecha: '02/08/2022' },
  { nombreTaller: 'cuentacuentos',  fecha: '14/08/2022' },
  { nombreTaller: 'musica',  fecha: '16/08/2022' },
  { nombreTaller: 'baile', fecha: '19/08/2022' },

];

@Component({
  selector: 'app-nueva-participacion-taller',
  templateUrl: './nueva-participacion-taller.component.html',
  styleUrls: ['./nueva-participacion-taller.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NuevaParticipacionTallerComponent {

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
  //LISTAR Taller
  displayedColumnsTaller: string[] = ['nombreTaller'];
  dataSourceTaller = new MatTableDataSource(ELEMENT_DATA_TALLER);

  applyFilterTaller(event: Event) {
    const filterValueTaller = (event.target as HTMLInputElement).value;
    this.dataSourceTaller.filter = filterValueTaller.trim().toLowerCase();
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

