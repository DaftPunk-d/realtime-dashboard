import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

export interface ITableData {

  count: number;
  columns: string[];
  rows: any[];
}
interface IFormInfo {

  creationDate: Date;
  formIdentifier: string;
  form_identifier: string;
  form_id: number;
}

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})

export class FormsListComponent implements OnInit {
  formInfo: IFormInfo;
  formInfos: IFormInfo[];
  // formDataRow: IFormDataRow;
  // formDataRows: IFormDataRow[];
  creationDate: Date;
  userId = 'R0MgwXPJnXPv3mq7';
  rows: any[] = _.times(200, _.constant(null));
  columns: any[];
  createModalVisible = false;
  createColumnModalVisible = false;
  deleteRowModalVisible = false;
  headerHeight: number;
  footerHeight: number;
  row: any;
  selected = [];
  lastPageRequested = -1;
  selectToDelete: any;
  noSelectedMsg: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getFormInfos()
      .then((formInfos: IFormInfo[]) => {
        formInfos = _.sortBy(formInfos, [function (o) {
          return o.form_date;
        }]);
        formInfos.reverse();
        this.formInfos = formInfos;
        this.formInfo = formInfos[0];
        this.updatePage(0);
      })
      .catch((err) => {
        console.error('Failed to get form info on init', err);
      });
  }

  // updateTable(formIdentifier: string) {
  //   this.apiService.getFormData(formIdentifier, 0, 200)
  //     .then((formData: ITableData) => {
  //       if (_.isNil(formData)) {
  //         console.log('[form list] no data received when updating the table');
  //         this.headerHeight = 0;
  //         this.footerHeight = 0;
  //         this.columns = [];
  //         this.rows = [];
  //         return;
  //       }
  //       this.row = this.rows[0];
  //       this.headerHeight = 50;
  //       this.footerHeight = 50;
  //       // this.page.totalElements = formData.rows.length;
  //       // for (const item of this.rows) {
  //       //   for (const column of formData.columns) {
  //       //     item[column] = item[column] || '';
  //       //   }
  //       // }
  //       this.columns = _.map(formData.columns, (formDataItem: string) => {
  //         return {prop: formDataItem};
  //       });
  //       this.columns.unshift({
  //         headerCheckboxable: true,
  //         checkboxable: true
  //       });
  //       this.columns.unshift({
  //         'prop': 'edit'
  //       });
  //     });
  // }

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    this.selectToDelete = selected;
    const notNullSelected: any[] = _.compact(selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...notNullSelected);
  }

  updatePage(pageNumber: number) {
    if (pageNumber === this.lastPageRequested) {
      console.warn('Requesting same page again');
      return;
    }
    this.lastPageRequested = pageNumber;
  }

  handleCreatedOrUpdated() {
    this.apiService.getFormInfos()
      .then((formInfos: IFormInfo[]) => {
        formInfos = _.sortBy(formInfos, [function (o) {
          return o.form_date;
        }]);
        formInfos.reverse();
        this.formInfos = formInfos;
        this.selectForm(formInfos[0]);
      })
      .catch((err) => {
        console.error('Failed to get form info', err);
      });
    this.createModalVisible = false;
  }

  handleManageColumns() {
    this.lastPageRequested = -1;
    this.updatePage(0);
  }

  deleteForm() {
    this.apiService.deleteForm(this.formInfo.form_identifier)
      .then(() => {
        const currentIndex = _.findIndex(this.formInfos, {form_identifier: this.formInfo.form_identifier});
        _.remove(this.formInfos, (formInfo: IFormInfo) => {
          return formInfo.form_identifier === this.formInfo.form_identifier;
        });
        if (currentIndex > 0) {
          this.formInfo = this.formInfos[currentIndex - 1];
        } else {
          this.formInfo = this.formInfos[currentIndex];
        }
      })
      .catch((err) => {
        console.error('Failed to delete', err);
      });
  }

  deleteRows() {
    const selectedFormEntryIds: number[] = _.map(this.selected, 'form_entry_id');
    this.apiService.deleteRows(selectedFormEntryIds)
      .then(() => {
        const tempRows = _.clone(this.rows);
        _.remove(tempRows, (row: any) => {
          if (!row) {
            return false;
          }
          return _.includes(selectedFormEntryIds, row.form_entry_id);
        });
        this.rows = tempRows;
        // this.page.totalElements = _.filter(tempRows, 'form_entry_id').length;
        this.selectToDelete = null;
        this.deleteRowModalVisible = false;
      })
      .catch((err) => {
      this.deleteRowModalVisible = false;
        console.error('Failed to delete the row', err);
      });
  }

  checkIfSelected() {
    if (this.selectToDelete) {
      this.deleteRowModalVisible = true;
    } else {
      this.noSelectedMsg = 'no row selected';
    }
  }

  /**
   * Sets all rows to null without reassigning the rows variable
   */
  private clearRows() {
    _.each(this.rows, (row: any, index: number) => {
      this.rows[index] = null;
    });
  }

  public selectForm(formInfo: IFormInfo) {
    this.formInfo = formInfo;
    this.clearRows();
    this.lastPageRequested = -1;
    this.updatePage(0);
  }
}
