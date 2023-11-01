import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/queries/auth.query';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observer, firstValueFrom } from 'rxjs';
import { SIGNUP_USER } from '../graphql/mutations/auth.mutation';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}

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

  async signupUser(name: string, username: string, password: string) {
    const sent = this.apollo
      .mutate({
        mutation: SIGNUP_USER,
        variables: {
          data: {
            username,
            name,
            password,
            confirmPassword: password,
          },
        },
      })
      .subscribe({
        next: ({ data }) => {
          if (data?.signup) {
            const token = data.signup.token.accessToken;
            const userId = data.signup.userId;

            if (!token || !userId) return;

            localStorage.setItem('auth-token', token);
            localStorage.setItem('user-id', userId);

            this.router.navigate(['/chat']);
          }
        },
        error: (error) => {
          console.error('Error creating user:', error);
        },
      } as Observer<any>);
  }
}
