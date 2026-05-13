const express = require("express");

const app = express();

app.use(express.json());

const rbacTestRoutes = require("./routes/rbacTestRoutes");
app.use("/api/rbac", rbacTestRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;
