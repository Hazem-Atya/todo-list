import {
    MessageBody,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { TodoEntity } from '../entities/todo.entity';
  
  @WebSocketGateway(3001, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      transports: ['websocket', 'polling'],
      credentials: false,
    },
    allowEIO3: true,
  })
  export class TodoGateway {
    @WebSocketServer()
    server: Server;
  
    sendAddedTodo(@MessageBody() body: TodoEntity) {
      this.server.sockets.emit('ADD_TODO', body);
    }
  
    sendDeletedTodo(@MessageBody() body: number) {
      this.server.sockets.emit('DELETE_TODO', body);
    }
  
    sendUpdatedTodo(@MessageBody() body: TodoEntity) {
      this.server.sockets.emit('UPDATE_TODO', body);
    }
  }