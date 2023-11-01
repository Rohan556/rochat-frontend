import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/queries/auth.query';
import { ApolloQueryResult } from '@apollo/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo) {}

  async loginUser(username: string, password: string) {
    try {
      const queryRef = this.apollo.watchQuery({
        query: LOGIN,
        variables: {
          data: {
            username: username,
            password: password,
          },
        },
      });
      const result: ApolloQueryResult<any> = await firstValueFrom(
        queryRef.valueChanges
      );
      return result.data.login;
    } catch (err) {
      alert('Please provide valid credetials');
    }
  }
}
