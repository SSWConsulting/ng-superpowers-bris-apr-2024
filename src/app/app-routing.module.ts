import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full' },
  { path: 'company/list', component: CompanyListComponent },
  { path:'company/add', component: CompanyEditComponent },
  { path:'company/edit/:id', component: CompanyEditComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
