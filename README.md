# Phone List Back Project

This is the backend for the phone list application.

## Instructions

All the project has been automatized using NPM scripts. To run the server just clone the project, install the packages (`npm install`) and run the server (`npm start`). The server should start at `localhost:3000`.

## Scripts

* __`npm start`__ → This script starts the API.
* __`npm run dev`__ → The same as __start__, but using [nodemon](https://github.com/remy/nodemon) for developing (install [nodemon](https://github.com/remy/nodemon) first).
* __`npm test`__ → This script run the tests and coverage of the application.

## Routes

Going to [localhost](localhost:3000) you must get a message to know the API is working.

Going to [documentation](http://localhost:3000/documentation) you can find the Swagger interface to the API where you will be able to test the endpoint.

### /

This is the same info you get on localhost. This endpoint returns the home message.

### /login

The API is secure. We are using JWT, so here, using `username` and `password` you can generate a token to access the API. The token expires in 2 hours.

### /token/decrypt

Here you can verify your new token. You need to put your token inside the __authorization__ input. You need to add Bearer before the token name to access to access.

> `Bearer <toke>`

### /phones

This endpoint returns the phone list. You need to add your token to get it from the server. In the front application, there is a login screen, but to make it simpler, the login is behind a button with constant credentials.
