import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  scores: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getScores().then((scores)=> {
      this.scores = scores;
    });
  }

}
