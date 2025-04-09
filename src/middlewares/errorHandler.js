const { ValidationError, DatabaseError } = require("sequelize");

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  // Sequelize: error de validación de modelo
  if (err instanceof ValidationError) {
    return res.status(400).json({
      errors: err.errors.map((e) => ({ msg: e.message }))
    });
  }

  // Sequelize: error de la base de datos
  if (err instanceof DatabaseError) {
    return res.status(500).json({
      errors: [{ msg: "Error en la base de datos: " + err.message }]
    });
  }

  // Si ya venía con estructura unificada, no la cambiamos
  if (Array.isArray(err?.errors)) {
    return res.status(400).json({
      errors: err.errors.map(e => (
        typeof e === 'string' ? { msg: e } : e
      ))
    });
  }

  // Otro error genérico
  res.status(500).json({
    errors: [{ msg: err.message || "Error interno del servidor" }]
  });
};

module.exports = errorHandler;
