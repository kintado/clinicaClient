import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductColumnsInTableConfService {

  public columns: any

  constructor() {
    this.columns = {
      "checkbox_column": 1,
      "id": 1,
      "type": 1,
      "category": 1,
      "name": 1,
      "notes": 1,
      "barcode": 0,
      "barcode_piece": 0,
      "pieces_per_pack": 1,
      "minimum_packages_stock": 1,
      "total_pieces": 1,
      "total_packs": 1,
      "edit": 1,
      "delete": 1,
      "add_to_cart": 1
    }
  }
}
