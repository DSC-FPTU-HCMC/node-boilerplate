const glue = require('schemaglue');
const { ApolloServer } = require('apollo-server-express');

const schemaDirectives = require('./directives/');

const { schema, resolver } = glue('externals/interface/graphql', {
  js: '**/*.js'
});

module.exports.startGraphQLServer = app => {
  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    schemaDirectives,
    context: async ({ req }) => {
      const authorizationHeader = req.headers['Authorization'];
      const accessToken = authorizationHeader && authorizationHeader.split('Bearer ')[1];
      return { accessToken };
    }
  });

  apolloServer.applyMiddleware({ app });
}