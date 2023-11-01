import { gql } from 'apollo-angular';

export const GET_CONNECTED_USERS = gql`
  query GetConnectedUsers($data: GetConnectionInput!) {
    getConnections(data: $data) {
      id
      username
      name
    }
  }
`;

export const GET_SEARCHED_USERS = gql`
  query GetSearchedUsers($data: SearchUserInput!) {
    getSearchedUsers(data: $data) {
      id
      username
      name
      status
    }
  }
`;
