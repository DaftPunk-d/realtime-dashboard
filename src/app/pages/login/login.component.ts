import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() createdOrUpdated = new EventEmitter();
  model: any = {};
  returnUrl: string;

  constructor(
              private route: ActivatedRoute,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {

    let email = this.model.email;
    let pass = this.model.password;
    let key = btoa(btoa(email) + '??' + btoa(pass));


    this.apiService.verivyCreds(key).then((body: any) => {
      const response = JSON.parse(body).response;
      const resultSessionID = btoa(atob(response).split('//')[0]);
      if(resultSessionID === key){
        //if user is admin
        Cookie.set('sessionID', response);
        this.router.navigate(['/admin']);
      } else {
        //if there is something wrong (wrong pass, user not exist)
        this.router.navigate(['/quiz'])
      }
    });
    /*
     if user creds are admin redirect to admin page
     */
  //login

    // this.authenticationService.login(this.model.email, this.model.password)
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       //throw error
    //     });
  }

}

