require('dotenv').config();

const {
  PORT,
  DB_USERNAME,
  DB_NAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_DIALECT,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN
} = process.env;


module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  }
}