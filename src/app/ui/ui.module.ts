import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule, Routes } from '@angular/router';

import { AdminListCategoryComponent } from '../pages/admin/admin-list-category/admin-list-category.component';
import { SurveyListCategoryComponent } from '../pages/survey/survey-list-category/survey-list-category.component';
import { ModalComponent } from './modal/modal.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { LoginComponent } from '../pages/login/login.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/quiz', pathMatch: 'full'},

  {path: 'quiz', component: SurveyListCategoryComponent},

  {path: 'admin', component: AdminListCategoryComponent},

  {path: 'register', component: RegisterComponent},

  {path: 'login', component: LoginComponent},

  {path: 'chat', component: ChatComponent}

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
