// Here we import the tools we need for the server.

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const chalk = require('chalk');
const HapiSwagger = require('hapi-swagger');
const AuthBearer = require('hapi-auth-bearer-token');
const { resolve } = require('path');

// The variable "version" contains the version of the application for Swagger.

const { version } = require('../package');

// The variable "routes" contains the routes for our REST API.

const { routes } = require('./routes');

// Validate function that validates the token in our authorization strategy for
// the routes.

const { validate } = require('./auth');

// This is the Hapi server itself.
// Here we define the connection parameters (host, port and cors).

const server = new Hapi.Server({
  host: 'localhost',
  port: Number(process.env.PORT) || 3000,
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

// And here we define the configuration for Swagger and Good.

const goodOptions = {
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
        log: '*',
        response: '*',
      }],
    }, {
      module: 'good-console',
    }, 'stdout'],
  },
};

const hapiSwaggerOptions = {
  info: {
    title: 'phone-list-back API Documentation',
    description: 'This is the backend for the phone list application.',
    version: version,
    contact: {
      name: 'Gustavo Muñoz',
      email: 'timbergus@gmail.com',
    },
  },
  host: 'localhost:3000',
};

// Then we register the plugins and launch the server.

async function main() {
  await server.register([
    AuthBearer,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: hapiSwaggerOptions,
    },
    {
      plugin: Good,
      options: goodOptions,
    },
  ]);

  server.auth.strategy('jwt', 'bearer-access-token', { validate });

  server.auth.default('jwt');

  server.route(routes);

  await server.start();
  console.log(chalk.white.bgBlue(`Server running at: ${server.info.uri}`));
}

process.on('unhandledRejection', err => {
  console.log(chalk.white.bgRed(err));
  process.exit(1);
});

main();
