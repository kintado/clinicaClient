import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, Renderer2, RendererFactory2 } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';



import jsPDF from 'jspdf';
import { ProductOperationsManComponent } from '../product-operations-man/product-operations-man.component';
import * as JsBarcode from 'jsbarcode';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Alignment } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


declare var getBarcodeType: any;

/*
import 'jspdf-autotable';


*/
@Component({
  selector: 'app-barcodeforprint',
  templateUrl: './barcodeforprint.component.html',
  styleUrls: ['./barcodeforprint.component.css']
})

export class BarcodeforprintComponent implements AfterViewInit {
  private renderer: Renderer2;
  @ViewChild('content', { static: false }) content: ElementRef | undefined;
  @ViewChild('barcodeimg', { static: false }) barcodeimg: ElementRef | undefined;
  @ViewChild('pdfprintpage', { static: false }) pdfprintpage: ElementRef | undefined;
  @ViewChild('printpagepreview', { static: false }) printpagepreview: ElementRef | undefined;

  imageslidervalue = 100;
  maximagesize = 400;
  imagesize = this.maximagesize;

  constructor(public dialogRef: MatDialogRef<ProductOperationsManComponent>, @Inject(MAT_DIALOG_DATA) public data: {barcodeimage: string, barcode: string  }, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.generateBarcode4Product()

    document.getElementById("printpagepreview")!.style.display = "block";
    document.getElementById("pdfprintpage")!.style.display =  "none";
    document.getElementById("mat_slider")!.style.display = "block";
    document.getElementById("print_button")!.style.display = "block";
  }

  setPercentimagesize() {
    return (this.imageslidervalue) ;
  }

  resizeImage() {
    this.imagesize = this.maximagesize*this.setPercentimagesize()/100;

  }

  onSliderChange($event: any)
  {

    this.resizeImage();
  }

  imagesizeincm()
  {
    /* div is an A4 page. I must obtain the measure of imagesize in my div as div is an A4*/
    return this.imagesize/this.maximagesize*16;
  }

  close()
  {
    this.dialogRef.close();
  }

  generateBarcode4Product()
  {

    let format = '';
    let formatName = getBarcodeType(this.data.barcodeimage);
    this.barcodeimg!.nativeElement.src = this.data.barcodeimage;

  /*  if (getBarcodeType(this.data.barcodeimage)=="CODE-128")
    {

      JsBarcode(this.barcodeimg!.nativeElement, this.data.barcodeimage, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
      });

      this.barcodeimg!.nativeElement.style.width = "100%";
    }
    */
  }


      /*
  async ngAfterViewInit(){

  let docDefinition = {
    content: [
      {
        image: this.data.barcodeimage,  // la tua stringa base64
        width: 500,
        Alignment: 'center'
      }
    ]
  };
  pdfMake.createPdf(docDefinition).open();
  */

  print() {
    let widthInCm = this.imagesizeincm();
    let widthInPoints = (widthInCm / 2.54) * 72; // Conversione da cm a pollici e poi a punti
    let docDefinition = {
      content: [
        {
          columns: [
            { width: '*', text: '' }, // Colonna vuota per centrare
            {
              width: widthInPoints,
              image: this.data.barcodeimage, // la tua stringa base64
            },
            { width: '*', text: '' }, // Colonna vuota per centrare
          ]
        }
      ]
    };
   // pdfMake.createPdf(docDefinition).print();

   document.getElementById("printpagepreview")!.style.display = "none";
   document.getElementById("pdfprintpage")!.style.display =  "block";
   document.getElementById("mat_slider")!.style.display = "none";
   document.getElementById("print_button")!.style.display = "none";

   pdfMake.createPdf(docDefinition).getBase64((base64) => {
    const iframe = document.getElementById('pdfprintpage') as HTMLIFrameElement;
    iframe!.src = 'data:application/pdf;base64,' + base64;
  });
  }




}
