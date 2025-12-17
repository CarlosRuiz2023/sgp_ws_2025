export default {
  API: {
    ENVIRONMENT: "LOCAL",
    NAME: "API TYPESCRIPT",
    PORT: 3501,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "http://localhost:4200,http://localhost:3000,http://127.0.0.1:4200",  // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "LOCAL",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/api',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },
  POSTGRESQL: {
    ENVIRONMENT: "LOCAL",
    HOST: "localhost",
    PORT: "5432",
    USER_NAME: "postgres",
    USER_PASSWORD: "root",
    DATABASE: "sgp",
  },
  SECRETORPRIVATEKEY: "Est03sMyPublick3y23@913",
  RESEND_API_KEY: "re_htyyqq6h_CyyGzB3MteatA3dHEhoBMbwo",
  IP: 'http://localhost:4200'
};
