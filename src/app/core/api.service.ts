import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as request from 'request';
import { ITableData } from '../pages/survey/forms-list/forms-list.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import * as _ from 'lodash';

export class IForms {
  form_identifier: string;
  form_userid: string;
}
interface IColumns {
  form_columns_name: string;
  form_userid: string;
  form_columns_form_id?: number;
}
interface IFormInfo {
  creationDate: Date;
  formIdentifier: string;
}

export interface INetwork {
  id?: number;
  network_id: number;
  name: string;
}
export interface IColumnInfo {
  form_columns_name: string;
  form_columns_id?: number;
}


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

  public deleteCategory(categoryId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteFeedUrl = `${environment.dataUrl}categories/${categoryId}`;
      request.delete({
        url: deleteFeedUrl
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

  public getAnswersByQuestion(questionId: number): Promise<any[]> {
    const getAnswersUrl = `${environment.dataUrl}answers?questionId=${questionId}`;
    return this.getFromUrl(getAnswersUrl);
  }


  public getFormInfos(): Promise<IFormInfo[]> {
    return new Promise((resolve, reject) => {
      const getTablesUrl = `${environment.dataUrl}list/?user_id=${this.userId}`;
      return this.getFromUrl(getTablesUrl)
        .then((list: any[]) => {
          _.each(list, (formItem: any) => {
            formItem.form_date = new Date(formItem.form_date).getTime();
          });
          _.sortBy(list, [function (o) {
            if (!_.isNil(o)) {
              return o.form_date;
            } else {
              return;
            }
          }]);
          resolve(list);
        })
        .catch(reject);
    });
  }

  public getFormData(formIdentifier: string, formColumnId: number, offset: number, limit: number): Promise<ITableData> {
    const getFormDataUrl = `${environment.dataUrl}get/?user_id=${this.userId}&form_identifier=${formIdentifier}&form_id=${formColumnId}&offset=${offset}&limit=${limit}`;
    return this.getFromUrl(getFormDataUrl);
  }

  public getUniqColumns(formIdentifier: string, formColumnId: number): Promise<IColumnInfo[]> {
    const getFormColumnUrl = `${environment.dataUrl}column/?user_id=${this.userId}&form_identifier=${formIdentifier}&form_columns_form_id=${formColumnId}`;
    return this.getFromUrl(getFormColumnUrl);
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

  public insertForm(formInfo: IForms): Promise<IForms> {
    return new Promise<IForms>((resolve, reject) => {
      const updateFormUrl = `${environment.dataUrl}store/?user_id=${this.userId}`;
      request.post({url: updateFormUrl, form: formInfo}, (error, response, body) => {
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

  public insertColumn(columnInfo: IColumns): Promise<IColumns> {
    return new Promise<IColumns>((resolve, reject) => {
      const updateColumnUrl = `${environment.dataUrl}column/?user_id=${this.userId}`;
      request.post({url: updateColumnUrl, form: columnInfo}, (error, response, body) => {
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

  public deleteForm(formIdentifier: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const deleteFormUrl = `${environment.dataUrl}list/${formIdentifier}`;
      request.delete(deleteFormUrl, (error, response, body) => {
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

  public deleteColumn(formColumnsId: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const deleteColumnUrl = `${environment.dataUrl}column/${formColumnsId}`;
      request.delete(deleteColumnUrl, (error, response, body) => {
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

  public deleteRows(formEntryIds: number[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const deleteRowUrl = `${environment.dataUrl}form-entry/`;
      request.delete({url: deleteRowUrl, form: {formEntryIds: formEntryIds.join()}}, (error, response, body) => {
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

  public getFeedsByUser(): Promise<any[]> {
    const getFeedsUrl = `${environment.dataUrl}list/?user_id=${this.userId}`;
    return this.getFromUrl(getFeedsUrl);
  }

  public getFeedByUser(feed: any): Promise<any> {
    const getFeedsUrl = `${environment.dataUrl}list/?user_id=${this.userId}&feed_id=${feed.feed_id}`;
    return this.getFromUrl(getFeedsUrl);
  }

  public getFeedData(feed: any, offset: number = 0, limit: number = 50): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const getFeedDataUrl = `${environment.feedUrl}feeds/${feed.feed_id}?offset=${offset}&limit=${limit}`;
      return this.getFromUrl(getFeedDataUrl)
        .then((feedsData: any) => {
          if (feedsData.posts && feedsData.posts.length > 0) {
            resolve(feedsData.posts);
          } else {
            console.log('empty feed: ', feedsData);
            resolve([]);
          }
        })
        .catch(reject);
    });
  }

  public clearCache(feedId: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const clearCacheUrl = `${environment.feedUrl}feeds/${feedId}/cache`;
      return this.getFromUrl(clearCacheUrl, 'delete')
        .then((clear: any) => {
          resolve(clear);
        })
        .catch(reject);
    });
  }

  public reloadFeed(feedId: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const refreshFeedUrl = `${environment.feedUrl}feeds/${feedId}`;
      const reloadFeedUrl = `${environment.feedUrl}list?user_id=${this.userId}&feed_id=${feedId}`;
      return this.getFromUrl(refreshFeedUrl)
        .then((refresh: any) => {
          this.getFromUrl(reloadFeedUrl)
            .then((feed: any) => {
              resolve(feed);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  public addFeed(feed: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const addFeedUrl = `${environment.feedUrl}feeds`;
      request.post({
        url: addFeedUrl,
        headers: {Authorization: 'Bearer 7698aa32b9d4315ab5387723168f7102'},
        form: feed
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


  public editFeed(feed: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const editFeedUrl = `${environment.feedUrl}feeds/${feed.feed_id}`;
      request.put({
        url: editFeedUrl,
        headers: {Authorization: 'Bearer 7698aa32b9d4315ab5387723168f7102'},
        form: feed
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

  public deleteFeed(feedId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteFeedUrl = `${environment.feedUrl}feeds/${feedId}`;
      request.delete({
        url: deleteFeedUrl,
        headers: {Authorization: 'Bearer 7698aa32b9d4315ab5387723168f7102'}
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

  public getAllNetworks(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const getNetworksUrl = `${environment.feedUrl}list/networks`;
      return this.getFromUrl(getNetworksUrl)
        .then((networks: any) => {
          resolve(networks);
        })
        .catch(reject);
    });
  }

  public getNetworkByName(name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const getNetworkUrl = `${environment.feedUrl}list/networks?name=${name}`;
      return this.getFromUrl(getNetworkUrl)
        .then((network: any) => {
          resolve(network);
        })
        .catch(reject);
    });
  }

  public updateSocialQuery(feedId: any, query: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const updateQueryUrl = `${environment.feedUrl}feeds/${feedId}/config/${query.query_id}`;
      request.put({url: updateQueryUrl, form: query}, (error, response, body) => {
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

  public addSocialQuery(feedId: any, query: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const addQueryUrl = `${environment.feedUrl}feeds/${feedId}/config/`;
      request.post({url: addQueryUrl, form: query}, (error, response, body) => {
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

  public deleteSocialQuery(feedId: string, query: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const deleteQueryUrl = `${environment.feedUrl}feeds/${feedId}/config/${query.query_id}`;
      request.delete(deleteQueryUrl, (error, response, body) => {
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

  public getCountOfPosts(feedId: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const getCountUrl = `${environment.feedUrl}count/${feedId}`;
      request.get(getCountUrl, (error, response, body) => {
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
