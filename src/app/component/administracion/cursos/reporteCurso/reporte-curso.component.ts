import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as XLSX from "xlsx";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporteCurso',
  templateUrl: './reporte-curso.component.html',
  styleUrls: ['./reporte-curso.component.css']
})
export class ReporteCursoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatePDF() {
    let docDefinition = {
      header: 'C#Corner PDF Header',
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
    };

    pdfMake.createPdf(docDefinition).open();
  }


}
