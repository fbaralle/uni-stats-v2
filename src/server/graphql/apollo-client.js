import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri =
  process.env.UNI_V2_GRAPH_URI ||
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

if (!uri && !process.env.UNI_V2_GRAPH_URI) {
  throw new Error('Please add UNI_V2_GRAPH_URI to .env.local');
}

const apolloClient = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default apolloClient;
