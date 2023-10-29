import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/queries/auth.query';

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo) {}

  loginUser(username: string, password: string) {
    const token = this.apollo.watchQuery({
      query: LOGIN,
      variables: {
        data: {
          username: username,
          password: password,
        },
      },
    });

    console.log({ token });

    return token;
  }
}
