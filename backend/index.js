// Importamos las dependencias necesarias
const express = require('express'); // Framework para manejar solicitudes HTTP
const dotenv = require('dotenv'); // Para manejar variables de entorno
const mongoose = require('mongoose'); // ODM para conectar con MongoDB
const cors = require('cors'); // Middleware para habilitar CORS
const rutasUsuario = require('./routes/routes.usuario.routes'); // Rutas de usuarios
const rutasProductos = require('./routes/routes.productos.routes'); // Rutas de productos

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Creamos la aplicación Express
const app = express();

//app.use(cors()); // Habilita CORS para todas las solicitudes

// Middleware para parsear las solicitudes en formato JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión a MongoDB exitosa >>>'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middleware para manejar las rutas de usuario y productos
app.use('/api/usuarios', rutasUsuario); // Rutas relacionadas con usuarios
app.use('/api/productos', rutasProductos); // Rutas relacionadas con productos

// Configuración del puerto
const PORT = process.env.PORT || 5005;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ta running en el port http://localhost:${PORT}`);
});
