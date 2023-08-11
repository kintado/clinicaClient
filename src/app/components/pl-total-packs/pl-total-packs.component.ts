import { Component, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pl-total-packs',
  templateUrl: './pl-total-packs.component.html',
  styleUrls: ['./pl-total-packs.component.css']
})
export class PlTotalPacksComponent {
  @Input() packs_number: number | undefined;
  @Input() pieces_per_pack: number | undefined;
  @Input() product_id: number | undefined;
  status: string = "view";

  constructor(private prods: ProductsService) { }

  setEditState()
  {
    this.status = "edit";
  }

  setViewState()
  {
    this.status = "view";
  }

  keypress(event: any, totalpacksbox: any) {
    if (event.keyCode === 69 || event.keyCode === 101) {
      event.preventDefault();
    }
    if (event.keyCode==13)
    {
      if (this.pieces_per_pack!=undefined && this.pieces_per_pack!=null && this.pieces_per_pack>0)
      {
        if (this.pieces_per_pack!=undefined && this.pieces_per_pack!=null && this.pieces_per_pack>0)
        {
              if (totalpacksbox.value>=0)
              {

                  if (totalpacksbox.value==0)
                  {

                    if (!confirm("Sicuro di voler impostare a zero il numero di pacchi?"))
                    {
                      this.cancel(totalpacksbox);
                      return;
                    }
                  }

                  if (confirm("sicuro di voler cambiare il numero di pacchi? Se lo farai si perderanno i dati dei carichi e degli scarichi e si considerera' come unica quantita' quella inserita qui."))
                  {
                      this.save(totalpacksbox);
                  }
                  else
                  {
                      this.cancel(totalpacksbox);
                  }
              }
              else
              {
                alert("Devi inserire un numero maggiore o al massimo uguale a zero!");
                this.cancel(totalpacksbox);
              }
          }
          else
          {
            alert("Devi inserire il numero di pezzi per pacco (e deve essere maggiore di zero)!");
            this.cancel(totalpacksbox);
          }
      }
      else
      {
        alert("Devi inserire il numero di pezzi per pacco (e deve essere maggiore di zero)!");
        this.cancel(totalpacksbox);
      }

    }
    else if (event.keyCode==27)
    {
      this.cancel(totalpacksbox);
    }
  }

  save(totalpacksbox: any)
  {
      this.prods.getObsProductDataById(this.product_id).subscribe((productresponse: any) => {
      let product = (Object)(productresponse);
      product.quantity = totalpacksbox.value*this.pieces_per_pack!;
      product.resetQuantity = true;
      this.prods.OBSSaveProduct(product).subscribe((res: any) => {
        this.status = "view";

      });
    });
  }

  cancel(totalpacksbox: any)
  {
    this.status = "view";
    totalpacksbox.value = this.packs_number;
  }
}
