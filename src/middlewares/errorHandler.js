const { ValidationError, DatabaseError } = require("sequelize");

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(500).json({
      message: "Error en la base de datos",
      error: err.message,
    });
  }

  res.status(500).json({
    message: "Error interno del servidor",
    error: err.message,
  });
};

module.exports = errorHandler;
