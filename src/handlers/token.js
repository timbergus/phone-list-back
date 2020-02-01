// Boom formats the http messages for our endpoints responses.

const Boom = require('@hapi/boom');

// This function removes "Bearer " and returns the token.

const { parseBearer } = require('../utils/headers');

// We are going to add a delay to show loading states in front.

const { delay } = require('../utils/time');

// This functions are the

const { createToken, decryptToken } = require('../auth');

// This function just returns a message in the root url of the API to let us
// know it is working.

module.exports.ping = () => new Promise((resolve, reject) => {
  resolve('<h1>API is Working!</h1>');
  reject(Boom.badRequest('invalid query'));
});

// This function creates a token and returns it.

module.exports.getToken = request => delay(createToken(request.query.username), 4000);

// This function decodes a token and returns the result.

module.exports.decodeToken = request => decryptToken(parseBearer(request));
