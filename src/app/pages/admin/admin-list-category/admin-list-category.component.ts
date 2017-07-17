import { Component, OnInit, ViewChild } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import * as $ from 'jquery';

enableProdMode();

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-list-category.component.html',
  styleUrls: ['./admin-list-category.component.scss']
})

export class AdminListCategoryComponent implements OnInit {
  rows: any[];
  feeds: any;
  feed: any;
  createQueryModalVisible: false;
  deleteFeedModalVisible: false;

  isNewFeed = false;
  @ViewChild('table') table: any;
  answers: any[];

  questions: any[];
  question: any;
  createQuestionModalVisible: boolean;

  categories: any[];
  category: any;
  createCategoryModalVisible: boolean;


  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.apiService.getCategories()
      .then((categories: any) => {
        categories = _.sortBy(categories, [function (o) {
          return o.name;
        }]);
        this.categories = categories;
        this.category = categories[0];
        this.selectCategory(this.category);
      })
      .catch((err) => {
        console.error('Failed to get categories', err);
      });
  }

  handleCreatedOrUpdated(category?: any) {
    window.scrollTo(0, 0);
    this.categories.push(category);
    this.createCategoryModalVisible = false;
  }


  handleCreatedOrUpdatedQuestion(question?: any) {
    window.scrollTo(0, 0);
    this.questions.push(question);
    this.createQuestionModalVisible = false;
  }


  handleCreatedOrUpdatedQuery(query?: any) {
    this.createQueryModalVisible = false;
    if (query) {
      if (this.feed.queries) {
        this.feed.queries.push(query);
      } else {
        this.feed.queries = query;
      }
    }
  }

  deleteCategory(category) {
    this.apiService.deleteCategory(category.id)
      .then((result: any) => {
        const currentIndex = _.findIndex(this.categories, {id: category.id});
        _.remove(this.categories, category);
        if (currentIndex > 0) {
          this.category = this.categories[currentIndex - 1];
        } else {
          this.category = this.categories[currentIndex];
        }
      })
      .catch((err: any) => {
        console.log('error deleting category: ' + err);
      });
  }

  selectCategory(category) {
    this.category = category;
    const categoryId = this.category.id;
    this.apiService.getQuestionsByCategory(categoryId)
      .then((result: any) => {
        if (result && result.length > 0) {
          this.questions = result;
          this.question = result[0];
        } else {
          this.questions = [];
        }
      })
      .catch((err: any) => {
        console.log('error selecting category' + err);
      });
  }

  selectQuestion(question) {
    const questionId = this.question.id;
    this.apiService.getAnswersByQuestion(questionId)
      .then((result: any) => {
        if (result.length > 0) {
          this.answers = result;
        } else {
          this.answers[0].answer = 'There are no answers for this question.';
        }
      })
      .catch((err: any) => {
        console.log('error selecting category' + err);
      });
  }

}
