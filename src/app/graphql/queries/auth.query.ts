import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
    }
  }
`;
