import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { LogoComponent } from './logo/logo.component';
import { PrinterButtonComponent } from './top_menu_buttons/printer-button/printer-button.component';
import { DeleteButtonComponent } from './top_menu_buttons/delete-button/delete-button.component';
import { CardButtonComponent } from './top_menu_buttons/card-button/card-button.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { DetailedbuttonComponent } from './components/buttons/detailedbutton/detailedbutton.component';
import { OnlyImageButtonComponent } from './components/buttons/simple-small-button/onlyimage.button.component';
import { HomeComponent } from './views/home/home.component';


import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { AgendaComponent } from './views/agenda/agenda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgendaDetailsFormComponent } from './views/agenda/agenda-details-form/agenda-details-form.component';
import { MedicinesListViewComponent } from './views/medicinals/medicines.component';
import { EditProductComponent } from './views/product-edit/edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicalUtilitiesListViewComponent } from './views/medical-principals/medical-principals.component';
import { CategoryManagementComponent } from './views/category-management/category-management.component';


import { ProductbarcodemanComponent } from './views/productbarcodeman/productbarcodeman.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';

import { TestComponent } from './test/test.component';

import { ProductOperationsManComponent } from './views/product-operations-man/product-operations-man.component';
import { ConfirmOperationDialogComponent } from './views/confirm-operation-dialog/confirm-operation-dialog.component';
import { AlertOperationDialogComponent } from './views/alert-operation-dialog/alert-operation-dialog.component';
import { PlTotalPacksComponent } from './components/pl-total-packs/pl-total-packs.component';
import { PlPiecesPerPackComponent } from './components/pl-pieces-per-pack/pl-pieces-per-pack.component';

import { ChangeproductstypecomponentsComponent } from './changeproductstypecomponents/changeproductstypecomponents.component';
import { ProductsStoreComponent } from './views/products-store/products-store.component';
import { RefactorPiecesPerPackConfirmComponent } from './dialogs/refactor-pieces-per-pack-confirm/refactor-pieces-per-pack-confirm.component';
import { UserFormComponent } from './views/user-form/user-form.component';
import { BarcodeforprintComponent } from './views/barcodeforprint/barcodeforprint.component';
import { A4printbacrodepreviewComponent } from './components/a4printbacrodepreview/a4printbacrodepreview.component';
import { MakePdfOfProductsListComponent } from './views/make-pdf-of-products-list/make-pdf-of-products-list.component';
import { ProductsOperationReportManComponent } from './views/products-operation-report-man/products-operation-report-man.component';
import { PrintOperationsListOfProductComponent } from './views/print-operations-list-of-product/print-operations-list-of-product.component';
import { StockReportComponent } from './views/stock-report/stock-report.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    LogoComponent,
    PrinterButtonComponent,
    DeleteButtonComponent,
    CardButtonComponent,
    SearchboxComponent,
    DetailedbuttonComponent,
    OnlyImageButtonComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    AgendaComponent,
    AgendaDetailsFormComponent,
    MedicinesListViewComponent,
    EditProductComponent,
    MedicalUtilitiesListViewComponent,
    CategoryManagementComponent,
    ProductbarcodemanComponent,
    TestComponent,
    ProductOperationsManComponent,
    ConfirmOperationDialogComponent,
    AlertOperationDialogComponent,
    PlTotalPacksComponent,
    PlPiecesPerPackComponent,
    RefactorPiecesPerPackConfirmComponent,
    UserFormComponent,
    BarcodeforprintComponent,
    A4printbacrodepreviewComponent,
    MakePdfOfProductsListComponent,
    ProductsOperationReportManComponent,
    PrintOperationsListOfProductComponent,
    StockReportComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    /* Ora quelli che servono per il menu di drop-down */
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
    /* Fine di quelli che servono per il menu di drop-down */




  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
