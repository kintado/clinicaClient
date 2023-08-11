import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
    product_id: number | undefined;
    selected_category_id: number | undefined;
    categories: any = [];
    category_name: string | undefined;
    status: string | undefined;
    parentcaricaCategories: any;
    constructor(public dialogRef: MatDialogRef<CategoryManagementComponent>, @Inject(MAT_DIALOG_DATA) public data: {category_id: number, limitedFromOroductEdit: any, caricaCategorie: any}, private categoriesS: CategoriesService) {

      this.parentcaricaCategories = data.caricaCategorie;


     }

    private id: number | undefined;

    async ngOnInit(): Promise<void>  {


     this.loadCategories();
    }

    async loadCategories()
    {

      this.categories = await this.categoriesS.getCategories();

    }
    closeDialog()
    {
      this.dialogRef.close();
    }

    selectCategory(category_id: number)
    {
      let category = this.categories.find((x: any) => x.id == category_id);
      if (category)
      {
        this.category_name = category.category;
      }
    }

    deleteClick()
    {
      if (this.selected_category_id!=undefined && this.selected_category_id!=null)
      {
        alert("sono qui this.selected_category_id="+this.selected_category_id);
        this.categoriesS.categoryHasProductObservable(this.selected_category_id).subscribe((res: any) => {
          alert(res);
          if (res=="1")
          {
            if (confirm("La categoria selezionata contiene prodotti. Sei sicuro di volerla eliminare?"))
            {
              alert("Elimino la categoria");
              this.categoriesS.deleteCategoryByIdObservable(this.selected_category_id).subscribe((res: any) => {
                alert(res);
                this.loadCategories();
                this.parentcaricaCategories();
              })


            }

          }
        });
      }
    }

    newButtonClick()
    {
      this.status = "new";
      this.category_name = "";
    }

    cancelButtonClick()
    {
      this.status = "";
    }

    saveButtonClick()
    {
      if (this.category_name!=undefined && this.category_name!=null && this.category_name!="")
      {
        if (this.status=="new")
        {

            this.categoriesS.addCategoryObservable(this.category_name).subscribe((res: any) => {
              alert(res)
              alert("res="+JSON.stringify(res));
            // devo controllare se res esiste e se è o meno una stringa json
            if (res!=undefined && res!=null && res!="")
            {

                if (res.result=="ok")
                {
                  this.selected_category_id = res.id;
                  alert(res.message);
                }
                else
                {
                  alert(res.message);
                }
            }
            else
            {
              alert("Errore non riconosciuto")
            }


            this.loadCategories();
            this.parentcaricaCategories();
            this.status = "";
           })
        }
       /* else if (this.status=="edit")
        {
          this.categoriesS.updateCategoryObservable(this.selected_category_id, this.category_name).subscribe((res: any) => {
            alert(res);
            this.loadCategories();
            this.status = "";
          })
        }
        */
      }
    }

}
