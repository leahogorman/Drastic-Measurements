// Require the framework and instantiate it
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-fastify');
const fastify = require('fastify')({ logger: true });
const { isConnected } = require('./db');
const graphqlSchema = require('./graphql');

console.log(path.join(__dirname, '../public'));

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../public/build'),
  prefix: '/'
})

// Run the server!
const start = async () => {
  try {
    // create graphql server
    const gqlServer = new ApolloServer({
      schema: graphqlSchema
    });

    await isConnected;
    await fastify.register(gqlServer.createHandler()).listen(process.env.PORT || 3100);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = start;
