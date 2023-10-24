import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph" })
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

const httpStakingLink = new HttpLink({ uri: "https://testnet-staking-graphql.uniultra.xyz/graphql" })
export const apolloStakingClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpStakingLink,
})

const httpU2UNetworkLink = new HttpLink({ uri: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-network" })
export const apolloU2UNetworkClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpU2UNetworkLink,
})