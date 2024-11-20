const Producto = require('../models/models.producto.models'); // Importa el modelo de Producto

// Función para registrar un nuevo producto
const registrarProducto = async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;

    const nuevoProducto = new Producto({
      nombre,
      categoria,
      precio,
      stock
    });

    await nuevoProducto.save();

    res.status(201).json({ mensaje: 'Producto agregado exitosamente.', producto: nuevoProducto });
  } catch (error) {
    console.error('Error al registrar producto:', error);
    res.status(500).json({ mensaje: 'Error al registrar el producto.', error });
  }
};

// Obtener productos (con filtro opcional por categoría)
const obtenerProductos = async (req, res) => {
  try {
    const { categoria } = req.query;
    const filtros = categoria ? { categoria } : {};
    const productos = await Producto.find(filtros);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos.', error });
  }
};

// Función para obtener un solo producto por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id); // Buscar producto por ID

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json(producto); // Devolver el producto encontrado
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ mensaje: 'Error al obtener el producto.', error });
  }
};

// Función para actualizar un producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, precio, stock } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, categoria, precio, stock },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json({ mensaje: 'Producto actualizado exitosamente.', producto: productoActualizado });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto.', error });
  }
};

// Función para eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json({ mensaje: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto.', error });
  }
};

module.exports = { registrarProducto, obtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto };
