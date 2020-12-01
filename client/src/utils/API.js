import { useContext } from "react";
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import AuthContext from "views/AuthProvider/authprovider.js";

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    }
  }
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

const searchActor = async function(searchString) {

  const outputObject = (o) => {
    return `{${Object.keys(o).map((key) => {
      return `${key}: "${o[key]}"`;
    }).join(",")}}`
  }

  const searchTerms = searchString.split(" ");
  const searchCall = [];

  searchTerms.forEach(search => {
    searchCall.push({
      "firstname": capitalize(search)
    });
    searchCall.push({
      "lastname": capitalize(search)
    });
    searchCall.push({
      "firstname": search.toLowerCase()
    });
    searchCall.push({
      "lastname": search.toLowerCase()
    });
  });

  let results = await client.query({
    query: gql`
    query {
      userSearchFull: ActorMany(filter:{
        OR: [
          {
            firstname: "${capitalize(searchTerms[0])}",
            lastname: "${capitalize(searchTerms[searchTerms.length - 1])}"
          }, {
            firstname: "${searchTerms[0].toLowerCase()}",
            lastname: "${searchTerms[searchTerms.length - 1].toLowerCase()}"
          }
        ]
      }) {
        _id
        firstname
        lastname
        image
        measurements {
          chest
          waist
          weight
        }
      } 
      userSearchMix: ActorMany(filter:{
        OR: [${searchCall.map(outputObject)}]
      }) {
        _id
        firstname
        lastname
        image
        measurements {
          chest
          waist
          weight
        }
      }        
    }
  `
  });

  return {
    data: {
      ActorMany: [
        ...results.data.userSearchFull,
        ...results.data.userSearchMix,
      ].filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i)
    }
  }
};

const getActorByFirstName = function(first) {
  return client.query({
    query: gql`
      query {
        ActorMany(filter:{
          firstname:"${first}"
        }) {
          _id
          firstname
          lastname
          image
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
         image:"${actor.image}"
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
console.log(addActor)

//delete actor by MongoDB _id
const deleteActor = function(id){
return client.mutate({
  mutation: gql `
  mutation{
    ActorRemoveById(
      _id:"${id}"
    ){
      recordId
      record{
      firstname
    }}
  }`
})
}

const updateActor = function(id,actor){
  console.log(actor);
  return client.mutate({
    mutation:gql `
    mutation{
        ActorUpdateById(record:{
           _id:"${id}"
           firstname:"${actor.firstname}"
           lastname:"${actor.lastname}"
           measurements:[{
            chest:${actor.measurements[0].chest}
            waist:${actor.measurements[0].waist}
            weight:${actor.measurements[0].weight}
          }]   
        }){
          recordId
          record{
            firstname
            lastname
            measurements{
              chest
              waist
              weight
            }
          }  
        }
      }
    `
  })
}

export const GetRates = getRates;
export const GetActorByFirstName = getActorByFirstName;
export const AddActor = addActor;
export const SearchActor = searchActor;
export const DeleteActor = deleteActor;
export const UpdateActor = updateActor;