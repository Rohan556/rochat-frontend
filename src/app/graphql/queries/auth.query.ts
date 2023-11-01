import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query Login($data: LoginInput!) {
    login(data: $data) {
      userId
      token {
        accessToken
        refreshToken
      }
    }
  }
`;
