import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';

export interface IUser {
  username: string;
  id: number;
  status: string;
  name: string;
}

export interface IMessages {
  sender_id: number;
  content: string;
  sent_time: string;
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  connectedUsers: IUser[] = [];
  userId: number;
  messageResponse: any;
  messages: IMessages[] = [];
  userSelected: IUser | undefined = undefined;

  constructor(
    private usersService: UsersService,
    private messageService: MessagesService
  ) {
    const id = localStorage?.getItem('user-id');
    this.userId = id ? +id : 0;
  }

  async ngOnInit() {
    this.connectedUsers = await this.usersService.getConnectedUsers(
      this.userId
    );
  }

  async selectedUser(event: { connectedUsers: IUser }) {
    this.userSelected = event.connectedUsers;
    this.messageResponse = await this.messageService.getAllMessages(
      localStorage.getItem('user-id')
        ? Number(localStorage?.getItem('user-id'))
        : 0,
      event.connectedUsers.id
    );

    this.messages = this.messageResponse.messages;
  }
}
