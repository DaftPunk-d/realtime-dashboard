import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule, Routes } from '@angular/router';

import { AdminListCategoryComponent } from '../pages/admin/admin-list-category/admin-list-category.component';
import { ModalComponent } from './modal/modal.component';
import { FormsListComponent } from '../pages/survey/forms-list/forms-list.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/survey', pathMatch: 'full'},

  {path: 'survey', component: FormsListComponent},

  {path: 'admin', component: AdminListCategoryComponent}

];

@NgModule({
  declarations: [
    NavComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    NavComponent,
    ModalComponent
  ]
})
export class UiModule {
}
