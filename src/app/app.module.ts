import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UiModule } from './ui/ui.module';
import { ApiService } from './core/api.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminListCategoryComponent } from './pages/admin/admin-list-category/admin-list-category.component';
import { AdminCreateCategoryComponent } from './pages/admin/admin-create-category/admin-create-category.component';
import { AdminListQuestionComponent } from './pages/admin/admin-list-question/admin-list-question.component';
import { AdminCreateQuestionComponent } from './pages/admin/admin-create-question/admin-create-question.component';
import { AdminCreateAnswerComponent } from './pages/admin/admin-create-answer/admin-create-answer.component';
import { SurveyListCategoryComponent } from './pages/survey/survey-list-category/survey-list-category.component';

const appRoutes: Routes = [
  { path: '',          redirectTo: '/quiz', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    AdminListCategoryComponent,
    AdminCreateCategoryComponent,
    AdminListQuestionComponent,
    AdminCreateQuestionComponent,
    AdminCreateAnswerComponent,
    SurveyListCategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UiModule,
    RouterModule.forRoot(appRoutes),
    NgxDatatableModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
