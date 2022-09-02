import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';
import {ClienteService} from "../../../services/cliente.service";
import {UbicacionService} from "../../../services/ubicacion.service";
import {PersonaUsuario} from "../../../models/personaUsuario";
import {PersonaCliente} from "../../../models/personaCliente";
import {DatePipe} from "@angular/common";
import {UsuarioService} from "../../../services/usuario.service";


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
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  loaderActualizar:boolean;

  displayedColumns: string[] = ['id', 'cedula', 'nombres', 'apellidos','edad','genero','email','telefono','discapacidad','editar'];
  dataSource: MatTableDataSource<PersonaCliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ubicacionService: UbicacionService,
              private clienteService: ClienteService,
              private usuarioService:UsuarioService) {
  }

  ngOnInit(): void {
    this.listarClientes()
  }


  listarClientes(){
    this.loaderActualizar=true
    this.clienteService.getAllClientes().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaderActualizar=false
    })
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



  generatePDF() {
    this.loaderActualizar=true
    var pipe: DatePipe = new DatePipe('en-US')
    var dia: String = new Date().toISOString();
    this.clienteService.getAllClientes().subscribe( value => {
      this.usuarioService.getAllUsuarios().subscribe(async valueb => {
        const pdfDefinition: any = {
          content: [
            {image: await this.getBase64ImageFromURL('assets/images/LogoValleNegro.png'), width: 100},
            {
              text: '_________________________________________________________________________________________',
              alignment: 'center'
            },
            // @ts-ignore
            {text: pipe.transform(dia, 'MMMM d, y'), alignment: 'right'},
            {text: 'CLIENTES REGISTRADOS', fontSize: 15, bold: true, alignment: 'center'},
            {text: 'Clientes que han usado la biblioteca', fontSize: 15, margin: [0, 0, 20, 0]},
            {text: '    '},
            {
              table: {
                headerRows: 1,
                widths: ['2%', '11,1%', '11,1%', '11,1%', '11,1%', '11,1%', '17,2%', '11,1%', '15,2%'],
                body: [
                  ['ID', 'CEDULA', 'NOMBRES', 'APELLIDOS', 'FECHA DE NACIMIENTO', 'GENERO', 'CORREO', 'TELEFONO', 'DISCAPACIDAD'],
                  [value.map(function (item) {
                    return item.id + ''
                  }),
                    value.map(function (item) {
                      return item.cedula + ''
                    }),
                    value.map(function (item) {
                      return item.nombres + ''
                    }),
                    value.map(function (item) {
                      return item.apellidos + ''
                    }),
                    value.map(function (item) {
                      return item.fechaNacimiento + ''
                    }),
                    value.map(function (item) {
                      return item.genero + ''
                    }),
                    value.map(function (item) {
                      return item.email + ''
                    }),
                    value.map(function (item) {
                      return item.telefono + ''
                    }),
                    value.map(function (item) {
                      return (item.discapacidad == true) ? 'SI' : 'NO'
                    })
                  ],

                ]
              }

            },
            {text: '    '},
            {text: '    '},
            {
              table: {
                headerRows: 1,
                widths: ['100%'],
                body: [
                  ['BIBLIOTECARIO/A: ' + valueb.filter(value1 => value1.idRol == 1).pop().apellidos + ' ' + valueb.filter(value1 => value1.idRol == 1).pop().nombres],
                  ['Firma:']
                ]
              },
            }
          ],
          pageOrientation: 'landscape',
        }
        this.loaderActualizar = false
        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
      })
    })
  }


  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  exportToExcel(): void {
    let element = document.getElementById('table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, 'Lista de Clientes.xlsx');
  }

}

/** Builds and returns a new User. */
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
  };
}
