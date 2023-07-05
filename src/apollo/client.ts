import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql-telia.t6a-stage.net/graphql",
  headers: {
    "x-country": "SE",
    "tv-client-name": "marketweb",
    "tv-client-boot-id": "1",
    "tv-client-tz": "Europe/Stockholm",
  },
  cache: new InMemoryCache(),
});
