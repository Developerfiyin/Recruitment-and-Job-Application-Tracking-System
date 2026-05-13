require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
app.use(express.json());
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api", userRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
}
);


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});