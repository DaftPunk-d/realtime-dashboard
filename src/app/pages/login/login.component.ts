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
              private router: Router) {

    const sessionID = Cookie.get('sessionID');
    if (sessionID) {
      this.router.navigate(['/quiz']);
    }
  }

  ngOnInit() {
  }

  login() {

    let email = this.model.email;
    let pass = this.model.password;
    let key = btoa(btoa(email) + '??' + btoa(pass));


    this.apiService.verivyCreds(key).then((body: any) => {
      const response = JSON.parse(body).response;
      const checkAdmin = atob(btoa(atob(response).split('//')[1]));
      // const resultSessionID = btoa(atob(response).split('//')[0]);
      if(checkAdmin !== 'admin'){
        Cookie.set('sessionID', response);
        this.router.navigate(['/quiz'])
      }else{
        Cookie.set('sessionID', response);
        this.router.navigate(['/admin']);
      }
      // if(resultSessionID === key){
      //   //if user is admin
      //   Cookie.set('sessionID', response);
      //   this.router.navigate(['/admin']);
      // } else {
      //   //if there is something wrong (wrong pass, user not exist)
      //   this.router.navigate(['/quiz'])
      // }
    });

  }

}

