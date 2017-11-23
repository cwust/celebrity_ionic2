import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { OpeningPage } from '../pages/opening/opening';
import { CreateGamePage } from '../pages/create-game/create-game';
import { ChooseGamePage } from '../pages/choose-game/choose-game';
import { PreGameStagePage } from '../pages/pre-game-stage/pre-game-stage';
import { ChooseCelebritiesPages } from '../pages/choose-celebrities/choose-celebrities'

import { CelebrityStore } from '../store/celebrity-store'
import { BackendConnection } from '../services/backend-connection'
import { CelebrityService } from '../services/celebrity-service'

const appPages = [
  OpeningPage,
  CreateGamePage,
  ChooseGamePage,
  PreGameStagePage,
  ChooseCelebritiesPages
]

const providers = [
  CelebrityStore,
  BackendConnection,
  CelebrityService
]

@NgModule({
  declarations: [
    MyApp,
    ...appPages
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...appPages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...providers
  ]
})
export class AppModule {}
