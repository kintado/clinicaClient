import { Component, ComponentRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'onlyimagebutton',
  templateUrl: './onlyimage.button.component.html',
  styleUrls: ['./onlyimage.button.component.css']
})
export class OnlyImageButtonComponent implements OnInit {
  @Input() icontype: string | undefined;
  @Input() circular: string = "false";
  @Input() notifyHint: number | undefined;
  bootstrapiconcode: string | undefined;
  roundedcss: any = {};

  ngOnInit(): void {
    if (this.icontype == undefined) {
      this.icontype = "default";
      alert(this.notifyHint)
    }

    if (this.icontype == "default") {
      this.icontype = "default";
    }



    this.roundedcss = {

      "border-radius": this.circular=='true' ? "50%" : "5px",


    }


  }

}
