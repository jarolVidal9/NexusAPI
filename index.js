require("dotenv").config();
const sequelize = require("./src/config/database");
const app = require("./src/app");
const { PORT } = require("./src/config/dotenv");
const models = require('./src/models/index');

async function startServer(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await sequelize.sync({ force: false });
        console.log('Database synchronized.');
        
        await app.listen(PORT, '0.0.0.0');
        console.log(`Server running on port http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }
}

startServer();