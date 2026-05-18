const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();

const connectDB = require("./config/db");


connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api", userRoute);

app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use((err, req, res, next) => {
 console.error(err.message);
  res.status(400).json({ success: false, message: err.message });
});