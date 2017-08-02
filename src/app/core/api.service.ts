import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class ApiService {

  private userId = 'R0MgwXPJnXPv3mq7';

  public getCategories(): Promise<any[]> {
    const getCatsUrl = `${environment.dataUrl}categories`;
    return this.getFromUrl(getCatsUrl);
  }

  public addCategory(category: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const addCatUrl = `${environment.dataUrl}categories`;
      request.post({
        url: addCatUrl,
        form: {'cat': category}
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(body);
      });
    });
  }

  public addUser(user: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const addCatUrl = `${environment.dataUrl}register`;
      request.post({
        url: addCatUrl,
        form: {'user': user}
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(body);
      });
    });
  }

  public addQuestion(question: string, categoryId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const addQUrl = `${environment.dataUrl}questions`;
      request.post({
        url: addQUrl,
        form: {'q': question, 'categoryId': categoryId }
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(body);
      });
    });
  }

  public addAnswer(answer: string, question: any, isCorrect: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const addAUrl = `${environment.dataUrl}answers`;
      request.post({
        url: addAUrl,
        form: {'a': answer, 'id': question.id, 'correct': isCorrect }
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(body);
      });
    });
  }

  public updateAnswer(answer: string, question: any, isCorrect: any, answerId: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const updateAUrl = `${environment.dataUrl}answers`;
      request.put({
        url: updateAUrl,
        form: {'a': answer, 'id': question.id, 'correct': isCorrect, 'answerId': answerId }
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(body);
      });
    });
  }

  public deleteCategory(categoryId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteCategoryUrl = `${environment.dataUrl}categories/${categoryId}`;
      request.delete({
        url: deleteCategoryUrl
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(null);
      });
    });
  }

  public getQuestionsByCategory(categoryId: number): Promise<any[]> {
    const getQuestionsUrl = `${environment.dataUrl}questions?categoryId=${categoryId}`;
    return this.getFromUrl(getQuestionsUrl);
  }

  public deleteQuestion(questionId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteQuestionUrl = `${environment.dataUrl}questions/${questionId}`;
      request.delete({
        url: deleteQuestionUrl
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(null);
      });
    });
  }

  public deleteAnwser(answerId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteAnswerUrl = `${environment.dataUrl}answers/${answerId}`;
      request.delete({
        url: deleteAnswerUrl
      }, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(null);
      });
    });
  }


  public getAnswersByQuestion(questionId: number): Promise<any[]> {
    const getAnswersUrl = `${environment.dataUrl}answers?questionId=${questionId}`;
    return this.getFromUrl(getAnswersUrl);
  }

  private getFromUrl(url: string, method: string = 'get'): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      request(url, {json: true, method: method.toUpperCase()}, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          console.error(response.statusMessage, response);
          reject(response);
          return;
        }
        resolve(body);
      });
    });
  }
}
