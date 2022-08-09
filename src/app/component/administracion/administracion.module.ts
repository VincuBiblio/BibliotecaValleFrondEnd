import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'bienvenida',
    component: BienvenidaComponent
  }
]

@NgModule({
  declarations: [
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class AdministracionModule { }
