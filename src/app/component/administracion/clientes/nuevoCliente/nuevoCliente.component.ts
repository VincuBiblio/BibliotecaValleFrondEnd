import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-nuevoCliente',
    templateUrl: './nuevoCliente.component.html',
    styleUrls: ['./nuevoCliente.component.css'],


})

export class nuevoClienteComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {

    }

    formGrupos = new FormGroup({
        cedula: new FormControl<String>('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]+")]),
        apellidos: new FormControl<String>('', [Validators.required]),
        nombres: new FormControl<String>('', [Validators.required]),
        // @ts-ignore
        fechaNacimiento: new FormControl<Date>(null, [Validators.required]),
        genero: new FormControl<String>('', [Validators.required]),
        telefono: new FormControl<String>('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]+")]),
        email: new FormControl<String>('', [Validators.required, Validators.email]),
        estadoCivil: new FormControl<String>('', [Validators.required]),
        // @ts-ignore
        discapacidad: new FormControl<boolean>(null, [Validators.required]),
        barrio: new FormControl<String>('', [Validators.required]),
        // @ts-ignore
        idCanton: new FormControl<Number>(null, [Validators.required]),
        // @ts-ignore
        idProvincia: new FormControl<Number>(null, [Validators.required]),
        // @ts-ignore
        idParroquia: new FormControl<Number>(null, [Validators.required]),
        telefonoreponsable: new FormControl<String>('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]+")]),
        nombresreposable: new FormControl<String>('', [Validators.required]),
      })
    
    
      guardarCliente() {
        console.log(this.formGrupos.getRawValue())
      }
}