import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../material/material.module";
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';

const routes: Routes = [
  {
    path: 'iniciosesion',
    component:IniciosesionComponent
  }
]


@NgModule({
  declarations: [
    IniciosesionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
