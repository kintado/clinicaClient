import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api_url = "https://app.centrochirurgicocittadicaserta.it/webapp/api.php";
  public outputpdf = "https://app.centrochirurgicocittadicaserta.it/webapp/output.pdf";
  public printOperationsListOutputpdf = "https://app.centrochirurgicocittadicaserta.it/printoperationslist.pdf";
  constructor() {
    if (window.location.hostname == "localhost" || window.location.hostname == "centrochirurgicocaserta.loc/" || window.location.hostname == "centrochirurgicocaserta.loc" )
    {
      this.api_url = "http://clinicapi.loc/api.php";
      this.outputpdf = "http://clinicapi.loc/output.pdf";
      this.printOperationsListOutputpdf = "http://clinicapi.loc/printoperationslist.pdf";
    }
  }

  public api_actions = {
    "get_product_categories": "GET_PRODUCT_CATEGORIES",
    "medicines_list": "MEDICINES_LIST",
    "products_list": "PRODUCTS_LIST",
    "medical_utilities_list": "MEDICAL_UTILITIES_LIST",
    "users_list": "USERS_LIST",
    "product_details": "PRODUCT_DETAILS",
    "log_user": "LOG_USER",
    "refresh_user": "REFRESHSESSION",
    "product_save": "PRODUCT_SAVE",
    "product_delete": "DELETE PRODUCT BY ID",
    "category_has_product": "CATEGORY HAS PRODUCT",
    'delete_category_by_id': "DELETE CATEGORY BY ID",
    'add_category_by_name':   "ADD CATEGORY BY NAME",
    "notifies_list_of_products_in_stock": "NOTIFY PRODUCS IN STOCK",
    "save_user": "SAVE USER",
    "verify_user_already_exists": "VERIFY USER ALREADY EXISTS",
    "user_is_deletable": "USER IS DELETABLE",
    "user_delete": "USER DELETE",
    "user_list_delete": "USER LIST DELETE",
    "set_user_role":"SET USER ROLE",
    "set_user_active_state":"SET USER ACTIVE STATE",
    "new_barcode": "NEW BARCODE",
    "delete_list_of_products_by_id": "DELETE LIST OF PRODUCTS BY ID",
    "make_pdf_of_products_list": "MAKE PDF OF PRODUCTS LIST",
    "product_operations_list": "PRODUCT OPERATIONS LIST",
    "product_operations_list_of_month_and_year":"PRODUCT OPERATIONS LIST OF MONTH AND YEAR",
    "make_pdf_of_product_operations_list": "MAKE PDF OF PRODUCT OPERATIONS LIST",
    "stock_list":"STOCK LIST"
  }
  static api_actions: any;

}
