import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message: String;
  messageArr: Array<any> = Array();
  ngOnInit() {

  }
  socket: any;
  constructor(){
    this.socket = io('http://localhost:80')
    this.socket.on('chat message', function (data) {
      this.messageArr.push(data);
    }.bind(this));
  }

  sendMessage(){
    this.socket.emit('chat message',this.message);
  }


}


