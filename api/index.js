const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RoutesClientes = require("../routes/clientsRoutes");

app.use("/", RoutesClientes);

// Exporta el handler para Vercel
module.exports = app;
