import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateGamePage } from '../create-game/create-game'
import { ChooseGamePage } from '../choose-game/choose-game'

import { BackendConnection } from '../../services/backend-connection';

@Component({
  selector: 'page-opening',
  templateUrl: 'opening.html'
})
export class OpeningPage {

  constructor(public navCtrl: NavController, public conn: BackendConnection) {
    conn.connect();    
    conn.onBroadcastedMessage('PLAYERS_UPDATED', (params) => console.log('PLAYERS_UPDATED', params));
  }

  onStartGameClick() {
    this.navCtrl.push(CreateGamePage);
  }

  onEnterGameClick() {
    this.navCtrl.push(ChooseGamePage);   
  }

  onCreateGameClick() {
    this.conn.sendMessage('createGame', {gameName: 'Meu Jogo', playerName: 'Player 1'}, (result) => console.log('createGame', result));    
  }

  onListGamesClick() {
    this.conn.sendMessage('listGames', {}, (result) => console.log('listGames', result));        
  }

  onConnectToGameClick() {
    this.conn.sendMessage('connectToGame', {gameId: 2, playerName: 'Player 2'}, (result) => console.log('connectToGame', result));            
  }
}
