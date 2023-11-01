import { gql } from 'apollo-angular';

export const GET_MESSAGES = gql`
  query GetMessages($data: GetMessagesInput!) {
    getMessages(data: $data) {
      user1Details {
        id
        username
        name
        status
      }
      user2Details {
        id
        username
        name
        status
      }
      messages {
        sender_id
        content
        sent_time
      }
    }
  }
`;
