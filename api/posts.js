// api/posts.js
// const express = require("express");
// const postsRouter = express.Router();
// const { requireUser } = require("./utils");
// // near the top

// postsRouter.post("/", requireUser, async (req, res, next) => {
//   res.send({ message: "under construction" });
// });

// module.exports = postsRouter;

const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./utils");

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const postData = {
    authorId: req.user.id,
    title,
    content,
    tagArr,
  };

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    // add authorId, title, content to postData object
    // const post = await createPost(postData);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object
    const post = await createPost(postData);

    if (post) {
      res.send({ post });
      next();
    } else {
      next({ name: "invalidPost", message: "Post could not be created" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = postsRouter;
