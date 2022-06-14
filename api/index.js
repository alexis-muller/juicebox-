// api/index.js
const { getUserById } = require("../db");

const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
