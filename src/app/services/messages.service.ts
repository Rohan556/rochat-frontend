import { EventEmitter, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observer, firstValueFrom } from 'rxjs';
import { GET_MESSAGES } from '../graphql/queries/messages.query';
import { GET_REALTIME_MESSAGE } from '../graphql/subscriptions/message.subscription';
import { SEND_MESSAGE } from '../graphql/mutations/message.mutation';

@Injectable()
export class MessagesService {
  message = new EventEmitter();
  constructor(private apollo: Apollo) {}

  async getAllMessages(user1: number, user2: number) {
    try {
      const queryRef = this.apollo.watchQuery({
        query: GET_MESSAGES,
        variables: {
          data: {
            user1_id: user1,
            user2_id: user2,
          },
        },
      });
      const result: ApolloQueryResult<any> = await firstValueFrom(
        queryRef.valueChanges
      );
      return result.data.getMessages;
    } catch (err) {
      alert('Please provide valid credetials');
    }
  }

  async subscribeToMessages(user1_id: number, user2_id: number) {
    const subscription = this.apollo
      .subscribe({
        query: GET_REALTIME_MESSAGE,
        variables: { data: { user1_id, user2_id } },
      })
      .subscribe(({ data }) => {
        if (data) {
          this.message.emit(data);
        }
      });
    return subscription;
  }

  async SendMessageMutation(message: string, rec_id: number) {
    const sent = this.apollo
      .mutate({
        mutation: SEND_MESSAGE,
        variables: {
          data: {
            message,
            sender_id: Number(localStorage.getItem('user-id')),
            user1_id: Number(localStorage.getItem('user-id')),
            user2_id: rec_id,
          },
        },
      })
      .subscribe({
        next: ({ data }) => {},
        error: (error) => {
          console.error('Error creating user:', error);
          // Handle errors here
        },
      } as Observer<any>);
  }
}
