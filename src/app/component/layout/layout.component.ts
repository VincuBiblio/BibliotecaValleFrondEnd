import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonaUsuario} from "../../models/personaUsuario";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showFiller = false;
  panelOpenState = false;
  persona:PersonaUsuario = new PersonaUsuario();

  constructor(private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    try {
      JSON.parse(sessionStorage['personausuario']);
      if(JSON.parse(sessionStorage['personausuario'])==''){
        this.router.navigate(['auth/iniciosesion']).then(() => {
          this._snackBar.open('ERROR NO HA INCIADO SESION', 'ACEPTAR');
        });
      }else {
        this.persona=JSON.parse(sessionStorage['personausuario']);
        this._snackBar.open('Bienvenido/a '+ this.persona.nombres, 'ACEPTAR');
      }
    }catch (e) {
      this.router.navigate(['auth/iniciosesion']).then(() => {
        this._snackBar.open('ERROR NO HA INCIADO SESION', 'ACEPTAR');
      });
    }
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.removeItem("personausuario");
    sessionStorage.setItem('personausuario', JSON.stringify(""));
    this.router.navigate(['auth/iniciosesion']).then(() => {
    });
  }

}
