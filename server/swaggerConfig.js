const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'DarbukasPlan', // Title of the documentation
      version: '1.0.0', // Version of the app
      description: 'API documentation for your project', // Description of the app
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL of your server
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
