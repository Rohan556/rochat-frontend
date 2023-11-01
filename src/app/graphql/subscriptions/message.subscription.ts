import { gql } from 'apollo-angular';

export const GET_REALTIME_MESSAGE = gql`
  subscription ($data: CreateConnectionInput!) {
    getRealtimeMessage(data: $data) {
      getRealtimeMessage
      sender_id
    }
  }
`;
