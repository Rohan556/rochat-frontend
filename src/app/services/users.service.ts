import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_CONNECTED_USERS,
  GET_SEARCHED_USERS,
} from '../graphql/queries/users.query';
import { ApolloQueryResult } from '@apollo/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private apollo: Apollo) {}

  async getConnectedUsers(userId: number) {
    try {
      const queryRef = this.apollo.watchQuery({
        query: GET_CONNECTED_USERS,
        variables: {
          data: {
            userId,
          },
        },
      });
      const result: ApolloQueryResult<any> = await firstValueFrom(
        queryRef.valueChanges
      );
      return result.data.getConnections;
    } catch (err) {
      alert('Please provide valid credetials');
    }
  }

  async getSearchedUsers(searchString: string) {
    try {
      const queryRef = this.apollo.watchQuery({
        query: GET_SEARCHED_USERS,
        variables: {
          data: {
            searchString,
          },
        },
      });
      const result: ApolloQueryResult<any> = await firstValueFrom(
        queryRef.valueChanges
      );
      return result.data.getSearchedUsers;
    } catch (err) {
      alert('Please provide valid credetials');
    }
  }
}
