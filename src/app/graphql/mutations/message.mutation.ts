import { gql } from 'apollo-angular';

export const SEND_MESSAGE = gql`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      status
    }
  }
`;
