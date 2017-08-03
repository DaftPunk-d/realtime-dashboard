import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';

interface IUserInfo {
  username: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  onSubmit: Function;
  @Input() users: IUserInfo;
  @Output() createdOrUpdated = new EventEmitter();

  constructor(private apiService: ApiService, private router: Router) {

    this.onSubmit = (username, email, password) => {
      apiService.addUser({username:username, email:email, password: password})
        .then(() => {
          this.createdOrUpdated.emit();
        })
        .catch((err) => {
          console.error('Failed to register user', err);
        });
    };
}

  ngOnInit() {

  }
}

