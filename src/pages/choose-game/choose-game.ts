import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CelebrityService } from '../../services/celebrity-service';
import { PreGameStagePage } from '../pre-game-stage/pre-game-stage';

@Component({
  selector: 'page-choose-game',
  templateUrl: 'choose-game.html'
})
export class ChooseGamePage {

    games = [];
    playerName = '';

    constructor(public navCtrl: NavController, public service: CelebrityService) {
        service.listGames()
        .then((games) => {
            this.games = games;
        });
    }
    
    connectToGame(game) {
        this.service.connectToGame(game.id, this.playerName)
        .then((result) => {
            this.navCtrl.push(PreGameStagePage);
        });
    }
}