const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT || 3306,
    DB_DIALECT: process.env.DB_DIALECT || "mysql",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:4200",
};
