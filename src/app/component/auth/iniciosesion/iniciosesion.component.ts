import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InicioSesionService} from "../../../services/inicioSesion.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {

  hide = true;
  iniciobar:boolean;

  constructor(private inicioSesionService:InicioSesionService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  formGroup = new FormGroup({
    clave: new FormControl<String>('', [Validators.required]),
    email: new FormControl<String>('', [Validators.required,Validators.email])
  })


  iniciarsesion(){
    this.iniciobar=true
    this.inicioSesionService.loginUsuario(this.formGroup.getRawValue()).subscribe(value => {
      this._snackBar.open('SESION INICIADA', 'ACEPTAR');
      sessionStorage.clear()
      sessionStorage.setItem('personausuario', JSON.stringify(value));
      this.router.navigate(['/panel/biblioteca/bienvenida']);
      this.iniciobar=false

    },error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      this.iniciobar=false
    })
  }

}
