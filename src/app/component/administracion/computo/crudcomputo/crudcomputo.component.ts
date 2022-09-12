import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ComputoService} from "../../../../services/computo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Computo} from "../../../../models/computo";

@Component({
  selector: 'app-crudcomputo',
  templateUrl: './crudcomputo.component.html',
  styleUrls: ['./crudcomputo.component.css']
})
export class CrudcomputoComponent implements OnInit {

  loaderGuardar: boolean;
  loaderActualizar: boolean;
  arrayestado:string[]=['Activo','Inactivo'];
  displayedColumns: string[] = ['id', 'Estado', 'numero', 'acciones'];
  dataSource: MatTableDataSource<Computo>;
  selected = new FormControl(0);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private computoService:ComputoService,
              private _snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.listarCursos();
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  formGrupos = new FormGroup({
    numero: new FormControl<String>('', [Validators.required]),
    estado: new FormControl<boolean>(null, [Validators.required]),
    procesador: new FormControl<String>('', [Validators.required]),
    ram: new FormControl<String>('', [Validators.required]),
    discoDuro: new FormControl<String>('', [Validators.required]),
  })


  guardarCliente() {
    console.log(this.formGrupos.getRawValue())
    this.computoService.createComputo(this.formGrupos.getRawValue()).subscribe(value => {
      this._snackBar.open('Computo registrado', 'ACEPTAR');
      this.selected.setValue(2)
      this.listarCursos()
      this.vaciarFormulario()

      this.loaderGuardar = false
    }, error => {
      this._snackBar.open(error.error.message, 'ACEPTAR');
      this.loaderGuardar = false
    })
  }


  vaciarFormulario() {
    this.formGrupos.setValue({
      numero: undefined,
      estado: false,
      procesador: undefined,
      ram: undefined,
      discoDuro: undefined
    })
  }

  listarCursos() {
    this.loaderActualizar=true
    this.computoService.getAllComputo().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaderActualizar = false

    })
  }

}

