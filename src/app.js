const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth.routes');
const roleRoutes = require('./routes/roles/role.routes');
const permissionRoutes = require('./routes/roles/permission.routes');
const resourceRoutes = require('./routes/roles/resource.routes');
const rolePermissionRoutes = require('./routes/roles/rolePermission.routes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const { authMiddleware } = require('./middlewares/auth/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json());


//All routes application
app.use("/api/auth", authRoutes);

//Role routes
app.use("/api/role", authMiddleware ,roleRoutes);
app.use("/api/permission", authMiddleware, permissionRoutes );
app.use("/api/resource", authMiddleware, resourceRoutes);
app.use("/api/rolePermission", authMiddleware, rolePermissionRoutes);

//Middlewares
app.use(errorHandler);
app.use(notFoundHandler);


module.exports = app;