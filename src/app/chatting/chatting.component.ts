import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IMessages, IUser } from '../chat-window/chat-window.component';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css'],
})
export class ChattingComponent implements OnInit, AfterViewChecked {
  @Input() user: IUser = {} as IUser;
  @Input() messages: IMessages[] = [];
  @Input() selectedUser: IUser = {} as IUser;
  @ViewChild('sendmessage')
  sendMessageRef!: ElementRef<HTMLInputElement>;
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  userId: number = Number(localStorage.getItem('user-id')) || 0;

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {
    this.messagesService.message.subscribe((data) => {
      const message = {
        sender_id: data.getRealtimeMessage.sender_id,
        content: data.getRealtimeMessage.getRealtimeMessage,
        sent_time: new Date().toString(),
      } as IMessages;

      this.messages = [...this.messages, message];
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  sendMessage() {
    const value = this.sendMessageRef?.nativeElement.value;
    if (!value) return;

    this.messagesService.SendMessageMutation(value, this.selectedUser.id);

    this.scrollToBottom();

    this.sendMessageRef.nativeElement.value = '';
  }
}
