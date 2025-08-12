export default {
  API: {
    ENVIRONMENT: "PROD",
    NAME: "API TYPESCRIPT",
    PORT: 3500,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "PROD",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/v1',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },
  POSTGRESQL: {
    ENVIRONMENT: "PROD",
    HOST: "172.17.11.168",
    PORT: "5432",
    USER_NAME: "usrfidoc",
    USER_PASSWORD: "z8Xac#eb-an*",
    DATABASE: "sgp",
  },
  SECRETORPRIVATEKEY: "Est03sMyPublick3y23@913",
};
