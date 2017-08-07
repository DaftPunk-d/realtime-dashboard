import { Component, OnInit, ViewChild } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import * as _ from 'lodash';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

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
  _answer: any;
  answer: any;
  createAnswerModalVisible: boolean;

  questions: any[];
  question: any;
  createQuestionModalVisible: boolean;

  categories: any[];
  category: any;
  createCategoryModalVisible: boolean;


  constructor(private apiService: ApiService, private router: Router) {
      const sessionID = Cookie.get('sessionID');
      if(_.isNull(sessionID)){
        this.router.navigate(['/login']);
      } else {
        const verifyAdmin = atob(sessionID).split('//')[1];
        if(verifyAdmin === 'admin'){
          //admin
        }else{
          this.router.navigate(['/quiz'])
        }
      }

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

  logout(){
    Cookie.delete('sessionID');
    this.router.navigate(['/quiz']);
  }

  handleCreatedOrUpdated(category?: any) {
    window.scrollTo(0, 0);
    this.categories.push(category);
    this.createCategoryModalVisible = false;
  }


  handleCreatedOrUpdatedQuestion(question?: any) {
    window.scrollTo(0, 0);
    if(parseInt(question.categoryId) === this.category.id){
      this.questions.push(question);
    }
    this.createQuestionModalVisible = false;
  }

  handleCreatedOrUpdatedAnswer(answer?: any) {
    window.scrollTo(0, 0);
    if(!answer.answerId) {
      this.answers.push(answer);
    }else {
    }
    this.createAnswerModalVisible = false;
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
          this.selectQuestion({ id: result[0].id});
        } else {
          this.questions = [];
        }
      })
      .catch((err: any) => {
        console.log('error selecting category' + err);
      });
  }

  selectQuestion(question) {
    this.question = question;
    const questionId = question.id;
    this.apiService.getAnswersByQuestion(questionId)
      .then((result: any) => {
        if (result && result.length > 0) {
          this.answers = result;
        } else {
          this.answers = [];
        }
      })
      .catch((err: any) => {
        console.log('error selecting question' + err);
      });
  }

  deleteQuestion(question) {
    this.apiService.deleteQuestion(question.id)
      .then((result: any) => {
        const currentIndex = _.findIndex(this.questions, {id: question.id});
        _.remove(this.questions, question);
        if (currentIndex > 0) {
          this.question = this.questions[currentIndex - 1];
        } else {
          this.question = this.questions[currentIndex];
        }
      })
      .catch((err: any) => {
        console.log('error deleting questions: ' + err);
      });
  }

  deleteAnswer(answer) {
    this.apiService.deleteAnwser(answer.id)
      .then((result: any) => {
        const currentIndex = _.findIndex(this.questions, {id: answer.id});
        _.remove(this.answers, answer);
        if (currentIndex > 0) {
          this.answer = this.answers[currentIndex - 1];
        } else {
          this.answer = this.answers[currentIndex];
        }
      })
      .catch((err: any) => {
        console.log('error deleting answers: ' + err);
      });
  }

}
