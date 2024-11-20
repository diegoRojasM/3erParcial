const Producto = require('../models/models.producto.models');

// Agregar un producto
const agregarProducto = async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;
    const nuevoProducto = new Producto({ nombre, categoria, precio, stock });
    await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto agregado exitosamente.', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar el producto.', error });
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

// Actualizar un producto
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
    res.status(500).json({ mensaje: 'Error al actualizar el producto.', error });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json({ mensaje: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto.', error });
  }
};

module.exports = { agregarProducto, obtenerProductos, actualizarProducto, eliminarProducto };
