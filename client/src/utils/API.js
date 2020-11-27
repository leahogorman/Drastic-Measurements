import { useContext } from "react";
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import AuthContext from "views/AuthProvider/authprovider.js";

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  cache: new InMemoryCache()
});

const getRates = function(currency) {
  return client.query({
    query: gql`
      query GetRates {
        rates(currency: "${currency}") {
          currency
        }
      }
    `
  });
};

const getActorByFirstName = function(first) {
  return client.query({
    query: gql`
      query {
        ActorMany(filter:{
          firstname:"${first}"
        }) {
          firstname
          lastname
          measurements {
            chest
            waist
            weight
          }
        }        
      }
    `
  });
};

export const GetRates = getRates;
export const GetActorByFirstName = getActorByFirstName;