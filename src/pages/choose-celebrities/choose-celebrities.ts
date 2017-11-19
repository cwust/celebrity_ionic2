import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CelebrityService } from '../../services/celebrity-service'


@Component({
  selector: 'page-choose-celebrities',
  templateUrl: 'choose-celebrities.html'
})
export class ChooseCelebritiesPages {

  celebrityTextInput = '';
  celebrities: string [] = [];
  maxCelebritiesPerPlayer = 10;

  constructor(public navCtrl: NavController, public service: CelebrityService) {

  }

  addCelebrity  () {
    this.celebrities = [...this.celebrities, this.celebrityTextInput];
    this.celebrityTextInput = '';
  }

  removeCelebrity(celebrity: string) {
    this.celebrities = this.celebrities.filter(item => item != celebrity);
  }

  onNextPageClick() {
    this.store.sendCelebrities(this.celebrities)
    .then(() => console.log('NEXT'));
  }

}
