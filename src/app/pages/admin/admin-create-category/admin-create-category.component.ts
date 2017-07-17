import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService, IForms } from '../../../core/api.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-category',
  templateUrl: './admin-create-category.component.html',
  styleUrls: ['./admin-create-category.component.scss']
})
export class AdminCreateCategoryComponent implements OnInit {
  @Input() category: any;
  @Output() createdOrUpdated = new EventEmitter();

  constructor(private apiService: ApiService, private router: Router) {

  }

  ngOnInit() {

  }

  onSubmit(cat: string) {


    this.category = cat;

    this.apiService.addCategory(this.category).then((category: any) => {
      this.createdOrUpdated.emit({name: this.category});
    })
      .catch((err) => {
        console.error('error creating a category', err);
      });

  }
}



