const { validationResult } = require('express-validator');

// Middleware para manejar los errores de validación
const manejarValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = { manejarValidacion };
