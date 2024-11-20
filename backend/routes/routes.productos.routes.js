const express = require('express');
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/middlewares.autenticacion'); // Importa el middleware de autenticación
const { verificarRol } = require('../middlewares/middlewares.roles'); // Importa el middleware de verificación de roles
const { registrarProducto, obtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto } = require('../middlewares/middlewares.productos'); // Importa las funciones
const { manejarValidacion } = require('../middlewares/middlewares.validacion'); // Importa el middleware para la validación
const router = express.Router();

// Ruta para agregar un nuevo producto (solo para admin)
router.post('/',
  verificarToken, // Asegura que el usuario esté logueado
  verificarRol(['admin']), // Asegura que solo los administradores puedan agregar productos
  [
    body('nombre').notEmpty().withMessage('El nombre del producto es obligatorio.'),
    body('categoria').notEmpty().withMessage('La categoría es obligatoria.'),
    body('precio').isNumeric().withMessage('El precio debe ser un número.'),
    body('stock').isNumeric().withMessage('El stock debe ser un número.'),
  ],
  manejarValidacion,
  registrarProducto // Asegúrate de que esta función esté definida correctamente en tu middleware
);

// Ruta para obtener todos los productos (solo para usuarios logueados)
router.get('/',
  verificarToken, // Asegura que el usuario esté logueado
  obtenerProductos
);

// Nueva ruta: Obtener un solo producto por su ID (solo para usuarios logueados)
router.get('/:id',
  verificarToken, // Asegura que el usuario esté logueado
  obtenerProductoPorId
);

// Ruta para actualizar un producto (solo para admin)
router.put('/:id',
  verificarToken, // Asegura que el usuario esté logueado
  verificarRol(['admin']), // Asegura que solo los administradores puedan actualizar productos
  actualizarProducto
);

// Ruta para eliminar un producto (solo para admin)
router.delete('/:id',
  verificarToken, // Asegura que el usuario esté logueado
  verificarRol(['admin']), // Asegura que solo los administradores puedan eliminar productos
  eliminarProducto
);

module.exports = router;
