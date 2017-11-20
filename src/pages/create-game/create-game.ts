import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CelebrityService } from '../../services/celebrity-service';
import { CelebrityStore } from '../../store/celebrity-store';

import { PreGameStagePage } from '../pre-game-stage/pre-game-stage';

@Component({
  selector: 'page-create-game',
  templateUrl: 'create-game.html'
})
export class CreateGamePage {

  playerName = '';
  gameName = '';

  constructor(public navCtrl: NavController, public service: CelebrityService, public store: CelebrityStore) {
    service.connect();
  }

  onNextPageClick() {
    this.service.createGame(this.gameName, this.playerName)
    .then(() => {
      this.navCtrl.push(PreGameStagePage);      
      this.store.isOwner = true;
    });
  }
}
