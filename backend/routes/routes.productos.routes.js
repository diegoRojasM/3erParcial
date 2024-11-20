const express = require('express');
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/middlewares.autenticacion');
const { verificarRol } = require('../middlewares/middlewares.roles');
const {
  agregarProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto
} = require('../middlewares/middlewares.productos');
const { manejarValidacion } = require('../middlewares/middlewares.validacion');

const router = express.Router();

// Ruta para obtener productos (accesible para todos los usuarios)
router.get('/', obtenerProductos);

// Ruta para agregar un producto (solo admin)
router.post('/',
  verificarToken,
  verificarRol(['admin']),
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    body('categoria').notEmpty().withMessage('La categoría es obligatoria.'),
    body('precio').isNumeric().withMessage('El precio debe ser un número.'),
    body('stock').isNumeric().withMessage('El stock debe ser un número.')
  ],
  manejarValidacion,
  agregarProducto
);

// Ruta para actualizar un producto (solo admin)
router.put('/:id',
  verificarToken,
  verificarRol(['admin']),
  [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío.'),
    body('categoria').optional().notEmpty().withMessage('La categoría no puede estar vacía.'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número.'),
    body('stock').optional().isNumeric().withMessage('El stock debe ser un número.')
  ],
  manejarValidacion,
  actualizarProducto
);

// Ruta para eliminar un producto (solo admin)
router.delete('/:id',
  verificarToken,
  verificarRol(['admin']),
  eliminarProducto
);

module.exports = router;
