// This tool verifies schemas.

const Joi = require('@hapi/joi');

// These are the routes handlers.

const { getPhones } = require('./handlers/phones');
const { ping, getToken, decodeToken } = require('./handlers/token');

// And these are the routes.

module.exports.routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      tags: ['api'],
      description: 'Get the home page of the application',
      notes: 'This route returns the home contents.',
      handler: ping,
    },
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      tags: ['api'],
      description: 'Get a new token',
      notes: 'Use this route to create a new token.',
      handler: getToken,
      validate: {
        query: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/token/decrypt',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'Decrypt a token',
      notes: 'Use this route to decrypt a token and see its contents.',
      handler: decodeToken,
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).options({ allowUnknown: true }),
      },
    },
  },
  {
    method: 'GET',
    path: '/phones',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'Recover a phone list.',
      notes: 'For the test we are going to return a JSON from a mock file.',
      handler: getPhones,
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).options({ allowUnknown: true }),
      },
    },
  },
  {
    method: 'GET',
    path: '/{filename}',
    config: {
      auth: false,
      handler: {
        file: function (request) {
          console.log(request.params.filename);
          return `src/assets/images/${request.params.filename}`;
        },
      },
    },
  },
];
