import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class TodosocketService {
    private api = environment.socketURL;
    private socket: any = undefined;

    constructor() {
        if (!this.socket) {
            this.socket = io(this.api);
        }
    }

    public getSocket() {
        return this.socket;
    }
}