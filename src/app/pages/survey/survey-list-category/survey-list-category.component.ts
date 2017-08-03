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

  answers: any[];
  isCorrect = false;
  showValidation = false;
  score: number = 0;


  chooseCategoryVisible = true;
  startQuiz = false;
  startPage = false;
  quizCompleted = false;

  loadingData = false;
  loadingCategories = false;


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadingData = false;
    this.loadingCategories = true;
    this.apiService.getCategories()
      .then((categories: any) => {
        categories = _.sortBy(categories, [function (o) {
          return o.name;
        }]);
        this.loadingCategories = false;
        this.categories = categories;
      })
      .catch((err) => {
        console.error('Failed to get categories', err);
      });
  }

  selectCategory(category) {
    this.clearQuestionsAndAnswers();
    this.category = category;
    const categoryId = category.id;
    this.apiService.getQuestionsByCategory(categoryId)
      .then((result: any) => {
        if (result && result.length > 0) {
          this.loadingData = false;
          this.questions = this.shuffle(result);
          this.question = this.questions[0];
          this.apiService.getAnswersByQuestion(this.question.id).then((answers: any) => {
            this.answers = answers;
          })
        } else {
          this.questions = [];
        }
      })
      .catch((err: any) => {
        console.log('error selecting category' + err);
      });
  }

  clearQuestionsAndAnswers() {
    if(this.questions && this.answers){
      this.questions.length = 0;
      this.answers.length = 0;
    }
    this.isCorrect = false;
    this.score = 0;
  }

  validateAnswer(answerToValidate, question) {
    _.each(this.answers, (answer) => {
      if (answerToValidate === answer) {
        if (answer.isCorrect === 1) {
          this.isCorrect = true;
          this.score = this.score + 1;
        } else {
          this.isCorrect = false;
        }
        setTimeout(() => {
          this.selectNextQuestion(question);
        }, 1500)
      }
    })
  }

  selectNextQuestion(questionSelected: any){
    const numberOfQuestionInArray = _.findIndex(this.questions, {'id': questionSelected.id});
    if(numberOfQuestionInArray < this.questions.length - 1){
      const newNumberOfQuestionInArray = numberOfQuestionInArray + 1;
      this.question = this.questions[newNumberOfQuestionInArray];
      this.showValidation = false;
      this.getAnswerById(this.questions[newNumberOfQuestionInArray].id);
    } else {
      this.startQuiz = false;
      this.quizCompleted = true;
    }
  }

  getAnswerById(questionId: number){
    this.apiService.getAnswersByQuestion(questionId).then((answers: any) => {
      this.answers = answers;
    })
  }

  retake(){
    //fix the shuffle, only 3 questions available after retaking
    this.questions = this.shuffle(this.questions);
    this.chooseCategoryVisible = false;
    this.startQuiz = false;
    this.startPage = true;
    this.quizCompleted = false;
    this.score = 0;
    this.isCorrect = false;
    this.showValidation = false;
  }

  tryAnother(){
    this.chooseCategoryVisible = true;
    this.startQuiz = false;
    this.startPage = true;
    this.quizCompleted = false;
    this.score = 0;
    this.isCorrect = false;
    this.showValidation = false;
  }


  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
