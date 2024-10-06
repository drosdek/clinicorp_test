const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Clinicorp",
      version: "1.0.0",
      description: "Documentação da API do projeto Clinicorp",
      contact: {
        name: "Josnei Drosdek",
        email: "josneidrosdek@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:8085/api",
          description: "Servidor Local",
        },
      ],
    },
  },
  apis: ["./src/tasks/interfaces/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
