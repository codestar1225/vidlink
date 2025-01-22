const express = require("express");
const cors = require("cors");
const DbCon = require("./config/db/DbCon");
const UserRoutes = require("./routes/UserRoutes");
const { notFound, errorHandler } = require("./middlewares/ErrHandler");
require("dotenv").config();

const app = express();


const port = process.env.PORT || 4000;

// Databas connection
DbCon();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(cors());
app.use("/api", UserRoutes);

// handling errors
app.use(notFound);
app.use(errorHandler);

// listen on port
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
