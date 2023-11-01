import { Component } from '@angular/core';
import { IUser } from '../chat-window/chat-window.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchedUsers: IUser[] = [];

  constructor(private usersService: UsersService) {}

  async handleSearch(event: any) {
    const searchString = event.target?.value as string;

    if (!searchString) {
      this.searchedUsers = [];
      return;
    }

    this.searchedUsers = await this.usersService.getSearchedUsers(searchString);
  }
}
