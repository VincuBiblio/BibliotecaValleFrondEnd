import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporteComputo',
  templateUrl: './reporte-computo.component.html',
  styleUrls: ['./reporte-computo.component.css']
})
export class ReporteComputoComponent implements OnInit {

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

  seleccion:String;
  select(arr){
    this.seleccion=arr.value;
  }

}
