const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "NexusAPI",
        version: "1.0.0",
        description: "Documentación simple de la API",
      },
      
    },
    apis: ["./src/routes/**/*.js"], // Archivos donde Swagger buscará los endpoints
  };
  
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;