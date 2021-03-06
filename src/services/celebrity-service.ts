import { Injectable } from '@angular/core';
import { BackendConnection } from './backend-connection'
import { Http } from '@angular/http';
import { APP_CONFIG } from './backend-connection'

@Injectable()
export class CelebrityService {

    constructor(private connection: BackendConnection, private http: Http) {

    }

    private post(method: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let options = new RequestOptions({withCredentials: true });
            this.http.post(APP_CONFIG.apiEndpoint + '/' + method, params, options)
            .subscribe((res:Response) => resolve(res.json()));
        });
    }

    private sendMessage(msg:string, params: any) {
        return new Promise((resolve, reject) => {
            this.connection.sendMessage(
                msg, 
                params, 
                (result) => resolve(result),
                (error) => reject(error)
            );
        });                                        
    }

    public connect() {
        this.connection.connect();
    }

    public createGame(gameName:string, playerName: string) : Promise<any> {
        return this.sendMessage('createGame', {gameName, playerName});
    }

    public listGames(): Promise<any> {
        return this.sendMessage('listGames', {});
    }
    public connectToGame(gameId: number, playerName: string): Promise<any> {
        return this.sendMessage('connectToGame', {gameId, playerName});
    }

    public getGameTeams(): Promise<any> {
        return this.sendMessage('getGameTeams', {});
    }

    public onPlayersUpdated(cb: any) {
        this.connection.onBroadcastedMessage('PLAYERS_UPDATED', cb);
    }

    public unsubscribePlayersUpdated() {
        this.connection.onBroadcastedMessage('PLAYERS_UPDATED', null);
    }

    public changePlayerTeam(playerId: number): Promise<any> {
        return this.sendMessage('changePlayerTeam', {playerId});
    }

    public setCurrentPlayerCelebrities(celebrities: string[]): Promise<any> {
        return this.sendMessage('setCurrentPlayerCelebrities', {celebrities});
    }

    public leaveGame() : Promise<any> {
        return this.sendMessage('kickPlayerFromGame', {}); 
        //note that we use kick player, since this will have the desired effect
    }

    public kickPlayerFromGame(playerId: number) : Promise<any> {
        return this.sendMessage('kickPlayerFromGame', {playerId}); 
    }    
}
