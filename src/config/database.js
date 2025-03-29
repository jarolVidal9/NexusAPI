const {Sequelize} = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = require("./dotenv");

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port: DB_PORT
    }
);
async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();

module.exports = sequelize;