import { CelebrityGame, RemoteGame, Player, GuessedCelebrity } from '../types/types'
import { Injectable } from '@angular/core';

function rand(): number {
    return Math.floor(Math.random()*(10000000));
}

@Injectable()
export class CelebrityStore {
    public game: CelebrityGame;
    public localPlayer: Player;
    public remoteGames: RemoteGame[];

    createNewGame(playerName: string, gameName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            //mock service result
            let player: Player = {
                id: rand(),
                name: playerName,
                celebrities: []
            }
    
            let serviceResult = {
                game : {
                    id: rand(),
                    name: gameName,
                    gameOwnerId: player.id,
                    team1Ids: [player.id],
                    team2Ids: [],
                    allPlayers: [player],
                    localPlayerTeam: 1,
                    previousRounds: [],
                    maxCelebritiesPerPlayer: 10
                }
            };

            this.game = serviceResult.game;
            
            resolve();
        });
    }

    getRemoteGames(): Promise<void> {
        return new Promise((resolve, reject) => {
            let serviceResult = {
                remoteGames: [
                    {
                        id: rand(),
                        name: "Sample Game"
                    }
                ]
            };

            this.remoteGames = serviceResult.remoteGames;

            resolve();
        });
    }

    connectToGame(playerName: string, remoteGame: RemoteGame): Promise<void> {
        return new Promise((resolve, reject) => {
            let localPlayer: Player = {
                id: rand(),
                name: playerName,
                celebrities: []
            };

            let owner: Player = {
                id: rand(),
                name: 'Game Owner',
                celebrities: []
            };

            let serviceResult = {
                game: {
                    id: remoteGame.id,
                    name: remoteGame.name,
                    gameOwnerId: owner.id,
                    team1Ids: [owner.id, localPlayer.id],
                    team2Ids: [],
                    allPlayers: [owner, localPlayer],
                    localPlayerTeam: 1,
                    previousRounds: [],
                    maxCelebritiesPerPlayer: 10
                }
            };

            this.game = serviceResult.game;

            resolve();
        });
    }

    changeCurrentPlayerTeam(): Promise<void> {
        return new Promise((resolve, reject) => {
            let team1Ids = [
                ...this.game.team1Ids
            ];
            let team2Ids = [
                ...this.game.team2Ids
            ];

            if (this.game.localPlayerTeam == 1) {
                team1Ids = team1Ids.filter(item => item != this.localPlayer.id);
                team2Ids.push(this.localPlayer.id);
            } else {
                team2Ids = team2Ids.filter(item => item != this.localPlayer.id);
                team1Ids.push(this.localPlayer.id);
            }

            let newTeamNumber = this.game.localPlayerTeam == 1 ? 2 : 1;
        
            let newGame: CelebrityGame = {
                ...this.game,
                team1Ids: team1Ids,
                team2Ids: team2Ids,
                localPlayerTeam: newTeamNumber
            }

            let serviceResult = {
                game: newGame
            }

            this.game = serviceResult.game;
            resolve();
        });
    }



    waitForPlayers() {
        /*
        setInterval(() => {
            let x = this.playerList.length + 1;
            this.playerList.push(
                {id: x, name: 'Player ' + x, team: Team.TEAM_1, celebrityList: []}
            );
            console.log('store', this);
        }, 12000);
        */
        console.log('waitForPlayers', this);
    }

    getPlayerById(playerId: number) {
        return this.game.allPlayers.find(item => item.id == playerId);
    }

    sendCelebrities(celebrities: string []): Promise<void> {
        return null;

    }

    private getAllCelebrities(players: Player[]) {
        let allCelebrities: string[] = [];
        for (let player of players) {
            allCelebrities = allCelebrities.concat(player.celebrities);
        }

        return allCelebrities;
        //TODO: SHUFFLE ARRAY
    }

    startGame(): Promise<void> {
        return new Promise((resolve, reject) => {
            let serviceResult = {
                newRound: {
                    order: 1,
                    availableCelebrities: this.getAllCelebrities(this.game.allPlayers),
                    guessedCelebrities: [],
                    currentTurnPlayerId: this.game.team1Ids[0],
                    currentTurnTeam: 1,
                }
            }

            this.game.currentRound = serviceResult.newRound;
        });
    }

    getCurrentCelebrity(): string {
        let arr = this.game.currentRound.availableCelebrities;
        return arr[arr.length-1];
    }

    getNextCelebrity(): string {
        let previous = this.game.currentRound.availableCelebrities.pop();
        this.game.currentRound.guessedCelebrities.push({
            name: previous,
            team: this.game.localPlayerTeam
        });
        return this.getCurrentCelebrity();
    }

    endTurn(guessedCelebrities: GuessedCelebrity[]) {
        //todo: send guessed celebrities
    }
}
 