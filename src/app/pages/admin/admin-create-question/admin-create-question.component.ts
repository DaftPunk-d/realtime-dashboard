import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-question',
  templateUrl: './admin-create-question.component.html',
  styleUrls: ['./admin-create-question.component.scss']
})
export class AdminCreateQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() createdOrUpdated = new EventEmitter();
  categories: any[];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getCategories()
      .then((categories: any) => {
        this.categories = categories;
      })
      .catch((err) => {
        console.error('Failed to get categories', err);
      });
  }

  onSubmit(question: string, categoryId: number) {


    this.question = question;

    this.apiService.addQuestion(question, categoryId).then((q: any) => {
      this.createdOrUpdated.emit({question: question, categoryId: categoryId});
    })
      .catch((err) => {
        console.error('error creating a question', err);
      });

  }

}
