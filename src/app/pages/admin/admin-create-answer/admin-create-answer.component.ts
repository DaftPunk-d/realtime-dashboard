import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { query } from '@angular/core/src/animation/dsl';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-admin-create-answer',
  templateUrl: './admin-create-answer.component.html',
  styleUrls: ['./admin-create-answer.component.scss']
})
export class AdminCreateAnswerComponent implements OnInit {
  @Input() answer: any;
  @Input() question: any;
  @Input() isNewAnswer: any;
  @Output() createdOrUpdated = new EventEmitter();
  answers: any[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

  }

  onSubmit(answer: string, isCorrect: any) {


    // this.answer = answer;
    isCorrect = isCorrect === true ? 1 : 0;

    if (this.isNewAnswer) {
      this.apiService.addAnswer(answer, this.question, isCorrect).then((q: any) => {
        this.createdOrUpdated.emit({answer: answer, questionId: this.question, isCorrect: isCorrect});
      })
        .catch((err) => {
          console.error('error creating a answer', err);
        });
    } else {
      this.apiService.updateAnswer(answer, this.question, isCorrect, this.answer.id).then((q: any) => {
        this.createdOrUpdated.emit({answer: answer, questionId: this.question, isCorrect: isCorrect, answerId: this.answer.id});
      })
        .catch((err) => {
          console.error('error creating a answer', err);
        });
    }


  }


}
