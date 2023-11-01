import { gql } from 'apollo-angular';

export const SIGNUP_USER = gql`
  mutation Signup($data: signupInput!) {
    signup(data: $data) {
      userId
      token {
        refreshToken
        accessToken
      }
    }
  }
`;
