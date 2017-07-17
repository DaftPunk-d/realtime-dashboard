import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService, IForms} from '../../../core/api.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-forms-create',
  templateUrl: './forms-create.component.html',
  styleUrls: ['./forms-create.component.scss']
})
export class FormsCreateComponent implements OnInit {
  onSubmit: Function;
  @Input() forms: IForms;
  userId = 'R0MgwXPJnXPv3mq7';
  @Output() createdOrUpdated = new EventEmitter();

  constructor(private apiService: ApiService, private router: Router) {


    this.onSubmit = (name) => {
     apiService.insertForm({form_identifier: name, form_userid: this.userId})
       .then(() => {
         this.createdOrUpdated.emit();
      })
       .catch((err) => {
         console.error('Failed to update list', err);
       });
  };
}

  ngOnInit() {

  }
}


