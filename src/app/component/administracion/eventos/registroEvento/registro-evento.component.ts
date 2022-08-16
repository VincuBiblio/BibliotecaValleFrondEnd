
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';


export interface PeriodicElementEvento {
  nombreEvento: string;
  fecha: string;
}


const ELEMENT_DATA_EVENTO: PeriodicElementEvento[] = [
  { nombreEvento: 'creativos', fecha: '20/08/2022' },
  { nombreEvento: 'Pintura', fecha: '24/08/2022' },
  { nombreEvento: 'construcción', fecha: '02/08/2022' },
  { nombreEvento: 'cuentacuentos', fecha: '14/08/2022' },
  { nombreEvento: 'musica', fecha: '16/08/2022' },
  { nombreEvento: 'baile', fecha: '19/08/2022' },

];

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class registroEventoComponent  {

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
 
  //////////////////////////////////////////////////
  //LISTAR Taller
  displayedColumnsEvento: string[] = ['nombreEvento'];
  dataSourceEvento = new MatTableDataSource(ELEMENT_DATA_EVENTO);

  applyFilterTaller(event: Event) {
    const filterValueEvento = (event.target as HTMLInputElement).value;
    this.dataSourceEvento.filter = filterValueEvento.trim().toLowerCase();
  }


}

