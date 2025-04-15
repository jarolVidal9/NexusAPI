require("dotenv").config();
const sequelize = require("./src/config/database");

const app = require("./src/app");
const { PORT } = require("./src/config/dotenv");


async function startServer(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: false });
        console.log('Database synchronized.');
        
        await app.listen(PORT);
        console.log(`Server running on port http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }
}

startServer();