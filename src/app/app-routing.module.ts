import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './views/agenda/agenda.component';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { MedicalUtilitiesListViewComponent } from './views/medical-principals/medical-principals.component';
import { MedicinesListViewComponent } from './views/medicinals/medicines.component';
import { UsersComponent } from './views/users/users.component';
import { ProductsStoreComponent } from './views/products-store/products-store.component';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'medicines', component: MedicinesListViewComponent},
  { path: 'medical-utilities', component: MedicalUtilitiesListViewComponent},

  { path: 'users', component: UsersComponent},
  { path: 'agenda', component: AgendaComponent},
  { path: 'products-store', component: ProductsStoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
