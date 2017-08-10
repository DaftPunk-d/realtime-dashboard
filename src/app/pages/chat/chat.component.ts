import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {



  ngOnInit() {
  }
}


