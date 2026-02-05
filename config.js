// config.js

const CONFIG = {
  API_LOCAL: "http://localhost:3000/api/contacts",
  API_PROD: "https://portfolio-backend-2xlj.onrender.com/api/contacts",

  MODE: "prod" // đổi thành "prod" khi deploy
};

const API_URL =
  CONFIG.MODE === "local"
    ? CONFIG.API_LOCAL
    : CONFIG.API_PROD;
