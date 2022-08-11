import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
@Component({
  selector: 'app-reporteCurso',
  templateUrl: './reporte-curso.component.html',
  styleUrls: ['./reporte-curso.component.css']
})
export class ReporteCursoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.graficar()
  }

  graficar() {
    // Create the chart
    // @ts-ignore
    Highcharts.chart(document.getElementById('container') | null, {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Usuarios de Enero, 2022'
      },
      subtitle: {
        align: 'left',
        text: 'Usuarios que usaron la biblioteca por género'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total de usuarios'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> en total<br/>'
      },

      series: [{
        name: "Usuarios",
        colorByPoint: true,
        data: [{
          name: "MASCULINO",
          y: 40,
        },
          {
            name: "FEMENINO",
            y: 40,
          },
          {
            name: "OTRO",
            y: 40,
          }
        ]
      }]
    });
  }

}

