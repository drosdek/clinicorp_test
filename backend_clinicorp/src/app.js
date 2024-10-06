const express = require("express");
const cors = require("cors");
const taskRoutes = require("./tasks/interfaces/routes/taskRoutes");
const swaggerConfig = require("../swagger/swaggerConfig");
const errorMiddleware = require("./shared/middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
swaggerConfig(app);

app.use("/api", taskRoutes);

app.use(errorMiddleware);

module.exports = app;
