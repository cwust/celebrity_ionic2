import { Injectable } from '@angular/core';

const RESPONSE = 1;
const BROADCAST = 2;

@Injectable()
export class BackendConnection {
    private connection: WebSocket;
    private callId = 1;
    private callbacks = {}; 
    private broadcastHandlers = {};

    public connect() {
        let conn = new WebSocket('ws://localhost:3000');
        conn.onopen = () => {
            conn.onmessage = (msg) => this.handleMessage(msg)
        };

        this.connection = conn;
    }

    public sendMessage(method: string, params: any, onDone?, onFail?):void {
        let thisCallId = ++this.callId;

        this.callbacks[thisCallId] = {onDone, onFail};

        this.connection.send(JSON.stringify(
            {
                callId: thisCallId,
                method,
                params
            }
        ))  ;

    }

    public onBroadcastedMessage(msg: string, handler: any) {
        this.broadcastHandlers[msg] = handler;
    }

    private handleMessage(msg: MessageEvent) {
        console.log('handleMessage, msg:', msg);
        let data = JSON.parse(msg.data);

        if (data.type == RESPONSE) {
            this.handleResponse(data);
        } else if (data.type == BROADCAST) {
            this.handleBroadcast(data);
        } else {
            console.log('Error handling message, cannot determine its type', msg);
        }
    }

    private handleResponse(data: any) {
        if (!data.callId) {
            //GLOBAL handler
            console.log('handleMessage without callId. data: ', data );
            return;
        }

        let {callId} = data;

        if (!this.callbacks[callId]) {
            console.log('Cannot find callbacks for callId', callId);
            return;
        }
        
        let callbacks = this.callbacks[callId];

        if (data.error && callbacks.onFail) {
            callbacks.onFail(data.error);
        } else if (data.result && callbacks.onDone) {
            callbacks.onDone(data.result);                
        } else {
            console.log('Error in callbacks for callId', callId);
        }

        delete this.callbacks[callId];        
    } 

    private handleBroadcast(data: any) {
        if (!data.msg) {
            console.log('Cannot handle broadcast, cannot find msg: ', data );
            return;
        }

        let handler = this.broadcastHandlers[data.msg];

        if (handler) {
            handler(data.params);
        }
    }
}