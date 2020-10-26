const http = require('http');

const requestMiddleware = require('./apis/request/request.middleware');
const apiRootRoute = require('./apis/root/root.route');
const { startGraphQLServer } = require('./graphql/graph.config');
const { registerWebsocket } = require('./websocket/websocket.config');

module.exports.openWebServiceInterface = app => {
  const server = http.Server(app);
  registerWebsocket(server);

  app.use(requestMiddleware.wirePreRequest);
  app.get('/', (req, res) => res.send('<h1>Developer Students Club - FPT University HCMC</h1>'));
  app.use('/api/', apiRootRoute);

  startGraphQLServer(app);

  app.use(requestMiddleware.wirePostRequest);
}