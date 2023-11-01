import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws'; // Import WebSocketLink
import { split } from '@apollo/client/link/core';
import { getMainDefinition } from '@apollo/client/utilities';

const httpUri = 'http://localhost:8000/graphql'; // HTTP URI
const wsUri = 'ws://localhost:8000/graphql'; // WebSocket URI

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create an HTTP link
  const http = httpLink.create({ uri: httpUri });

  // Create a WebSocket link
  const ws = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true, // Reconnect automatically
    },
  });

  // Use split to route data to the appropriate link
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,
    http
  );

  return {
    link, // Use the split link
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
