require("dotenv").config();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { Router } = require("express");

const { UserModel } = require("../models/user.model");
const { PostModel } = require("../models/post.model");

const UseranalyticsController = Router();

UseranalyticsController.get("/users", async (req, res) => {
  const user = await UserModel.find();
  console.log(user.length);
  res.send({ data:user,total: user.length });
});

UseranalyticsController.get("/users/top-active", async (req, res) => {
  PostModel.aggregate([
    {
      $group: {
        _id: "$user_id",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 5,
    },
  ]).exec((err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
});

module.exports = {
  UseranalyticsController,
};
