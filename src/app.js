const express = require("express");
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;