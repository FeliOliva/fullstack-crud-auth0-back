const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los clientes
const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.clients.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un nuevo cliente
const addClient = async (req, res) => {
  try {
    const { nombre, apellido, direccion, email, telefono, cuil } = req.body;
    const client = await prisma.clients.create({
      data: { nombre, apellido, direccion, email, telefono, cuil },
    });
    res.status(201).json({ message: "Cliente agregado con éxito", client });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el cliente" });
  }
};

// Eliminar un cliente (cambia estado a 0)
const dropClient = async (req, res) => {
  try {
    const { ID } = req.params;
    await prisma.clients.update({
      where: { id: parseInt(ID) },
      data: { estado: 0 },
    });
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

// Activar un cliente (cambia estado a 1)
const upClient = async (req, res) => {
  try {
    const { ID } = req.params;
    await prisma.clients.update({
      where: { id: parseInt(ID) },
      data: { estado: 1 },
    });
    res.status(200).json({ message: "Cliente activado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al activar el cliente" });
  }
};

// Actualizar un cliente
const updateClients = async (req, res) => {
  try {
    const { ID, nombre, apellido, direccion, email, telefono, cuil } = req.body;
    await prisma.clients.update({
      where: { id: parseInt(ID) },
      data: { nombre, apellido, direccion, email, telefono, cuil },
    });
    res.status(200).json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cliente por ID
const getClientsByID = async (req, res) => {
  try {
    const { ID } = req.params;
    const client = await prisma.clients.findUnique({
      where: { id: parseInt(ID) },
    });
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClients,
  addClient,
  dropClient,
  upClient,
  updateClients,
  getClientsByID,
};
