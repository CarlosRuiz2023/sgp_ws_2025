export default {
  API: {
    ENVIRONMENT: "DEV",
    NAME: "API TYPESCRIPT",
    PORT: 3500,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "DEV",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/api',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },
  POSTGRESQL: {
    ENVIRONMENT: "DEV",
    HOST: "localhost",
    PORT: "5432",
    USER_NAME: "postgres",
    USER_PASSWORD: "root",
    DATABASE: "sgp",
  },
  SECRETORPRIVATEKEY: "Est03sMyPublick3y23@913",
};
