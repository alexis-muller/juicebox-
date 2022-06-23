// api/posts.js
const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./utils");
// near the top

postsRouter.post("/", requireUser, async (req, res, next) => {
  res.send({ message: "under construction" });
});

module.exports = postsRouter;
