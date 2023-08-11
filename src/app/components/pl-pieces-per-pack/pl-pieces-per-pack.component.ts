import { Component, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pl-pieces-per-pack',
  templateUrl: './pl-pieces-per-pack.component.html',
  styleUrls: ['./pl-pieces-per-pack.component.css']
})
export class PlPiecesPerPackComponent {
  @Input() pieces_per_pack: number | undefined;
  @Input() product_id: number | undefined;
  
  status: string = "view";
  constructor(private prods: ProductsService) { }
  setEditState()
  {
    this.status = "edit";
  }

  keypress(event: any, totalpiecessbox: any) {
    if (event.keyCode === 69 || event.keyCode === 101) {
      event.preventDefault();
    }
    if (event.keyCode==13)
    {
        if (this.pieces_per_pack!=undefined && this.pieces_per_pack!=null && this.pieces_per_pack>0)
        {
          if (confirm("sicuro di voler cambiare il numero di pezzi? Se lo farai si perderanno i dati dei carichi e degli scarichi e le quantità e dovrai reinserirle manualmente"))
          {
              this.save(totalpiecessbox);
          }
          else
          {
              this.cancel(totalpiecessbox);
          }
        }
        else
        {
          alert("Il numero di pezzi per pacco deve essere maggiore di zero!");
          this.cancel(totalpiecessbox);
        }
    }
    else if (event.keyCode==27)
    {
      this.cancel(totalpiecessbox);
    }
  }

  save(totalpacksbox: any)
  {
      this.prods.getObsProductDataById(this.product_id).subscribe((productresponse: any) => {
      let product = (Object)(productresponse);
      product.pieces_per_pack = totalpacksbox.value;
      product.quantity = 0;
      product.resetQuantity = true;
      this.prods.OBSSaveProduct(product).subscribe((res: any) => {
        this.status = "view";

      });
    });
  }

  cancel(totalpiecessbox: any)
  {
    this.status = "view";
    totalpiecessbox.value = this.pieces_per_pack;
  }
}
