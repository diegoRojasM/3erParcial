const mongoose = require('mongoose');

// Definimos el esquema de Producto
const esquemaProducto = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre del producto
  categoria: { type: String, required: true }, // Categoría del producto
  precio: { type: Number, required: true }, // Precio del producto
  stock: { type: Number, required: true } // Cantidad disponible
}, {
  timestamps: true // Añade campos de fecha de creación y actualización automáticamente
});

// Exportamos el modelo de Producto
module.exports = mongoose.model('Producto', esquemaProducto);
