import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-survey-list-category',
  templateUrl: './survey-list-category.component.html',
  styleUrls: ['./survey-list-category.component.scss']
})
export class SurveyListCategoryComponent implements OnInit {

  categories: any[];
  category: any;

  questions: any[];
  question: any;

  chooseCategoryVisible = true;
  startQuiz = false;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCategories()
      .then((categories: any) => {
        categories = _.sortBy(categories, [function (o) {
          return o.name;
        }]);
        this.categories = categories;
      })
      .catch((err) => {
        console.error('Failed to get categories', err);
      });
  }

  selectCategory(category) {
    this.category = category;
    const categoryId = category.id;
    this.apiService.getQuestionsByCategory(categoryId)
      .then((result: any) => {
        if (result && result.length > 0) {
          this.questions = result;
          // this.selectQuestion({ id: result[0].id});
        } else {
          this.questions = [];
        }
      })
      .catch((err: any) => {
        console.log('error selecting category' + err);
      });
  }

}
