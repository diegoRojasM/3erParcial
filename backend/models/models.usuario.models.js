const mongoose = require('mongoose');

// Definimos el esquema de Usuario
const esquemaUsuario = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre completo del usuario
  correo: { type: String, required: true, unique: true }, // Correo electrónico único
  contrasena: { type: String, required: true }, // Contraseña encriptada
  rol: { 
    type: String, 
    enum: ['admin', 'usuario'], // El rol solo puede ser 'admin' o 'usuario'
    required: true 
  }
}, {
  timestamps: true // Añade campos de fecha de creación y actualización automáticamente
});

// Exportamos el modelo de Usuario
module.exports = mongoose.model('Usuario', esquemaUsuario);