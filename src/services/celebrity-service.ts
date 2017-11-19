import { Injectable } from '@angular/core';
import { BackendConnection } from './backend-connection'

@Injectable()
export class CelebrityService {

    constructor(private connection: BackendConnection) {

    }

    public connect() {
        this.connection.connect();
    }

    public createGame(gameName:string, playerName: string) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                'createGame', 
                {gameName, playerName}, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });
    }

    public listGames(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                'listGames', 
                {}, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });        
    }
    public connectToGame(gameId: number, playerName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                'connectToGame', 
                {gameId, playerName}, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });        
    }

    public getGameTeams(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                'getGameTeams', 
                {}, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });                
    }

    public onPlayersUpdated(cb: any) {
        this.connection.onBroadcastedMessage('PLAYERS_UPDATED', cb);
    }

    public unsubscribePlayersUpdated() {
        this.connection.onBroadcastedMessage('PLAYERS_UPDATED', null);
    }

    public changePlayerTeam(playerId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                'changePlayerTeam', 
                {playerId}, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });                        
    }

    public setCurrentPlayerCelebrities(celebrities: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                'setCurrentPlayerCelebrities', 
                {celebrities}, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });                                
    }
}
