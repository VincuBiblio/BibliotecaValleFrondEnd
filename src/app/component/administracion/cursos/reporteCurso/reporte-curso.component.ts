import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as XLSX from "xlsx";
import {CursoService} from "../../../../services/curso.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Curso, ReporteCurso} from "../../../../models/curso";
import {DatePipe} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {PersonaCliente} from "../../../../models/personaCliente";
import {UsuarioService} from "../../../../services/usuario.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporteCurso',
  templateUrl: './reporte-curso.component.html',
  styleUrls: ['./reporte-curso.component.css']
})
export class ReporteCursoComponent implements OnInit {

  cargar:boolean;

  reporteCurso:ReporteCurso=new ReporteCurso();

  curso: Curso[] = [];
  myControl = new FormControl();
  dataCursos?: Observable<Curso[]>;

  constructor(private cursoService:CursoService,
              private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.filterAnio('')
  }

  filterAnio(anio:any){
    this.cargar=true;
    var pipe: DatePipe = new DatePipe('en-US')
    if(anio!=''){
      console.log(anio.target.value)
      this.cursoService.getAllCurso().subscribe(value => {
        console.log(this.curso = value.filter(value1 => pipe.transform(value1.fechaFin,'YYYY')==anio.target.value))
        this.curso = value.filter(value1 => pipe.transform(value1.fechaFin,'YYYY')==anio.target.value);
        this.dataCursos = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.cargar=false;
      })
    } else {
      this.cursoService.getAllCurso().subscribe(value => {
        this.curso = value;
        this.dataCursos = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.cargar=false;
      })
    }
  }

  filter(value: any): Curso[] {
    var pipe: DatePipe = new DatePipe('en-US')
    const filterValue = value.toLowerCase();
    return this.curso.filter(option => option.nombre?.toLowerCase().includes(filterValue)
    );
  }


  consultaDatos(select: MatSelect){
    this.cargar=true;
    this.cursoService.getReporteCurso(select.value.idCurso).subscribe(value => {
      this.reporteCurso=value
      this.reporteCurso.porcent_Femenino=Math.round(value.porcent_Femenino)
      this.reporteCurso.porcent_Masculino=Math.round(value.porcent_Masculino)
      this.reporteCurso.porcent_Otro=Math.round(value.porcent_Otro)
      this.cargar=false;
    })
  }

  generatePDF(select: MatSelect) {
    this.cargar=true;
    var pipe: DatePipe = new DatePipe('en-US')
    var dia: String = new Date().toISOString();
    this.usuarioService.getAllUsuarios().subscribe(valueb =>{
      this.cursoService.getReporteCurso(select.value.idCurso).subscribe(async value => {
        const pdfDefinition: any = {
          content: [
            {image: await this.getBase64ImageFromURL('assets/images/LogoValleNegro.png'), width: 100},
            {
              text: '_________________________________________________________________________________________',
              alignment: 'center'
            },
            // @ts-ignore
            {text: pipe.transform(dia, 'MMMM d, y'), alignment: 'right'},
            {text: 'REPORTE DE CURSOS', fontSize: 15, bold: true, alignment: 'center'},
            {text: 'Curso de ' + select.value.nombre, fontSize: 15, margin: [0, 0, 20, 0]},
            {text: '    '},
            {text: 'Nombre del responsable: ' + select.value.responsable},
            {text: '    '},
            {text: 'Lugar donde se llevara a cabo: ' + select.value.lugar},
            {text: '    '},
            {text: 'REPORTE POR GENERO'},
            {
              table: {
                headerRows: 1,
                widths: ['34,4%', '33,4%', '33,4%'],
                body: [
                  ['CUADRO DE DATOS SEGÚN EL GÉNERO', 'Nº', '%'],
                  ['MASCULINO', value.n_Masculino, Math.round(value.porcent_Masculino) + '%'],
                  ['FEMENINO', value.n_Femenino, Math.round(value.porcent_Femenino) + '%'],
                  ['OTRO', value.n_Otro, Math.round(value.porcent_Otro) + '%'],
                  ['TOTAL', value.total, '100%'],
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
          ]
        }
        this.cargar = false;
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


}
