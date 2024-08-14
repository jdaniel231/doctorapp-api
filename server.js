const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Criação do objeto express
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors()); // Permitir CORS para requisições de diferentes origens

// Conexão com o banco de dados
pool.connect((err) => {
  if (err) {
    console.log("Error connecting to the database".bgRed.white, err);
  } else {
    console.log("Connected to the database".bgGreen.white);
  }
});

// Rotas
app.use("/api/v1/users", userRoutes);

// Porta do servidor
const port = process.env.PORT || 8080;

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgCyan.white);
});
