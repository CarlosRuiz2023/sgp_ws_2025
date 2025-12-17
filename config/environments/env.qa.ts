export default {
  API: {
    ENVIRONMENT: "QA",
    NAME: "API TYPESCRIPT",
    PORT: 3503,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "QA",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/api',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },
  POSTGRESQL: {
    ENVIRONMENT: "QA",
    HOST: "db.ygsmdqeaaztpnagtviao.supabase.co",
    PORT: "5432",
    USER_NAME: "postgres",
    USER_PASSWORD: "Ezequielpitufo1*",
    DATABASE: "postgres",
  },
  SECRETORPRIVATEKEY: "Est03sMyPublick3y23@913",
  GOOGLE_APP_PASSWORD: "hyqd pide sljm ovxi",
  IP: 'http://localhost:4200'
};
