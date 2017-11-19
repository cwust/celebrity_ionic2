import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CelebrityService } from '../../services/celebrity-service'
import { ChooseCelebritiesPages } from '../choose-celebrities/choose-celebrities'

@Component({
  selector: 'page-pre-game-stage',
  templateUrl: 'pre-game-stage.html'
})
export class PreGameStagePage {
  disableTeamChange = false;
  team1 = [];
  team2 = [];
  
  constructor(public navCtrl: NavController, public service: CelebrityService) {
  }

  ionViewDidEnter() {
    this.service.getGameTeams()
    .then(teams => {
      this.updateTeams(teams);
      this.service.onPlayersUpdated(teams => this.updateTeams(teams));
    });
  }
  
  ionViewDidLeave() {
    console.log('ionViewDidLeave'); 
    this.service.unsubscribePlayersUpdated();
  }

  private updateTeams(teams: any) {
    this.team1 = teams.team1;
    this.team2 = teams.team2;
  }

  changePlayerTeam(player: any) {
    this.disableTeamChange = true;
    this.service.changePlayerTeam(player.id)
    .then(() => this.disableTeamChange = false);
  }

  onNextPageClick() {
    this.navCtrl.push(ChooseCelebritiesPages);
  }
} 
