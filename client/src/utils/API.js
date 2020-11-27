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

const addActor = function(actor){
  console.log(actor);
  return client.mutate({
    mutation: gql `
     mutation{
      ActorCreateOne(record:{
         firstname:"${actor.firstname}"
         lastname:"${actor.lastname}"
         measurements:[{
           chest:${actor.measurements.chest}
           waist:${actor.measurements.waist}
           weight:${actor.measurements.weight}
         }]
       }) {
        recordId
        record {
          firstname
        }
       }       
     }`
  })
}

export const GetRates = getRates;
export const GetActorByFirstName = getActorByFirstName;
export const AddActor = addActor;