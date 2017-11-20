import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CelebrityService } from '../../services/celebrity-service';
import { CelebrityStore } from '../../store/celebrity-store';

import { PreGameStagePage } from '../pre-game-stage/pre-game-stage';

@Component({
  selector: 'page-choose-game',
  templateUrl: 'choose-game.html'
})
export class ChooseGamePage {

    games = [];
    playerName = '';
    private isConnecting:boolean;

    constructor(public navCtrl: NavController, public service: CelebrityService, public store: CelebrityStore) {
        service.listGames()
        .then((games) => {
            this.games = games;
        });
    }

    ionViewDidEnter() {
        this.isConnecting = false;
    }

    ionViewCanLeave() {
        console.log('ChooseGamePage.ionViewCanLeave');

        if (!this.isConnecting) {
            this.service.leaveGame();
        }
    }
    
    connectToGame(game) {
        this.service.connectToGame(game.id, this.playerName)
        .then((result) => {
            this.store.isOwner = false;
            this.isConnecting = true;
            this.navCtrl.push(PreGameStagePage);
        });
    }
}