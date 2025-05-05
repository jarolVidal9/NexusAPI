const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth.routes');
const roleRoutes = require('./routes/roles/role.routes');
const permissionRoutes = require('./routes/roles/permission.routes');
const resourceRoutes = require('./routes/roles/resource.routes');
const rolePermissionRoutes = require('./routes/roles/rolePermission.routes');
const userRoutes = require('./routes/user.routes');
const goalRoutes = require('./routes/goal/goal.routes');
const goalCategoryRoutes = require('./routes/goal/goalCategory.routes');
const noteRoutes = require('./routes/note/note.routes');
const movementRoutes = require('./routes/finance/movement.routes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const { authMiddleware } = require('./middlewares/auth/auth.middleware');
const uploadRoutes = require('./routes/upload.routes');
const path = require('path');
const { CORS_ORIGIN } = require('./config/dotenv');

const app = express();

const allowedOrigins = CORS_ORIGIN.split(',') || [];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }));
  
app.options('*', cors());
app.use(express.json());


//All routes application
app.use("/api/auth", authRoutes);

//Role routes
app.use("/api/role", authMiddleware ,roleRoutes);
app.use("/api/permission", authMiddleware, permissionRoutes );
app.use("/api/resource", authMiddleware, resourceRoutes);
app.use("/api/rolePermission", authMiddleware, rolePermissionRoutes);

//User routes
app.use("/api/user", authMiddleware, userRoutes);

//goal routes
app.use('/api/goal', authMiddleware, goalRoutes);
app.use('/api/goalcategory', authMiddleware, goalCategoryRoutes);

//movement routes
app.use('/api/movement', authMiddleware, movementRoutes);

//note routes
app.use('/api/note', authMiddleware, noteRoutes);
//upload archives
app.use('/api/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/api', uploadRoutes);

//Middlewares
app.use(errorHandler);
app.use(notFoundHandler);


module.exports = app;