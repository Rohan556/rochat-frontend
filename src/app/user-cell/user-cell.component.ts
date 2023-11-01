import { Component, Input } from '@angular/core';
import { IUser } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-user-cell',
  templateUrl: './user-cell.component.html',
  styleUrls: ['./user-cell.component.css'],
})
export class UserCellComponent {
  @Input() user: IUser = {} as IUser;
}
