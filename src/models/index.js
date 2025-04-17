//Importar modelos
const User = require('./auth/user.model');
const Role = require('./roles/role.model');
const Permission = require('./roles/permission.model');
const Resource = require('./roles/resource.model');
const RolePermission = require('./roles/rolePermission.model');
const Goal = require('./goal/goal.model');
const GoalCategory = require('./goal/goalCategory.model');

//Definir las relaciones entre los modelos

//  User-> Role
User.belongsTo(Role, {foreignKey: 'roleId'});

// Role -> Permission

// Relación muchos a muchos entre Role y Permission con Resource
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

// Relación entre RolePermission y Resource
Resource.hasMany(RolePermission, { foreignKey: 'resourceId', onDelete: 'CASCADE' });
RolePermission.belongsTo(Resource, { foreignKey: 'resourceId' });

// User -> Goal
User.hasMany(Goal, {foreignKey: 'userId'});
Goal.belongsTo(User, {foreignKey: 'userId'});

// User -> GoalCategory
User.hasMany(GoalCategory, {foreignKey: 'userId'});
GoalCategory.belongsTo(User, {foreignKey: 'userId'});

// Goal -> GoalCategory
GoalCategory.hasMany(Goal, {foreignKey: 'goalCategoryId'});
Goal.belongsTo(GoalCategory, {foreignKey: 'goalCategoryId'});


module.exports = {
    User,
    Role,
    Permission,
    Resource,
    RolePermission,
    Goal,
    GoalCategory
}