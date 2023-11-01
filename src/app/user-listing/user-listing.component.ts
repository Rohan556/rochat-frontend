import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { IUser } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  @Input() connectedUsers: {
    username: string;
    id: number;
    status: string;
    name: string;
  }[] = [];

  subscription: any;

  @Output() selectedUser = new EventEmitter();
  selected: IUser = {} as IUser;

  constructor(private messagesService: MessagesService) {}
  onUserSelect(index: number) {
    this.selected = this.connectedUsers[index];
    this.selectedUser.emit({
      connectedUsers: this.connectedUsers[index],
    });
    this.subscription = this.messagesService.subscribeToMessages(
      Number(localStorage.getItem('user-id')),
      this.connectedUsers[index].id
    );
    console.log(this.subscription);
  }
}
