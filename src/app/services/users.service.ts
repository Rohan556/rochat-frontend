import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_CONNECTED_USERS,
  GET_SEARCHED_USERS,
} from '../graphql/queries/users.query';
import { ApolloQueryResult } from '@apollo/client';
import { Observer, firstValueFrom } from 'rxjs';
import { CREATE_CONNECTION_MUTATION } from '../graphql/mutations/users.mutation';

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

  async createConnection(userId: number) {
    const sent = this.apollo
      .mutate({
        mutation: CREATE_CONNECTION_MUTATION,
        variables: {
          data: {
            user1_id: Number(localStorage.getItem('user-id')),
            user2_id: userId,
          },
        },
      })
      .subscribe({
        next: ({ data }) => {
          console.log({ data });
        },
        error: (error) => {
          console.error('Error creating user:', error);
        },
      } as Observer<any>);
  }
}
