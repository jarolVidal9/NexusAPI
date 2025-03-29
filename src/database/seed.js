const sequelize = require('../config/database');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const RolePermission = require('../models/rolePermission.model');


const seedDatabase = async () => {
    await sequelize.sync({force: true});
    console.log('Database synchronized.');

    const adminRole = await Role.create({name: 'admin'});
    const userRole = await Role.create({name: 'user'});

    const permissions = await Permission.bulkCreate([
        {name: 'create'},
        {name: 'read'},
        {name: 'update'},
        {name: 'delete'}
    ]);
    await adminRole.addPermissions(permissions);
    await userRole.addPermissions(permissions);

    console.log('Base de datos incializada con roles y permisos');
};

seedDatabase();