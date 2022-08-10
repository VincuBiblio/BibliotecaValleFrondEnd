import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

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



export interface UserData {
    id: string;
    name: string;
    progress: string;
    fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
    'blueberry',
    'lychee',
    'kiwi',
    'mango',
    'peach',
    'lime',
    'pomegranate',
    'pineapple',
];
const NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth',
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
        /*
        // Create 100 users
        const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);*/
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

    /////////////////////////////////////////////////////////////////////

    /*
        //LISTAR EN TABLA
        displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
        dataSource: MatTableDataSource<UserData>;
    
        // @ts-ignore
        @ViewChild(MatPaginator) paginator: MatPaginator;
        // @ts-ignore
        @ViewChild(MatSort) sort: MatSort;
    
       
    
        ngAfterViewInit() {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    
        applyFilter(event: Event) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.dataSource.filter = filterValue.trim().toLowerCase();
    
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }
    
    function createNewUser(id: number): UserData {
        const name =
            NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
            ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
            '.';
    
        return {
            id: id.toString(),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
        };*/
}
