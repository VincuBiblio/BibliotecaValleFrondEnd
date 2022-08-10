import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";


import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

export interface PeriodicElement {
    curso: string;
    responsable:string;
    fecha:string;
}

const ELEMENT_DATA_CURSO: PeriodicElement[] = [
    { curso: 'Manualidades',responsable:'Franklin Dominguez',fecha:'20/08/2022' },
    { curso: 'Pintura',responsable:'Alexandra Vanegas',fecha:'24/08/2022' },
    { curso: 'Cocina',responsable:'Santiago Yanque',fecha:'02/08/2022' },
    { curso: 'Colonia Vacacional',responsable:'Karen Picon',fecha:'14/08/2022' },
    { curso: 'Gatronomia',responsable:'Xavier Sucre',fecha:'16/08/2022' },
    { curso: 'Computación',responsable:'Abdon Gallegos',fecha:'19/08/2022' },
    { curso: 'Filosofia',responsable:'Fabian Carrion',fecha:'21/08/2022' },

];




@Component({
    selector: 'app-inscripcion-curso',
    templateUrl: './inscripcion-curso.component.html',
    styleUrls: ['./inscripcion-curso.component.css'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true },
        },
    ],


})

export class InscripcionCursoComponent implements OnInit {


    constructor(
        private _formBuilder: FormBuilder
    ) {
        
    }

    ngOnInit(): void {
    }

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });

    prueba(valor:any){
        alert(valor);
    }
    //////////////////////////////////////////////////
    //LISTAR CURSOS
    displayedColumnsCurso: string[] = ['curso'];
    dataSourceCurso = new MatTableDataSource(ELEMENT_DATA_CURSO);

    applyFilterCurso(event: Event) {
        const filterValueCurso = (event.target as HTMLInputElement).value;
        this.dataSourceCurso.filter = filterValueCurso.trim().toLowerCase();
    }

    
}
