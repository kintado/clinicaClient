import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detailedbutton',
  templateUrl: './detailedbutton.component.html',
  styleUrls: ['./detailedbutton.component.css']
})
export class DetailedbuttonComponent {
  @Input() image_file: string | undefined;
  @Input() text: string | undefined;
}
