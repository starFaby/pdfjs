import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import kjua from 'kjua';
import { Router, NavigationEnd } from '@angular/router';
import { PdfviewService } from 'src/app/services/pdfview.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  urlSafe: SafeResourceUrl;
  prueba;
  navigationSubscription;
  public facturaReport: any;
  public doc;
  datos: boolean;
  pipe = new DatePipe('en-US'); // Use your own locale
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'dd-MM-yyyy h:mm a ');
  totalPagesExp = '{total_pages_count_string}';
  getBarcodeData(text: string, size = 900) {
    return kjua({
      render: 'canvas',
      crisp: true,
      minVersion: 1,
      ecLevel: 'Q',
      size,
      ratio: undefined,
      fill: '#333',
      back: '#fff',
      text,
      rounded: 10,
      quiet: 2,
      mode: 'plain',
      mSize: 5,
      mPosX: 50,
      mPosY: 100,
      fontname: 'sans-serif',
      fontcolor: '#3F51B5',
      image: undefined
    });
  }
  constructor(
    private router: Router,
    private pdfviewService: PdfviewService) {
    this.datos = false;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        /*  this.id = atob(this.route.snapshot.params.id);
          this.nivel = atob(this.route.snapshot.params.nivel);
          this.periodo = atob(this.route.snapshot.params.periodo);
          this.carrera = atob(this.route.snapshot.params.carrera);*/
        // this.getHistoriabyid(this.id, this.nivel, this.periodo, this.carrera);
      }
    });
  }
  pageInit(e: HTMLElement) {
    e.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    // this.onGetNumFactura();
    this.PdfViewer();

  }
  onGetNumFactura() {
    /* const id = 1;
     this.pdfviewService.getCedula().subscribe(
       res => {
         console.log(res);
         this.PdfViewer();
       },
       err => {
         console.log(err);
       }
     )*/

  }
  objectKey(obj) {
    return Object.keys(obj);
  }
  formatedCerts() {
    return this.facturaReport.reduce((prev, now) => {
      if (!prev[now.factura]) {
        prev[now.periodo] = [];
      }

      prev[now.factura].push(now);
      return prev;
    }, {});
  }
  getColumns() {
    const columns = [
      { title: 'CÓDIGO', dataKey: 'codigo' },
      { title: 'ASIGNATURAS', dataKey: 'asignaturas' },
      { title: 'CAMPUS', dataKey: 'campus' },
      { title: 'NIVEL CAPP', dataKey: 'nivel_asignatura' },
      { title: 'CREDITOS', dataKey: 'creditos' }
    ];
    return columns;
  }
  getheaderStyles() {
    const headerStyle = {
      fillColor: [200, 255, 255],
      textColor: 0,
      fontSize: 8
    };
    return headerStyle;
  }
  getbodyStyles() {
    const bodyStyle = {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 8
    };
    return bodyStyle;
  }
  getalternateRowStyles() {
    const alternateRowStyle = {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 8
    };
    return alternateRowStyle;
  }
  PdfViewer() {
    this.doc = new jsPDF('p', 'pt');
    this.doc.setFont('helvetica');
    this.doc.setFontSize(10);
    this.doc.setFontStyle('bold');
    this.doc.text('Hellow mundo', 45, 165);
    const pageHeight =
      this.doc.internal.pageSize.height ||
      this.doc.internal.pageSize.getHeight();
    this.doc.text(this.myFormattedDate, 490, pageHeight - 15);
  }
  dowload() {
    this.doc.save('joder1');
  }
  viewPdf() {
    this.prueba = this.doc.output('datauristring');
  }
}
