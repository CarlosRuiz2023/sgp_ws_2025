export default {
  API: {
    ENVIRONMENT: "QA",
    NAME: "API TYPESCRIPT",
    PORT: 3500,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "QA",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/v1',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },
  POSTGRESQL: {
    ENVIRONMENT: "QA",
    HOST: "172.17.15.21",
    PORT: "5432",
    USER_NAME: "usrfidoc",
    USER_PASSWORD: "Z8XacQ@eb-nA",
    DATABASE: "sgp",
  },
  SECRETORPRIVATEKEY: "Est03sMyPublick3y23@913",
};