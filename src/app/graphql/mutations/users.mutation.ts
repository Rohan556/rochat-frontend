import { gql } from 'apollo-angular';

export const CREATE_CONNECTION_MUTATION = gql`
  mutation CreateConnection($data: CreateConnectionInput!) {
    createUserConnection(data: $data) {
      status
    }
  }
`;
