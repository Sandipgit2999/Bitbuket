require("dotenv").config();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { Router } = require("express");

const { PostModel } = require("../models/post.model");

const PostController = Router();

PostController.post("/", async (req, res) => {
  const { content, userId } = req.body;

  const new_post = new PostModel({ content, userId });

  await new_post.save();
  console.log("-=-=", new_post);

  res.send({ msg: "post created successfully" });
});

PostController.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("---", req.params);

  if (req.params) {
    const user = await PostModel.findOne({ _id: id });
    res.send(user);
  } else {
    const users = await PostModel.find();
    res.send(users);
  }
});

PostController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  console.log(id, payload);
  const new_post = await PostModel.updateOne(
    {
      _id: id,
    },
    {
      $set: payload,
    }
  );

  res.send({ msg: "post updated successfully" });
});

PostController.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const new_post = await PostModel.deleteOne({ _id: id });

  res.send({ msg: "post successfully deleted" });
});

module.exports = {
  PostController,
};
