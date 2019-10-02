import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';


const httpLink = new HttpLink({ uri: 'https://api.entur.io/journey-planner/v2/graphql' });

const authLink = new ApolloLink((operation, forward) => {

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "ET-Client-Name": "Bouvet - dashboard"
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});