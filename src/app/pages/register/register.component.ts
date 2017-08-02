import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() user: any;
  @Output() createdOrUpdated = new EventEmitter();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit(user: any) {

    this.apiService.addUser(this.user).then((user: any) => {
      this.createdOrUpdated.emit({name: this.user});
    })
      .catch((err) => {
        console.error('error creating a category', err);
      });

  }

}

