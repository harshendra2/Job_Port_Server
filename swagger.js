// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Node.js Express + MongoDB',
    description: 'Node.js Express + MongoDB API',
  },
  host: 'localhost:4000',
  schemes: ['http']
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);